# PM Toolkit

> The first Claude Code plugin that makes PMs and engineers work from the **same source of truth** - your codebase.

[![Claude Code Plugin](https://img.shields.io/badge/Claude%20Code-Plugin-blue)](https://code.claude.com/docs/en/plugins)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

## Why PM Toolkit?

| Problem | How PM Toolkit Solves It |
|---------|--------------------------|
| PRDs live in Notion, code lives in IDE | **Codebase-aware PRDs** that reference your actual architecture |
| PMs use 5+ tools that don't talk | **Unified workflow** across Linear, Jira, GitHub Issues |
| User feedback never reaches engineers | **Feedback → Feature pipeline** with auto-tagging |
| Roadmaps are static PowerPoints | **Living roadmaps** synced to actual delivery status |
| PRD → Implementation is a black hole | **Traceability** from spec to merged PR |

## Quick Start

```bash
# Install the plugin
claude plugin add pm-toolkit

# Generate a codebase-aware PRD
/write-prd "Add user authentication"

# Sync your roadmap to Linear
/sync-roadmap --target linear

# Analyze user feedback
/analyze-feedback --source intercom --days 30
```

## Features

### Commands

| Command | Description |
|---------|-------------|
| `/write-prd` | Generate PRDs that understand your codebase architecture |
| `/sync-roadmap` | Sync roadmap items to Linear, Jira, or GitHub Issues |
| `/analyze-feedback` | Synthesize user feedback from Intercom, Zendesk, etc. |
| `/sprint-review` | Generate sprint review summaries from actual commits |

### Agents

| Agent | Purpose |
|-------|---------|
| `spec-writer` | Deep PRD drafting with multi-perspective review |
| `user-researcher` | Feedback synthesis and insight extraction |
| `roadmap-planner` | Timeline planning with dependency analysis |

### MCP Integrations

| Server | Capabilities |
|--------|-------------|
| `linear` | [Linear's official MCP server](https://linear.app/developers/mcp-server) - issues, projects, comments |
| `atlassian-rovo` | Atlassian Rovo MCP server for Jira/Confluence/Compass |
| `feedback-hub` | Unified Intercom/Zendesk feedback ingestion |

## Installation

### From Claude Code

```bash
claude plugin add pm-toolkit
```

### Manual Installation

```bash
git clone https://github.com/Esk3nder/pm-plugin-research.git ~/.claude/plugins/pm-toolkit
```

## Configuration & Auth

PM Toolkit reads config from `.pm-toolkit.json` (project root) and environment variables.

### Environment Variables

```
# Intercom
INTERCOM_ACCESS_TOKEN=xxx
INTERCOM_BASE_URL=https://api.intercom.io
INTERCOM_VERSION=2.14

# Zendesk
ZENDESK_SUBDOMAIN=yourco
ZENDESK_EMAIL=you@company.com
ZENDESK_API_TOKEN=xxx
```

### .pm-toolkit.json

```json
{
  "integrations": {
    "linear": {
      "teamId": "your-team-id"
    },
    "jira": {
      "projectKey": "PROJ"
    },
    "intercom": {
      "accessToken": "token"
    },
    "zendesk": {
      "subdomain": "yourco",
      "email": "you@company.com",
      "apiToken": "token"
    }
  },
  "templates": {
    "prd": "default",
    "rfc": "lightweight"
  },
  "codebaseContext": {
    "include": ["src/**", "packages/**"],
    "exclude": ["node_modules", "dist"]
  }
}
```

## Linear Integration

PM Toolkit uses [Linear's official MCP server](https://linear.app/developers/mcp-server). To authenticate:

```bash
# In Claude Code, run:
/mcp
```

This starts the OAuth flow with Linear. Once authenticated, you can use:
- `/sync-roadmap --target linear` - Sync your roadmap to Linear
- `roadmap-planner` agent - Plan timelines with Linear issue tracking

## Atlassian (Jira/Confluence) Integration

PM Toolkit uses the Atlassian Rovo MCP server. To authenticate:

```bash
# In Claude Code, run:
/mcp
```

Complete the OAuth flow for your Atlassian site. Once authenticated, you can use:
- `/sync-roadmap --target jira` - Sync your roadmap to Jira

## Delivery Tracking Hooks

The plugin ships a hook that records merged PRs into `.pm-toolkit/delivery-log.md`.

## Plugin Structure

```
pm-toolkit/
├── .claude-plugin/
│   └── plugin.json          # Plugin manifest
├── commands/
│   ├── write-prd.md         # /write-prd command
│   ├── sync-roadmap.md      # /sync-roadmap command
│   ├── analyze-feedback.md  # /analyze-feedback command
│   └── sprint-review.md     # /sprint-review command
├── agents/
│   ├── spec-writer.md       # PRD drafting agent
│   ├── user-researcher.md   # Feedback synthesis agent
│   └── roadmap-planner.md   # Timeline planning agent
├── skills/
│   └── ProductManagement/
│       └── SKILL.md         # Core PM skill
├── mcp-servers/
│   └── feedback-hub/        # Feedback aggregation server
├── hooks/
│   ├── hooks.json           # Event hooks
│   └── on-pr-merge.ts       # Delivery log updater
└── docs/
    └── COMPETITIVE_ANALYSIS.md  # Market research
```

## Roadmap

- [x] **V0** - Research & Architecture
- [x] **V1** - Codebase-aware PRD Generator
- [x] **V2** - Feedback MCP Server + Atlassian Rovo integration
- [ ] **V3** - GitHub Projects sync
- [ ] **V4** - Living Roadmaps with Real-time Sync

## Documentation

- [Competitive Analysis](docs/COMPETITIVE_ANALYSIS.md) - Market research and positioning

## Comparison

| Feature | PM Toolkit | ChatPRD | GitHub PM MCP | Productboard MCP |
|---------|------------|---------|---------------|------------------|
| Codebase-aware | **Yes** | No | No | No |
| Multi-platform | **Yes** | Limited | GitHub only | Productboard only |
| PRD Generation | **Yes** | Yes | Yes | No |
| Feedback Pipeline | **Yes** | No | No | Yes |
| Claude Code Native | **Yes** | MCP only | MCP | MCP |
| Price | **Free** | $5/mo | Free | Free |

## License

MIT

## Credits

Built by [@Esk3nder](https://github.com/Esk3nder)
