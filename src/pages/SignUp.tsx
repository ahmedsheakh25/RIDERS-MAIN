import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useAuth } from '../context/AuthContext';
import { useLanguage } from '../context/LanguageContext';
import Button from '../components/ui/Button';
import Input from '../components/ui/Input';
import FadeIn from '../components/transitions/FadeIn';
import { AtSignIcon, BuildingIcon, UserIcon, LockIcon, PhoneIcon, BriefcaseIcon, CheckIcon } from 'lucide-react';
const SignUp: React.FC = () => {
  const {
    t,
    direction
  } = useLanguage();
  const {
    signup
  } = useAuth();
  const navigate = useNavigate();
  // Form state
  const [accountType, setAccountType] = useState<'personal' | 'business'>('personal');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [businessName, setBusinessName] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [termsAccepted, setTermsAccepted] = useState(false);
  // Validation
  const validate = (): boolean => {
    const newErrors: Record<string, string> = {};
    if (!email) newErrors.email = t('signup.emailRequired');else if (!/\S+@\S+\.\S+/.test(email)) newErrors.email = t('signup.invalidEmail');
    if (!password) newErrors.password = t('signup.passwordRequired');else if (password.length < 6) newErrors.password = t('signup.passwordTooShort');
    if (!confirmPassword) newErrors.confirmPassword = t('signup.confirmPasswordRequired');else if (confirmPassword !== password) newErrors.confirmPassword = t('signup.passwordsDoNotMatch');
    if (!name) newErrors.name = t('signup.nameRequired');
    if (accountType === 'business' && !businessName) newErrors.businessName = t('signup.businessNameRequired');
    if (!termsAccepted) newErrors.terms = t('signup.termsRequired');
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormSubmitted(true);
    if (!validate()) return;
    setIsLoading(true);
    try {
      // Here we'd normally call the actual signup API
      const success = await signup(email, password, name, accountType, businessName);
      if (success) {
        navigate('/dashboard');
      }
    } catch (err) {
      setErrors({
        form: t('signup.errorOccurred')
      });
    } finally {
      setIsLoading(false);
    }
  };
  // Handle social auth
  const handleSocialAuth = async (provider: string) => {
    setIsLoading(true);
    try {
      // This would connect to the actual social auth provider
      const success = await signup('', '', '', accountType, businessName, provider);
      if (success) {
        navigate('/dashboard');
      }
    } catch (err) {
      setErrors({
        form: t('signup.socialAuthFailed')
      });
    } finally {
      setIsLoading(false);
    }
  };
  return <div className="w-full max-w-2xl mx-auto my-10 px-4 sm:px-6">
      <motion.div className="p-6 md:p-10 bg-white rounded-xl shadow-lg" initial={{
      opacity: 0,
      y: 20
    }} animate={{
      opacity: 1,
      y: 0
    }} transition={{
      duration: 0.4
    }}>
        <FadeIn delay={0.1}>
          <h1 className="text-2xl md:text-3xl font-bold text-congress-blue-700 mb-2 text-center">
            {t('signup.createAccount')}
          </h1>
          <p className="text-gray-600 text-center mb-8">
            {t('signup.joinCommunity')}
          </p>
        </FadeIn>
        {/* Account Type Selection */}
        <FadeIn delay={0.2}>
          <div className="flex justify-center mb-8">
            <div className="bg-gray-100 p-1.5 rounded-xl inline-flex shadow-sm">
              <button onClick={() => setAccountType('personal')} className={`flex items-center px-5 py-2.5 rounded-lg transition-all duration-200 ${accountType === 'personal' ? 'bg-white text-congress-blue-700 shadow-sm font-medium' : 'text-gray-600 hover:bg-gray-200'}`}>
                <UserIcon className={`w-4 h-4 ${direction === 'rtl' ? 'ml-2' : 'mr-2'}`} />
                {t('signup.personal')}
              </button>
              <button onClick={() => setAccountType('business')} className={`flex items-center px-5 py-2.5 rounded-lg transition-all duration-200 ${accountType === 'business' ? 'bg-white text-congress-blue-700 shadow-sm font-medium' : 'text-gray-600 hover:bg-gray-200'}`}>
                <BuildingIcon className={`w-4 h-4 ${direction === 'rtl' ? 'ml-2' : 'mr-2'}`} />
                {t('signup.business')}
              </button>
            </div>
          </div>
        </FadeIn>
        {/* Social Auth Buttons */}
        <FadeIn delay={0.3}>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-8">
            <motion.button onClick={() => handleSocialAuth('google')} disabled={isLoading} className="flex items-center justify-center py-2.5 px-4 rounded-lg border border-gray-300 bg-white text-gray-700 hover:bg-gray-50 transition-colors shadow-sm font-medium" whileHover={{
            scale: 1.02
          }} whileTap={{
            scale: 0.98
          }}>
              <img src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg" alt="Google" className="w-5 h-5 mr-3" />
              Google
            </motion.button>
            <motion.button onClick={() => handleSocialAuth('facebook')} disabled={isLoading} className="flex items-center justify-center py-2.5 px-4 rounded-lg bg-[#1877F2] text-white hover:bg-[#0e6edf] transition-colors shadow-sm font-medium" whileHover={{
            scale: 1.02
          }} whileTap={{
            scale: 0.98
          }}>
              <img src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/facebook.svg" alt="Facebook" className="w-5 h-5 mr-3" />
              Facebook
            </motion.button>
            <motion.button onClick={() => handleSocialAuth('apple')} disabled={isLoading} className="flex items-center justify-center py-2.5 px-4 rounded-lg bg-black text-white hover:bg-gray-800 transition-colors shadow-sm font-medium" whileHover={{
            scale: 1.02
          }} whileTap={{
            scale: 0.98
          }}>
              <svg className="w-5 h-5 mr-3" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12.152 6.896c-.948 0-2.415-1.078-3.96-1.04-2.04.027-3.91 1.183-4.961 3.014-2.117 3.675-.546 9.103 1.519 12.09 1.013 1.454 2.208 3.09 3.792 3.039 1.52-.065 2.09-.987 3.935-.987 1.831 0 2.35.987 3.96.948 1.637-.026 2.676-1.48 3.676-2.948 1.156-1.688 1.636-3.325 1.662-3.415-.039-.013-3.182-1.221-3.22-4.857-.026-3.04 2.48-4.494 2.597-4.559-1.429-2.09-3.623-2.324-4.39-2.376-2-.156-3.675 1.09-4.61 1.09zM15.53 3.83c.843-1.012 1.4-2.427 1.245-3.83-1.207.052-2.662.805-3.532 1.818-.78.896-1.454 2.338-1.273 3.714 1.338.104 2.715-.688 3.559-1.701z" />
              </svg>
              Apple
            </motion.button>
          </div>
        </FadeIn>
        {/* Divider */}
        <FadeIn delay={0.3}>
          <div className="relative flex items-center justify-center mb-8">
            <div className="border-t border-gray-300 w-full"></div>
            <div className="bg-white px-4 py-1 text-sm text-gray-500 absolute">
              {t('signup.orWithEmail')}
            </div>
          </div>
        </FadeIn>
        {/* Error message */}
        {errors.form && <motion.div className="mb-6 p-4 bg-red-50 text-red-700 rounded-lg text-sm border border-red-200" initial={{
        opacity: 0,
        height: 0
      }} animate={{
        opacity: 1,
        height: 'auto'
      }} exit={{
        opacity: 0,
        height: 0
      }}>
            {errors.form}
          </motion.div>}
        {/* Sign up form */}
        <form onSubmit={handleSubmit} className={direction === 'rtl' ? 'text-right' : 'text-left'}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <FadeIn delay={0.4}>
              <div className="relative">
                <div className="absolute top-[2.7rem] left-3.5 text-gray-400">
                  <UserIcon className="w-5 h-5" />
                </div>
                <Input label={t('signup.name')} name="name" type="text" value={name} onChange={e => setName(e.target.value)} placeholder={t('signup.namePlaceholder')} required error={formSubmitted ? errors.name : undefined} className="pl-10" />
              </div>
            </FadeIn>
            <FadeIn delay={0.4}>
              <div className="relative">
                <div className="absolute top-[2.7rem] left-3.5 text-gray-400">
                  <PhoneIcon className="w-5 h-5" />
                </div>
                <Input label={t('signup.phone')} name="phone" type="tel" value={phone} onChange={e => setPhone(e.target.value)} placeholder={t('signup.phonePlaceholder')} error={formSubmitted ? errors.phone : undefined} className="pl-10" />
              </div>
            </FadeIn>
          </div>
          {accountType === 'business' && <FadeIn delay={0.5}>
              <div className="relative mt-6">
                <div className="absolute top-[2.7rem] left-3.5 text-gray-400">
                  <BriefcaseIcon className="w-5 h-5" />
                </div>
                <Input label={t('signup.businessName')} name="businessName" type="text" value={businessName} onChange={e => setBusinessName(e.target.value)} placeholder={t('signup.businessNamePlaceholder')} required error={formSubmitted ? errors.businessName : undefined} className="pl-10" />
              </div>
            </FadeIn>}
          <FadeIn delay={0.6}>
            <div className="relative mt-6">
              <div className="absolute top-[2.7rem] left-3.5 text-gray-400">
                <AtSignIcon className="w-5 h-5" />
              </div>
              <Input label={t('signup.email')} name="email" type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder={t('signup.emailPlaceholder')} required error={formSubmitted ? errors.email : undefined} className="pl-10" />
            </div>
          </FadeIn>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
            <FadeIn delay={0.7}>
              <div className="relative">
                <div className="absolute top-[2.7rem] left-3.5 text-gray-400">
                  <LockIcon className="w-5 h-5" />
                </div>
                <Input label={t('signup.password')} name="password" type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder={t('signup.passwordPlaceholder')} required error={formSubmitted ? errors.password : undefined} className="pl-10" />
              </div>
            </FadeIn>
            <FadeIn delay={0.7}>
              <div className="relative">
                <div className="absolute top-[2.7rem] left-3.5 text-gray-400">
                  <LockIcon className="w-5 h-5" />
                </div>
                <Input label={t('signup.confirmPassword')} name="confirmPassword" type="password" value={confirmPassword} onChange={e => setConfirmPassword(e.target.value)} placeholder={t('signup.confirmPasswordPlaceholder')} required error={formSubmitted ? errors.confirmPassword : undefined} className="pl-10" />
              </div>
            </FadeIn>
          </div>
          <FadeIn delay={0.8}>
            <div className="mt-8">
              <label className="flex items-start cursor-pointer">
                <div className="relative flex items-start">
                  <div className="flex items-center h-5">
                    <input type="checkbox" id="terms" checked={termsAccepted} onChange={() => setTermsAccepted(!termsAccepted)} className="sr-only" />
                    <div className={`w-5 h-5 rounded border flex items-center justify-center transition-colors ${termsAccepted ? 'bg-congress-blue-600 border-congress-blue-600' : 'border-gray-300 bg-white'}`}>
                      {termsAccepted && <CheckIcon className="w-3.5 h-3.5 text-white" />}
                    </div>
                  </div>
                </div>
                <span className="ml-3 text-sm text-gray-600">
                  {t('signup.agreeToTerms')}{' '}
                  <a href="#" className="text-congress-blue-600 hover:underline font-medium">
                    {t('signup.termsOfService')}
                  </a>{' '}
                  {t('signup.and')}{' '}
                  <a href="#" className="text-congress-blue-600 hover:underline font-medium">
                    {t('signup.privacyPolicy')}
                  </a>
                </span>
              </label>
              {formSubmitted && errors.terms && <p className="mt-1.5 text-xs text-red-500">{errors.terms}</p>}
            </div>
          </FadeIn>
          <FadeIn delay={0.9}>
            <motion.button type="submit" disabled={isLoading} className="w-full mt-8 bg-congress-blue-600 text-white py-3 px-4 rounded-lg font-medium hover:bg-congress-blue-700 transition-colors shadow-sm flex items-center justify-center" whileHover={{
            scale: 1.02
          }} whileTap={{
            scale: 0.98
          }}>
              {isLoading ? <>
                  <span className="loading-dots inline-flex mr-2">
                    <span className="w-2 h-2 bg-white rounded-full mx-0.5 animate-pulse"></span>
                    <span className="w-2 h-2 bg-white rounded-full mx-0.5 animate-pulse" style={{
                  animationDelay: '0.2s'
                }}></span>
                    <span className="w-2 h-2 bg-white rounded-full mx-0.5 animate-pulse" style={{
                  animationDelay: '0.4s'
                }}></span>
                  </span>
                  {t('signup.creating')}
                </> : t('signup.createAccount')}
            </motion.button>
          </FadeIn>
          <FadeIn delay={1.0}>
            <p className="mt-8 text-center text-sm text-gray-600">
              {t('signup.alreadyHaveAccount')}{' '}
              <Link to="/signin" className="text-congress-blue-600 hover:underline font-medium">
                {t('signup.signIn')}
              </Link>
            </p>
          </FadeIn>
        </form>
      </motion.div>
    </div>;
};
export default SignUp;