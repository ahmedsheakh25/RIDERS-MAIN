import React, { useState } from 'react';
import { useForm } from '../context/FormContext';
import { useLanguage } from '../context/LanguageContext';
import ServiceSelection from '../components/steps/ServiceSelection';
import VehicleSelection from '../components/steps/VehicleSelection';
import PickupAddress from '../components/steps/PickupAddress';
import DeliveryAddresses from '../components/steps/DeliveryAddresses';
import PackageDetails from '../components/steps/PackageDetails';
import AdditionalOptions from '../components/steps/AdditionalOptions';
import PaymentMethod from '../components/steps/PaymentMethod';
import Button from '../components/ui/Button';
import { CheckCircleIcon, ChevronUpIcon, ChevronDownIcon } from '@heroicons/react/24/outline';
import { TruckIcon, MapPinIcon, CalendarIcon, UserIcon, ArchiveBoxIcon, CogIcon, CreditCardIcon } from '@heroicons/react/24/outline';
const BookingForm: React.FC = () => {
  const {
    t,
    language
  } = useLanguage();
  const {
    formData,
    totalPrice
  } = useForm();
  const [activeSection, setActiveSection] = useState<number[]>([0, 1, 2, 4, 5]); // Most sections open by default
  const toggleSection = (sectionIndex: number) => {
    setActiveSection(prevActive => prevActive.includes(sectionIndex) ? prevActive.filter(i => i !== sectionIndex) : [...prevActive, sectionIndex]);
  };
  // Get section icon based on index
  const getSectionIcon = (sectionIndex: number) => {
    switch (sectionIndex) {
      case 0:
        return <CalendarIcon className="w-6 h-6 text-congress-blue-700" />;
      case 1:
        return <UserIcon className="w-6 h-6 text-congress-blue-700" />;
      case 2:
        return <MapPinIcon className="w-6 h-6 text-congress-blue-700" />;
      case 3:
        return <TruckIcon className="w-6 h-6 text-congress-blue-700" />;
      case 4:
        return <ArchiveBoxIcon className="w-6 h-6 text-congress-blue-700" />;
      case 5:
        return <CogIcon className="w-6 h-6 text-congress-blue-700" />;
      case 6:
        return <CreditCardIcon className="w-6 h-6 text-congress-blue-700" />;
      default:
        return <CheckCircleIcon className="w-6 h-6 text-congress-blue-700" />;
    }
  };
  const isFormValid = () => {
    return formData.serviceType && formData.vehicleType && formData.pickupAddress.contactPerson && formData.pickupAddress.phoneNumber && formData.pickupAddress.address && !formData.deliveryAddresses.some(addr => !addr.contactPerson || !addr.phoneNumber || !addr.address) && formData.packageType && !(formData.insurance && formData.insuranceValue <= 0) && formData.termsAccepted && formData.paymentMethod;
  };
  const isSectionComplete = (sectionIndex: number): boolean => {
    switch (sectionIndex) {
      case 0:
        // Service Selection
        return !!formData.serviceType;
      case 1:
        // Vehicle Selection
        return !!formData.vehicleType;
      case 2:
        // Pickup Address
        return !!(formData.pickupAddress.contactPerson && formData.pickupAddress.phoneNumber && formData.pickupAddress.address);
      case 3:
        // Delivery Addresses
        return !formData.deliveryAddresses.some(addr => !addr.contactPerson || !addr.phoneNumber || !addr.address);
      case 4:
        // Package Details
        return !!(formData.packageType && formData.weight > 0 && !(formData.insurance && formData.insuranceValue <= 0));
      case 5:
        // Additional Options
        return formData.termsAccepted;
      case 6:
        // Payment Method
        return !!formData.paymentMethod;
      default:
        return false;
    }
  };
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (isFormValid()) {
      // Submit the form
      console.log('Form submitted:', formData);
      alert(t('orderSummary.orderSubmitted'));
    } else {
      // Find the first incomplete section and open it
      for (let i = 0; i < 7; i++) {
        if (!isSectionComplete(i)) {
          setActiveSection(prevActive => prevActive.includes(i) ? prevActive : [...prevActive, i]);
          break;
        }
      }
      alert(t('orderSummary.fillRequired'));
    }
  };
  return <div className="container mx-auto px-4 py-8 bg-gray-50 min-h-screen">
      <h1 className={`text-3xl font-bold text-center text-congress-blue-700 mb-2 ${language === 'ar' ? 'text-right md:text-center' : 'text-left md:text-center'}`}>
        {t('bookingForm.title')}
      </h1>
      <p className={`text-gray-600 mb-10 ${language === 'ar' ? 'text-right md:text-center' : 'text-left md:text-center'}`}>
        {t('bookingForm.subtitle')}
      </p>
      <form onSubmit={handleSubmit} className="max-w-4xl mx-auto">
        <div className="space-y-5">
          {/* Service Selection Section - standalone without collapsible header */}
          <div className="mb-8">
            <ServiceSelection />
          </div>
          {/* Vehicle Selection Section - non-expandable */}
          <div className="bg-white rounded-xl overflow-hidden p-5">
            <div className="flex items-center mb-4">
              <div className="flex items-center justify-center w-10 h-10 rounded-full bg-congress-blue-200 border border-congress-blue-300 rtl-icon-spacing">
                {getSectionIcon(1)}
              </div>
              <h2 className="text-xl font-semibold text-congress-blue-700 flex-1">
                {t('steps.vehicleSelection')}
              </h2>
              {isSectionComplete(1) && <div className="text-emerald-500">
                  <CheckCircleIcon className="w-5 h-5 stroke-2" />
                </div>}
            </div>
            <VehicleSelection />
          </div>
          {/* Pickup Address Section - with icon and expandable */}
          <div className={`bg-white rounded-xl shadow-sm border transition-all ${isSectionComplete(2) ? 'border-regent-st-blue-200' : 'border-gray-200'} overflow-hidden hover:shadow-md`}>
            <div className={`flex items-center p-5 border-b cursor-pointer transition-colors ${isSectionComplete(2) ? 'border-regent-st-blue-200 bg-regent-st-blue-50' : 'border-gray-100'}`} onClick={() => toggleSection(2)}>
              <div className="flex items-center justify-center w-10 h-10 rounded-full bg-congress-blue-200 border border-congress-blue-300 rtl-icon-spacing">
                {getSectionIcon(2)}
              </div>
              <h2 className="text-xl font-semibold text-congress-blue-700 flex-1">
                {t('steps.pickupAddress')}
              </h2>
              {isSectionComplete(2) && <div className="mr-3 text-emerald-500">
                  <CheckCircleIcon className="w-5 h-5 stroke-2" />
                </div>}
              <div className="text-gray-400">
                {activeSection.includes(2) ? <ChevronUpIcon className="w-5 h-5" /> : <ChevronDownIcon className="w-5 h-5" />}
              </div>
            </div>
            <div className={`p-5 transition-all duration-300 ${!activeSection.includes(2) ? 'hidden' : ''}`}>
              <PickupAddress />
            </div>
          </div>
          {/* Delivery Addresses Section - with icon and expandable */}
          <div className={`bg-white rounded-xl shadow-sm border transition-all ${isSectionComplete(3) ? 'border-regent-st-blue-200' : 'border-gray-200'} overflow-hidden hover:shadow-md`}>
            <div className={`flex items-center p-5 border-b cursor-pointer transition-colors ${isSectionComplete(3) ? 'border-regent-st-blue-200 bg-regent-st-blue-50' : 'border-gray-100'}`} onClick={() => toggleSection(3)}>
              <div className="flex items-center justify-center w-10 h-10 rounded-full bg-congress-blue-200 border border-congress-blue-300 rtl-icon-spacing">
                {getSectionIcon(3)}
              </div>
              <h2 className="text-xl font-semibold text-congress-blue-700 flex-1">
                {t('steps.deliveryAddresses')}
              </h2>
              {isSectionComplete(3) && <div className="mr-3 text-emerald-500">
                  <CheckCircleIcon className="w-5 h-5 stroke-2" />
                </div>}
              <div className="text-gray-400">
                {activeSection.includes(3) ? <ChevronUpIcon className="w-5 h-5" /> : <ChevronDownIcon className="w-5 h-5" />}
              </div>
            </div>
            <div className={`p-5 transition-all duration-300 ${!activeSection.includes(3) ? 'hidden' : ''}`}>
              <DeliveryAddresses />
            </div>
          </div>
          {/* Package Details and Additional Options Section - side by side */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {/* Package Details Section */}
            <div className="bg-white rounded-xl overflow-hidden p-5">
              <div className="flex items-center mb-4">
                <div className="flex items-center justify-center w-10 h-10 rounded-full bg-congress-blue-200 border border-congress-blue-300 rtl-icon-spacing">
                  {getSectionIcon(4)}
                </div>
                <h2 className="text-xl font-semibold text-congress-blue-700 flex-1">
                  {t('steps.packageDetails')}
                </h2>
                {isSectionComplete(4) && <div className="text-emerald-500">
                    <CheckCircleIcon className="w-5 h-5 stroke-2" />
                  </div>}
              </div>
              <PackageDetails />
            </div>
            {/* Additional Options Section */}
            <div className="bg-white rounded-xl overflow-hidden p-5">
              <div className="flex items-center mb-4">
                <div className="flex items-center justify-center w-10 h-10 rounded-full bg-congress-blue-200 border border-congress-blue-300 rtl-icon-spacing">
                  {getSectionIcon(5)}
                </div>
                <h2 className="text-xl font-semibold text-congress-blue-700 flex-1">
                  {t('steps.additionalOptions')}
                </h2>
                {isSectionComplete(5) && <div className="text-emerald-500">
                    <CheckCircleIcon className="w-5 h-5 stroke-2" />
                  </div>}
              </div>
              <AdditionalOptions />
            </div>
          </div>
          {/* Payment Method Section - with icon and expandable */}
          <div className={`bg-white rounded-xl shadow-sm border transition-all ${isSectionComplete(6) ? 'border-regent-st-blue-200' : 'border-gray-200'} overflow-hidden hover:shadow-md`}>
            <div className={`flex items-center p-5 border-b cursor-pointer transition-colors ${isSectionComplete(6) ? 'border-regent-st-blue-200 bg-regent-st-blue-50' : 'border-gray-100'}`} onClick={() => toggleSection(6)}>
              <div className="flex items-center justify-center w-10 h-10 rounded-full bg-congress-blue-200 border border-congress-blue-300 rtl-icon-spacing">
                {getSectionIcon(6)}
              </div>
              <h2 className="text-xl font-semibold text-congress-blue-700 flex-1">
                {t('steps.paymentMethod')}
              </h2>
              {isSectionComplete(6) && <div className="mr-3 text-emerald-500">
                  <CheckCircleIcon className="w-5 h-5 stroke-2" />
                </div>}
              <div className="text-gray-400">
                {activeSection.includes(6) ? <ChevronUpIcon className="w-5 h-5" /> : <ChevronDownIcon className="w-5 h-5" />}
              </div>
            </div>
            <div className={`p-5 transition-all duration-300 ${!activeSection.includes(6) ? 'hidden' : ''}`}>
              <PaymentMethod />
            </div>
          </div>
          {/* Order Summary and Submit Button */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mt-8">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-congress-blue-700">
                {t('orderSummary.title')}
              </h2>
              <div className="text-3xl font-bold text-congress-blue-700">
                {totalPrice.toFixed(3)} {language === 'en' ? 'KWD' : 'د.ك'}
              </div>
            </div>
            <Button type="submit" variant="primary" size="lg" fullWidth disabled={!isFormValid()} className="py-4 text-lg font-medium shadow-md hover:shadow-lg transition-shadow">
              {t('common.submit')}
            </Button>
          </div>
        </div>
      </form>
    </div>;
};
export default BookingForm;