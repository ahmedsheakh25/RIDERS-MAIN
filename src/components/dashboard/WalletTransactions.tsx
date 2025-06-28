import React, { Children } from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { ArrowUpIcon, ArrowDownIcon, BanknotesIcon, CreditCardIcon, ArrowPathIcon } from '@heroicons/react/24/outline';
import { motion, AnimatePresence } from 'framer-motion';
// Mock data for wallet transactions
const mockTransactions = [{
  id: 'txn-1',
  date: '2023-05-15',
  amount: 45.0,
  type: 'payment',
  description: 'Payment for delivery SHP-1234'
}, {
  id: 'txn-2',
  date: '2023-05-14',
  amount: 100.0,
  type: 'credit',
  description: 'Wallet top-up'
}, {
  id: 'txn-3',
  date: '2023-05-12',
  amount: 35.5,
  type: 'payment',
  description: 'Payment for delivery SHP-1236'
}, {
  id: 'txn-4',
  date: '2023-05-10',
  amount: 50.0,
  type: 'credit',
  description: 'Refund for cancelled delivery'
}];
const WalletTransactions: React.FC = () => {
  const {
    t,
    language
  } = useLanguage();
  const container = {
    hidden: {
      opacity: 0
    },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };
  const item = {
    hidden: {
      opacity: 0,
      x: -20
    },
    show: {
      opacity: 1,
      x: 0,
      transition: {
        type: 'spring',
        stiffness: 300,
        damping: 24
      }
    }
  };
  return <motion.div className="bg-white rounded-xl shadow-sm overflow-hidden" whileHover={{
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
      <div className="px-6 py-4 border-b border-gray-100 flex justify-between items-center">
        <h2 className="text-lg font-bold text-congress-blue-800">
          {t('dashboard.walletTransactions')}
        </h2>
        <motion.div className="bg-congress-blue-50 text-congress-blue-700 px-3 py-1 rounded-full text-sm font-medium" whileHover={{
        scale: 1.05
      }} whileTap={{
        scale: 0.95
      }}>
          250.75 {language === 'en' ? 'KWD' : 'د.ك'}
        </motion.div>
      </div>
      <motion.div className="divide-y divide-gray-100" variants={container} initial="hidden" animate="show">
        <AnimatePresence>
          {mockTransactions.map(transaction => <motion.div key={transaction.id} className="px-6 py-4 flex items-center hover:bg-gray-50 transition-colors" variants={item} whileHover={{
          x: 5
        }}>
              <motion.div className={`p-2 rounded-full mr-4 ${transaction.type === 'credit' ? 'bg-green-100 text-green-600' : 'bg-red-100 text-red-500'}`} whileHover={{
            rotate: transaction.type === 'credit' ? -15 : 15
          }}>
                {transaction.type === 'credit' ? <ArrowDownIcon className="w-5 h-5" /> : <ArrowUpIcon className="w-5 h-5" />}
              </motion.div>
              <div className="flex-1">
                <div className="text-sm font-medium text-gray-800">
                  {language === 'ar' && transaction.description === 'Wallet top-up' ? 'إضافة رصيد للمحفظة' : language === 'ar' && transaction.description === 'Refund for cancelled delivery' ? 'استرداد لتوصيل ملغي' : language === 'ar' && transaction.description.includes('Payment for delivery') ? `دفع للتوصيل ${transaction.description.split(' ').pop()}` : transaction.description}
                </div>
                <div className="text-xs text-gray-500">{transaction.date}</div>
              </div>
              <motion.div className={`text-sm font-semibold ${transaction.type === 'credit' ? 'text-green-600' : 'text-red-500'}`} initial={{
            scale: 0.9
          }} animate={{
            scale: 1
          }} transition={{
            duration: 0.3
          }}>
                {transaction.type === 'credit' ? '+' : '-'}
                {transaction.amount.toFixed(2)}{' '}
                {language === 'en' ? 'KWD' : 'د.ك'}
              </motion.div>
            </motion.div>)}
        </AnimatePresence>
      </motion.div>
      <div className="px-6 py-4 border-t border-gray-100 bg-gray-50 flex justify-between items-center">
        <div className="flex space-x-2">
          <motion.button className="flex items-center text-sm text-congress-blue-600 hover:text-congress-blue-800" whileHover={{
          scale: 1.05
        }} whileTap={{
          scale: 0.95
        }}>
            <BanknotesIcon className="w-4 h-4 mr-1" />
            {t('dashboard.addFunds')}
          </motion.button>
          <motion.button className="flex items-center text-sm text-congress-blue-600 hover:text-congress-blue-800" whileHover={{
          scale: 1.05
        }} whileTap={{
          scale: 0.95
        }}>
            <CreditCardIcon className="w-4 h-4 mr-1" />
            {t('dashboard.paymentMethods')}
          </motion.button>
        </div>
        <motion.button className="flex items-center text-sm text-gray-600 hover:text-gray-800" whileHover={{
        scale: 1.05,
        rotate: 180
      }} transition={{
        duration: 0.3
      }}>
          <ArrowPathIcon className="w-4 h-4 mr-1" />
          {t('dashboard.refresh')}
        </motion.button>
      </div>
    </motion.div>;
};
export default WalletTransactions;