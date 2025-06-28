import React from 'react';
import { motion } from 'framer-motion';
import { MapPinIcon, PencilIcon, TrashIcon, StarIcon } from '@heroicons/react/24/outline';
import { StarIcon as StarSolidIcon } from '@heroicons/react/24/solid';
interface Address {
  id: string;
  name: string;
  contactPerson: string;
  phoneNumber: string;
  address: string;
  type: 'residential' | 'business' | 'other';
  isDefault: boolean;
  coordinates?: {
    lat: number;
    lng: number;
  };
}
interface AddressCardProps {
  address: Address;
  onEdit: () => void;
  onDelete: () => void;
  onSetDefault: () => void;
}
const AddressCard: React.FC<AddressCardProps> = ({
  address,
  onEdit,
  onDelete,
  onSetDefault
}) => {
  const getTypeColor = () => {
    switch (address.type) {
      case 'residential':
        return 'bg-regent-st-blue-100 text-regent-st-blue-700';
      case 'business':
        return 'bg-congress-blue-100 text-congress-blue-700';
      case 'other':
        return 'bg-gray-100 text-gray-700';
    }
  };
  return <motion.div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden" whileHover={{
    y: -5,
    boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.1)'
  }} initial={{
    opacity: 0,
    y: 20
  }} animate={{
    opacity: 1,
    y: 0
  }} transition={{
    type: 'spring',
    stiffness: 100,
    damping: 15
  }}>
      <div className="p-5 flex flex-col h-full">
        <div className="flex justify-between items-start mb-3">
          <div className="flex items-center">
            <motion.div className={`p-2 rounded-full ${getTypeColor()} mr-3`} whileHover={{
            rotate: 15
          }}>
              <MapPinIcon className="w-5 h-5" />
            </motion.div>
            <h3 className="font-semibold text-gray-800">{address.name}</h3>
          </div>
          <div className="flex items-center">
            {address.isDefault ? <motion.div className="text-golden-fizz-500" initial={{
            rotate: -30,
            scale: 0
          }} animate={{
            rotate: 0,
            scale: 1
          }} transition={{
            type: 'spring',
            stiffness: 200
          }}>
                <StarSolidIcon className="w-5 h-5" />
              </motion.div> : <motion.button onClick={onSetDefault} className="text-gray-400 hover:text-golden-fizz-500" whileHover={{
            scale: 1.2,
            rotate: 5
          }} whileTap={{
            scale: 0.9
          }}>
                <StarIcon className="w-5 h-5" />
              </motion.button>}
          </div>
        </div>
        <div className="flex-grow">
          <div className="text-sm text-gray-600 mb-1">
            <span className="font-medium">{address.contactPerson}</span>
          </div>
          <div className="text-sm text-gray-600 mb-2">
            {address.phoneNumber}
          </div>
          <div className="text-sm text-gray-600">{address.address}</div>
        </div>
        <div className="flex justify-end mt-4 pt-3 border-t border-gray-100">
          <motion.button onClick={onEdit} className="p-2 text-gray-400 hover:text-congress-blue-600 rounded-full hover:bg-gray-100 mr-2" whileHover={{
          scale: 1.1,
          backgroundColor: 'rgba(243, 244, 246, 1)'
        }} whileTap={{
          scale: 0.9
        }}>
            <PencilIcon className="w-4 h-4" />
          </motion.button>
          <motion.button onClick={onDelete} className="p-2 text-gray-400 hover:text-red-500 rounded-full hover:bg-gray-100" whileHover={{
          scale: 1.1,
          backgroundColor: 'rgba(243, 244, 246, 1)'
        }} whileTap={{
          scale: 0.9
        }}>
            <TrashIcon className="w-4 h-4" />
          </motion.button>
        </div>
      </div>
    </motion.div>;
};
export default AddressCard;