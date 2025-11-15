/**
 * Data Table Component
 *
 * Generic table component for displaying structured data from tool results.
 */

'use client';

interface DataTableProps {
  data: any[];
  title?: string;
  maxRows?: number;
}

export function DataTable({ data, title, maxRows = 10 }: DataTableProps) {
  if (!data || data.length === 0) {
    return (
      <div className="text-sm text-gray-500 dark:text-gray-400 italic">
        No data available
      </div>
    );
  }

  // Get column names from first row
  const columns = Object.keys(data[0]);
  const displayData = maxRows ? data.slice(0, maxRows) : data;
  const hasMore = data.length > displayData.length;

  return (
    <div className="my-4">
      {title && (
        <h3 className="text-sm font-semibold text-gray-900 dark:text-white mb-2">
          {title}
        </h3>
      )}
      <div className="overflow-x-auto rounded-lg border border-gray-200 dark:border-gray-700">
        <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
          <thead className="bg-gray-50 dark:bg-gray-800">
            <tr>
              {columns.map((column) => (
                <th
                  key={column}
                  scope="col"
                  className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider"
                >
                  {column.replace(/_/g, ' ')}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="bg-white dark:bg-gray-900 divide-y divide-gray-200 dark:divide-gray-700">
            {displayData.map((row, rowIndex) => (
              <tr key={rowIndex} className="hover:bg-gray-50 dark:hover:bg-gray-800">
                {columns.map((column) => (
                  <td
                    key={column}
                    className="px-4 py-3 text-sm text-gray-900 dark:text-gray-100 whitespace-nowrap"
                  >
                    {formatCellValue(row[column])}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {hasMore && (
        <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">
          Showing {displayData.length} of {data.length} rows
        </p>
      )}
    </div>
  );
}

function formatCellValue(value: any): string {
  if (value === null || value === undefined) {
    return '-';
  }
  if (typeof value === 'boolean') {
    return value ? 'Yes' : 'No';
  }
  if (typeof value === 'number') {
    // Format large numbers with commas
    return value.toLocaleString();
  }
  if (typeof value === 'object') {
    return JSON.stringify(value);
  }
  return String(value);
}
