import React from 'react';

const variants = {
  success: "bg-green-100 text-green-700",
  warning: "bg-yellow-100 text-yellow-700",
  error: "bg-red-100 text-red-700",
  info: "bg-blue-100 text-blue-700",
  neutral: "bg-gray-100 text-gray-700",
  emerald: "bg-emerald-100 text-emerald-700",
};

export function Badge({ variant = 'neutral', className = '', children }) {
  const baseStyles = "inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium";
  const variantStyles = variants[variant] || variants.neutral;
  
  return (
    <span className={`${baseStyles} ${variantStyles} ${className}`}>
      {children}
    </span>
  );
}
