import { z } from "zod";
import { McpError, ErrorCode } from "@modelcontextprotocol/sdk/types.js";

/**
 * {{RESOURCE_NAME}} Resource Provider
 * 
 * {{DESCRIPTION}}
 * 
 * URI Template: {{URI_TEMPLATE}}
 * Example: {{URI_EXAMPLE}}
 */

// === URI TEMPLATE ===

export const {{RESOURCE_NAME_CAMEL}}UriTemplate = "{{URI_TEMPLATE}}";

// === URI PARAMETERS ===

export const {{RESOURCE_NAME_CAMEL}}ParamsSchema = z.object({
  // Define URI template parameters here
  // Example for template "weather://{location}/{date}":
  // location: z.string().describe("City name or coordinates"),
  // date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/).describe("Date in YYYY-MM-DD format"),
  
  {{PARAMS}}
});

export type {{RESOURCE_NAME_PASCAL}}Params = z.infer<typeof {{RESOURCE_NAME_CAMEL}}ParamsSchema>;

// === RESOURCE DEFINITION ===

export const {{RESOURCE_NAME}}Definition = {
  uri: {{RESOURCE_NAME_CAMEL}}UriTemplate,
  name: "{{RESOURCE_NAME}}",
  description: "{{DESCRIPTION}}",
  mimeType: "{{MIME_TYPE}}", // e.g., "application/json", "text/plain", "text/markdown"
};

// === HANDLER ===

export async function handle{{RESOURCE_NAME_PASCAL}}(
  uri: string
): Promise<{ contents: Array<{ uri: string; mimeType: string; text: string }> }> {
  // Parse URI parameters
  const params = parse{{RESOURCE_NAME_PASCAL}}Uri(uri);
  if (!params) {
    throw new McpError(
      ErrorCode.InvalidRequest,
      `Invalid URI format: ${uri}`
    );
  }

  try {
    // === IMPLEMENT YOUR RESOURCE LOGIC HERE ===
    
    // Example:
    // const data = await fetchData(params);
    
    const data = await fetch{{RESOURCE_NAME_PASCAL}}(params);
    
    return {
      contents: [
        {
          uri,
          mimeType: {{RESOURCE_NAME}}Definition.mimeType,
          text: formatResource(data),
        },
      ],
    };
  } catch (error) {
    console.error(`{{RESOURCE_NAME}} resource error:`, error);
    
    throw new McpError(
      ErrorCode.InternalError,
      `Failed to read resource: ${error}`
    );
  }
}

// === URI PARSING ===

function parse{{RESOURCE_NAME_PASCAL}}Uri(uri: string): {{RESOURCE_NAME_PASCAL}}Params | null {
  // Parse the URI against the template
  // Example for template "weather://{location}/{date}":
  //
  // const pattern = /^weather:\/\/([^/]+)\/([^/]+)$/;
  // const match = uri.match(pattern);
  //
  // if (!match) return null;
  //
  // const parseResult = {{RESOURCE_NAME_CAMEL}}ParamsSchema.safeParse({
  //   location: decodeURIComponent(match[1]),
  //   date: decodeURIComponent(match[2]),
  // });
  //
  // return parseResult.success ? parseResult.data : null;
  
  // TODO: Implement URI parsing for {{URI_TEMPLATE}}
  
  throw new Error("Not implemented: parse{{RESOURCE_NAME_PASCAL}}Uri");
}

// === IMPLEMENTATION ===

async function fetch{{RESOURCE_NAME_PASCAL}}(
  params: {{RESOURCE_NAME_PASCAL}}Params
): Promise<unknown> {
  // TODO: Implement the actual resource fetch logic
  
  throw new Error("Not implemented: fetch{{RESOURCE_NAME_PASCAL}}");
}

function formatResource(data: unknown): string {
  // TODO: Format the resource data based on mime type
  
  return JSON.stringify(data, null, 2);
}
