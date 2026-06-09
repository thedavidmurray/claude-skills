---
name: skill-creator
description: >
  Guide for creating and updating Claude Code skills. Use when a user wants to
  create a new skill, update an existing skill, add frontmatter to a skill,
  convert a skill to the standard format, validate skill structure, or design
  bundled resources. Triggers on: "create a skill", "update skill", "new skill
  for X", "add a /command", "skill for doing Y", "skill frontmatter standard",
  "scaffold a skill", "skill template", "convert to skill format", "validate skill",
  "skill anatomy", "skill best practices", "what category is this skill",
  "which pattern should I use", "skill workflow pattern".
metadata:
  tags: [skill, meta, creation, frontmatter, standard, scaffold, template, validation, anthropic-patterns]
  tier: general
  domain: kernel
allowed-tools:
  - Bash
  - Read
  - Write
  - Edit
  - Glob
  - Grep
when_to_apply: When creating a new skill, updating an existing skill's frontmatter, or converting documentation to the standard skill format
---

# Skill Creator

Create well-structured skills that extend Claude Code's capabilities using official Anthropic patterns.

## When to Use

Use when creating a new skill, updating an existing skill's frontmatter, converting
documentation to the standard skill format, or validating skill structure.
Triggers on: "create a skill", "scaffold a skill", "skill template", "validate skill".

## Anatomy of a Skill

```
skill-name/
├── SKILL.md (required; filename is case-sensitive)
│   ├── YAML frontmatter (required: name, description, metadata)
│   └── Markdown body (required: ## When to Use, ## Instructions or ## Workflow)
└── Bundled resources (optional)
    ├── scripts/          - Executable code (Python/Bash)
    ├── references/       - Documentation loaded as needed
    └── assets/           - Files used in output (templates, images)
```

**File Index Contract**: If a skill has sub-files (scripts/, references/, assets/), SKILL.md
MUST list every file with a one-line description in a `## File Index` table — the agent
cannot know what exists without it.

## Frontmatter Contract

All skills MUST use this schema:

```yaml
---
name: skill-name          # kebab-case, matches folder name exactly
description: >
  WHAT the skill does plus WHEN to use it, packed with trigger terms,
  synonyms, and use-case phrases. Third person. Under 1024 characters.
  Include "Triggers on: 'phrase 1', 'phrase 2'" phrasing.
metadata:
  tags: [tag1, tag2, tag3]       # Lowercase, specific
  tier: general | task-specific  # general = broad applicability
  domain: kernel | ingestion | observability | knowledge | product | creative | workflow | tooling
---
```

Rules:
- `name` is kebab-case and matches the folder name exactly
- `description` is what the routing layer reads to decide whether to load the skill. It MUST
  include WHAT (capabilities) and WHEN (trigger phrases), stay under 1024 characters, and prefer a `>` block scalar
- `metadata.tags`, `metadata.tier`, and `metadata.domain` are all required
- Domain quick guide: `kernel` core agent infrastructure; `ingestion` capture/transform/store;
  `observability` monitoring/logging; `knowledge` retrieval/research; `product` public-facing tools;
  `creative` art/experiments; `workflow` cross-cutting execution patterns; `tooling` tool/CLI integrations

Good/bad description examples and extended field guidance: `references/advanced-guide.md`.

## Categories and Patterns

Identify the skill's category and workflow pattern before writing the body:

| Category | Purpose |
|----------|---------|
| 1. Document & Asset Creation | Consistent documents/designs/code via templates, style guides, checklists; no MCPs |
| 2. Workflow Automation | Multi-step processes with validation gates, refinement loops, state tracking |
| 3. MCP Enhancement | Coordinating MCP tool calls; handles auth, errors, rate limits |

| Pattern | Use when |
|---------|----------|
| 1. Sequential | Explicit step ordering with dependencies and rollback |
| 2. Multi-MCP | Multiple MCP tools coordinated across phases with data handoffs |
| 3. Iterative Refinement | Draft → quality check → improve loops with explicit stop criteria |
| 4. Context-Aware Selection | Decision trees choosing tools based on input, with fallbacks |
| 5. Domain-Specific Intelligence | Deep domain expertise, compliance checks, audit trails |

