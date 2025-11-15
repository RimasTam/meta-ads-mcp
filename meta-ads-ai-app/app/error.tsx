/**
 * Error Boundary
 *
 * Catches and displays errors in the application.
 */

'use client';

import { useEffect } from 'react';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to console
    console.error('Application error:', error);
  }, [error]);

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-white dark:bg-gray-900 p-4">
      <div className="max-w-md text-center">
        <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
          Oops!
        </h1>
        <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-200 mb-4">
          Something went wrong
        </h2>
        <p className="text-gray-600 dark:text-gray-400 mb-6">
          We encountered an unexpected error. Please try again.
        </p>
        {error.message && (
          <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-700 rounded-lg p-4 mb-6">
            <p className="text-sm text-red-800 dark:text-red-400 font-mono">
              {error.message}
            </p>
          </div>
        )}
        <button
          onClick={reset}
          className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-6 rounded-lg transition-colors"
        >
          Try again
        </button>
      </div>
    </div>
  );
}
