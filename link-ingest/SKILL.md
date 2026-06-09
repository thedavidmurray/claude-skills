---
name: link-ingest
description: >
  Ingest, save, or archive any web URL into the knowledge base. Fetches content
  using intelligent scraping (WebFetch/curl by default, Firecrawl or Tavily if
  configured for JS-heavy sites), creates a well-structured Obsidian note with
  proper frontmatter and tags, and optionally stores to ChromaDB for semantic search. Supports articles, YouTube videos, GitHub
  repos, arXiv papers, podcasts, books, and music. Triggers on: "ingest this",
  "save this link", "archive this article", "/ingest URL", user pastes a URL and
  asks to process or save it, "add this to the knowledge base", "store this URL".
allowed-tools: WebFetch, WebSearch, Write, Read, Bash, mcp__chroma__chroma_add_documents, mcp__chroma__chroma_get_collection_info
user-invocable: true
command: /ingest
arguments: url
created: 2026-01-18
updated: 2026-04-17
version: 3.2
metadata:
  tags: [ingest, url, web, obsidian, chromadb, knowledge-base, scraping]
  tier: general
  domain: ingestion
when_to_apply: When the user pastes a URL and asks to save, archive, or ingest it into the knowledge base
---

# Link Ingest Skill (v3.0)

Ingest ANY web content into the knowledge base with **intelligent scraping strategy**, auto-detected content type, enrichment, and proper Obsidian metadata.

**Vault location**: If you don't know where the user's vault/notes live, ask them once at the start. If they have no vault, default to an `ingest/` folder in the current project.

## What's New in v3.0

- **Optional Firecrawl support** for JS-heavy sites (Medium, Substack, Twitter/X) — if configured
- **Optional Tavily search** fallback for paywalled/blocked content — if configured
- **Smart URL classification** auto-selects best scraping method
- **67% fewer tokens** using markdown output vs raw HTML

## When to Use

Activate when the user:
- Says "ingest this: [URL]"
- Says "save this link" or "archive this article"
- Pastes a URL and asks to process/save it
- Uses `/ingest <url>`
- Shares a YouTube, Spotify, GitHub, arXiv, or any other URL

## Content Type Detection

Automatically detect content type from URL:

| URL Pattern | Content Type | Schema |
|-------------|--------------|--------|
| `youtube.com/watch`, `youtu.be/` | video | video schema |
| `open.spotify.com/track` | music | music schema |
| `open.spotify.com/episode` | podcast | podcast schema |
| `arxiv.org` | paper | paper schema |
| `github.com/{owner}/{repo}` | repo | repo schema |
| `goodreads.com/book` | book | book schema |
| `podcasts.apple.com` | podcast | podcast schema |
| `*.bandcamp.com`, `soundcloud.com` | music | music schema |
| Everything else | article | article schema |


## Search Query Rules

See project search-triggering conventions for query rules.

1. Never include years in search queries -- use the `since` field instead.
2. Never include relative-time words (latest, recent, current, today, this week) -- use the `since` field.
3. Decompose broad queries into multiple specific facets with proper nouns.

## Scraping Strategy (v3.0)

### URL Classification

Classify the URL to choose the best method:

| Site Type | Method | Why |
|-----------|--------|-----|
| **Simple Static** (GitHub raw, arXiv, plain blogs) | WebFetch or `curl` | Fast, no API credits needed |
| **JS-Heavy** (Medium, Substack, Twitter/X, LinkedIn, Notion) | Firecrawl (if configured) | Renders JavaScript, bypasses anti-bot |
| **Search/Discovery** | Tavily (if configured), else WebSearch | Better for finding related content |
| **Blocked/Failed** | WebFetch / WebSearch fallback | Last resort |

### Available Scraping Tools

Use only what's universally available, plus optional API-based scrapers:

1. **WebFetch tool** (always available) — fetches a URL and returns processed content. Primary method for most pages.
2. **`curl` via Bash** (always available) — for raw HTML, redirects, headers, or sites where WebFetch is blocked:
   ```bash
   curl -sL -A "Mozilla/5.0" "https://example.com/article" | head -c 50000
   ```
3. **Firecrawl / Tavily (optional)** — if configured, use your Firecrawl/Tavily MCP tools or API key. These are best for JS-heavy or paywalled sites. Example with an API key:
   ```bash
   curl -s -X POST "https://api.firecrawl.dev/v1/scrape" \
     -H "Authorization: Bearer $FIRECRAWL_API_KEY" \
     -H "Content-Type: application/json" \
     -d '{"url": "https://medium.com/article", "formats": ["markdown"]}'
   ```
   If neither MCP tools nor API keys are available, skip this tier — do not try to install anything.

## Workflow

### Step 1: Detect Content Type

