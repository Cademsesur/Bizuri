"use client";

import { useState, useEffect, useMemo } from "react";
import { Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useTranslations } from 'next-intl';
import LanguageSelector from "@/components/ui/LanguageSelector";

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('');
  const t = useTranslations('navigation');

  const navItems = useMemo(() => [
    { name: t('features'), href: "#features", id: "features" },
    { name: t('howItWorks'), href: "#how-it-works", id: "how-it-works" },
    { name: t('pricing'), href: "#pricing", id: "pricing" },
    { name: t('faq'), href: "#faq", id: "faq" },
    { name: t('contact'), href: "#contact", id: "contact" },
  ], [t]);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      setIsScrolled(scrollPosition > 10);
      
      // Détection de la section active
      const sections = navItems.map(item => item.id);
      const sectionElements = sections.map(id => document.getElementById(id));
      
      let currentActiveSection = '';
      
      sectionElements.forEach((section, index) => {
        if (section) {
          const rect = section.getBoundingClientRect();
          const offset = 100; // Offset pour le header fixe
          
          if (rect.top <= offset && rect.bottom >= offset) {
            currentActiveSection = sections[index];
          }
        }
      });
      
      setActiveSection(currentActiveSection);
    };

    window.addEventListener("scroll", handleScroll);
    // Appeler une fois au montage pour définir l'état initial
    handleScroll();
    
    return () => window.removeEventListener("scroll", handleScroll);
  }, [navItems]);

  return (
    <motion.header
      initial={{ backgroundColor: "rgba(255, 255, 255, 0)" }}
      animate={{
        backgroundColor: isScrolled || isOpen
          ? "rgba(255, 255, 255, 0.15)" 
          : "rgba(255, 255, 255, 0)",
        backdropFilter: isScrolled || isOpen ? "blur(20px)" : "blur(0px)",
        borderBottom: isScrolled || isOpen
          ? "1px solid rgba(255, 255, 255, 0.2)" 
          : "1px solid transparent"
      }}
      transition={{ duration: 0.15, ease: [0.4, 0.0, 0.2, 1] }}
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-150 ${
        isScrolled || isOpen ? "shadow-lg" : ""
      }`}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-5">
        {/* Logo */}
        <motion.div 
          className={`text-2xl font-bold transition-colors duration-300 ${
            isScrolled ? "text-black" : "text-black"
          }`}
          whileHover={{ scale: 1.05 }}
          transition={{ type: "spring", stiffness: 400, damping: 17 }}
        >
          Bizuri
        </motion.div>

        {/* Desktop nav */}
        <nav className="hidden lg:flex gap-8">
          {navItems.map((item, index) => {
            const isActive = activeSection === item.id;
            return (
              <motion.a
                key={item.name}
                href={item.href}
                className={`font-medium transition-colors duration-150 cursor-pointer ${
                  isActive 
                    ? "text-[#FACC15]" 
                    : isScrolled 
                      ? "text-black hover:text-[#FACC15]" 
                      : "text-black hover:text-white"
                }`}
                whileHover={{ y: -2 }}
                transition={{ type: "spring", stiffness: 400, damping: 17 }}
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                {item.name}
              </motion.a>
            );
          })}
        </nav>

        {/* Desktop CTA */}
        <div className="hidden lg:flex items-center gap-4">
          <LanguageSelector />
          <motion.a
            href="#pricing"
            className="px-6 py-3 rounded-full font-bold transition-all duration-150 cursor-pointer bg-[#FACC15] text-black hover:bg-[#F59E0B]"
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.95 }}
            transition={{ type: "spring", stiffness: 400, damping: 17 }}
          >
            {t('seePackages')}
          </motion.a>
        </div>

        {/* Mobile & Tablet menu button */}
        <motion.button
          className="lg:hidden transition-colors duration-150 cursor-pointer text-black"
          onClick={() => setIsOpen(!isOpen)}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={isOpen ? "close" : "open"}
              initial={{ rotate: -90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: 90, opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </motion.div>
          </AnimatePresence>
        </motion.button>
      </div>

      {/* Mobile & Tablet menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.nav
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: [0.4, 0.0, 0.2, 1] }}
            className="lg:hidden px-6 pb-6 border-t transition-all duration-150 bg-white/25 backdrop-blur-xl border-white/30 shadow-lg"
          >
            {navItems.map((item, index) => {
              const isActive = activeSection === item.id;
              return (
                <motion.a
                  key={item.name}
                  href={item.href}
                  className={`block py-3 font-medium transition-colors duration-150 cursor-pointer ${
                    isActive 
                      ? "text-[#FACC15]" 
                      : "text-black hover:text-[#FACC15]"
                  }`}
                  onClick={() => setIsOpen(false)}
                  initial={{ x: -20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: index * 0.05 }}
                  whileHover={{ x: 4 }}
                >
                  {item.name}
                </motion.a>
              );
            })}
            
            <div className="mt-4">
              <LanguageSelector />
            </div>
            
            <motion.a
              href="#pricing"
              className="block mt-4 px-6 py-3 rounded-full text-center font-bold transition-all duration-150 cursor-pointer bg-[#FACC15] text-black hover:bg-[#F59E0B]"
              onClick={() => setIsOpen(false)}
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: navItems.length * 0.05 + 0.1 }}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              {t('seePackages')}
            </motion.a>
          </motion.nav>
        )}
      </AnimatePresence>
    </motion.header>
  );
}