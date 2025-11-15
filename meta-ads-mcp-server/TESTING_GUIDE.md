# Testing Guide: Meta Ads MCP + LibreChat + Kimi K2

This guide provides step-by-step testing procedures to verify your deployment is working correctly.

---

## Pre-Testing Checklist

Before running tests, ensure:

- ✅ Meta Ads MCP Server is deployed on Railway
- ✅ LibreChat is deployed on Railway
- ✅ All environment variables are set correctly
- ✅ You have both Railway URLs ready
- ✅ You have access to both services (no deployment errors)

---

## Test 1: Meta Ads MCP Server Health Check

### Objective
Verify the MCP server is running and responding to requests.

### Steps

1. **Test Basic Connectivity**

   Open a terminal or use a REST client and run:

   ```bash
   curl https://YOUR-META-ADS-MCP-URL.railway.app/mcp \
     -H "Content-Type: application/json" \
     -H "X-META-ACCESS-TOKEN: test" \
     -d '{"jsonrpc":"2.0","method":"tools/list","id":1}'
   ```

   Replace `YOUR-META-ADS-MCP-URL.railway.app` with your actual Railway URL.

2. **Expected Response**

   You should receive a JSON response like:

   ```json
   {
     "jsonrpc": "2.0",
     "id": 1,
     "result": {
       "tools": [
         {
           "name": "get_ad_accounts",
           "description": "Get all ad accounts...",
           "inputSchema": {...}
         },
         {
           "name": "get_campaigns",
           "description": "Get campaigns...",
           "inputSchema": {...}
         }
         // ... more tools (should see 29 total)
       ]
     }
   }
   ```

3. **Success Criteria**
   - ✅ HTTP 200 status code
   - ✅ JSON response received
   - ✅ Contains "tools" array with 29 items
   - ✅ No error messages

4. **Troubleshooting**
   - ❌ Connection refused: Check Railway deployment status
   - ❌ 404 Not Found: Verify URL includes `/mcp` path
   - ❌ 500 Error: Check Railway logs for server errors
   - ❌ Timeout: Check Railway service is running

---

## Test 2: LibreChat Accessibility

### Objective
Verify LibreChat is accessible and loading correctly.

### Steps

1. **Access LibreChat URL**

   Open your browser and navigate to:
   ```
   https://YOUR-LIBRECHAT-URL.railway.app
   ```

2. **Expected Behavior**
   - ✅ Page loads without errors
   - ✅ LibreChat interface appears
   - ✅ Login/Sign Up buttons visible

3. **Create Test Account**

   a. Click **"Sign Up"**
   b. Enter:
      - Email: `test@example.com` (or your email)
      - Password: Strong password (min 8 characters)
      - Confirm password
   c. Click **"Sign Up"**

4. **Success Criteria**
   - ✅ Account created successfully
   - ✅ Automatically logged in
   - ✅ Chat interface appears

5. **Troubleshooting**
   - ❌ Page won't load: Check Railway deployment status
   - ❌ Blank page: Check browser console (F12) for errors
   - ❌ Can't sign up: Check MongoDB is running in Railway
   - ❌ "Config error": Verify `CONFIG_PATH` environment variable

---

## Test 3: Kimi K2 Model Availability

### Objective
Verify Kimi K2 model is configured and accessible in LibreChat.

### Steps

1. **Login to LibreChat**

   Use credentials from Test 2.

2. **Check Model Selector**

   a. Look at the top of the chat interface
   b. Click the **model selector dropdown** (shows current model)
   c. Look for **"Kimi K2"** in the endpoints list

3. **Expected Result**
   - ✅ "Kimi K2" appears as an option
   - ✅ Shows models: `kimi-k2-0711`, `kimi-k2-thinking`, `kimi-k2-thinking-turbo`

4. **Select Kimi K2 Model**

   a. Click **"Kimi K2"**
   b. Choose a model (recommend `kimi-k2-0711` for testing)

5. **Troubleshooting**
   - ❌ "Kimi K2" not visible: Check `KIMI_API_KEY` is set in Railway
   - ❌ Can't select model: Verify `ENDPOINTS` includes "custom"
   - ❌ Error loading models: Check `librechat.yaml` syntax
   - ❌ Config not loading: Verify `CONFIG_PATH` points to correct GitHub raw URL

---

## Test 4: Kimi K2 Conversation Test

### Objective
Verify Kimi K2 model can respond to messages.

### Steps

1. **Send Test Message**

   With Kimi K2 selected, type:
   ```
   Hello! Please tell me a bit about yourself and your capabilities.
   ```

2. **Expected Response**
   - ✅ Kimi responds within 5-10 seconds
   - ✅ Response is coherent and relevant
   - ✅ No error messages
   - ✅ Conversation appears in history

