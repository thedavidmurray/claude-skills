import express, { Request, Response } from "express";
import { SSEServerTransport } from "@modelcontextprotocol/sdk/server/sse.js";
import { Server } from "@modelcontextprotocol/sdk/server/index.js";
import {
  CallToolRequestSchema,
  ListToolsRequestSchema,
  ListResourcesRequestSchema,
  ReadResourceRequestSchema,
  ErrorCode,
  McpError,
} from "@modelcontextprotocol/sdk/types.js";

// Import tool handlers
// import { handleGetForecast } from "./tools/get-forecast.js";

// Import resource providers  
// import { handleQueryResource } from "./resources/query.js";

/**
 * {{SERVER_NAME}} MCP Server (HTTP/SSE Transport)
 * 
 * {{DESCRIPTION}}
 * 
 * Environment:
 *   PORT - Server port (default: 3000)
 *   CORS_ORIGIN - Allowed CORS origin (default: *)
 */

const app = express();
const PORT = process.env.PORT || 3000;
const CORS_ORIGIN = process.env.CORS_ORIGIN || "*";

// Enable CORS for browser-based clients
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", CORS_ORIGIN);
  res.header("Access-Control-Allow-Headers", "*");
  res.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
  if (req.method === "OPTIONS") {
    res.sendStatus(200);
  } else {
    next();
  }
});

app.use(express.json());

// Map to store transports by session ID
const transports: Map<string, SSEServerTransport> = new Map();

/**
 * Create MCP server instance
 */
function createServer(): Server {
  const server = new Server(
    {
      name: "{{SERVER_NAME}}",
      version: "{{VERSION}}",
    },
    {
      capabilities: {
        tools: {},
        resources: {},
      },
    }
  );

  // === TOOL HANDLERS ===

  server.setRequestHandler(ListToolsRequestSchema, async () => {
    return {
      tools: [
        {
          name: "example_tool",
          description: "An example tool that demonstrates the pattern",
          inputSchema: {
            type: "object",
            properties: {
              message: {
                type: "string",
                description: "Message to echo back",
              },
            },
            required: ["message"],
          },
        },
      ],
    };
  });

  server.setRequestHandler(CallToolRequestSchema, async (request) => {
    const { name, arguments: args } = request.params;

    try {
      switch (name) {
        case "example_tool": {
          const message = args?.message as string;
          return {
            content: [
              {
                type: "text",
                text: `Echo: ${message}`,
              },
            ],
          };
        }

        default:
          throw new McpError(
            ErrorCode.MethodNotFound,
            `Unknown tool: ${name}`
          );
      }
    } catch (error) {
      if (error instanceof McpError) {
        throw error;
      }
      throw new McpError(
        ErrorCode.InternalError,
        `Tool execution failed: ${error}`
      );
    }
  });

  // === RESOURCE HANDLERS ===

  server.setRequestHandler(ListResourcesRequestSchema, async () => {
    return {
      resources: [
        {
          uri: "example://docs/readme",
          name: "Example Resource",
          mimeType: "text/plain",
          description: "An example resource demonstrating the pattern",
        },
      ],
    };
  });

  server.setRequestHandler(ReadResourceRequestSchema, async (request) => {
    const uri = request.params.uri;

    try {
      switch (uri) {
        case "example://docs/readme": {
          return {
            contents: [
              {
                uri,
                mimeType: "text/plain",
                text: "# Example Resource\n\nThis is a sample resource content.",
              },
            ],
          };
        }

        default:
          throw new McpError(
            ErrorCode.InvalidRequest,
            `Unknown resource: ${uri}`
          );
      }
    } catch (error) {
      if (error instanceof McpError) {
        throw error;
      }
      throw new McpError(
        ErrorCode.InternalError,
        `Resource read failed: ${error}`
      );
    }
  });

  return server;
}

// === SSE ENDPOINTS ===

// SSE connection endpoint
app.get("/sse", async (req: Request, res: Response) => {
  const sessionId = req.query.sessionId as string || crypto.randomUUID();
  
  const transport = new SSEServerTransport("/message", res);
  transports.set(sessionId, transport);
  
  const server = createServer();
  
  // Clean up on disconnect
  transport.onclose = () => {
    transports.delete(sessionId);
    console.error(`Session ${sessionId} closed`);
  };
  
  await server.connect(transport);
  console.error(`Session ${sessionId} connected`);
});

// Message endpoint (POST from client)
app.post("/message", async (req: Request, res: Response) => {
  const sessionId = req.query.sessionId as string;
  
  if (!sessionId) {
    res.status(400).json({ error: "Missing sessionId" });
    return;
  }
  
  const transport = transports.get(sessionId);
  if (!transport) {
    res.status(404).json({ error: "Session not found" });
    return;
  }
  
  await transport.handlePostMessage(req, res);
});

// Health check endpoint
app.get("/health", (_req: Request, res: Response) => {
  res.json({ 
    status: "ok", 
    server: "{{SERVER_NAME}}",
    version: "{{VERSION}}",
    activeSessions: transports.size 
  });
});

// Start server
app.listen(PORT, () => {
  console.error(`{{SERVER_NAME}} MCP server running on http://localhost:${PORT}`);
  console.error(`SSE endpoint: http://localhost:${PORT}/sse`);
  console.error(`Health check: http://localhost:${PORT}/health`);
});
