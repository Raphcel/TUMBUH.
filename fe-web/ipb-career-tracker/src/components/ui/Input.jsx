import React from 'react';

export function Input({ label, error, className = '', ...props }) {
  return (
    <div className="w-full">
      {label && (
        <label className="block text-sm font-medium text-gray-700 mb-1">
          {label}
        </label>
      )}
      <input
        className={`w-full rounded-lg border-gray-300 border px-3 py-2 text-sm focus:border-emerald-500 focus:ring-emerald-500 disabled:bg-gray-50 disabled:text-gray-500 shadow-sm ${
          error ? 'border-red-300 focus:border-red-500 focus:ring-red-500' : ''
        } ${className}`}
        {...props}
      />
      {error && <p className="mt-1 text-sm text-red-600">{error}</p>}
    </div>
  );
}

export function Select({ label, error, options = [], className = '', ...props }) {
  return (
    <div className="w-full">
      {label && (
        <label className="block text-sm font-medium text-gray-700 mb-1">
          {label}
        </label>
      )}
      <select
        className={`w-full rounded-lg border-gray-300 border px-3 py-2 text-sm focus:border-emerald-500 focus:ring-emerald-500 shadow-sm ${
          error ? 'border-red-300 focus:border-red-500 focus:ring-red-500' : ''
        } ${className}`}
        {...props}
      >
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
      {error && <p className="mt-1 text-sm text-red-600">{error}</p>}
    </div>
  );
}
