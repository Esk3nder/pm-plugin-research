# Spec to Tasks Workflow

Break down an approved PRD into implementation tasks.

## Trigger

- PRD approved by stakeholders
- Ready for engineering handoff
- `/sync-roadmap` with new spec

## Steps

### 1. Parse the PRD

Extract:
- Implementation phases
- Technical requirements
- Dependencies
- Success criteria

### 2. Generate Tasks

For each phase, create tasks that are:
- **Atomic** - One clear deliverable
- **Testable** - Clear done criteria
- **Sized** - Fits in a sprint
- **Ordered** - Respects dependencies

### 3. Add Context

Each task includes:
- Link back to PRD section
- Relevant code references
- Acceptance criteria
- Estimated size (S/M/L)

### 4. Sync to Platform

Push tasks to Linear/Jira/GitHub with:
- Proper labels and tags
- Dependency links
- Milestone assignment
- Owner assignment (if known)

## Task Template

```markdown
## Task: {{Title}}

**PRD Reference:** [Section Link]
**Size:** M
**Dependencies:** Task-123, Task-124

### Description

[What needs to be done]

### Technical Notes

Files to modify:
- `src/auth/oauth.ts` - Add provider config
- `src/api/auth.ts` - New endpoints

### Acceptance Criteria

- [ ] OAuth flow works for Google
- [ ] Tokens stored securely
- [ ] Existing sessions unaffected
- [ ] Tests passing
```

## Output

A set of linked tasks in your project management tool, each:
- Traceable to PRD
- Properly sized
- Dependency-ordered
- Ready for sprint planning

## Example

```
Input: OAuth PRD (approved)

→ Parse: 3 phases, 8 requirements
→ Generate:
   - Task 1: Add OAuth provider config (S)
   - Task 2: Implement OAuth callback (M)
   - Task 3: Token storage (M)
   - Task 4: Session integration (L)
   - Task 5: UI login buttons (S)
   - Task 6: E2E tests (M)
→ Sync: 6 issues created in Linear
→ Output: ENG-201 through ENG-206 linked to PRD
```
