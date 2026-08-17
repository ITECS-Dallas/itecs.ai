import { Check } from "lucide-react";

/* ------------------------------------------------------------------ */
/* Requirements table                                                  */
/* ------------------------------------------------------------------ */

const requirementRows = [
  {
    requirement: "Node.js 18 or newer",
    why: "Runs npx-based MCP servers",
    how: "Install from nodejs.org or a version manager",
  },
  {
    requirement: "Python 3.10 or newer",
    why: "Runs Python-based MCP servers",
    how: "Install from python.org or pyenv",
  },
  {
    requirement: "uv / uvx",
    why: "Launches Python servers quickly",
    how: "Run the uv installer, or brew install uv",
  },
  {
    requirement: "Claude Desktop or Claude Code",
    why: "The MCP client that runs the servers",
    how: "Download Claude Desktop, or install Claude Code",
  },
  {
    requirement: "A trusted MCP server",
    why: "The tool or data being connected",
    how: "From the official servers or a vendor",
  },
  {
    requirement: "Public HTTPS endpoint (remote only)",
    why: "Lets Claude's cloud reach a remote server",
    how: "Host it, reachable from Anthropic's IP ranges",
  },
];

export function MCPRequirementsTable() {
  return (
    <div className="not-prose">
      <p className="mb-2 text-xs text-text-dim md:hidden" aria-hidden="true">
        Swipe the table sideways to read each requirement →
      </p>
      <div className="overflow-x-auto rounded-lg border border-[var(--card-line)] bg-card">
        <table className="w-full min-w-[680px] border-collapse text-left text-sm">
          <caption className="sr-only">
            Requirements to set up Model Context Protocol in Claude — Node.js,
            Python, uv, a Claude client, a trusted MCP server, and a public
            HTTPS endpoint for remote servers — mapped to why each is needed and
            how to get it.
          </caption>
          <thead>
            <tr className="border-b border-[var(--border-default)]">
              <th
                scope="col"
                className="sticky left-0 z-10 bg-card px-4 py-3 font-medium text-text-dim"
              >
                Requirement
              </th>
              <th scope="col" className="px-4 py-3 font-medium text-text-dim">
                Why you need it
              </th>
              <th scope="col" className="px-4 py-3 font-medium text-text-dim">
                How to get it
              </th>
            </tr>
          </thead>
          <tbody>
            {requirementRows.map((row) => (
              <tr
                key={row.requirement}
                className="border-b border-[var(--border-subtle)] last:border-b-0"
              >
                <th
                  scope="row"
                  className="sticky left-0 z-10 bg-card px-4 py-3 font-medium text-text-primary"
                >
                  {row.requirement}
                </th>
                <td className="px-4 py-3 align-top text-text-secondary">
                  {row.why}
                </td>
                <td className="px-4 py-3 align-top text-itecs-blue">{row.how}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Shared window chrome (three dots + a title)                         */
/* ------------------------------------------------------------------ */

function WindowChrome({ title }: { title: string }) {
  return (
    <div className="flex items-center gap-2 border-b border-white/10 bg-white/5 px-4 py-2.5">
      <span className="flex gap-1.5" aria-hidden="true">
        <span className="h-2.5 w-2.5 rounded-full bg-white/25" />
        <span className="h-2.5 w-2.5 rounded-full bg-white/25" />
        <span className="h-2.5 w-2.5 rounded-full bg-white/25" />
      </span>
      <span className="font-mono text-xs text-white/70">{title}</span>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Claude Desktop config editor (real code, copy-friendly)             */
/* ------------------------------------------------------------------ */

const desktopConfigJson = `{
  "mcpServers": {
    "filesystem": {
      "command": "npx",
      "args": [
        "-y",
        "@modelcontextprotocol/server-filesystem",
        "/Users/you/projects"
      ]
    },
    "internal-api": {
      "command": "uvx",
      "args": ["my-company-mcp-server"],
      "env": {
        "API_TOKEN": "your-token-here"
      }
    }
  }
}`;

export function DesktopConfigBlock() {
  return (
    <figure className="not-prose my-2">
      <div className="overflow-hidden rounded-lg border border-[var(--card-line)] bg-itecs-navy shadow-sm">
        <WindowChrome title="claude_desktop_config.json" />
        <pre className="overflow-x-auto px-4 py-4 text-xs leading-relaxed text-white/85">
          <code>{desktopConfigJson}</code>
        </pre>
      </div>
      <figcaption className="mt-2 text-center text-sm italic text-ink-muted">
        A claude_desktop_config.json with two local servers — a Node filesystem
        server and a Python server — each under the mcpServers key with an
        absolute path.
      </figcaption>
    </figure>
  );
}

/* ------------------------------------------------------------------ */
/* Claude Desktop Settings → Developer panel (simulated UI)            */
/* ------------------------------------------------------------------ */

const statusServers = [
  { name: "filesystem", detail: "npx · @modelcontextprotocol/server-filesystem" },
  { name: "internal-api", detail: "uvx · my-company-mcp-server" },
];

export function DesktopStatusPanel() {
  return (
    <figure
      className="not-prose my-2"
      role="img"
      aria-label="A simulated Claude Desktop Settings Developer panel listing two MCP servers, filesystem and internal-api, each showing a green running indicator that confirms it connected."
    >
      <div className="overflow-hidden rounded-lg border border-[var(--card-line)] bg-card shadow-sm">
        <div className="border-b border-[var(--card-line)] px-4 py-2.5">
          <span className="font-mono text-xs text-text-dim" aria-hidden="true">
            Settings › Developer
          </span>
        </div>
        <ul className="divide-y divide-[var(--border-subtle)]">
          {statusServers.map((server) => (
            <li
              key={server.name}
              className="flex items-center justify-between gap-3 px-4 py-3"
            >
              <span className="min-w-0">
                <span className="block font-medium text-text-primary">
                  {server.name}
                </span>
                <span className="block truncate font-mono text-xs text-text-dim">
                  {server.detail}
                </span>
              </span>
              <span className="flex shrink-0 items-center gap-1.5 text-xs font-medium text-emerald-600">
                <span
                  className="h-2 w-2 rounded-full bg-emerald-500"
                  aria-hidden="true"
                />
                running
              </span>
            </li>
          ))}
        </ul>
      </div>
      <figcaption className="mt-2 text-center text-sm italic text-ink-muted">
        After a restart, the Developer panel shows a running indicator next to
        each connected server.
      </figcaption>
    </figure>
  );
}

/* ------------------------------------------------------------------ */
/* Claude Code terminal session (real commands, copy-friendly)         */
/* ------------------------------------------------------------------ */

const terminalSession = `$ claude mcp add --scope project filesystem \\
    -- npx -y @modelcontextprotocol/server-filesystem ~/projects
Added stdio MCP server "filesystem" to project config (.mcp.json)

$ claude mcp add --transport http --scope user linear https://mcp.linear.app/mcp
Added HTTP MCP server "linear" to user config

$ claude mcp list
filesystem   stdio   project   ✓ connected
linear       http    user      ✓ connected`;

export function ClaudeCodeTerminal() {
  return (
    <figure className="not-prose my-2">
      <div className="overflow-hidden rounded-lg border border-[var(--card-line)] bg-itecs-navy shadow-sm">
        <WindowChrome title="Terminal — claude" />
        <pre className="overflow-x-auto px-4 py-4 text-xs leading-relaxed text-white/85">
          <code>{terminalSession}</code>
        </pre>
      </div>
      <figcaption className="mt-2 text-center text-sm italic text-ink-muted">
        A Claude Code session adding a project-scoped stdio server and a
        user-scoped HTTP server, then listing both as connected.
      </figcaption>
    </figure>
  );
}

/* ------------------------------------------------------------------ */
/* Add custom connector dialog (simulated UI)                          */
/* ------------------------------------------------------------------ */

function MockField({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <span className="mb-1 block font-mono text-[11px] uppercase tracking-wide text-text-dim">
        {label}
      </span>
      <div className="truncate rounded-md border border-[var(--card-line)] bg-canvas px-3 py-2 font-mono text-xs text-text-secondary">
        {value}
      </div>
    </div>
  );
}

export function ConnectorDialog() {
  return (
    <figure
      className="not-prose my-2"
      role="img"
      aria-label="A simulated Add custom connector dialog in Claude settings, with a field for the remote MCP server URL set to https://mcp.example.com/sse, Advanced settings fields for an OAuth Client ID and Client Secret, and an Add button."
    >
      <div className="mx-auto max-w-md overflow-hidden rounded-lg border border-[var(--card-line)] bg-card p-5 shadow-sm">
        <p className="mb-4 font-display text-base font-semibold text-ink">
          Add custom connector
        </p>
        <div className="space-y-3">
          <MockField label="Remote MCP server URL" value="https://mcp.example.com/sse" />
          <div className="border-t border-[var(--border-subtle)] pt-3">
            <span className="mb-2 block text-xs font-medium text-text-secondary">
              Advanced settings
            </span>
            <div className="space-y-3">
              <MockField label="OAuth Client ID" value="client_a1b2c3d4" />
              <MockField label="OAuth Client Secret" value="••••••••••••••••" />
            </div>
          </div>
        </div>
        <div className="mt-5 flex justify-end gap-2">
          <span
            className="chamfer-sm px-3 py-1.5 text-xs font-medium text-text-dim"
            aria-hidden="true"
          >
            Cancel
          </span>
          <span
            className="flex items-center gap-1.5 chamfer-sm bg-itecs-blue px-3 py-1.5 text-xs font-medium text-white"
            aria-hidden="true"
          >
            <Check className="h-3.5 w-3.5" /> Add
          </span>
        </div>
      </div>
      <figcaption className="mt-2 text-center text-sm italic text-ink-muted">
        Adding a remote server as a custom connector — a URL, plus optional
        OAuth credentials under Advanced settings.
      </figcaption>
    </figure>
  );
}
