/**
 * Health Check Endpoint
 *
 * Returns the health status of the application and its dependencies.
 */

import { NextResponse } from 'next/server';

export async function GET() {
  const health = {
    status: 'healthy',
    timestamp: new Date().toISOString(),
    services: {
      app: 'ok',
      mcp: 'unknown',
      ai: 'unknown',
    },
    environment: {
      node: process.version,
      platform: process.platform,
    },
  };

  // Check MCP server connection
  try {
    const mcpUrl = process.env.MCP_SERVER_URL;
    if (mcpUrl) {
      const response = await fetch(`${mcpUrl}/mcp`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        health.services.mcp = 'ok';
      } else {
        health.services.mcp = 'error';
        health.status = 'degraded';
      }
    } else {
      health.services.mcp = 'not_configured';
      health.status = 'degraded';
    }
  } catch (error) {
    health.services.mcp = 'error';
    health.status = 'degraded';
  }

  // Check AI API key
  if (process.env.KIMI_API_KEY) {
    health.services.ai = 'configured';
  } else {
    health.services.ai = 'not_configured';
    health.status = 'degraded';
  }

  const statusCode = health.status === 'healthy' ? 200 : 503;

  return NextResponse.json(health, { status: statusCode });
}
