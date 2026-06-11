---
title: Skill Creation Advanced Guide
purpose: Extended guidance, examples, success criteria, and troubleshooting for skill creation
topics: [skill purpose, description quality, field guidance, bundled resources, success criteria, worked examples, troubleshooting]
---

# Skill Creation Advanced Guide

Extended material supporting `SKILL.md`. Read this for deeper guidance on writing
descriptions, choosing metadata, designing bundled resources, evaluating success,
and diagnosing problems.

---

## What Skills Provide

Skills are modular packages that extend Claude's capabilities by providing specialized
knowledge, workflows, and tools. They transform Claude from a general-purpose agent into
a specialized one equipped with procedural knowledge.

1. **Specialized workflows** - Multi-step procedures for specific domains
2. **Tool integrations** - Instructions for working with specific file formats or APIs
3. **Domain expertise** - Company-specific knowledge, schemas, business logic
4. **Bundled resources** - Scripts, references, and assets for complex tasks

---

## Description Quality: WHAT + WHEN Pattern

The `description` field is the most critical for skill routing. It MUST include:
- **WHAT** the skill does (functionality, capabilities)
- **WHEN** to use it (trigger phrases, use cases)

**Good Example:**
```yaml
description: >
  Rotate, merge, split, and annotate PDF files. Use when user provides a PDF
  and asks to combine pages, rotate, extract sections, or add annotations.
  Triggers on: 'rotate PDF', 'merge these PDFs', 'split PDF at page X'.
```

**Bad Examples:**
```yaml
# BAD: Vague WHAT
description: "A skill for doing things with PDFs"

# BAD: Missing WHEN
description: "PDF manipulation tool with rotation and merging capabilities"

# BAD: No trigger phrases
description: "This skill helps users work with PDF documents"
```

### Field Guidance

**`description`** (most important field):
- This is what the routing layer reads to decide whether to load the skill
- Pack with synonyms, use-case phrases, and explicit trigger terms
- Include "Triggers on: ..." or "Use when user says ..." phrasing
- Multi-line YAML block scalar (`>`) preferred for longer descriptions
- MUST be under 1024 characters
- MUST include both WHAT and WHEN

**`tier`**:
- `general` — Applies across many contexts (memory, backlog, session planning)
- `task-specific` — Domain-scoped (job search, trading bot, generative art)

**`domain`**:
- `kernel` — Core agent infrastructure (hooks, memory, completion, skill creation)
- `ingestion` — Content capture, transformation, storage
- `observability` — Monitoring, health, logging, alerting
- `knowledge` — ChromaDB, retrieval, personas, research
- `product` — Vault integration, taxonomy, public-facing tools
- `creative` — Generative art, experiments, side projects
- `workflow` — Cross-cutting execution patterns, planning, review loops, and operator procedures
- `tooling` — Specific tool integrations, CLIs, third-party systems, and utility workflows

---

## Bundled Resources in Depth

### Scripts (`scripts/`)

Executable code for tasks needing deterministic reliability.

- **When to include**: Code rewritten repeatedly or needing reliability
- **Benefits**: Token efficient, deterministic, may run without loading
- **Example**: `scripts/validate.py` for validation tasks

### References (`references/`)

Documentation loaded into context as needed.

- **When to include**: Documentation Claude should reference while working
- **Examples**: API schemas, company policies, workflow guides
- **Best practice**: Keep SKILL.md lean; move details to references/

### Assets (`assets/`)

Files used in output, not loaded into context.

- **When to include**: Templates, images, boilerplate
- **Examples**: `assets/template.html`, `assets/logo.png`

---

## Success Criteria

**Quantitative:**
- Skill triggers on 90%+ of relevant queries
- Completes workflow in expected tool calls
- 0 failed API calls per workflow

**Qualitative:**
- Users don't need to prompt about next steps
- Workflows complete without correction
- Consistent results across sessions

---

## Worked Examples

### Example: Creating a "PDF Editor" Skill (Category 1: Document & Asset Creation)

1. **Identify**: Category 1 — Document creation, Pattern 4 — Context-Aware (different tools for different PDF operations)
2. **Plan**: `scripts/rotate_pdf.py` for rotation logic
3. **Initialize**: `bash scripts/init_skill.sh pdf-editor`
4. **Edit**: Add workflow using Pattern 4 structure, reference pdftk documentation
5. **Test**: Verify skill triggers on "rotate this PDF"

### Example: Creating a "Brand Guidelines" Skill (Category 1: Document & Asset Creation)

1. **Identify**: Category 1 — Document consistency, Pattern 3 — Iterative Refinement
2. **Plan**: `assets/brand-colors.css`, `references/style-guide.md`
3. **Initialize**: Create skill structure
4. **Edit**: Document brand rules, color palettes, typography using iterative workflow
5. **Test**: Verify skill triggers on "use our brand guidelines"

### Example: Creating a "Sentry Code Review" Skill (Category 3: MCP Enhancement)

1. **Identify**: Category 3 — MCP coordination, Pattern 2 — Multi-MCP
2. **Plan**: Integrate Sentry MCP + GitHub MCP
3. **Initialize**: `bash scripts/init_skill.sh sentry-review`
4. **Edit**: Workflow pulls Sentry errors, correlates with GitHub commits
5. **Test**: Verify integration works end-to-end

---

## Troubleshooting

| Issue | Solution |
|-------|----------|
| Skill won't upload | Check SKILL.md naming (case-sensitive), YAML delimiters, kebab-case name |
| Doesn't trigger | Add more trigger phrases to description, include WHAT + WHEN pattern |
| Triggers too often | Add negative triggers, be more specific, clarify scope |
| MCP calls fail | Verify connection, check auth, test MCP independently |
| Instructions not followed | Keep concise, put critical info at top, use explicit language |
