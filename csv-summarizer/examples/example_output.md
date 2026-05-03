# CSV Analysis Report: `sample_sales.csv`

---

## Dataset Overview

| Property | Value |
|---|---|
| File | `sample_sales.csv` |
| Rows | 20 |
| Columns | 10 |
| Numeric columns | 3 |
| Categorical columns | 5 |
| Date/time columns | 1 |
| Boolean columns | 0 |
| Free-text columns | 0 |
| Total missing cells | 0 (0.0%) |

## Column Types Detected

| Type | Columns |
|---|---|
| Numeric | `quantity`, `unit_price`, `discount` |
| Categorical | `order_id`, `customer_id`, `product`, `category`, `region`, `status` |
| Date/time | `order_date` |

## Numeric Summary Statistics

| Column | Count | Mean | Std | Min | 25% | Median | 75% | Max | Skew |
|---|---|---|---|---|---|---|---|---|---|
| `quantity` | 20 | 1.55 | 0.83 | 1.00 | 1.00 | 1.00 | 2.00 | 4.00 | 1.322 |
| `unit_price` | 20 | 81.24 | 60.85 | 12.99 | 26.24 | 67.49 | 109.99 | 249.99 | 1.083 |
| `discount` | 20 | 4.25 | 7.22 | 0.00 | 0.00 | 0.00 | 7.50 | 25.00 | 1.764 |

## Missing Values

No missing values detected.

## Categorical Column Summaries

**`category`** — 7 unique values
| Value | Count |
|---|---|
| Electronics | 5 |
| Kitchen | 4 |
| Apparel | 3 |
| Sports | 3 |
| Home | 3 |

**`region`** — 4 unique values
| Value | Count |
|---|---|
| North | 5 |
| South | 5 |
| East | 5 |
| West | 5 |

**`status`** — 2 unique values
| Value | Count |
|---|---|
| completed | 18 |
| returned | 2 |

## Temporal Coverage

- **`order_date`**: 2024-01-03 → 2024-03-20 (76 days)

## Visualizations Generated

- **01 Numeric Distributions**: `csv_summary_output/01_numeric_distributions.png`
  - Histograms with KDE overlay for `quantity`, `unit_price`, and `discount`.
  - `unit_price` shows right skew driven by the $249.99 stand mixer outlier.

- **02 Correlation Heatmap**: `csv_summary_output/02_correlation_heatmap.png`
  - Pairwise Pearson correlations between the three numeric columns.
  - `unit_price` and `discount` have moderate positive correlation (0.54) — higher-priced items tend to receive larger discounts.

- **03 Categorical Frequencies**: `csv_summary_output/03_categorical_frequencies.png`
  - Horizontal bar charts for `category`, `region`, `status`, and `product`.
  - Electronics leads by category; regions are evenly distributed.

- **04 Time Series**: `csv_summary_output/04_time_series.png`
  - `unit_price` and `discount` plotted over `order_date`.
  - Notable spike in late March driven by the $249.99 stand mixer order.

---

> This output was produced automatically by the `csv-data-summarizer` Claude Code skill.
> No user prompting was required beyond providing the CSV file path.
