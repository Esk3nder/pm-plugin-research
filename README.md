# PM Toolkit

> The first Claude Code plugin that makes PMs and engineers work from the **same source of truth** - your codebase.

[![Claude Code Plugin](https://img.shields.io/badge/Claude%20Code-Plugin-blue)](https://code.claude.com/docs/en/plugins)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

## Why PM Toolkit?

| Problem | How PM Toolkit Solves It |
|---------|--------------------------|
| PRDs live in Notion, code lives in IDE | **Codebase-aware PRDs** that reference your actual architecture |
| PMs use 5+ tools that don't talk | **Unified workflow** across Linear, Jira, GitHub Projects |
| User feedback never reaches engineers | **Feedback → Feature pipeline** with auto-tagging |
| Roadmaps are static PowerPoints | **Living roadmaps** synced to actual delivery status |
| PRD → Implementation is a black hole | **Full traceability** from spec to merged PR |

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
| `/sync-roadmap` | Sync roadmap items to Linear, Jira, or GitHub Projects |
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
| `jira-pm` | Jira optimized for PM workflows |
| `feedback-hub` | Unified Intercom/Zendesk/Support interface |

## Installation

### From Claude Code

```bash
claude plugin add pm-toolkit
```

### Manual Installation

```bash
git clone https://github.com/Esk3nder/pm-plugin-research.git ~/.claude/plugins/pm-toolkit
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
│       ├── SKILL.md         # Core PM skill
│       ├── Workflows/       # PM workflow definitions
│       └── Templates/       # PRD, RFC, Launch Plan templates
├── mcp-servers/
│   ├── jira-pm/             # Jira MCP server
│   └── feedback-hub/        # Feedback aggregation server
├── hooks/
│   └── hooks.json           # Event hooks
└── docs/
    └── COMPETITIVE_ANALYSIS.md  # Market research
```

## Roadmap

- [x] **V0** - Research & Architecture
- [ ] **V1** - Codebase-aware PRD Generator
- [ ] **V2** - Linear/GitHub Projects Integration
- [ ] **V3** - Feedback Pipeline (Intercom/Zendesk)
- [ ] **V4** - Living Roadmaps with Real-time Sync

## Configuration

Create `.pm-toolkit.json` in your project root:

```json
{
  "integrations": {
    "linear": {
      "teamId": "your-team-id"
    },
    "jira": {
      "projectKey": "PROJ"
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

## Documentation

- [Competitive Analysis](docs/COMPETITIVE_ANALYSIS.md) - Market research and positioning
- [Architecture Decision Records](docs/adr/) - Key technical decisions
- [Contributing](CONTRIBUTING.md) - How to contribute

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
