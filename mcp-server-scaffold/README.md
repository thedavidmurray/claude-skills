[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)
[![Claude Code](https://img.shields.io/badge/Claude%20Code-Skill-blueviolet)](https://edgelesslab.com)

# claude-mcp-server-scaffold

A Claude Code skill for scaffolding production-ready MCP (Model Context Protocol) servers. It supports both TypeScript/Node.js and Python, with templates for stdio transport (Claude Desktop integration) and HTTP/SSE transport (remote clients). The skill generates main server files, tool handlers with Zod/Pydantic schema validation, resource providers, and complete package configuration.

## Installation

```bash
mkdir -p .claude/skills/mcp-server-scaffold
cp -r mcp-server-scaffold/ .claude/skills/mcp-server-scaffold/
```

Then reference it in your `CLAUDE.md`:

```markdown
## Skills
- `.claude/skills/mcp-server-scaffold/skill.md` - MCP server scaffolding
```

## Usage

```
/mcp-server-scaffold                    # Interactive setup
/mcp-server-scaffold --name my-server   # Set server name
/mcp-server-scaffold --transport stdio  # Force stdio transport
/mcp-server-scaffold --transport http   # Force HTTP transport
```

## What Gets Generated

For a stdio TypeScript server named `weather-mcp`:
- `weather-mcp/package.json` with MCP SDK and TypeScript dependencies
- `weather-mcp/src/server.ts` with stdio transport initialization
- `weather-mcp/src/tools/<tool-name>.ts` with Zod schema validation
- `weather-mcp/README.md` with Claude Desktop configuration

## File Index

| File | Purpose |
|------|---------|
| `skill.md` | Main skill definition with scaffold workflow |
| `templates/typescript/template-server-stdio.ts` | TypeScript stdio server template |
| `templates/typescript/template-server-http.ts` | TypeScript HTTP/SSE server template |
| `templates/typescript/template-tool.ts` | Tool handler with Zod schema |
| `templates/typescript/template-resource.ts` | Resource provider with URI template |
| `templates/python/template-server-stdio.py` | Python stdio server template |
| `templates/python/template-server-http.py` | Python HTTP/SSE server template |
| `templates/python/template-tool.py` | Python tool handler template |
| `scripts/scaffold-mcp-server.sh` | CLI scaffolding script |
| `references/mcp-protocol-guide.md` | MCP protocol overview |
| `references/stdio-integration.md` | Claude Desktop integration steps |
| `references/http-integration.md` | HTTP/SSE transport setup |

## Links

- [edgelesslab.com](https://edgelesslab.com)

## License

MIT License. Copyright (c) 2026 Edgeless.
