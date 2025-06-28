import React, { useEffect, useState, createContext, useContext } from 'react';
import { translations } from '../locales';
type Language = 'en' | 'ar';
type Direction = 'ltr' | 'rtl';
interface LanguageContextType {
  language: Language;
  direction: Direction;
  t: (key: string, options?: {
    defaultValue?: string;
  }) => string;
  changeLanguage: (lang: Language) => void;
}
const LanguageContext = createContext<LanguageContextType | undefined>(undefined);
export const LanguageProvider: React.FC<{
  children: React.ReactNode;
}> = ({
  children
}) => {
  const [language, setLanguage] = useState<Language>('en');
  const direction: Direction = language === 'ar' ? 'rtl' : 'ltr';
  const changeLanguage = (lang: Language) => {
    setLanguage(lang);
    document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';
    document.documentElement.lang = lang;
  };
  const t = (key: string, options?: {
    defaultValue?: string;
  }): string => {
    const keys = key.split('.');
    let value: any = translations[language];
    // Handle empty or undefined key
    if (!key) return options?.defaultValue || '';
    for (const k of keys) {
      if (value && value[k] !== undefined) {
        value = value[k];
      } else {
        // Key not found, return default value or key
        console.warn(`Translation key not found: ${key}`);
        return options?.defaultValue || key;
      }
    }
    return typeof value === 'string' ? value : options?.defaultValue || key;
  };
  useEffect(() => {
    document.documentElement.dir = direction;
    document.documentElement.lang = language;
  }, [direction, language]);
  return <LanguageContext.Provider value={{
    language,
    direction,
    t,
    changeLanguage
  }}>
      {children}
    </LanguageContext.Provider>;
};
export const useLanguage = (): LanguageContextType => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};