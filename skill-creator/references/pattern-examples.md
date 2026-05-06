---
title: Workflow Pattern Examples
purpose: Detailed examples of the five Anthropic workflow patterns
patterns: [Sequential, Multi-MCP, Iterative Refinement, Context-Aware, Domain-Specific]
---

# Workflow Pattern Examples

Detailed examples and templates for each of the five Anthropic workflow patterns.

---

## Pattern 1: Sequential Workflow Orchestration

**Best for:** Processes with explicit dependencies where Step N must complete before Step N+1

### Structure
- Linear step progression
- Validation at each stage
- Clear rollback instructions for failures
- Output of one step = Input of next step

### Example: Data Migration Skill

```markdown
## Workflow (Sequential)

### Step 1: Pre-Migration Check
**Input:** Source database connection, target database connection
**Action:**
- Verify source connectivity
- Verify target connectivity
- Check available disk space
- Verify target schema compatibility

**Validation Gate:**
- [ ] Source accessible
- [ ] Target accessible
- [ ] Disk space > 2x data size
- [ ] Schema compatible

**On Failure:**
- Source fail → Check credentials, network
- Target fail → Check credentials, database exists
- Disk fail → Clean up or provision more
- Schema fail → Run schema migration first

**Output:** Migration plan with estimated time

---

### Step 2: Export Data
**Input:** Migration plan from Step 1
**Action:**
- Lock source tables (if needed)
- Run export query
- Stream to temporary file
- Calculate checksum

**Validation Gate:**
- [ ] Export complete without errors
- [ ] Row count matches source
- [ ] Checksum generated

**On Failure:**
- Lock timeout → Use read replicas or off-peak hours
- Export error → Retry with smaller batch size
- Count mismatch → Log and retry

**Output:** Export file path, checksum, row count

---

### Step 3: Transform Data
**Input:** Export file from Step 2
**Action:**
- Read export file
- Apply transformations (encoding, format)
- Validate transformed records
- Write to staging format

**Validation Gate:**
- [ ] All records transformed
- [ ] No validation errors
- [ ] Staging file created

**On Failure:**
- Transform error → Log record ID, continue with skip or abort
- Validation error → Report to user, request guidance

**Output:** Transformed file path, transformation log

---

### Step 4: Import Data
**Input:** Transformed file from Step 3
**Action:**
- Begin transaction
- Bulk import to target
- Verify row count
- Commit transaction

**Validation Gate:**
- [ ] Import complete
- [ ] Row count matches export
- [ ] Sample queries return data

**On Failure:**
- Import error → Rollback, investigate (constraint violation?)
- Count mismatch → Rollback, check for duplicates

**Output:** Import confirmation, final row count

---

### Step 5: Post-Migration Verification
**Input:** Import confirmation from Step 4
**Action:**
- Run data integrity checks
- Compare sample records
- Update application config (if needed)
- Remove export files

**Validation Gate:**
- [ ] Integrity checks pass
- [ ] Sample comparisons match
- [ ] Config updated
- [ ] Cleanup complete

**On Failure:**
- Integrity fail → Investigate, may need partial re-migration
- Sample mismatch → Detailed comparison, identify discrepancy

**Output:** Migration completion report
```

### Key Decisions
- When to stop: All steps complete + final validation passes
- When to rollback: Any validation gate fails irreparably
- State tracking: Pass outputs as inputs to next step

---

## Pattern 2: Multi-MCP Coordination

**Best for:** Workflows spanning multiple services/tools

### Structure
- Clear phase separation per MCP/service
- Data passing between phases
- Validation before moving to next phase
- Coordination logic for handoffs

### Example: Incident Response Skill (Sentry + GitHub + Slack)

