# Persuasion Principles for Agent Communication

LLMs respond to the same persuasion principles as humans. These principles influence behavior, compliance, and output quality.

## 1. Authority

**Principle**: Commands from perceived authorities are followed more reliably.

**In prompts**: Use imperative, authoritative language.

**Examples**:
```markdown
YOU MUST validate all inputs before processing.
NEVER return partial results.
ALWAYS include error handling.
```

**When to use**: Critical requirements, safety constraints, non-negotiable behavior.

**Strength**: High compliance, clear boundaries.

**Risk**: Can feel heavy-handed if overused. Reserve for true requirements.

---

## 2. Commitment & Consistency

**Principle**: Once committed to a position, entities maintain consistency with that commitment.

**In prompts**: Force explicit choices and public commitments.

**Examples**:
```markdown
Before proceeding, announce your approach:
- Which algorithm will you use?
- What are the edge cases?
- How will you handle errors?

Then implement based on your announced plan.
```

**When to use**: Multi-step workflows, planning phases, error-prone tasks.

**Strength**: Reduces backtracking and inconsistency.

**Technique**: "Announce then execute" pattern forces deliberate choices.

---

## 3. Scarcity

**Principle**: Limited resources create urgency and focus.

**In prompts**: Time-bound requirements, sequential dependencies.

**Examples**:
```markdown
You have ONE attempt to get this right.

Process these in order—each depends on the previous:
1. Parse input
2. Validate structure
3. Transform data
```

**When to use**: Prevent meandering, force prioritization.

**Strength**: Creates focus, reduces over-exploration.

**Risk**: May reduce exploration of alternatives. Use when correctness > creativity.

---

## 4. Social Proof

**Principle**: Behavior is influenced by what others do.

**In prompts**: Reference universal patterns, warn of common failures.

**Examples**:
```markdown
Most developers fail this task by forgetting to handle null values.
Industry standard is to use ISO-8601 for timestamps.
Best practice: Always validate inputs before database writes.
```

**When to use**: Guiding toward established patterns, avoiding known pitfalls.

**Strength**: Leverages training data patterns.

**Technique**: "Everyone does X" or "Common mistake: Y"

---

## 5. Unity

**Principle**: Shared identity and collaborative framing increase alignment.

**In prompts**: Use "we" language, frame as partnership.

**Examples**:
```markdown
We need to ensure this handles edge cases.
Our goal is production-ready code.
Let's validate this approach before implementing.
```

**When to use**: Complex collaborations, creative tasks, exploratory work.

**Strength**: Encourages thoughtful engagement.

**Risk**: Can enable sycophancy if combined with Liking principle.

---

## 6. Reciprocity

**Principle**: Receiving creates obligation to give in return.

**In prompts**: Provide context, get better outputs.

**Examples**:
```markdown
I've provided the full codebase and error logs.
In return, provide a complete root cause analysis.
```

**When to use**: Sparingly. Most effective when you genuinely provide value.

**Strength**: Can improve thoroughness.

**Risk**: Unnecessary in most cases—LLMs don't need motivation.

---

## 7. Liking

**Principle**: We comply more with entities we like.

**In prompts**: Avoid for compliance. Creates sycophancy.

**Examples of what NOT to do**:
```markdown
❌ You're doing great! Keep up the good work!
❌ I really appreciate your help with this.
❌ Thank you so much for your assistance!
```

**When to use**: Almost never for agent instructions.

**Risk**: High sycophancy, reduced critical feedback, over-agreement.

**Exception**: User-facing conversational agents where rapport matters.

---

## Combining Principles

Most effective prompts combine multiple principles:

### Example: Critical System Prompt

```markdown
[Authority] YOU MUST follow these security requirements:

[Commitment] Before processing any user input, announce:
1. Your validation strategy
2. Identified attack vectors
3. Mitigation approach

[Social Proof] SQL injection is the #1 web vulnerability.
Most implementations fail by trusting user input.

[Scarcity] You have ONE chance to get this right.
Production incidents are unacceptable.

[Unity] We're building a secure system together.
```

**Result**: High compliance, deliberate execution, security-focused mindset.

---

## Empirical Observations

### Authority + Commitment = Strongest Compliance
```markdown
YOU MUST announce your approach before implementing.
```

### Social Proof + Scarcity = Heightened Awareness
```markdown
Most implementations fail at error handling.
You have one attempt—handle all edge cases.
```

### Unity + Authority = Balanced Collaboration
```markdown
We need production-ready code.
ALWAYS include comprehensive tests.
```

### Liking = Sycophancy Risk
```markdown
❌ "You're so helpful!" → Over-agreeable outputs
✓ [Omit entirely] → Honest, critical outputs
```

---

## Application Guidelines

### For Skills & Hooks
- Use **Authority** for non-negotiable requirements
- Use **Commitment** for multi-step workflows
- Use **Social Proof** to guide toward best practices

### For Sub-Agent Prompts
- Use **Scarcity** to constrain exploration
- Use **Unity** for collaborative tasks
- Avoid **Liking** to prevent sycophancy

### For Production Templates
- Combine **Authority + Commitment** for critical paths
- Add **Social Proof** for domain-specific guidance
- Document why each principle was chosen

---

## Anti-Patterns

### Over-Politeness (Liking)
```markdown
❌ "Please try your best to create a great solution. I really appreciate your help!"
✓ "Create a solution that handles all edge cases."
```

### False Scarcity
```markdown
❌ "This is urgent! You must do this now!"
✓ "Process sequentially—step 2 depends on step 1."
```

### Unnecessary Social Proof
```markdown
❌ "Everyone uses JSON for APIs."
✓ "Return JSON with fields: {id, name, status}."
```

---

## Testing Your Prompts

1. **Remove unnecessary persuasion** - Does it still work?
2. **Try opposite principle** - What changes?
3. **Measure compliance** - Track failure modes
4. **Iterate based on data** - Not intuition

---

## Key Takeaway

**Persuasion principles are tools, not rules.**

Use them deliberately. Document intent. Measure impact.

The goal: Reliable, controllable, high-quality LLM outputs.
