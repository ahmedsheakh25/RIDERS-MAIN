import React, { useState } from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { motion } from 'framer-motion';
import Button from '../ui/Button';
import { CreditCardIcon, PlusIcon, TrashIcon, ChevronRightIcon } from '@heroicons/react/24/outline';
// Mock payment methods
const mockPaymentMethods = [{
  id: '1',
  type: 'visa',
  last4: '4242',
  expMonth: 12,
  expYear: 24,
  name: 'John Doe'
}, {
  id: '2',
  type: 'mastercard',
  last4: '5555',
  expMonth: 10,
  expYear: 25,
  name: 'John Doe'
}];
const PaymentMethodsTab: React.FC = () => {
  const {
    t,
    direction
  } = useLanguage();
  const [paymentMethods, setPaymentMethods] = useState(mockPaymentMethods);
  const [showAddCard, setShowAddCard] = useState(false);
  const removePaymentMethod = (id: string) => {
    setPaymentMethods(paymentMethods.filter(method => method.id !== id));
  };
  // Consistent card icon rendering across the app
  const renderCardIcon = (type: string) => {
    switch (type.toLowerCase()) {
      case 'visa':
        return <div className="h-7 w-10 bg-white flex items-center justify-center rounded border border-gray-200">
            <div className="text-blue-700 font-bold tracking-wider text-sm">
              VISA
            </div>
          </div>;
      case 'mastercard':
        return <div className="h-7 w-10 bg-white flex items-center justify-center rounded border border-gray-200">
            <div className="flex items-center">
              <div className="w-4 h-4 bg-red-500 rounded-full opacity-90 mr-1"></div>
              <div className="w-4 h-4 bg-yellow-500 rounded-full opacity-90 -ml-2"></div>
            </div>
          </div>;
      case 'amex':
        return <div className="h-7 w-10 bg-blue-500 flex items-center justify-center rounded">
            <div className="text-white font-bold text-xs">AMEX</div>
          </div>;
      default:
        return <div className="p-2 rounded-full bg-gray-100">
            <CreditCardIcon className="w-5 h-5 text-gray-600" />
          </div>;
    }
  };
  return <div>
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-semibold text-gray-800">
          {t('wallet.savedPaymentMethods')}
        </h3>
        <Button variant="outline" size="sm" onClick={() => setShowAddCard(!showAddCard)} className="flex items-center">
          <PlusIcon className={`w-4 h-4 ${direction === 'rtl' ? 'ml-1' : 'mr-1'}`} />
          {t('wallet.addPaymentMethod')}
        </Button>
      </div>
      {paymentMethods.length > 0 ? <div className="space-y-4">
          {paymentMethods.map(method => <motion.div key={method.id} className="bg-white rounded-lg border border-gray-200 p-4 hover:border-gray-300 transition-all" whileHover={{
        y: -2,
        boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
      }}>
              <div className="flex items-center">
                <div className="mr-3">{renderCardIcon(method.type)}</div>
                <div className="flex-1">
                  <div className="flex justify-between">
                    <div className="font-medium text-gray-800">
                      {method.type.charAt(0).toUpperCase() + method.type.slice(1)}{' '}
                      •••• {method.last4}
                    </div>
                    <div className="flex items-center">
                      <button onClick={() => removePaymentMethod(method.id)} className="text-gray-400 hover:text-red-500 mr-2">
                        <TrashIcon className="w-4 h-4" />
                      </button>
                      <ChevronRightIcon className="w-4 h-4 text-gray-400" />
                    </div>
                  </div>
                  <div className="text-sm text-gray-500 mt-1">
                    Expires {method.expMonth}/{method.expYear}
                  </div>
                </div>
              </div>
            </motion.div>)}
        </div> : <div className="text-center py-12 bg-gray-50 rounded-lg">
          <div className="text-gray-400 mb-3">
            <CreditCardIcon className="w-12 h-12 mx-auto" />
          </div>
          <h3 className="text-lg font-medium text-gray-700 mb-2">
            No saved payment methods
          </h3>
          <p className="text-gray-500 mb-4">
            Add a payment method to make checkout faster
          </p>
          <Button variant="outline" size="sm" onClick={() => setShowAddCard(true)}>
            <PlusIcon className="w-4 h-4 mr-1" />
            {t('wallet.addPaymentMethod')}
          </Button>
        </div>}
      {showAddCard && <div className="mt-6 p-4 border border-gray-200 rounded-lg">
          <h4 className="font-medium text-gray-800 mb-4">
            {t('wallet.addNewCard')}
          </h4>
          {/* Add card form would go here */}
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Card Number
              </label>
              <input type="text" className="w-full px-3 py-2 border border-gray-300 rounded-md" placeholder="1234 5678 9012 3456" />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Expiration Date
                </label>
                <input type="text" className="w-full px-3 py-2 border border-gray-300 rounded-md" placeholder="MM/YY" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  CVC
                </label>
                <input type="text" className="w-full px-3 py-2 border border-gray-300 rounded-md" placeholder="123" />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Cardholder Name
              </label>
              <input type="text" className="w-full px-3 py-2 border border-gray-300 rounded-md" placeholder="John Doe" />
            </div>
            <div className="flex justify-end space-x-2">
              <Button variant="outline" size="sm" onClick={() => setShowAddCard(false)}>
                {t('common.cancel')}
              </Button>
              <Button variant="primary" size="sm">
                {t('common.save')}
              </Button>
            </div>
          </div>
        </div>}
    </div>;
};
export default PaymentMethodsTab;