3. **Test Advanced Reasoning (Optional)**

   For `kimi-k2-thinking` model:
   ```
   Solve this puzzle: I have 3 apples. I eat one. Then I buy 5 more. How many do I have? Please show your reasoning step-by-step.
   ```

4. **Expected Response**
   - ✅ Shows reasoning process
   - ✅ Arrives at correct answer (7 apples)
   - ✅ Demonstrates thinking capability

5. **Success Criteria**
   - ✅ All responses are relevant and accurate
   - ✅ No API errors
   - ✅ Response time is reasonable (< 30 seconds)

6. **Troubleshooting**
   - ❌ "Invalid API key": Check `KIMI_API_KEY` is correct
   - ❌ No response: Check Kimi API status at platform.moonshot.ai
   - ❌ Timeout errors: Increase timeout in `librechat.yaml` or check network
   - ❌ Rate limit errors: Check your Kimi API usage/limits

---

## Test 5: MCP Server Visibility in LibreChat

### Objective
Verify Meta Ads MCP server appears in LibreChat's tools interface.

### Steps

1. **Check MCP Server Connection**

   a. In LibreChat, look below the chat input box
   b. You should see a **tools dropdown** or **MCP servers icon**
   c. Click it to expand

2. **Expected Result**
   - ✅ "meta-ads" server appears in the list
   - ✅ Server shows as "Connected" or "Available"
   - ✅ Can expand to see individual tools

3. **View Available Tools**

   a. Click on **"meta-ads"** to expand
   b. Should show all 29 tools:
      - Account tools: `get_ad_accounts`, `get_account_info`, `get_account_pages`
      - Campaign tools: `get_campaigns`, `create_campaign`, `update_campaign`, etc.
      - Ad Set tools: `get_adsets`, `create_adset`, `update_adset`, etc.
      - Ad tools: `get_ads`, `create_ad`, `update_ad`, etc.
      - Creative tools: `create_ad_creative`, `upload_ad_image`, etc.
      - Insights: `get_insights`
      - Targeting: `search_interests`, `search_behaviors`, etc.
      - Auth: `get_login_link`

4. **Success Criteria**
   - ✅ MCP server is visible
   - ✅ Shows connected status
   - ✅ All 29 tools are listed
   - ✅ No connection errors

5. **Troubleshooting**
   - ❌ MCP server not visible: Check `librechat.yaml` has `chatMenu: true`
   - ❌ Connection error: Verify Meta Ads MCP URL is correct
   - ❌ No tools showing: Check MCP server is deployed and running
   - ❌ "Unauthorized": Verify authentication headers in `librechat.yaml`
   - ❌ Timeout: Check MCP server Railway logs for errors

---

## Test 6: Meta Ads Authentication

### Objective
Authenticate with Meta Ads API to enable tool functionality.

### Steps

1. **Option A: Use get_login_link Tool**

   a. In LibreChat chat, ensure **Kimi K2** and **meta-ads** MCP server are selected
   b. Send message:
      ```
      Please use the get_login_link tool to help me authenticate with Meta Ads.
      ```

   c. Kimi should invoke the `get_login_link` tool
   d. You'll receive an OAuth URL

   e. Click the URL (or copy-paste to browser)
   f. Login to Facebook/Meta if not already logged in
   g. Grant permissions to your app
   h. You'll be redirected with an access token

2. **Option B: Manual Access Token (Alternative)**

   a. Go to Meta Graph API Explorer: https://developers.facebook.com/tools/explorer/
   b. Select your app
   c. Click **"Get User Access Token"**
   d. Select permissions:
      - `ads_management`
      - `ads_read`
      - `business_management`
   e. Click **"Generate Access Token"**
   f. Copy the token

   g. In Railway, update `META_ACCESS_TOKEN` environment variable with this token
   h. Redeploy LibreChat service

3. **Expected Result**
   - ✅ Authentication successful
   - ✅ Access token obtained (either automatically or manually)
   - ✅ No error messages

4. **Success Criteria**
   - ✅ Can proceed to use Meta Ads tools
   - ✅ Token is valid (check in Graph API Explorer if needed)

5. **Troubleshooting**
   - ❌ OAuth error: Check Meta App domains and redirect URIs
   - ❌ Permissions denied: Grant all required permissions
   - ❌ Token expired: Tokens expire, regenerate as needed
   - ❌ Invalid app: Verify `META_APP_ID` and `META_APP_SECRET` are correct

---

## Test 7: Meta Ads Tools Functionality

### Objective
Verify Meta Ads MCP tools can successfully retrieve data from Meta API.

### Test 7.1: Get Ad Accounts

