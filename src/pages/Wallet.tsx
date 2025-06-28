import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLanguage } from '../context/LanguageContext';
import { useToast } from '../context/ToastContext';
import TransactionsTab from '../components/wallet/TransactionsTab';
import PaymentMethodsTab from '../components/wallet/PaymentMethodsTab';
import ReportsTab from '../components/wallet/ReportsTab';
import AddFundsModal from '../components/wallet/AddFundsModal';
import BalanceCard from '../components/wallet/BalanceCard';
import { ArrowPathIcon, PlusIcon } from '@heroicons/react/24/outline';
import Button from '../components/ui/Button';
type WalletTab = 'transactions' | 'payment-methods' | 'reports';
const Wallet: React.FC = () => {
  const {
    t,
    language,
    direction
  } = useLanguage();
  const {
    showToast
  } = useToast();
  const [activeTab, setActiveTab] = useState<WalletTab>('transactions');
  const [isAddFundsModalOpen, setIsAddFundsModalOpen] = useState(false);
  // Mock wallet data
  const walletBalance = 250.75;
  const lastDeposit = 50.0;
  const lastPayment = 15.5;
  const pendingDeliveries = 3;
  const handleOpenAddFundsModal = () => {
    setIsAddFundsModalOpen(true);
  };
  const handleCloseAddFundsModal = () => {
    setIsAddFundsModalOpen(false);
  };
  const handleAddFunds = (amount: number) => {
    // In a real app, this would call an API to add funds
    showToast('info', `${t('wallet.addingFunds')} ${amount} ${language === 'en' ? 'KWD' : 'د.ك'}...`);
    // Simulate API call delay
    setTimeout(() => {
      showToast('success', `${t('wallet.fundsAdded')} ${amount} ${language === 'en' ? 'KWD' : 'د.ك'}`);
      setIsAddFundsModalOpen(false);
    }, 1500);
  };
  const handleRefresh = () => {
    showToast('info', t('wallet.refreshing'), 2000);
  };
  return <div className="container mx-auto px-4 py-8 bg-gray-50 min-h-screen">
      <h1 className="text-3xl font-bold text-congress-blue-700 mb-8">
        {t('wallet.title')}
      </h1>
      {/* Wallet Balance Card - Using the BalanceCard component */}
      <div className="mb-6 flex justify-end">
        <div className="flex space-x-2">
          <Button variant="outline" size="sm" onClick={handleRefresh}>
            <ArrowPathIcon className="w-4 h-4 mr-1" />
            {t('wallet.refresh')}
          </Button>
          <Button variant="primary" size="sm" onClick={handleOpenAddFundsModal}>
            <PlusIcon className="w-4 h-4 mr-1" />
            {t('wallet.addFunds')}
          </Button>
        </div>
      </div>
      <BalanceCard balance={walletBalance} />
      {/* Tabs */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="flex overflow-x-auto scrollbar-hide border-b border-gray-200">
          <button className={`px-4 sm:px-6 py-3 text-sm font-medium whitespace-nowrap flex-1 ${activeTab === 'transactions' ? 'text-congress-blue-600 border-b-2 border-congress-blue-600' : 'text-gray-500 hover:text-gray-700'}`} onClick={() => setActiveTab('transactions')}>
            {t('wallet.transactions')}
          </button>
          <button className={`px-4 sm:px-6 py-3 text-sm font-medium whitespace-nowrap flex-1 ${activeTab === 'payment-methods' ? 'text-congress-blue-600 border-b-2 border-congress-blue-600' : 'text-gray-500 hover:text-gray-700'}`} onClick={() => setActiveTab('payment-methods')}>
            {t('wallet.paymentMethods')}
          </button>
          <button className={`px-4 sm:px-6 py-3 text-sm font-medium whitespace-nowrap flex-1 ${activeTab === 'reports' ? 'text-congress-blue-600 border-b-2 border-congress-blue-600' : 'text-gray-500 hover:text-gray-700'}`} onClick={() => setActiveTab('reports')}>
            {t('wallet.reports.title')}
          </button>
        </div>
        <div className="p-4 sm:p-6">
          <AnimatePresence mode="wait">
            <motion.div key={activeTab} initial={{
            opacity: 0,
            y: 5
          }} animate={{
            opacity: 1,
            y: 0
          }} exit={{
            opacity: 0,
            y: -5
          }} transition={{
            duration: 0.15
          }} className="w-full">
              {activeTab === 'transactions' && <TransactionsTab />}
              {activeTab === 'payment-methods' && <PaymentMethodsTab />}
              {activeTab === 'reports' && <ReportsTab />}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
      {/* Add Funds Modal */}
      <AddFundsModal isOpen={isAddFundsModalOpen} onClose={handleCloseAddFundsModal} onAddFunds={handleAddFunds} />
    </div>;
};
export default Wallet;