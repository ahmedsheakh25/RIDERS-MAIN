import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { motion } from 'framer-motion';
import Button from '../components/ui/Button';
import Input from '../components/ui/Input';
import { useLanguage } from '../context/LanguageContext';
import FadeIn from '../components/transitions/FadeIn';
const SignIn: React.FC = () => {
  const {
    t,
    direction
  } = useLanguage();
  const {
    login
  } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);
    try {
      const success = await login(email, password);
      if (success) {
        navigate('/');
      } else {
        setError(t('auth.invalidCredentials'));
      }
    } catch (err) {
      setError(t('auth.errorOccurred'));
    } finally {
      setIsLoading(false);
    }
  };
  return <div className="w-full max-w-md mx-auto mt-12">
      <motion.div className="p-6 bg-white rounded-lg shadow-md" initial={{
      opacity: 0,
      y: 20
    }} animate={{
      opacity: 1,
      y: 0
    }} transition={{
      duration: 0.4
    }}>
        <FadeIn delay={0.1}>
          <h1 className="text-2xl font-bold text-congress-blue-700 mb-6 text-center">
            {t('auth.signIn')}
          </h1>
        </FadeIn>
        {error && <motion.div className="mb-4 p-3 bg-red-50 text-red-700 rounded-md text-sm text-center" initial={{
        opacity: 0,
        height: 0
      }} animate={{
        opacity: 1,
        height: 'auto'
      }} exit={{
        opacity: 0,
        height: 0
      }}>
            {error}
          </motion.div>}
        <form onSubmit={handleSubmit} className={direction === 'rtl' ? 'text-right' : 'text-left'}>
          <FadeIn delay={0.2}>
            <Input label={t('auth.email')} name="email" type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder={t('auth.enterEmail')} required className="mb-4" />
          </FadeIn>
          <FadeIn delay={0.3}>
            <Input label={t('auth.password')} name="password" type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder={t('auth.enterPassword')} required className="mb-6" />
          </FadeIn>
          <FadeIn delay={0.4}>
            <Button type="submit" variant="primary" fullWidth disabled={isLoading} loading={isLoading} className="mb-4">
              {isLoading ? t('auth.signInProcessing') : t('auth.signIn')}
            </Button>
          </FadeIn>
        </form>
        <FadeIn delay={0.5}>
          <div className="mt-4 text-center text-sm text-gray-600">
            <p>{t('auth.demoCredentials')}</p>
            <p className="font-medium">Email: ahmed@riders.com</p>
            <p className="font-medium">Password: 123</p>
          </div>
        </FadeIn>
      </motion.div>
    </div>;
};
export default SignIn;