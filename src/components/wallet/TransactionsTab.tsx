import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLanguage } from '../../context/LanguageContext';
import { ArrowUpIcon, ArrowDownIcon, FunnelIcon, XMarkIcon, CalendarIcon, BanknotesIcon, TruckIcon, ShoppingBagIcon, CreditCardIcon } from '@heroicons/react/24/outline';
type TransactionType = 'all' | 'income' | 'expense' | 'delivery' | 'refund';
interface Transaction {
  id: string;
  date: string;
  amount: number;
  type: 'income' | 'expense' | 'delivery' | 'refund';
  description: string;
  category: string;
}
const TransactionsTab: React.FC = () => {
  const {
    t,
    language,
    direction
  } = useLanguage();
  const [activeFilter, setActiveFilter] = useState<TransactionType>('all');
  const [showFilters, setShowFilters] = useState(false);
  // Mock transaction data
  const transactions: Transaction[] = [{
    id: 'txn-1',
    date: '2023-05-15',
    amount: 45.0,
    type: 'expense',
    description: 'Payment for delivery SHP-1234',
    category: 'delivery'
  }, {
    id: 'txn-2',
    date: '2023-05-14',
    amount: 100.0,
    type: 'income',
    description: 'Wallet top-up',
    category: 'deposit'
  }, {
    id: 'txn-3',
    date: '2023-05-12',
    amount: 35.5,
    type: 'expense',
    description: 'Payment for delivery SHP-1236',
    category: 'delivery'
  }, {
    id: 'txn-4',
    date: '2023-05-10',
    amount: 50.0,
    type: 'refund',
    description: 'Refund for cancelled delivery',
    category: 'refund'
  }, {
    id: 'txn-5',
    date: '2023-05-08',
    amount: 75.0,
    type: 'income',
    description: 'Bank transfer',
    category: 'deposit'
  }, {
    id: 'txn-6',
    date: '2023-05-05',
    amount: 25.0,
    type: 'expense',
    description: 'Express delivery fee',
    category: 'delivery'
  }, {
    id: 'txn-7',
    date: '2023-05-02',
    amount: 15.0,
    type: 'refund',
    description: 'Partial refund - SHP-1120',
    category: 'refund'
  }];
  // Filter transactions based on active filter
  const filteredTransactions = transactions.filter(transaction => {
    if (activeFilter === 'all') return true;
    return transaction.type === activeFilter;
  });
  // Get transaction icon based on category
  const getTransactionIcon = (category: string) => {
    switch (category) {
      case 'deposit':
        return <BanknotesIcon className="w-5 h-5" />;
      case 'delivery':
        return <TruckIcon className="w-5 h-5" />;
      case 'refund':
        return <CreditCardIcon className="w-5 h-5" />;
      default:
        return <ShoppingBagIcon className="w-5 h-5" />;
    }
  };
  // Group transactions by date
  const groupedTransactions: {
    [key: string]: Transaction[];
  } = {};
  filteredTransactions.forEach(transaction => {
    if (!groupedTransactions[transaction.date]) {
      groupedTransactions[transaction.date] = [];
    }
    groupedTransactions[transaction.date].push(transaction);
  });
  // Format date for display
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat(language === 'en' ? 'en-US' : 'ar-KW', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    }).format(date);
  };
  return <div>
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-semibold text-gray-800">
          {t('wallet.transactions')}
        </h3>
        <button onClick={() => setShowFilters(!showFilters)} className="flex items-center text-sm text-gray-600 hover:text-gray-800">
          <FunnelIcon className={`w-4 h-4 ${direction === 'rtl' ? 'ml-1' : 'mr-1'}`} />
          {t('common.filter')}
        </button>
      </div>
      {/* Filters */}
      <AnimatePresence>
        {showFilters && <motion.div initial={{
        opacity: 0,
        height: 0
      }} animate={{
        opacity: 1,
        height: 'auto'
      }} exit={{
        opacity: 0,
        height: 0
      }} transition={{
        duration: 0.3
      }} className="mb-4 overflow-hidden">
            <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
              <div className="flex justify-between items-center mb-3">
                <h4 className="font-medium text-gray-700">
                  {t('wallet.filterTransactions')}
                </h4>
                <button onClick={() => setShowFilters(false)} className="text-gray-400 hover:text-gray-600">
                  <XMarkIcon className="w-5 h-5" />
                </button>
              </div>
              <div className="flex flex-wrap gap-2">
                <FilterButton active={activeFilter === 'all'} onClick={() => setActiveFilter('all')} label={t('wallet.allTransactions')} />
                <FilterButton active={activeFilter === 'income'} onClick={() => setActiveFilter('income')} label={t('wallet.income')} icon={<ArrowDownIcon className={`w-3 h-3 ${direction === 'rtl' ? 'ml-1' : 'mr-1'} text-green-600`} />} color="bg-green-50 text-green-700 border-green-200" activeColor="bg-green-100 border-green-300" />
                <FilterButton active={activeFilter === 'expense'} onClick={() => setActiveFilter('expense')} label={t('wallet.expenses')} icon={<ArrowUpIcon className={`w-3 h-3 ${direction === 'rtl' ? 'ml-1' : 'mr-1'} text-red-600`} />} color="bg-red-50 text-red-700 border-red-200" activeColor="bg-red-100 border-red-300" />
                <FilterButton active={activeFilter === 'delivery'} onClick={() => setActiveFilter('delivery')} label={t('wallet.deliveries')} icon={<TruckIcon className={`w-3 h-3 ${direction === 'rtl' ? 'ml-1' : 'mr-1'} text-congress-blue-600`} />} color="bg-congress-blue-50 text-congress-blue-700 border-congress-blue-200" activeColor="bg-congress-blue-100 border-congress-blue-300" />
                <FilterButton active={activeFilter === 'refund'} onClick={() => setActiveFilter('refund')} label={t('wallet.refunds')} icon={<CreditCardIcon className={`w-3 h-3 ${direction === 'rtl' ? 'ml-1' : 'mr-1'} text-amber-600`} />} color="bg-amber-50 text-amber-700 border-amber-200" activeColor="bg-amber-100 border-amber-300" />
              </div>
            </div>
          </motion.div>}
      </AnimatePresence>
      {/* Transactions List */}
      <div className="space-y-6">
        {Object.keys(groupedTransactions).length > 0 ? Object.entries(groupedTransactions).map(([date, dateTransactions]) => <div key={date}>
                <div className="flex items-center mb-2">
                  <CalendarIcon className={`w-4 h-4 text-gray-400 ${direction === 'rtl' ? 'ml-2' : 'mr-2'}`} />
                  <h4 className="text-sm font-medium text-gray-500">
                    {formatDate(date)}
                  </h4>
                </div>
                <div className="space-y-2">
                  {dateTransactions.map(transaction => <motion.div key={transaction.id} className="bg-white rounded-lg border border-gray-200 p-4 hover:border-gray-300 transition-all" whileHover={{
            y: -2,
            boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
          }} initial={{
            opacity: 0,
            y: 10
          }} animate={{
            opacity: 1,
            y: 0
          }} transition={{
            duration: 0.3
          }}>
                      <div className="flex items-center">
                        <div className={`p-2 rounded-full ${direction === 'rtl' ? 'ml-3' : 'mr-3'} ${transaction.type === 'income' || transaction.type === 'refund' ? 'bg-green-100 text-green-600' : 'bg-red-100 text-red-500'}`}>
                          {transaction.type === 'income' || transaction.type === 'refund' ? <ArrowDownIcon className="w-5 h-5" /> : <ArrowUpIcon className="w-5 h-5" />}
                        </div>
                        <div className="flex-1">
                          <div className="flex justify-between">
                            <div className="font-medium text-gray-800">
                              {t(`wallet.transactionDescriptions.${transaction.description}`, {
                      defaultValue: transaction.description
                    })}
                            </div>
                            <div className={`font-semibold ${transaction.type === 'income' || transaction.type === 'refund' ? 'text-green-600' : 'text-red-500'}`}>
                              {transaction.type === 'income' || transaction.type === 'refund' ? '+' : '-'}
                              {transaction.amount.toFixed(3)}{' '}
                              {language === 'en' ? 'KWD' : 'د.ك'}
                            </div>
                          </div>
                          <div className="flex justify-between items-center mt-1">
                            <div className="flex items-center text-xs text-gray-500">
                              {getTransactionIcon(transaction.category)}
                              <span className={`${direction === 'rtl' ? 'mr-1' : 'ml-1'}`}>
                                {t(`wallet.categories.${transaction.category}`)}
                              </span>
                            </div>
                            <div className="text-xs text-gray-500">
                              {new Date(date).toLocaleTimeString(language === 'en' ? 'en-US' : 'ar-KW', {
                      hour: '2-digit',
                      minute: '2-digit'
                    })}
                            </div>
                          </div>
                        </div>
                      </div>
                    </motion.div>)}
                </div>
              </div>) : <div className="text-center py-12">
            <div className="text-gray-400 mb-3">
              <BanknotesIcon className="w-12 h-12 mx-auto" />
            </div>
            <h3 className="text-lg font-medium text-gray-700 mb-2">
              {t('wallet.noTransactions')}
            </h3>
            <p className="text-gray-500">
              {t('wallet.noTransactionsDescription')}
            </p>
          </div>}
      </div>
    </div>;
};
// Filter button component
const FilterButton: React.FC<{
  active: boolean;
  onClick: () => void;
  label: string;
  icon?: React.ReactNode;
  color?: string;
  activeColor?: string;
}> = ({
  active,
  onClick,
  label,
  icon,
  color = 'bg-gray-100 text-gray-700 border-gray-200',
  activeColor = 'bg-gray-200 border-gray-300'
}) => {
  const {
    direction
  } = useLanguage();
  return <motion.button onClick={onClick} className={`px-3 py-1.5 rounded-full text-xs font-medium border flex items-center ${active ? activeColor : color}`} whileHover={{
    scale: 1.05
  }} whileTap={{
    scale: 0.95
  }}>
      {icon}
      {label}
    </motion.button>;
};
export default TransactionsTab;