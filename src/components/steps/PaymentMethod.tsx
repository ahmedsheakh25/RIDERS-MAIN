import React from 'react';
import { useForm, PaymentMethod as PaymentMethodType } from '../../context/FormContext';
import { useLanguage } from '../../context/LanguageContext';
import Card from '../ui/Card';
import RadioGroup from '../ui/RadioGroup';
import Input from '../ui/Input';
import { WalletIcon, CreditCardIcon, BanknotesIcon } from '@heroicons/react/24/outline';
const PaymentMethod: React.FC = () => {
  const {
    t,
    language
  } = useLanguage();
  const {
    formData,
    updateFormData,
    totalPrice
  } = useForm();
  const handlePaymentMethodChange = (value: string) => {
    updateFormData({
      paymentMethod: value as PaymentMethodType
    });
  };
  // Mock wallet balance
  const walletBalance = 5.0;
  const remainingBalance = Math.max(0, walletBalance - totalPrice);
  const insufficientFunds = walletBalance < totalPrice;
  const paymentOptions = [{
    value: 'wallet',
    label: <div className="flex justify-between w-full">
          <div className="flex items-center">
            <WalletIcon className="w-4 h-4 mr-2 text-congress-blue-700" />
            <span>{t('paymentMethod.wallet')}</span>
          </div>
          {insufficientFunds && <span className="text-xs text-red-500">
              {t('paymentMethod.insufficientFunds')}
            </span>}
        </div>
  }, {
    value: 'cash',
    label: <div className="flex items-center">
          <BanknotesIcon className="w-4 h-4 mr-2 text-congress-blue-700" />
          <span>{t('paymentMethod.cash')}</span>
        </div>
  }, {
    value: 'card',
    label: <div className="flex items-center">
          <CreditCardIcon className="w-4 h-4 mr-2 text-congress-blue-700" />
          <span>{t('paymentMethod.card')}</span>
        </div>
  }];
  return <div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="md:col-span-2">
          <RadioGroup options={paymentOptions} name="paymentMethod" value={formData.paymentMethod || ''} onChange={handlePaymentMethodChange} className="mb-4" />
          {formData.paymentMethod === 'wallet' && <Card className="p-3">
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">
                    {t('paymentMethod.walletBalance')}
                  </span>
                  <span className="font-medium">
                    {walletBalance.toFixed(3)}{' '}
                    {language === 'en' ? 'KWD' : 'د.ك'}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">
                    {t('paymentMethod.remainingAmount')}
                  </span>
                  <span className={`font-medium ${insufficientFunds ? 'text-red-500' : ''}`}>
                    {remainingBalance.toFixed(3)}{' '}
                    {language === 'en' ? 'KWD' : 'د.ك'}
                  </span>
                </div>
              </div>
            </Card>}
          {formData.paymentMethod === 'card' && <Card className="p-3">
              <h3 className="font-medium mb-3 text-sm">
                {t('paymentMethod.cardDetails')}
              </h3>
              <Input label={t('paymentMethod.cardNumber')} name="cardNumber" value="" onChange={() => {}} placeholder="XXXX XXXX XXXX XXXX" required className="mb-3" />
              <div className="grid grid-cols-2 gap-3">
                <Input label={t('paymentMethod.expiryDate')} name="expiryDate" value="" onChange={() => {}} placeholder="MM/YY" required className="mb-0" />
                <Input label={t('paymentMethod.cvv')} name="cvv" value="" onChange={() => {}} placeholder="XXX" required className="mb-0" />
              </div>
            </Card>}
        </div>
        <div>
          <Card className="p-3">
            <h3 className="font-medium mb-3 text-sm">
              {t('orderSummary.title')}
            </h3>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-xs text-gray-600">
                  {t('orderSummary.basePrice')}
                </span>
                <span className="text-xs font-medium">
                  {formData.serviceType === 'immediate' ? '3.500' : '2.250'}{' '}
                  {language === 'en' ? 'KWD' : 'د.ك'}
                </span>
              </div>
              {formData.deliveryAddresses.length > 1 && <div className="flex justify-between">
                  <span className="text-xs text-gray-600">
                    {t('orderSummary.additionalAddresses')}
                  </span>
                  <span className="text-xs font-medium">
                    {((formData.deliveryAddresses.length - 1) * 0.75).toFixed(3)}{' '}
                    {language === 'en' ? 'KWD' : 'د.ك'}
                  </span>
                </div>}
              {formData.insurance && formData.insuranceValue > 0 && <div className="flex justify-between">
                  <span className="text-xs text-gray-600">
                    {t('orderSummary.insurance')}
                  </span>
                  <span className="text-xs font-medium">
                    {(formData.insuranceValue * 0.01).toFixed(3)}{' '}
                    {language === 'en' ? 'KWD' : 'د.ك'}
                  </span>
                </div>}
              {/* Show discount if applicable */}
              {formData.serviceType === 'immediate' && new Date().getHours() < 13 && <div className="flex justify-between text-green-600">
                    <span className="text-xs">
                      {t('orderSummary.discount')}
                    </span>
                    <span className="text-xs font-medium">
                      -1.400 {language === 'en' ? 'KWD' : 'د.ك'}
                    </span>
                  </div>}
              <div className="border-t border-gray-200 pt-2 mt-2">
                <div className="flex justify-between font-bold">
                  <span className="text-sm">{t('orderSummary.total')}</span>
                  <span className="text-sm">
                    {totalPrice.toFixed(3)} {language === 'en' ? 'KWD' : 'د.ك'}
                  </span>
                </div>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>;
};
export default PaymentMethod;