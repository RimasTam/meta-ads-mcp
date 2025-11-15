/**
 * AI SDK Configuration for Kimi K2 Model
 *
 * Kimi K2 is configured as an OpenAI-compatible provider using the official Moonshot AI API.
 * The model supports:
 * - 256K context window
 * - Streaming responses
 * - Tool calling (function calling)
 * - Advanced reasoning capabilities
 */

import { createOpenAI } from '@ai-sdk/openai';

// Validate environment variables
const KIMI_API_KEY = process.env.KIMI_API_KEY;
const KIMI_API_BASE_URL = process.env.KIMI_API_BASE_URL || 'https://api.moonshot.ai/v1/';

if (!KIMI_API_KEY) {
  throw new Error('KIMI_API_KEY environment variable is required');
}

/**
 * Kimi K2 provider instance configured for Moonshot AI API
 */
export const kimi = createOpenAI({
  baseURL: KIMI_API_BASE_URL,
  apiKey: KIMI_API_KEY,
  compatibility: 'compatible', // Ensures OpenAI-compatible behavior
});

/**
 * Model identifiers for different Kimi K2 variants
 */
export const KimiModels = {
  /** Kimi K2 Thinking - Advanced reasoning model with extended thinking capabilities */
  THINKING: 'kimi-k2-thinking',

  /** Kimi K2 Instruct - Standard instruction-following model */
  INSTRUCT: 'kimi-k2-0711-preview',
} as const;

/**
 * Default model configuration for the chat interface
 */
export const defaultModel = kimi(KimiModels.THINKING);

/**
 * System prompt for Meta Ads assistant
 */
export const systemPrompt = `You are a helpful Meta Ads assistant powered by AI. You have access to Meta Ads management tools that allow you to:

1. **Audience Research & Targeting**:
   - Search for interests, behaviors, and demographics for ad targeting
   - Estimate audience sizes for targeting combinations
   - Discover related interests and targeting suggestions
   - Search geographic locations for targeting

2. **Campaign Analysis & Reporting**:
   - Get detailed performance insights for campaigns, ad sets, and ads
   - Analyze metrics with various breakdowns (age, gender, placement, device, etc.)
   - Generate performance reports with time ranges
   - View ad creatives and images

When users ask about Meta Ads, use the available tools to provide accurate, data-driven insights. Always:
- Use the appropriate tool for the task
- Provide clear, actionable insights
- Format data in easy-to-read tables or lists
- Explain metrics and recommendations in business terms
- Ask for clarification if needed (e.g., which ad account, time range, etc.)

Remember: You're helping marketers make better advertising decisions through AI-powered analysis.`;

/**
 * Default configuration for text generation
 */
export const defaultGenerationConfig = {
  temperature: 0.7,
  maxTokens: 4096,
  topP: 0.9,
  frequencyPenalty: 0,
  presencePenalty: 0,
};
