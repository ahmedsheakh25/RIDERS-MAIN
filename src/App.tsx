import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import { LanguageProvider, useLanguage } from './context/LanguageContext';
import { FormProvider } from './context/FormContext';
import { AuthProvider } from './context/AuthContext';
import { ToastProvider } from './context/ToastContext';
import Header from './components/Header';
import MobileNav from './components/navigation/MobileNav';
import HomePage from './pages/HomePage';
import LandingPage from './pages/LandingPage';
import BookingForm from './pages/BookingForm';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import AccountSettings from './pages/AccountSettings';
import Dashboard from './pages/Dashboard';
import Wallet from './pages/Wallet';
import AddressBook from './pages/AddressBook';
import ProtectedRoute from './components/ProtectedRoute';
import PageTransition from './components/transitions/PageTransition';
export function App() {
  return <Router>
      <LanguageProvider>
        <AuthProvider>
          <FormProvider>
            <ToastProvider>
              <AppRoutes />
            </ToastProvider>
          </FormProvider>
        </AuthProvider>
      </LanguageProvider>
    </Router>;
}
// Separate component for routes to ensure hooks are used after providers
const AppRoutes = () => {
  const location = useLocation();
  const {
    direction
  } = useLanguage();
  return <div className={`flex flex-col min-h-screen w-full bg-gray-50 ${direction === 'rtl' ? 'rtl' : 'ltr'}`} dir={direction}>
      <Header />
      <main className="flex-1 w-full pb-28 md:pb-0 relative z-0">
        <AnimatePresence mode="wait">
          <Routes location={location} key={location.pathname}>
            {/* Root route */}
            <Route path="/" element={<PageTransition>
                  <HomePage />
                </PageTransition>} />
            {/* Public routes */}
            <Route path="/landing" element={<PageTransition>
                  <LandingPage />
                </PageTransition>} />
            <Route path="/signin" element={<PageTransition>
                  <SignIn />
                </PageTransition>} />
            <Route path="/signup" element={<PageTransition>
                  <SignUp />
                </PageTransition>} />
            {/* Protected routes - require authentication */}
            <Route element={<ProtectedRoute />}>
              <Route path="/dashboard" element={<PageTransition>
                    <Dashboard />
                  </PageTransition>} />
              <Route path="/booking" element={<PageTransition>
                    <BookingForm />
                  </PageTransition>} />
              <Route path="/account/settings" element={<PageTransition>
                    <AccountSettings />
                  </PageTransition>} />
              <Route path="/wallet" element={<PageTransition>
                    <Wallet />
                  </PageTransition>} />
              <Route path="/address-book" element={<PageTransition>
                    <AddressBook />
                  </PageTransition>} />
            </Route>
          </Routes>
        </AnimatePresence>
      </main>
      <MobileNav />
    </div>;
};