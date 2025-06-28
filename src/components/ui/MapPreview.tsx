import React from 'react';
import { MapContainer, TileLayer, Marker } from 'react-leaflet';
import { Icon } from 'leaflet';
import { useLanguage } from '../../context/LanguageContext';
import Button from './Button';
import { MapPinIcon } from '@heroicons/react/24/outline';
// Make sure to import leaflet CSS in your project
import 'leaflet/dist/leaflet.css';
interface Coordinates {
  lat: number;
  lng: number;
}
interface MapPreviewProps {
  coordinates: Coordinates;
  onOpenMap: () => void;
}
// Custom marker icon
const customIcon = new Icon({
  iconUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41]
});
const MapPreview: React.FC<MapPreviewProps> = ({
  coordinates,
  onOpenMap
}) => {
  const {
    t,
    direction
  } = useLanguage();
  return <div className="relative mb-3 border rounded-lg overflow-hidden">
      <div className="h-[120px] w-full">
        <MapContainer center={[coordinates.lat, coordinates.lng]} zoom={15} style={{
        height: '100%',
        width: '100%'
      }} zoomControl={false} attributionControl={false} dragging={false} scrollWheelZoom={false}>
          <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
          <Marker position={[coordinates.lat, coordinates.lng]} icon={customIcon} />
        </MapContainer>
      </div>
      <div className={`absolute bottom-0 ${direction === 'rtl' ? 'left-0' : 'right-0'} p-2`}>
        <Button variant="primary" size="sm" onClick={onOpenMap} className="shadow-md">
          <MapPinIcon size={14} className={direction === 'rtl' ? 'ml-1' : 'mr-1'} />
          {t('map.viewOnMap')}
        </Button>
      </div>
    </div>;
};
export default MapPreview;