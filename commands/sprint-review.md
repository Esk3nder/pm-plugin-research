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
| `--sprint` | Sprint identifier or date range | current |
| `--format` | Output format (summary, slides, detailed) | summary |
| `--output` | Output file path | stdout |

## How It Works

1. **Gather Data** - Pulls commits, PRs, and issues from the sprint period
2. **Map to Goals** - Links work to sprint goals/roadmap items
3. **Calculate Metrics** - Velocity, completion rate, cycle time (best-effort)
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

- PRs merged: 23
- Bugs fixed: 12

## Highlights

- Shipped OAuth integration ahead of schedule
- Reduced API latency by 40%
```

## Prompt

You are generating a sprint review for stakeholders.

Steps:
1. Determine sprint date range. If none provided, use the last 14 days.
2. Collect data:
   - `git log --since <date> --pretty=format:"%h|%ad|%s"`
   - If `gh` CLI is available, fetch merged PRs for the range.
3. Identify sprint goals from `ROADMAP.md` or recent sprint docs if present.
4. Produce a concise review with goals vs delivery, metrics, highlights, risks, and next focus.

If any data source is missing, note it and proceed with what you have.
