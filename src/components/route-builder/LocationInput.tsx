import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MapPinIcon, XCircleIcon } from '@heroicons/react/24/outline';
import LocationSuggestions from './LocationSuggestions';
import { useLanguage } from '../../context/LanguageContext';
interface LocationInputProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  onSelect: (location: string) => void;
  placeholder: string;
  icon?: React.ReactNode;
}
const LocationInput: React.FC<LocationInputProps> = ({
  label,
  value,
  onChange,
  onSelect,
  placeholder,
  icon = <MapPinIcon className="w-5 h-5 text-congress-blue-600" />
}) => {
  const [isFocused, setIsFocused] = useState(false);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const {
    direction
  } = useLanguage();
  const handleFocus = () => {
    setIsFocused(true);
    setShowSuggestions(true);
  };
  const handleBlur = () => {
    // Delay hiding suggestions to allow for selection
    setTimeout(() => {
      setIsFocused(false);
      setShowSuggestions(false);
    }, 200);
  };
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange(e.target.value);
    setShowSuggestions(true);
  };
  const handleClear = () => {
    onChange('');
  };
  const handleSelectSuggestion = (suggestion: string) => {
    onChange(suggestion);
    onSelect(suggestion);
    setShowSuggestions(false);
  };
  return <div className="relative w-full">
      <motion.div className={`bg-white rounded-xl shadow-sm border transition-all ${isFocused ? 'border-congress-blue-400 shadow-md' : 'border-gray-200'} ${value ? 'p-4' : 'p-3'}`} animate={{
      height: isFocused || value ? 'auto' : '64px',
      y: 0,
      opacity: 1
    }} initial={{
      y: 20,
      opacity: 0
    }} transition={{
      type: 'spring',
      stiffness: 500,
      damping: 30
    }}>
        <div className="flex items-center">
          <div className={`flex-shrink-0 ${direction === 'rtl' ? 'ml-3' : 'mr-3'}`}>
            {icon}
          </div>
          <div className="flex-grow">
            <label className={`block text-sm font-medium ${isFocused ? 'text-congress-blue-600' : 'text-gray-700'}`}>
              {label}
            </label>
            <input type="text" value={value} onChange={handleChange} onFocus={handleFocus} onBlur={handleBlur} placeholder={placeholder} className="w-full mt-1 border-none p-0 focus:ring-0 text-gray-800 placeholder-gray-400 bg-transparent" />
          </div>
          {value && <motion.button initial={{
          opacity: 0,
          scale: 0.8
        }} animate={{
          opacity: 1,
          scale: 1
        }} exit={{
          opacity: 0,
          scale: 0.8
        }} className="flex-shrink-0 text-gray-400 hover:text-gray-600" onClick={handleClear} aria-label="Clear input">
              <XCircleIcon className="w-5 h-5" />
            </motion.button>}
        </div>
      </motion.div>
      <AnimatePresence>
        {showSuggestions && value.length > 0 && <LocationSuggestions query={value} onSelect={handleSelectSuggestion} />}
      </AnimatePresence>
    </div>;
};
export default LocationInput;