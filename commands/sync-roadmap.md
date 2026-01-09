# /sync-roadmap

Sync your roadmap to Linear, Jira, or GitHub Projects.

## Usage

```
/sync-roadmap --target linear
/sync-roadmap --target jira --project PROJ
/sync-roadmap --target github --repo owner/repo
```

## Options

| Option | Description | Required |
|--------|-------------|----------|
| `--target` | Target platform (linear, jira, github) | Yes |
| `--project` | Project key (Jira) or team (Linear) | Depends |
| `--repo` | GitHub repository (owner/repo) | For GitHub |
| `--dry-run` | Preview changes without applying | No |

## How It Works

1. **Read Roadmap** - Parses your local roadmap file (markdown or JSON)
2. **Diff State** - Compares with existing items in target platform
3. **Sync** - Creates, updates, or archives items to match
4. **Link** - Maintains bidirectional links between local and remote

## Roadmap Format

Create `ROADMAP.md` in your project root:

```markdown
# Roadmap

## Q1 2026

### Authentication Overhaul
- Status: In Progress
- Priority: P0
- Owner: @alice
- Linear: ENG-123

### Performance Optimization
- Status: Planned
- Priority: P1
- Owner: @bob
```

## Prompt

You are syncing a product roadmap to {{target}}.

Current roadmap:
{{roadmap_content}}

Existing items in {{target}}:
{{existing_items}}

Generate the sync operations needed:
1. Items to CREATE (in roadmap but not in {{target}})
2. Items to UPDATE (status/priority changed)
3. Items to ARCHIVE (in {{target}} but removed from roadmap)

For each operation, provide the exact API call parameters.
