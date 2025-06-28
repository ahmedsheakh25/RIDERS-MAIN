import React, { useEffect, useRef, Children } from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import { ChevronRightIcon, CodeIcon, TruckIcon, UsersIcon, ShoppingBagIcon } from 'lucide-react';
import Button from '../components/ui/Button';
import HeroAnimation from '../components/landing/HeroAnimation';
import IndustryCard from '../components/landing/IndustryCard';
import ApiDemo from '../components/landing/ApiDemo';
import ParallaxItem from '../components/landing/ParallaxItem';
import { motion } from 'framer-motion';
import RouteBuilder from '../components/route-builder/RouteBuilder';
import GridBackground from '../components/route-builder/GridBackground';
const LandingPage: React.FC = () => {
  const {
    t,
    language
  } = useLanguage();
  const heroRef = useRef<HTMLDivElement>(null);
  const businessRef = useRef<HTMLDivElement>(null);
  const timelineRef = useRef<HTMLDivElement>(null);
  const apiRef = useRef<HTMLDivElement>(null);
  const courierRef = useRef<HTMLDivElement>(null);
  // Initialize animations when components are in view
  useEffect(() => {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate-fade-in');
        }
      });
    }, {
      threshold: 0.1
    });
    const elements = document.querySelectorAll('.animate-on-scroll');
    elements.forEach(el => observer.observe(el));
    return () => {
      elements.forEach(el => observer.unobserve(el));
    };
  }, []);
  // Industry cards data
  const industryCards = [{
    id: 1,
    title: t('landing.industries.retail'),
    description: t('landing.industries.retailDesc'),
    icon: '🛍️',
    color: 'bg-regent-st-blue-100',
    accent: 'border-regent-st-blue-500',
    illustration: "/image.png"
  }, {
    id: 2,
    title: t('landing.industries.restaurants'),
    description: t('landing.industries.restaurantsDesc'),
    icon: '🍔',
    color: 'bg-golden-fizz-100',
    accent: 'border-golden-fizz-500',
    illustration: "/image.png"
  }, {
    id: 3,
    title: t('landing.industries.pharmacies'),
    description: t('landing.industries.pharmaciesDesc'),
    icon: '💊',
    color: 'bg-congress-blue-100',
    accent: 'border-congress-blue-500',
    illustration: "/image.png"
  }, {
    id: 4,
    title: t('landing.industries.grocery'),
    description: t('landing.industries.groceryDesc'),
    icon: '🥦',
    color: 'bg-regent-st-blue-100',
    accent: 'border-regent-st-blue-500',
    illustration: "/image.png"
  }, {
    id: 5,
    title: t('landing.industries.flowers'),
    description: t('landing.industries.flowersDesc'),
    icon: '💐',
    color: 'bg-golden-fizz-100',
    accent: 'border-golden-fizz-500',
    illustration: "/image.png"
  }, {
    id: 6,
    title: t('landing.industries.electronics'),
    description: t('landing.industries.electronicsDesc'),
    icon: '📱',
    color: 'bg-congress-blue-100',
    accent: 'border-congress-blue-500',
    illustration: "/image.png"
  }, {
    id: 7,
    title: t('landing.industries.gifts'),
    description: t('landing.industries.giftsDesc'),
    icon: '🎁',
    color: 'bg-regent-st-blue-100',
    accent: 'border-regent-st-blue-500',
    illustration: "/image.png"
  }, {
    id: 8,
    title: t('landing.industries.documents'),
    description: t('landing.industries.documentsDesc'),
    icon: '📄',
    color: 'bg-golden-fizz-100',
    accent: 'border-golden-fizz-500',
    illustration: "/image.png"
  }];
  // Timeline steps - keep the existing data
  const timelineSteps = [{
    id: 1,
    title: t('landing.howItWorks.step1'),
    description: t('landing.howItWorks.step1Description'),
    icon: '📱'
  }, {
    id: 2,
    title: t('landing.howItWorks.step2'),
    description: t('landing.howItWorks.step2Description'),
    icon: '📦'
  }, {
    id: 3,
    title: t('landing.howItWorks.step3'),
    description: t('landing.howItWorks.step3Description'),
    icon: '🚚'
  }, {
    id: 4,
    title: t('landing.howItWorks.step4'),
    description: t('landing.howItWorks.step4Description'),
    icon: '🏠'
  }];
  return <div className="bg-gray-50 w-full overflow-hidden">
      {/* New Hero Section with Route Builder */}
      <section ref={heroRef} className="relative min-h-[90vh] flex items-center bg-gray-50 overflow-hidden">
        <GridBackground />
        <div className="container mx-auto px-6 py-24 relative z-10">
          <div className="flex flex-col items-center justify-center">
            <motion.h1 className="text-5xl md:text-6xl font-bold text-congress-blue-700 mb-8 text-center" initial={{
            opacity: 0,
            y: -20
          }} animate={{
            opacity: 1,
            y: 0
          }} transition={{
            duration: 0.6,
            delay: 0.2
          }}>
              {t('landing.hero.fastDelivery')}
            </motion.h1>
            <motion.p className="text-xl md:text-2xl text-gray-600 mb-12 text-center max-w-3xl" initial={{
            opacity: 0,
            y: -20
          }} animate={{
            opacity: 1,
            y: 0
          }} transition={{
            duration: 0.6,
            delay: 0.4
          }}>
              {t('landing.hero.subtitle')}
            </motion.p>
            <RouteBuilder />
          </div>
        </div>
      </section>
      {/* Business Solutions Section */}
      <section ref={businessRef} className="py-24 bg-gray-50">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16 animate-on-scroll">
            <h2 className="text-4xl font-bold text-congress-blue-800 mb-4">
              {t('landing.business.title')}
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              {t('landing.business.subtitle')}
            </p>
          </div>
          <motion.div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6" variants={{
          hidden: {
            opacity: 0
          },
          show: {
            opacity: 1,
            transition: {
              staggerChildren: 0.1
            }
          }
        }} initial="hidden" animate="show">
            {industryCards.map(card => <motion.div key={card.id} variants={{
            hidden: {
              opacity: 0,
              y: 20
            },
            show: {
              opacity: 1,
              y: 0,
              transition: {
                type: 'spring',
                damping: 15,
                stiffness: 100
              }
            }
          }}>
                <IndustryCard title={card.title} description={card.description} illustration="/__-__1.png.webp" />
              </motion.div>)}
          </motion.div>
        </div>
      </section>
      {/* How It Works Section - REDESIGNED */}
      <section ref={timelineRef} className="py-24 bg-white">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16 animate-on-scroll">
            <h2 className="text-4xl font-bold text-congress-blue-800 mb-4">
              {t('landing.howItWorks.title')}
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              {t('landing.howItWorks.subtitle')}
            </p>
          </div>
          {/* New card-based layout */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {timelineSteps.map(step => <motion.div key={step.id} className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 hover-lift transition-all duration-300" whileHover={{
            y: -8,
            boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
            borderColor: '#e0f2fe'
          }} initial={{
            opacity: 0,
            y: 20
          }} whileInView={{
            opacity: 1,
            y: 0
          }} viewport={{
            once: true
          }} transition={{
            duration: 0.5,
            delay: (step.id - 1) * 0.1
          }}>
                <div className="flex flex-col items-start">
                  {/* Step badge - moved to top with left alignment */}
                  <div className="bg-gray-200 text-gray-600 text-sm font-medium px-3 py-1 rounded-full mb-4">
                    Step {step.id}
                  </div>
                  {/* 3D Image based on step */}
                  <div className="w-full flex justify-center mb-4">
                    <img src={step.id === 1 ? "/Location_Tracker.png" : step.id === 2 ? "/box_with_hand.png" : step.id === 3 ? "/truck.png" : "/box_at_door.png"} alt={step.title} className="h-32 object-contain" />
                  </div>
                  {/* Title and description - left aligned */}
                  <h3 className="text-xl font-bold text-congress-blue-800 mb-3 text-left w-full">
                    {step.title}
                  </h3>
                  {/* Subtle divider that fills width */}
                  <div className="w-full h-px bg-gray-200 mb-4"></div>
                  <p className="text-gray-600 text-left w-full">
                    {step.description}
                  </p>
                </div>
              </motion.div>)}
          </div>
        </div>
      </section>
      {/* API Integration Section */}
      <section ref={apiRef} className="py-24 bg-gray-50">
        <div className="container mx-auto px-6">
          <div className="flex flex-col lg:flex-row items-center gap-12">
            <div className="lg:w-1/2 animate-on-scroll">
              <div className="mb-6 inline-block bg-congress-blue-100 text-congress-blue-700 px-4 py-2 rounded-full font-medium">
                <CodeIcon className="w-5 h-5 inline-block mr-2" />
                {t('landing.api.developerApi')}
              </div>
              <h2 className="text-4xl font-bold text-congress-blue-800 mb-6">
                {t('landing.api.title')}
              </h2>
              <p className="text-xl text-gray-600 mb-8">
                {t('landing.api.subtitle')}
              </p>
              <ul className="space-y-4 mb-8">
                <li className="flex items-start">
                  <div className="bg-green-100 p-1 rounded-full mt-1 mr-3">
                    <svg className="w-4 h-4 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7"></path>
                    </svg>
                  </div>
                  <span className="text-gray-700">
                    {t('landing.api.feature1')}
                  </span>
                </li>
                <li className="flex items-start">
                  <div className="bg-green-100 p-1 rounded-full mt-1 mr-3">
                    <svg className="w-4 h-4 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7"></path>
                    </svg>
                  </div>
                  <span className="text-gray-700">
                    {t('landing.api.feature2')}
                  </span>
                </li>
                <li className="flex items-start">
                  <div className="bg-green-100 p-1 rounded-full mt-1 mr-3">
                    <svg className="w-4 h-4 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7"></path>
                    </svg>
                  </div>
                  <span className="text-gray-700">
                    {t('landing.api.feature3')}
                  </span>
                </li>
              </ul>
              <Link to="/api-docs">
                <Button variant="outline" size="md" className="text-congress-blue-600 border-congress-blue-600">
                  {t('landing.api.viewDocs')}
                </Button>
              </Link>
            </div>
            <div className="lg:w-1/2 animate-on-scroll">
              <ApiDemo />
            </div>
          </div>
        </div>
      </section>
      {/* Courier and Application Split Section */}
      <section ref={courierRef} className="py-24 bg-white">
        <div className="container mx-auto px-6">
          <div className="flex flex-col lg:flex-row items-stretch gap-8">
            <div className="lg:w-1/2 bg-congress-blue-50 rounded-2xl p-8 animate-on-scroll">
              <div className="mb-6 inline-block bg-congress-blue-100 text-congress-blue-700 px-4 py-2 rounded-full font-medium">
                <UsersIcon className="w-5 h-5 inline-block mr-2" />
                {t('landing.courier.joinTeam')}
              </div>
              <h2 className="text-3xl font-bold text-congress-blue-800 mb-6">
                {t('landing.courier.title')}
              </h2>
              <p className="text-lg text-gray-600 mb-8">
                {t('landing.courier.subtitle')}
              </p>
              <div className="space-y-6 mb-8">
                <div className="flex items-start bg-white p-4 rounded-lg shadow-sm">
                  <div className="bg-regent-st-blue-100 p-3 rounded-full mr-4">
                    <span className="text-xl">💰</span>
                  </div>
                  <div>
                    <h3 className="font-semibold text-congress-blue-700">
                      {t('landing.courier.earnings')}
                    </h3>
                    <p className="text-gray-600">
                      {t('landing.courier.earningsDescription')}
                    </p>
                  </div>
                </div>
                <div className="flex items-start bg-white p-4 rounded-lg shadow-sm">
                  <div className="bg-regent-st-blue-100 p-3 rounded-full mr-4">
                    <span className="text-xl">⏰</span>
                  </div>
                  <div>
                    <h3 className="font-semibold text-congress-blue-700">
                      {t('landing.courier.schedule')}
                    </h3>
                    <p className="text-gray-600">
                      {t('landing.courier.scheduleDescription')}
                    </p>
                  </div>
                </div>
                <div className="flex items-start bg-white p-4 rounded-lg shadow-sm">
                  <div className="bg-regent-st-blue-100 p-3 rounded-full mr-4">
                    <span className="text-xl">🚀</span>
                  </div>
                  <div>
                    <h3 className="font-semibold text-congress-blue-700">
                      {t('landing.courier.payments')}
                    </h3>
                    <p className="text-gray-600">
                      {t('landing.courier.paymentsDescription')}
                    </p>
                  </div>
                </div>
              </div>
              <Button variant="primary" size="lg" className="w-full md:w-auto">
                {t('landing.courier.applyNow')}
              </Button>
            </div>
            <div className="lg:w-1/2 bg-gradient-to-br from-regent-st-blue-50 to-white rounded-2xl p-8 animate-on-scroll">
              <h2 className="text-3xl font-bold text-congress-blue-800 mb-6">
                {t('common.quickApplication')}
              </h2>
              <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      {t('landing.application.fullName')}
                    </label>
                    <input type="text" className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-congress-blue-500 focus:border-congress-blue-500" placeholder={t('landing.application.yourName')} />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      {t('landing.application.email')}
                    </label>
                    <input type="email" className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-congress-blue-500 focus:border-congress-blue-500" placeholder={t('landing.application.yourEmail')} />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      {t('landing.application.phone')}
                    </label>
                    <input type="tel" className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-congress-blue-500 focus:border-congress-blue-500" placeholder={t('landing.application.phoneFormat')} />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      {t('landing.application.vehicleType')}
                    </label>
                    <select className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-congress-blue-500 focus:border-congress-blue-500">
                      <option value="">
                        {t('landing.application.selectVehicle')}
                      </option>
                      <option value="motorcycle">
                        {t('vehicleSelection.motorcycle')}
                      </option>
                      <option value="car">{t('vehicleSelection.car')}</option>
                      <option value="van">Van</option>
                      <option value="bicycle">Bicycle</option>
                    </select>
                  </div>
                  <div className="pt-2">
                    <Button variant="primary" size="lg" className="w-full">
                      {t('landing.application.submit')}
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* CTA Section */}
      <section className="py-16 bg-congress-blue-700">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            {t('landing.cta.title')}
          </h2>
          <p className="text-xl text-congress-blue-100 mb-10 max-w-2xl mx-auto">
            {t('landing.cta.subtitle')}
          </p>
          <Link to="/booking">
            <Button variant="primary" size="lg" className="bg-white text-congress-blue-700 hover:bg-gray-100 text-lg px-8 py-4 shadow-lg">
              <TruckIcon className="w-5 h-5 mr-2" />
              {t('landing.cta.action')}
            </Button>
          </Link>
        </div>
      </section>
    </div>;
};
export default LandingPage;