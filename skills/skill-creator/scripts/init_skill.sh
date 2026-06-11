#!/bin/bash
# Initialize a new Claude Code skill with proper structure
# Usage: bash init_skill.sh <skill-name> [--path <output-directory>]

set -e

SKILL_NAME="$1"
OUTPUT_DIR="${3:-.claude/skills}"

if [ -z "$SKILL_NAME" ]; then
    echo "Usage: bash init_skill.sh <skill-name> [--path <output-directory>]"
    echo ""
    echo "Examples:"
    echo "  bash init_skill.sh my-new-skill"
    echo "  bash init_skill.sh my-skill --path /custom/path"
    exit 1
fi

# Validate skill name (lowercase, hyphens allowed)
if [[ ! "$SKILL_NAME" =~ ^[a-z][a-z0-9-]*$ ]]; then
    echo "Error: Skill name must be lowercase, start with a letter, and use only letters, numbers, and hyphens"
    exit 1
fi

SKILL_PATH="$OUTPUT_DIR/$SKILL_NAME"

# Check if skill already exists
if [ -d "$SKILL_PATH" ]; then
    echo "Error: Skill '$SKILL_NAME' already exists at $SKILL_PATH"
    exit 1
fi

echo "Creating skill: $SKILL_NAME"
echo "Location: $SKILL_PATH"
echo ""

# Create directory structure
mkdir -p "$SKILL_PATH"/{scripts,references,assets}

# Create SKILL.md template
cat > "$SKILL_PATH/SKILL.md" << 'EOF'
---
name: SKILL_NAME_PLACEHOLDER
description: >
  TODO - Long description packed with trigger terms for AI routing.
  Include synonyms, use-case phrases, keyword matches. Use third person.
  Triggers on: "TODO trigger phrase 1", "TODO trigger phrase 2".
metadata:
  tags: [TODO, tag2, tag3]
  tier: general  # or: task-specific
  domain: kernel  # or: ingestion | observability | knowledge | product | creative | workflow | tooling
---

# SKILL_TITLE_PLACEHOLDER

TODO - Brief one-line description of the skill's purpose.

## When to Use

- TODO: Condition 1
- TODO: Condition 2
- TODO: Condition 3

## What This Skill Does

1. TODO: Step 1
2. TODO: Step 2
3. TODO: Step 3

## Usage

```
/SKILL_NAME_PLACEHOLDER
/SKILL_NAME_PLACEHOLDER --option value
```

## Workflow

### Step 1: TODO

```bash
# TODO: Add commands or code
```

### Step 2: TODO

TODO: Describe the step

## Examples

### Example 1: TODO

**Input**: TODO
**Output**: TODO

## Related Skills

- `TODO` - Related skill description
EOF

# Replace placeholders (portable across GNU and BSD sed)
SKILL_TITLE=$(echo "$SKILL_NAME" | sed 's/-/ /g' | awk '{for(i=1;i<=NF;i++) $i=toupper(substr($i,1,1)) tolower(substr($i,2))}1')
sed "s/SKILL_NAME_PLACEHOLDER/$SKILL_NAME/g; s/SKILL_TITLE_PLACEHOLDER/$SKILL_TITLE/g" "$SKILL_PATH/SKILL.md" > "$SKILL_PATH/SKILL.md.tmp" \
    && mv "$SKILL_PATH/SKILL.md.tmp" "$SKILL_PATH/SKILL.md"

# Create placeholder files in each directory
echo "# Scripts" > "$SKILL_PATH/scripts/README.md"
echo "" >> "$SKILL_PATH/scripts/README.md"
echo "Place executable scripts here (Python, Bash, etc.)" >> "$SKILL_PATH/scripts/README.md"
echo "Delete this file when adding actual scripts." >> "$SKILL_PATH/scripts/README.md"

echo "# References" > "$SKILL_PATH/references/README.md"
echo "" >> "$SKILL_PATH/references/README.md"
echo "Place documentation and reference materials here." >> "$SKILL_PATH/references/README.md"
echo "These are loaded into context as needed." >> "$SKILL_PATH/references/README.md"
echo "Delete this file when adding actual references." >> "$SKILL_PATH/references/README.md"

echo "# Assets" > "$SKILL_PATH/assets/README.md"
echo "" >> "$SKILL_PATH/assets/README.md"
echo "Place templates, images, and other output files here." >> "$SKILL_PATH/assets/README.md"
echo "These are used in output, not loaded into context." >> "$SKILL_PATH/assets/README.md"
echo "Delete this file when adding actual assets." >> "$SKILL_PATH/assets/README.md"

echo ""
echo "Skill '$SKILL_NAME' created successfully!"
echo ""
echo "Next steps:"
echo "1. Edit $SKILL_PATH/SKILL.md"
echo "   - Update the description in frontmatter"
echo "   - Fill in the TODO sections"
echo "   - Add your workflow and examples"
echo ""
echo "2. Add bundled resources as needed:"
echo "   - scripts/   - Executable code"
echo "   - references/ - Documentation"
echo "   - assets/    - Templates and files"
echo ""
echo "3. Delete unused resource directories and README.md files"
echo ""
echo "4. Test your skill by invoking /$SKILL_NAME"