```python
def detect_content_type(url):
    if 'youtube.com/watch' in url or 'youtu.be/' in url:
        return 'video'
    elif 'open.spotify.com/track' in url:
        return 'music'
    elif 'open.spotify.com/episode' in url:
        return 'podcast'
    elif 'arxiv.org' in url:
        return 'paper'
    elif 'github.com' in url and url.count('/') >= 4:
        return 'repo'
    elif 'goodreads.com/book' in url:
        return 'book'
    elif 'podcasts.apple.com' in url:
        return 'podcast'
    elif 'bandcamp.com' in url or 'soundcloud.com' in url:
        return 'music'
    else:
        return 'article'
```

### Step 2: Fetch Content (v3.0 Strategy)

**Primary: WebFetch tool** — fetch the URL and ask for the full article content as clean markdown (title, author, body).

**Simple Sites:**
- GitHub raw files, arXiv abstracts, static blogs
- WebFetch or `curl -sL` via Bash (no API credits)
- Convert HTML to text/markdown yourself if using curl

**JS-Heavy Sites:**
- Medium, Substack, Twitter/X, LinkedIn, Notion, Vercel apps
- If configured, use your Firecrawl MCP tools or API key for JavaScript rendering (returns clean markdown, 67% fewer tokens)
- Otherwise try WebFetch first, then `curl` with a browser User-Agent

**Fallback Chain:**
1. Try WebFetch (works for most pages)
2. If blocked/empty → Try `curl -sL -A "Mozilla/5.0" <url>` via Bash
3. If configured → Try Firecrawl (JS rendering) or Tavily (cached/extracted content) via their MCP tools or API keys
4. If all fail → Use WebSearch to find a cached copy or the same content elsewhere

**For YouTube (if direct fetch is blocked):**
- Use WebSearch for `"{video_title}" {channel}` to find descriptions, transcripts, or coverage
- If a Tavily MCP tool is configured, its search with raw content works well here

**For Research/Discovery:**
- Use WebSearch (always available), or Tavily MCP/API if configured for richer extracted content

### Step 3: AI Enrichment

Analyze the content to extract:
1. **Topics** - 3-5 main topics/keywords
2. **Entities** - Tools, people, companies mentioned
3. **Subtype** - Tutorial, news, reference, etc.
4. **Relevance Score** - Quality estimate (0.0-1.0)
5. **Summary** - 2-sentence summary for Dataview

### Step 4: Create Obsidian Note

Generate a note with STANDARDIZED frontmatter (customize frontmatter per your vault setup):

```yaml
---
# Core (required for all types)
note_type: knowledge_base
content_type: article  # or video, music, podcast, book, paper, repo
title: "Content Title"
source_url: "https://..."
ingested_at: 2026-01-18
created: 2026-01-18
updated: 2026-01-18
status: active

# Hierarchical tags (auto-generated)
tags:
  - content/article           # content/{type}
  - content/article/tutorial  # content/{type}/{subtype}
  - source/web               # source/{tool}
  - domain/example-com       # domain/{domain}
  - topic/ai-ml              # topic/{topic} (from AI extraction)
  - topic/langchain

# Quality
relevance_score: 0.85

# Type-specific fields (vary by content type)
author: "Author Name"
published: 2026-01-15
word_count: 2500
reading_time_minutes: 12
content_subtype: tutorial

# AI-extracted entities
topics: [RAG, LangChain, AI, embeddings]
mentioned_tools: [LangChain, ChromaDB, OpenAI]
mentioned_people: [Harrison Chase]
mentioned_companies: [LangChain Inc]

# Summary for Dataview tables
summary: "Step-by-step guide to building RAG applications using LangChain"

# Processing metadata
processed_by: link-ingest
chromadb_id: "link-abc123"
---
```

### Step 3: Structure the Note Body

```markdown
# {Title}

## Summary
{2-3 sentence summary}

## Key Points
- Point 1
- Point 2
- Point 3

## Content
{Main article content, cleaned}

## Actionable Items
- [ ] Any action items extracted from the content

## Metadata
- **Source**: {url}
- **Domain**: {domain}
- **Ingested**: {date}
- **Word Count**: {count}

---
*Ingested via link-ingest skill*
```

### Step 3b: Research Enrichment (MANDATORY for backlog-worthy content)

**When the ingested content contains actionable concepts, techniques, or patterns that could generate backlog tasks**, enrich with academic/technical research (Perplexity MCP if configured, otherwise WebSearch) BEFORE creating any tasks.

**Trigger conditions** (any of):
- Content contains technical concepts applicable to existing projects (trading, agents, ML)
- Content proposes a methodology, framework, or pattern
- User explicitly requests backlog task creation
- Content type is: tutorial, paper, technical article, educational video

**Enrichment workflow:**
1. Extract 2-3 key concepts from the ingested content
2. For each concept, run a search with academic/technical focus. If a Perplexity MCP server is configured, use its search tool (e.g. `mcp__perplexity-mcp__perplexity_search_web`); otherwise use WebSearch:
   ```
   query: "<concept> <application domain> best practices research"
   ```
