# MCP Protocol Guide

Overview of the Model Context Protocol (MCP) for building server implementations.

## Core Concepts

### Server
An MCP server exposes capabilities to clients through a transport layer. Servers can provide:
- **Tools** - Functions that clients can call with arguments
- **Resources** - Addressable data sources with URI templates
- **Prompts** - Pre-defined prompt templates

### Transport
The communication layer between client and server:
- **Stdio** - For local/desktop integration (Claude Desktop)
- **HTTP/SSE** - For remote/networked clients
- **In-Memory** - For testing and embedded use

### Protocol Messages
All communication uses JSON-RPC 2.0:

```typescript
// Request
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": { ... }
}

// Response
{
  "jsonrpc": "2.0",
  "id": 1,
  "result": { ... }
}

// Error
{
  "jsonrpc": "2.0",
  "id": 1,
  "error": {
    "code": -32600,
    "message": "Invalid Request"
  }
}
```

## Server Capabilities

Declare capabilities during server initialization:

```typescript
const server = new Server(
  { name: "my-server", version: "1.0.0" },
  {
    capabilities: {
      tools: {},           // Supports tools/list and tools/call
      resources: {},       // Supports resources/list and resources/read
      prompts: {},         // Supports prompts/list and prompts/get
      logging: {},         // Supports logging notifications
    },
  }
);
```

## Tools

### Tool Definition
```typescript
{
  name: "get_weather",
  description: "Get current weather for a location",
  inputSchema: {
    type: "object",
    properties: {
      location: {
        type: "string",
        description: "City name or coordinates"
      },
      units: {
        type: "string",
        enum: ["celsius", "fahrenheit"],
        default: "celsius"
      }
    },
    required: ["location"]
  }
}
```

### Tool Handler
```typescript
server.setRequestHandler(CallToolRequestSchema, async (request) => {
  const { name, arguments: args } = request.params;
  
  // Validate arguments with Zod or manually
  // Execute tool logic
  // Return formatted content
  
  return {
    content: [
      { type: "text", text: "Result here" },
      { type: "image", data: base64Image, mimeType: "image/png" }  // Optional
    ]
  };
});
```

## Resources

### Resource Definition
```typescript
{
  uri: "weather://{city}/current",
  name: "Current Weather",
  mimeType: "application/json",
  description: "Current weather conditions"
}
```

### Resource Handler
```typescript
server.setRequestHandler(ReadResourceRequestSchema, async (request) => {
  const uri = request.params.uri;
  
  // Parse URI template parameters
  // Fetch resource data
  // Return content with proper mime type
  
  return {
    contents: [{
      uri,
      mimeType: "application/json",
      text: JSON.stringify(data)
    }]
  };
});
```

## Best Practices

### Error Handling
Use MCP error codes for consistent error handling:

| Code | Name | Use When |
|------|------|----------|
| -32600 | InvalidRequest | Malformed request |
| -32601 | MethodNotFound | Unknown tool/resource |
| -32602 | InvalidParams | Missing/invalid parameters |
| -32603 | InternalError | Server error |

### Input Validation
Always validate tool arguments:

```typescript
import { z } from "zod";

const ToolSchema = z.object({
  location: z.string().min(1),
  units: z.enum(["celsius", "fahrenheit"]).optional()
});

const result = ToolSchema.safeParse(args);
if (!result.success) {
  throw new McpError(ErrorCode.InvalidParams, result.error.message);
}
```

### Logging
Use `console.error` instead of `console.log` to avoid interfering with stdio transport.

### Cleanup
Implement proper cleanup for long-running resources:

```typescript
transport.onclose = () => {
  // Clean up resources, close connections
};
```

## Security Considerations

1. **Validate all inputs** - Never trust client-provided data
2. **Sanitize outputs** - Don't expose sensitive information
3. **Rate limiting** - Implement for external API calls
4. **Authentication** - For HTTP transport, validate tokens/session IDs
5. **CORS** - Configure allowed origins for browser clients

## Testing

Test your server with the MCP inspector:

```bash
npx @anthropics/mcp-inspector node dist/server.js
```

Or programmatically:

```typescript
import { Client } from "@modelcontextprotocol/sdk/client/index.js";
import { InMemoryTransport } from "@modelcontextprotocol/sdk/inMemory.js";

const [clientTransport, serverTransport] = InMemoryTransport.createLinkedPair();
const client = new Client({ name: "test-client", version: "1.0.0" });

await client.connect(clientTransport);
// ... test interactions
```
