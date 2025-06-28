import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { TruckIcon } from '@heroicons/react/24/outline';
interface RouteVisualizationProps {
  pickup: string;
  delivery: string;
}
const RouteVisualization: React.FC<RouteVisualizationProps> = ({
  pickup,
  delivery
}) => {
  const [progress, setProgress] = useState(0);
  // Animate the route when pickup and delivery are both set
  useEffect(() => {
    if (pickup && delivery) {
      setProgress(0);
      const timer = setTimeout(() => {
        setProgress(100);
      }, 300);
      return () => clearTimeout(timer);
    }
  }, [pickup, delivery]);
  if (!pickup || !delivery) return null;
  return <div className="py-4 px-2">
      <div className="relative h-16">
        {/* Route line */}
        <div className="absolute top-1/2 left-0 right-0 h-1 bg-gray-200 transform -translate-y-1/2 rounded-full">
          <motion.div className="h-full bg-congress-blue-500 rounded-full" initial={{
          width: '0%'
        }} animate={{
          width: `${progress}%`
        }} transition={{
          duration: 1.5,
          ease: 'easeInOut'
        }} />
        </div>
        {/* Pickup point */}
        <motion.div className="absolute top-1/2 left-0 w-4 h-4 bg-congress-blue-600 rounded-full transform -translate-y-1/2 -translate-x-1/2 border-2 border-white" initial={{
        scale: 0
      }} animate={{
        scale: 1
      }} transition={{
        delay: 0.2,
        type: 'spring'
      }} />
        {/* Delivery point */}
        <motion.div className="absolute top-1/2 right-0 w-4 h-4 bg-congress-blue-600 rounded-full transform -translate-y-1/2 translate-x-1/2 border-2 border-white" initial={{
        scale: 0
      }} animate={{
        scale: 1
      }} transition={{
        delay: 0.4,
        type: 'spring'
      }} />
        {/* Moving truck */}
        <motion.div className="absolute top-1/2 transform -translate-y-1/2 -translate-x-1/2" initial={{
        left: '0%'
      }} animate={{
        left: `${progress}%`
      }} transition={{
        duration: 1.5,
        ease: 'easeInOut'
      }}>
          <TruckIcon className="w-8 h-8 text-congress-blue-700" />
        </motion.div>
        {/* Location labels */}
        <div className="absolute top-0 left-0 text-xs font-medium text-gray-600 max-w-[120px] truncate">
          {pickup.split(',')[0]}
        </div>
        <div className="absolute top-0 right-0 text-xs font-medium text-gray-600 max-w-[120px] truncate text-right">
          {delivery.split(',')[0]}
        </div>
      </div>
    </div>;
};
export default RouteVisualization;