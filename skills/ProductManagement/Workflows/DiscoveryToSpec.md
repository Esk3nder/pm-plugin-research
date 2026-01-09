# Discovery to Spec Workflow

Transform a feature idea into an implementation-ready specification.

## Trigger

- User mentions a new feature idea
- `/write-prd` command invoked
- Roadmap item needs detailed spec

## Steps

### 1. Clarify Intent

Ask focused questions to understand:
- What problem are we solving?
- Who has this problem?
- What does success look like?

### 2. Analyze Codebase

```
Glob: Find relevant files
├── **/*auth* (if auth-related)
├── **/*api* (if API-related)
└── src/**/*.ts (general structure)

Grep: Find patterns
├── "class.*Service" (services)
├── "export.*function" (utilities)
└── "interface.*" (types)

Read: Understand architecture
├── Key modules
├── Existing patterns
└── Integration points
```

### 3. Draft PRD

Use the PRD template with:
- Codebase context injected
- Specific file references
- Realistic implementation plan

### 4. Multi-Perspective Review

Run the draft through three lenses:

**Engineering Review:**
- Is the technical approach sound?
- What's the estimated complexity?
- Are there hidden dependencies?

**Design Review:**
- Is the user experience clear?
- What edge cases exist?
- Does it fit existing patterns?

**QA Review:**
- How do we test this?
- What could break?
- What's the rollback plan?

### 5. Finalize

- Incorporate review feedback
- List open questions
- Output final PRD

## Output

A complete PRD ready for engineering handoff, with:
- Clear problem statement
- Codebase-aware technical context
- Implementation phases
- Success metrics
- Open questions

## Example

```
Input: "Add OAuth support"

→ Clarify: "Which providers? Google, GitHub, both?"
→ Analyze: Found src/auth/, existing session management
→ Draft: PRD with OAuth flow, existing auth integration
→ Review: Engineering says 2 weeks, Design needs mockups
→ Output: Complete PRD with phases and milestones
```
