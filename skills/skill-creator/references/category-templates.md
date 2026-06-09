---
title: Skill Category Templates
purpose: Starter templates for the three Anthropic skill categories
categories: [Document & Asset Creation, Workflow Automation, MCP Enhancement]
---

# Skill Category Templates

Use these templates when scaffolding a new skill based on its category.

---

## Category 1: Document & Asset Creation

**When to use:** Creating consistent documents, presentations, apps, designs, code

**Characteristics:**
- Uses embedded style guides, templates, quality checklists
- No external tools (MCPs) required
- Focus on consistency and quality

### Template

```markdown
---
name: <skill-name>
description: >
  [WHAT: Create/generate/build consistent X (documents/designs/code/assets)].
  [WHEN: Use when user needs to Y with Z requirements].
  Triggers on: "[phrase 1]", "[phrase 2]", "[phrase 3]".
metadata:
  tags: [<category>, <output-type>, <style>]
  tier: task-specific
  domain: <creative | product | knowledge>
---

# <Skill Name>

Create consistent <output type> following <standard/guideline>.

## When to Use

Use when user needs to create <output type> with <characteristics>.
Triggers on: "<trigger phrase 1>", "<trigger phrase 2>", "<trigger phrase 3>".

## Assets

This skill includes style guides and templates in `assets/`:
- <Asset 1>: <Description>
- <Asset 2>: <Description>

## Workflow

1. **Understand Requirements**
   - Ask about: <question 1>
   - Ask about: <question 2>
   - Determine: <decision criteria>

2. **Select Template**
   - Choose from `assets/` based on <criteria>:
     - `<file A>`: <When to use>
     - `<file B>`: <When to use>

3. **Apply Style Guide**
   - Reference embedded standards:
     - <Standard 1>
     - <Standard 2>

4. **Quality Check**
   Verify against checklist:
   - [ ] <Quality criterion 1>
   - [ ] <Quality criterion 2>
   - [ ] <Quality criterion 3>

5. **Deliver Output**
   - Generate final <output>
   - Apply <final step>

## File Index

| File | Purpose |
|------|---------|
| `assets/<template>` | <Description> |
| `assets/<style-guide>` | <Description> |

## Examples

### Example 1: <Scenario>
**User:** "<Example request>"
**Skill:** <What the skill does>
**Output:** <Result>

### Example 2: <Scenario>
**User:** "<Example request>"
**Skill:** <What the skill does>
**Output:** <Result>
```

### Real-World Examples

**`frontend-design` skill:**
- WHAT: Apply design system to React components
- WHEN: User shares component requirements or sketches
- Assets: `assets/component-templates/`, `assets/color-palette.css`
- Quality Check: Contrast ratios, accessibility labels, responsive breakpoints

**`brand-guidelines` skill:**
- WHAT: Apply consistent branding to artifacts
- WHEN: User requests materials with company branding
- Assets: `assets/logo-kit/`, `assets/brand-colors.css`, `assets/typography.json`
- Quality Check: Logo clearspace, color accuracy, font licensing

**`document-generator` skill:**
- WHAT: Create formatted reports from structured data
- WHEN: User asks to generate a report or formatted document

---

## Category 2: Workflow Automation

**When to use:** Multi-step processes with consistent methodology

**Characteristics:**
- Step-by-step workflows with validation gates
- Iterative refinement loops
- State tracking across steps

### Template

```markdown
---
name: <skill-name>
description: >
  [WHAT: Execute/manage/run X process/workflow].
  [WHEN: Use when user needs to Y following Z methodology].
  Triggers on: "[phrase 1]", "[phrase 2]", "[phrase 3]".
metadata:
  tags: [<category>, <process-type>, <methodology>]
  tier: general | task-specific
  domain: <workflow | kernel | product>
---

# <Skill Name>

Execute <process name> following <methodology>.

## When to Use

Use when user needs to <action> following <methodology>.
Triggers on: "<trigger phrase 1>", "<trigger phrase 2>", "<trigger phrase 3>".

## Workflow

### Phase 0: Initialization
- **Input Required:**
  - <Input 1>: <Description>
  - <Input 2>: <Description>
- **Prerequisites:**
  - [ ] <Prerequisite 1>
  - [ ] <Prerequisite 2>
- **Setup:** <Any initialization>

### Phase 1: <Phase Name>
<Description of what happens>

**Steps:**
1. <Step 1>
2. <Step 2>
3. <Step 3>

**Validation Gate:**
- [ ] <Criterion 1>
- [ ] <Criterion 2>

**On Failure:** <Rollback or retry procedure>

### Phase 2: <Phase Name>
<Description of what happens>

**Steps:**
1. <Step 1>
2. <Step 2>

**Validation Gate:**
- [ ] <Criterion 1>

**On Failure:** <Rollback or retry procedure>

### Phase N: Finalization
- **Completion Steps:**
  1. <Step 1>
  2. <Step 2>
- **Final Validation:**
  - [ ] <Final check 1>
  - [ ] <Final check 2>
- **Output:** <Deliverable>

## File Index

| File | Purpose |
|------|---------|
| `scripts/<script>.py` | <Description> |
| `references/<guide>.md` | <Description> |

## State Tracking

This workflow maintains state across phases:
- `<var 1>`: <What it tracks>
- `<var 2>`: <What it tracks>

## Error Handling

| Scenario | Response |
|----------|----------|
| <Error 1> | <Handling> |
| <Error 2> | <Handling> |

## Examples

### Example: <Scenario>
**User:** "<Example request>"
**Phase 1:** <What happens>
**Phase 2:** <What happens>
**Result:** <Outcome>
```

