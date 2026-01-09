---
name: ProductManagement
description: Core PM skill for product strategy, PRD writing, and delivery tracking. USE WHEN writing PRDs OR planning roadmaps OR analyzing feedback OR reviewing sprints.
tier: deferred
triggers:
  - prd
  - roadmap
  - product
  - feature request
  - user feedback
  - sprint
  - backlog
---

# Product Management

Expert product management capabilities for Claude Code.

## What This Skill Enables

- **Codebase-Aware PRDs** - Specs that reference your actual architecture
- **Living Roadmaps** - Synced to Linear, Jira, GitHub Projects
- **Feedback Synthesis** - User voice to actionable features
- **Sprint Intelligence** - Reviews from actual commits

## Workflows

| Workflow | Trigger | Description |
|----------|---------|-------------|
| **DiscoveryToSpec** | New feature idea | Explore → Validate → Specify |
| **SpecToTasks** | Approved PRD | Break down into implementation tasks |
| **TrackDelivery** | Active development | Monitor progress, update stakeholders |

## Core Principles

### 1. Codebase is Truth

Never write a PRD in isolation. Always:
- Scan relevant code modules
- Reference existing patterns
- Identify integration points

### 2. Multi-Perspective Review

Every spec gets reviewed through three lenses:
- **Engineering:** Is it buildable?
- **Design:** Is the UX clear?
- **QA:** How do we test this?

### 3. Traceability

Maintain links from:
- PRD → Issues → PRs → Commits → Merge

### 4. Living Documents

Roadmaps and specs update automatically based on:
- Git activity
- Issue status changes
- Milestone completions

## Templates

### PRD Template

```markdown
# PRD: {{Feature}}

## Problem
## Goals / Non-Goals
## User Stories
## Technical Context
## Proposed Solution
## Success Metrics
## Open Questions
```

### RFC Template

```markdown
# RFC: {{Decision}}

## Context
## Decision
## Consequences
## Alternatives Considered
```

### Launch Plan Template

```markdown
# Launch: {{Feature}}

## Overview
## Rollout Phases
## Success Criteria
## Rollback Plan
## Communication Plan
```

## Integration Points

This skill coordinates with:

- **linear** MCP server (Linear's official remote server) for issue management
- **jira-pm** MCP server for Jira workflows
- **feedback-hub** MCP server for user feedback

## Examples

**Example 1: Write a PRD**
```
User: "Write a PRD for adding OAuth support"
→ Skill triggers DiscoveryToSpec workflow
→ Scans codebase for auth-related files
→ Drafts PRD with code references
→ Runs multi-perspective review
→ Outputs implementation-ready spec
```

**Example 2: Sync roadmap**
```
User: "Sync our roadmap to Linear"
→ Skill reads ROADMAP.md
→ Compares with Linear state
→ Generates sync operations
→ Applies changes via MCP
```
