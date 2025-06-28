import React from 'react';
import { useForm } from '../../context/FormContext';
import { useLanguage } from '../../context/LanguageContext';
import Card from '../ui/Card';
import Checkbox from '../ui/Checkbox';
import { TagIcon } from '@heroicons/react/24/outline';
const AdditionalOptions: React.FC = () => {
  const {
    t
  } = useLanguage();
  const {
    formData,
    updateFormData
  } = useForm();
  const handleLoadingAssistanceChange = (checked: boolean) => {
    updateFormData({
      loadingAssistance: checked
    });
  };
  const handleDiscountCodeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    updateFormData({
      discountCode: e.target.value
    });
  };
  const handleTermsChange = (checked: boolean) => {
    updateFormData({
      termsAccepted: checked
    });
  };
  return <div>
      <div className="space-y-4">
        <Card className="p-3">
          <Checkbox label={t('additionalOptions.loadingAssistance')} checked={formData.loadingAssistance} onChange={handleLoadingAssistanceChange} />
        </Card>
        <Card className="p-0 overflow-hidden">
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <TagIcon size={16} className="text-gray-400" />
            </div>
            <input type="text" value={formData.discountCode} onChange={handleDiscountCodeChange} placeholder={t('additionalOptions.discountCode')} className="pl-10 w-full px-3 py-3 border-0 focus:outline-none focus:ring-0" />
          </div>
        </Card>
        <div>
          <Checkbox label={t('additionalOptions.termsAndConditions')} checked={formData.termsAccepted} onChange={handleTermsChange} />
        </div>
      </div>
    </div>;
};
export default AdditionalOptions;