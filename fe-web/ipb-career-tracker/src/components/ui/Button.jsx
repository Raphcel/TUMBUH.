import React from 'react';
import { Link } from 'react-router-dom';
import clsx from 'clsx'; // Using clsx for conditional classes if available, otherwise just template literals. 
// Note: User didn't ask for clsx but it's standard. I'll stick to template literals + tailwind-merge logic manually if needed, or simple string concat. 
// I'll assume simple string concat is fine for now.

const variants = {
  primary: "bg-emerald-600 text-white hover:bg-emerald-700 shadow-sm",
  secondary: "bg-gray-100 text-gray-900 hover:bg-gray-200",
  outline: "border border-gray-300 text-gray-700 hover:bg-gray-50",
  ghost: "text-gray-600 hover:bg-gray-100",
  danger: "bg-red-600 text-white hover:bg-red-700",
};

const sizes = {
  sm: "px-3 py-1.5 text-sm",
  md: "px-4 py-2 text-sm",
  lg: "px-6 py-3 text-base",
};

export function Button({ 
  variant = 'primary', 
  size = 'md', 
  className = '', 
  children, 
  href, 
  to, 
  ...props 
}) {
  const baseStyles = "inline-flex items-center justify-center rounded-lg font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed";
  
  const variantStyles = variants[variant] || variants.primary;
  const sizeStyles = sizes[size] || sizes.md;
  
  const combinedClassName = `${baseStyles} ${variantStyles} ${sizeStyles} ${className}`;

  if (to) {
    return (
      <Link to={to} className={combinedClassName} {...props}>
        {children}
      </Link>
    );
  }

  if (href) {
    return (
      <a href={href} className={combinedClassName} {...props}>
        {children}
      </a>
    );
  }

  return (
    <button className={combinedClassName} {...props}>
      {children}
    </button>
  );
}
