import React, { useState, Children } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../context/ToastContext';
import { motion, AnimatePresence } from 'framer-motion';
import { CreditCardIcon, TruckIcon, BellIcon, ChatBubbleLeftRightIcon, TrashIcon, InformationCircleIcon, UserGroupIcon, LinkIcon, UserCircleIcon, PlusIcon, ArrowPathIcon, CloudArrowUpIcon } from '@heroicons/react/24/outline';
import Button from '../components/ui/Button';
import Toggle from '../components/ui/Toggle';
import Input from '../components/ui/Input';
import Checkbox from '../components/ui/Checkbox';
import PaymentCard from '../components/settings/PaymentCard';
import AnimatedCounter from '../components/settings/AnimatedCounter';
type TabType = 'account' | 'team' | 'integrations' | 'profile';
const AccountSettings: React.FC = () => {
  const {
    t,
    language,
    direction
  } = useLanguage();
  const {
    user
  } = useAuth();
  const {
    showToast
  } = useToast();
  const [activeTab, setActiveTab] = useState<TabType>('account');
  // Payment Methods State
  const [savedCards, setSavedCards] = useState([{
    id: '1',
    type: 'visa',
    last4: '9788',
    exp: '09/25'
  }, {
    id: '2',
    type: 'mastercard',
    last4: '4321',
    exp: '12/24'
  }]);
  // Delivery Settings State
  const [deliveryNote, setDeliveryNote] = useState('');
  const [bankInfo, setBankInfo] = useState('');
  const [deliveryContent, setDeliveryContent] = useState('');
  // Notification Settings State
  const [emailNotifications, setEmailNotifications] = useState(false);
  const [weeklyNewsletter, setWeeklyNewsletter] = useState(false);
  const [orderUpdates, setOrderUpdates] = useState(true);
  const [promotions, setPromotions] = useState(true);
  // SMS Settings State
  const [smsEnabled, setSmsEnabled] = useState(true);
  const [senderName, setSenderName] = useState('Riders');
  // Team Members State
  const [teamMembers, setTeamMembers] = useState([{
    id: 1,
    name: 'Ahmed Ali',
    email: 'ahmed@example.com',
    role: 'Admin',
    status: 'Active'
  }, {
    id: 2,
    name: 'Sara Khan',
    email: 'sara@example.com',
    role: 'Manager',
    status: 'Active'
  }, {
    id: 3,
    name: 'Mohammed Hassan',
    email: 'mohammed@example.com',
    role: 'Viewer',
    status: 'Pending'
  }]);
  // Profile Settings State
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [email, setEmail] = useState(user?.email || '');
  const [companyName, setCompanyName] = useState('Your Company');
  const removeCard = (cardId: string) => {
    setSavedCards(savedCards.filter(card => card.id !== cardId));
    showToast('success', t('accountSettings.cardRemoved'), 3000);
  };
  const handleSaveDeliverySettings = () => {
    showToast('success', t('accountSettings.deliverySettingsSaved'), 3000);
  };
  const handleSaveNotifications = () => {
    showToast('success', t('accountSettings.notificationsSaved'), 3000);
  };
  const handleSaveSmsSettings = () => {
    showToast('success', t('accountSettings.smsSaved'), 3000);
  };
  const handleSendInvitation = () => {
    showToast('success', t('accountSettings.invitationSent'), 3000);
  };
  const handleConnectIntegration = (name: string) => {
    showToast('info', `${t('accountSettings.connecting')} ${name}...`, 3000);
    // In a real app, this would be an API call
    setTimeout(() => {
      showToast('success', `${t('accountSettings.connected')} ${name}`, 3000);
    }, 2000);
  };
  const handleDisconnectIntegration = (name: string) => {
    showToast('warning', `${t('accountSettings.disconnecting')} ${name}...`, 3000);
    // In a real app, this would be an API call
    setTimeout(() => {
      showToast('success', `${t('accountSettings.disconnected')} ${name}`, 3000);
    }, 2000);
  };
  const handleRegenerateApiKey = () => {
    showToast('info', t('accountSettings.regeneratingApiKey'), 3000);
    // In a real app, this would be an API call
    setTimeout(() => {
      showToast('success', t('accountSettings.apiKeyRegenerated'), 3000);
    }, 2000);
  };
  const handleSaveProfile = () => {
    showToast('success', t('accountSettings.profileSaved'), 3000);
  };
  const handleUpdatePassword = () => {
    if (newPassword !== confirmPassword) {
      showToast('error', t('accountSettings.passwordsDoNotMatch'), 5000);
      return;
    }
    showToast('success', t('accountSettings.passwordUpdated'), 3000);
  };
  const renderTabContent = () => {
    switch (activeTab) {
      case 'account':
        return renderAccountSettings();
      case 'team':
        return renderTeamSettings();
      case 'integrations':
        return renderIntegrationSettings();
      case 'profile':
        return renderProfileSettings();
      default:
        return renderAccountSettings();
    }
  };
  // Animation variants
  const tabContentVariants = {
    hidden: {
      opacity: 0,
      x: 10
    },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.15,
        when: 'beforeChildren',
        staggerChildren: 0.05
      }
    },
    exit: {
      opacity: 0,
      x: -10,
      transition: {
        duration: 0.15
      }
    }
  };
  const cardVariants = {
    hidden: {
      opacity: 0,
      y: 10
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: 'spring',
        damping: 15,
        stiffness: 100,
        duration: 0.15
      }
    }
  };
  const renderAccountSettings = () => {
    return <motion.div className="grid grid-cols-1 md:grid-cols-2 gap-6" variants={tabContentVariants} initial="hidden" animate="visible" exit="exit">
        {/* Payment Options Card */}
        <motion.div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden" variants={cardVariants} whileHover={{
        y: -5,
        boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.1)'
      }}>
          <div className="p-5 border-b border-gray-100 flex items-center">
            <div className={`p-2 bg-congress-blue-100 rounded-full rtl-icon-spacing`}>
              <CreditCardIcon className="w-5 h-5 text-congress-blue-700" />
            </div>
            <h2 className="text-xl font-semibold text-congress-blue-700">
              {t('accountSettings.paymentOptions')}
            </h2>
          </div>
          <div className="p-5">
            {savedCards.length > 0 ? <div className="space-y-3">
                {savedCards.map(card => <PaymentCard key={card.id} cardType={card.type} last4={card.last4} expiry={card.exp} onRemove={() => removeCard(card.id)} />)}
              </div> : <p className="text-gray-500 text-center py-4">
                {t('accountSettings.noPaymentMethods')}
              </p>}
            <motion.div whileHover={{
            scale: 1.02
          }} whileTap={{
            scale: 0.98
          }}>
              <Button variant="outline" className="mt-4" size="sm">
                {t('accountSettings.addNewCard')}
              </Button>
            </motion.div>
          </div>
        </motion.div>
        {/* Delivery Settings Card */}
        <motion.div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden" variants={cardVariants} whileHover={{
        y: -5,
        boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.1)'
      }}>
          <div className="p-5 border-b border-gray-100 flex items-center">
            <div className={`p-2 bg-congress-blue-100 rounded-full rtl-icon-spacing`}>
              <TruckIcon className="w-5 h-5 text-congress-blue-700" />
            </div>
            <h2 className="text-xl font-semibold text-congress-blue-700">
              {t('accountSettings.deliverySettings')}
            </h2>
          </div>
          <div className="p-5">
            <div className="space-y-4">
              <Input label={t('accountSettings.defaultDeliveryNote')} name="deliveryNote" value={deliveryNote} onChange={e => setDeliveryNote(e.target.value)} placeholder={t('accountSettings.deliveryNotePlaceholder')} />
              <Input label={t('accountSettings.bankInformation')} name="bankInfo" value={bankInfo} onChange={e => setBankInfo(e.target.value)} placeholder={t('accountSettings.bankInfoPlaceholder')} />
              <Input label={t('accountSettings.defaultPackageContents')} name="deliveryContent" value={deliveryContent} onChange={e => setDeliveryContent(e.target.value)} placeholder={t('accountSettings.packageContentsPlaceholder')} />
              <div className="flex justify-end mt-4">
                <motion.div whileHover={{
                scale: 1.05
              }} whileTap={{
                scale: 0.95
              }}>
                  <Button variant="primary" size="sm" onClick={handleSaveDeliverySettings}>
                    {t('accountSettings.saveChanges')}
                  </Button>
                </motion.div>
              </div>
            </div>
          </div>
        </motion.div>
        {/* Notification Settings Card */}
        <motion.div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden" variants={cardVariants} whileHover={{
        y: -5,
        boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.1)'
      }}>
          <div className="p-5 border-b border-gray-100 flex items-center">
            <div className={`p-2 bg-congress-blue-100 rounded-full rtl-icon-spacing`}>
              <BellIcon className="w-5 h-5 text-congress-blue-700" />
            </div>
            <h2 className="text-xl font-semibold text-congress-blue-700">
              {t('accountSettings.notificationSettings')}
            </h2>
          </div>
          <div className="p-5">
            <div className="space-y-4">
              <Checkbox label={t('accountSettings.emailNotifications')} checked={emailNotifications} onChange={setEmailNotifications} />
              <Checkbox label={t('accountSettings.weeklyNewsletter')} checked={weeklyNewsletter} onChange={setWeeklyNewsletter} />
              <Checkbox label={t('accountSettings.deliveryUpdates')} checked={orderUpdates} onChange={setOrderUpdates} />
              <Checkbox label={t('accountSettings.promotionalOffers')} checked={promotions} onChange={setPromotions} />
              <div className="flex justify-end mt-4">
                <motion.div whileHover={{
                scale: 1.05
              }} whileTap={{
                scale: 0.95
              }}>
                  <Button variant="primary" size="sm" onClick={handleSaveNotifications}>
                    {t('accountSettings.savePreferences')}
                  </Button>
                </motion.div>
              </div>
            </div>
          </div>
        </motion.div>
        {/* SMS Settings Card */}
        <motion.div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden" variants={cardVariants} whileHover={{
        y: -5,
        boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.1)'
      }}>
          <div className="p-5 border-b border-gray-100 flex items-center">
            <div className={`p-2 bg-congress-blue-100 rounded-full rtl-icon-spacing`}>
              <ChatBubbleLeftRightIcon className="w-5 h-5 text-congress-blue-700" />
            </div>
            <h2 className="text-xl font-semibold text-congress-blue-700">
              {t('accountSettings.smsNotifications')}
            </h2>
          </div>
          <div className="p-5">
            <div className="flex items-center justify-between mb-4">
              <span className="font-medium text-gray-700">
                {t('accountSettings.enableSms')}
              </span>
              <Toggle enabled={smsEnabled} onChange={setSmsEnabled} />
            </div>
            <AnimatePresence>
              {smsEnabled && <motion.div initial={{
              opacity: 0,
              height: 0
            }} animate={{
              opacity: 1,
              height: 'auto'
            }} exit={{
              opacity: 0,
              height: 0
            }} transition={{
              duration: 0.2
            }}>
                  <div className="mb-5">
                    <label className="block text-sm font-medium text-gray-700 mb-1.5">
                      {t('accountSettings.senderName')}
                    </label>
                    <input type="text" value={senderName} onChange={e => setSenderName(e.target.value)} placeholder={t('accountSettings.senderNamePlaceholder')} className="w-full px-4 py-2.5 border rounded-lg focus:outline-none focus:ring-2 border-gray-300 focus:ring-regent-st-blue-300 focus:border-regent-st-blue-400" maxLength={11} />
                    <p className="text-xs text-gray-500 mt-1">
                      {t('accountSettings.senderNamePlaceholder')}: {senderName}
                    </p>
                  </div>
                  <motion.div className="bg-gray-100 rounded-lg p-4 mb-4" initial={{
                scale: 0.95,
                opacity: 0
              }} animate={{
                scale: 1,
                opacity: 1
              }} transition={{
                delay: 0.1,
                type: 'spring',
                duration: 0.2
              }}>
                    <div className="flex items-start mb-2">
                      <div className={`bg-congress-blue-100 text-congress-blue-700 rounded-full p-1.5 ${direction === 'rtl' ? 'ml-2' : 'mr-2'}`}>
                        <ChatBubbleLeftRightIcon className="w-4 h-4" />
                      </div>
                      <div className="text-sm font-medium text-gray-700">
                        {t('accountSettings.messagePreview')}
                      </div>
                      <div className="ml-auto text-xs text-gray-500">
                        9:41 AM
                      </div>
                    </div>
                    <motion.div className={`bg-white rounded-lg p-3 shadow-sm relative ${direction === 'rtl' ? 'mr-6' : 'ml-6'}`} initial={{
                  x: direction === 'rtl' ? 10 : -10,
                  opacity: 0
                }} animate={{
                  x: 0,
                  opacity: 1
                }} transition={{
                  delay: 0.2,
                  type: 'spring',
                  duration: 0.2
                }}>
                      <div className={`absolute ${direction === 'rtl' ? 'right-0 translate-x-2' : 'left-0 -translate-x-2'} top-4 rotate-45 w-2 h-2 bg-white`}></div>
                      <p className="text-sm font-medium mb-1">{senderName}</p>
                      <p className="text-sm text-gray-600">
                        {language === 'ar' ? `توصيلك من ${senderName} في الطريق! تتبع طردك برقم الطلب #123456.` : `Your delivery from ${senderName} is on its way! Track your package with order #123456.`}
                      </p>
                    </motion.div>
                  </motion.div>
                  <div className="flex items-center text-xs text-gray-500 mb-4">
                    <InformationCircleIcon className={`w-4 h-4 ${direction === 'rtl' ? 'ml-1' : 'mr-1'}`} />
                    <span>{t('accountSettings.smsRates')}</span>
                  </div>
                  <div className="flex justify-end">
                    <motion.div whileHover={{
                  scale: 1.05
                }} whileTap={{
                  scale: 0.95
                }}>
                      <Button variant="primary" size="sm" onClick={handleSaveSmsSettings}>
                        {t('accountSettings.saveSettings')}
                      </Button>
                    </motion.div>
                  </div>
                </motion.div>}
            </AnimatePresence>
          </div>
        </motion.div>
      </motion.div>;
  };
  const renderTeamSettings = () => {
    return <motion.div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden" variants={tabContentVariants} initial="hidden" animate="visible" exit="exit">
        <div className="p-5 border-b border-gray-100 flex items-center justify-between">
          <div className="flex items-center">
            <div className={`p-2 bg-congress-blue-100 rounded-full rtl-icon-spacing`}>
              <UserGroupIcon className="w-5 h-5 text-congress-blue-700" />
            </div>
            <h2 className="text-xl font-semibold text-congress-blue-700">
              {t('accountSettings.teamMembers')}
            </h2>
          </div>
          <motion.div whileHover={{
          scale: 1.05
        }} whileTap={{
          scale: 0.95
        }}>
            <Button variant="primary" size="sm" className="flex items-center">
              <PlusIcon className={`w-4 h-4 ${direction === 'rtl' ? 'ml-1' : 'mr-1'}`} />
              {t('accountSettings.addMember')}
            </Button>
          </motion.div>
        </div>
        <div className="p-5">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th scope="col" className="px-3 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    {t('accountSettings.name')}
                  </th>
                  <th scope="col" className="px-3 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider hidden sm:table-cell">
                    {t('accountSettings.email')}
                  </th>
                  <th scope="col" className="px-3 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    {t('accountSettings.role')}
                  </th>
                  <th scope="col" className="px-3 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    {t('accountSettings.status')}
                  </th>
                  <th scope="col" className="px-3 sm:px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    {t('accountSettings.actions')}
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {teamMembers.map((member, index) => <motion.tr key={member.id} initial={{
                opacity: 0,
                y: 5
              }} animate={{
                opacity: 1,
                y: 0
              }} transition={{
                delay: index * 0.05,
                type: 'spring',
                stiffness: 100,
                duration: 0.15
              }} whileHover={{
                backgroundColor: 'rgba(243, 244, 246, 0.5)'
              }}>
                    <td className="px-3 sm:px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <motion.div className={`flex-shrink-0 h-8 w-8 sm:h-10 sm:w-10 bg-congress-blue-100 rounded-full flex items-center justify-center ${direction === 'rtl' ? 'ml-4' : 'mr-4'}`} whileHover={{
                      scale: 1.1
                    }}>
                          <span className="text-congress-blue-700 font-medium">
                            {member.name.charAt(0)}
                          </span>
                        </motion.div>
                        <div>
                          <div className="text-sm font-medium text-gray-900">
                            {member.name}
                          </div>
                          <div className="text-xs text-gray-500 sm:hidden">
                            {member.email}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-3 sm:px-6 py-4 whitespace-nowrap hidden sm:table-cell">
                      <div className="text-sm text-gray-900">
                        {member.email}
                      </div>
                    </td>
                    <td className="px-3 sm:px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{member.role}</div>
                    </td>
                    <td className="px-3 sm:px-6 py-4 whitespace-nowrap">
                      <motion.span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${member.status === 'Active' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}`} whileHover={{
                    y: -2
                  }}>
                        {member.status}
                      </motion.span>
                    </td>
                    <td className="px-3 sm:px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <div className="flex justify-end space-x-2 rtl:space-x-reverse">
                        <motion.button className="text-congress-blue-600 hover:text-congress-blue-900" whileHover={{
                      scale: 1.05
                    }} whileTap={{
                      scale: 0.95
                    }}>
                          {t('accountSettings.edit')}
                        </motion.button>
                        <motion.button className="text-red-600 hover:text-red-900" whileHover={{
                      scale: 1.05
                    }} whileTap={{
                      scale: 0.95
                    }}>
                          {t('accountSettings.remove')}
                        </motion.button>
                      </div>
                    </td>
                  </motion.tr>)}
              </tbody>
            </table>
          </div>
          <div className="mt-6">
            <motion.h3 className="text-lg font-medium text-gray-900 mb-3" initial={{
            opacity: 0
          }} animate={{
            opacity: 1
          }} transition={{
            delay: 0.2,
            type: 'spring',
            stiffness: 100,
            duration: 0.15
          }}>
              {t('accountSettings.inviteNewMember')}
            </motion.h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Input label={t('accountSettings.emailAddress')} name="inviteEmail" placeholder="colleague@example.com" value="" onChange={() => {}} />
              <div className="flex flex-col">
                <label className="block text-sm font-medium text-gray-700 mb-1.5">
                  {t('accountSettings.role')}
                </label>
                <select className="w-full px-4 py-2.5 border rounded-lg focus:outline-none focus:ring-2 border-gray-300 focus:ring-regent-st-blue-300 focus:border-regent-st-blue-400">
                  <option value="admin">
                    {t('accountSettings.roleAdmin')}
                  </option>
                  <option value="manager">
                    {t('accountSettings.roleManager')}
                  </option>
                  <option value="viewer">
                    {t('accountSettings.roleViewer')}
                  </option>
                </select>
              </div>
            </div>
            <div className="mt-4">
              <motion.div whileHover={{
              scale: 1.05
            }} whileTap={{
              scale: 0.95
            }}>
                <Button variant="primary" size="sm" onClick={handleSendInvitation}>
                  {t('accountSettings.sendInvitation')}
                </Button>
              </motion.div>
            </div>
          </div>
        </div>
      </motion.div>;
  };
  const renderIntegrationSettings = () => {
    return <motion.div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden" variants={tabContentVariants} initial="hidden" animate="visible" exit="exit">
        <div className="p-5 border-b border-gray-100 flex items-center">
          <div className={`p-2 bg-congress-blue-100 rounded-full rtl-icon-spacing`}>
            <LinkIcon className="w-5 h-5 text-congress-blue-700" />
          </div>
          <h2 className="text-xl font-semibold text-congress-blue-700">
            {t('accountSettings.crmIntegrations')}
          </h2>
        </div>
        <div className="p-5">
          <motion.div className="space-y-6" variants={cardVariants}>
            {/* Shopify Integration */}
            <motion.div className="flex items-center justify-between p-4 border rounded-lg" whileHover={{
            y: -3,
            boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
          }} initial={{
            opacity: 0,
            y: 10
          }} animate={{
            opacity: 1,
            y: 0
          }} transition={{
            delay: 0.05,
            type: 'spring',
            stiffness: 100,
            duration: 0.15
          }}>
              <div className="flex items-center">
                <motion.img src="https://cdn.worldvectorlogo.com/logos/shopify.svg" alt="Shopify" className={`w-8 h-8 sm:w-10 sm:h-10 ${direction === 'rtl' ? 'ml-3 sm:ml-4' : 'mr-3 sm:mr-4'}`} whileHover={{
                rotate: 10
              }} />
                <div>
                  <h3 className="font-medium text-gray-900">Shopify</h3>
                  <p className="text-xs sm:text-sm text-gray-500">
                    {t('accountSettings.connectShopify')}
                  </p>
                </div>
              </div>
              <motion.div whileHover={{
              scale: 1.05
            }} whileTap={{
              scale: 0.95
            }}>
                <Button variant="outline" size="sm" onClick={() => handleConnectIntegration('Shopify')}>
                  {t('accountSettings.connect')}
                </Button>
              </motion.div>
            </motion.div>
            {/* WooCommerce Integration */}
            <motion.div className="flex items-center justify-between p-4 border rounded-lg" whileHover={{
            y: -3,
            boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
          }} initial={{
            opacity: 0,
            y: 10
          }} animate={{
            opacity: 1,
            y: 0
          }} transition={{
            delay: 0.1,
            type: 'spring',
            stiffness: 100,
            duration: 0.15
          }}>
              <div className="flex items-center">
                <motion.img src="https://cdn.worldvectorlogo.com/logos/woocommerce.svg" alt="WooCommerce" className={`w-8 h-8 sm:w-10 sm:h-10 ${direction === 'rtl' ? 'ml-3 sm:ml-4' : 'mr-3 sm:mr-4'}`} whileHover={{
                rotate: 10
              }} />
                <div>
                  <h3 className="font-medium text-gray-900">WooCommerce</h3>
                  <p className="text-xs sm:text-sm text-gray-500">
                    {t('accountSettings.syncWooCommerce')}
                  </p>
                </div>
              </div>
              <motion.div whileHover={{
              scale: 1.05
            }} whileTap={{
              scale: 0.95
            }}>
                <Button variant="outline" size="sm" onClick={() => handleConnectIntegration('WooCommerce')}>
                  {t('accountSettings.connect')}
                </Button>
              </motion.div>
            </motion.div>
            {/* Salesforce Integration */}
            <motion.div className="flex items-center justify-between p-4 border rounded-lg" whileHover={{
            y: -3,
            boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
          }} initial={{
            opacity: 0,
            y: 10
          }} animate={{
            opacity: 1,
            y: 0
          }} transition={{
            delay: 0.15,
            type: 'spring',
            stiffness: 100,
            duration: 0.15
          }}>
              <div className="flex items-center">
                <motion.img src="https://cdn.worldvectorlogo.com/logos/salesforce-2.svg" alt="Salesforce" className={`w-8 h-8 sm:w-10 sm:h-10 ${direction === 'rtl' ? 'ml-3 sm:ml-4' : 'mr-3 sm:mr-4'}`} whileHover={{
                rotate: 10
              }} />
                <div>
                  <h3 className="font-medium text-gray-900">Salesforce</h3>
                  <p className="text-xs sm:text-sm text-gray-500">
                    {t('accountSettings.integrateSalesforce')}
                  </p>
                </div>
              </div>
              <div className="flex items-center">
                <motion.span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800 ${direction === 'rtl' ? 'ml-3' : 'mr-3'}`} initial={{
                scale: 0
              }} animate={{
                scale: 1
              }} transition={{
                delay: 0.25,
                type: 'spring',
                stiffness: 200,
                damping: 10,
                duration: 0.15
              }}>
                  {t('accountSettings.connected')}
                </motion.span>
                <motion.div whileHover={{
                scale: 1.05
              }} whileTap={{
                scale: 0.95
              }}>
                  <Button variant="outline" size="sm" onClick={() => handleDisconnectIntegration('Salesforce')}>
                    {t('accountSettings.disconnect')}
                  </Button>
                </motion.div>
              </div>
            </motion.div>
            {/* HubSpot Integration */}
            <motion.div className="flex items-center justify-between p-4 border rounded-lg" whileHover={{
            y: -3,
            boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
          }} initial={{
            opacity: 0,
            y: 10
          }} animate={{
            opacity: 1,
            y: 0
          }} transition={{
            delay: 0.2,
            type: 'spring',
            stiffness: 100,
            duration: 0.15
          }}>
              <div className="flex items-center">
                <motion.img src="https://cdn.worldvectorlogo.com/logos/hubspot.svg" alt="HubSpot" className={`w-8 h-8 sm:w-10 sm:h-10 ${direction === 'rtl' ? 'ml-3 sm:ml-4' : 'mr-3 sm:mr-4'}`} whileHover={{
                rotate: 10
              }} />
                <div>
                  <h3 className="font-medium text-gray-900">HubSpot</h3>
                  <p className="text-xs sm:text-sm text-gray-500">
                    {t('accountSettings.connectHubspot')}
                  </p>
                </div>
              </div>
              <motion.div whileHover={{
              scale: 1.05
            }} whileTap={{
              scale: 0.95
            }}>
                <Button variant="outline" size="sm" onClick={() => handleConnectIntegration('HubSpot')}>
                  {t('accountSettings.connect')}
                </Button>
              </motion.div>
            </motion.div>
            {/* API Integration */}
            <motion.div className="mt-8" initial={{
            opacity: 0
          }} animate={{
            opacity: 1
          }} transition={{
            delay: 0.3,
            type: 'spring',
            stiffness: 100,
            duration: 0.15
          }}>
              <h3 className="text-lg font-medium text-gray-900 mb-3">
                {t('accountSettings.apiAccess')}
              </h3>
              <motion.div className="bg-gray-50 p-4 rounded-lg" initial={{
              y: 5,
              opacity: 0
            }} animate={{
              y: 0,
              opacity: 1
            }} transition={{
              delay: 0.35,
              type: 'spring',
              stiffness: 100,
              duration: 0.15
            }}>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-gray-700">
                    {t('accountSettings.apiKey')}
                  </span>
                  <motion.div whileHover={{
                  scale: 1.05
                }} whileTap={{
                  scale: 0.95
                }}>
                    <Button variant="outline" size="sm" className="flex items-center" onClick={handleRegenerateApiKey}>
                      <ArrowPathIcon className={`w-4 h-4 ${direction === 'rtl' ? 'ml-1' : 'mr-1'}`} />
                      {t('accountSettings.regenerate')}
                    </Button>
                  </motion.div>
                </div>
                <div className="flex items-center">
                  <input type="password" value="api_key_12345678abcdefgh" readOnly className={`flex-1 px-4 py-2 border rounded-lg focus:outline-none border-gray-300 bg-white ${direction === 'rtl' ? 'ml-2' : 'mr-2'} text-sm`} />
                  <motion.div whileHover={{
                  scale: 1.05
                }} whileTap={{
                  scale: 0.95
                }}>
                    <Button variant="outline" size="sm">
                      {t('accountSettings.show')}
                    </Button>
                  </motion.div>
                </div>
                <p className="text-xs text-gray-500 mt-2">
                  {t('accountSettings.apiKeyDescription')}
                </p>
              </motion.div>
            </motion.div>
          </motion.div>
        </div>
      </motion.div>;
  };
  const renderProfileSettings = () => {
    return <motion.div className="grid grid-cols-1 md:grid-cols-2 gap-6" variants={tabContentVariants} initial="hidden" animate="visible" exit="exit">
        {/* Company Profile */}
        <motion.div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden" variants={cardVariants} whileHover={{
        y: -5,
        boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.1)'
      }}>
          <div className="p-5 border-b border-gray-100 flex items-center">
            <div className={`p-2 bg-congress-blue-100 rounded-full rtl-icon-spacing`}>
              <UserCircleIcon className="w-5 h-5 text-congress-blue-700" />
            </div>
            <h2 className="text-xl font-semibold text-congress-blue-700">
              {t('accountSettings.companyProfile')}
            </h2>
          </div>
          <div className="p-5">
            <motion.div className="flex flex-col items-center mb-6" initial={{
            scale: 0.9,
            opacity: 0
          }} animate={{
            scale: 1,
            opacity: 1
          }} transition={{
            delay: 0.1,
            type: 'spring',
            stiffness: 100,
            duration: 0.15
          }}>
              <motion.div className="w-20 h-20 sm:w-24 sm:h-24 bg-gray-200 rounded-full flex items-center justify-center mb-4 relative overflow-hidden" whileHover={{
              scale: 1.05
            }}>
                <motion.span initial={{
                scale: 0
              }} animate={{
                scale: 1
              }} transition={{
                type: 'spring',
                stiffness: 200,
                damping: 10,
                delay: 0.15,
                duration: 0.15
              }}>
                  {companyName.charAt(0)}
                </motion.span>
                <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity cursor-pointer">
                  <CloudArrowUpIcon className="w-8 h-8 text-white" />
                </div>
              </motion.div>
              <p className="text-sm text-gray-500">
                {t('accountSettings.uploadLogo')}
              </p>
            </motion.div>
            <div className="space-y-4">
              <Input label={t('accountSettings.companyName')} name="companyName" value={companyName} onChange={e => setCompanyName(e.target.value)} placeholder={t('accountSettings.companyNamePlaceholder')} />
              <Input label={t('accountSettings.emailAddress')} name="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="company@example.com" />
              <div className="flex justify-end mt-4">
                <motion.div whileHover={{
                scale: 1.05
              }} whileTap={{
                scale: 0.95
              }}>
                  <Button variant="primary" size="sm" onClick={handleSaveProfile}>
                    {t('accountSettings.saveProfile')}
                  </Button>
                </motion.div>
              </div>
            </div>
          </div>
        </motion.div>
        {/* Password Settings */}
        <motion.div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden" variants={cardVariants} whileHover={{
        y: -5,
        boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.1)'
      }}>
          <div className="p-5 border-b border-gray-100 flex items-center">
            <div className={`p-2 bg-congress-blue-100 rounded-full rtl-icon-spacing`}>
              <UserCircleIcon className="w-5 h-5 text-congress-blue-700" />
            </div>
            <h2 className="text-xl font-semibold text-congress-blue-700">
              {t('accountSettings.passwordSettings')}
            </h2>
          </div>
          <div className="p-5">
            <div className="space-y-4">
              <Input label={t('accountSettings.currentPassword')} name="currentPassword" type="password" value={currentPassword} onChange={e => setCurrentPassword(e.target.value)} placeholder={t('accountSettings.enterCurrentPassword')} />
              <Input label={t('accountSettings.newPassword')} name="newPassword" type="password" value={newPassword} onChange={e => setNewPassword(e.target.value)} placeholder={t('accountSettings.enterNewPassword')} />
              <Input label={t('accountSettings.confirmNewPassword')} name="confirmPassword" type="password" value={confirmPassword} onChange={e => setConfirmPassword(e.target.value)} placeholder={t('accountSettings.confirmNewPassword')} />
              <div className="flex justify-end mt-4">
                <motion.div whileHover={{
                scale: 1.05
              }} whileTap={{
                scale: 0.95
              }}>
                  <Button variant="primary" size="sm" onClick={handleUpdatePassword}>
                    {t('accountSettings.updatePassword')}
                  </Button>
                </motion.div>
              </div>
            </div>
          </div>
        </motion.div>
      </motion.div>;
  };
  return <div className="container mx-auto px-4 py-8 bg-gray-50 min-h-screen">
      <motion.h1 className="text-3xl font-bold text-congress-blue-700 mb-6" initial={{
      opacity: 0,
      y: -20
    }} animate={{
      opacity: 1,
      y: 0
    }} transition={{
      duration: 0.3,
      type: 'spring',
      stiffness: 100
    }}>
        {t('accountSettings.title')}
      </motion.h1>
      {/* Tab Navigation */}
      <motion.div className="flex overflow-x-auto scrollbar-hide mb-8 bg-white rounded-lg shadow-sm border border-gray-200" initial={{
      opacity: 0,
      y: -10
    }} animate={{
      opacity: 1,
      y: 0
    }} transition={{
      duration: 0.3,
      delay: 0.1,
      type: 'spring',
      stiffness: 100
    }}>
        <motion.button onClick={() => setActiveTab('account')} className={`flex items-center px-3 py-3 text-sm font-medium whitespace-nowrap flex-1 ${activeTab === 'account' ? 'text-congress-blue-700 border-b-2 border-congress-blue-500' : 'text-gray-500 hover:text-gray-700'}`} whileHover={{
        y: -2
      }} whileTap={{
        y: 0
      }}>
          <TruckIcon className={`w-5 h-5 ${activeTab === 'account' ? 'text-congress-blue-700' : 'text-gray-500'} ${language === 'ar' ? 'ml-1 sm:ml-2' : 'mr-1 sm:mr-2'}`} />
          <span className="hidden sm:inline">
            {t('accountSettings.accountSettingsTab')}
          </span>
          <span className="sm:hidden">{t('accountSettings.accountTab')}</span>
        </motion.button>
        <motion.button onClick={() => setActiveTab('team')} className={`flex items-center px-3 py-3 text-sm font-medium whitespace-nowrap flex-1 ${activeTab === 'team' ? 'text-congress-blue-700 border-b-2 border-congress-blue-500' : 'text-gray-500 hover:text-gray-700'}`} whileHover={{
        y: -2
      }} whileTap={{
        y: 0
      }}>
          <UserGroupIcon className={`w-5 h-5 ${activeTab === 'team' ? 'text-congress-blue-700' : 'text-gray-500'} ${language === 'ar' ? 'ml-1 sm:ml-2' : 'mr-1 sm:mr-2'}`} />
          <span className="hidden sm:inline">
            {t('accountSettings.teamMembersTab')}
          </span>
          <span className="sm:hidden">{t('accountSettings.teamTab')}</span>
        </motion.button>
        <motion.button onClick={() => setActiveTab('integrations')} className={`flex items-center px-3 py-3 text-sm font-medium whitespace-nowrap flex-1 ${activeTab === 'integrations' ? 'text-congress-blue-700 border-b-2 border-congress-blue-500' : 'text-gray-500 hover:text-gray-700'}`} whileHover={{
        y: -2
      }} whileTap={{
        y: 0
      }}>
          <LinkIcon className={`w-5 h-5 ${activeTab === 'integrations' ? 'text-congress-blue-700' : 'text-gray-500'} ${language === 'ar' ? 'ml-1 sm:ml-2' : 'mr-1 sm:mr-2'}`} />
          <span className="hidden sm:inline">
            {t('accountSettings.integrationsTab')}
          </span>
          <span className="sm:hidden">{t('accountSettings.apiTab')}</span>
        </motion.button>
        <motion.button onClick={() => setActiveTab('profile')} className={`flex items-center px-3 py-3 text-sm font-medium whitespace-nowrap flex-1 ${activeTab === 'profile' ? 'text-congress-blue-700 border-b-2 border-congress-blue-500' : 'text-gray-500 hover:text-gray-700'}`} whileHover={{
        y: -2
      }} whileTap={{
        y: 0
      }}>
          <UserCircleIcon className={`w-5 h-5 ${activeTab === 'profile' ? 'text-congress-blue-700' : 'text-gray-500'} ${language === 'ar' ? 'ml-1 sm:ml-2' : 'mr-1 sm:mr-2'}`} />
          <span className="hidden sm:inline">
            {t('accountSettings.profileSettingsTab')}
          </span>
          <span className="sm:hidden">{t('accountSettings.profileTab')}</span>
        </motion.button>
      </motion.div>
      {/* Tab Content */}
      <AnimatePresence mode="wait">
        <motion.div key={activeTab} initial={{
        opacity: 0,
        x: 10
      }} animate={{
        opacity: 1,
        x: 0
      }} exit={{
        opacity: 0,
        x: -10
      }} transition={{
        duration: 0.15,
        type: 'spring',
        stiffness: 100
      }}>
          {renderTabContent()}
        </motion.div>
      </AnimatePresence>
    </div>;
};
export default AccountSettings;