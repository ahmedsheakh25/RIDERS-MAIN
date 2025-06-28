import React, { useState, Children } from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import { useAuth } from '../context/AuthContext';
import { motion, AnimatePresence } from 'framer-motion';
import { GlobeAltIcon, ChevronDownIcon, UserCircleIcon, Cog6ToothIcon, WalletIcon, MapPinIcon, ArrowRightOnRectangleIcon, UserPlusIcon, KeyIcon } from '@heroicons/react/24/outline';
const Header: React.FC = () => {
  const {
    language,
    changeLanguage,
    t,
    direction
  } = useLanguage();
  const {
    user,
    isAuthenticated,
    logout
  } = useAuth();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };
  const toggleUserMenu = () => {
    setIsUserMenuOpen(!isUserMenuOpen);
  };
  const selectLanguage = (lang: 'en' | 'ar') => {
    changeLanguage(lang);
    setIsDropdownOpen(false);
  };
  const handleLogout = () => {
    logout();
    setIsUserMenuOpen(false);
  };
  // Animation variants
  const dropdownVariants = {
    hidden: {
      opacity: 0,
      y: -10,
      scale: 0.95
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.2,
        staggerChildren: 0.05,
        delayChildren: 0.05
      }
    },
    exit: {
      opacity: 0,
      y: -10,
      scale: 0.95,
      transition: {
        duration: 0.2
      }
    }
  };
  const itemVariants = {
    hidden: {
      opacity: 0,
      x: direction === 'rtl' ? 10 : -10
    },
    visible: {
      opacity: 1,
      x: 0
    }
  };
  return <motion.header className="sticky top-0 z-50 bg-white shadow-sm" initial={{
    y: -20,
    opacity: 0
  }} animate={{
    y: 0,
    opacity: 1
  }} transition={{
    duration: 0.3
  }}>
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        <motion.div className="flex items-center" whileHover={{
        scale: 1.05
      }} whileTap={{
        scale: 0.95
      }}>
          <Link to="/">
            <img src="/logoss.svg" alt="Riders Logo" className="h-8 md:h-10" />
          </Link>
        </motion.div>
        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-4 rtl:space-x-reverse">
          <Link to="/booking">
            <motion.button className="px-4 py-2 rounded-lg bg-congress-blue-600 text-white hover:bg-congress-blue-700 transition-colors shadow-sm font-medium flex items-center" whileHover={{
            scale: 1.05
          }} whileTap={{
            scale: 0.97
          }}>
              <svg xmlns="http://www.w3.org/2000/svg" className={`w-4 h-4 ${direction === 'rtl' ? 'ml-2' : 'mr-2'}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path d="M9 17a2 2 0 11-4 0 2 2 0 014 0zM19 17a2 2 0 11-4 0 2 2 0 014 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" d="M13 16V6a1 1 0 00-1-1H4a1 1 0 00-1 1v10a1 1 0 001 1h1m8-1a1 1 0 01-1 1H9m4-1V8a1 1 0 011-1h2.586a1 1 0 01.707.293l3.414 3.414a1 1 0 01.293.707V16a1 1 0 01-1 1h-1m-6-1a1 1 0 001 1h1M5 17a2 2 0 104 0m-4 0a2 2 0 114 0m6 0a2 2 0 104 0m-4 0a2 2 0 114 0" />
              </svg>
              {t('header.makeDelivery')}
            </motion.button>
          </Link>
          {isAuthenticated ? <div className="relative">
              <motion.button onClick={toggleUserMenu} className="flex items-center px-4 py-2 rounded-lg bg-regent-st-blue-100 text-congress-blue-700 hover:bg-regent-st-blue-200 transition-colors shadow-sm font-medium" whileHover={{
            scale: 1.05
          }} whileTap={{
            scale: 0.97
          }}>
                <UserCircleIcon className={`w-5 h-5 ${direction === 'rtl' ? 'ml-2' : 'mr-2'} text-congress-blue-700`} />
                <span>{user?.name || t('header.myAccount')}</span>
                <motion.div animate={{
              rotate: isUserMenuOpen ? 180 : 0
            }} transition={{
              duration: 0.2
            }} className={`${direction === 'rtl' ? 'mr-2' : 'ml-2'}`}>
                  <ChevronDownIcon className="w-4 h-4 text-congress-blue-700" />
                </motion.div>
              </motion.button>
              <AnimatePresence>
                {isUserMenuOpen && <motion.div className={`absolute ${direction === 'rtl' ? 'left-0' : 'right-0'} mt-1 w-64 bg-white rounded-md shadow-lg overflow-hidden z-50 border border-gray-200`} variants={dropdownVariants} initial="hidden" animate="visible" exit="exit">
                    <div className="py-1">
                      <motion.div variants={itemVariants}>
                        <Link to="/account/settings" className="flex items-center w-full px-4 py-3 text-sm text-left rtl:text-right hover:bg-gray-50" onClick={() => setIsUserMenuOpen(false)}>
                          <Cog6ToothIcon className={`w-5 h-5 ${direction === 'rtl' ? 'ml-3' : 'mr-3'} text-gray-500`} />
                          <span>{t('header.accountSettings')}</span>
                        </Link>
                      </motion.div>
                      <motion.div variants={itemVariants}>
                        <Link to="/wallet" className="flex items-center justify-between w-full px-4 py-3 text-sm text-left rtl:text-right hover:bg-gray-50" onClick={() => setIsUserMenuOpen(false)}>
                          <div className="flex items-center">
                            <WalletIcon className={`w-5 h-5 ${direction === 'rtl' ? 'ml-3' : 'mr-3'} text-gray-500`} />
                            <span>{t('header.myWallet')}</span>
                          </div>
                          <motion.div className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs font-medium" whileHover={{
                      scale: 1.1
                    }} whileTap={{
                      scale: 0.9
                    }}>
                            {user?.walletBalance.toFixed(2) || '0.00'}{' '}
                            {language === 'en' ? 'KWD' : 'د.ك'}
                          </motion.div>
                        </Link>
                      </motion.div>
                      <motion.div variants={itemVariants}>
                        <Link to="/address-book" className="flex items-center w-full px-4 py-3 text-sm text-left rtl:text-right hover:bg-gray-50" onClick={() => setIsUserMenuOpen(false)}>
                          <MapPinIcon className={`w-5 h-5 ${direction === 'rtl' ? 'ml-3' : 'mr-3'} text-gray-500`} />
                          <span>{t('header.myAddressBook')}</span>
                        </Link>
                      </motion.div>
                      <motion.div variants={itemVariants} className="border-t border-gray-100"></motion.div>
                      <motion.div variants={itemVariants}>
                        <button onClick={handleLogout} className="flex items-center w-full px-4 py-3 text-sm text-left rtl:text-right text-red-600 hover:bg-gray-50">
                          <ArrowRightOnRectangleIcon className={`w-5 h-5 ${direction === 'rtl' ? 'ml-3' : 'mr-3'}`} />
                          <span>{t('header.logout')}</span>
                        </button>
                      </motion.div>
                    </div>
                  </motion.div>}
              </AnimatePresence>
            </div> : <div className="flex items-center space-x-3 rtl:space-x-reverse">
              <Link to="/signup">
                <motion.button className="px-4 py-2 rounded-lg border-2 border-congress-blue-600 text-congress-blue-600 hover:bg-congress-blue-50 transition-colors font-medium" whileHover={{
              scale: 1.05
            }} whileTap={{
              scale: 0.97
            }}>
                  {t('header.createAccount')}
                </motion.button>
              </Link>
              <Link to="/signin">
                <motion.button className="px-4 py-2 rounded-lg bg-congress-blue-600 text-white hover:bg-congress-blue-700 transition-colors shadow-sm font-medium" whileHover={{
              scale: 1.05
            }} whileTap={{
              scale: 0.97
            }}>
                  {t('header.signIn')}
                </motion.button>
              </Link>
            </div>}
          <div className="relative">
            <motion.button onClick={toggleDropdown} className="flex items-center px-4 py-2 rounded-lg bg-regent-st-blue-100 text-congress-blue-700 hover:bg-regent-st-blue-200 transition-colors shadow-sm font-medium" whileHover={{
            scale: 1.05
          }} whileTap={{
            scale: 0.97
          }}>
              <GlobeAltIcon className={`w-4 h-4 ${direction === 'rtl' ? 'ml-2' : 'mr-2'} text-congress-blue-700`} />
              <span>{language === 'en' ? 'English' : 'العربية'}</span>
              <motion.div animate={{
              rotate: isDropdownOpen ? 180 : 0
            }} transition={{
              duration: 0.2
            }} className={`${direction === 'rtl' ? 'mr-2' : 'ml-2'}`}>
                <ChevronDownIcon className="w-4 h-4 text-congress-blue-700" />
              </motion.div>
            </motion.button>
            <AnimatePresence>
              {isDropdownOpen && <motion.div className={`absolute ${direction === 'rtl' ? 'left-0' : 'right-0'} mt-1 w-40 bg-white rounded-md shadow-lg overflow-hidden z-50 border border-gray-200`} variants={dropdownVariants} initial="hidden" animate="visible" exit="exit">
                  <div className="py-1">
                    <motion.button onClick={() => selectLanguage('en')} className={`flex items-center w-full px-4 py-2 text-sm text-left rtl:text-right ${language === 'en' ? 'bg-regent-st-blue-50 text-congress-blue-700' : 'hover:bg-gray-50'}`} whileHover={{
                  backgroundColor: language === 'en' ? '#e0f2fe' : '#f9fafb'
                }} whileTap={{
                  scale: 0.98
                }} variants={itemVariants}>
                      <span className={`${direction === 'rtl' ? 'ml-2' : 'mr-2'}`}>
                        🇺🇸
                      </span>
                      <span>English</span>
                    </motion.button>
                    <motion.button onClick={() => selectLanguage('ar')} className={`flex items-center w-full px-4 py-2 text-sm text-left rtl:text-right ${language === 'ar' ? 'bg-regent-st-blue-50 text-congress-blue-700' : 'hover:bg-gray-50'}`} whileHover={{
                  backgroundColor: language === 'ar' ? '#e0f2fe' : '#f9fafb'
                }} whileTap={{
                  scale: 0.98
                }} variants={itemVariants}>
                      <span className={`${direction === 'rtl' ? 'ml-2' : 'mr-2'}`}>
                        🇰🇼
                      </span>
                      <span>العربية</span>
                    </motion.button>
                  </div>
                </motion.div>}
            </AnimatePresence>
          </div>
        </div>
        {/* Mobile Actions */}
        <div className="flex md:hidden items-center space-x-3 rtl:space-x-reverse">
          {/* Mobile Auth Buttons (only shown when not authenticated) */}
          {!isAuthenticated && <>
              <Link to="/signup">
                <motion.button className="flex items-center justify-center w-10 h-10 rounded-full bg-regent-st-blue-50 text-congress-blue-700 hover:bg-regent-st-blue-100 transition-colors" whileHover={{
              scale: 1.05
            }} whileTap={{
              scale: 0.95
            }} aria-label={t('header.createAccount')}>
                  <UserPlusIcon className="w-5 h-5" />
                </motion.button>
              </Link>
              <Link to="/signin">
                <motion.button className="flex items-center justify-center w-10 h-10 rounded-full bg-congress-blue-600 text-white hover:bg-congress-blue-700 transition-colors shadow-sm" whileHover={{
              scale: 1.05
            }} whileTap={{
              scale: 0.95
            }} aria-label={t('header.signIn')}>
                  <KeyIcon className="w-5 h-5" />
                </motion.button>
              </Link>
            </>}
          {/* Mobile Language Switcher */}
          <motion.button onClick={toggleDropdown} className="flex items-center justify-center w-10 h-10 rounded-full bg-regent-st-blue-100 text-congress-blue-700 hover:bg-regent-st-blue-200 transition-colors" whileHover={{
          scale: 1.05
        }} whileTap={{
          scale: 0.95
        }}>
            <GlobeAltIcon className="w-5 h-5" />
          </motion.button>
          <AnimatePresence>
            {isDropdownOpen && <motion.div className={`absolute ${direction === 'rtl' ? 'left-4' : 'right-4'} top-14 w-32 bg-white rounded-md shadow-lg overflow-hidden z-50 border border-gray-200`} variants={dropdownVariants} initial="hidden" animate="visible" exit="exit">
                <div className="py-1">
                  <motion.button onClick={() => selectLanguage('en')} className={`flex items-center w-full px-3 py-2 text-sm text-left rtl:text-right ${language === 'en' ? 'bg-regent-st-blue-50 text-congress-blue-700' : 'hover:bg-gray-50'}`} whileHover={{
                backgroundColor: language === 'en' ? '#e0f2fe' : '#f9fafb'
              }} whileTap={{
                scale: 0.98
              }} variants={itemVariants}>
                    <span className={`${direction === 'rtl' ? 'ml-2' : 'mr-2'}`}>
                      🇺🇸
                    </span>
                    <span>English</span>
                  </motion.button>
                  <motion.button onClick={() => selectLanguage('ar')} className={`flex items-center w-full px-3 py-2 text-sm text-left rtl:text-right ${language === 'ar' ? 'bg-regent-st-blue-50 text-congress-blue-700' : 'hover:bg-gray-50'}`} whileHover={{
                backgroundColor: language === 'ar' ? '#e0f2fe' : '#f9fafb'
              }} whileTap={{
                scale: 0.98
              }} variants={itemVariants}>
                    <span className={`${direction === 'rtl' ? 'ml-2' : 'mr-2'}`}>
                      🇰🇼
                    </span>
                    <span>العربية</span>
                  </motion.button>
                </div>
              </motion.div>}
          </AnimatePresence>
        </div>
      </div>
    </motion.header>;
};
export default Header;