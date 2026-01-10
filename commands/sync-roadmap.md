# /sync-roadmap

Sync your roadmap to Linear, Jira, or GitHub Issues.

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
| `--dry-run` | Preview changes without applying | Default: true |

## How It Works

1. **Read Roadmap** - Parse `ROADMAP.md`
2. **Diff State** - Compare with target platform
3. **Sync** - Create/update items (dry-run by default)
4. **Link** - Add IDs back into `ROADMAP.md` if confirmed

## Roadmap Format

Create `ROADMAP.md` in your project root:

```markdown
# Roadmap

## Q1 2026

### Authentication Overhaul
- Status: In Progress
- Priority: P0
- Owner: @alice
- Jira: PROJ-123
- Linear: ENG-123
```

## Output Format

```markdown
# Roadmap Sync (Dry Run)

## Summary
- Target: Jira
- Items scanned: 4
- Creates: 2
- Updates: 1
- Skips: 1

## Operations
1) CREATE: Authentication Overhaul → PROJ (labels: pm-roadmap, pm-status-in-progress)
2) UPDATE: Performance Optimization → PROJ-214 (priority P1)

## Next Steps
- Run again with `--dry-run false` to apply
```

## Prompt

You are syncing a product roadmap to {{target}}. Default to **dry-run** unless the user explicitly sets `--dry-run false`.

Steps:
1. Read `ROADMAP.md`. If missing, ask for its location.
2. Parse each `###` roadmap item and its metadata.
3. Execute sync based on target:
   - **linear**: use the Linear MCP server to list existing items and create/update matches.
   - **jira**: use the Atlassian Rovo MCP server (`atlassian-rovo`) Jira tools to search, create, and update issues.
   - **github**: if `gh` CLI is available, sync to GitHub **Issues** (not Projects) for the given repo; otherwise return instructions.
4. Return a deterministic operations list and a short summary.

If not configured (missing auth), stop and explain how to connect via `/mcp` and which project key is required.
