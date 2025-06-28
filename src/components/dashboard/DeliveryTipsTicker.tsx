import React, { useEffect, useState, useRef } from 'react';
import { CheckCircleIcon, XMarkIcon } from '@heroicons/react/24/outline';
import { motion, AnimatePresence } from 'framer-motion';
import { useLanguage } from '../../context/LanguageContext';
interface DeliveryTip {
  id: number;
  content: string;
}
const DeliveryTipsTicker: React.FC = () => {
  const {
    t,
    direction
  } = useLanguage();
  const [isVisible, setIsVisible] = useState(true);
  const [activeIndex, setActiveIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const tips: DeliveryTip[] = [{
    id: 1,
    content: t('dashboard.scheduleTip')
  }, {
    id: 2,
    content: t('dashboard.insuranceTip')
  }, {
    id: 3,
    content: t('dashboard.addressBookTip')
  }, {
    id: 4,
    content: t('dashboard.trackingTip')
  }, {
    id: 5,
    content: t('dashboard.mobileAppTip')
  }];
  useEffect(() => {
    if (isVisible) {
      // Start the interval when component mounts
      intervalRef.current = setInterval(() => {
        setIsAnimating(true);
        setTimeout(() => {
          setActiveIndex(prevIndex => (prevIndex + 1) % tips.length);
          setIsAnimating(false);
        }, 500); // Wait for exit animation to complete
      }, 4000); // Change tip every 4 seconds (2s display + 2s for animation)
    }
    // Clean up interval on unmount
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [isVisible, tips.length]);
  const handleClose = () => {
    setIsVisible(false);
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  };
  if (!isVisible) return null;
  return <motion.div className="bg-white rounded-xl shadow-sm p-4 border border-gray-200 h-full flex flex-col justify-between" whileHover={{
    boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.1)'
  }} initial={{
    opacity: 0,
    y: 20
  }} animate={{
    opacity: 1,
    y: 0
  }} transition={{
    duration: 0.3
  }}>
      <div className="flex justify-between items-center mb-3">
        <h2 className="text-lg font-bold text-congress-blue-800 flex items-center">
          <span className={`bg-congress-blue-100 p-1 rounded-full ${direction === 'rtl' ? 'ml-2' : 'mr-2'}`}>
            <CheckCircleIcon className="w-4 h-4 text-congress-blue-700" />
          </span>
          {t('dashboard.deliveryTips')}
        </h2>
        <motion.button onClick={handleClose} className="text-gray-400 hover:text-gray-600 transition-colors" aria-label="Close delivery tips" whileHover={{
        scale: 1.1,
        rotate: 90
      }} whileTap={{
        scale: 0.9
      }}>
          <XMarkIcon className="w-5 h-5" />
        </motion.button>
      </div>
      <div className="relative flex-grow">
        <AnimatePresence mode="wait">
          {tips.map((tip, index) => index === activeIndex && <motion.div key={tip.id} className="flex items-start" initial={{
          opacity: 0,
          x: direction === 'rtl' ? -20 : 20
        }} animate={{
          opacity: 1,
          x: 0
        }} exit={{
          opacity: 0,
          x: direction === 'rtl' ? 20 : -20
        }} transition={{
          duration: 0.3
        }}>
                  <div className={`flex-shrink-0 bg-congress-blue-100 rounded-full p-1 mt-0.5 ${direction === 'rtl' ? 'ml-2' : 'mr-2'}`}>
                    <CheckCircleIcon className="w-3 h-3 text-congress-blue-700" />
                  </div>
                  <span className="text-sm text-gray-700">{tip.content}</span>
                </motion.div>)}
        </AnimatePresence>
      </div>
      <div className="flex justify-center mt-3">
        {tips.map((tip, index) => <motion.button key={tip.id} className={`w-1.5 h-1.5 rounded-full mx-1 ${index === activeIndex ? 'bg-congress-blue-600' : 'bg-congress-blue-200'}`} onClick={() => {
        setActiveIndex(index);
        // Reset the interval timer when manually changing
        if (intervalRef.current) {
          clearInterval(intervalRef.current);
          intervalRef.current = setInterval(() => {
            setIsAnimating(true);
            setTimeout(() => {
              setActiveIndex(prevIndex => (prevIndex + 1) % tips.length);
              setIsAnimating(false);
            }, 500);
          }, 4000);
        }
      }} aria-label={`Tip ${index + 1}`} whileHover={{
        scale: 1.5
      }} whileTap={{
        scale: 0.9
      }} animate={index === activeIndex ? {
        scale: [1, 1.2, 1]
      } : {}} transition={{
        duration: 0.3
      }} />)}
      </div>
    </motion.div>;
};
export default DeliveryTipsTicker;