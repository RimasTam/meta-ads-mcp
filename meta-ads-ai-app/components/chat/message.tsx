/**
 * Message Component
 *
 * Displays a single chat message (user or assistant).
 * Supports markdown formatting and tool execution visualization.
 */

'use client';

import { Message } from 'ai';
import { cn } from '@/lib/utils';

interface MessageProps {
  message: Message;
}

export function ChatMessage({ message }: MessageProps) {
  const isUser = message.role === 'user';
  const isAssistant = message.role === 'assistant';
  const isToolCall = message.role === 'tool';

  return (
    <div
      className={cn(
        'group relative mb-4 flex items-start',
        isUser && 'justify-end'
      )}
    >
      <div
        className={cn(
          'flex w-full max-w-[85%] flex-col gap-2 rounded-lg px-4 py-3',
          isUser && 'bg-blue-600 text-white ml-auto',
          isAssistant && 'bg-gray-100 dark:bg-gray-800',
          isToolCall && 'bg-purple-50 dark:bg-purple-900/20 border border-purple-200 dark:border-purple-700'
        )}
      >
        {/* Role Label for Tool Calls */}
        {isToolCall && (
          <div className="text-xs font-semibold text-purple-600 dark:text-purple-400 uppercase tracking-wide">
            Tool Execution
          </div>
        )}

        {/* Message Content */}
        <div className="text-sm whitespace-pre-wrap break-words">
          {typeof message.content === 'string' ? (
            <p>{message.content}</p>
          ) : (
            <div className="space-y-2">
              {message.content.map((content: any, index: number) => {
                if (content.type === 'text') {
                  return <p key={index}>{content.text}</p>;
                }
                if (content.type === 'tool-call') {
                  return (
                    <div
                      key={index}
                      className="rounded bg-white dark:bg-gray-900 p-2 border border-gray-200 dark:border-gray-700"
                    >
                      <div className="text-xs font-mono text-gray-600 dark:text-gray-400 mb-1">
                        {content.toolName}
                      </div>
                      <pre className="text-xs overflow-x-auto">
                        {JSON.stringify(content.args, null, 2)}
                      </pre>
                    </div>
                  );
                }
                if (content.type === 'tool-result') {
                  return (
                    <div
                      key={index}
                      className="rounded bg-green-50 dark:bg-green-900/20 p-2 border border-green-200 dark:border-green-700"
                    >
                      <div className="text-xs font-semibold text-green-700 dark:text-green-400 mb-1">
                        Result
                      </div>
                      <pre className="text-xs overflow-x-auto whitespace-pre-wrap">
                        {typeof content.result === 'string'
                          ? content.result
                          : JSON.stringify(content.result, null, 2)}
                      </pre>
                    </div>
                  );
                }
                return null;
              })}
            </div>
          )}
        </div>

        {/* Timestamp (optional) */}
        {message.createdAt && (
          <div className="text-xs text-gray-500 dark:text-gray-400">
            {new Date(message.createdAt).toLocaleTimeString()}
          </div>
        )}
      </div>
    </div>
  );
}