```markdown
## Workflow (Multi-MCP)

### Phase 1: Sentry Error Retrieval
**MCP:** Sentry
**Action:**
```
MCP:sentry:get-error-details
Parameters:
- issue_id: <user provided>
- include_stacktrace: true
- include_events: last 10
```

**Transform:**
- Extract error message, stacktrace, affected users
- Identify culprit commit via release tracking

**Validation Gate:**
- [ ] Error details retrieved
- [ ] Stacktrace available
- [ ] Commit hash identified

**On Failure:**
- Not found → Ask user for correct issue ID
- No stacktrace → Proceed with limited info
- No commit → Skip correlation phase

**Pass to Phase 2:**
- commit_hash: <from release tracking>
- error_summary: <formatted summary>

---

### Phase 2: GitHub Correlation
**MCP:** GitHub
**Action:**
```
MCP:github:get-commit
Parameters:
- repo: <from config>
- sha: {{commit_hash from Phase 1}}

MCP:github:get-pr-for-commit
Parameters:
- repo: <from config>
- sha: {{commit_hash}}
```

**Transform:**
- Correlate error timing with commit
- Identify author, PR description, changed files
- Blame potentially affected code areas

**Validation Gate:**
- [ ] Commit found
- [ ] PR identified (if applicable)
- [ ] Author identified

**On Failure:**
- Commit not found → May be external dependency
- No PR → Direct commit to main

**Pass to Phase 3:**
- author: <GitHub user>
- pr_url: <PR link or null>
- changed_files: <list>
- summary: <correlation analysis>

---

### Phase 3: Slack Notification
**MCP:** Slack
**Action:**
```
MCP:slack:post-message
Parameters:
- channel: "#incidents"
- blocks:
  - Header: "New Error Correlated to Recent Change"
  - Section: {{error_summary from Phase 1}}
  - Section: "Suspected commit: {{commit_hash}}"
  - Section: "Author: {{author}}"
  - Section: "PR: {{pr_url}}"
  - Section: "Correlation analysis: {{summary}}"
  - Actions: ["Create Jira Issue", "Page On-Call", "Ignore"]
```

**Validation Gate:**
- [ ] Message posted
- [ ] No rate limit hit

**On Failure:**
- Rate limit → Queue for retry in 60s
- Auth fail → Alert in error log

---

### Coordination Notes
- **Data Flow:** Sentry → GitHub → Slack
- **Failure Isolation:** Each phase can fail independently
- **Partial Success:** Error retrieved but no commit correlation = still post to Slack
- **Retry Strategy:** Each phase has independent retry logic
```

### Key Decisions
- Which MCP first? → Usually data source (pull before push)
- How to pass data? → Explicit parameter mapping
- What if one MCP fails? → Degrade gracefully (continue with partial data)

---

## Pattern 3: Iterative Refinement

**Best for:** Creative/generative tasks needing quality cycles

### Structure
- Initial draft → Quality check → Refinement loop → Finalization
- Explicit quality criteria (measurable)
- Know when to stop (max iterations or threshold met)
- Version tracking between iterations

### Example: Content Generation Skill

```markdown
## Workflow (Iterative)

### Iteration 0: Initial Draft
**Action:**
- Generate content based on user requirements
- Use provided context and constraints
- Don't optimize yet — just complete coverage

**Output:** v0 draft

---

### Iteration Loop (max 3 iterations)

#### Quality Check Phase
**Check against criteria:**

| Criterion | Weight | v0 Score | Target |
|-----------|--------|----------|--------|
| Covers all requirements | 30% | ? | 100% |
| Tone matches audience | 25% | ? | 90%+ |
| Concise (word count) | 20% | ? | Within ±10% |
| Actionable takeaways | 25% | ? | ≥3 |

**Overall Score:** Weighted average

**Decision:**
- Score ≥ 90% → Finalize
- Score 75-89% → Refine (continue to iteration)
- Score < 75% → Major revision (iteration + note issues)
- Iteration 3 and score < 90% → Finalize with caveats

---

#### Refinement Phase (if continuing)
**Identify specific gaps:**
- Missing: <specific requirement not met>
- Tone issue: <what's wrong>
- Verbose in: <section>
- Needs more: <actionable items>

**Apply targeted improvements:**
- Don't rewrite from scratch
- Fix specific identified issues
- Preserve what already works

**Output:** v{N+1} draft

---

### Finalization Phase
**Polish:**
- Grammar check
- Formatting consistency
- Link validation
- Final proofread

**Deliver:**
- Final version with iteration count
- Quality score achieved
- Summary of changes made
```

