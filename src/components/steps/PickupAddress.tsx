import React, { useState, useRef } from 'react';
import { useForm } from '../../context/FormContext';
import { useLanguage } from '../../context/LanguageContext';
import Card from '../ui/Card';
import Input from '../ui/Input';
import Checkbox from '../ui/Checkbox';
import Button from '../ui/Button';
import MapModal from '../ui/MapModal';
import { ChevronDownIcon, ChevronUpIcon, MapPinIcon, MapIcon, MagnifyingGlassIcon, ChevronLeftIcon, ChevronRightIcon, CheckIcon } from '@heroicons/react/24/outline';
// Mock saved addresses data with additional locations
const savedAddresses = [{
  id: '1',
  name: 'Home',
  contactPerson: 'John Doe',
  phoneNumber: '+965 9876 5432',
  address: 'Block 4, Street 23, House 10, Salmiya',
  coordinates: {
    lat: 29.33,
    lng: 48.02
  }
}, {
  id: '2',
  name: 'Office',
  contactPerson: 'John Doe',
  phoneNumber: '+965 9876 1234',
  address: 'Floor 12, Al Hamra Tower, Kuwait City',
  coordinates: {
    lat: 29.38,
    lng: 47.99
  }
}, {
  id: '3',
  name: 'Salmiya Branch',
  contactPerson: 'Sarah Ahmed',
  phoneNumber: '+965 5555 7777',
  address: 'Block 12, Salem Al Mubarak St, Salmiya',
  coordinates: {
    lat: 29.34,
    lng: 48.03
  }
}, {
  id: '4',
  name: 'Ahmadi Branch',
  contactPerson: 'Mohammed Ali',
  phoneNumber: '+965 6666 8888',
  address: 'Block 5, Street 10, Ahmadi',
  coordinates: {
    lat: 29.08,
    lng: 48.07
  }
}, {
  id: '5',
  name: 'Warehouse',
  contactPerson: 'Khalid Fahad',
  phoneNumber: '+965 9999 1111',
  address: 'Industrial Area, Block 1, Shuwaikh',
  coordinates: {
    lat: 29.35,
    lng: 47.92
  }
}, {
  id: '6',
  name: 'Restaurant',
  contactPerson: 'Fatima Hassan',
  phoneNumber: '+965 7777 2222',
  address: 'The Avenues Mall, 5th Avenue, Al-Rai',
  coordinates: {
    lat: 29.31,
    lng: 47.93
  }
}];
const PickupAddress: React.FC = () => {
  const {
    t,
    direction
  } = useLanguage();
  const {
    formData,
    updateFormData,
    updatePickupAddressCoordinates
  } = useForm();
  const [saveToAddressBook, setSaveToAddressBook] = useState(false);
  const [isMapModalOpen, setIsMapModalOpen] = useState(false);
  const [showSavedAddresses, setShowSavedAddresses] = useState<boolean>(true);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const carouselRef = useRef<HTMLDivElement>(null);
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const {
      name,
      value
    } = e.target;
    updateFormData({
      pickupAddress: {
        ...formData.pickupAddress,
        [name]: value
      }
    });
  };
  const selectSavedAddress = (address: (typeof savedAddresses)[0]) => {
    updateFormData({
      pickupAddress: {
        contactPerson: address.contactPerson,
        phoneNumber: address.phoneNumber,
        address: address.address,
        coordinates: address.coordinates,
        isSaved: true
      }
    });
  };
  const openMapModal = () => {
    setIsMapModalOpen(true);
  };
  const closeMapModal = () => {
    setIsMapModalOpen(false);
  };
  const handleLocationConfirm = (coordinates: any, address: string) => {
    updateFormData({
      pickupAddress: {
        ...formData.pickupAddress,
        address: address
      }
    });
    updatePickupAddressCoordinates(coordinates);
    closeMapModal();
  };
  const scrollCarousel = (direction: 'left' | 'right') => {
    if (carouselRef.current) {
      const scrollAmount = 240; // Approximate width of a card + margin
      const currentScroll = carouselRef.current.scrollLeft;
      const newScroll = direction === 'left' ? currentScroll - scrollAmount : currentScroll + scrollAmount;
      carouselRef.current.scrollTo({
        left: newScroll,
        behavior: 'smooth'
      });
    }
  };
  const filteredAddresses = savedAddresses.filter(address => address.name.toLowerCase().includes(searchQuery.toLowerCase()) || address.address.toLowerCase().includes(searchQuery.toLowerCase()));
  return <div>
      {/* Saved Addresses Section - Collapsible */}
      <div className="mb-5 bg-white rounded-lg border border-gray-200 overflow-hidden">
        <div className="flex justify-between items-center p-3 bg-gray-50 cursor-pointer" onClick={() => setShowSavedAddresses(!showSavedAddresses)}>
          <div className="flex items-center">
            <div className="p-2 bg-congress-blue-200 rounded-full mr-2 border border-congress-blue-300">
              <MapPinIcon className="w-4 h-4 text-congress-blue-700" />
            </div>
            <h3 className="font-medium text-gray-700">
              {t('address.savedAddresses')}
            </h3>
          </div>
          <div>
            {showSavedAddresses ? <ChevronUpIcon className="w-5 h-5" /> : <ChevronDownIcon className="w-5 h-5" />}
          </div>
        </div>
        {showSavedAddresses && <div className="p-3">
            {/* Search and Filter Bar */}
            <div className="relative mb-3">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <MagnifyingGlassIcon className="w-4 h-4 text-gray-400" />
              </div>
              <input type="text" className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md text-sm placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-congress-blue-500 focus:border-congress-blue-500" placeholder={t('common.search')} value={searchQuery} onChange={e => setSearchQuery(e.target.value)} />
            </div>
            {/* Carousel with Navigation Arrows */}
            <div className="relative">
              <button className={`absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white rounded-full p-1 shadow-md border border-gray-200 ${filteredAddresses.length <= 3 ? 'hidden' : ''}`} onClick={() => scrollCarousel('left')}>
                <ChevronLeftIcon className="w-5 h-5 text-gray-600" />
              </button>
              <div ref={carouselRef} className="flex overflow-x-auto space-x-3 pb-2 px-2 scrollbar-hide" style={{
            scrollbarWidth: 'none',
            msOverflowStyle: 'none'
          }}>
                {filteredAddresses.map(address => <div key={address.id} className="relative min-w-[220px] flex-shrink-0">
                    <Card key={address.id} onClick={() => selectSavedAddress(address)} selected={formData.pickupAddress.address === address.address} className="p-3 cursor-pointer">
                      {formData.pickupAddress.address === address.address && <div className="absolute top-2 right-2 w-5 h-5 bg-congress-blue-600 rounded-full flex items-center justify-center">
                          <CheckIcon className="w-3 h-3 text-white" />
                        </div>}
                      <div className="flex items-start">
                        <div className="p-2 bg-congress-blue-200 rounded-full border border-congress-blue-300">
                          <MapPinIcon className="w-4 h-4 text-congress-blue-700" />
                        </div>
                        <div className="ml-2">
                          <h4 className="font-medium text-sm text-congress-blue-800">
                            {address.name}
                          </h4>
                          <p className="text-xs text-gray-600 mt-1 line-clamp-2">
                            {address.address}
                          </p>
                        </div>
                      </div>
                    </Card>
                  </div>)}
              </div>
              <button className={`absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white rounded-full p-1 shadow-md border border-gray-200 ${filteredAddresses.length <= 3 ? 'hidden' : ''}`} onClick={() => scrollCarousel('right')}>
                <ChevronRightIcon className="w-5 h-5 text-gray-600" />
              </button>
            </div>
          </div>}
      </div>
      {/* Address Form */}
      <div className="bg-white rounded-lg p-4 border border-gray-200">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Input label={t('address.contactPerson')} name="contactPerson" value={formData.pickupAddress.contactPerson} onChange={handleInputChange} placeholder="John Doe" required />
          <Input label={t('address.phoneNumber')} name="phoneNumber" value={formData.pickupAddress.phoneNumber} onChange={handleInputChange} placeholder="+965 9876 5432" required />
        </div>
        <div className="relative">
          <Input label={t('address.address')} name="address" value={formData.pickupAddress.address} onChange={handleInputChange} placeholder="Block, Street, Building, Area" required />
          <div className={`absolute ${direction === 'rtl' ? 'left-2' : 'right-2'} top-9`}>
            <button onClick={openMapModal} className={`flex items-center px-3 py-1.5 text-xs font-medium text-white bg-congress-blue-500 hover:bg-congress-blue-600 active:bg-congress-blue-700 rounded-lg transition-colors shadow-sm`}>
              <MapIcon className={`w-4 h-4 ${direction === 'rtl' ? 'ml-1' : 'mr-1'}`} />
              {t('map.selectOnMap')}
            </button>
          </div>
        </div>
        <Checkbox label={t('address.saveToAddressBook')} checked={saveToAddressBook} onChange={setSaveToAddressBook} className="mt-3" />
      </div>
      {/* Map Modal */}
      <MapModal isOpen={isMapModalOpen} onClose={closeMapModal} onConfirm={handleLocationConfirm} initialCoordinates={formData.pickupAddress.coordinates} />
    </div>;
};
export default PickupAddress;