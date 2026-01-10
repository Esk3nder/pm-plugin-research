# /analyze-feedback

Synthesize user feedback from support channels into actionable insights.

## Usage

```
/analyze-feedback --source intercom --days 30
/analyze-feedback --source zendesk --tag "feature-request"
/analyze-feedback --source all --output feedback-report.md
```

## Options

| Option | Description | Default |
|--------|-------------|---------|
| `--source` | Feedback source (intercom, zendesk, all, file) | all |
| `--days` | Look back period in days | 30 |
| `--tag` | Filter by tag/label | none |
| `--output` | Output file path | stdout |
| `--file` | Local JSON file (if source=file) | feedback.json |

## How It Works

1. **Fetch** - Pulls conversations/tickets from configured sources
2. **Classify** - Categorizes into bugs, feature requests, questions, praise
3. **Cluster** - Groups similar feedback into themes
4. **Quantify** - Counts frequency and sentiment per theme
5. **Recommend** - Suggests features/fixes based on impact

## Output Format

```markdown
# Feedback Analysis (Last 30 Days)

## Summary
- Total conversations: 847
- Feature requests: 234 (28%)
- Bug reports: 156 (18%)
- Questions: 389 (46%)
- Praise: 68 (8%)

## Top Themes

### 1. "Export to PDF" (87 mentions)
- Sentiment: Frustrated
- Sample quotes: [...]
- Recommended action: Add to Q2 roadmap
```

## Prompt

You are analyzing user feedback to identify product opportunities.

Steps:
1. Call `feedback_fetch` with the provided source, days, tag, or file path.
2. If no data is returned, explain required configuration and stop.
3. Classify each item into: bug, feature request, question, praise, churn risk.
4. Cluster into themes and quantify counts.
5. Produce prioritized recommendations.

Focus on actionable insights that could become roadmap items. Redact PII and do not quote full messages.
