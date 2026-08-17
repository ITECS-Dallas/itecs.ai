# ITECS.AI-CODEX Slack Bridge

This package runs the `ITECS.AI-CODEX` Slack app in Socket Mode and dispatches
authorized Slack requests to the locally installed Codex SDK. It is
intentionally bound to:

- workspace `T031MF3U529`
- app `A0BLY157WF2`
- user `U03231JGNQ1`
- working root `/home/itecs/itecs.ai`

The Codex thread options are exactly `workingDirectory`,
`sandboxMode: "danger-full-access"`, and `approvalPolicy: "never"`. The
installed Codex default model is used because no model option is supplied.

## Slack surfaces

The bridge handles direct messages, `app_mention`, `/itecsai-codex`, the
`itecs_ai_codex_open` global shortcut, the `itecs_ai_codex_analyze` message
shortcut, `itecs_ai_codex_submit` modal submissions, and `app_home_opened`.
Ordinary text starts or resumes the Codex thread mapped to the Slack
conversation. Control messages are `help`, `status`, `stop`, and `new`.

Top-level direct messages keep their progress, notices, controls, and final
responses as top-level direct messages. Their Codex session is scoped to the DM
channel so later top-level prompts continue that conversation. Explicit direct
message threads and app mentions remain Slack-thread-scoped; threaded final
responses retain Slack streaming where supported.

Before the final response, the bridge maintains one bounded
`Live progress (sanitized)` message. It renders only fixed labels derived from
Codex SDK item types, lifecycle state, safe terminal status, and aggregate
counts. It never renders reasoning text, commands or output, paths or file
content, connected-tool details, search queries, partial agent messages, raw
errors, or other event payload strings. The timeline keeps the latest six unique
milestones, coalesces bursts behind a two-second write throttle, and retains the
latest pending milestone. A progress or streaming failure does not block the
standard final-response path. Top-level DMs update one top-level progress
message; explicit threads retain their existing thread and `chatStream` routing.

The checked-in [Slack app manifest](./slack-app-manifest.json) is the canonical
event, interactivity, shortcut, command, and OAuth-scope configuration. Updating
the existing Slack app from this manifest is an operator action and is not
performed by this package.

## Development checks

```bash
npm install
npm run check
```

Tests use mocks and do not connect to Slack, Codex, 1Password, or production
services.

The live service executes the package's built `dist/src/index.js` directly.
After a separately authorized activation preflight, a prepared build is
activated with:

```bash
sudo systemctl restart itecs-ai-codex-slack.service
```

Do not use that command during a preparation-only change window.

## Runtime secret flow

No Slack token or 1Password service-account token belongs in this repository or
in a plaintext host file.

`deploy/op.env` contains only these 1Password references:

- `op://Automation Vault/ITECS.AI-CODEX Slack Bot Token/credential`
- `op://Automation Vault/ITECS.AI-CODEX Slack App Token/credential`

The systemd unit loads the 1Password service-account bootstrap from the
host-encrypted credential `/etc/credstore.encrypted/itecs-ai-codex-op.cred`,
exposed to the service as `op_service_account_token`. The runner uses
`op run --env-file` to resolve Slack tokens only in the service process and
invokes `/usr/bin/node` while preserving the account's normal `PATH`. Before
Codex is constructed, bootstrap variables are removed, and the Codex child
environment explicitly excludes Slack and 1Password secrets while retaining the
account's `HOME`, `PATH`, `SHELL`, and normal sudo access.

## Host preparation

Build first, then install the root-owned non-secret assets:

```bash
npm run build
./deploy/install-1password-cli.sh
./deploy/install-host-assets.sh
```

The installer reloads systemd but does not enable or start the service.

An operator with the 1Password service-account token can install it without
placing it in shell history or a plaintext file:

```bash
sudo /usr/local/sbin/itecs-ai-codex-slack-set-op-credential
```

The credential utility reads from the controlling terminal with echo disabled
and pipes directly to `systemd-creds encrypt`. It refuses to overwrite an
existing encrypted credential.

Only after the encrypted credential exists should an operator start the unit.
`ExecStartPre` runs the bridge `--check`; Socket Mode starts only if that
preflight passes:

```bash
sudo systemctl start itecs-ai-codex-slack.service
sudo systemctl status itecs-ai-codex-slack.service
sudo systemctl enable itecs-ai-codex-slack.service
```

## Durable and temporary data

- session map: `/var/lib/itecs-ai-codex-slack/sessions.json`
- metadata audit: `/var/log/itecs-ai-codex-slack/audit.jsonl`
- bounded Slack files: `/run/itecs-ai-codex-slack/tmp/`

Session writes use a same-directory temporary file, file and directory sync, and
atomic rename. Invalid JSON or schema is a visible startup/preflight failure; it
is never silently reset. Slack files are size-bound, downloaded only from HTTPS
Slack hosts into unique mode-`0700` directories, treated as untrusted Codex
context, and removed in all completion and failure paths.

Audit records contain only correlation and Slack/Codex routing metadata,
timestamps, site/root, and outcome. Prompts, responses, tool output, environment
values, and secrets are excluded. The Bolt logger discards message bodies and
error details and emits only safe lifecycle/severity metadata.