3. Synthesize findings: what does current research say? What are the caveats? How does this apply to our specific projects?
4. Include enrichment in the Obsidian note under a `## Research Enrichment` section
5. When creating backlog tasks, incorporate the research findings into the task's technical approach and acceptance criteria

**Example:**
- Ingested article about "variance drag in compound returns"
- Research query: "variance drag prediction markets binary options position sizing"
- Finding: "Binary outcomes don't compound within a single position, but drag applies across sequential trades. Half-Kelly is more robust."
- Backlog task enriched with: specific position sizing formula, reference to Kelly criterion, real-world application to Pamela bot

**Skip enrichment when:**
- Content is purely entertainment/creative (music, art)
- Content is a simple reference/documentation page
- Content has no actionable technical depth

### Step 4: Save to Vault

Save to: `<your-vault>/Knowledge/WebIntake/` (or `ingest/` in the current project if the user has no vault)

Filename pattern: `YYYY-MM-DD-{sanitized-title}.md`

### Step 5: Store to ChromaDB (optional)

If a Chroma MCP server is configured, use its tool to add to the `link_intake` collection; otherwise skip indexing and just save the note:

```python
mcp__chroma__chroma_add_documents(
    collection_name="link_intake",
    documents=[summary + "\n\n" + content[:8000]],
    ids=[f"link-{url_hash}"],
    metadatas=[{
        "title": title,
        "url": url,
        "domain": domain,
        "ingested_at": date,
        "type": "article",
        "source": "link_ingest_skill"
    }]
)
```

### Step 6: Confirm to User

```
Ingested: {title}
- Saved to: <vault>/Knowledge/WebIntake/{filename}
- Added to ChromaDB: link_intake collection (only if Chroma MCP is configured)
- Tags: source/web, content-type/article, domain/{domain}
```

## Standardized Tag Hierarchy

Always use these tag patterns for consistency:

| Category | Pattern | Examples |
|----------|---------|----------|
| Source | `source/{tool}` | `source/web`, `source/youtube`, `source/arxiv` |
| Content Type | `content-type/{type}` | `content-type/article`, `content-type/tutorial`, `content-type/reference` |
| Domain | `domain/{domain}` | `domain/github-com`, `domain/hackernews` |
| Status | `status/{status}` | `status/to-review`, `status/actionable` |
| Topic | `topic/{topic}` | `topic/python`, `topic/ai-ml` |

## Error Handling

**v3.0 Fallback Chain:**
1. WebFetch fails or returns empty/blocked content → Try `curl -sL -A "Mozilla/5.0" <url>` via Bash
2. curl also blocked → If configured, try Firecrawl (JS rendering) or Tavily (cached/extracted content) via MCP tools or API keys
3. Still nothing → Use WebSearch with `site:{domain} {title guess}` to find a cached copy or the same content elsewhere
4. No result at all → Inform user, suggest URL check, save URL with minimal metadata
5. ChromaDB add fails (or no Chroma MCP configured) → Still save the note to the vault, warn that semantic search indexing was skipped
6. Content paywalled → Try Tavily if configured (often has cached snippets), else WebSearch; save what's available

**Checking a fetch result:** treat a fetch as failed if it returns an error, a CAPTCHA/login wall, a cookie-consent shell, or fewer than ~200 words of actual article text — then move to the next tier of the chain.

## API Credit Usage

| Method | Credits | When Used |
|--------|---------|-----------|
| WebFetch / `curl` | Free, built-in | Primary method for most sites |
| Firecrawl (optional) | 500 total free | JS-heavy sites (Medium, etc.), if configured |
| Tavily (optional) | 1000/month free | Search fallback, research, if configured |
| WebSearch | Free, built-in | Cached-copy fallback, discovery |

**Conservation tips:**
- Default to WebFetch/`curl` (free) — only escalate when a fetch actually fails
- Use Tavily for search/discovery if configured (generous free tier), else WebSearch
- Reserve Firecrawl for sites that truly need JS rendering

## Examples

**User**: "ingest this: https://medium.com/@author/great-article"

**Response**:
1. Detect: JS-heavy site (Medium) → Use Firecrawl MCP/API if configured, else WebFetch then `curl`
2. Fetch returns clean markdown
3. Extract metadata, generate tags
4. Create Obsidian note with proper frontmatter
5. Save to vault
6. Add to ChromaDB (if Chroma MCP is configured)
7. Confirm: "Ingested 'Great Article Title' - saved to vault (and ChromaDB if configured)"

**User**: "/ingest https://blog.example.com/tutorial"

1. Detect: Simple blog → Use WebFetch (no API credits)
2. Same workflow, fast and free

**User**: "/ingest https://paywalled-site.com/article"

1. WebFetch and `curl` fail (paywall)
2. Try Tavily (if configured) or WebSearch for cached content
3. If found: Use snippet/cached version
4. If not: Inform user, save URL with minimal metadata
