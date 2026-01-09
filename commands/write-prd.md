# /write-prd

Generate a codebase-aware Product Requirements Document.

## Arguments

The feature description follows the command:
```
/write-prd <feature description>
```

## Instructions

When this command is invoked, follow these steps exactly:

### Step 1: Parse Input

Extract the feature description from the command arguments. If no description provided, ask:
> What feature would you like me to write a PRD for?

### Step 2: Analyze the Codebase

Before writing anything, understand the project:

**2.1 Project Structure**
```
Use Glob to find key files:
- package.json, Cargo.toml, pyproject.toml (project type)
- README.md (project description)
- src/**/*.{ts,js,py,rs,go} (source files, limit to 20)
- **/test*/** or **/*_test.* (test patterns)
```

**2.2 Identify Relevant Code**
```
Use Grep to find code related to the feature:
- Search for keywords from the feature description
- Find similar existing features
- Locate API endpoints, services, or modules that might be affected
```

**2.3 Read Key Files**
```
Read 3-5 most relevant files to understand:
- Current architecture patterns
- Existing implementations to follow
- Integration points
```

### Step 3: Generate the PRD

Write a complete PRD with these sections. Be SPECIFIC - reference actual files and code from the codebase.

```markdown
# PRD: [Feature Name]

**Author:** [User or "PM Toolkit"]
**Status:** Draft
**Created:** [Today's date]

---

## Problem Statement

[2-3 sentences describing the problem. Be specific about WHO has this problem and WHY it matters.]

### User Impact
[How users are affected today without this feature]

### Business Impact
[Why solving this matters - revenue, retention, efficiency, etc.]

---

## Goals

- [ ] [Specific, measurable goal 1]
- [ ] [Specific, measurable goal 2]
- [ ] [Specific, measurable goal 3]

## Non-Goals

- [Explicitly what we're NOT building]
- [Scope boundaries]

---

## User Stories

**Primary User: [Type]**
- As a [user], I want [action] so that [benefit]

---

## Technical Context

### Relevant Codebase

| Area | Files | Notes |
|------|-------|-------|
| [Area] | `[actual/path/from/codebase]` | [what it does] |

### Existing Patterns

[Reference actual patterns from the codebase you analyzed]

### Dependencies

- External: [APIs, services]
- Internal: [modules this touches]

---

## Proposed Solution

### Overview

[1 paragraph high-level approach]

### Implementation Phases

#### Phase 1: [Name]

**Goal:** [What this achieves]

Tasks:
- Modify `[actual/file.ts]` to [change]
- Create `[new/path/]` for [purpose]

**Deliverable:** [What's shippable]

---

## Success Metrics

| Metric | Current | Target |
|--------|---------|--------|
| [Metric] | [Value] | [Value] |

---

## Open Questions

1. [ ] [Real question that needs stakeholder input]
2. [ ] [Technical decision to make]
```

### Step 4: Review Pass

After generating the draft, do a quick review:

**Engineering lens:** Is this technically feasible? Did I miss dependencies?
**Scope lens:** Is this too big? Should it be split into phases?

Fix any issues found.

### Step 5: Output

Present the final PRD to the user. If they specified `--output <file>`, write to that file instead.

---

## Examples

**Example 1:**
```
/write-prd "Add OAuth login with Google and GitHub"
```
→ Scans codebase for existing auth
→ Finds `src/auth/` and `src/api/login.ts`
→ Generates PRD referencing those files

**Example 2:**
```
/write-prd "Performance optimization for dashboard loading"
```
→ Finds dashboard components
→ Identifies current data fetching patterns
→ Generates PRD with specific optimization targets

---

## What Makes This Different

This command produces **codebase-aware** PRDs:
- References actual files, not hypothetical ones
- Follows existing patterns in your project
- Implementation plan uses real module names
- Technical context is grounded in reality
