/**
 * MCP Client for Meta Ads MCP Server
 *
 * Handles connection to the Meta Ads MCP server via HTTP transport
 * and provides tools for AI SDK integration.
 */

import { experimental_createMCPClient } from 'ai';

// Validate environment variables
const MCP_SERVER_URL = process.env.MCP_SERVER_URL;
const META_APP_ID = process.env.META_APP_ID;
const META_APP_SECRET = process.env.META_APP_SECRET;
const META_ACCESS_TOKEN = process.env.META_ACCESS_TOKEN;

if (!MCP_SERVER_URL) {
  throw new Error('MCP_SERVER_URL environment variable is required');
}

/**
 * Create and configure MCP client for Meta Ads server
 *
 * @returns Promise<MCPClient> - Configured MCP client instance
 */
export async function createMetaAdsMCPClient() {
  console.log('Creating Meta Ads MCP client...');
  console.log('MCP Server URL:', MCP_SERVER_URL);

  // Prepare authentication headers
  const headers: Record<string, string> = {};

  // Priority 1: Direct access token (for testing/simple setups)
  if (META_ACCESS_TOKEN) {
    headers['X-META-ACCESS-TOKEN'] = META_ACCESS_TOKEN;
    console.log('Using direct META_ACCESS_TOKEN for authentication');
  }
  // Priority 2: Meta App ID for OAuth flow
  else if (META_APP_ID) {
    headers['X-META-APP-ID'] = META_APP_ID;
    if (META_APP_SECRET) {
      headers['X-META-APP-SECRET'] = META_APP_SECRET;
    }
    console.log('Using META_APP_ID for OAuth authentication');
  } else {
    console.warn(
      'No authentication credentials found. Please set either META_ACCESS_TOKEN or META_APP_ID in environment variables.'
    );
  }

  try {
    // Create MCP client with HTTP transport
    const mcpClient = await experimental_createMCPClient({
      transport: {
        type: 'http',
        url: `${MCP_SERVER_URL}/mcp`,
        headers,
      },
    });

    console.log('MCP client created successfully');
    return mcpClient;
  } catch (error) {
    console.error('Failed to create MCP client:', error);
    throw new Error(`Failed to connect to Meta Ads MCP server: ${error}`);
  }
}

/**
 * Get tools from Meta Ads MCP server
 *
 * @param mcpClient - MCP client instance
 * @returns Promise<Tools> - Tools object for AI SDK
 */
export async function getMetaAdsTools(mcpClient: Awaited<ReturnType<typeof createMetaAdsMCPClient>>) {
  try {
    console.log('Fetching tools from MCP server...');
    const tools = await mcpClient.tools();
    console.log(`Retrieved ${Object.keys(tools).length} tools from MCP server`);

    // Log available tools for debugging
    const toolNames = Object.keys(tools);
    console.log('Available tools:', toolNames.join(', '));

    return tools;
  } catch (error) {
    console.error('Failed to fetch tools from MCP server:', error);
    throw new Error(`Failed to get tools from Meta Ads MCP server: ${error}`);
  }
}

/**
 * Get resources from Meta Ads MCP server
 *
 * @param mcpClient - MCP client instance
 * @returns Promise<Resources> - Available resources
 */
export async function getMetaAdsResources(mcpClient: Awaited<ReturnType<typeof createMetaAdsMCPClient>>) {
  try {
    console.log('Fetching resources from MCP server...');
    const resources = await mcpClient.listResources();
    console.log(`Retrieved ${resources.length} resources from MCP server`);

    return resources;
  } catch (error) {
    console.error('Failed to fetch resources from MCP server:', error);
    // Resources are optional, so we don't throw here
    return [];
  }
}

/**
 * Close MCP client connection
 *
 * @param mcpClient - MCP client instance
 */
export async function closeMCPClient(mcpClient: Awaited<ReturnType<typeof createMetaAdsMCPClient>>) {
  try {
    console.log('Closing MCP client connection...');
    await mcpClient.close();
    console.log('MCP client closed successfully');
  } catch (error) {
    console.error('Error closing MCP client:', error);
    // Don't throw, just log the error
  }
}

/**
 * MCP client wrapper with automatic lifecycle management
 */
export class MetaAdsMCPClient {
  private client: Awaited<ReturnType<typeof createMetaAdsMCPClient>> | null = null;
  private tools: any = null;

  async connect() {
    if (this.client) {
      console.log('MCP client already connected');
      return;
    }

    this.client = await createMetaAdsMCPClient();
    this.tools = await getMetaAdsTools(this.client);
  }

  getTools() {
    if (!this.tools) {
      throw new Error('MCP client not connected. Call connect() first.');
    }
    return this.tools;
  }

  getClient() {
    if (!this.client) {
      throw new Error('MCP client not connected. Call connect() first.');
    }
    return this.client;
  }

  async disconnect() {
    if (this.client) {
      await closeMCPClient(this.client);
      this.client = null;
      this.tools = null;
    }
  }

  async listResources() {
    if (!this.client) {
      throw new Error('MCP client not connected. Call connect() first.');
    }
    return await getMetaAdsResources(this.client);
  }
}
