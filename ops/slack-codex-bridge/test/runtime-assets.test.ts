import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import test from "node:test";

const packageRoot = path.resolve(
  path.dirname(fileURLToPath(import.meta.url)),
  "../..",
);

async function readAsset(relativePath: string): Promise<string> {
  return readFile(path.join(packageRoot, relativePath), "utf8");
}

test("Slack manifest exactly matches the authorized AI app contract", async () => {
  const manifest = JSON.parse(
    await readAsset("slack-app-manifest.json"),
  ) as unknown;

  assert.deepEqual(manifest, {
    _metadata: {
      major_version: 2,
      minor_version: 1,
    },
    display_information: {
      name: "ITECS.AI-CODEX",
      description: "Real-time Codex CLI agent for the itecs.ai server.",
      background_color: "#5422B8",
    },
    features: {
      app_home: {
        home_tab_enabled: true,
        messages_tab_enabled: true,
        messages_tab_read_only_enabled: false,
      },
      agent_view: {
        agent_description:
          "Resident Codex CLI agent bound exclusively to the itecs.ai website and Linux server.",
        suggested_prompts: [
          {
            title: "Server status",
            message:
              "Inspect the website and server status and summarize any issues.",
          },
          {
            title: "SEO review",
            message:
              "Review the current site for the highest-impact technical SEO opportunities.",
          },
          {
            title: "Help",
            message: "help",
          },
        ],
      },
      bot_user: {
        display_name: "ITECS.AI-CODEX",
        always_online: true,
      },
      slash_commands: [
        {
          command: "/itecsai-codex",
          description: "Prompt the resident itecs.ai Codex CLI agent.",
          usage_hint: "help | status | stop | new | prompt",
          should_escape: true,
        },
      ],
      shortcuts: [
        {
          name: "Open Codex",
          type: "global",
          callback_id: "itecs_ai_codex_open",
          description: "Open a Codex request modal",
        },
        {
          name: "Analyze with Codex",
          type: "message",
          callback_id: "itecs_ai_codex_analyze",
          description: "Analyze this message with Codex",
        },
      ],
    },
    oauth_config: {
      scopes: {
        bot: [
          "app_mentions:read",
          "assistant:write",
          "chat:write",
          "commands",
          "files:read",
          "files:write",
          "im:history",
          "im:read",
          "im:write",
          "reactions:read",
          "reactions:write",
        ],
      },
    },
    settings: {
      event_subscriptions: {
        bot_events: ["app_home_opened", "app_mention", "message.im"],
      },
      interactivity: {
        is_enabled: true,
      },
      org_deploy_enabled: false,
      socket_mode_enabled: true,
      token_rotation_enabled: false,
      is_mcp_enabled: false,
    },
  });
});

test("systemd unit binds the existing encrypted credential and system Node", async () => {
  const unit = await readAsset("deploy/itecs-ai-codex-slack.service");

  assert.match(
    unit,
    /^Environment=PATH=\/home\/itecs\/\.local\/bin:\/usr\/local\/sbin:\/usr\/local\/bin:\/usr\/sbin:\/usr\/bin:\/sbin:\/bin$/m,
  );
  assert.match(
    unit,
    /^LoadCredentialEncrypted=op_service_account_token:\/etc\/credstore\.encrypted\/itecs-ai-codex-op\.cred$/m,
  );
  assert.match(unit, /^ExecStartPre=\/usr\/bin\/test -x \/usr\/bin\/node$/m);
  assert.doesNotMatch(unit, /op-service-account|\.local\/bin\/node/);
});

test("runtime wrapper consumes the named credential and invokes system Node", async () => {
  const wrapper = await readAsset("deploy/itecs-ai-codex-slack-run");

  assert.match(
    wrapper,
    /^credential_file=\$\{credential_directory\}\/op_service_account_token$/m,
  );
  assert.match(wrapper, /^\s+-- \/usr\/bin\/node \\$/m);
  assert.doesNotMatch(wrapper, /op-service-account|\.local\/bin\/node/);
});

test("credential setter targets the existing encrypted credential contract", async () => {
  const setter = await readAsset(
    "deploy/itecs-ai-codex-slack-set-op-credential",
  );

  assert.match(
    setter,
    /^target=\/etc\/credstore\.encrypted\/itecs-ai-codex-op\.cred$/m,
  );
  assert.match(setter, /^\s+--name=op_service_account_token \\$/m);
  assert.doesNotMatch(setter, /op-service-account/);
});
