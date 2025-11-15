/**
 * Metrics Card Component
 *
 * Displays key performance metrics in a card layout.
 */

'use client';

interface Metric {
  label: string;
  value: string | number;
  change?: string;
  trend?: 'up' | 'down' | 'neutral';
}

interface MetricsCardProps {
  metrics: Metric[];
  title?: string;
}

export function MetricsCard({ metrics, title }: MetricsCardProps) {
  return (
    <div className="my-4">
      {title && (
        <h3 className="text-sm font-semibold text-gray-900 dark:text-white mb-3">
          {title}
        </h3>
      )}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {metrics.map((metric, index) => (
          <div
            key={index}
            className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-4"
          >
            <p className="text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wide">
              {metric.label}
            </p>
            <p className="mt-2 text-2xl font-bold text-gray-900 dark:text-white">
              {formatMetricValue(metric.value)}
            </p>
            {metric.change && (
              <div className="mt-2 flex items-center gap-1">
                {metric.trend === 'up' && (
                  <svg
                    className="h-4 w-4 text-green-500"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"
                    />
                  </svg>
                )}
                {metric.trend === 'down' && (
                  <svg
                    className="h-4 w-4 text-red-500"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M13 17h8m0 0V9m0 8l-8-8-4 4-6-6"
                    />
                  </svg>
                )}
                <span
                  className={`text-xs font-medium ${
                    metric.trend === 'up'
                      ? 'text-green-600 dark:text-green-400'
                      : metric.trend === 'down'
                      ? 'text-red-600 dark:text-red-400'
                      : 'text-gray-600 dark:text-gray-400'
                  }`}
                >
                  {metric.change}
                </span>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

function formatMetricValue(value: string | number): string {
  if (typeof value === 'number') {
    // Format large numbers
    if (value >= 1000000) {
      return (value / 1000000).toFixed(1) + 'M';
    }
    if (value >= 1000) {
      return (value / 1000).toFixed(1) + 'K';
    }
    return value.toLocaleString();
  }
  return String(value);
}
