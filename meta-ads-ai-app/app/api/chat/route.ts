/**
 * Chat API Route
 *
 * Handles streaming chat completions with Kimi K2 model and Meta Ads MCP tools.
 * Supports:
 * - Streaming text responses
 * - Multi-step tool execution
 * - Automatic MCP client lifecycle management
 */

import { streamText } from 'ai';
import { defaultModel, systemPrompt } from '@/lib/ai-config';
import { MetaAdsMCPClient } from '@/lib/mcp-client';

// Allow streaming responses up to 30 seconds
export const maxDuration = 30;

export async function POST(req: Request) {
  try {
    const { messages } = await req.json();

    console.log('Chat API: Received request with', messages.length, 'messages');

    // Create and connect MCP client
    const mcpClient = new MetaAdsMCPClient();

    try {
      console.log('Chat API: Connecting to MCP server...');
      await mcpClient.connect();

      // Get tools from MCP server
      const tools = mcpClient.getTools();
      console.log('Chat API: Got tools from MCP server');

      // Stream text with Kimi K2 model
      console.log('Chat API: Starting text stream with Kimi K2...');
      const result = streamText({
        model: defaultModel,
        system: systemPrompt,
        messages,
        tools,
        maxSteps: 5, // Allow multi-step tool execution
        onFinish: async () => {
          // Clean up MCP client when done
          console.log('Chat API: Stream finished, closing MCP client');
          await mcpClient.disconnect();
        },
      });

      console.log('Chat API: Returning stream response');
      return result.toDataStreamResponse();
    } catch (error) {
      // Ensure MCP client is closed on error
      console.error('Chat API: Error during streaming:', error);
      await mcpClient.disconnect();
      throw error;
    }
  } catch (error: any) {
    console.error('Chat API: Fatal error:', error);

    return new Response(
      JSON.stringify({
        error: 'Failed to process chat request',
        message: error?.message || 'Unknown error',
      }),
      {
        status: 500,
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );
  }
}
