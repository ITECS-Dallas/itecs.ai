# Daily and weekly SEO worker retirement

Status: retired on webdev01, 2026-09-15, at Brian's explicit request.
The operational change is deployed on the host; these workers were not part of
the Next.js web image. No website rebuild or container replacement is needed.

## Removed workflow

- `itecs-ai-seo-collect.timer` (daily at 04:41 UTC).
- `itecs-ai-seo-weekly.timer` (Monday at 10:41 UTC).
- Both `itecs-ai-seo-{daily,weekly}.target` chains.
- Daily/weekly collector services, the weekly analyzer service, daily/weekly
  notifier services, and the failure-notifier service template.
- `/usr/local/lib/itecs-ai-seo`, the dedicated production transaction controller
  and its Python bytecode, and the dedicated sysusers/tmpfiles bootstrap files.
- The repository's obsolete `scripts/sync-seo-action-ledger.sh` hook.

The timers were disabled and stopped before uninstalling the idle chains.
The ten unit definitions were removed from systemd's search path, followed by
daemon-reload. No active/loaded SEO units, enabled timers, user timers, cron
entries, or dedicated worker processes remained at readback. There was no GitHub
Actions daily/weekly SEO workflow in this repository to disable.

Do not restore scheduling from old staging directories, runbooks or maintenance
artifacts. Those artifacts describe the retired system, not desired runtime
state. Manual SEO/reporting skills do not authorize reinstalling these workers.

## Preserved

Public page content, metadata, structured data, robots/crawler consent, sitemap,
manual `seo:audit` checks, article skills and existing publish-time IndexNow
notifications are unchanged. Certificate renewal, Slack bridges, other websites
and all unrelated scheduled services are unchanged.

Historical reports, handoffs, the append-only action ledger, local configuration,
no-login service identities, and encrypted credentials remain in place. They are
not running jobs; no provider permission or credential was revoked or exposed.

## Recovery and evidence

Removed host files were moved intact into a root-only 0700 archive:
`/var/backups/itecs-ai-seo-retired-20260915-jPgci1`.
It contains `runtime/`, the ten original definitions in `systemd/`, the two
bootstrap definitions in `bootstrap/`, and the installer/bytecode in
`controller/`. Runtime hashes were compared before and after the move.

Private execution evidence is in
`/home/itecs/.codex/itecs-ai-work-orders/SEO-RETIREMENT-20260915-5Tb2Vf/`.
Original schedules and enabled states are recorded there. Recovery requires a
new explicit decision to reinstate the program: restore only these archived
files to their original paths/owners/modes, reload systemd, validate the runtime
against the then-current tooling, and only then deliberately re-enable the two
timers. Enabling persistent timers can immediately run missed jobs and incur
provider/model usage or send Slack reports; it is not part of retirement.

Source rollback is a focused revert of this retirement commit. Reverting Git
alone does not reinstall or reactivate the host workers. No web rollback is
required because the live website image was not changed.
