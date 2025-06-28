import React from 'react';
import { motion } from 'framer-motion';
interface ButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  type?: 'button' | 'submit' | 'reset';
  variant?: 'primary' | 'secondary' | 'outline' | 'text';
  size?: 'sm' | 'md' | 'lg';
  fullWidth?: boolean;
  disabled?: boolean;
  className?: string;
  loading?: boolean;
}
const Button: React.FC<ButtonProps> = ({
  children,
  onClick,
  type = 'button',
  variant = 'primary',
  size = 'md',
  fullWidth = false,
  disabled = false,
  className = '',
  loading = false
}) => {
  const baseClasses = 'font-medium rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-opacity-50 flex items-center justify-center gap-2';
  const variantClasses = {
    primary: 'bg-congress-blue-600 text-white hover:bg-congress-blue-700 focus:ring-regent-st-blue-300 shadow-sm hover:shadow',
    secondary: 'bg-regent-st-blue-400 text-congress-blue-900 hover:bg-regent-st-blue-500 focus:ring-congress-blue-700 shadow-sm hover:shadow',
    outline: 'bg-transparent border-2 border-congress-blue-600 text-congress-blue-600 hover:bg-congress-blue-50 focus:ring-regent-st-blue-300',
    text: 'bg-transparent text-congress-blue-600 hover:bg-gray-100 focus:ring-regent-st-blue-300'
  };
  const sizeClasses = {
    sm: 'py-1.5 px-3 text-sm',
    md: 'py-2.5 px-4 text-base',
    lg: 'py-3 px-6 text-lg'
  };
  const iconSizeClasses = {
    sm: '[&>svg]:w-4 [&>svg]:h-4',
    md: '[&>svg]:w-5 [&>svg]:h-5',
    lg: '[&>svg]:w-6 [&>svg]:h-6'
  };
  const widthClass = fullWidth ? 'w-full' : 'w-auto';
  const disabledClass = disabled ? 'opacity-60 cursor-not-allowed' : 'cursor-pointer';
  // Animation variants
  const buttonVariants = {
    hover: {
      scale: disabled || loading ? 1 : 1.02,
      boxShadow: disabled || loading ? 'none' : '0px 4px 8px rgba(0, 0, 0, 0.1)'
    },
    tap: {
      scale: disabled || loading ? 1 : 0.98
    },
    rest: {
      scale: 1,
      boxShadow: 'none'
    }
  };
  return <motion.button type={type} onClick={onClick} disabled={disabled || loading} initial="rest" whileHover="hover" whileTap="tap" variants={buttonVariants} transition={{
    type: 'spring',
    stiffness: 500,
    damping: 17
  }} className={`
        ${baseClasses}
        ${variantClasses[variant]}
        ${sizeClasses[size]}
        ${iconSizeClasses[size]}
        ${widthClass}
        ${disabledClass}
        ${className}
      `}>
      {loading ? <>
          <span className="loading-dots inline-flex">
            <span></span>
            <span></span>
            <span></span>
          </span>
          <span className="ml-2">{children}</span>
        </> : children}
    </motion.button>;
};
export default Button;