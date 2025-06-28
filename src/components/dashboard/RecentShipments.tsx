import React, { useState } from 'react';
import { EyeIcon, ArrowPathIcon, EllipsisHorizontalIcon } from '@heroicons/react/24/outline';
import Button from '../ui/Button';
import { useLanguage } from '../../context/LanguageContext';
// Mock data for recent shipments
const mockShipments = [{
  id: 'SHP-1234',
  trackingNumber: 'TRK-8723-4567-9012',
  destination: 'Salmiya, Block 12',
  date: '2023-05-15',
  status: 'in-transit',
  coordinates: [29.3399, 48.0752]
}, {
  id: 'SHP-1235',
  trackingNumber: 'TRK-5678-9012-3456',
  destination: 'Kuwait City, Block 4',
  date: '2023-05-14',
  status: 'delivered',
  coordinates: [29.3372, 47.9728]
}, {
  id: 'SHP-1236',
  trackingNumber: 'TRK-9012-3456-7890',
  destination: 'Hawally, Street 7',
  date: '2023-05-13',
  status: 'pending',
  coordinates: [29.3697, 47.9783]
}, {
  id: 'SHP-1237',
  trackingNumber: 'TRK-3456-7890-1234',
  destination: 'Jabriya, Block 6',
  date: '2023-05-12',
  status: 'in-transit',
  coordinates: [29.3278, 48.0225]
}, {
  id: 'SHP-1238',
  trackingNumber: 'TRK-7890-1234-5678',
  destination: 'Farwaniya, Block 3',
  date: '2023-05-11',
  status: 'failed',
  coordinates: [29.2809, 47.9429]
}];
interface RecentShipmentsProps {
  onViewShipment: (trackingNumber: string) => void;
  activeStatuses: string[];
  onStatusFilter: (status: string) => void;
}
const RecentShipments: React.FC<RecentShipmentsProps> = ({
  onViewShipment,
  activeStatuses,
  onStatusFilter
}) => {
  const [shipments] = useState(mockShipments);
  const {
    t,
    direction,
    language
  } = useLanguage();
  // Arabic translations for destinations
  const getArabicDestination = (destination: string) => {
    const destinationMap: Record<string, string> = {
      'Salmiya, Block 12': 'السالمية، قطعة 12',
      'Kuwait City, Block 4': 'مدينة الكويت، قطعة 4',
      'Hawally, Street 7': 'حولي، شارع 7',
      'Jabriya, Block 6': 'الجابرية، قطعة 6',
      'Farwaniya, Block 3': 'الفروانية، قطعة 3'
    };
    return destinationMap[destination] || destination;
  };
  // Function to determine badge color based on status
  const getStatusBadgeClass = (status: string) => {
    switch (status) {
      case 'in-transit':
        return 'bg-blue-100 text-blue-700 border border-blue-200';
      case 'delivered':
        return 'bg-green-100 text-green-700 border border-green-200';
      case 'pending':
        return 'bg-amber-100 text-amber-700 border border-amber-200';
      case 'failed':
        return 'bg-red-100 text-red-700 border border-red-200';
      default:
        return 'bg-gray-100 text-gray-700 border border-gray-200';
    }
  };
  // Function to get human-readable status in Arabic or English
  const getStatusText = (status: string) => {
    if (language === 'ar') {
      switch (status) {
        case 'in-transit':
          return 'قيد النقل';
        case 'delivered':
          return 'تم التوصيل';
        case 'pending':
          return 'قيد الانتظار';
        case 'failed':
          return 'فشل';
        default:
          return status;
      }
    } else {
      switch (status) {
        case 'in-transit':
          return 'In Transit';
        case 'delivered':
          return 'Delivered';
        case 'pending':
          return 'Pending';
        case 'failed':
          return 'Failed';
        default:
          return status;
      }
    }
  };
  // Check if a status is active
  const isStatusActive = (status: string) => {
    return activeStatuses.includes(status);
  };
  return <div className="overflow-x-auto">
      <table className="w-full">
        <thead>
          <tr className="bg-gray-50">
            <th className={`px-6 py-3 ${direction === 'rtl' ? 'text-right' : 'text-left'} text-xs font-medium text-gray-500 uppercase tracking-wider`}>
              {language === 'ar' ? 'رقم التتبع' : 'Tracking Number'}
            </th>
            <th className={`px-6 py-3 ${direction === 'rtl' ? 'text-right' : 'text-left'} text-xs font-medium text-gray-500 uppercase tracking-wider`}>
              {language === 'ar' ? 'الوجهة' : 'Destination'}
            </th>
            <th className={`px-6 py-3 ${direction === 'rtl' ? 'text-right' : 'text-left'} text-xs font-medium text-gray-500 uppercase tracking-wider`}>
              {language === 'ar' ? 'التاريخ' : 'Date'}
            </th>
            <th className={`px-6 py-3 ${direction === 'rtl' ? 'text-right' : 'text-left'} text-xs font-medium text-gray-500 uppercase tracking-wider`}>
              {language === 'ar' ? 'الحالة' : 'Status'}
            </th>
            <th className={`px-6 py-3 ${direction === 'rtl' ? 'text-left' : 'text-right'} text-xs font-medium text-gray-500 uppercase tracking-wider sticky ${direction === 'rtl' ? 'left-0' : 'right-0'} bg-gray-50 z-10`}>
              {language === 'ar' ? 'الإجراءات' : 'Actions'}
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200">
          {shipments.map(shipment => <tr key={shipment.id} className="hover:bg-gray-50">
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="text-sm font-medium text-congress-blue-700">
                  {shipment.trackingNumber}
                </div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="text-sm text-gray-700">
                  {language === 'ar' ? getArabicDestination(shipment.destination) : shipment.destination}
                </div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="text-sm text-gray-500">
                  {language === 'ar' ? shipment.date.split('-').reverse().join('-') : shipment.date}
                </div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <button onClick={() => onStatusFilter(shipment.status)} className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusBadgeClass(shipment.status)} ${isStatusActive(shipment.status) ? 'ring-2 ring-offset-1 ring-gray-300' : ''} hover:opacity-80 transition-opacity cursor-pointer`}>
                  {getStatusText(shipment.status)}
                </button>
              </td>
              <td className={`px-6 py-4 whitespace-nowrap ${direction === 'rtl' ? 'text-left' : 'text-right'} text-sm font-medium sticky ${direction === 'rtl' ? 'left-0' : 'right-0'} bg-white z-10`}>
                <div className={`flex ${direction === 'rtl' ? 'justify-start' : 'justify-end'} space-x-2 rtl:space-x-reverse`}>
                  <Button variant="outline" size="sm" className="py-1 px-2" onClick={() => onViewShipment(shipment.trackingNumber)}>
                    <EyeIcon className="w-4 h-4" />
                  </Button>
                  <Button variant="primary" size="sm" className="py-1 px-2">
                    {language === 'ar' ? 'تتبع' : 'Track'}
                  </Button>
                </div>
              </td>
            </tr>)}
        </tbody>
      </table>
    </div>;
};
export default RecentShipments;