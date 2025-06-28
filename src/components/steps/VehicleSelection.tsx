import React from 'react';
import { useForm, VehicleType } from '../../context/FormContext';
import { useLanguage } from '../../context/LanguageContext';
const VehicleSelection: React.FC = () => {
  const {
    t,
    language,
    direction
  } = useLanguage();
  const {
    formData,
    updateFormData
  } = useForm();
  const handleVehicleSelect = (vehicleType: VehicleType) => {
    updateFormData({
      vehicleType
    });
  };
  return <div className="flex flex-wrap gap-5 justify-start">
      <div onClick={() => handleVehicleSelect('motorcycle')} className={`cursor-pointer p-5 rounded-lg transition-all duration-200 hover:bg-gray-50 ${formData.vehicleType === 'motorcycle' ? 'border-2 border-congress-blue-600 bg-congress-blue-50' : 'border border-gray-200'}`}>
        <div className="flex items-center">
          <div className={`p-3.5 bg-congress-blue-200 border border-congress-blue-300 rounded-full ${direction === 'rtl' ? 'ml-4' : 'mr-4'}`}>
            <span className="text-xl">🏍️</span>
          </div>
          <div>
            <h3 className="font-semibold text-lg text-congress-blue-700">
              {t('vehicleSelection.motorcycle')}
            </h3>
            <p className="text-gray-600 mt-1">
              {t('vehicleSelection.motorcycleCapacity')}
            </p>
          </div>
        </div>
      </div>
      <div onClick={() => handleVehicleSelect('car')} className={`cursor-pointer p-5 rounded-lg transition-all duration-200 hover:bg-gray-50 ${formData.vehicleType === 'car' ? 'border-2 border-congress-blue-600 bg-congress-blue-50' : 'border border-gray-200'}`}>
        <div className="flex items-center">
          <div className={`p-3.5 bg-congress-blue-200 border border-congress-blue-300 rounded-full ${direction === 'rtl' ? 'ml-4' : 'mr-4'}`}>
            <span className="text-xl">🚗</span>
          </div>
          <div>
            <h3 className="font-semibold text-lg text-congress-blue-700">
              {t('vehicleSelection.car')}
            </h3>
            <p className="text-gray-600 mt-1">
              {t('vehicleSelection.carCapacity')}
            </p>
          </div>
        </div>
      </div>
    </div>;
};
export default VehicleSelection;