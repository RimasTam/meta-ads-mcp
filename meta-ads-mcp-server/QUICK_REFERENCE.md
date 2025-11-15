# Quick Reference Guide

## 📋 Deployment Checklist

### Phase 1: Meta Developer Setup
- [ ] Create Meta Developer app at https://developers.facebook.com
- [ ] Add Marketing API product
- [ ] Copy App ID and App Secret
- [ ] Configure OAuth redirect URIs

### Phase 2: Deploy Meta Ads MCP Server
- [ ] Push code to GitHub
- [ ] Create Railway project from GitHub repo
- [ ] Set environment variables:
  - `META_APP_ID`
  - `META_APP_SECRET`
- [ ] Generate Railway domain
- [ ] Copy Railway URL: `https://______.railway.app`
- [ ] Test endpoint: `curl https://YOUR-URL.railway.app/mcp -H "Content-Type: application/json" -d '{"jsonrpc":"2.0","method":"tools/list","id":1}'`

### Phase 3: Configure LibreChat
- [ ] Update `librechat.yaml` with your MCP server URL
- [ ] Push `librechat.yaml` to public GitHub repo
- [ ] Copy raw GitHub URL
- [ ] Generate CREDS_KEY and CREDS_IV at https://www.librechat.ai/toolkit/creds_generator

### Phase 4: Deploy LibreChat
- [ ] Use Railway template: https://railway.app/template/b5k2mn
- [ ] Set environment variables:
  - `CONFIG_PATH` → GitHub raw URL
  - `KIMI_API_KEY` → Your Kimi API key
  - `META_ADS_MCP_URL` → Your MCP Railway URL
  - `CREDS_KEY` → Generated key
  - `CREDS_IV` → Generated IV
  - `ENDPOINTS=openAI,anthropic,google,custom`
- [ ] Generate Railway domain
- [ ] Access LibreChat and create account

### Phase 5: Testing
- [ ] Select Kimi K2 model
- [ ] Test conversation
- [ ] Enable meta-ads MCP server
- [ ] Authenticate with Meta
- [ ] Test Meta Ads tools

---

## 🔑 Key URLs

| Service | URL | Purpose |
|---------|-----|---------|
| **Meta Developer Console** | https://developers.facebook.com | Get App ID & Secret |
| **Kimi API Platform** | https://platform.moonshot.ai | Get Kimi API key |
| **Railway Dashboard** | https://railway.app | Manage deployments |
| **LibreChat Creds Generator** | https://www.librechat.ai/toolkit/creds_generator | Generate CREDS_KEY/IV |
| **Meta Graph API Explorer** | https://developers.facebook.com/tools/explorer | Test Meta tokens |

---

## 🔧 Environment Variables

### Meta Ads MCP Server (Railway)
```env
META_APP_ID=your_app_id
META_APP_SECRET=your_app_secret
# PORT is auto-set by Railway
```

### LibreChat (Railway)
```env
CONFIG_PATH=https://raw.githubusercontent.com/USERNAME/REPO/main/librechat.yaml
KIMI_API_KEY=sk-...
META_ADS_MCP_URL=https://your-mcp-server.railway.app
META_ACCESS_TOKEN=placeholder
ENDPOINTS=openAI,anthropic,google,custom
CREDS_KEY=<generated>
CREDS_IV=<generated>
```

---

## 📝 librechat.yaml Template

```yaml
version: 1.1.8

endpoints:
  custom:
    - name: "Kimi K2"
      apiKey: "${KIMI_API_KEY}"
      baseURL: "https://api.moonshot.ai/v1"
      models:
        default:
          - "kimi-k2-0711"
          - "kimi-k2-thinking"
          - "kimi-k2-thinking-turbo"
        fetch: true
      titleConvo: true
      titleModel: "kimi-k2-0711"
      modelDisplayLabel: "Kimi K2"

mcpServers:
  meta-ads:
    type: streamable-http
    url: "${META_ADS_MCP_URL}/mcp"
    headers:
      X-META-ACCESS-TOKEN: "${META_ACCESS_TOKEN}"
    timeout: 30000
    serverInstructions: true
    chatMenu: true
```

---

## 🧪 Quick Test Commands

### Test MCP Server
```bash
curl https://YOUR-MCP-URL.railway.app/mcp \
  -H "Content-Type: application/json" \
  -H "X-META-ACCESS-TOKEN: test" \
  -d '{"jsonrpc":"2.0","method":"tools/list","id":1}'
```

### Test in LibreChat
1. Select **Kimi K2** model
2. Send: "Hello, respond with OK"
3. Enable **meta-ads** in tools dropdown
4. Send: "List my Meta ad accounts"

---

## 🚨 Common Issues

