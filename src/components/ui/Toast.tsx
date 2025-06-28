import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { XMarkIcon } from '@heroicons/react/24/outline';
import { CheckCircleIcon, ExclamationCircleIcon, InformationCircleIcon } from '@heroicons/react/24/solid';
export type ToastType = 'success' | 'error' | 'info' | 'warning';
interface ToastProps {
  id: string;
  type: ToastType;
  message: string;
  duration?: number;
  onClose: (id: string) => void;
}
const Toast: React.FC<ToastProps> = ({
  id,
  type,
  message,
  duration = 5000,
  onClose
}) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose(id);
    }, duration);
    return () => clearTimeout(timer);
  }, [id, duration, onClose]);
  const getIcon = () => {
    switch (type) {
      case 'success':
        return <CheckCircleIcon className="w-5 h-5 text-white" />;
      case 'error':
        return <ExclamationCircleIcon className="w-5 h-5 text-white" />;
      case 'warning':
        return <ExclamationCircleIcon className="w-5 h-5 text-white" />;
      case 'info':
        return <InformationCircleIcon className="w-5 h-5 text-white" />;
    }
  };
  const getBackgroundColor = () => {
    switch (type) {
      case 'success':
        return 'bg-green-500';
      case 'error':
        return 'bg-red-500';
      case 'warning':
        return 'bg-amber-500';
      case 'info':
        return 'bg-congress-blue-500';
    }
  };
  return <motion.div className={`flex items-center p-4 mb-3 rounded-lg shadow-lg max-w-md w-full ${getBackgroundColor()} text-white`} initial={{
    opacity: 0,
    y: 50,
    scale: 0.8
  }} animate={{
    opacity: 1,
    y: 0,
    scale: 1
  }} exit={{
    opacity: 0,
    scale: 0.8,
    transition: {
      duration: 0.2
    }
  }} layout>
      <div className="p-2 rounded-full bg-white bg-opacity-20 mr-3">
        {getIcon()}
      </div>
      <p className="flex-1 text-sm font-medium">{message}</p>
      <motion.button onClick={() => onClose(id)} className="ml-3 p-1 rounded-full hover:bg-white hover:bg-opacity-20" whileHover={{
      scale: 1.1
    }} whileTap={{
      scale: 0.9
    }}>
        <XMarkIcon className="w-5 h-5 text-white" />
      </motion.button>
    </motion.div>;
};
export default Toast;