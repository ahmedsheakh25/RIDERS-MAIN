import React from 'react';
import { motion } from 'framer-motion';
import { TrashIcon } from '@heroicons/react/24/outline';
interface PaymentCardProps {
  cardType: string;
  last4: string;
  expiry: string;
  onRemove: () => void;
}
const PaymentCard: React.FC<PaymentCardProps> = ({
  cardType,
  last4,
  expiry,
  onRemove
}) => {
  // Replace external image URLs with custom card icon components
  const renderCardIcon = () => {
    switch (cardType.toLowerCase()) {
      case 'visa':
        return <div className="h-8 w-12 bg-white flex items-center justify-center rounded">
            <div className="text-blue-700 font-bold tracking-wider text-lg">
              VISA
            </div>
          </div>;
      case 'mastercard':
        return <div className="h-8 w-12 bg-white flex items-center justify-center rounded">
            <div className="flex items-center">
              <div className="w-5 h-5 bg-red-500 rounded-full opacity-90 mr-1"></div>
              <div className="w-5 h-5 bg-yellow-500 rounded-full opacity-90 -ml-2"></div>
            </div>
          </div>;
      case 'amex':
        return <div className="h-8 w-12 bg-blue-500 flex items-center justify-center rounded">
            <div className="text-white font-bold text-xs">AMEX</div>
          </div>;
      default:
        return <div className="h-8 w-12 bg-gray-100 flex items-center justify-center rounded">
            <div className="text-gray-700 font-bold text-xs">CARD</div>
          </div>;
    }
  };
  return <motion.div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg border border-gray-200" whileHover={{
    y: -2,
    boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
    backgroundColor: 'rgba(249, 250, 251, 1)'
  }} initial={{
    opacity: 0,
    y: 10
  }} animate={{
    opacity: 1,
    y: 0
  }} transition={{
    type: 'spring',
    stiffness: 300,
    damping: 20
  }}>
      <div className="flex items-center">
        <motion.div className="mr-3" whileHover={{
        scale: 1.1
      }}>
          {renderCardIcon()}
        </motion.div>
        <div>
          <div className="text-sm font-medium text-gray-800">
            •••• •••• •••• {last4}
          </div>
          <div className="text-xs text-gray-500">Expires {expiry}</div>
        </div>
      </div>
      <motion.button onClick={onRemove} className="p-2 text-gray-400 hover:text-red-500 rounded-full hover:bg-red-50" whileHover={{
      scale: 1.1,
      backgroundColor: 'rgba(254, 226, 226, 0.5)'
    }} whileTap={{
      scale: 0.9
    }}>
        <TrashIcon className="w-4 h-4" />
      </motion.button>
    </motion.div>;
};
export default PaymentCard;