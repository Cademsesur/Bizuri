"use client";

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

// Import des traductions
import frMessages from '../../messages/fr.json';
import enMessages from '../../messages/en.json';

type Locale = 'fr' | 'en';
type Messages = typeof frMessages;

interface LanguageContextType {
  locale: Locale;
  setLocale: (locale: Locale) => void;
  t: (key: string) => string;
  messages: Messages;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

const messages = {
  fr: frMessages,
  en: enMessages,
};

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [locale, setLocale] = useState<Locale>('fr');

  // Charger la langue depuis localStorage au montage
  useEffect(() => {
    const savedLocale = localStorage.getItem('locale') as Locale;
    if (savedLocale && (savedLocale === 'fr' || savedLocale === 'en')) {
      setLocale(savedLocale);
    }
  }, []);

  // Sauvegarder la langue dans localStorage
  const changeLocale = (newLocale: Locale) => {
    setLocale(newLocale);
    localStorage.setItem('locale', newLocale);
  };

  // Fonction de traduction simple
  const t = (key: string): string => {
    const keys = key.split('.');
    let value: unknown = messages[locale];
    
    for (const k of keys) {
      value = (value as Record<string, unknown>)?.[k];
    }
    
    return typeof value === 'string' ? value : key;
  };

  return (
    <LanguageContext.Provider 
      value={{ 
        locale, 
        setLocale: changeLocale, 
        t, 
        messages: messages[locale] 
      }}
    >
      {children}
    </LanguageContext.Provider>
  );
}

export function useTranslation() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useTranslation must be used within a LanguageProvider');
  }
  return context;
}
