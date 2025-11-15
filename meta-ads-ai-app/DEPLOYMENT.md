# Railway Deployment Guide

This guide explains how to deploy the Meta Ads AI Assistant to Railway.

## Overview

The application consists of two services:
1. **Meta Ads MCP Server** - Backend service providing Meta Ads tools
2. **Next.js App** - Frontend chat interface

## Prerequisites

1. Railway account (https://railway.app)
2. Meta App credentials (App ID and App Secret)
3. Kimi K2 API key (from https://platform.moonshot.ai/)

## Deployment Steps

### Service 1: Meta Ads MCP Server

1. **Create New Project** in Railway
   - Click "New Project"
   - Select "Deploy from GitHub repo"
   - Select the `meta-ads-mcp` repository

2. **Configure Environment Variables**
   ```
   META_APP_ID=your_meta_app_id
   META_APP_SECRET=your_meta_app_secret
   PORT=8080
   ```

3. **Configure Build & Deploy**
   - Railway will automatically detect the `railway.toml` file
   - The start command is: `python -m meta_ads_mcp --transport streamable-http --host 0.0.0.0 --port $PORT`

4. **Note the Service URL**
   - After deployment, Railway will provide an internal service URL
   - Copy this URL (e.g., `https://meta-ads-mcp.railway.internal`)

### Service 2: Next.js App

1. **Create New Service** in the same project
   - Click "New" → "Empty Service"
   - Connect to the same GitHub repository
   - Set the root directory to `meta-ads-ai-app`

2. **Configure Environment Variables**
   ```
   KIMI_API_KEY=sk-xxx
   KIMI_API_BASE_URL=https://api.moonshot.ai/v1/
   MCP_SERVER_URL=https://meta-ads-mcp.railway.internal:8080
   META_APP_ID=your_meta_app_id
   META_APP_SECRET=your_meta_app_secret
   ```

   **Important:** Use the internal Railway URL for `MCP_SERVER_URL`

3. **Configure Build & Deploy**
   - Railway will automatically detect `railway.json`
   - Build command: `npm install && npm run build`
   - Start command: `npm start`

4. **Enable Public URL**
   - Go to Settings → Networking
   - Click "Generate Domain"
   - Your app will be accessible at the generated URL

## Private Networking

Railway provides private networking between services in the same project:
- Services can communicate using `.railway.internal` domains
- No public internet traffic between services
- Better security and lower latency

## Environment Variables Reference

### MCP Server
| Variable | Required | Description |
|----------|----------|-------------|
| `META_APP_ID` | Yes | Your Meta App ID |
| `META_APP_SECRET` | Yes | Your Meta App Secret |
| `PORT` | Auto | Automatically set by Railway |

### Next.js App
| Variable | Required | Description |
|----------|----------|-------------|
| `KIMI_API_KEY` | Yes | Kimi K2 API key |
| `KIMI_API_BASE_URL` | No | Defaults to Moonshot AI |
| `MCP_SERVER_URL` | Yes | URL of MCP server (use Railway internal URL) |
| `META_APP_ID` | Yes | Your Meta App ID |
| `META_APP_SECRET` | Yes | Your Meta App Secret |

## Testing Deployment

1. **Check MCP Server Health**
   - Visit `https://your-mcp-server.railway.app/mcp`
   - Should return MCP server metadata

2. **Test Chat Interface**
   - Visit your Next.js app URL
   - Try sending a message
   - Verify tool calls work correctly

## Troubleshooting

### MCP Server Connection Failed
- Verify `MCP_SERVER_URL` uses the Railway internal URL
- Check that both services are in the same Railway project
- Review MCP server logs for errors

### OAuth Flow Issues
- Ensure `META_APP_ID` and `META_APP_SECRET` are correctly set
- Check Meta App settings allow the Railway domain
- Review OAuth redirect URIs in Meta App settings

### Kimi K2 API Errors
- Verify `KIMI_API_KEY` is valid
- Check API quota and credits
- Review API endpoint URL

## Monitoring

- View logs: Railway Dashboard → Service → Logs
- Check metrics: Railway Dashboard → Service → Metrics
- Set up alerts: Railway Dashboard → Service → Settings → Alerts

## Scaling

- **MCP Server**: Can handle multiple concurrent connections
- **Next.js App**: Automatically scales with Railway
- Consider upgrading Railway plan for higher traffic

## Cost Estimates

- **Railway**: ~$5-20/month (Hobby plan)
- **Kimi K2 API**: Pay-per-use (~$0.15 input + $2.50 output per 1M tokens)
- **Meta API**: Free (no usage fees)

## Support

For issues:
1. Check Railway logs
2. Review application logs
3. Open GitHub issue in repository
