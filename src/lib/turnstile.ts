import "server-only";

const TURNSTILE_VERIFY_URL =
  "https://challenges.cloudflare.com/turnstile/v0/siteverify";

type TurnstileValidationResponse = {
  success: boolean;
  challenge_ts?: string;
  hostname?: string;
  "error-codes"?: string[];
  action?: string;
  cdata?: string;
};

export type TurnstileValidationResult = {
  success: boolean;
  errorCodes: string[];
};

function getTurnstileSecret() {
  const secret = process.env.CLOUDFLARE_TURNSTILE_SECRET_KEY?.trim();

  if (!secret) {
    throw new Error(
      "Missing required environment variable: CLOUDFLARE_TURNSTILE_SECRET_KEY",
    );
  }

  return secret;
}

export async function validateTurnstileToken(
  token: string,
  remoteIp: string,
): Promise<TurnstileValidationResult> {
  const formData = new URLSearchParams({
    secret: getTurnstileSecret(),
    response: token,
  });

  if (remoteIp && remoteIp !== "Unavailable") {
    formData.set("remoteip", remoteIp);
  }

  const response = await fetch(TURNSTILE_VERIFY_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: formData,
  });

  if (!response.ok) {
    throw new Error(`Turnstile validation failed with status ${response.status}`);
  }

  const result = (await response.json()) as TurnstileValidationResponse;

  return {
    success: Boolean(result.success),
    errorCodes: result["error-codes"] || [],
  };
}

