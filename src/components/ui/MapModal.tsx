import React, { useEffect, useState, useRef, memo, Component } from 'react';
import { MapContainer, TileLayer, Marker, useMapEvents } from 'react-leaflet';
import { Icon } from 'leaflet';
import { useLanguage } from '../../context/LanguageContext';
import Button from './Button';
import { MagnifyingGlassIcon, XMarkIcon, ArrowTopRightOnSquareIcon, ArrowPathIcon } from '@heroicons/react/24/outline';
// Make sure to import leaflet CSS in your project
import 'leaflet/dist/leaflet.css';
interface Coordinates {
  lat: number;
  lng: number;
}
interface MapModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: (coordinates: Coordinates, address: string) => void;
  initialCoordinates?: Coordinates;
}
// Custom marker icon
const customIcon = new Icon({
  iconUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41]
});
// Component to handle map events
const MapEventHandler = ({
  setMarkerPosition
}: {
  setMarkerPosition: (coords: Coordinates) => void;
}) => {
  const map = useMapEvents({
    click(e) {
      setMarkerPosition({
        lat: e.latlng.lat,
        lng: e.latlng.lng
      });
    }
  });
  return null;
};
const MapModal: React.FC<MapModalProps> = ({
  isOpen,
  onClose,
  onConfirm,
  initialCoordinates
}) => {
  const {
    t,
    direction,
    language
  } = useLanguage();
  const [markerPosition, setMarkerPosition] = useState<Coordinates | null>(initialCoordinates || null);
  const [searchQuery, setSearchQuery] = useState('');
  const [address, setAddress] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const mapRef = useRef<any>(null);
  // Default coordinates (Kuwait City)
  const defaultCenter: Coordinates = {
    lat: 29.3759,
    lng: 47.9774
  };
  // Reset state when modal opens/closes
  useEffect(() => {
    if (isOpen) {
      if (initialCoordinates) {
        setMarkerPosition(initialCoordinates);
        reverseGeocode(initialCoordinates);
      } else {
        setMarkerPosition(null);
        setAddress('');
      }
      setSearchQuery('');
      setError(null);
    }
  }, [isOpen, initialCoordinates]);
  // Function to handle search
  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;
    setIsLoading(true);
    setError(null);
    try {
      // Add accept-language header to get localized results
      const response = await fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(searchQuery)}&accept-language=${language}`);
      const data = await response.json();
      if (data && data.length > 0) {
        const location = {
          lat: parseFloat(data[0].lat),
          lng: parseFloat(data[0].lon)
        };
        setMarkerPosition(location);
        setAddress(data[0].display_name);
        // Center map on the found location
        if (mapRef.current) {
          mapRef.current.setView([location.lat, location.lng], 16);
        }
      } else {
        setError(t('map.locationError'));
      }
    } catch (err) {
      setError(t('map.geocodingError'));
    } finally {
      setIsLoading(false);
    }
  };
  // Function to get current location
  const getCurrentLocation = () => {
    setIsLoading(true);
    setError(null);
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition(position => {
        const coords = {
          lat: position.coords.latitude,
          lng: position.coords.longitude
        };
        setMarkerPosition(coords);
        reverseGeocode(coords);
        // Center map on current location
        if (mapRef.current) {
          mapRef.current.setView([coords.lat, coords.lng], 16);
        }
        setIsLoading(false);
      }, error => {
        console.error('Error getting location:', error);
        setError(error.code === error.PERMISSION_DENIED ? t('map.permissionDenied') : t('map.locationError'));
        setIsLoading(false);
      });
    } else {
      setError(t('map.locationError'));
      setIsLoading(false);
    }
  };
  // Function to reverse geocode coordinates to address
  const reverseGeocode = async (coords: Coordinates) => {
    setIsLoading(true);
    try {
      // Add accept-language parameter to get localized address
      const response = await fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${coords.lat}&lon=${coords.lng}&accept-language=${language}`);
      const data = await response.json();
      if (data && data.display_name) {
        setAddress(data.display_name);
      }
    } catch (err) {
      console.error('Reverse geocoding error:', err);
      setError(t('map.geocodingError'));
    } finally {
      setIsLoading(false);
    }
  };
  // Update address when marker position changes
  useEffect(() => {
    if (markerPosition) {
      reverseGeocode(markerPosition);
    }
  }, [markerPosition]);
  // Handle marker drag
  const handleMarkerDrag = (e: any) => {
    const {
      lat,
      lng
    } = e.target.getLatLng();
    setMarkerPosition({
      lat,
      lng
    });
  };
  // Handle confirm button click
  const handleConfirm = () => {
    if (markerPosition && address) {
      onConfirm(markerPosition, address);
    }
  };
  // Clean up function to prevent memory leaks
  useEffect(() => {
    return () => {
      // Clean up any leaflet-related resources
      if (mapRef.current) {
        mapRef.current.remove();
      }
    };
  }, []);
  if (!isOpen) return null;
  return <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white w-full h-full md:w-4/5 md:h-4/5 md:rounded-lg flex flex-col overflow-hidden">
        {/* Header */}
        <div className="p-4 border-b flex justify-between items-center bg-white">
          <h2 className="text-xl font-semibold text-congress-blue-700">
            {t('map.selectLocation')}
          </h2>
          <button onClick={onClose} className="p-2 rounded-full hover:bg-gray-100 transition-colors" aria-label="Close">
            <XMarkIcon className="w-5 h-5 text-gray-600" />
          </button>
        </div>
        <div className={`flex flex-col ${direction === 'rtl' ? 'md:flex-row-reverse' : 'md:flex-row'} h-full`}>
          {/* Sidebar */}
          <div className={`p-4 border-b md:border-b-0 ${direction === 'rtl' ? 'md:border-l' : 'md:border-r'} md:w-1/3 bg-white`}>
            {/* Search form */}
            <form onSubmit={handleSearch} className="mb-4">
              <div className="relative">
                <input type="text" value={searchQuery} onChange={e => setSearchQuery(e.target.value)} placeholder={t('map.searchPlaceholder')} className={`w-full ${direction === 'rtl' ? 'pr-10 pl-4' : 'pl-10 pr-4'} py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-congress-blue-300`} />
                <div className={`absolute inset-y-0 ${direction === 'rtl' ? 'right-0 pr-3' : 'left-0 pl-3'} flex items-center pointer-events-none`}>
                  <MagnifyingGlassIcon size={16} className="text-gray-400" />
                </div>
                <button type="submit" className={`absolute inset-y-0 ${direction === 'rtl' ? 'left-0 pl-3' : 'right-0 pr-3'} flex items-center`} disabled={isLoading}>
                  {isLoading ? <ArrowPathIcon size={16} className="animate-spin" /> : <MagnifyingGlassIcon size={16} className="text-gray-400" />}
                </button>
              </div>
            </form>
            {/* Current location button */}
            <Button onClick={getCurrentLocation} variant="outline" className="mb-4 w-full" disabled={isLoading}>
              <ArrowTopRightOnSquareIcon size={16} className={direction === 'rtl' ? 'ml-2' : 'mr-2'} />
              {t('map.useMyLocation')}
            </Button>
            {/* Error message */}
            {error && <div className="mb-4 p-3 bg-red-50 text-red-700 rounded-lg text-sm">
                {error}
              </div>}
            {/* Selected address */}
            {address && <div className="mb-4">
                <h3 className="text-sm font-medium text-gray-700 mb-2">
                  {t('map.locationSelected')}:
                </h3>
                <div className="p-3 bg-gray-50 rounded-lg text-sm">
                  {address}
                </div>
              </div>}
            {/* Help text */}
            <p className="text-sm text-gray-500 mb-4">{t('map.dragMarker')}</p>
            {/* Confirm button */}
            <Button onClick={handleConfirm} variant="primary" fullWidth disabled={!markerPosition || isLoading}>
              {isLoading ? t('common.loading') : t('map.confirmLocation')}
            </Button>
          </div>
          {/* Map */}
          <div className="flex-1 relative">
            {isLoading && <div className="absolute inset-0 bg-white bg-opacity-70 z-10 flex items-center justify-center">
                <div className="flex items-center bg-white p-3 rounded-lg shadow-md">
                  <ArrowPathIcon size={20} className={direction === 'rtl' ? 'ml-2' : 'mr-2'} />
                  <span>{t('map.searchingLocation')}</span>
                </div>
              </div>}
            <MapContainer center={markerPosition ? [markerPosition.lat, markerPosition.lng] : [defaultCenter.lat, defaultCenter.lng]} zoom={13} style={{
            height: '100%',
            width: '100%'
          }} whenCreated={map => mapRef.current = map}>
              <TileLayer attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors' url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
              <MapEventHandler setMarkerPosition={setMarkerPosition} />
              {markerPosition && <Marker position={[markerPosition.lat, markerPosition.lng]} icon={customIcon} draggable={true} eventHandlers={{
              dragend: handleMarkerDrag
            }} />}
            </MapContainer>
          </div>
        </div>
      </div>
    </div>;
};
export default MapModal;