### Real Iteration Example

| Iteration | Score | Issue Identified | Action |
|-----------|-------|------------------|--------|
| 0 | 65% | Missing 2 requirements, too verbose | Add requirements, cut 30% |
| 1 | 78% | Tone too formal for audience | Simplify language, add examples |
| 2 | 88% | Only 2 actionable takeaways | Add third takeaway, strengthen CTAs |
| 3 | 92% | — | Finalize |

### Key Decisions
- Max iterations: Usually 3 (prevents infinite loops)
- Quality threshold: Usually 90% ("good enough")
- What to fix: Highest-weighted failing criteria first
- When to stop early: Score plateaus (no improvement between iterations)

---

## Pattern 4: Context-Aware Tool Selection

**Best for:** Skills supporting multiple similar operations

### Structure
- Decision tree based on input analysis
- Transparent reasoning about choices
- Fallback options for edge cases
- Consistent output format regardless of tool used

### Example: File Converter Skill

```markdown
## Workflow (Context-Aware)

### Step 1: Analyze Input
**Determine input type:**
```python
if input.endswith('.pdf'):
    input_type = 'pdf'
elif input.endswith(('.jpg', '.png', '.gif')):
    input_type = 'image'
elif input.endswith(('.mp4', '.mov', '.avi')):
    input_type = 'video'
elif input.endswith(('.doc', '.docx')):
    input_type = 'document'
else:
    input_type = 'unknown'
```

**Determine operation requested:**
- "compress" → operation = 'compression'
- "convert to X" → operation = 'conversion'
- "extract Y" → operation = 'extraction'
- "resize" → operation = 'resizing'

---

### Step 2: Select Tool Chain
**Decision matrix:**

| Input | Operation | Tool | Reason |
|-------|-----------|------|--------|
| pdf | compression | pdftk | Handles PDF structure preservation |
| pdf | extraction | pdftotext | Best text extraction accuracy |
| image | compression | imagemagick | Quality/size tradeoffs |
| image | resizing | imagemagick | Maintains aspect ratio |
| video | compression | ffmpeg | Industry standard |
| document | extraction | pandoc | Multi-format support |

**If unknown input type:**
- Ask user: "I can handle PDFs, images, videos, and documents. What type is this?"
- Or: Use `file` command to detect MIME type

**If unsupported operation:**
- Reply: "I can compress, convert, extract, and resize. Which would you like?"

---

### Step 3: Execute with Transparency
**Report tool selection:**
"Detected PDF file with compression request. Using `pdftk` to optimize while preserving structure and searchable text."

**Execute:**
```bash
<pdftk command with appropriate flags>
```

---

### Step 4: Validate & Deliver
**Format-appropriate validation:**
- PDF: Openable, page count preserved, text searchable
- Image: Viewable, dimensions correct, file size reduced
- Video: Playable, resolution as requested

**Deliver with metadata:**
```
Input: <original file> (<size>)
Tool used: <tool name>
Settings: <key parameters>
Output: <new file> (<size>, <compression ratio>)
Quality check: <pass/fail details>
```

---

### Error Handling Matrix

| Scenario | Response |
|----------|----------|
| Unknown file type | Ask user or attempt MIME detection |
| Unsupported operation | List supported operations |
| Tool not installed | Suggest alternative or install command |
| Tool fails | Try fallback tool with simpler settings |
| Quality check fails | Retry with different parameters or notify user |
```

### Key Decisions
- How to classify? → File extension + MIME type + user context
- What if ambiguous? → Ask user, don't guess
- Which tool first? → Primary tool (best quality), fallback (best compatibility)
- Transparency level? → Always report what was selected and why

---

## Pattern 5: Domain-Specific Intelligence

**Best for:** Regulated domains requiring expertise and audit trails

