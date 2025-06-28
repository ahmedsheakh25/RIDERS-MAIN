import React from 'react';
import { CheckIcon } from '@heroicons/react/24/outline';
interface CheckboxProps {
  label: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
  name?: string;
  disabled?: boolean;
  className?: string;
}
const Checkbox: React.FC<CheckboxProps> = ({
  label,
  checked,
  onChange,
  name,
  disabled = false,
  className = ''
}) => {
  return <div className={`flex items-center ${className}`}>
      <div className={`
          relative flex items-center justify-center w-5 h-5 rounded-md transition-colors duration-200
          ${checked ? 'bg-[#004976] border-[#004976]' : 'bg-white border-2 border-gray-300'} 
          ${disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer hover:border-[#004976]'}
        `} onClick={() => !disabled && onChange(!checked)}>
        {checked && <CheckIcon className="w-3.5 h-3.5 text-white" />}
        <input type="checkbox" className="sr-only" name={name} checked={checked} onChange={() => {}} disabled={disabled} />
      </div>
      <label className={`ml-2.5 text-sm ${disabled ? 'text-gray-400' : 'text-gray-700'} cursor-pointer`} onClick={() => !disabled && onChange(!checked)}>
        {label}
      </label>
    </div>;
};
export default Checkbox;