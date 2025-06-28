import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useLanguage } from '../../context/LanguageContext';
import { useAuth } from '../../context/AuthContext';
import { HomeIcon, UserIcon, TruckIcon, PlusCircleIcon, WalletIcon, MapPinIcon } from '@heroicons/react/24/outline';
import { HomeIcon as HomeIconSolid, UserIcon as UserIconSolid, WalletIcon as WalletIconSolid, MapPinIcon as MapPinIconSolid } from '@heroicons/react/24/solid';
const MobileNav: React.FC = () => {
  const {
    t
  } = useLanguage();
  const {
    isAuthenticated
  } = useAuth();
  const location = useLocation();
  // If user is not authenticated, don't show the bottom navigation
  if (!isAuthenticated) {
    return null;
  }
  const isActive = (path: string) => {
    return location.pathname === path;
  };
  const buttonVariants = {
    rest: {
      scale: 1
    },
    hover: {
      scale: 1.1
    },
    tap: {
      scale: 0.9
    }
  };
  const centerButtonVariants = {
    rest: {
      scale: 1,
      y: 0
    },
    hover: {
      scale: 1.1,
      y: -5
    },
    tap: {
      scale: 0.95,
      y: 0
    }
  };
  return <div className="fixed bottom-0 left-0 right-0 px-4 pb-6 pt-2 z-40 md:hidden flex justify-center items-center">
      <motion.div className="bg-white rounded-full shadow-lg w-full px-2 py-3 flex items-center justify-around" initial={{
      y: 100
    }} animate={{
      y: 0
    }} transition={{
      type: 'spring',
      stiffness: 300,
      damping: 30
    }}>
        <Link to="/dashboard">
          <motion.div className="flex flex-col items-center p-2 relative" variants={buttonVariants} initial="rest" whileHover="hover" whileTap="tap">
            {isActive('/dashboard') ? <>
                <HomeIconSolid className="w-6 h-6 text-congress-blue-600" />
                <div className="w-1.5 h-1.5 rounded-full bg-congress-blue-600 absolute -bottom-1"></div>
              </> : <HomeIcon className="w-6 h-6 text-gray-500" />}
          </motion.div>
        </Link>
        <Link to="/wallet">
          <motion.div className="flex flex-col items-center p-2 relative" variants={buttonVariants} initial="rest" whileHover="hover" whileTap="tap">
            {isActive('/wallet') ? <>
                <WalletIconSolid className="w-6 h-6 text-congress-blue-600" />
                <div className="w-1.5 h-1.5 rounded-full bg-congress-blue-600 absolute -bottom-1"></div>
              </> : <WalletIcon className="w-6 h-6 text-gray-500" />}
          </motion.div>
        </Link>
        {/* Center button with elevated design */}
        <Link to="/booking">
          <motion.div className="relative -top-7 flex flex-col items-center" variants={centerButtonVariants} initial="rest" whileHover="hover" whileTap="tap">
            <motion.div className="bg-congress-blue-600 text-white p-3 rounded-full shadow-lg" whileHover={{
            boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.2)'
          }}>
              <PlusCircleIcon className="w-8 h-8" />
            </motion.div>
            {isActive('/booking') && <div className="w-1.5 h-1.5 rounded-full bg-congress-blue-600 mt-1"></div>}
          </motion.div>
        </Link>
        <Link to="/address-book">
          <motion.div className="flex flex-col items-center p-2 relative" variants={buttonVariants} initial="rest" whileHover="hover" whileTap="tap">
            {isActive('/address-book') ? <>
                <MapPinIconSolid className="w-6 h-6 text-congress-blue-600" />
                <div className="w-1.5 h-1.5 rounded-full bg-congress-blue-600 absolute -bottom-1"></div>
              </> : <MapPinIcon className="w-6 h-6 text-gray-500" />}
          </motion.div>
        </Link>
        <Link to="/account/settings">
          <motion.div className="flex flex-col items-center p-2 relative" variants={buttonVariants} initial="rest" whileHover="hover" whileTap="tap">
            {isActive('/account/settings') ? <>
                <UserIconSolid className="w-6 h-6 text-congress-blue-600" />
                <div className="w-1.5 h-1.5 rounded-full bg-congress-blue-600 absolute -bottom-1"></div>
              </> : <UserIcon className="w-6 h-6 text-gray-500" />}
          </motion.div>
        </Link>
      </motion.div>
    </div>;
};
export default MobileNav;