### Structure
- Compliance checks before action
- Domain expertise embedded in logic
- Comprehensive audit trails
- Defensive validation at all stages

### Example: Financial Reporting Skill

```markdown
## Workflow (Domain-Specific)

### Step 1: Compliance Check
**Verify regulatory requirements:**

**SOX Compliance:**
- [ ] All calculations have documented formulas
- [ ] Data sources are authorized systems
- [ ] Access is from approved location
- [ ] Reviewer is different from preparer

**GAAP Standards:**
- [ ] Revenue recognition criteria met
- [ ] Expense categorization follows policy
- [ ] Depreciation schedule current
- [ ] Reconciliations completed

**Internal Controls:**
- [ ] Dual authorization for material amounts
- [ ] Automated validation rules pass
- [ ] Variance thresholds acceptable

**If ANY check fails:**
- STOP workflow
- Log failure reason
- Notify compliance officer
- Do not proceed

---

### Step 2: Domain Analysis
**Apply financial expertise:**

**Revenue Recognition Check:**
- Is performance obligation satisfied?
- Is collectability probable?
- Is price determinable?
- Evidence: <contract, delivery receipt>

**Materiality Assessment:**
- Calculate % of relevant base
- If >5%: Flag for senior review
- If 1-5%: Standard review
- If <1%: Automated processing

**Accrual Verification:**
- Match to source documentation
- Verify period appropriateness
- Check reversing entry scheduled

**Risk Flags:**
- Unusual vendor? → Check approved vendor list
- Unusual amount? → Compare to 12-month average
- Unusual timing? → Check cutoff procedures

---

### Step 3: Execute with Audit Trail
**Every action logged:**
```
[2026-01-15 09:23:45] User: dmurray
[2026-01-15 09:23:46] Compliance checks: PASS
[2026-01-15 09:23:47] Domain analysis: PASS
[2026-01-15 09:23:48] Action: Generate Q4 revenue report
[2026-01-15 09:23:49] Data sources: ERP-PROD (auth: svc_finance)
[2026-01-15 09:23:50] Formulas: Standard revenue recognition v2024.3
[2026-01-15 09:23:51] Reviewer assigned: sjohnson (auto-rotation)
```

**Immutability:**
- Report saved to WORM storage
- Hash recorded in audit log
- Fingerprint: SHA256:<hash>

---

### Step 4: Report with Documentation
**Output includes:**
1. **Report** — The financial data
2. **Compliance Certificate** — Which checks passed
3. **Audit Trail** — Complete action log
4. **Source Documentation** — References to supporting docs
5. **Approval Chain** — Who prepared, who reviewed

**Disclaimers if applicable:**
- "Reviewed under expedited procedure due to <reason>"
- "Pending final reconciliation of <item>"
- "Subject to post-period adjustment per policy <ref>"
```

### Domain Expertise Embedding

**Where expertise lives:**

| Location | Content |
|----------|---------|
| `references/sox-compliance.md` | Full SOX requirements checklist |
| `references/gaap-criteria.md` | Revenue/expense recognition rules |
| `references/audit-matrix.json` | Automated check rules |
| `scripts/materiality_calc.py` | Materiality calculation |
| `scripts/risk_flags.py` | Risk detection algorithms |

**Update procedures:**
- Compliance rules updated when regs change
- Audit matrix versioned with changelog
- Annual review of all embedded expertise

---

## Pattern Selection Guide

| If your skill... | Use Pattern... |
|------------------|----------------|
| Has clear step-by-step dependencies | 1: Sequential |
| Uses multiple MCPs or services | 2: Multi-MCP |
| Generates content needing quality review | 3: Iterative Refinement |
| Handles multiple similar operations | 4: Context-Aware |
| Operates in regulated/expert domain | 5: Domain-Specific |

**Can combine patterns:**
- Multi-MCP + Sequential (phases are sequential)
- Context-Aware + Iterative (select tool, then refine)
- Domain-Specific + Sequential (compliance check, then sequential workflow)

**Start simple:** Begin with Sequential, add complexity only when needed.
