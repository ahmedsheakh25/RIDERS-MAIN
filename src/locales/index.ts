import { common } from './common';
import { header } from './components/header';
import { steps } from './components/steps';
import { serviceSelection } from './pages/serviceSelection';
import { vehicleSelection } from './pages/vehicleSelection';
import { address } from './components/address';
import { deliveryAddresses } from './pages/deliveryAddresses';
import { packageDetails } from './pages/packageDetails';
import { additionalOptions } from './pages/additionalOptions';
import { paymentMethod } from './pages/paymentMethod';
import { orderSummary } from './pages/orderSummary';
import { map } from './components/map';
import { auth } from './pages/auth';
import { dashboard } from './pages/dashboard';
import { reports } from './pages/reports';
import { accountSettings } from './pages/accountSettings';
import { wallet } from './pages/wallet';
import { addressBook } from './pages/addressBook';
import { landing } from './pages/landing';
import { bookingForm } from './pages/bookingForm';
import { signup } from './pages/signup';
export const translations = {
  en: {
    ...common.en,
    ...header.en,
    ...steps.en,
    ...serviceSelection.en,
    ...vehicleSelection.en,
    ...address.en,
    ...deliveryAddresses.en,
    ...packageDetails.en,
    ...additionalOptions.en,
    ...paymentMethod.en,
    ...orderSummary.en,
    ...map.en,
    ...auth.en,
    ...dashboard.en,
    ...reports.en,
    ...accountSettings.en,
    ...wallet.en,
    ...addressBook.en,
    ...landing.en,
    ...bookingForm.en,
    ...signup.en
  },
  ar: {
    ...common.ar,
    ...header.ar,
    ...steps.ar,
    ...serviceSelection.ar,
    ...vehicleSelection.ar,
    ...address.ar,
    ...deliveryAddresses.ar,
    ...packageDetails.ar,
    ...additionalOptions.ar,
    ...paymentMethod.ar,
    ...orderSummary.ar,
    ...map.ar,
    ...auth.ar,
    ...dashboard.ar,
    ...reports.ar,
    ...accountSettings.ar,
    ...wallet.ar,
    ...addressBook.ar,
    ...landing.ar,
    ...bookingForm.ar,
    ...signup.ar
  }
};