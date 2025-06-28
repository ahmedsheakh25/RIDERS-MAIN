import React, { useEffect, useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLanguage } from '../../context/LanguageContext';
import { XMarkIcon, CreditCardIcon } from '@heroicons/react/24/outline';
import Button from '../ui/Button';
interface AddFundsModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddFunds: (amount: number) => void;
}
const AddFundsModal: React.FC<AddFundsModalProps> = ({
  isOpen,
  onClose,
  onAddFunds
}) => {
  const {
    t,
    language
  } = useLanguage();
  const [amount, setAmount] = useState<string>('');
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState<string>('card-1');
  const modalRef = useRef<HTMLDivElement>(null);
  const amountInputRef = useRef<HTMLInputElement>(null);
  // Mock payment methods
  const paymentMethods = [{
    id: 'card-1',
    type: 'visa',
    last4: '4242',
    name: 'Personal Visa'
  }, {
    id: 'card-2',
    type: 'mastercard',
    last4: '8765',
    name: 'Business Card'
  }];
  // Predefined amounts
  const predefinedAmounts = [100, 200, 300, 500];
  // Handle click outside to close modal - using mousedown
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      // Only close if clicking directly on the backdrop, not on any child elements
      if (event.target === document.querySelector('.modal-backdrop')) {
        onClose();
      }
    };
    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen, onClose]);
  // Prevent automatic focus on mount
  useEffect(() => {
    // Explicitly blur any focused element when modal opens
    if (isOpen && document.activeElement instanceof HTMLElement) {
      document.activeElement.blur();
    }
  }, [isOpen]);
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const parsedAmount = parseFloat(amount);
    if (!isNaN(parsedAmount) && parsedAmount > 0) {
      onAddFunds(parsedAmount);
      setAmount('');
      onClose();
    }
  };
  const handlePredefinedAmount = (value: number) => {
    setAmount(value.toString());
  };
  const getCardIcon = (type: string) => {
    switch (type) {
      case 'visa':
        return <div className="text-blue-700 font-bold tracking-wider">VISA</div>;
      case 'mastercard':
        return <div className="flex items-center">
            <div className="w-4 h-4 bg-red-500 rounded-full opacity-80 mr-1"></div>
            <div className="w-4 h-4 bg-yellow-500 rounded-full opacity-80 -ml-2"></div>
          </div>;
      default:
        return <div className="text-gray-700 font-bold">{type}</div>;
    }
  };
  return <AnimatePresence>
      {isOpen && <div className="fixed inset-0 z-50 overflow-y-auto" aria-labelledby="modal-title" role="dialog" aria-modal="true">
          <div className="flex items-center justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:block sm:p-0">
            {/* Background overlay */}
            <motion.div initial={{
          opacity: 0
        }} animate={{
          opacity: 1
        }} exit={{
          opacity: 0
        }} transition={{
          duration: 0.2
        }} className="fixed inset-0 transition-opacity bg-gray-500 bg-opacity-75 modal-backdrop" aria-hidden="true" onClick={e => {
          // Only close if clicking directly on the backdrop
          if (e.target === e.currentTarget) {
            onClose();
          }
        }} />
            <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">
              &#8203;
            </span>
            {/* Modal panel */}
            <motion.div ref={modalRef} initial={{
          opacity: 0,
          scale: 0.95,
          y: 20
        }} animate={{
          opacity: 1,
          scale: 1,
          y: 0
        }} exit={{
          opacity: 0,
          scale: 0.95,
          y: 20
        }} transition={{
          duration: 0.3
        }} className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full relative" onClick={e => e.stopPropagation()}>
              <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-lg font-medium leading-6 text-gray-900" id="modal-title">
                    {t('wallet.addFunds')}
                  </h3>
                  <button onClick={e => {
                e.stopPropagation();
                onClose();
              }} className="text-gray-400 hover:text-gray-500" type="button" aria-label="Close">
                    <XMarkIcon className="h-6 w-6" />
                  </button>
                </div>
                <form onSubmit={handleSubmit}>
                  <div className="mb-4">
                    <label htmlFor="amount" className="block text-sm font-medium text-gray-700 mb-1">
                      {t('wallet.enterAmount')}
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <span className="text-gray-500">
                          {language === 'en' ? 'KWD' : 'د.ك'}
                        </span>
                      </div>
                      <input ref={amountInputRef} type="number" id="amount" name="amount" value={amount} onChange={e => setAmount(e.target.value)} placeholder="0.000" className="pl-14 block w-full py-2 px-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-congress-blue-500 focus:border-congress-blue-500" required min="1" step="0.001" autoFocus={false} tabIndex={1} />
                    </div>
                  </div>
                  <div className="mb-6">
                    <div className="text-sm font-medium text-gray-700 mb-2">
                      {t('wallet.quickAmounts')}
                    </div>
                    <div className="grid grid-cols-4 gap-2">
                      {predefinedAmounts.map(value => <button key={value} type="button" onClick={e => {
                    e.stopPropagation();
                    handlePredefinedAmount(value);
                  }} className={`py-2 px-3 border rounded-md text-sm font-medium transition-colors
                            ${amount === value.toString() ? 'bg-congress-blue-50 border-congress-blue-300 text-congress-blue-700' : 'border-gray-300 text-gray-700 hover:bg-gray-50'}`} tabIndex={2}>
                          {value} {language === 'en' ? 'KWD' : 'د.ك'}
                        </button>)}
                    </div>
                  </div>
                  <div className="mb-6">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      {t('wallet.selectPaymentMethod')}
                    </label>
                    <div className="space-y-2">
                      {paymentMethods.map(method => <div key={method.id} onClick={e => {
                    e.stopPropagation();
                    setSelectedPaymentMethod(method.id);
                  }} className={`p-3 border rounded-md cursor-pointer transition-colors flex items-center
                            ${selectedPaymentMethod === method.id ? 'border-congress-blue-300 bg-congress-blue-50' : 'border-gray-300 hover:bg-gray-50'}`} tabIndex={3} role="radio" aria-checked={selectedPaymentMethod === method.id}>
                          <div className="w-10 h-6 flex items-center justify-center mr-3">
                            {getCardIcon(method.type)}
                          </div>
                          <div className="flex-1">
                            <div className="font-medium text-gray-900">
                              {method.name}
                            </div>
                            <div className="text-sm text-gray-500">
                              •••• {method.last4}
                            </div>
                          </div>
                          <div className="flex items-center justify-center w-5 h-5 rounded-full border border-gray-300 bg-white mr-2">
                            {selectedPaymentMethod === method.id && <div className="w-3 h-3 rounded-full bg-congress-blue-600"></div>}
                          </div>
                        </div>)}
                      <button type="button" className="p-3 border border-dashed border-gray-300 rounded-md text-gray-500 hover:text-gray-700 hover:bg-gray-50 w-full flex items-center justify-center" onClick={e => e.stopPropagation()} tabIndex={4}>
                        <CreditCardIcon className="w-5 h-5 mr-2" />
                        {t('wallet.addNewCard')}
                      </button>
                    </div>
                  </div>
                  <div className="flex justify-end space-x-3">
                    <Button variant="outline" onClick={e => {
                  e.stopPropagation();
                  onClose();
                }} type="button" tabIndex={5}>
                      {t('common.cancel')}
                    </Button>
                    <Button variant="primary" type="submit" disabled={!amount || parseFloat(amount) <= 0} tabIndex={6}>
                      {t('wallet.confirmAddFunds')}
                    </Button>
                  </div>
                </form>
              </div>
            </motion.div>
          </div>
        </div>}
    </AnimatePresence>;
};
export default AddFundsModal;