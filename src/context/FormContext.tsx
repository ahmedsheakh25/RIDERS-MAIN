import React, { useState, createContext, useContext } from 'react';
export type ServiceType = 'immediate' | 'scheduled';
export type VehicleType = 'motorcycle' | 'car';
export type PaymentMethod = 'wallet' | 'cash' | 'card';
export type PackageType = 'food' | 'gift' | 'groceries' | 'flowers' | 'other';
interface Coordinates {
  lat: number;
  lng: number;
}
interface Address {
  contactPerson: string;
  phoneNumber: string;
  address: string;
  coordinates?: Coordinates;
  isSaved?: boolean;
}
interface DeliveryAddress extends Address {
  id: string;
}
interface FormData {
  // Service Selection
  serviceType: ServiceType | null;
  scheduledDate?: Date;
  scheduledTime?: string;
  // Vehicle Selection
  vehicleType: VehicleType | null;
  // Pickup Address
  pickupAddress: Address;
  // Delivery Addresses
  deliveryAddresses: DeliveryAddress[];
  // Package Details
  weight: number;
  packageType: PackageType | null;
  insurance: boolean;
  insuranceValue: number;
  // Additional Options
  loadingAssistance: boolean;
  discountCode: string;
  termsAccepted: boolean;
  // Payment
  paymentMethod: PaymentMethod | null;
}
interface FormContextType {
  currentStep: number;
  formData: FormData;
  totalPrice: number;
  setCurrentStep: (step: number) => void;
  updateFormData: (data: Partial<FormData>) => void;
  updatePickupAddressCoordinates: (coordinates: Coordinates) => void;
  updateDeliveryAddressCoordinates: (id: string, coordinates: Coordinates) => void;
  addDeliveryAddress: () => void;
  removeDeliveryAddress: (id: string) => void;
  calculatePrice: () => number;
}
const initialFormData: FormData = {
  serviceType: null,
  vehicleType: null,
  pickupAddress: {
    contactPerson: '',
    phoneNumber: '',
    address: '',
    coordinates: undefined
  },
  deliveryAddresses: [{
    id: '1',
    contactPerson: '',
    phoneNumber: '',
    address: '',
    coordinates: undefined
  }],
  weight: 0,
  packageType: null,
  insurance: false,
  insuranceValue: 0,
  loadingAssistance: false,
  discountCode: '',
  termsAccepted: false,
  paymentMethod: null
};
const FormContext = createContext<FormContextType | undefined>(undefined);
export const FormProvider: React.FC<{
  children: React.ReactNode;
}> = ({
  children
}) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState<FormData>(initialFormData);
  const updateFormData = (data: Partial<FormData>) => {
    setFormData(prev => ({
      ...prev,
      ...data
    }));
  };
  const updatePickupAddressCoordinates = (coordinates: Coordinates) => {
    setFormData(prev => ({
      ...prev,
      pickupAddress: {
        ...prev.pickupAddress,
        coordinates
      }
    }));
  };
  const updateDeliveryAddressCoordinates = (id: string, coordinates: Coordinates) => {
    setFormData(prev => ({
      ...prev,
      deliveryAddresses: prev.deliveryAddresses.map(addr => addr.id === id ? {
        ...addr,
        coordinates
      } : addr)
    }));
  };
  const addDeliveryAddress = () => {
    const newId = Date.now().toString();
    setFormData(prev => ({
      ...prev,
      deliveryAddresses: [...prev.deliveryAddresses, {
        id: newId,
        contactPerson: '',
        phoneNumber: '',
        address: '',
        coordinates: undefined
      }]
    }));
  };
  const removeDeliveryAddress = (id: string) => {
    if (formData.deliveryAddresses.length <= 1) return;
    setFormData(prev => ({
      ...prev,
      deliveryAddresses: prev.deliveryAddresses.filter(addr => addr.id !== id)
    }));
  };
  const calculatePrice = (): number => {
    let price = 0;
    // Base price based on service type
    if (formData.serviceType === 'immediate') {
      price = 3.5;
      // 40% discount for immediate orders before 13:00
      const now = new Date();
      if (now.getHours() < 13) {
        price = price * 0.6;
      }
    } else if (formData.serviceType === 'scheduled') {
      price = 2.25;
    }
    // Additional fee for multiple delivery addresses
    if (formData.deliveryAddresses.length > 1) {
      price += (formData.deliveryAddresses.length - 1) * 0.75;
    }
    // Insurance fee calculation (1% of declared value)
    if (formData.insurance && formData.insuranceValue > 0) {
      price += formData.insuranceValue * 0.01;
    }
    return parseFloat(price.toFixed(3));
  };
  const totalPrice = calculatePrice();
  return <FormContext.Provider value={{
    currentStep,
    formData,
    totalPrice,
    setCurrentStep,
    updateFormData,
    updatePickupAddressCoordinates,
    updateDeliveryAddressCoordinates,
    addDeliveryAddress,
    removeDeliveryAddress,
    calculatePrice
  }}>
      {children}
    </FormContext.Provider>;
};
export const useForm = (): FormContextType => {
  const context = useContext(FormContext);
  if (!context) {
    throw new Error('useForm must be used within a FormProvider');
  }
  return context;
};