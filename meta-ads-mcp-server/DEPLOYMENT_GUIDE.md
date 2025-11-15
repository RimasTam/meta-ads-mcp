# Complete Deployment Guide: Meta Ads MCP + LibreChat + Kimi K2 on Railway

This guide walks you through deploying a complete AI-powered Meta Ads management system with:
- **Meta Ads MCP Server**: Self-hosted on Railway for Meta advertising API access
- **LibreChat**: AI chat interface with MCP integration
- **Kimi K2 Model**: Advanced reasoning AI model from Moonshot AI

---

## Prerequisites

Before starting, ensure you have:

1. ✅ **Railway Account**: Sign up at https://railway.app (supports GitHub login)
2. ✅ **GitHub Account**: For hosting configuration files and repositories
3. ✅ **Meta Developer Account**: Create at https://developers.facebook.com
4. ✅ **Kimi API Key**: Your Moonshot AI API key from https://platform.moonshot.ai
5. ✅ **Meta App Credentials**: App ID and App Secret (we'll get these below)

---

## Part 1: Setup Meta Developer App

### Step 1.1: Create Meta Developer App

1. Go to https://developers.facebook.com/
2. Click **"My Apps"** → **"Create App"**
3. Choose app type: **"Business"** (or "Other" if Business not available)
4. Fill in details:
   - **App Name**: e.g., "My Meta Ads MCP Server"
   - **Contact Email**: Your email
   - **Business Account**: Select or create one
5. Click **"Create App"**

### Step 1.2: Add Marketing API Product

1. In your app dashboard, click **"Add Product"**
2. Find **"Marketing API"** and click **"Set Up"**
3. Complete any required setup steps

### Step 1.3: Get App Credentials

1. Go to **App Settings** → **Basic** (left sidebar)
2. Copy **App ID** (you'll need this)
3. Click **"Show"** next to **App Secret** and copy it (you'll need this)
4. **Important**: Keep these credentials secure and never commit them to public repositories

### Step 1.4: Configure OAuth Settings (Optional but Recommended)

1. In App Settings → Basic, scroll to **"App Domains"**
2. Add your Railway domain (you'll get this after deployment): `your-app.railway.app`
3. Scroll to **"Add Platform"** → **"Website"**
4. Add Site URL: `https://your-meta-ads-mcp-server.railway.app`

---

## Part 2: Deploy Meta Ads MCP Server to Railway

### Step 2.1: Prepare GitHub Repository

1. **Create a new GitHub repository** (or use existing):
   ```bash
   # Navigate to your meta-ads-mcp-server directory
   cd C:\Users\Rimas\Desktop\Projects\meta-ads-mcp\meta-ads-mcp-server

   # Initialize git if not already done
   git init
   git add .
   git commit -m "Initial commit: Meta Ads MCP Server"

   # Create repository on GitHub and push
   git remote add origin https://github.com/YOUR_USERNAME/meta-ads-mcp-server.git
   git branch -M main
   git push -u origin main
   ```

### Step 2.2: Deploy to Railway

1. **Login to Railway**: https://railway.app
2. Click **"New Project"** → **"Deploy from GitHub repo"**
3. **Connect GitHub** (if not already connected)
4. **Select your repository**: `meta-ads-mcp-server`
5. Railway will automatically detect the configuration from `railway.toml`

### Step 2.3: Configure Environment Variables

1. In Railway dashboard, click on your **deployed service**
2. Go to **"Variables"** tab
3. Click **"+ New Variable"** and add:

   ```
   META_APP_ID=your_meta_app_id_from_step_1_3
   META_APP_SECRET=your_meta_app_secret_from_step_1_3
   ```

4. **Note**: `PORT` is automatically provided by Railway (no need to add)

### Step 2.4: Get Your Railway Deployment URL

1. Go to **"Settings"** tab in Railway
2. Under **"Domains"**, click **"Generate Domain"**
3. Railway will provide a URL like: `https://meta-ads-mcp-production.up.railway.app`
4. **Copy this URL** - you'll need it for LibreChat configuration

### Step 2.5: Verify Deployment

1. Wait for deployment to complete (check **"Deployments"** tab)
2. Once deployed, test the endpoint:
   ```bash
   curl https://your-railway-url.railway.app/mcp \
     -H "Content-Type: application/json" \
     -H "X-META-ACCESS-TOKEN: temp" \
     -d '{"jsonrpc":"2.0","method":"tools/list","id":1}'
   ```
3. You should get a JSON response listing available MCP tools

---

## Part 3: Prepare LibreChat Configuration

### Step 3.1: Host librechat.yaml on GitHub

1. **Create a new GitHub repository** for config files (or use existing):
   ```bash
   # Create a new directory for configs
   mkdir librechat-config
   cd librechat-config

   # Copy the librechat.yaml file
   cp C:\Users\Rimas\Desktop\Projects\meta-ads-mcp\meta-ads-mcp-server\librechat.yaml .

   # Initialize git
   git init
   git add librechat.yaml
   git commit -m "Add LibreChat configuration"

   # Create repo on GitHub and push
   git remote add origin https://github.com/YOUR_USERNAME/librechat-config.git
   git branch -M main
   git push -u origin main
   ```

2. **Important**: Make sure this repository is **public** (or use a private raw URL token)

### Step 3.2: Update librechat.yaml with Your URLs

Before pushing to GitHub, update the placeholders in `librechat.yaml`:

1. Open `librechat.yaml`
2. Find the `mcpServers` section
3. Update the `url` field:
   ```yaml
   mcpServers:
     meta-ads:
       type: streamable-http
       url: "https://your-meta-ads-mcp-production.railway.app/mcp"  # Your Railway URL from Step 2.4
   ```
4. Commit and push changes:
   ```bash
   git add librechat.yaml
   git commit -m "Update Meta Ads MCP URL"
   git push
   ```

### Step 3.3: Get Raw GitHub URL

1. Go to your GitHub repository: `https://github.com/YOUR_USERNAME/librechat-config`
2. Click on `librechat.yaml`
3. Click **"Raw"** button
4. Copy the URL (should look like):
   ```
   https://raw.githubusercontent.com/YOUR_USERNAME/librechat-config/main/librechat.yaml
   ```
5. **Save this URL** - you'll need it for Railway environment variables

### Step 3.4: Generate Security Credentials

LibreChat requires encrypted credentials. Generate them here:

1. Go to: https://www.librechat.ai/toolkit/creds_generator
2. Click **"Generate"**
3. Copy both values:
   - `CREDS_KEY=...`
   - `CREDS_IV=...`
4. **Save these** - you'll need them in the next part

---

## Part 4: Deploy LibreChat to Railway

### Step 4.1: Use Railway Template

1. **Option A**: Go to https://railway.app/template/b5k2mn and click **"Deploy Now"**
2. **Option B**: Go to LibreChat GitHub (https://github.com/danny-avila/LibreChat) and click **"Deploy on Railway"** button

### Step 4.2: Configure Railway Deployment

1. Railway will create **3 services**:
   - LibreChat (main app)
   - MongoDB (database)
   - Meilisearch (optional search)
2. Click **"Deploy"** to start with defaults

### Step 4.3: Set Environment Variables

1. In Railway, click on the **LibreChat service** (not MongoDB)
2. Go to **"Variables"** tab
3. Click **"+ New Variable"** and add each of these:

   ```env
   # LibreChat Configuration
   CONFIG_PATH=https://raw.githubusercontent.com/YOUR_USERNAME/librechat-config/main/librechat.yaml

   # Kimi K2 API Key
   KIMI_API_KEY=your_kimi_api_key_from_moonshot_ai

   # Meta Ads MCP Authentication
   # This will be used by users - they get this from Meta OAuth or use "get_login_link" tool
   META_ACCESS_TOKEN=placeholder_users_will_authenticate
   META_ADS_MCP_URL=https://your-meta-ads-mcp-production.railway.app

   # Enable custom endpoints
   ENDPOINTS=openAI,anthropic,google,custom

   # Security credentials (from Step 3.4)
   CREDS_KEY=your_generated_creds_key
   CREDS_IV=your_generated_creds_iv

   # Optional: Other AI providers (if you want them)
   # OPENAI_API_KEY=sk-...
   # ANTHROPIC_API_KEY=sk-ant-...
   ```

4. Click **"Add"** after entering each variable

### Step 4.4: Redeploy LibreChat

1. Go to **"Deployments"** tab
2. Railway should automatically redeploy with new environment variables
3. If not, click **"Deploy"** → **"Redeploy"**

### Step 4.5: Get LibreChat URL

1. Go to **"Settings"** tab of LibreChat service
2. Under **"Domains"**, click **"Generate Domain"**
3. Railway provides a URL like: `https://librechat-production.railway.app`
4. **Save this URL** - this is your chat interface!

---

## Part 5: First-Time Setup & Testing

### Step 5.1: Access LibreChat

1. Open your LibreChat URL: `https://your-librechat.railway.app`
2. **Create an account**:
   - Click **"Sign Up"**
   - Enter email and password
   - Confirm registration

### Step 5.2: Test Kimi K2 Model

1. In LibreChat, click the **model selector** dropdown (top of chat)
2. You should see **"Kimi K2"** in the list
3. Select **"Kimi K2"** → **"kimi-k2-0711"** or **"kimi-k2-thinking"**
4. Send a test message: "Hello, please introduce yourself"
5. Kimi K2 should respond

### Step 5.3: Authenticate with Meta Ads

Before using Meta Ads tools, you need to authenticate:

**Method 1: Use get_login_link Tool (Recommended)**

1. In LibreChat, enable **MCP tools** (if not already visible)
2. Look for **"meta-ads"** in the tools panel
3. Use the `get_login_link` tool to generate OAuth URL
4. Follow the link to grant Meta permissions
5. The access token will be stored

**Method 2: Manual Token (Advanced)**

1. Obtain a Meta access token manually from Meta Graph API Explorer
2. Update the `META_ACCESS_TOKEN` environment variable in Railway
3. Redeploy LibreChat

### Step 5.4: Test Meta Ads MCP Tools

1. In LibreChat, start a new conversation with **Kimi K2** model
2. Enable **"meta-ads"** MCP server from the tools dropdown (below chat input)
3. Send a test message:
   ```
   Please list my Meta ad accounts using the available tools.
   ```
4. Kimi K2 should:
   - Call the `get_ad_accounts` MCP tool
   - Return your Meta advertising accounts

### Step 5.5: Verify Full Integration

Test a complete workflow:

```
Please analyze the performance of my active campaigns and suggest optimizations.
```

Kimi K2 should:
1. Use `get_ad_accounts` to find your accounts
2. Use `get_campaigns` to list campaigns
3. Use `get_insights` to fetch performance data
4. Provide AI-powered recommendations

---

## Part 6: Advanced Configuration

### Option 1: Custom Domain (Railway Pro)

1. In Railway, go to your service → **Settings** → **Domains**
2. Click **"Custom Domain"**
3. Enter your domain (e.g., `chat.yourdomain.com`)
4. Update DNS records as instructed by Railway

### Option 2: Environment-Specific Configs

Create multiple `librechat.yaml` files for different environments:

```
librechat-config/
├── librechat.yaml              # Production
├── librechat-dev.yaml          # Development
└── librechat-staging.yaml      # Staging
```

Switch by updating `CONFIG_PATH` environment variable.

### Option 3: Add More AI Models

Edit `librechat.yaml` to add more custom endpoints:

```yaml
endpoints:
  custom:
    - name: "Kimi K2"
      # ... existing config

    - name: "Claude via OpenRouter"
      apiKey: "${OPENROUTER_KEY}"
      baseURL: "https://openrouter.ai/api/v1"
      models:
        default:
          - "anthropic/claude-3.5-sonnet"
```

### Option 4: Add More MCP Servers

Add additional MCP servers to `librechat.yaml`:

```yaml
mcpServers:
  meta-ads:
    # ... existing config

  filesystem:
    type: stdio
    command: npx
    args:
      - "-y"
      - "@modelcontextprotocol/server-filesystem"
      - "/allowed/path"
```

---

## Troubleshooting

### Issue 1: Kimi K2 Not Appearing

**Solution:**
1. Check `CONFIG_PATH` points to correct GitHub raw URL
2. Verify `KIMI_API_KEY` is set in Railway
3. Ensure `ENDPOINTS` includes "custom"
4. Check Railway logs: `railway logs` or view in dashboard
5. Verify `librechat.yaml` syntax is correct (use YAML validator)

### Issue 2: MCP Server Not Connecting

**Solution:**
1. Verify Meta Ads MCP server is deployed and running
2. Check the URL in `librechat.yaml` matches Railway deployment URL
3. Test MCP endpoint directly with curl (see Step 2.5)
4. Check Railway logs for meta-ads-mcp-server
5. Verify `META_APP_ID` and `META_APP_SECRET` are set

### Issue 3: Authentication Errors

**Solution:**
1. Ensure Meta App ID and Secret are correct
2. Check App Domains in Meta Developer settings
3. Use `get_login_link` tool to generate fresh OAuth URL
4. Verify app has Marketing API permissions
5. Check if app is in Development mode (needs to be live for production)

### Issue 4: Railway Build Failures

**Solution:**
1. Check build logs in Railway dashboard
2. Verify `railway.toml` is present in repository
3. Ensure `requirements.txt` includes all dependencies
4. Check Python version compatibility (3.10+)
5. Try manual rebuild: click "Deploy" → "Redeploy"

### Issue 5: LibreChat Can't Load Config

**Solution:**
1. Verify GitHub repository is public
2. Test raw URL in browser - should show YAML content
3. Check for syntax errors in `librechat.yaml`
4. Ensure `CONFIG_PATH` environment variable is set correctly
5. Wait a few minutes for Railway to refresh config

### Issue 6: Tools Not Available in Chat

**Solution:**
1. Verify MCP server is enabled in chat dropdown (below input)
2. Check that you're using a tool-compatible model (Kimi K2 supports tools)
3. Ensure `chatMenu: true` in `librechat.yaml` for the MCP server
4. Try refreshing LibreChat page
5. Check browser console for errors (F12)

---

## Monitoring & Maintenance

### Check Railway Logs

```bash
# Install Railway CLI
npm install -g @railway/cli

# Login
railway login

# Link to project
railway link

# View logs
railway logs
```

Or view in Railway dashboard → Deployments → Click deployment → Logs

### Monitor Costs

1. Go to Railway dashboard → **Usage**
2. Monitor:
   - Compute time
   - Network bandwidth
   - Memory usage
3. Set up budget alerts in account settings

### Update Dependencies

For meta-ads-mcp-server:

```bash
# Update requirements.txt
pip install --upgrade -r requirements.txt
pip freeze > requirements.txt

# Commit and push
git add requirements.txt
git commit -m "Update dependencies"
git push

# Railway will auto-deploy
```

### Backup Data

Railway doesn't automatically backup data:

1. **MongoDB backups**: Set up automated backups via Railway plugin or mongodump
2. **LibreChat conversations**: Stored in MongoDB, backup database regularly
3. **Configuration**: Keep `librechat.yaml` in version control (GitHub)

---

## Security Best Practices

1. ✅ **Never commit API keys** to repositories
2. ✅ **Use environment variables** for all secrets
3. ✅ **Keep Meta App Secret secure** - never expose client-side
4. ✅ **Enable 2FA** on Railway, GitHub, Meta Developer accounts
5. ✅ **Regularly rotate API keys** (Kimi, Meta)
6. ✅ **Monitor Railway access logs** for unusual activity
7. ✅ **Use HTTPS only** (Railway provides this by default)
8. ✅ **Set up rate limiting** in `librechat.yaml` (already configured)
9. ✅ **Review Meta App permissions** regularly
10. ✅ **Keep dependencies updated** to patch security vulnerabilities

---

## Cost Estimates

### Railway (Pay-as-you-go)

- **Starter Plan**: $5/month + usage
- **Pro Plan**: $20/month + usage
- **Estimate for this setup**:
  - 2 services (LibreChat + Meta Ads MCP): ~$10-20/month
  - MongoDB: ~$5-10/month
  - Total: ~$15-30/month depending on usage

### Kimi API (Moonshot AI)

- **Pricing varies by model and usage**
- Check: https://platform.moonshot.ai/pricing
- Estimate: ~$0.001-0.01 per 1K tokens (varies by model)

### Meta Marketing API

- **Free tier**: Available for development
- **Production**: May require business verification
- No direct API costs, but ad spend applies

---

## What You've Built

Congratulations! You now have:

✅ **Self-hosted Meta Ads MCP Server** on Railway with direct Meta API access
✅ **LibreChat** as your AI chat interface with advanced features
✅ **Kimi K2 Integration** for powerful AI reasoning capabilities
✅ **MCP Tools** for managing Meta advertising campaigns through natural language
✅ **Secure deployment** with environment-based configuration
✅ **Scalable infrastructure** ready for production use

### Example Use Cases

1. **Campaign Analysis**: "Analyze my top 5 campaigns and suggest budget reallocation"
2. **Ad Creation**: "Create a new ad set targeting tech enthusiasts in California"
3. **Performance Insights**: "Show me which ad creatives have the best CTR this month"
4. **Audience Research**: "Find interests related to sustainable fashion"
5. **Budget Optimization**: "Recommend budget changes to improve ROAS"

---

## Next Steps

1. **Explore MCP Tools**: Try all 29 available Meta Ads tools
2. **Create Agents**: Build specialized agents in LibreChat for specific tasks
3. **Add More Models**: Integrate Claude, GPT-4, or other models
4. **Custom Workflows**: Design automated campaign management workflows
5. **Team Access**: Invite team members to LibreChat
6. **Monitoring**: Set up alerts for campaign performance
7. **Scale**: Upgrade Railway plan as usage grows

---

## Support & Resources

- **LibreChat Docs**: https://www.librechat.ai/docs
- **Railway Docs**: https://docs.railway.app
- **Meta Marketing API**: https://developers.facebook.com/docs/marketing-apis
- **Kimi API Docs**: https://platform.moonshot.ai/docs
- **MCP Protocol**: https://modelcontextprotocol.io

---

## Questions?

If you encounter issues not covered in this guide:

1. Check Railway logs for both services
2. Review LibreChat GitHub issues
3. Test MCP server endpoints directly with curl
4. Verify all environment variables are set correctly
5. Ensure Meta Developer app is properly configured

Happy deploying! 🚀
