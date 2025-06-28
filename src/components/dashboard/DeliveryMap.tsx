import React, { useEffect, useState, useRef, Component } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import { Icon, LatLngExpression } from 'leaflet';
import 'leaflet/dist/leaflet.css';
// Define the delivery data structure
export interface DeliveryLocation {
  id: string;
  address: string;
  coordinates: LatLngExpression;
  status: 'in-transit' | 'delivered' | 'pending' | 'failed';
  customerName: string;
  estimatedDelivery?: string;
  trackingId: string;
}
interface DeliveryMapProps {
  height?: string;
  centerCoordinates?: LatLngExpression;
  zoom?: number;
  activeStatuses: string[];
  focusedShipment?: string | null;
  onMarkerClick?: (trackingId: string) => void;
}
// Component to handle map view updates
const MapController = ({
  center,
  zoom,
  focusedMarker
}: {
  center: LatLngExpression;
  zoom: number;
  focusedMarker: LatLngExpression | null;
}) => {
  const map = useMap();
  useEffect(() => {
    if (focusedMarker) {
      map.setView(focusedMarker, 15);
    } else {
      map.setView(center, zoom);
    }
  }, [map, center, zoom, focusedMarker]);
  return null;
};
const DeliveryMap: React.FC<DeliveryMapProps> = ({
  height = '400px',
  centerCoordinates = [29.3759, 47.9774],
  // Kuwait City as default center
  zoom = 11,
  activeStatuses,
  focusedShipment,
  onMarkerClick
}) => {
  // Sample delivery data
  const [deliveries] = useState<DeliveryLocation[]>([{
    id: 'd1',
    address: 'Block 2, Street 14, Building 5, Salmiya',
    coordinates: [29.3399, 48.0752],
    status: 'in-transit',
    customerName: 'Ahmed Al-Sayed',
    estimatedDelivery: 'Today, 2:30 PM',
    trackingId: 'TRK-8723-4567-9012'
  }, {
    id: 'd2',
    address: 'Block 4, Street 20, Building 12, Hawally',
    coordinates: [29.3372, 47.9728],
    status: 'delivered',
    customerName: 'Fatima Mohammed',
    trackingId: 'TRK-5678-9012-3456'
  }, {
    id: 'd3',
    address: 'Block 1, Street 5, Building 3, Kuwait City',
    coordinates: [29.3697, 47.9783],
    status: 'pending',
    customerName: 'Omar Abdullah',
    estimatedDelivery: 'Tomorrow, 10:00 AM',
    trackingId: 'TRK-9012-3456-7890'
  }, {
    id: 'd4',
    address: 'Block 6, Street 12, Building 9, Jabriya',
    coordinates: [29.3278, 48.0225],
    status: 'in-transit',
    customerName: 'Layla Al-Qasem',
    estimatedDelivery: 'Today, 5:45 PM',
    trackingId: 'TRK-3456-7890-1234'
  }, {
    id: 'd5',
    address: 'Block 3, Street 7, Building 2, Farwaniya',
    coordinates: [29.2809, 47.9429],
    status: 'failed',
    customerName: 'Yousef Al-Harbi',
    trackingId: 'TRK-7890-1234-5678'
  }, {
    id: 'd6',
    address: 'Block 8, Street 22, Building 14, Mangaf',
    coordinates: [29.0969, 48.13],
    status: 'delivered',
    customerName: 'Noor Al-Sabah',
    trackingId: 'TRK-6543-2109-8765'
  }, {
    id: 'd7',
    address: 'Block 5, Street 10, Building 7, Fahaheel',
    coordinates: [29.0825, 48.1307],
    status: 'pending',
    customerName: 'Jassim Al-Mutairi',
    estimatedDelivery: 'Tomorrow, 1:15 PM',
    trackingId: 'TRK-2109-8765-4321'
  }]);
  // Filter deliveries based on active statuses
  const filteredDeliveries = activeStatuses.length > 0 ? deliveries.filter(delivery => activeStatuses.includes(delivery.status)) : deliveries;
  // Find focused delivery
  const focusedDelivery = focusedShipment ? deliveries.find(delivery => delivery.trackingId === focusedShipment) : null;
  const focusedCoordinates = focusedDelivery ? focusedDelivery.coordinates : null;
  // Define marker icons based on delivery status
  const icons = {
    'in-transit': new Icon({
      iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-blue.png',
      iconSize: [25, 41],
      iconAnchor: [12, 41],
      popupAnchor: [1, -34]
    }),
    delivered: new Icon({
      iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-green.png',
      iconSize: [25, 41],
      iconAnchor: [12, 41],
      popupAnchor: [1, -34]
    }),
    pending: new Icon({
      iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-orange.png',
      iconSize: [25, 41],
      iconAnchor: [12, 41],
      popupAnchor: [1, -34]
    }),
    failed: new Icon({
      iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-red.png',
      iconSize: [25, 41],
      iconAnchor: [12, 41],
      popupAnchor: [1, -34]
    })
  };
  // Function to get status text with appropriate color
  const getStatusDisplay = (status: DeliveryLocation['status']) => {
    const statusConfig = {
      'in-transit': {
        text: 'In Transit',
        color: 'text-congress-blue-600'
      },
      delivered: {
        text: 'Delivered',
        color: 'text-green-600'
      },
      pending: {
        text: 'Pending',
        color: 'text-amber-600'
      },
      failed: {
        text: 'Failed',
        color: 'text-red-600'
      }
    };
    const config = statusConfig[status];
    return <span className={`font-semibold ${config.color}`}>{config.text}</span>;
  };
  // Auto-open popup for focused shipment
  const popupRefs = useRef<{
    [key: string]: any;
  }>({});
  useEffect(() => {
    if (focusedShipment && popupRefs.current[focusedShipment]) {
      popupRefs.current[focusedShipment].openPopup();
    }
  }, [focusedShipment]);
  return <div style={{
    height,
    position: 'relative',
    zIndex: 0 // Base z-index for the container
  }} className="w-full rounded-lg overflow-hidden">
      <MapContainer center={centerCoordinates} zoom={zoom} style={{
      height: '100%',
      width: '100%',
      zIndex: 0 // Ensure map has appropriate z-index
    }} className="leaflet-container" // Add explicit class for targeting
    >
        <TileLayer attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors' url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
        <MapController center={centerCoordinates} zoom={zoom} focusedMarker={focusedCoordinates} />
        {filteredDeliveries.map(delivery => <Marker key={delivery.id} position={delivery.coordinates} icon={icons[delivery.status]} ref={ref => {
        if (ref) popupRefs.current[delivery.trackingId] = ref;
      }} eventHandlers={{
        click: () => {
          if (onMarkerClick) onMarkerClick(delivery.trackingId);
        }
      }}>
            <Popup className="delivery-popup">
              <div className="p-1">
                <p className="font-semibold text-congress-blue-800">
                  {delivery.trackingId}
                </p>
                <p className="text-sm text-gray-700">{delivery.customerName}</p>
                <p className="text-sm text-gray-600">{delivery.address}</p>
                <div className="flex justify-between items-center mt-2 text-sm">
                  <div>Status: {getStatusDisplay(delivery.status)}</div>
                </div>
                {delivery.estimatedDelivery && <p className="text-xs text-gray-500 mt-1">
                    ETA: {delivery.estimatedDelivery}
                  </p>}
              </div>
            </Popup>
          </Marker>)}
      </MapContainer>
    </div>;
};
export default DeliveryMap;