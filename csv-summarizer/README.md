# claude-csv-summarizer

A Claude Code skill that turns any CSV file into a full analysis report —
automatically, without asking what you want.

Drop a CSV path into a Claude Code session and get back:

- Column-type detection (numeric, categorical, date/time, boolean, free text)
- Summary statistics table (mean, std, median, skew, percentiles)
- Missing-value audit
- Categorical frequency breakdowns (top 15 values per column)
- Temporal coverage range (when date columns exist)
- matplotlib / seaborn charts saved as PNGs:
  - Numeric distributions (histogram + KDE)
  - Correlation heatmap (when 2+ numeric columns exist)
  - Categorical frequency bars
  - Time-series trend lines (when date columns exist)
  - Missing-value bar chart (when gaps are present)
- A self-contained `report.md` in a `csv_summary_output/` folder

---

## Example Output

See [`examples/example_output.md`](examples/example_output.md) for the full
report produced from the included sales sample.

Example chart types produced:

```
csv_summary_output/
  01_numeric_distributions.png
  02_correlation_heatmap.png
  03_categorical_frequencies.png
  04_time_series.png          ← only when date columns detected
  05_missing_values.png       ← only when gaps present
  report.md
```

---

## Installation

### 1. Install Python dependencies

```bash
pip install pandas matplotlib seaborn
```

Minimum versions: `pandas>=2.0.0`, `matplotlib>=3.7.0`, `seaborn>=0.12.0`

### 2. Add the skill to Claude Code

Copy `SKILL.md` into your project's skills directory:

```bash
# From the repo root
mkdir -p .claude/skills/csv-data-summarizer
cp SKILL.md .claude/skills/csv-data-summarizer/SKILL.md
```

Claude Code automatically loads `.claude/skills/*/SKILL.md` files in each
session. No further configuration is required.

### 3. Use it

Start a Claude Code session in any directory that contains (or references) a
CSV file and Claude will immediately run the full analysis:

```
> Analyze sales_data.csv
```

```
> Here's orders_2024.csv — summarize it.
```

```
> What's in this file? [attaches survey_results.csv]
```

Claude acts immediately — no follow-up questions, no option menus.

---

## Data Types Supported

| Data type | Primary analysis focus |
|---|---|
| Sales / e-commerce | Revenue trends, product mix, regional split |
| Survey / responses | Frequency distributions, satisfaction scores, cross-tabs |
| Financial / transactions | Temporal trends, amount distribution, correlations |
| Customer / demographic | Segmentation, age/role/region breakdown |
| Operational / metrics | Time-series, performance stats, status distribution |
| Generic tabular | Full numeric + categorical summary |

---

## Included Examples

| File | Description |
|---|---|
| `examples/sample_sales.csv` | 20-row e-commerce order history with dates, categories, prices |
| `examples/sample_survey.csv` | 20-row product satisfaction survey with ratings and roles |
| `examples/example_output.md` | Full report produced from `sample_sales.csv` |

---

## How It Works

The skill embeds a self-contained Python script that Claude runs via its code
execution capability. The script:

1. Loads the CSV with `pandas.read_csv`
2. Detects column types using dtype inspection + name heuristics + parse
   attempts (for dates)
3. Computes descriptive statistics for numeric columns
4. Counts missing values across all columns
5. Plots only the charts relevant to the detected data shape
6. Writes all PNGs and `report.md` to `csv_summary_output/` next to the CSV

No external APIs, no network calls, no project-specific imports.

---

## Requirements

```
pandas>=2.0.0
matplotlib>=3.7.0
seaborn>=0.12.0
python>=3.8
```

---

## License

MIT License — see [LICENSE](LICENSE).

Copyright (c) 2024 Edgeless Labs
