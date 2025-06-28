import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Link } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import { TruckIcon, ClockIcon, MapPinIcon, ShieldCheckIcon } from '@heroicons/react/24/outline';
import Button from '../components/ui/Button';
const HomePage: React.FC = () => {
  const {
    language,
    t
  } = useLanguage();
  const {
    isAuthenticated
  } = useAuth();
  const navigate = useNavigate();
  // Redirect based on authentication status
  useEffect(() => {
    if (isAuthenticated) {
      navigate('/dashboard');
    } else {
      navigate('/landing');
    }
  }, [isAuthenticated, navigate]);
  // This is just a placeholder as the component will redirect
  return <div className="flex flex-col items-center justify-center h-[50vh]">
      <div className="loading-spinner mb-4"></div>
      <p className="text-congress-blue-700 font-medium">
        {t('common.redirecting')}
      </p>
    </div>;
};
export default HomePage;