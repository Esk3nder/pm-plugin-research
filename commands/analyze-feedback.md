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
| `--source` | Feedback source (intercom, zendesk, all) | all |
| `--days` | Look back period in days | 30 |
| `--tag` | Filter by tag/label | none |
| `--output` | Output file path | stdout |

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

### 2. "Mobile app performance" (64 mentions)
- Sentiment: Mixed
- Sample quotes: [...]
- Recommended action: Investigate specific flows
```

## Prompt

You are analyzing user feedback to identify product opportunities.

Feedback data:
{{feedback_data}}

Analyze and produce:

1. **Classification** - Categorize each piece of feedback
2. **Theme Clustering** - Group related feedback
3. **Quantification** - Count and rank themes
4. **Sentiment Analysis** - Gauge user emotion per theme
5. **Recommendations** - Prioritized action items

Focus on actionable insights that could become roadmap items.
