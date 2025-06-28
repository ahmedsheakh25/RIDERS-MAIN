import React from 'react';
import { useForm, PackageType } from '../../context/FormContext';
import { useLanguage } from '../../context/LanguageContext';
import Input from '../ui/Input';
import Checkbox from '../ui/Checkbox';
import { ArchiveBoxIcon, ShoppingBagIcon, GiftIcon, ShoppingCartIcon, FireIcon } from '@heroicons/react/24/outline';
const PackageDetails: React.FC = () => {
  const {
    t
  } = useLanguage();
  const {
    formData,
    updateFormData
  } = useForm();
  const handleWeightChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    updateFormData({
      weight: parseFloat(e.target.value)
    });
  };
  const handlePackageTypeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    updateFormData({
      packageType: e.target.value as PackageType
    });
  };
  const handleInsuranceChange = (checked: boolean) => {
    updateFormData({
      insurance: checked
    });
  };
  const handleInsuranceValueChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    updateFormData({
      insuranceValue: parseFloat(e.target.value)
    });
  };
  const getPackageTypeIcon = (type: string) => {
    switch (type) {
      case 'food':
        return <ArchiveBoxIcon className="w-4 h-4 text-congress-blue-700" />;
      case 'gift':
        return <GiftIcon className="w-4 h-4 text-congress-blue-700" />;
      case 'groceries':
        return <ShoppingCartIcon className="w-4 h-4 text-congress-blue-700" />;
      case 'flowers':
        return <FireIcon className="w-4 h-4 text-congress-blue-700" />;
      default:
        return <ShoppingBagIcon className="w-4 h-4 text-congress-blue-700" />;
    }
  };
  const calculateInsuranceFee = () => {
    if (formData.insurance && formData.insuranceValue > 0) {
      return (formData.insuranceValue * 0.01).toFixed(3);
    }
    return '0.000';
  };
  // Get weight options based on vehicle type
  const weightOptions = formData.vehicleType === 'motorcycle' ? [1, 2, 5, 10, 15, 20] : [1, 2, 5, 10, 20, 50, 100, 150, 200];
  return <div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            {t('packageDetails.weight')}
          </label>
          <select value={formData.weight || ''} onChange={handleWeightChange} className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-[#8ECAE6]">
            <option value="">-- {t('common.select')} --</option>
            {weightOptions.map(weight => <option key={weight} value={weight}>
                {weight} kg
              </option>)}
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            {t('packageDetails.packageType')}
          </label>
          <div className="relative">
            <select value={formData.packageType || ''} onChange={handlePackageTypeChange} className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-[#8ECAE6]">
              <option value="">-- {t('common.select')} --</option>
              <option value="food">{t('packageDetails.types.food')}</option>
              <option value="gift">{t('packageDetails.types.gift')}</option>
              <option value="groceries">
                {t('packageDetails.types.groceries')}
              </option>
              <option value="flowers">
                {t('packageDetails.types.flowers')}
              </option>
              <option value="other">{t('packageDetails.types.other')}</option>
            </select>
            {formData.packageType && <div className="absolute inset-y-0 right-0 flex items-center pr-8 pointer-events-none">
                {getPackageTypeIcon(formData.packageType)}
              </div>}
          </div>
        </div>
      </div>
      <Checkbox label={t('packageDetails.insurance')} checked={formData.insurance} onChange={handleInsuranceChange} className="mb-3" />
      {formData.insurance && <div className="pl-7 space-y-3">
          <Input label={t('packageDetails.insuranceValue')} name="insuranceValue" type="number" value={formData.insuranceValue.toString()} onChange={handleInsuranceValueChange} placeholder="0.000" required className="mb-2" />
          <div className="bg-gray-50 p-3 rounded-md">
            <div className="flex justify-between">
              <span className="text-sm text-gray-600">
                {t('packageDetails.insuranceFee')}
              </span>
              <span className="text-sm font-medium">
                {calculateInsuranceFee()} KWD
              </span>
            </div>
          </div>
        </div>}
    </div>;
};
export default PackageDetails;