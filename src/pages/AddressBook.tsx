import React, { useEffect, useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { motion, AnimatePresence } from 'framer-motion';
import { MapPinIcon, PlusIcon, MagnifyingGlassIcon, FunnelIcon, ArrowUpTrayIcon, XMarkIcon } from '@heroicons/react/24/outline';
import Button from '../components/ui/Button';
import AddressCard from '../components/address-book/AddressCard';
import ImportModal from '../components/address-book/ImportModal';
import AddAddressModal from '../components/address-book/AddAddressModal';
import { useToast } from '../context/ToastContext';
// Mock data for addresses
const mockAddresses = [{
  id: '1',
  name: 'Home',
  contactPerson: 'John Doe',
  phoneNumber: '+965 9876 5432',
  address: 'Block 4, Street 23, House 10, Salmiya',
  type: 'residential',
  isDefault: true,
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
  type: 'business',
  isDefault: false,
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
  type: 'other',
  isDefault: false,
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
  type: 'residential',
  isDefault: false,
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
  type: 'residential',
  isDefault: false,
  coordinates: {
    lat: 29.34,
    lng: 48.01
  }
}, {
  id: '6',
  name: 'Warehouse',
  contactPerson: 'Khalid Fahad',
  phoneNumber: '+965 9999 1111',
  address: 'Industrial Area, Block 1, Shuwaikh',
  type: 'business',
  isDefault: false,
  coordinates: {
    lat: 29.35,
    lng: 47.92
  }
}, {
  id: '7',
  name: 'Pharmacy',
  contactPerson: 'Fatima Hassan',
  phoneNumber: '+965 7777 2222',
  address: 'The Avenues Mall, 5th Avenue, Al-Rai',
  type: 'business',
  isDefault: false,
  coordinates: {
    lat: 29.31,
    lng: 47.93
  }
}];
interface Address {
  id: string;
  name: string;
  contactPerson: string;
  phoneNumber: string;
  address: string;
  type: 'residential' | 'business' | 'other';
  isDefault: boolean;
  coordinates?: {
    lat: number;
    lng: number;
  };
}
const AddressBook: React.FC = () => {
  const {
    t
  } = useLanguage();
  const {
    showToast
  } = useToast();
  const [addresses, setAddresses] = useState<Address[]>(mockAddresses);
  const [searchQuery, setSearchQuery] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [selectedType, setSelectedType] = useState<string>('all');
  const [isImportModalOpen, setIsImportModalOpen] = useState(false);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [editingAddress, setEditingAddress] = useState<Address | null>(null);
  // Filter addresses based on search query and type
  const filteredAddresses = addresses.filter(address => {
    const matchesSearch = address.name.toLowerCase().includes(searchQuery.toLowerCase()) || address.address.toLowerCase().includes(searchQuery.toLowerCase()) || address.contactPerson.toLowerCase().includes(searchQuery.toLowerCase()) || address.phoneNumber.includes(searchQuery);
    const matchesType = selectedType === 'all' || address.type === selectedType;
    return matchesSearch && matchesType;
  });
  const handleAddAddress = (newAddress: Omit<Address, 'id'>) => {
    const newId = Date.now().toString();
    setAddresses([...addresses, {
      ...newAddress,
      id: newId
    }]);
    setIsAddModalOpen(false);
    showToast('success', t('addressBook.addressAdded'), 3000);
  };
  const handleEditAddress = (address: Address) => {
    setEditingAddress(address);
    setIsAddModalOpen(true);
  };
  const handleUpdateAddress = (updatedAddress: Address) => {
    setAddresses(addresses.map(addr => addr.id === updatedAddress.id ? updatedAddress : addr));
    setIsAddModalOpen(false);
    setEditingAddress(null);
    showToast('success', t('addressBook.addressUpdated'), 3000);
  };
  const handleDeleteAddress = (id: string) => {
    showToast('info', t('addressBook.deletingAddress'), 1000);
    setTimeout(() => {
      setAddresses(addresses.filter(address => address.id !== id));
      showToast('success', t('addressBook.addressDeleted'), 3000);
    }, 500);
  };
  const handleSetDefault = (id: string) => {
    setAddresses(addresses.map(address => ({
      ...address,
      isDefault: address.id === id
    })));
    showToast('success', t('addressBook.defaultAddressSet'), 3000);
  };
  const handleImportAddresses = (importedAddresses: Omit<Address, 'id'>[]) => {
    const newAddresses = importedAddresses.map(address => ({
      ...address,
      id: Date.now() + Math.random().toString(36).substr(2, 9)
    }));
    setAddresses([...addresses, ...newAddresses]);
    setIsImportModalOpen(false);
    showToast('success', t('addressBook.addressesImported', {
      count: newAddresses.length
    }), 3000);
  };
  return <div className="container mx-auto px-4 py-8 bg-gray-50 min-h-screen">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
        <div className="flex items-center mb-4 md:mb-0">
          <div className="p-2 bg-congress-blue-100 rounded-full mr-3">
            <MapPinIcon className="w-5 h-5 text-congress-blue-700" />
          </div>
          <h1 className="text-2xl md:text-3xl font-bold text-congress-blue-800">
            {t('addressBook.title')}
          </h1>
        </div>
        <div className="flex flex-wrap gap-3">
          <Button variant="outline" size="sm" onClick={() => setIsImportModalOpen(true)} className="flex items-center">
            <ArrowUpTrayIcon className="w-4 h-4 mr-2" />
            {t('addressBook.import')}
          </Button>
          <Button variant="primary" size="sm" onClick={() => {
          setEditingAddress(null);
          setIsAddModalOpen(true);
        }} className="flex items-center">
            <PlusIcon className="w-4 h-4 mr-2" />
            {t('addressBook.addNew')}
          </Button>
        </div>
      </div>
      {/* Search and Filter Bar */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 mb-6">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="relative flex-grow">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <MagnifyingGlassIcon className="w-5 h-5 text-gray-400" />
            </div>
            <input type="text" value={searchQuery} onChange={e => setSearchQuery(e.target.value)} placeholder={t('addressBook.searchPlaceholder')} className="pl-10 block w-full py-2.5 px-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-congress-blue-500" />
            {searchQuery && <button className="absolute inset-y-0 right-0 pr-3 flex items-center" onClick={() => setSearchQuery('')}>
                <XMarkIcon className="w-5 h-5 text-gray-400 hover:text-gray-600" />
              </button>}
          </div>
          <div className="flex gap-2">
            <Button variant="outline" size="sm" onClick={() => setShowFilters(!showFilters)} className={`flex items-center ${showFilters ? 'bg-gray-100' : ''}`}>
              <FunnelIcon className="w-4 h-4 mr-2" />
              {t('addressBook.filter')}
            </Button>
          </div>
        </div>
        {/* Filters */}
        <AnimatePresence>
          {showFilters && <motion.div initial={{
          height: 0,
          opacity: 0
        }} animate={{
          height: 'auto',
          opacity: 1
        }} exit={{
          height: 0,
          opacity: 0
        }} transition={{
          duration: 0.3
        }} className="overflow-hidden">
              <div className="mt-4 pt-4 border-t border-gray-200">
                <h3 className="text-sm font-medium text-gray-700 mb-3">
                  {t('addressBook.filterByType')}
                </h3>
                <div className="flex flex-wrap gap-2">
                  <FilterButton active={selectedType === 'all'} onClick={() => setSelectedType('all')} label={t('addressBook.allAddresses')} />
                  <FilterButton active={selectedType === 'residential'} onClick={() => setSelectedType('residential')} label={t('addressBook.residential')} color="bg-regent-st-blue-50 text-regent-st-blue-700 border-regent-st-blue-200" activeColor="bg-regent-st-blue-100 border-regent-st-blue-300" />
                  <FilterButton active={selectedType === 'business'} onClick={() => setSelectedType('business')} label={t('addressBook.business')} color="bg-congress-blue-50 text-congress-blue-700 border-congress-blue-200" activeColor="bg-congress-blue-100 border-congress-blue-300" />
                  <FilterButton active={selectedType === 'other'} onClick={() => setSelectedType('other')} label={t('addressBook.other')} color="bg-gray-100 text-gray-700 border-gray-200" activeColor="bg-gray-200 border-gray-300" />
                </div>
              </div>
            </motion.div>}
        </AnimatePresence>
      </div>
      {/* Address Grid */}
      {filteredAddresses.length > 0 ? <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredAddresses.map(address => <AddressCard key={address.id} address={address} onEdit={() => handleEditAddress(address)} onDelete={() => handleDeleteAddress(address.id)} onSetDefault={() => handleSetDefault(address.id)} />)}
        </div> : <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8 text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gray-100 rounded-full mb-4">
            <MapPinIcon className="w-8 h-8 text-gray-400" />
          </div>
          <h3 className="text-lg font-medium text-gray-700 mb-2">
            {searchQuery ? t('addressBook.noAddressesFound') : t('addressBook.noAddresses')}
          </h3>
          <p className="text-gray-500 mb-6">
            {searchQuery ? t('addressBook.tryDifferentSearch') : t('addressBook.addYourFirstAddress')}
          </p>
          <Button variant="primary" onClick={() => {
        setEditingAddress(null);
        setIsAddModalOpen(true);
      }}>
            <PlusIcon className="w-4 h-4 mr-2" />
            {t('addressBook.addNew')}
          </Button>
        </div>}
      {/* Import Modal */}
      <ImportModal isOpen={isImportModalOpen} onClose={() => setIsImportModalOpen(false)} onImport={handleImportAddresses} />
      {/* Add/Edit Address Modal */}
      <AddAddressModal isOpen={isAddModalOpen} onClose={() => {
      setIsAddModalOpen(false);
      setEditingAddress(null);
    }} onAdd={handleAddAddress} onUpdate={handleUpdateAddress} editingAddress={editingAddress} />
    </div>;
};
// Filter button component
const FilterButton: React.FC<{
  active: boolean;
  onClick: () => void;
  label: string;
  color?: string;
  activeColor?: string;
}> = ({
  active,
  onClick,
  label,
  color = 'bg-gray-100 text-gray-700 border-gray-200',
  activeColor = 'bg-gray-200 border-gray-300'
}) => {
  return <motion.button onClick={onClick} className={`px-3 py-1.5 rounded-full text-xs font-medium border flex items-center ${active ? activeColor : color}`} whileHover={{
    scale: 1.05
  }} whileTap={{
    scale: 0.95
  }}>
      {label}
    </motion.button>;
};
export default AddressBook;