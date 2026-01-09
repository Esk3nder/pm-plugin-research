# Track Delivery Workflow

Monitor progress and keep stakeholders updated.

## Trigger

- Active development on roadmap item
- Sprint in progress
- `/sprint-review` command
- Stakeholder requests update

## Steps

### 1. Gather Activity

Pull from multiple sources:
- **Git:** Commits, PRs, merges
- **Issues:** Status changes, comments
- **CI/CD:** Build status, deployments

### 2. Map to Goals

Connect activity to:
- Roadmap items
- Sprint goals
- PRD requirements

### 3. Calculate Metrics

- **Progress:** % complete vs planned
- **Velocity:** Points/items completed
- **Cycle Time:** PR open to merge
- **Blockers:** Open issues blocking progress

### 4. Generate Update

Create stakeholder-appropriate summary:
- Executive: High-level status
- Team: Detailed progress
- Technical: Metrics and blockers

### 5. Sync State

Update roadmap/tracking tools:
- Mark completed items
- Update progress %
- Flag blocked items

## Update Templates

### Executive Summary

```markdown
## {{Feature}} - Status Update

**Status:** On Track / At Risk / Blocked
**Progress:** 70% complete
**Target:** Feb 15

### Highlights
- OAuth integration shipped
- SSO in final testing

### Risks
- Enterprise testing delayed

### Next Week
- Complete SSO rollout
- Begin analytics work
```

### Team Update

```markdown
## Sprint {{N}} Progress

### Completed (8 points)
- [x] ENG-201: OAuth config
- [x] ENG-202: OAuth callback

### In Progress (5 points)
- [ ] ENG-203: Token storage (80%)
- [ ] ENG-204: Session integration (50%)

### Blocked
- ENG-205: Waiting on design review

### Metrics
- Velocity: 8 pts (vs 10 planned)
- Cycle time: 2.1 days avg
```

## Output

- Updated roadmap status
- Stakeholder communication
- Risk flags if needed
- Recommended actions

## Example

```
Input: Mid-sprint check-in

→ Gather: 12 commits, 4 PRs merged, 2 open
→ Map: 3/5 sprint goals in progress
→ Calculate: 60% complete, on track
→ Generate: Team update with blockers
→ Sync: Linear statuses updated
→ Output: "On track for sprint goal"
```
