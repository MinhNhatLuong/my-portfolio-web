"use client";

import React, { createContext, useContext, useState, useEffect } from 'react';
import { dictionaries } from '@/constants/translations';

// Supported languages type definition
type Language = 'en' | 'vi' | 'ja';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  t: any; // Helper to access translation keys dynamically
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

/**
 * Language Provider Component
 * Manages the application's language state and persistence in LocalStorage.
 */
export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguageState] = useState<Language>('en');
  const [isMounted, setIsMounted] = useState(false);

  // Load saved language from LocalStorage on mount
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsMounted(true);
      
      const saved = localStorage.getItem('app-lang') as Language;
      if (saved && (saved === 'vi' || saved === 'ja')) {
        setLanguageState(saved);
      }
    }, 0);

    return () => clearTimeout(timer);
  }, []);

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    if (typeof window !== 'undefined') {
      localStorage.setItem('app-lang', lang);
    }
  };

  // Helper to get dictionary based on current language
  // Note: In a larger app, this might be a more complex function
  const t = dictionaries[language];

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {/* Prevent hydration mismatch by hiding content until mounted */}
      <div style={{ visibility: isMounted ? 'visible' : 'hidden' }}>
        {children}
      </div>
    </LanguageContext.Provider>
  );
}

/**
 * Custom hook to use the Language Context
 */
export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) throw new Error('useLanguage must be used within a LanguageProvider');
  return context;
};