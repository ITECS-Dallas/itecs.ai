#!/usr/bin/env bash
# Validate docs/seo/action-ledger.jsonl and install it as a compact JSON array
# at /etc/itecs-ai-seo/action-ledger.json for the SearchOps collector.
set -euo pipefail

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
LEDGER="$ROOT_DIR/docs/seo/action-ledger.jsonl"
TARGET="/etc/itecs-ai-seo/action-ledger.json"

node --input-type=module -e '
import { readFileSync, writeFileSync } from "node:fs";
const [ledgerPath, targetPath] = process.argv.slice(1);
const lines = readFileSync(ledgerPath, "utf8").split("\n").filter((l) => l.trim());
if (lines.length < 1 || lines.length > 500) throw new Error("ledger_entry_count_invalid");
const entries = lines.map((line, index) => {
  let entry;
  try { entry = JSON.parse(line); } catch { throw new Error(`ledger_line_${index + 1}_json_invalid`); }
  if (!["action", "review"].includes(entry.entryType)) throw new Error(`ledger_line_${index + 1}_entry_type_invalid`);
  if (!/^SEO-[0-9]{8}-[0-9]{2}$/.test(entry.actionId)) throw new Error(`ledger_line_${index + 1}_action_id_invalid`);
  return entry;
});
const body = JSON.stringify({ schemaVersion: "1.0-seo-action-ledger", entryCount: entries.length, entries });
if (Buffer.byteLength(body) > 256 * 1024) throw new Error("ledger_too_large");
writeFileSync(targetPath, `${body}\n`, { mode: 0o644 });
console.log(`validated ${entries.length} entries -> ${targetPath} (${Buffer.byteLength(body)} bytes)`);
' "$LEDGER" "$TARGET"

chown root:root "$TARGET"
chmod 0644 "$TARGET"
