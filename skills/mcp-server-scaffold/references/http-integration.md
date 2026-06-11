# HTTP/SSE Transport Integration

Guide for deploying and using HTTP-based MCP servers.

## Overview

HTTP transport uses Server-Sent Events (SSE) for real-time bidirectional communication:
- **Client** connects to `/sse` endpoint for server-to-client messages
- **Client** POSTs to `/message` endpoint for client-to-server messages
- Each connection has a unique session ID

Use cases:
- Remote MCP servers (cloud deployed)
- Browser-based clients
- Multi-tenant services
- Load-balanced deployments

## Architecture

```
┌─────────────┐      SSE (GET /sse)       ┌─────────────┐
│   Client    │◄─────────────────────────│  MCP Server │
│  (Browser,  │      Events               │   (Express) │
│   Claude,   │                          └──────┬──────┘
│   etc.)     │◄─────────────────────────────────┘
└─────────────┘      Commands (POST /message)
```

## Endpoints

### GET /sse
Establishes SSE connection. Server sends events like:

```
HTTP/1.1 200 OK
Content-Type: text/event-stream
Cache-Control: no-cache
Connection: keep-alive

event: endpoint
data: /message?sessionId=abc-123

event: message
data: {"jsonrpc":"2.0","id":1,"result":{...}}
```

### POST /message
Client sends JSON-RPC requests:

```bash
curl -X POST "http://localhost:3000/message?sessionId=abc-123" \
  -H "Content-Type: application/json" \
  -d '{"jsonrpc":"2.0","id":1,"method":"tools/list","params":{}}'
```

### GET /health
Health check for monitoring:

```bash
curl http://localhost:3000/health
# {"status":"ok","server":"my-server","version":"1.0.0","activeSessions":5}
```

## Deployment

### Docker

```dockerfile
FROM node:20-alpine

WORKDIR /app
COPY package*.json ./
RUN npm ci

COPY . .
RUN npm run build

EXPOSE 3000
ENV PORT=3000

CMD ["node", "dist/server.js"]
```

Build and run:
```bash
docker build -t my-mcp-server .
docker run -p 3000:3000 -e API_KEY=secret my-mcp-server
```

### Cloud Run (Google Cloud)

```yaml
# cloudbuild.yaml
steps:
  - name: 'gcr.io/cloud-builders/docker'
    args: ['build', '-t', 'gcr.io/$PROJECT_ID/mcp-server', '.']
  - name: 'gcr.io/cloud-builders/docker'
    args: ['push', 'gcr.io/$PROJECT_ID/mcp-server']
  - name: 'gcr.io/google.com/cloudsdktool/cloud-sdk'
    entrypoint: gcloud
    args:
      - run
      - deploy
      - mcp-server
      - --image=gcr.io/$PROJECT_ID/mcp-server
      - --platform=managed
      - --allow-unauthenticated
```

### AWS Lambda

HTTP transport can be adapted for Lambda:

```typescript
import { APIGatewayProxyHandler } from "aws-lambda";
import { SSEServerTransport } from "@modelcontextprotocol/sdk/server/sse.js";

// Store sessions in DynamoDB for serverless
const handler: APIGatewayProxyHandler = async (event) => {
  if (event.httpMethod === "GET" && event.path === "/sse") {
    // Setup SSE response through API Gateway
  }
  // ... handle other routes
};
```

### Self-Hosted VPS

Deploy to any VPS with systemd:

```ini
# /etc/systemd/system/mcp-server.service
[Unit]
Description=MCP Server
After=network.target

[Service]
Type=simple
User=mcp
WorkingDirectory=/opt/mcp-server
ExecStart=/usr/bin/node dist/server.js
Restart=always
Environment=PORT=3000
Environment=API_KEY=secret

[Install]
WantedBy=multi-user.target
```

Enable:
```bash
sudo systemctl enable mcp-server
sudo systemctl start mcp-server
```

## Security

### Authentication

Add token validation to your server:

```typescript
app.use((req, res, next) => {
  const token = req.headers.authorization?.replace("Bearer ", "");
  if (token !== process.env.EXPECTED_TOKEN) {
    return res.status(401).json({ error: "Unauthorized" });
  }
  next();
});
```

### CORS

Configure for browser clients:

```typescript
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", process.env.CORS_ORIGIN || "*");
  res.header("Access-Control-Allow-Headers", "*");
  res.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
  // ...
});
```

### Rate Limiting

Add rate limiting for production:

```bash
npm install express-rate-limit
```

```typescript
import rateLimit from "express-rate-limit";

app.use(rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100 // limit each IP to 100 requests
}));
```

## Reverse Proxy (nginx)

```nginx
server {
    listen 80;
    server_name mcp.example.com;

    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
        
        # SSE specific
        proxy_buffering off;
        proxy_read_timeout 86400;
    }
}
```

## Connecting Clients

### Claude Code CLI

```bash
# Not yet supported for HTTP transport
# Use stdio transport with a local proxy instead
```

### Custom Client (JavaScript)

```typescript
import { Client } from "@modelcontextprotocol/sdk/client/index.js";
import { SSEClientTransport } from "@modelcontextprotocol/sdk/client/sse.js";

const url = new URL("http://localhost:3000/sse");
const transport = new SSEClientTransport(url);

const client = new Client({
  name: "my-client",
  version: "1.0.0",
});

await client.connect(transport);

// List tools
const tools = await client.listTools();
console.log(tools);

// Call a tool
const result = await client.callTool({
  name: "example_tool",
  arguments: { message: "Hello!" }
});
```

### Python Client

```python
import requests
import json

# Connect to SSE endpoint
response = requests.get("http://localhost:3000/sse", stream=True)

# Read the endpoint event
for line in response.iter_lines():
    if line.startswith(b"data: "):
        data = json.loads(line[6:])
        if data.get("event") == "endpoint":
            message_url = data["data"]
            break

# POST to message endpoint
requests.post(message_url, json={
    "jsonrpc": "2.0",
    "id": 1,
    "method": "tools/list",
    "params": {}
})
```

## Scaling

### Horizontal Scaling

For multiple server instances:
1. Use Redis for session storage
2. Route clients to correct instance based on session ID
3. Or use sticky sessions with load balancer

### Monitoring

Add metrics to your server:

```typescript
app.get("/metrics", (_req, res) => {
  res.json({
    activeSessions: transports.size,
    uptime: process.uptime(),
    memory: process.memoryUsage(),
  });
});
```

## Troubleshooting

| Issue | Solution |
|-------|----------|
| CORS errors | Configure `Access-Control-Allow-Origin` |
| Connection drops | Increase `proxy_read_timeout` in nginx |
| Session lost | Check cookies/sticky sessions |
| Slow responses | Add caching for expensive operations |
| Memory leaks | Clean up transport.onclose handlers |
