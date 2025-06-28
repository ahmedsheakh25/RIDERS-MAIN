import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLanguage } from '../../context/LanguageContext';
import { XMarkIcon, ArrowUpTrayIcon, DocumentTextIcon, ArrowPathIcon, CheckCircleIcon } from '@heroicons/react/24/outline';
import Button from '../ui/Button';
interface Address {
  name: string;
  contactPerson: string;
  phoneNumber: string;
  address: string;
  type: 'residential' | 'business' | 'other';
  isDefault: boolean;
}
interface ImportModalProps {
  isOpen: boolean;
  onClose: () => void;
  onImport: (addresses: Address[]) => void;
}
// Field mapping options
const fieldOptions = [{
  value: 'name',
  label: 'Name'
}, {
  value: 'contactPerson',
  label: 'Contact Person'
}, {
  value: 'phoneNumber',
  label: 'Phone Number'
}, {
  value: 'address',
  label: 'Address'
}, {
  value: 'type',
  label: 'Type'
}, {
  value: 'isDefault',
  label: 'Is Default'
}, {
  value: 'ignore',
  label: 'Ignore this column'
}];
const ImportModal: React.FC<ImportModalProps> = ({
  isOpen,
  onClose,
  onImport
}) => {
  const {
    t
  } = useLanguage();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [step, setStep] = useState(1); // 1: Upload, 2: Map Fields, 3: Preview
  const [file, setFile] = useState<File | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [headers, setHeaders] = useState<string[]>([]);
  const [fieldMapping, setFieldMapping] = useState<Record<string, string>>({});
  const [previewData, setPreviewData] = useState<string[][]>([]);
  const [mappedAddresses, setMappedAddresses] = useState<Address[]>([]);
  const resetState = () => {
    setStep(1);
    setFile(null);
    setIsLoading(false);
    setHeaders([]);
    setFieldMapping({});
    setPreviewData([]);
    setMappedAddresses([]);
  };
  const handleClose = () => {
    resetState();
    onClose();
  };
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
      processFile(e.target.files[0]);
    }
  };
  const processFile = (file: File) => {
    setIsLoading(true);
    const reader = new FileReader();
    reader.onload = e => {
      try {
        const content = e.target?.result as string;
        const lines = content.split('\n');
        if (lines.length > 0) {
          // Parse CSV - simple implementation for demo purposes
          const parsedHeaders = lines[0].split(',').map(h => h.trim());
          setHeaders(parsedHeaders);
          // Initialize field mapping
          const initialMapping: Record<string, string> = {};
          parsedHeaders.forEach(header => {
            // Try to guess the mapping based on header name
            if (header.toLowerCase().includes('name') && !header.toLowerCase().includes('contact')) {
              initialMapping[header] = 'name';
            } else if (header.toLowerCase().includes('contact') || header.toLowerCase().includes('person')) {
              initialMapping[header] = 'contactPerson';
            } else if (header.toLowerCase().includes('phone') || header.toLowerCase().includes('mobile')) {
              initialMapping[header] = 'phoneNumber';
            } else if (header.toLowerCase().includes('address')) {
              initialMapping[header] = 'address';
            } else if (header.toLowerCase().includes('type')) {
              initialMapping[header] = 'type';
            } else if (header.toLowerCase().includes('default')) {
              initialMapping[header] = 'isDefault';
            } else {
              initialMapping[header] = 'ignore';
            }
          });
          setFieldMapping(initialMapping);
          // Get preview data (up to 5 rows)
          const previewRows = lines.slice(1, 6).map(line => line.split(',').map(cell => cell.trim()));
          setPreviewData(previewRows);
          setStep(2); // Move to mapping step
        }
      } catch (error) {
        console.error('Error processing file:', error);
        // Handle error
      } finally {
        setIsLoading(false);
      }
    };
    reader.readAsText(file);
  };
  const handleFieldMappingChange = (header: string, value: string) => {
    setFieldMapping({
      ...fieldMapping,
      [header]: value
    });
  };
  const handleContinueToPreview = () => {
    // Map the data to address objects
    const addresses: Address[] = previewData.map(row => {
      const address: Partial<Address> = {
        type: 'other',
        isDefault: false // Default value
      };
      headers.forEach((header, index) => {
        const field = fieldMapping[header];
        const value = row[index];
        if (field !== 'ignore' && value) {
          if (field === 'isDefault') {
            // Convert string to boolean
            address[field] = value.toLowerCase() === 'true' || value === '1' || value.toLowerCase() === 'yes';
          } else if (field === 'type') {
            // Validate type
            const normalizedType = value.toLowerCase();
            if (['residential', 'business', 'other'].includes(normalizedType)) {
              address[field] = normalizedType as 'residential' | 'business' | 'other';
            } else {
              address[field] = 'other';
            }
          } else {
            address[field as keyof Address] = value;
          }
        }
      });
      // Ensure all required fields are present
      if (!address.name) address.name = 'Imported Address';
      if (!address.contactPerson) address.contactPerson = 'Unknown';
      if (!address.phoneNumber) address.phoneNumber = 'N/A';
      if (!address.address) address.address = 'No address provided';
      return address as Address;
    });
    setMappedAddresses(addresses);
    setStep(3); // Move to preview step
  };
  const handleImport = () => {
    onImport(mappedAddresses);
    handleClose();
  };
  if (!isOpen) return null;
  return <div className="fixed inset-0 z-50 overflow-y-auto bg-gray-500 bg-opacity-75 flex items-center justify-center">
      <motion.div className="bg-white rounded-xl shadow-xl max-w-4xl w-full mx-4 overflow-hidden" initial={{
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
            {step === 1 && t('addressBook.importAddresses')}
            {step === 2 && t('addressBook.mapFields')}
            {step === 3 && t('addressBook.previewImport')}
          </h2>
          <button onClick={handleClose} className="p-2 text-gray-400 hover:text-gray-600 rounded-full hover:bg-gray-100">
            <XMarkIcon className="w-5 h-5" />
          </button>
        </div>
        {/* Content */}
        <div className="px-6 py-6">
          {/* Step 1: Upload File */}
          {step === 1 && <div className="text-center">
              <div className="mb-6">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-congress-blue-100 rounded-full mb-4">
                  <ArrowUpTrayIcon className="w-8 h-8 text-congress-blue-700" />
                </div>
                <h3 className="text-lg font-medium text-gray-800 mb-2">
                  {t('addressBook.uploadCSV')}
                </h3>
                <p className="text-gray-600 mb-6 max-w-md mx-auto">
                  {t('addressBook.uploadDescription')}
                </p>
              </div>
              <div className="border-2 border-dashed border-gray-300 rounded-lg px-6 py-10 mb-6 cursor-pointer hover:border-congress-blue-400 transition-colors" onClick={() => fileInputRef.current?.click()}>
                <input type="file" ref={fileInputRef} accept=".csv,.xlsx,.xls" className="hidden" onChange={handleFileChange} />
                <DocumentTextIcon className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-600 mb-1">
                  {t('addressBook.dragAndDrop')}
                </p>
                <p className="text-sm text-gray-500">
                  {t('addressBook.supportedFormats')}
                </p>
              </div>
              <div className="text-sm text-gray-500 mb-8">
                <p className="mb-2">{t('addressBook.downloadTemplate')}</p>
                <Button variant="outline" size="sm">
                  {t('addressBook.downloadCSVTemplate')}
                </Button>
              </div>
            </div>}
          {/* Step 2: Map Fields */}
          {step === 2 && <div>
              <p className="text-gray-600 mb-4">
                {t('addressBook.mapFieldsDescription')}
              </p>
              <div className="bg-gray-50 rounded-lg p-4 mb-6 border border-gray-200">
                <h4 className="font-medium text-gray-700 mb-3">
                  {t('addressBook.fieldMapping')}
                </h4>
                <div className="space-y-4">
                  {headers.map((header, index) => <div key={index} className="flex items-center">
                      <div className="w-1/3 font-medium text-gray-700">
                        {header}
                      </div>
                      <div className="w-2/3">
                        <select value={fieldMapping[header] || 'ignore'} onChange={e => handleFieldMappingChange(header, e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-congress-blue-500">
                          {fieldOptions.map(option => <option key={option.value} value={option.value}>
                              {option.label}
                            </option>)}
                        </select>
                      </div>
                    </div>)}
                </div>
              </div>
              <div className="bg-gray-50 rounded-lg p-4 mb-6 border border-gray-200">
                <h4 className="font-medium text-gray-700 mb-3">
                  {t('addressBook.dataPreview')}
                </h4>
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-100">
                      <tr>
                        {headers.map((header, index) => <th key={index} className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            {header}
                          </th>)}
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {previewData.map((row, rowIndex) => <tr key={rowIndex}>
                          {row.map((cell, cellIndex) => <td key={cellIndex} className="px-3 py-2 whitespace-nowrap text-sm text-gray-700">
                              {cell}
                            </td>)}
                        </tr>)}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>}
          {/* Step 3: Preview */}
          {step === 3 && <div>
              <div className="flex items-center bg-green-50 text-green-700 p-4 rounded-lg mb-6">
                <CheckCircleIcon className="w-6 h-6 mr-2" />
                <p>
                  {t('addressBook.readyToImport', {
                count: mappedAddresses.length
              })}
                </p>
              </div>
              <div className="bg-gray-50 rounded-lg p-4 mb-6 border border-gray-200">
                <h4 className="font-medium text-gray-700 mb-3">
                  {t('addressBook.addressesPreview')}
                </h4>
                <div className="overflow-y-auto max-h-64">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-100">
                      <tr>
                        <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          {t('addressBook.name')}
                        </th>
                        <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          {t('addressBook.contactPerson')}
                        </th>
                        <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          {t('addressBook.phoneNumber')}
                        </th>
                        <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          {t('addressBook.address')}
                        </th>
                        <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          {t('addressBook.type')}
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {mappedAddresses.map((address, index) => <tr key={index}>
                          <td className="px-3 py-2 whitespace-nowrap text-sm text-gray-700">
                            {address.name}
                          </td>
                          <td className="px-3 py-2 whitespace-nowrap text-sm text-gray-700">
                            {address.contactPerson}
                          </td>
                          <td className="px-3 py-2 whitespace-nowrap text-sm text-gray-700">
                            {address.phoneNumber}
                          </td>
                          <td className="px-3 py-2 whitespace-nowrap text-sm text-gray-700 max-w-xs truncate">
                            {address.address}
                          </td>
                          <td className="px-3 py-2 whitespace-nowrap text-sm text-gray-700">
                            {address.type}
                          </td>
                        </tr>)}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>}
        </div>
        {/* Footer */}
        <div className="px-6 py-4 border-t border-gray-200 flex justify-between">
          {step > 1 ? <Button variant="outline" onClick={() => setStep(step - 1)}>
              {t('common.back')}
            </Button> : <Button variant="outline" onClick={handleClose}>
              {t('common.cancel')}
            </Button>}
          {step === 1 && <Button variant="primary" disabled={!file || isLoading} onClick={() => fileInputRef.current?.click()}>
              {isLoading ? <>
                  <ArrowPathIcon className="w-4 h-4 mr-2 animate-spin" />
                  {t('common.loading')}
                </> : <>
                  <ArrowUpTrayIcon className="w-4 h-4 mr-2" />
                  {t('addressBook.selectFile')}
                </>}
            </Button>}
          {step === 2 && <Button variant="primary" onClick={handleContinueToPreview}>
              {t('addressBook.continueToPreview')}
            </Button>}
          {step === 3 && <Button variant="primary" onClick={handleImport}>
              {t('addressBook.importNow')}
            </Button>}
        </div>
      </motion.div>
    </div>;
};
export default ImportModal;