import "server-only";

const GRAPH_SCOPE = "https://graph.microsoft.com/.default";
const GRAPH_SEND_MAIL_VERSION = "v1.0";

type ContactField = {
  label: string;
  value: string;
};

type SendContactEmailInput = {
  formName: string;
  sourcePath: string;
  submittedAt: string;
  fields: ContactField[];
  replyToEmail?: string;
  metadata: {
    ipAddress: string;
    userAgent: string;
  };
};

type SendGraphEmailInput = {
  from?: string;
  to: string | string[];
  cc?: string | string[];
  subject: string;
  html: string;
  replyToEmail?: string;
  saveToSentItems?: boolean;
};

type GraphTokenResponse = {
  access_token?: string;
  expires_in?: number;
  token_type?: string;
  error?: string;
  error_description?: string;
};

let cachedToken: { accessToken: string; expiresAt: number } | null = null;

function requiredEnv(name: string) {
  const value = process.env[name]?.trim();

  if (!value) {
    throw new Error(`Missing required environment variable: ${name}`);
  }

  return value;
}

function getGraphConfig() {
  return {
    tenantId: requiredEnv("MICROSOFT_GRAPH_TENANT_ID"),
    clientId: requiredEnv("MICROSOFT_GRAPH_CLIENT_ID"),
    clientSecret: requiredEnv("MICROSOFT_GRAPH_CLIENT_SECRET"),
    mailFrom: requiredEnv("MICROSOFT_GRAPH_MAIL_FROM"),
    to: requiredEnv("CONTACT_EMAIL_TO"),
    cc: requiredEnv("CONTACT_EMAIL_CC"),
  };
}

function normalizeRecipients(recipients?: string | string[]) {
  const list = Array.isArray(recipients) ? recipients : recipients ? [recipients] : [];

  return list
    .map((email) => email.trim())
    .filter(Boolean)
    .map((email) => ({ emailAddress: { address: email } }));
}

function escapeHtml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

function formatLabel(label: string) {
  return label
    .replace(/[_-]+/g, " ")
    .replace(/([a-z])([A-Z])/g, "$1 $2")
    .replace(/\s+/g, " ")
    .trim()
    .replace(/\b\w/g, (char) => char.toUpperCase());
}

function fieldRows(fields: ContactField[]) {
  return fields
    .map(
      (field) => `
        <tr>
          <td style="padding:12px 16px;border-bottom:1px solid #d9e2ec;color:#475569;font-size:13px;font-weight:600;width:190px;vertical-align:top;">${escapeHtml(
            formatLabel(field.label),
          )}</td>
          <td style="padding:12px 16px;border-bottom:1px solid #d9e2ec;color:#0f172a;font-size:14px;line-height:1.55;white-space:pre-wrap;">${escapeHtml(
            field.value,
          )}</td>
        </tr>`,
    )
    .join("");
}

function buildEmailHtml(input: SendContactEmailInput) {
  const metadataRows = [
    { label: "Form", value: input.formName },
    { label: "Source Page", value: input.sourcePath },
    { label: "Submitted", value: input.submittedAt },
    { label: "IP Address", value: input.metadata.ipAddress },
    { label: "User Agent", value: input.metadata.userAgent },
  ];

  return `
    <!doctype html>
    <html>
      <body style="margin:0;background:#f8fafc;font-family:Arial,Helvetica,sans-serif;color:#0f172a;">
        <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="background:#f8fafc;padding:28px 12px;">
          <tr>
            <td align="center">
              <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="max-width:720px;background:#ffffff;border:1px solid #d9e2ec;border-radius:12px;overflow:hidden;">
                <tr>
                  <td style="background:#08111f;padding:26px 30px;">
                    <div style="color:#67e8f9;font-size:12px;font-weight:700;letter-spacing:0.12em;text-transform:uppercase;">ITECS AI Website</div>
                    <h1 style="margin:10px 0 0;color:#ffffff;font-size:24px;font-weight:400;line-height:1.3;">New form submission</h1>
                  </td>
                </tr>
                <tr>
                  <td style="padding:28px 30px 12px;">
                    <h2 style="margin:0 0 12px;color:#0f172a;font-size:18px;font-weight:600;">Submission Details</h2>
                    <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="border:1px solid #d9e2ec;border-radius:10px;border-collapse:separate;border-spacing:0;overflow:hidden;">
                      ${fieldRows(input.fields)}
                    </table>
                  </td>
                </tr>
                <tr>
                  <td style="padding:16px 30px 30px;">
                    <h2 style="margin:0 0 12px;color:#0f172a;font-size:18px;font-weight:600;">Routing Metadata</h2>
                    <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="border:1px solid #d9e2ec;border-radius:10px;border-collapse:separate;border-spacing:0;overflow:hidden;">
                      ${fieldRows(metadataRows)}
                    </table>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
        </table>
      </body>
    </html>`;
}

