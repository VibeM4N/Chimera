import { useState } from 'react';

export default function FormTextarea({
  label,
  name,
  value,
  onChange,
  error,
  placeholder,
  maxLength,
  disabled = false,
  required = false,
  rows = 4,
}) {
  const charCount = value?.length || 0;

  return (
    <div className="mb-4">
      {label && (
        <label htmlFor={name} className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
          {label}
          {required && <span className="text-red-500">*</span>}
        </label>
      )}
      <textarea
        id={name}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        maxLength={maxLength}
        disabled={disabled}
        rows={rows}
        className={`w-full px-3 py-2 border rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 transition resize-vertical ${
          error
            ? 'border-red-500 focus:ring-red-500'
            : 'border-gray-300 dark:border-gray-600'
        } ${disabled ? 'opacity-50 cursor-not-allowed' : ''}`}
      />
      <div className="flex justify-between items-start mt-1">
        {error && <p className="text-red-500 text-sm">{error}</p>}
        {maxLength && (
          <p className="text-gray-500 dark:text-gray-400 text-sm ml-auto">
            {charCount}/{maxLength}
          </p>
        )}
      </div>
    </div>
  );
}
