import React from 'react';
interface ToggleProps {
  enabled: boolean;
  onChange: (enabled: boolean) => void;
  size?: 'sm' | 'md' | 'lg';
}
const Toggle: React.FC<ToggleProps> = ({
  enabled,
  onChange,
  size = 'md'
}) => {
  const sizes = {
    sm: {
      track: 'w-8 h-4',
      thumb: 'w-3 h-3',
      translate: 'translate-x-4'
    },
    md: {
      track: 'w-11 h-6',
      thumb: 'w-5 h-5',
      translate: 'translate-x-5'
    },
    lg: {
      track: 'w-14 h-7',
      thumb: 'w-6 h-6',
      translate: 'translate-x-7'
    }
  };
  return <button type="button" className={`
        ${sizes[size].track}
        ${enabled ? 'bg-congress-blue-600' : 'bg-gray-300'}
        relative inline-flex flex-shrink-0 border-2 border-transparent rounded-full 
        cursor-pointer transition-colors ease-in-out duration-200 
        focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-congress-blue-500
      `} role="switch" aria-checked={enabled} onClick={() => onChange(!enabled)}>
      <span className="sr-only">Toggle</span>
      <span aria-hidden="true" className={`
          ${sizes[size].thumb}
          ${enabled ? sizes[size].translate : 'translate-x-0'}
          pointer-events-none inline-block rounded-full bg-white shadow 
          transform ring-0 transition ease-in-out duration-200
        `} />
    </button>;
};
export default Toggle;