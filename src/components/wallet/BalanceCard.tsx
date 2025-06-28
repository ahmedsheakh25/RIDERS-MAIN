import React, { useEffect, useState } from 'react';
import { motion, useMotionValue, useTransform, animate } from 'framer-motion';
import { useLanguage } from '../../context/LanguageContext';
import { ArrowUpIcon, ArrowDownIcon, TruckIcon } from '@heroicons/react/24/outline';
interface BalanceCardProps {
  balance: number;
}
const BalanceCard: React.FC<BalanceCardProps> = ({
  balance
}) => {
  const {
    t,
    language,
    direction
  } = useLanguage();
  // Mock data for recent transactions
  const recentDeposit = 50.0;
  const recentPayment = 15.5;
  const pendingDeliveries = 3;
  // Counter animation setup
  const count = useMotionValue(0);
  const [displayBalance, setDisplayBalance] = useState('0.000');
  useEffect(() => {
    const animation = animate(count, balance, {
      duration: 1.5,
      ease: 'easeOut',
      onUpdate: latest => {
        setDisplayBalance(latest.toFixed(3));
      }
    });
    return animation.stop;
  }, [balance, count]);
  return <motion.div className="bg-white rounded-xl shadow-sm border border-gray-200 mb-6 overflow-hidden" initial={{
    opacity: 0,
    y: 20
  }} animate={{
    opacity: 1,
    y: 0
  }} transition={{
    duration: 0.4
  }} whileHover={{
    boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.1)',
    y: -3
  }}>
      <div className="bg-gradient-to-r from-blue-400 to-blue-500 p-6 text-white relative overflow-hidden">
        <div className="flex justify-between items-center relative z-10">
          <h2 className="text-xl font-medium opacity-90">
            {t('wallet.currentBalance')}
          </h2>
          <div className="text-sm bg-white bg-opacity-20 px-3 py-1 rounded-full">
            {t('wallet.shippingWallet')}
          </div>
        </div>
        <div className="flex items-center mt-4 relative z-10">
          {/* Cash Icon next to the balance text */}
          <motion.div className={`${direction === 'rtl' ? 'ml-3' : 'mr-3'} w-12 h-12 md:w-14 md:h-14 flex-shrink-0`} initial={{
          y: 10,
          opacity: 0,
          rotate: -10
        }} animate={{
          y: 0,
          opacity: 1,
          rotate: 0
        }} transition={{
          delay: 0.2,
          duration: 0.5,
          type: 'spring',
          stiffness: 100
        }} whileHover={{
          y: -3,
          rotate: 5,
          transition: {
            duration: 0.2
          }
        }}>
            <img src="/Cash.png" alt="Cash stack" className="w-full h-full object-contain" />
          </motion.div>
          <motion.div className="text-4xl md:text-5xl font-bold" initial={{
          scale: 0.9
        }} animate={{
          scale: 1
        }} transition={{
          type: 'spring',
          stiffness: 200,
          damping: 15
        }}>
            {displayBalance} {language === 'en' ? 'KWD' : 'د.ك'}
          </motion.div>
        </div>
        {/* Decorative background elements */}
        <motion.div className="absolute top-0 right-0 w-64 h-64 bg-white opacity-5 rounded-full -mr-32 -mt-32" animate={{
        scale: [1, 1.05, 1],
        opacity: [0.05, 0.07, 0.05]
      }} transition={{
        duration: 8,
        repeat: Infinity,
        repeatType: 'reverse'
      }} />
        <motion.div className="absolute bottom-0 left-0 w-40 h-40 bg-white opacity-5 rounded-full -ml-20 -mb-20" animate={{
        scale: [1, 1.1, 1],
        opacity: [0.05, 0.08, 0.05]
      }} transition={{
        duration: 6,
        repeat: Infinity,
        repeatType: 'reverse',
        delay: 1
      }} />
      </div>
      <div className="p-4 grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="flex items-center p-3 bg-gray-50 rounded-lg">
          <div className={`p-2 bg-green-100 rounded-full ${direction === 'rtl' ? 'ml-3' : 'mr-3'}`}>
            <ArrowDownIcon className="w-4 h-4 text-green-600" />
          </div>
          <div>
            <div className="text-xs text-gray-500">
              {t('wallet.lastDeposit')}
            </div>
            <div className="font-medium text-green-600">
              +{recentDeposit.toFixed(3)} {language === 'en' ? 'KWD' : 'د.ك'}
            </div>
          </div>
        </div>
        <div className="flex items-center p-3 bg-gray-50 rounded-lg">
          <div className={`p-2 bg-red-100 rounded-full ${direction === 'rtl' ? 'ml-3' : 'mr-3'}`}>
            <ArrowUpIcon className="w-4 h-4 text-red-600" />
          </div>
          <div>
            <div className="text-xs text-gray-500">
              {t('wallet.lastPayment')}
            </div>
            <div className="font-medium text-red-600">
              -{recentPayment.toFixed(3)} {language === 'en' ? 'KWD' : 'د.ك'}
            </div>
          </div>
        </div>
        <div className="flex items-center p-3 bg-gray-50 rounded-lg">
          <div className={`p-2 bg-blue-100 rounded-full ${direction === 'rtl' ? 'ml-3' : 'mr-3'}`}>
            <TruckIcon className="w-4 h-4 text-blue-600" />
          </div>
          <div>
            <div className="text-xs text-gray-500">
              {t('wallet.pendingDeliveries')}
            </div>
            <div className="font-medium text-gray-700">{pendingDeliveries}</div>
          </div>
        </div>
      </div>
    </motion.div>;
};
export default BalanceCard;