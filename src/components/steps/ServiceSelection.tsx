import React from 'react';
import { useForm, ServiceType } from '../../context/FormContext';
import { useLanguage } from '../../context/LanguageContext';
const ServiceSelection: React.FC = () => {
  const {
    t,
    language,
    direction
  } = useLanguage();
  const {
    formData,
    updateFormData
  } = useForm();
  const handleServiceSelect = (serviceType: ServiceType) => {
    updateFormData({
      serviceType
    });
  };
  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    updateFormData({
      scheduledDate: new Date(e.target.value)
    });
  };
  const handleTimeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    updateFormData({
      scheduledTime: e.target.value
    });
  };
  // Check if current time is before 13:00 to show discount badge
  const showDiscount = new Date().getHours() < 13;
  return <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-md p-5">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Immediate Delivery Card */}
        <div className={`border rounded-xl overflow-hidden transition-all duration-300 h-full ${formData.serviceType === 'immediate' ? 'border-congress-blue-600 bg-congress-blue-50 shadow-md' : 'border-gray-200 hover:border-gray-300'}`}>
          <div className="p-5 cursor-pointer h-full flex flex-col" onClick={() => handleServiceSelect('immediate')}>
            <div className="flex items-start">
              <span className={`text-2xl ${direction === 'rtl' ? 'ml-2' : 'mr-2'}`}>
                ⚡
              </span>
              <div className="flex-1">
                <h3 className="font-semibold text-lg text-congress-blue-700">
                  {t('serviceSelection.immediate')}
                </h3>
                <p className="text-gray-600 mt-1">
                  {t('serviceSelection.immediatePrice')}
                </p>
              </div>
              {showDiscount && <div className="bg-golden-fizz-300 text-gray-800 text-xs font-bold px-3 py-1 rounded-full shadow-sm">
                  {t('serviceSelection.discount')}
                </div>}
            </div>
            <div className="mt-4 text-sm text-gray-600">
              {t('serviceSelection.immediateDescription')}
            </div>
            <div className="mt-4 font-bold text-lg">
              3.500 {language === 'en' ? 'KWD' : 'د.ك'}
            </div>
            {/* Immediate delivery details integrated into card */}
            <div className={`mt-4 pt-4 border-t border-gray-100 ${formData.serviceType === 'immediate' ? 'text-congress-blue-900' : 'text-gray-500'}`}>
              <div className="space-y-3">
                <div className="flex items-center">
                  <span className={`text-xl ${direction === 'rtl' ? 'ml-2' : 'mr-2'}`}>
                    🏍️
                  </span>
                  <span className="text-sm">
                    {t('serviceSelection.motorcycleOrCar')}
                  </span>
                </div>
                <div className="flex items-center">
                  <span className={`text-xl ${direction === 'rtl' ? 'ml-2' : 'mr-2'}`}>
                    ⚖️
                  </span>
                  <span className="text-sm">
                    {t('serviceSelection.weightLimit')}
                  </span>
                </div>
                <div className="flex items-center">
                  <span className={`text-xl ${direction === 'rtl' ? 'ml-2' : 'mr-2'}`}>
                    🛡️
                  </span>
                  <span className="text-sm">
                    {t('serviceSelection.insuranceOption')}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* Scheduled Delivery Card */}
        <div className={`border rounded-xl overflow-hidden transition-all duration-300 h-full ${formData.serviceType === 'scheduled' ? 'border-congress-blue-600 bg-congress-blue-50 shadow-md' : 'border-gray-200 hover:border-gray-300'}`}>
          <div className="p-5 cursor-pointer h-full flex flex-col" onClick={() => handleServiceSelect('scheduled')}>
            <div className="flex items-start">
              <span className={`text-2xl ${direction === 'rtl' ? 'ml-2' : 'mr-2'}`}>
                📅
              </span>
              <div className="flex-1">
                <h3 className="font-semibold text-lg text-congress-blue-700">
                  {t('serviceSelection.scheduled')}
                </h3>
                <p className="text-gray-600 mt-1">
                  {t('serviceSelection.scheduledPrice')}
                </p>
              </div>
            </div>
            <div className="mt-4 text-sm text-gray-600">
              {t('serviceSelection.scheduledDescription')}
            </div>
            <div className="mt-4 font-bold text-lg">
              2.250 {language === 'en' ? 'KWD' : 'د.ك'}
            </div>
            {/* Scheduled delivery details integrated into card */}
            <div className={`mt-4 pt-4 border-t border-gray-100 ${formData.serviceType === 'scheduled' ? 'text-congress-blue-900' : 'text-gray-500'}`}>
              <div className="space-y-3">
                <div className="flex items-center">
                  <span className={`text-xl ${direction === 'rtl' ? 'ml-2' : 'mr-2'}`}>
                    🏍️
                  </span>
                  <span className="text-sm">
                    {t('serviceSelection.motorcycleOrCar')}
                  </span>
                </div>
                <div className="flex items-center">
                  <span className={`text-xl ${direction === 'rtl' ? 'ml-2' : 'mr-2'}`}>
                    ⚖️
                  </span>
                  <span className="text-sm">
                    {t('serviceSelection.weightLimit')}
                  </span>
                </div>
                <div className="flex items-center">
                  <span className={`text-xl ${direction === 'rtl' ? 'ml-2' : 'mr-2'}`}>
                    🛡️
                  </span>
                  <span className="text-sm">
                    {t('serviceSelection.insuranceOption')}
                  </span>
                </div>
              </div>
              {/* Date and time selection for scheduled delivery */}
              {formData.serviceType === 'scheduled' && <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      {t('serviceSelection.date')}
                    </label>
                    <div className="relative">
                      <div className={`absolute inset-y-0 ${direction === 'rtl' ? 'right-0 pr-4' : 'left-0 pl-4'} flex items-center pointer-events-none`}>
                        <span className="text-gray-400">📅</span>
                      </div>
                      <input type="date" className={`${direction === 'rtl' ? 'pr-11' : 'pl-11'} w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-regent-st-blue-300 focus:border-regent-st-blue-400 transition-all`} onChange={handleDateChange} min={new Date().toISOString().split('T')[0]} />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      {t('serviceSelection.time')}
                    </label>
                    <div className="relative">
                      <div className={`absolute inset-y-0 ${direction === 'rtl' ? 'right-0 pr-4' : 'left-0 pl-4'} flex items-center pointer-events-none`}>
                        <span className="text-gray-400">🕒</span>
                      </div>
                      <input type="time" className={`${direction === 'rtl' ? 'pr-11' : 'pl-11'} w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-regent-st-blue-300 focus:border-regent-st-blue-400 transition-all`} onChange={handleTimeChange} />
                    </div>
                  </div>
                </div>}
            </div>
          </div>
        </div>
      </div>
    </div>;
};
export default ServiceSelection;