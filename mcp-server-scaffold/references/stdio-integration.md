# Stdio Transport Integration

Guide for integrating stdio-based MCP servers with Claude Desktop.

## Overview

The stdio transport is the simplest MCP transport, ideal for:
- Local command-line tools
- Scripts and utilities
- Claude Desktop integration

## How It Works

1. Claude Desktop spawns your server as a subprocess
2. Communication happens over stdin/stdout using JSON-RPC
3. Server reads requests from stdin, writes responses to stdout
4. Logs go to stderr (never to stdout - it breaks the protocol!)

## Claude Desktop Configuration

Add your server to Claude Desktop's settings:

### macOS
```bash
~/Library/Application\ Support/Claude/claude_desktop_config.json
```

### Windows
```
%APPDATA%\Claude\claude_desktop_config.json
```

### Linux
```
~/.config/Claude/claude_desktop_config.json
```

## Configuration Format

```json
{
  "mcpServers": {
    "my-server": {
      "command": "node",
      "args": ["/absolute/path/to/your/dist/server.js"],
      "env": {
        "API_KEY": "your-api-key",
        "DEBUG": "true"
      }
    }
  }
}
```

### With npx (if published to npm)
```json
{
  "mcpServers": {
    "my-server": {
      "command": "npx",
      "args": ["-y", "your-server-package"],
      "env": {
        "API_KEY": "your-api-key"
      }
    }
  }
}
```

### With absolute path (local development)
```json
{
  "mcpServers": {
    "my-server": {
      "command": "/Users/you/projects/my-mcp-server/dist/server.js"
    }
  }
}
```

## Environment Variables

Pass sensitive configuration via `env`:

```json
{
  "mcpServers": {
    "weather": {
      "command": "node",
      "args": ["/path/to/weather-server/dist/server.js"],
      "env": {
        "WEATHER_API_KEY": "sk-..."
      }
    }
  }
}
```

**Important:** Never hardcode secrets in your server code.

## Testing Locally

Test your server without Claude Desktop:

```bash
# Build your server
npm run build

# Start and send a JSON-RPC request
echo '{"jsonrpc":"2.0","id":1,"method":"initialize","params":{"protocolVersion":"2024-11-05","capabilities":{},"clientInfo":{"name":"test","version":"1.0"}}}' | node dist/server.js
```

Or use the MCP inspector:

```bash
npx @anthropics/mcp-inspector node dist/server.js
```

## Debugging

### Enable Debug Logging

```typescript
// In your server.ts
const DEBUG = process.env.DEBUG === "true";

function debug(...args: unknown[]) {
  if (DEBUG) {
    console.error("[DEBUG]", ...args);
  }
}
```

### View Claude Desktop Logs

macOS:
```bash
# View real-time logs
tail -f ~/Library/Logs/Claude/mcp.log

# Search for your server
grep "my-server" ~/Library/Logs/Claude/mcp.log
```

### Common Issues

| Issue | Solution |
|-------|----------|
| Server not starting | Check `command` path is absolute |
| Protocol errors | Ensure no stdout logging in server |
| Permission denied | Make server.js executable: `chmod +x` |
| Missing env vars | Add all required env to config |
| TypeScript errors | Build first: `npm run build` |

## Publishing to npm

To make your server installable via npx:

1. Create an npm account: `npm adduser`
2. Update package.json:
   ```json
   {
     "name": "@yourname/mcp-server-xyz",
     "version": "1.0.0",
     "bin": {
       "mcp-server-xyz": "./dist/server.js"
     }
   }
   ```
3. Build and publish:
   ```bash
   npm run build
   npm publish --access public
   ```

Then users can use:
```json
{
  "mcpServers": {
    "xyz": {
      "command": "npx",
      "args": ["-y", "@yourname/mcp-server-xyz"]
    }
  }
}
```

## Auto-reload During Development

For development, use a watcher:

```bash
# Install nodemon
npm install -D nodemon

# Add to package.json scripts
{
  "scripts": {
    "dev": "nodemon --exec 'tsc && node dist/server.js' --watch src --ext ts"
  }
}
```

Then manually restart Claude Desktop when code changes.
