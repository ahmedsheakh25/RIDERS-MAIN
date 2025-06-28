import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { PhoneIcon, ArrowRightIcon, ClockIcon } from '@heroicons/react/24/outline';
import LocationInput from './LocationInput';
import RouteVisualization from './RouteVisualization';
import { useLanguage } from '../../context/LanguageContext';
const RouteBuilder: React.FC = () => {
  const [pickup, setPickup] = useState('');
  const [delivery, setDelivery] = useState('');
  const [distance, setDistance] = useState<string | null>(null);
  const [time, setTime] = useState<string | null>(null);
  const navigate = useNavigate();
  const {
    t,
    direction
  } = useLanguage();
  // Calculate mock distance and time when both locations are set
  useEffect(() => {
    if (pickup && delivery) {
      // Mock calculation - in a real app, this would be an API call
      const mockDistance = Math.floor(Math.random() * 15) + 5; // 5-20 km
      const mockTime = Math.floor(mockDistance * 3) + 10; // 10-70 minutes
      // Delay to simulate API call
      const timer = setTimeout(() => {
        setDistance(`${mockDistance} km`);
        setTime(`${mockTime} min`);
      }, 800);
      return () => clearTimeout(timer);
    } else {
      setDistance(null);
      setTime(null);
    }
  }, [pickup, delivery]);
  const handleCallDriver = () => {
    navigate('/signin');
  };
  const isFormValid = pickup && delivery;
  return <motion.div className="bg-white rounded-2xl shadow-xl p-6 md:p-8 w-full max-w-2xl mx-auto relative z-10" initial={{
    opacity: 0,
    y: 20
  }} animate={{
    opacity: 1,
    y: 0
  }} transition={{
    duration: 0.5,
    type: 'spring',
    damping: 20
  }}>
      <motion.h2 className="text-3xl font-bold text-center text-congress-blue-800 mb-6" initial={{
      opacity: 0,
      y: -10
    }} animate={{
      opacity: 1,
      y: 0
    }} transition={{
      delay: 0.2,
      duration: 0.4
    }}>
        {t('common.setDeliveryPath')}
      </motion.h2>
      <div className="space-y-4">
        <LocationInput label={t('common.pickupFrom')} value={pickup} onChange={setPickup} onSelect={setPickup} placeholder={t('common.enterPickupLocation')} />
        <LocationInput label={t('common.deliverTo')} value={delivery} onChange={setDelivery} onSelect={setDelivery} placeholder={t('common.enterDeliveryLocation')} />
        <RouteVisualization pickup={pickup} delivery={delivery} />
        {/* Distance and time estimate */}
        <AnimatedEstimate distance={distance} time={time} />
        <motion.button className={`w-full py-4 px-6 bg-congress-blue-600 text-white rounded-xl font-semibold text-lg shadow-md hover:bg-congress-blue-700 transition-colors flex items-center justify-center ${!isFormValid ? 'opacity-70 cursor-not-allowed' : ''}`} onClick={handleCallDriver} disabled={!isFormValid} whileHover={isFormValid ? {
        scale: 1.02
      } : {}} whileTap={isFormValid ? {
        scale: 0.98
      } : {}} initial={{
        opacity: 0
      }} animate={{
        opacity: 1
      }} transition={{
        delay: 0.6
      }}>
          <PhoneIcon className={`w-5 h-5 ${direction === 'rtl' ? 'ml-2' : 'mr-2'}`} />
          {t('common.callDriverNow')}
        </motion.button>
      </div>
    </motion.div>;
};
// Animated estimate component
const AnimatedEstimate: React.FC<{
  distance: string | null;
  time: string | null;
}> = ({
  distance,
  time
}) => {
  if (!distance || !time) return null;
  return <motion.div className="flex justify-center items-center space-x-6 rtl:space-x-reverse py-2" initial={{
    opacity: 0,
    y: 10
  }} animate={{
    opacity: 1,
    y: 0
  }} transition={{
    duration: 0.4
  }}>
      <div className="flex items-center text-gray-700">
        <ArrowRightIcon className="w-4 h-4 mr-1 text-congress-blue-600" />
        <span className="text-sm font-medium">{distance}</span>
      </div>
      <div className="h-4 w-px bg-gray-300"></div>
      <div className="flex items-center text-gray-700">
        <ClockIcon className="w-4 h-4 mr-1 text-congress-blue-600" />
        <span className="text-sm font-medium">{time}</span>
      </div>
    </motion.div>;
};
export default RouteBuilder;