1. **Send Request**

   In LibreChat with Kimi K2 and meta-ads MCP:
   ```
   Please list all my Meta ad accounts using the available tools.
   ```

2. **Expected Behavior**
   - ✅ Kimi invokes `get_ad_accounts` tool
   - ✅ Returns list of ad accounts
   - ✅ Shows account names, IDs, and status
   - ✅ No errors

3. **Sample Response**
   ```
   I found 2 ad accounts:

   1. Account Name: My Business Ads
      Account ID: act_1234567890
      Status: ACTIVE
      Currency: USD

   2. Account Name: Test Account
      Account ID: act_0987654321
      Status: ACTIVE
      Currency: EUR
   ```

### Test 7.2: Get Campaigns

1. **Send Request**

   ```
   Show me all campaigns in account act_XXXXXXXXXX (replace with your account ID from previous test)
   ```

2. **Expected Behavior**
   - ✅ Kimi invokes `get_campaigns` tool
   - ✅ Returns list of campaigns
   - ✅ Shows campaign names, IDs, statuses, budgets
   - ✅ No errors

### Test 7.3: Get Campaign Insights

1. **Send Request**

   ```
   Get performance insights for campaign XXXXXXXXXX for the last 30 days (replace with campaign ID)
   ```

2. **Expected Behavior**
   - ✅ Kimi invokes `get_insights` tool
   - ✅ Returns performance metrics (impressions, clicks, spend, etc.)
   - ✅ Data is formatted clearly
   - ✅ No errors

### Test 7.4: Search Interests

1. **Send Request**

   ```
   Search for targeting interests related to "fitness" and "yoga"
   ```

2. **Expected Behavior**
   - ✅ Kimi invokes `search_interests` tool
   - ✅ Returns relevant interests with IDs
   - ✅ Shows audience sizes
   - ✅ No errors

### Test 7.5: Combined Workflow

1. **Send Complex Request**

   ```
   Please analyze the performance of all my active campaigns and recommend which ones to increase budget for based on their ROAS.
   ```

2. **Expected Behavior**
   - ✅ Kimi uses multiple tools:
     - `get_ad_accounts`
     - `get_campaigns`
     - `get_insights`
   - ✅ Provides AI-powered analysis
   - ✅ Makes specific recommendations
   - ✅ All tool calls succeed

3. **Success Criteria for All Tests**
   - ✅ All tools execute without errors
   - ✅ Data is returned from Meta API
   - ✅ Kimi interprets and presents data clearly
   - ✅ No timeout or authentication errors

4. **Troubleshooting**
   - ❌ "Authentication required": Complete Test 6 first
   - ❌ "No ad accounts found": Check Meta Business Manager access
   - ❌ "Permission denied": Grant all required permissions in Meta App
   - ❌ "Rate limit exceeded": Wait and retry, or check Meta API quotas
   - ❌ Tool timeout: Check MCP server logs, increase timeout in `librechat.yaml`

---

## Test 8: End-to-End Integration Test

### Objective
Verify the complete workflow from chat to Meta API and back.

### Scenario: Create a New Campaign (Read-only simulation)

1. **Send Request**

   ```
   I want to create a campaign strategy. Please help me:
   1. List my ad accounts
   2. Show me the top performing campaigns from the last month
   3. Recommend targeting interests for a fitness product
   4. Suggest a campaign structure (don't actually create anything yet)
   ```

2. **Expected Workflow**
   - ✅ Kimi understands multi-step request
   - ✅ Sequentially uses tools:
     1. `get_ad_accounts`
     2. `get_campaigns` with date filter
     3. `get_insights` for performance data
     4. `search_interests` for targeting
   - ✅ Synthesizes information
   - ✅ Provides comprehensive recommendation

3. **Success Criteria**
   - ✅ All steps complete successfully
   - ✅ Kimi provides coherent, actionable recommendations
   - ✅ No errors in tool execution
   - ✅ Response time < 2 minutes for full workflow

---

## Test 9: Error Handling

### Objective
Verify system handles errors gracefully.

### Test 9.1: Invalid Account ID

1. **Send Request**
   ```
   Get campaigns for account act_INVALIDID123
   ```

2. **Expected Behavior**
   - ✅ Returns error message (not crash)
   - ✅ Kimi explains the error
   - ✅ Suggests correction

### Test 9.2: Missing Authentication

1. **Temporarily remove `META_ACCESS_TOKEN`** from Railway
2. **Redeploy**
3. **Try to use a tool**

4. **Expected Behavior**
   - ✅ Clear authentication error
   - ✅ Instructs user to authenticate
   - ✅ Suggests using `get_login_link`

### Test 9.3: Network Timeout