function buildSubject(input: SendContactEmailInput) {
  const name = input.fields.find(
    (field) => field.label.toLowerCase() === "name",
  )?.value;
  const company = input.fields.find(
    (field) => field.label.toLowerCase() === "company",
  )?.value;
  const suffix = [name, company].filter(Boolean).join(" - ");

  return suffix
    ? `ITECS AI Website Form: ${suffix}`
    : `ITECS AI Website Form: ${input.formName}`;
}

async function getAccessToken() {
  const now = Date.now();

  if (cachedToken && cachedToken.expiresAt - 60_000 > now) {
    return cachedToken.accessToken;
  }

  const config = getGraphConfig();
  const tokenResponse = await fetch(
    `https://login.microsoftonline.com/${config.tenantId}/oauth2/v2.0/token`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: new URLSearchParams({
        client_id: config.clientId,
        client_secret: config.clientSecret,
        grant_type: "client_credentials",
        scope: GRAPH_SCOPE,
      }),
    },
  );

  const tokenPayload = (await tokenResponse.json()) as GraphTokenResponse;

  if (!tokenResponse.ok || !tokenPayload.access_token) {
    throw new Error(
      `Microsoft Graph token request failed: ${
        tokenPayload.error_description || tokenPayload.error || tokenResponse.status
      }`,
    );
  }

  cachedToken = {
    accessToken: tokenPayload.access_token,
    expiresAt: now + (tokenPayload.expires_in || 3600) * 1000,
  };

  return cachedToken.accessToken;
}

export async function sendContactEmail(input: SendContactEmailInput) {
  const config = getGraphConfig();
  const emailHtml = buildEmailHtml(input);
  const subject = buildSubject(input);

  await sendGraphEmail({
    subject,
    html: emailHtml,
    to: config.to,
    cc: config.cc,
    replyToEmail: input.replyToEmail,
    saveToSentItems: false,
  });
}

export async function sendGraphEmail(input: SendGraphEmailInput) {
  const config = getGraphConfig();
  const accessToken = await getAccessToken();
  const mailFrom = input.from?.trim() || config.mailFrom;
  const toRecipients = normalizeRecipients(input.to);
  const ccRecipients = normalizeRecipients(input.cc);

  if (!toRecipients.length) {
    throw new Error("At least one email recipient is required.");
  }

  const response = await fetch(
    `https://graph.microsoft.com/${GRAPH_SEND_MAIL_VERSION}/users/${encodeURIComponent(
      mailFrom,
    )}/sendMail`,
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        message: {
          subject: input.subject,
          body: {
            contentType: "HTML",
            content: input.html,
          },
          toRecipients,
          ccRecipients,
          replyTo: input.replyToEmail
            ? [{ emailAddress: { address: input.replyToEmail } }]
            : [],
        },
        saveToSentItems: input.saveToSentItems ?? false,
      }),
    },
  );

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(
      `Microsoft Graph sendMail request failed: ${response.status} ${errorText}`,
    );
  }
}
