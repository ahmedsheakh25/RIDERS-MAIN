import React, { useState, useRef } from 'react';
import { useForm } from '../../context/FormContext';
import { useLanguage } from '../../context/LanguageContext';
import Card from '../ui/Card';
import Input from '../ui/Input';
import Button from '../ui/Button';
import Checkbox from '../ui/Checkbox';
import MapModal from '../ui/MapModal';
import { ChevronDownIcon, ChevronUpIcon, PlusIcon, TrashIcon, MapIcon, MapPinIcon, MagnifyingGlassIcon, ChevronLeftIcon, ChevronRightIcon, CheckIcon } from '@heroicons/react/24/outline';
// Mock saved addresses data
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
  name: 'Gym',
  contactPerson: 'John Doe',
  phoneNumber: '+965 5555 1234',
  address: 'Olympia Gym, Salem Al Mubarak St, Salmiya',
  coordinates: {
    lat: 29.35,
    lng: 48.05
  }
}, {
  id: '4',
  name: 'Parents',
  contactPerson: 'Ahmed Doe',
  phoneNumber: '+965 9999 8888',
  address: 'Block 10, Street 5, House 20, Jabriya',
  coordinates: {
    lat: 29.32,
    lng: 48.03
  }
}, {
  id: '5',
  name: 'Friend',
  contactPerson: 'Sarah Smith',
  phoneNumber: '+965 7777 6666',
  address: 'Block 2, Street 12, Building 5, Apt 3, Hawally',
  coordinates: {
    lat: 29.34,
    lng: 48.01
  }
}];
const DeliveryAddresses: React.FC = () => {
  const {
    t,
    direction
  } = useLanguage();
  const {
    formData,
    updateFormData,
    updateDeliveryAddressCoordinates,
    addDeliveryAddress,
    removeDeliveryAddress
  } = useForm();
  const [expandedAddressId, setExpandedAddressId] = useState<string>(formData.deliveryAddresses[0].id);
  const [activeMapAddressId, setActiveMapAddressId] = useState<string | null>(null);
  const [showSavedAddresses, setShowSavedAddresses] = useState<boolean>(true);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const carouselRef = useRef<HTMLDivElement>(null);
  // Track which saved addresses are already used
  const [selectedSavedAddresses, setSelectedSavedAddresses] = useState<string[]>([]);
  // Track which addresses should be saved to address book
  const [saveToAddressBook, setSaveToAddressBook] = useState<Record<string, boolean>>({});
  const handleInputChange = (id: string, field: string, value: string) => {
    const updatedAddresses = formData.deliveryAddresses.map(addr => addr.id === id ? {
      ...addr,
      [field]: value
    } : addr);
    updateFormData({
      deliveryAddresses: updatedAddresses
    });
  };
  const toggleExpand = (id: string) => {
    setExpandedAddressId(expandedAddressId === id ? '' : id);
  };
  const openMapModal = (addressId: string) => {
    setActiveMapAddressId(addressId);
  };
  const closeMapModal = () => {
    setActiveMapAddressId(null);
  };
  const handleLocationConfirm = (coordinates: any, address: string) => {
    if (!activeMapAddressId) return;
    const updatedAddresses = formData.deliveryAddresses.map(addr => addr.id === activeMapAddressId ? {
      ...addr,
      address: address
    } : addr);
    updateFormData({
      deliveryAddresses: updatedAddresses
    });
    updateDeliveryAddressCoordinates(activeMapAddressId, coordinates);
    closeMapModal();
  };
  // Toggle saved address selection
  const toggleSavedAddress = (savedAddress: (typeof savedAddresses)[0]) => {
    // Check if this address is already selected
    const isSelected = selectedSavedAddresses.includes(savedAddress.id);
    if (isSelected) {
      // If already selected, remove it
      setSelectedSavedAddresses(selectedSavedAddresses.filter(id => id !== savedAddress.id));
      // Find and remove any delivery addresses with this saved address
      const updatedAddresses = formData.deliveryAddresses.filter(addr => addr.address !== savedAddress.address);
      // If we removed all addresses, add an empty one
      if (updatedAddresses.length === 0) {
        updatedAddresses.push({
          id: Date.now().toString(),
          contactPerson: '',
          phoneNumber: '',
          address: '',
          coordinates: undefined
        });
      }
      updateFormData({
        deliveryAddresses: updatedAddresses
      });
    } else {
      // If not selected, add it
      setSelectedSavedAddresses([...selectedSavedAddresses, savedAddress.id]);
      // Create a new delivery address with this saved address
      const newId = Date.now().toString();
      updateFormData({
        deliveryAddresses: [...formData.deliveryAddresses, {
          id: newId,
          contactPerson: savedAddress.contactPerson,
          phoneNumber: savedAddress.phoneNumber,
          address: savedAddress.address,
          coordinates: savedAddress.coordinates
        }]
      });
    }
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
  // Check if an address is used in any delivery address
  const isAddressSelected = (savedAddress: (typeof savedAddresses)[0]) => {
    return selectedSavedAddresses.includes(savedAddress.id);
  };
  // Handle save to address book checkbox change
  const handleSaveToAddressBook = (id: string, checked: boolean) => {
    setSaveToAddressBook(prev => ({
      ...prev,
      [id]: checked
    }));
  };
  return <div>
      <p className="text-sm text-gray-600 mb-4">
        {t('deliveryAddresses.additionalFee')}
      </p>
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
                {filteredAddresses.map(address => {
              const isSelected = isAddressSelected(address);
              return <div key={address.id} className="relative min-w-[220px] flex-shrink-0" onClick={() => toggleSavedAddress(address)}>
                      <Card className={`p-3 cursor-pointer ${isSelected ? 'border-2 border-congress-blue-600' : ''}`} selected={isSelected}>
                        {isSelected && <div className="absolute top-2 right-2 w-5 h-5 bg-congress-blue-600 rounded-full flex items-center justify-center">
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
                    </div>;
            })}
              </div>
              <button className={`absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white rounded-full p-1 shadow-md border border-gray-200 ${filteredAddresses.length <= 3 ? 'hidden' : ''}`} onClick={() => scrollCarousel('right')}>
                <ChevronRightIcon className="w-5 h-5 text-gray-600" />
              </button>
            </div>
            <div className="mt-3 text-sm text-gray-500">
              {selectedSavedAddresses.length > 0 ? <p>
                  {t('common.selected')}: {selectedSavedAddresses.length}
                </p> : <p>{t('address.selectToAdd')}</p>}
            </div>
          </div>}
      </div>
      <div className="space-y-3">
        {formData.deliveryAddresses.map((address, index) => <Card key={address.id} className="overflow-hidden p-0 border border-gray-200">
            <div className="flex justify-between items-center cursor-pointer p-3 bg-gray-50" onClick={() => toggleExpand(address.id)}>
              <div className="flex items-center">
                <div className="w-6 h-6 rounded-full bg-congress-blue-200 border border-congress-blue-300 flex items-center justify-center text-congress-blue-800 font-medium text-sm mr-2">
                  {index + 1}
                </div>
                <h3 className="font-medium text-sm">
                  {t('deliveryAddresses.address')} {index + 1}
                </h3>
              </div>
              <div className="flex items-center">
                {formData.deliveryAddresses.length > 1 && <button onClick={e => {
              e.stopPropagation();
              removeDeliveryAddress(address.id);
              // Also remove from selected saved addresses if it matches
              const matchingSavedAddress = savedAddresses.find(saved => saved.address === address.address);
              if (matchingSavedAddress) {
                setSelectedSavedAddresses(prev => prev.filter(id => id !== matchingSavedAddress.id));
              }
            }} className="mr-2 p-1 text-gray-500 hover:text-red-500">
                    <TrashIcon className="w-4 h-4" />
                  </button>}
                {expandedAddressId === address.id ? <ChevronUpIcon className="w-5 h-5" /> : <ChevronDownIcon className="w-5 h-5" />}
              </div>
            </div>
            {expandedAddressId === address.id && <div className="p-3">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <Input label={t('address.contactPerson')} name={`contactPerson-${address.id}`} value={address.contactPerson} onChange={e => handleInputChange(address.id, 'contactPerson', e.target.value)} placeholder="John Doe" required className="mb-3" />
                  <Input label={t('address.phoneNumber')} name={`phoneNumber-${address.id}`} value={address.phoneNumber} onChange={e => handleInputChange(address.id, 'phoneNumber', e.target.value)} placeholder="+965 9876 5432" required className="mb-3" />
                </div>
                <div className="relative">
                  <Input label={t('address.address')} name={`address-${address.id}`} value={address.address} onChange={e => handleInputChange(address.id, 'address', e.target.value)} placeholder="Block, Street, Building, Area" required className="mb-0" />
                  <div className={`absolute ${direction === 'rtl' ? 'left-2' : 'right-2'} top-9`}>
                    <button onClick={() => openMapModal(address.id)} className={`flex items-center px-3 py-1.5 text-xs font-medium text-white bg-congress-blue-500 hover:bg-congress-blue-600 active:bg-congress-blue-700 rounded-lg transition-colors shadow-sm`}>
                      <MapIcon className={`w-4 h-4 ${direction === 'rtl' ? 'ml-1' : 'mr-1'}`} />
                      {t('map.selectOnMap')}
                    </button>
                  </div>
                </div>
                {/* Save to address book checkbox */}
                <Checkbox label={t('address.saveToAddressBook')} checked={saveToAddressBook[address.id] || false} onChange={checked => handleSaveToAddressBook(address.id, checked)} className="mt-3" />
              </div>}
          </Card>)}
      </div>
      <Button variant="outline" onClick={() => {
      addDeliveryAddress();
      // Expand the newly added address
      const newId = Date.now().toString();
      setExpandedAddressId(newId);
    }} className="mt-3" size="sm">
        <PlusIcon className="w-4 h-4 mr-1" />
        {t('deliveryAddresses.addAddress')}
      </Button>
      {/* Map Modal */}
      {activeMapAddressId && <MapModal isOpen={!!activeMapAddressId} onClose={closeMapModal} onConfirm={handleLocationConfirm} initialCoordinates={formData.deliveryAddresses.find(addr => addr.id === activeMapAddressId)?.coordinates} />}
    </div>;
};
export default DeliveryAddresses;