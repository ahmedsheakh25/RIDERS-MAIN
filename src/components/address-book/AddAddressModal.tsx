import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from '../../context/LanguageContext';
import { XMarkIcon, MapPinIcon } from '@heroicons/react/24/outline';
import Button from '../ui/Button';
import Input from '../ui/Input';
import MapModal from '../ui/MapModal';
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
interface AddAddressModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAdd: (address: Omit<Address, 'id'>) => void;
  onUpdate: (address: Address) => void;
  editingAddress: Address | null;
}
const AddAddressModal: React.FC<AddAddressModalProps> = ({
  isOpen,
  onClose,
  onAdd,
  onUpdate,
  editingAddress
}) => {
  const {
    t,
    direction
  } = useLanguage();
  const [formData, setFormData] = useState({
    name: '',
    contactPerson: '',
    phoneNumber: '',
    address: '',
    type: 'residential' as 'residential' | 'business' | 'other',
    isDefault: false,
    coordinates: undefined as {
      lat: number;
      lng: number;
    } | undefined
  });
  const [isMapModalOpen, setIsMapModalOpen] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  // Reset form when modal opens/closes or editing address changes
  useEffect(() => {
    if (isOpen) {
      if (editingAddress) {
        setFormData({
          name: editingAddress.name,
          contactPerson: editingAddress.contactPerson,
          phoneNumber: editingAddress.phoneNumber,
          address: editingAddress.address,
          type: editingAddress.type,
          isDefault: editingAddress.isDefault,
          coordinates: editingAddress.coordinates
        });
      } else {
        setFormData({
          name: '',
          contactPerson: '',
          phoneNumber: '',
          address: '',
          type: 'residential',
          isDefault: false,
          coordinates: undefined
        });
      }
      setErrors({});
    }
  }, [isOpen, editingAddress]);
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const {
      name,
      value,
      type
    } = e.target;
    if (type === 'checkbox') {
      const checked = (e.target as HTMLInputElement).checked;
      setFormData(prev => ({
        ...prev,
        [name]: checked
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value
      }));
    }
    // Clear error when field is edited
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };
  const handleLocationSelect = (coordinates: any, address: string) => {
    setFormData(prev => ({
      ...prev,
      address,
      coordinates
    }));
  };
  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.name.trim()) {
      newErrors.name = t('addressBook.nameRequired');
    }
    if (!formData.contactPerson.trim()) {
      newErrors.contactPerson = t('addressBook.contactPersonRequired');
    }
    if (!formData.phoneNumber.trim()) {
      newErrors.phoneNumber = t('addressBook.phoneNumberRequired');
    }
    if (!formData.address.trim()) {
      newErrors.address = t('addressBook.addressRequired');
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) {
      return;
    }
    if (editingAddress) {
      onUpdate({
        ...formData,
        id: editingAddress.id
      });
    } else {
      onAdd(formData);
    }
  };
  if (!isOpen) return null;
  return <div className="fixed inset-0 z-50 overflow-y-auto bg-gray-500 bg-opacity-75 flex items-center justify-center">
      <motion.div className="bg-white rounded-xl shadow-xl max-w-xl w-full mx-4 overflow-hidden" initial={{
      opacity: 0,
      scale: 0.9
    }} animate={{
      opacity: 1,
      scale: 1
    }} exit={{
      opacity: 0,
      scale: 0.9
    }} transition={{
      duration: 0.3
    }}>
        {/* Header */}
        <div className="px-6 py-4 border-b border-gray-200 flex justify-between items-center">
          <h2 className="text-xl font-semibold text-gray-800">
            {editingAddress ? t('addressBook.editAddress') : t('addressBook.addNewAddress')}
          </h2>
          <button onClick={onClose} className="p-2 text-gray-400 hover:text-gray-600 rounded-full hover:bg-gray-100">
            <XMarkIcon className="w-5 h-5" />
          </button>
        </div>
        {/* Form */}
        <form onSubmit={handleSubmit}>
          <div className="px-6 py-6 space-y-4">
            <Input label={t('addressBook.name')} name="name" value={formData.name} onChange={handleInputChange} placeholder={t('addressBook.namePlaceholder')} error={errors.name} required />
            <Input label={t('addressBook.contactPerson')} name="contactPerson" value={formData.contactPerson} onChange={handleInputChange} placeholder={t('addressBook.contactPersonPlaceholder')} error={errors.contactPerson} required />
            <Input label={t('addressBook.phoneNumber')} name="phoneNumber" value={formData.phoneNumber} onChange={handleInputChange} placeholder={t('addressBook.phoneNumberPlaceholder')} error={errors.phoneNumber} required />
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">
                {t('addressBook.address')}{' '}
                {<span className="text-red-500">*</span>}
              </label>
              <div className="relative">
                <input name="address" value={formData.address} onChange={handleInputChange} placeholder={t('addressBook.addressPlaceholder')} className={`
                    w-full px-4 py-2.5 border rounded-lg focus:outline-none focus:ring-2 transition-all
                    ${errors.address ? 'border-red-300 focus:ring-red-200 focus:border-red-400' : 'border-gray-300 focus:ring-[#8ECAE6]/20 focus:border-[#8ECAE6]'}
                  `} required />
                <div className={`absolute ${direction === 'rtl' ? 'left-2' : 'right-2'} top-2`}>
                  <button type="button" onClick={() => setIsMapModalOpen(true)} className={`flex items-center px-3 py-1.5 text-xs font-medium text-white bg-congress-blue-500 hover:bg-congress-blue-600 active:bg-congress-blue-700 rounded-lg transition-colors shadow-sm`}>
                    <MapPinIcon className={`w-4 h-4 ${direction === 'rtl' ? 'ml-1' : 'mr-1'}`} />
                    {t('map.selectOnMap')}
                  </button>
                </div>
              </div>
              {errors.address && <p className="mt-1.5 text-xs text-red-500">{errors.address}</p>}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">
                {t('addressBook.addressType')}
              </label>
              <select name="type" value={formData.type} onChange={handleInputChange} className="w-full px-3 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-[#8ECAE6]">
                <option value="residential">
                  {t('addressBook.residential')}
                </option>
                <option value="business">{t('addressBook.business')}</option>
                <option value="other">{t('addressBook.other')}</option>
              </select>
            </div>
            <div className="flex items-center">
              <input type="checkbox" id="isDefault" name="isDefault" checked={formData.isDefault} onChange={e => handleInputChange(e)} className="h-4 w-4 text-congress-blue-600 focus:ring-congress-blue-500 border-gray-300 rounded" />
              <label htmlFor="isDefault" className="ml-2 block text-sm text-gray-700">
                {t('addressBook.setAsDefault')}
              </label>
            </div>
          </div>
          {/* Footer */}
          <div className="px-6 py-4 border-t border-gray-200 flex justify-between">
            <Button variant="outline" type="button" onClick={onClose}>
              {t('common.cancel')}
            </Button>
            <Button variant="primary" type="submit">
              {editingAddress ? t('addressBook.saveChanges') : t('addressBook.addAddress')}
            </Button>
          </div>
        </form>
        {/* Map Modal */}
        <MapModal isOpen={isMapModalOpen} onClose={() => setIsMapModalOpen(false)} onConfirm={handleLocationSelect} initialCoordinates={formData.coordinates} />
      </motion.div>
    </div>;
};
export default AddAddressModal;