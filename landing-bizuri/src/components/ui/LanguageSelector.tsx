"use client";

import { Globe } from 'lucide-react';
import { useState } from 'react';
import { useLocale } from 'next-intl';
import { useRouter, usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';

export default function LanguageSelector() {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  const languages = [
    { code: 'fr' as const, name: 'Français', flag: '🇫🇷' },
    { code: 'en' as const, name: 'English', flag: '🇺🇸' }
  ];

  const currentLanguage = languages.find(lang => lang.code === locale);

  const handleLanguageChange = (newLocale: 'fr' | 'en') => {
    const pathWithoutLocale = pathname.replace(`/${locale}`, '');
    const newPath = `/${newLocale}${pathWithoutLocale}`;
    router.push(newPath);
    setIsOpen(false);
  };

  return (
    <div className="relative">
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-white/10 transition-colors duration-200 text-black"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <Globe className="w-4 h-4" />
        <span className="text-sm font-medium">
          {currentLanguage?.flag} {currentLanguage?.code.toUpperCase()}
        </span>
      </motion.button>

      <AnimatePresence>
        {isOpen && (
          <>
            {/* Overlay */}
            <div 
              className="fixed inset-0 z-40" 
              onClick={() => setIsOpen(false)}
            />
            
            {/* Dropdown */}
            <motion.div 
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
              className="absolute top-full right-0 mt-2 py-2 w-40 bg-white rounded-lg shadow-lg border border-gray-200 z-50"
            >
              {languages.map((language) => (
                <motion.button
                  key={language.code}
                  onClick={() => handleLanguageChange(language.code)}
                  className={`w-full px-4 py-2 text-left hover:bg-gray-50 transition-colors duration-200 flex items-center gap-3 ${
                    locale === language.code ? 'bg-gray-50 text-[#FACC15]' : 'text-gray-700'
                  }`}
                  whileHover={{ backgroundColor: 'rgba(249, 250, 251, 1)' }}
                >
                  <span className="text-base">{language.flag}</span>
                  <span className="text-sm font-medium">{language.name}</span>
                  {locale === language.code && (
                    <motion.div
                      layoutId="activeLanguage"
                      className="w-2 h-2 bg-[#FACC15] rounded-full ml-auto"
                    />
                  )}
                </motion.button>
              ))}
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
