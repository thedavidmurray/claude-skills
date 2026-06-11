# claude-csv-summarizer

A Claude Code skill that turns any CSV file into a full analysis report —
column-type detection, summary statistics, missing-value audit, and
matplotlib/seaborn charts — automatically, without asking what you want.

## Install

```bash
/plugin marketplace add thedavidmurray/claude-skills
/plugin install csv-summarizer@claude-skills
```

Or copy it manually from a clone of this repo:

```bash
mkdir -p .claude/skills && cp -r skills/csv-summarizer .claude/skills/
```

Requires Python 3.8+ with `pandas`, `matplotlib`, and `seaborn`
(`pip install pandas matplotlib seaborn`).

## Usage

> "Analyze sales_data.csv"

> "Here's orders_2024.csv — summarize it."

> "What insights can you pull from survey_results.csv?"

## Contents

- `examples/` — sample sales and survey CSVs plus the full report generated from them

Full behavior reference: [SKILL.md](SKILL.md)

## License

MIT License — see [LICENSE](LICENSE). Copyright (c) 2024 Edgeless Labs