### Real-World Examples

**`skill-creator` skill (this skill):**
- WHAT: Guide skill creation with official patterns
- WHEN: User wants to create/update a skill
- Phases: Identify Category → Plan Contents → Initialize → Edit → Add Resources
- Validation: Frontmatter check, File Index check, Quality Checklist

**`onboarding-checklist` skill:**
- WHAT: Execute new employee setup
- WHEN: New hire starts
- Phases: Accounts → Access → Equipment → Orientation
- Validation: Each phase has completion criteria

**`deploy-pipeline` skill:**
- WHAT: Run release validation sequence
- WHEN: User triggers a deployment or release
- Validation: Gates between build, test, stage, and production phases

---

## Category 3: MCP Enhancement

**When to use:** Workflow guidance for MCP tool access

**Characteristics:**
- Coordinates multiple MCP calls
- Embeds domain expertise for tool usage
- Handles auth, errors, rate limits

### Template

```markdown
---
name: <skill-name>
description: >
  [WHAT: Integrate/sync/manage X using Y tool/MCP].
  [WHEN: Use when user needs to [action] with [MCP/tool]].
  Triggers on: "[phrase 1]", "[phrase 2]", "[phrase 3]".
metadata:
  tags: [<category>, <mcp-name>, <integration-type>]
  tier: task-specific
  domain: <tooling | workflow | product>
  mcp-server: <mcp-name>  # Optional but recommended
---

# <Skill Name>

<Description of MCP integration purpose>.

## When to Use

Use when user needs to <action> using <MCP/tool>.
Triggers on: "<trigger phrase 1>", "<trigger phrase 2>", "<trigger phrase 3>".

## Prerequisites

- <MCP Name> MCP server connected
- <Permission/Access> configured
- <Environment requirement> set up

## Workflow

### Step 1: Auth Check
Verify MCP connection:
```
MCP:<mcp-name>:<auth-check-operation>
```

**On Failure:**
- Check <configuration location>
- Verify <credential>
- Guide user to <setup doc>

### Step 2: Data Retrieval
Fetch data from source:
```
MCP:<mcp-name>:<operation>
Parameters:
- <param 1>: <value>
- <param 2>: <value>
```

**Transform:**
- <Transformation step 1>
- <Transformation step 2>

### Step 3: Action
Execute target operation:
```
MCP:<mcp-name>:<operation>
Parameters:
- <param 1>: <from step 2>
```

### Step 4: Verify
Confirm success:
- <Check 1>
- <Check 2>

## Error Handling

| Error | Cause | Resolution |
|-------|-------|------------|
| `<error code>` | <Cause> | <Resolution> |
| `<error code>` | <Cause> | <Resolution> |

## Rate Limits

- <Limit description>
- <Backoff strategy>

## File Index

| File | Purpose |
|------|---------|
| `references/<mcp-docs>.md` | MCP API documentation |
| `scripts/<transform>.py` | Data transformation logic |

## Examples

### Example 1: <Scenario>
**User:** "<Example request>"
**Step 1:** <Auth check>
**Step 2:** <Data retrieval>
**Step 3:** <Action>
**Result:** <Outcome>

### Example 2: <Scenario>
**User:** "<Example request>"
**Skill:** <Walkthrough>
**Result:** <Outcome>
```

### Real-World Examples

**`sentry-code-review` skill:**
- WHAT: Correlate Sentry errors with code changes
- WHEN: Investigating production errors
- MCPs: Sentry + GitHub
- Workflow: Auth → Fetch Error → Fetch Commits → Correlate → Report

**`linear-triage` skill:**
- WHAT: Sync external state to Linear issues
- WHEN: Triage pipeline runs
- MCP: Linear
- Workflow: Auth → Transform → Create/Update → Verify

**`notion-sync` skill:**
- WHAT: Bidirectional data sync with Notion
- WHEN: User asks to sync data to or from Notion
- MCP: Notion
- Workflow: Auth → Diff both sides → Apply changes → Verify

---

## Category Selection Guide

**Is your skill Category 1?**
- [ ] Creates documents/designs/code/assets
- [ ] Uses templates or style guides
- [ ] No MCP tools required
- [ ] Focus on consistency and quality

**Is your skill Category 2?**
- [ ] Multi-step process with phases
- [ ] Has validation gates
- [ ] May be iterative
- [ ] Tracks state across steps

**Is your skill Category 3?**
- [ ] Uses MCP tools
- [ ] Coordinates API calls
- [ ] Handles auth/rate limits
- [ ] Embeds tool-specific expertise
