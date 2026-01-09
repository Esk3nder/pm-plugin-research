# /sprint-review

Generate sprint review summaries from actual commits and PRs.

## Usage

```
/sprint-review
/sprint-review --sprint "2026-W02"
/sprint-review --format slides --output review.md
```

## Options

| Option | Description | Default |
|--------|-------------|---------|
| `--sprint` | Sprint identifier | current |
| `--format` | Output format (summary, slides, detailed) | summary |
| `--output` | Output file path | stdout |

## How It Works

1. **Gather Data** - Pulls commits, PRs, and issues from the sprint period
2. **Map to Goals** - Links work to sprint goals/roadmap items
3. **Calculate Metrics** - Velocity, completion rate, cycle time
4. **Generate Summary** - Creates stakeholder-ready review

## Output Format

```markdown
# Sprint Review: 2026-W02

## Goals vs Delivered

| Goal | Status | Notes |
|------|--------|-------|
| Auth overhaul | Complete | Shipped Monday |
| Performance fixes | Partial | 3/5 issues resolved |
| Mobile launch | Blocked | Waiting on App Store |

## Key Metrics

- Velocity: 34 points (vs 32 planned)
- PRs merged: 23
- Bugs fixed: 12
- Avg cycle time: 2.3 days

## Highlights

- Shipped OAuth integration ahead of schedule
- Reduced API latency by 40%

## Blockers & Risks

- App Store review taking longer than expected
- Need design review on settings page

## Next Sprint Focus

1. Complete mobile launch
2. Start analytics dashboard
```

## Prompt

You are generating a sprint review for stakeholders.

Sprint data:
- Commits: {{commits}}
- PRs: {{pull_requests}}
- Issues: {{issues}}
- Sprint goals: {{sprint_goals}}

Generate a concise, stakeholder-friendly review covering:
1. Goals vs actual delivery
2. Key metrics
3. Highlights worth celebrating
4. Blockers and risks
5. Recommendations for next sprint

Keep it scannable - executives should get the gist in 30 seconds.
