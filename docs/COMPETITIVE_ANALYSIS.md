# Claude Code PM Plugin - Competitive Research

> Research conducted: 2026-01-09

## Executive Summary

This research analyzes the competitive landscape for Claude Code plugins targeting product managers. The goal: identify gaps and opportunities to build a differentiated PM toolkit that absorbs and beats existing offerings.

**Key Finding:** No existing solution combines codebase-awareness with multi-platform PM tool integration. This is the gap to exploit.

---

## Table of Contents

1. [Landscape Overview](#landscape-overview)
2. [Competitor Deep-Dives](#competitor-deep-dives)
3. [Structural Patterns](#structural-patterns)
4. [Market Gaps & Opportunities](#market-gaps--opportunities)
5. [How to Win](#how-to-win)
6. [Recommended Architecture](#recommended-architecture)
7. [Go-to-Market Sequence](#go-to-market-sequence)
8. [Sources](#sources)

---

## Landscape Overview

| Category | Key Players | Approach | Gap |
|----------|-------------|----------|-----|
| **Standalone AI PM Tools** | ChatPRD, Chisel, Zeda.io | SaaS apps, chat-based | Not integrated into dev workflow |
| **MCP Servers** | GitHub Project Manager, Productboard MCP | Tool integrations | Narrow focus (one platform each) |
| **Claude Code Skills** | @zenobi-us/product-manager | Skill file only | Surface-level, no tools/workflows |
| **Educational** | CCforPMs.com | Course content | Teaches Claude Code use, not a plugin |

---

## Competitor Deep-Dives

### ChatPRD

**Website:** [chatprd.ai](https://www.chatprd.ai/)

**What it is:** Standalone SaaS ($5/mo) for PRD generation

**Structure:** Web app with templates, AI coaching, team sharing

**Strengths:**
- 50,000+ users, 500,000+ docs generated
- "Chief Product Officer" feedback loop
- Integrations: Slack, Linear, Notion, Confluence
- MCP server for IDE integration (new)

**Weaknesses:**
- Separate tool from development workflow
- Generic templates, not codebase-aware
- No connection to actual implementation tracking

---

### GitHub Project Manager MCP

**Repository:** [github.com/kunwarVivek/mcp-github-project-manager](https://github.com/kunwarVivek/mcp-github-project-manager)

**What it is:** MCP server for AI-powered GitHub Projects management

**Structure:** Clean Architecture (Domain → Infrastructure → Service → MCP)

**Tools provided:**
- `generate_prd` - PRD from project concepts
- `parse_prd` - PRD → actionable tasks
- `create_roadmap` - Timeline visualization
- `add_feature` - Impact analysis
- Requirements traceability (business → features → use cases → tasks)

**Strengths:**
- Full end-to-end tracking
- Multi-provider AI (Claude, OpenAI, Gemini)
- Context levels (minimal/standard/full)

**Weaknesses:**
- GitHub-only (no Productboard, Linear, Jira)
- Complex setup
- No user research or feedback integration

---

### Productboard MCP

**Repository:** [github.com/Enreign/productboard-mcp](https://github.com/Enreign/productboard-mcp)

**What it is:** 49-tool MCP server for Productboard API

**Structure:** Node.js/TypeScript with comprehensive CRUD

**Tools:** Features, Products, Notes, OKRs, Releases, Custom Fields, Analytics

**Strengths:**
- 100% Productboard API coverage
- Real analytics (feature metrics, engagement, feedback trends)
- Bulk operations, webhooks

**Weaknesses:**
- Productboard-only (expensive platform)
- No AI-powered workflows, just API wrapper
- No PRD generation or strategic thinking

---

### @zenobi-us/product-manager Skill

**URL:** [claude-plugins.dev](https://claude-plugins.dev/skills/@zenobi-us/dotfiles/product-manager)

**What it is:** Claude Code skill file for PM persona

**Structure:** Single SKILL.md with persona definition

**Capabilities claimed:**
- Roadmap planning, feature prioritization
- User research, analytics
- Cross-functional collaboration

**Weaknesses:**
- **No actual tools** - just prompt engineering
- No MCP integrations
- No workflows or templates
- No actionable outputs beyond conversation

---

### alirezarezvani/claude-skills

**Repository:** [github.com/alirezarezvani/claude-skills](https://github.com/alirezarezvani/claude-skills)

**What it is:** 48 skills across domains, including 5 for Product Teams

**Structure:**
```
skill-name/
├── SKILL.md         # Entry point
├── scripts/         # Python CLI tools
├── references/      # Frameworks
└── assets/          # Templates
```

**Product skills:** PM, Agile Delivery, Strategic Planning, UX Research, Design Systems

**Strengths:**
- Modular, well-structured
- Includes actual scripts (not just prompts)
- Cross-agent compatible

**Weaknesses:**
- Scripts are analysis tools, not integrations
- No MCP servers
- Generic frameworks vs. executable workflows

---

## Structural Patterns

### Best Practices Observed

| Component | Best Practice | Who Does It Well |
|-----------|---------------|------------------|
| **SKILL.md** | YAML frontmatter + Markdown workflows | alirezarezvani |
| **Tools/Scripts** | Python or TS CLIs with Zod validation | GitHub PM MCP |
| **References** | Framework docs, templates | alirezarezvani |
| **MCP Integration** | Stdio-based, multi-provider AI | GitHub PM MCP |
| **Hooks** | PreToolUse, PostToolUse lifecycle | Claude Code native |

### Official Plugin Directory Structure

```
my-plugin/
├── .claude-plugin/
│   └── plugin.json    # Manifest
├── commands/          # Slash commands
├── agents/            # Custom agents
├── skills/            # SKILL.md files
├── hooks/             # Event handlers
└── .mcp.json          # MCP servers
```

---

## Market Gaps & Opportunities

| Gap | Impact | Opportunity |
|-----|--------|-------------|
| **No unified PM toolkit** | PMs use 5+ tools that don't talk | Single plugin integrating Linear, Jira, Productboard, Notion |
| **PRDs disconnected from code** | PRDs live in Notion, code lives in IDE | PRD → Issue → PR → Merge traceability in one flow |
| **No codebase-aware PRDs** | Generic AI PRDs miss technical context | PRD generation that reads your actual codebase architecture |
| **User research siloed** | Feedback in Intercom, never reaches devs | Feedback → Feature → Task automated pipeline |
| **Roadmaps are static** | PowerPoint slides that rot | Living roadmaps synced to actual delivery status |
| **No PM-specific Claude Code** | Skills exist but are shallow | Deep workflows: Discovery → Spec → Track → Ship |

---

## How to Win

### Strategic Positioning

```
"The first Claude Code plugin that makes PMs and engineers
work from the SAME source of truth - your codebase."
```

- ChatPRD = standalone PRD tool (separate)
- GitHub PM MCP = GitHub-only (narrow)
- Productboard MCP = one platform (expensive)
- **Your plugin** = unified workflow across tools, codebase-aware

### Core Differentiators to Build

| Differentiator | Why It Wins | Technical Approach |
|----------------|-------------|-------------------|
| **Codebase-aware PRDs** | PRDs reference actual code modules | Glob/Grep codebase → inject architecture into prompts |
| **Multi-platform sync** | One roadmap, multiple tools | MCP servers for Linear + Jira + GitHub Projects |
| **Feedback → Feature pipeline** | User voice reaches engineers | Integrate Intercom/Zendesk APIs, auto-tag features |
| **Living traceability** | PRD → Issue → PR → Merge links | Hook into git commits, auto-update status |
| **PM-specific subagents** | Specialized assistants | `user-researcher`, `spec-writer`, `roadmap-planner` |
| **Template library** | Instant value | PRD, RFC, Launch Plan, Retrospective templates |

### Competitive Moat

| Competitor Move | Your Defense |
|-----------------|--------------|
| ChatPRD adds MCP | You're already codebase-aware (they can't be) |
| GitHub PM MCP adds other platforms | You have PM-native workflows (they're dev-focused) |
| Productboard MCP adds AI | You're Claude Code native (they're API-only) |
| New entrants | You're in the ecosystem early, building network effects |

---

## Recommended Architecture

```
pm-toolkit/
├── .claude-plugin/
│   └── plugin.json
├── commands/
│   ├── write-prd.md         # /write-prd
│   ├── sync-roadmap.md      # /sync-roadmap
│   ├── analyze-feedback.md  # /analyze-feedback
│   └── sprint-review.md     # /sprint-review
├── agents/
│   ├── spec-writer.md       # Deep PRD drafting
│   ├── user-researcher.md   # Feedback synthesis
│   └── roadmap-planner.md   # Timeline/dependency planning
├── skills/
│   └── ProductManagement/
│       ├── SKILL.md
│       ├── Workflows/
│       │   ├── DiscoveryToSpec.md
│       │   ├── SpecToTasks.md
│       │   └── TrackDelivery.md
│       └── Templates/
│           ├── PRD.md
│           ├── RFC.md
│           └── LaunchPlan.md
├── mcp-servers/
│   └── feedback-hub/        # Intercom/Zendesk unified
├── mcp-remotes/
│   ├── linear              # Official remote MCP server
│   └── atlassian-rovo      # Jira/Confluence/Compass via Rovo MCP
├── hooks/
│   └── hooks.json           # Auto-update on commit, PR events
└── .mcp.json
```

---

## Go-to-Market Sequence

| Phase | Focus | Absorbs |
|-------|-------|---------|
| **V1** | PRD Generator - Codebase-aware PRDs | ChatPRD |
| **V2** | Linear/GitHub Integration - PRD → Issue sync | GitHub PM MCP |
| **V3** | Feedback Pipeline - User voice to features | Productboard value |
| **V4** | Living Roadmaps - Real-time status sync | All competitors |

---

## Sources

- [Composio: Claude Code Plugins](https://composio.dev/blog/claude-code-plugin)
- [Apidog: Top 10 MCP Servers for Claude Code 2026](https://apidog.com/blog/top-10-mcp-servers-for-claude-code/)
- [Anthropic: Claude Code Plugins](https://www.anthropic.com/news/claude-code-plugins)
- [Claude Code Docs: Create Plugins](https://code.claude.com/docs/en/plugins)
- [ChatPRD](https://www.chatprd.ai/)
- [GitHub Project Manager MCP](https://github.com/kunwarVivek/mcp-github-project-manager)
- [Productboard MCP](https://github.com/Enreign/productboard-mcp)
- [@zenobi-us/product-manager skill](https://claude-plugins.dev/skills/@zenobi-us/dotfiles/product-manager)
- [alirezarezvani/claude-skills](https://github.com/alirezarezvani/claude-skills)
- [Claude Code for PMs Course](https://ccforpms.com/)
- [BuildBetter: Best AI PM Tools 2025](https://blog.buildbetter.ai/12-best-ai-product-management-tools-for-2025/)
- [Productboard AI Agents](https://www.productboard.com/blog/the-power-of-ai-agents-in-product-operations-workflows/)

---

## Next Steps

1. **Validate** - Interview PMs about their actual pain points
2. **Prototype** - Build V1 codebase-aware PRD generator
3. **Test** - Dogfood on your own projects
4. **Iterate** - Add integrations based on demand
