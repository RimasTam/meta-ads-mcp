/**
 * Chat Interface Component
 *
 * Main chat interface using AI SDK's useChat hook.
 * Provides a ChatGPT-like experience with streaming responses.
 */

'use client';

import { useChat } from 'ai/react';
import { ChatMessage } from './message';
import { ChatInput } from './input';
import { useEffect, useRef } from 'react';

export function ChatInterface() {
  const { messages, input, handleInputChange, handleSubmit, isLoading, error } =
    useChat({
      api: '/api/chat',
      onError: (error) => {
        console.error('Chat error:', error);
      },
    });

  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to bottom when new messages arrive
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  return (
    <div className="flex flex-col h-screen bg-white dark:bg-gray-900">
      {/* Header */}
      <header className="border-b border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 px-4 py-3">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-lg font-semibold text-gray-900 dark:text-white">
            Meta Ads AI Assistant
          </h1>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Powered by Kimi K2 Thinking
          </p>
        </div>
      </header>

      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto">
        <div className="max-w-3xl mx-auto px-4 py-6">
          {messages.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-center">
              <div className="mb-8">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                  Welcome to Meta Ads AI Assistant
                </h2>
                <p className="text-gray-600 dark:text-gray-400 max-w-md">
                  Ask me anything about your Meta Ads campaigns, audience targeting,
                  or performance insights.
                </p>
              </div>

              {/* Example Prompts */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 w-full max-w-2xl">
                <ExamplePrompt
                  text="Search for interests related to 'fitness'"
                  onClick={(text) => {
                    handleInputChange({
                      target: { value: text },
                    } as any);
                  }}
                />
                <ExamplePrompt
                  text="Show me performance insights for my campaigns"
                  onClick={(text) => {
                    handleInputChange({
                      target: { value: text },
                    } as any);
                  }}
                />
                <ExamplePrompt
                  text="Help me estimate audience size for women aged 25-34"
                  onClick={(text) => {
                    handleInputChange({
                      target: { value: text },
                    } as any);
                  }}
                />
                <ExamplePrompt
                  text="What are my active ad accounts?"
                  onClick={(text) => {
                    handleInputChange({
                      target: { value: text },
                    } as any);
                  }}
                />
              </div>
            </div>
          ) : (
            <>
              {messages.map((message) => (
                <ChatMessage key={message.id} message={message} />
              ))}
              <div ref={messagesEndRef} />
            </>
          )}

          {/* Loading Indicator */}
          {isLoading && (
            <div className="flex items-center gap-2 text-gray-500 dark:text-gray-400 mb-4">
              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-gray-900 dark:border-white"></div>
              <span className="text-sm">Thinking...</span>
            </div>
          )}

          {/* Error Message */}
          {error && (
            <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-700 rounded-lg p-4 mb-4">
              <p className="text-sm text-red-800 dark:text-red-400">
                <strong>Error:</strong> {error.message}
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Input Area */}
      <div className="border-t border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 px-4 py-4">
        <div className="max-w-3xl mx-auto">
          <ChatInput
            value={input}
            onChange={handleInputChange}
            onSubmit={handleSubmit}
            disabled={isLoading}
          />
        </div>
      </div>
    </div>
  );
}

interface ExamplePromptProps {
  text: string;
  onClick: (text: string) => void;
}

function ExamplePrompt({ text, onClick }: ExamplePromptProps) {
  return (
    <button
      onClick={() => onClick(text)}
      className="text-left p-3 rounded-lg border border-gray-200 dark:border-gray-700 hover:border-blue-500 dark:hover:border-blue-500 transition-colors bg-white dark:bg-gray-800 text-sm text-gray-700 dark:text-gray-300"
    >
      {text}
    </button>
  );
}
