import React, { useState, Children } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useLanguage } from '../context/LanguageContext';
import StatCard from '../components/dashboard/StatCard';
import DeliveryMap from '../components/dashboard/DeliveryMap';
import RecentShipments from '../components/dashboard/RecentShipments';
import WalletTransactions from '../components/dashboard/WalletTransactions';
import ExportReports from '../components/dashboard/ExportReports';
import DeliveryTipsTicker from '../components/dashboard/DeliveryTipsTicker';
import { TruckIcon, ArchiveBoxIcon, CheckCircleIcon, WalletIcon, ArrowDownTrayIcon, ClockIcon, ArrowPathIcon, EllipsisHorizontalIcon } from '@heroicons/react/24/outline';
import Button from '../components/ui/Button';
import { motion } from 'framer-motion';
import FadeIn from '../components/transitions/FadeIn';
import SlideIn from '../components/transitions/SlideIn';
import ScaleIn from '../components/transitions/ScaleIn';
const Dashboard: React.FC = () => {
  const {
    user
  } = useAuth();
  const {
    t,
    language,
    direction
  } = useLanguage();
  // State for active status filters
  const [activeStatuses, setActiveStatuses] = useState<string[]>([]);
  // State for focused shipment
  const [focusedShipment, setFocusedShipment] = useState<string | null>(null);
  // Toggle status filter
  const handleStatusFilter = (status: string) => {
    setActiveStatuses(prev => {
      if (prev.includes(status)) {
        return prev.filter(s => s !== status);
      } else {
        return [...prev, status];
      }
    });
  };
  // Handle view shipment
  const handleViewShipment = (trackingNumber: string) => {
    setFocusedShipment(trackingNumber);
  };
  // Reset filters
  const handleResetFilters = () => {
    setActiveStatuses([]);
    setFocusedShipment(null);
  };
  // Animation variants
  const containerVariants = {
    hidden: {
      opacity: 0
    },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  };
  const itemVariants = {
    hidden: {
      y: 20,
      opacity: 0
    },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: 'spring',
        stiffness: 100,
        damping: 12
      }
    }
  };
  return <motion.div className="container mx-auto px-4 py-6 bg-gray-50 min-h-screen" initial="hidden" animate="visible" variants={containerVariants}>
      <motion.div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8" variants={itemVariants}>
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-congress-blue-800">
            {t('dashboard.title')}
          </h1>
          <p className="text-gray-600">
            {t('dashboard.welcomeBack')}, {user?.name || 'User'}!{' '}
            {t('dashboard.deliveryOverview')}
          </p>
        </div>
        <div className="mt-4 md:mt-0 flex space-x-3">
          <Link to="/booking">
            <Button variant="primary" size="sm">
              <TruckIcon className="w-4 h-4 mr-2" />
              {t('dashboard.newDelivery')}
            </Button>
          </Link>
          <Button variant="outline" size="sm">
            <ArrowDownTrayIcon className="w-4 h-4 mr-2" />
            {t('dashboard.exportData')}
          </Button>
        </div>
      </motion.div>
      {/* Statistics Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
        <ScaleIn delay={0.1}>
          <StatCard title={t('dashboard.totalShipments')} value="158" change="+12%" isPositive={true} icon={<ArchiveBoxIcon className="w-6 h-6" />} color="bg-congress-blue-600" />
        </ScaleIn>
        <ScaleIn delay={0.2}>
          <StatCard title={t('dashboard.activeDeliveries')} value="24" change="+3%" isPositive={true} icon={<TruckIcon className="w-6 h-6" />} color="bg-regent-st-blue-500" />
        </ScaleIn>
        <ScaleIn delay={0.3}>
          <StatCard title={t('dashboard.completedDeliveries')} value="134" change="+18%" isPositive={true} icon={<CheckCircleIcon className="w-6 h-6" />} color="bg-green-500" />
        </ScaleIn>
        <ScaleIn delay={0.4}>
          <StatCard title={t('dashboard.walletTransactions')} value={`250.75 ${language === 'en' ? 'KWD' : 'د.ك'}`} change={`-15.50 ${language === 'en' ? 'KWD' : 'د.ك'}`} isPositive={false} icon={<WalletIcon className="w-6 h-6" />} color="bg-golden-fizz-500" />
        </ScaleIn>
      </div>
      {/* Quick Actions and Delivery Tips on the same line */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
        {/* Quick Actions - Takes up 2/3 of the space */}
        <SlideIn direction="left" delay={0.2} className="lg:col-span-2">
          <div className="bg-white rounded-xl shadow-sm p-4">
            <div className="flex items-center justify-between mb-2">
              <h2 className="text-lg font-bold text-congress-blue-800">
                {t('dashboard.quickActions')}
              </h2>
              <div className="text-sm text-gray-500">
                {t('dashboard.frequentlyUsed')}
              </div>
            </div>
            <div className="flex flex-wrap gap-3">
              <Button variant="outline" size="sm" className="flex items-center justify-center py-2.5">
                <ClockIcon className="w-4 h-4 mr-2" />
                {t('dashboard.scheduleDelivery')}
              </Button>
              <Button variant="outline" size="sm" className="flex items-center justify-center py-2.5">
                <ArchiveBoxIcon className="w-4 h-4 mr-2" />
                {t('dashboard.trackPackage')}
              </Button>
              <Button variant="outline" size="sm" className="flex items-center justify-center py-2.5">
                <WalletIcon className="w-4 h-4 mr-2" />
                {t('dashboard.addFunds')}
              </Button>
              <Button variant="outline" size="sm" className="flex items-center justify-center py-2.5">
                <TruckIcon className="w-4 h-4 mr-2" />
                {t('dashboard.findCourier')}
              </Button>
            </div>
          </div>
        </SlideIn>
        {/* Delivery Tips - Takes up 1/3 of the space */}
        <SlideIn direction="right" delay={0.3}>
          <DeliveryTipsTicker />
        </SlideIn>
      </div>
      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Delivery Map and Shipments - Takes up 2/3 of the grid on large screens */}
        <FadeIn delay={0.4} className="lg:col-span-2">
          <motion.div className="bg-white rounded-xl shadow-sm overflow-hidden" whileHover={{
          boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.1)'
        }} transition={{
          duration: 0.3
        }}>
            <div className="px-6 py-4 border-b border-gray-100 flex justify-between items-center">
              <h2 className="text-lg font-bold text-congress-blue-800">
                {t('dashboard.deliveryLocations')}
              </h2>
              <div className="flex items-center space-x-2 rtl:space-x-reverse">
                <motion.button className="text-gray-400 hover:text-gray-600" onClick={handleResetFilters} title={t('common.reset')} whileTap={{
                scale: 0.95
              }} whileHover={{
                rotate: 180
              }} transition={{
                duration: 0.3
              }}>
                  <ArrowPathIcon className="w-5 h-5" />
                </motion.button>
                <motion.button className="text-gray-400 hover:text-gray-600" whileHover={{
                scale: 1.1
              }} whileTap={{
                scale: 0.95
              }}>
                  <EllipsisHorizontalIcon className="w-5 h-5" />
                </motion.button>
              </div>
            </div>
            {/* Status Filter Chips */}
            <div className="px-6 py-3 bg-gray-50 border-b border-gray-100 flex flex-wrap gap-2">
              <span className={`text-sm font-medium text-gray-700 self-center ${direction === 'rtl' ? 'ml-2' : 'mr-2'}`}>
                {t('common.filterByStatus')}:
              </span>
              <motion.button onClick={() => handleStatusFilter('in-transit')} className={`inline-flex items-center px-3 py-1.5 rounded-full text-xs font-medium bg-blue-100 text-blue-700 border border-blue-200 hover:bg-blue-200 transition-colors ${activeStatuses.includes('in-transit') ? 'ring-2 ring-blue-300' : ''}`} whileHover={{
              scale: 1.05
            }} whileTap={{
              scale: 0.95
            }}>
                <div className={`w-2 h-2 rounded-full bg-blue-500 ${direction === 'rtl' ? 'ml-1.5' : 'mr-1.5'}`}></div>
                {t('dashboard.inTransit')}
              </motion.button>
              <motion.button onClick={() => handleStatusFilter('delivered')} className={`inline-flex items-center px-3 py-1.5 rounded-full text-xs font-medium bg-green-100 text-green-700 border border-green-200 hover:bg-green-200 transition-colors ${activeStatuses.includes('delivered') ? 'ring-2 ring-green-300' : ''}`} whileHover={{
              scale: 1.05
            }} whileTap={{
              scale: 0.95
            }}>
                <div className={`w-2 h-2 rounded-full bg-green-500 ${direction === 'rtl' ? 'ml-1.5' : 'mr-1.5'}`}></div>
                {t('dashboard.delivered')}
              </motion.button>
              <motion.button onClick={() => handleStatusFilter('pending')} className={`inline-flex items-center px-3 py-1.5 rounded-full text-xs font-medium bg-amber-100 text-amber-700 border border-amber-200 hover:bg-amber-200 transition-colors ${activeStatuses.includes('pending') ? 'ring-2 ring-amber-300' : ''}`} whileHover={{
              scale: 1.05
            }} whileTap={{
              scale: 0.95
            }}>
                <div className={`w-2 h-2 rounded-full bg-amber-500 ${direction === 'rtl' ? 'ml-1.5' : 'mr-1.5'}`}></div>
                {t('dashboard.pending')}
              </motion.button>
              <motion.button onClick={() => handleStatusFilter('failed')} className={`inline-flex items-center px-3 py-1.5 rounded-full text-xs font-medium bg-red-100 text-red-700 border border-red-200 hover:bg-red-200 transition-colors ${activeStatuses.includes('failed') ? 'ring-2 ring-red-300' : ''}`} whileHover={{
              scale: 1.05
            }} whileTap={{
              scale: 0.95
            }}>
                <div className={`w-2 h-2 rounded-full bg-red-500 ${direction === 'rtl' ? 'ml-1.5' : 'mr-1.5'}`}></div>
                {t('dashboard.failed')}
              </motion.button>
              {activeStatuses.length > 0 && <motion.button onClick={handleResetFilters} className="inline-flex items-center px-3 py-1.5 rounded-full text-xs font-medium bg-gray-100 text-gray-700 border border-gray-200 hover:bg-gray-200 transition-colors" initial={{
              opacity: 0,
              scale: 0.8
            }} animate={{
              opacity: 1,
              scale: 1
            }} exit={{
              opacity: 0,
              scale: 0.8
            }} whileHover={{
              scale: 1.05
            }} whileTap={{
              scale: 0.95
            }}>
                  {t('common.clearFilters')}
                </motion.button>}
            </div>
            {/* Map */}
            <div className="px-6 pt-6">
              <DeliveryMap height="350px" activeStatuses={activeStatuses} focusedShipment={focusedShipment} onMarkerClick={handleViewShipment} />
            </div>
            {/* Shipments Table */}
            <div className="mt-6 relative">
              <RecentShipments onViewShipment={handleViewShipment} activeStatuses={activeStatuses} onStatusFilter={handleStatusFilter} />
            </div>
            <div className="px-6 py-4 border-t border-gray-100 bg-gray-50 flex justify-between items-center">
              <span className="text-sm text-gray-600">
                {t('common.showingResults', {
                count: '5',
                total: '42'
              }).replace('{count}', '5').replace('{total}', '42')}
              </span>
              <Button variant="outline" size="sm">
                {t('common.viewAll')}
              </Button>
            </div>
          </motion.div>
        </FadeIn>
        {/* Sidebar - Takes up 1/3 of the grid on large screens */}
        <div className="space-y-6">
          {/* Wallet Transactions */}
          <SlideIn direction="right" delay={0.5}>
            <WalletTransactions />
          </SlideIn>
          {/* Export Reports */}
          <SlideIn direction="right" delay={0.6}>
            <ExportReports />
          </SlideIn>
        </div>
      </div>
    </motion.div>;
};
export default Dashboard;