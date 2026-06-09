# claude-article-extractor

A Claude Code skill that extracts clean article content from any URL — blog
posts, news articles, documentation pages, GitHub READMEs — and saves it as
readable markdown with YAML frontmatter metadata.

## Install

```bash
mkdir -p .claude/skills && cp -r article-extractor .claude/skills/
```

Optional backends improve results: `npm install -g reader-cli`,
`pip install trafilatura`, and `pip install firecrawl-py` with a
`FIRECRAWL_API_KEY` for JS-heavy sites (a stdlib fallback works with none).

## Usage

> "Extract the article at https://example.com/interesting-post and save it to my reading folder."

> "Download this blog post and save it as markdown: https://..."

> "Grab the content from this documentation page, I want to read it offline."

Full behavior reference: [SKILL.md](SKILL.md)

## License

MIT License — Copyright (c) 2025 Edgeless Labs. See `LICENSE` for full terms.
