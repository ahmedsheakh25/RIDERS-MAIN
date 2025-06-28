import React from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from '../../context/LanguageContext';
interface InputProps {
  label: string;
  name: string;
  type?: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  required?: boolean;
  error?: string;
  className?: string;
}
const Input: React.FC<InputProps> = ({
  label,
  name,
  type = 'text',
  value,
  onChange,
  placeholder = '',
  required = false,
  error,
  className = ''
}) => {
  const {
    t
  } = useLanguage();
  return <div className={`${className}`}>
      <motion.label htmlFor={name} className="block text-sm font-medium text-gray-700 mb-1.5" initial={{
      opacity: 0,
      y: -5
    }} animate={{
      opacity: 1,
      y: 0
    }} transition={{
      duration: 0.2
    }}>
        {label} {required && <span className="text-red-500">*</span>}
      </motion.label>
      <motion.input id={name} name={name} type={type} value={value} onChange={onChange} placeholder={placeholder} required={required} whileFocus={{
      scale: 1.005,
      boxShadow: '0px 0px 0px 2px rgba(142, 202, 230, 0.2)'
    }} className={`
          w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 transition-all text-base
          ${error ? 'border-red-300 focus:ring-red-200 focus:border-red-400' : 'border-gray-300 focus:ring-[#8ECAE6]/20 focus:border-[#8ECAE6]'}
          ${className}
        `} />
      {error && <motion.p className="mt-1.5 text-xs text-red-500" initial={{
      opacity: 0,
      height: 0
    }} animate={{
      opacity: 1,
      height: 'auto'
    }} exit={{
      opacity: 0,
      height: 0
    }}>
          {error}
        </motion.p>}
    </div>;
};
export default Input;