1. **Send Request for large dataset**
   ```
   Get insights for all campaigns for the last 365 days with hourly breakdown
   ```

2. **Expected Behavior**
   - ✅ Either succeeds (if data is reasonable)
   - ✅ Or returns timeout error with clear message
   - ✅ Kimi suggests breaking into smaller requests

---

## Test 10: Performance Testing

### Objective
Verify system performance under normal usage.

### Metrics to Track

1. **Response Time**
   - Simple query (get accounts): < 5 seconds
   - Medium complexity (get campaigns): < 10 seconds
   - Complex workflow (multi-tool): < 60 seconds

2. **Concurrency**
   - Open 2-3 browser tabs with LibreChat
   - Send requests simultaneously
   - All should respond without issues

3. **Memory Usage**
   - Check Railway dashboard
   - Monitor memory usage over time
   - Should remain stable (not increasing continuously)

4. **Success Criteria**
   - ✅ Response times within acceptable ranges
   - ✅ No crashes or memory leaks
   - ✅ Multiple concurrent users work smoothly

---

## Testing Summary Checklist

After completing all tests, verify:

- ✅ **Test 1**: MCP Server is accessible via HTTP
- ✅ **Test 2**: LibreChat loads and allows account creation
- ✅ **Test 3**: Kimi K2 appears in model selector
- ✅ **Test 4**: Kimi K2 responds to messages correctly
- ✅ **Test 5**: meta-ads MCP server visible in tools
- ✅ **Test 6**: Successfully authenticated with Meta
- ✅ **Test 7**: All core Meta Ads tools work:
  - ✅ Get ad accounts
  - ✅ Get campaigns
  - ✅ Get insights
  - ✅ Search targeting options
  - ✅ Complex multi-tool workflows
- ✅ **Test 8**: End-to-end integration successful
- ✅ **Test 9**: Errors handled gracefully
- ✅ **Test 10**: Performance is acceptable

---

## Post-Testing Actions

### If All Tests Pass ✅

Congratulations! Your system is fully operational. You can now:

1. **Invite Team Members**
   - Share LibreChat URL
   - Create accounts for team
   - Demonstrate features

2. **Create Production Workflows**
   - Build custom agents
   - Automate campaign monitoring
   - Set up reporting

3. **Monitor Usage**
   - Check Railway usage dashboard
   - Monitor Kimi API consumption
   - Track Meta API call limits

### If Tests Fail ❌

1. **Document the failure**:
   - Which test failed?
   - What was the exact error message?
   - When did it occur?

2. **Check relevant logs**:
   - Railway deployment logs
   - Browser console (F12)
   - Network tab (F12)

3. **Review configuration**:
   - Verify all environment variables
   - Check `librechat.yaml` syntax
   - Confirm URLs are correct

4. **Refer to troubleshooting**:
   - See DEPLOYMENT_GUIDE.md "Troubleshooting" section
   - Check each service independently
   - Test components in isolation

5. **Get help**:
   - Review LibreChat documentation
   - Check Railway community forums
   - Inspect Meta API error codes

---

## Continuous Testing

### Weekly Checks

- ✅ Verify services are running (Railway dashboard)
- ✅ Test a simple conversation with Kimi
- ✅ Run one Meta Ads tool to confirm API access
- ✅ Check for any Railway billing alerts

### Monthly Maintenance

- ✅ Review Railway usage and costs
- ✅ Update dependencies if needed
- ✅ Rotate API keys (security best practice)
- ✅ Backup LibreChat conversations (MongoDB export)
- ✅ Review Meta API permissions

### As Needed

- 🔄 After Railway deployment updates
- 🔄 After changing `librechat.yaml`
- 🔄 After updating environment variables
- 🔄 After Meta App configuration changes

---

## Quick Test Script

For quick daily verification, run this sequence:

1. **Open LibreChat** → Should load in < 5 seconds
2. **Select Kimi K2** → Should appear in dropdown
3. **Send**: "Hi, respond with OK" → Should get response in < 5 seconds
4. **Check MCP** → meta-ads should show in tools
5. **Send**: "List my ad accounts" → Should return accounts in < 10 seconds

If all 5 steps pass: ✅ System is healthy!

---

## Success Metrics

Your deployment is successful when:

✅ **Uptime**: Services available 99%+ of the time
✅ **Response Time**: < 10 seconds for typical queries
✅ **Error Rate**: < 1% of requests fail
✅ **User Satisfaction**: Team can use system effectively
✅ **Tool Functionality**: All 29 MCP tools work as expected
✅ **Integration**: Kimi + MCP work seamlessly together

---

You're all set! This testing guide should help you verify every component of your deployment. Happy testing! 🧪✅