| Problem | Solution |
|---------|----------|
| **Kimi K2 not appearing** | Check `CONFIG_PATH` and `KIMI_API_KEY` in Railway |
| **MCP server not connecting** | Verify URL in `librechat.yaml` matches Railway deployment |
| **Authentication errors** | Run `get_login_link` tool or set `META_ACCESS_TOKEN` |
| **Tools not showing** | Ensure `chatMenu: true` in `librechat.yaml` |
| **Config not loading** | Verify GitHub repo is public and raw URL is correct |

---

## 📊 Available Tools (29 Total)

### Account Management
- `get_ad_accounts` - List all ad accounts
- `get_account_info` - Get account details
- `get_account_pages` - List Facebook pages

### Campaigns
- `get_campaigns` - List campaigns
- `create_campaign` - Create new campaign
- `update_campaign` - Update campaign
- `get_campaign_details` - Get campaign info

### Ad Sets
- `get_adsets` - List ad sets
- `create_adset` - Create new ad set
- `update_adset` - Update ad set
- `get_adset_details` - Get ad set info

### Ads
- `get_ads` - List ads
- `create_ad` - Create new ad
- `update_ad` - Update ad
- `get_ad_details` - Get ad info

### Creatives
- `create_ad_creative` - Create ad creative
- `update_ad_creative` - Update creative
- `upload_ad_image` - Upload image
- `get_ad_image` - Get image details

### Insights
- `get_insights` - Get performance data

### Targeting
- `search_interests` - Find targeting interests
- `search_behaviors` - Find behaviors
- `search_demographics` - Find demographics
- `search_geo_locations` - Find locations
- `validate_targeting` - Validate targeting spec
- `get_targeting_suggestions` - Get suggestions

### Budgets
- `create_budget_schedule` - Create budget schedule

### Authentication
- `get_login_link` - Generate OAuth URL

### Utility
- `search_generic` - Generic search

---

## 💡 Example Prompts

### Simple Queries
```
"List all my Meta ad accounts"
"Show me active campaigns"
"Get insights for campaign 123456789"
```

### Complex Workflows
```
"Analyze the performance of all my campaigns from the last 30 days and recommend budget adjustments"

"Create a campaign strategy for a fitness product targeting women aged 25-40 interested in yoga"

"Find my top 5 best performing ads by CTR and explain why they're successful"
```

### Research & Planning
```
"Search for targeting interests related to sustainable fashion and show me audience sizes"

"What are the current trends in my ad account's performance over the last quarter?"
```

---

## 📚 Documentation Files

| File | Purpose |
|------|---------|
| **DEPLOYMENT_GUIDE.md** | Complete step-by-step deployment instructions |
| **TESTING_GUIDE.md** | Comprehensive testing procedures |
| **QUICK_REFERENCE.md** | This file - quick access to key info |
| **.env.example** | Environment variable template |
| **librechat.yaml** | LibreChat configuration file |

---

## 🎯 Success Criteria

Your deployment is successful when:

✅ LibreChat loads at your Railway URL
✅ Kimi K2 appears in model selector
✅ Kimi responds to messages
✅ meta-ads MCP server appears in tools
✅ Can authenticate with Meta
✅ Can retrieve ad accounts via tools
✅ Complex workflows execute correctly

---

## 🔄 Update Workflow

### To Update MCP Server
1. Make code changes
2. Commit and push to GitHub
3. Railway auto-deploys
4. Verify with test command

### To Update LibreChat Config
1. Edit `librechat.yaml` in GitHub
2. Commit changes
3. Restart LibreChat in Railway (or wait for auto-refresh)

### To Rotate API Keys
1. Generate new keys
2. Update Railway environment variables
3. Redeploy affected service

---

## 📞 Support Resources

- **LibreChat**: https://www.librechat.ai/docs
- **Railway**: https://docs.railway.app
- **Meta Marketing API**: https://developers.facebook.com/docs/marketing-apis
- **Kimi API**: https://platform.moonshot.ai/docs
- **MCP Protocol**: https://modelcontextprotocol.io

---

## ⚡ Pro Tips

1. **Use `kimi-k2-thinking` for complex analysis** - Better reasoning capabilities
2. **Enable multiple tools at once** - MCP supports concurrent tool usage
3. **Save common prompts as templates** - For frequently used workflows
4. **Monitor Railway costs** - Set up billing alerts
5. **Backup MongoDB regularly** - Use Railway's backup features
6. **Keep API keys secure** - Never commit to public repos
7. **Test in dev first** - Use separate Meta app for testing
8. **Use rate limits wisely** - Configured in `librechat.yaml`

---

**Last Updated**: 2025-11-15
**Version**: 1.0

For detailed instructions, see **DEPLOYMENT_GUIDE.md** and **TESTING_GUIDE.md**.
