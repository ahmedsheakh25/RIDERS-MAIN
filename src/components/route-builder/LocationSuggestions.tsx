import React from 'react';
import { motion } from 'framer-motion';
import { MapPinIcon } from '@heroicons/react/24/outline';
interface LocationSuggestionsProps {
  query: string;
  onSelect: (location: string) => void;
}
// Mock location data
const mockLocations = ['Kuwait City, Al Asimah', 'Salmiya, Hawalli', 'Hawalli, Hawalli Governorate', 'Fahaheel, Al Ahmadi', 'Al Jahra, Al Jahra Governorate', 'Sabah Al Salem, Mubarak Al-Kabeer', 'Al Farwaniyah, Farwaniyah', 'Mangaf, Al Ahmadi', 'Al Fintas, Al Ahmadi', 'Mahboula, Al Ahmadi', 'Salwa, Hawalli', 'Rumaithiya, Hawalli', 'Bayan, Hawalli', 'Mishref, Hawalli', 'Abu Halifa, Al Ahmadi'];
const LocationSuggestions: React.FC<LocationSuggestionsProps> = ({
  query,
  onSelect
}) => {
  // Filter locations based on query
  const filteredLocations = mockLocations.filter(location => location.toLowerCase().includes(query.toLowerCase()));
  if (filteredLocations.length === 0) return null;
  return <motion.div className="absolute z-10 w-full mt-1 bg-white rounded-lg shadow-lg border border-gray-200 overflow-hidden" initial={{
    opacity: 0,
    y: -10
  }} animate={{
    opacity: 1,
    y: 0
  }} exit={{
    opacity: 0,
    y: -10
  }} transition={{
    duration: 0.2
  }}>
      <ul className="py-2 max-h-60 overflow-y-auto">
        {filteredLocations.map((location, index) => <motion.li key={index} initial={{
        opacity: 0,
        x: -10
      }} animate={{
        opacity: 1,
        x: 0
      }} transition={{
        delay: index * 0.05
      }} className="px-4 py-2 hover:bg-gray-50 cursor-pointer flex items-center" onClick={() => onSelect(location)}>
            <MapPinIcon className="w-4 h-4 text-gray-500 mr-2" />
            <span className="text-sm text-gray-700">{location}</span>
          </motion.li>)}
      </ul>
    </motion.div>;
};
export default LocationSuggestions;