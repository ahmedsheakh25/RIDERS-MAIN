import React from 'react';
interface RadioOption {
  value: string;
  label: React.ReactNode;
}
interface RadioGroupProps {
  options: RadioOption[];
  name: string;
  value: string;
  onChange: (value: string) => void;
  className?: string;
}
const RadioGroup: React.FC<RadioGroupProps> = ({
  options,
  name,
  value,
  onChange,
  className = ''
}) => {
  return <div className={`space-y-3 ${className}`}>
      {options.map(option => <div key={option.value} className={`
            flex items-center p-4 rounded-lg border-2 cursor-pointer transition-all duration-200
            ${value === option.value ? 'border-[#004976] bg-[#f0f9ff] shadow-sm' : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'}
          `} onClick={() => onChange(option.value)}>
          <div className="flex items-center justify-center">
            <div className={`
                w-5 h-5 rounded-full border-2 flex items-center justify-center transition-colors
                ${value === option.value ? 'border-[#004976]' : 'border-gray-400'}
              `}>
              {value === option.value && <div className="w-2.5 h-2.5 rounded-full bg-[#004976]"></div>}
            </div>
          </div>
          <div className="ml-3 flex-1">{option.label}</div>
        </div>)}
    </div>;
};
export default RadioGroup;