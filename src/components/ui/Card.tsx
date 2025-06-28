import React from 'react';
import { motion } from 'framer-motion';
interface CardProps {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
  selected?: boolean;
}
const Card: React.FC<CardProps> = ({
  children,
  className = '',
  onClick,
  selected = false
}) => {
  const baseClasses = 'bg-white rounded-lg transition-all duration-200';
  const hoverClasses = onClick ? 'hover:bg-gray-50 cursor-pointer' : '';
  const selectedClasses = selected ? 'border-2 border-congress-blue-600 bg-congress-blue-50' : 'border border-gray-200';
  // Animation variants
  const cardVariants = {
    hover: onClick ? {
      y: -5,
      boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)'
    } : {},
    tap: onClick ? {
      scale: 0.98
    } : {},
    selected: selected ? {
      scale: [1, 1.02, 1],
      transition: {
        duration: 0.3
      }
    } : {}
  };
  return <motion.div className={`${baseClasses} ${hoverClasses} ${selectedClasses} ${className}`} onClick={onClick} initial="initial" whileHover="hover" whileTap="tap" animate={selected ? 'selected' : 'initial'} variants={cardVariants} transition={{
    type: 'spring',
    stiffness: 400,
    damping: 17
  }}>
      {children}
    </motion.div>;
};
export default Card;