Starter templates and selection guides: `references/category-templates.md` (categories),
`references/pattern-examples.md` (pattern structures and worked examples).

## Creation Workflow

### Step 1: Identify Category and Pattern

Ask clarifying questions:
- "What functionality should this skill support?"
- "Can you give examples of how this skill would be used?"
- "What would a user say that should trigger this skill?"

Then pick the category and pattern from the tables above.

### Step 2: Plan the Reusable Contents

For each use case, identify:
1. What code gets rewritten repeatedly? → `scripts/`
2. What documentation is referenced? → `references/`
3. What templates or assets are used? → `assets/`

### Step 3: Initialize the Skill

```bash
bash .claude/skills/skill-creator/scripts/init_skill.sh <skill-name>
```

This creates the skill directory, a template SKILL.md with frontmatter, and empty resource directories.

### Step 4: Edit the Skill

- Write frontmatter per the contract above
- Required body sections: `## When to Use` (explicit trigger conditions and phrases) and
  `## Instructions` or `## Workflow` (step-by-step procedure using the selected pattern)
- **Writing style**: imperative form ("To accomplish X, do Y"), not second person ("You should...")
- If any sub-files exist, add a `## File Index` table mapping every file to a one-line purpose

### Step 5: Add Bundled Resources

- `scripts/` — executable code for deterministic, token-efficient, repeated tasks
- `references/` — docs loaded as needed; keep SKILL.md lean and move detail here
- `assets/` — templates, images, boilerplate used in output, never loaded into context
- Remove resource directories left empty (detailed when-to-include guidance: `references/advanced-guide.md`)

## Progressive Disclosure

Skills use three-level loading to manage context: metadata (name + description, always in
context) → SKILL.md body (loaded when the skill triggers) → bundled resources (loaded as needed).
Keep SKILL.md under 200 lines. If longer, move detailed reference material to `references/`.

## Quality Checklist

### Structural Checklist
- [ ] YAML frontmatter has `name`, `description`, and `metadata` block
- [ ] `description` is multi-line with explicit trigger terms, includes both WHAT and WHEN
- [ ] `metadata.tags`, `metadata.tier`, `metadata.domain` all set
- [ ] `## When to Use` section is explicit with trigger phrases
- [ ] `## Instructions` or `## Workflow` section present
- [ ] If sub-files exist, `## File Index` documents every one
- [ ] SKILL.md is under 200 lines (move excess to references/)
- [ ] Unnecessary empty resource directories removed

### Testing Checklist
- [ ] **Triggering Test** — Skill loads on obvious relevant queries
- [ ] **Paraphrase Test** — Skill loads on rephrased versions
- [ ] **Negative Test** — Skill does NOT load on unrelated topics
- [ ] **Functional Test** — Valid outputs, API success, error handling
- [ ] **Edge Case Test** — Handles empty inputs, large inputs, errors

Quantitative and qualitative success criteria: `references/advanced-guide.md`.

## Command

```
/skill-creator                    # Interactive skill creation
/skill-creator init <name>        # Initialize new skill
/skill-creator validate <path>    # Validate existing skill
/skill-creator category <name>    # Show category template
/skill-creator pattern <name>     # Show pattern template
```

## File Index

| File | Purpose |
|------|---------|
| `scripts/init_skill.sh` | Scaffolds a new skill directory with template SKILL.md and empty resource subdirectories |
| `references/category-templates.md` | Full starter templates and real-world examples for the three skill categories, plus a category selection guide |
| `references/pattern-examples.md` | Detailed structures and worked examples for the five workflow patterns, plus a pattern selection guide |
| `references/advanced-guide.md` | Extended guidance: skill purpose, description good/bad examples, field guidance, bundled-resource detail, success criteria, worked end-to-end examples, troubleshooting |

## Related Skills

- `dev-docs` - Document skills after creation
- `retrospective-learning` - Learn from skill usage patterns

## Troubleshooting

Common issues (won't upload, doesn't trigger, triggers too often, MCP failures, instructions
not followed): see the troubleshooting table in `references/advanced-guide.md`.
