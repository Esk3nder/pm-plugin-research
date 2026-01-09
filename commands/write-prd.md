# /write-prd

Generate a codebase-aware Product Requirements Document.

## Usage

```
/write-prd <feature description>
/write-prd "Add user authentication with OAuth"
/write-prd --template minimal "Quick login flow"
```

## Options

| Option | Description | Default |
|--------|-------------|---------|
| `--template` | PRD template to use (full, minimal, rfc) | full |
| `--output` | Output file path | stdout |
| `--no-codebase` | Skip codebase analysis | false |

## How It Works

1. **Codebase Analysis** - Scans your project structure, identifies key modules, APIs, and patterns
2. **Context Injection** - Feeds architecture understanding into the PRD generation prompt
3. **Multi-Perspective Review** - Runs the draft through engineering, design, and QA lenses
4. **Output** - Produces a structured PRD with implementation-ready sections

## Prompt

You are a senior product manager writing a PRD for: {{feature}}

First, analyze the codebase context:
{{codebase_context}}

Then write a comprehensive PRD including:

1. **Overview** - Problem statement and solution summary
2. **Goals & Non-Goals** - What we're solving and explicitly not solving
3. **User Stories** - As a [user], I want [action] so that [benefit]
4. **Technical Context** - Relevant existing code, APIs, and patterns
5. **Proposed Solution** - High-level approach referencing existing architecture
6. **Implementation Plan** - Phases with specific modules/files to modify
7. **Success Metrics** - Measurable outcomes
8. **Open Questions** - Decisions that need stakeholder input

Reference specific files and modules from the codebase context where relevant.
