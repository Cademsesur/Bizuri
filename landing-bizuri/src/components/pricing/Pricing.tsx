"use client";

import React, { useState, useCallback } from 'react';
import { Check, Zap, Users, Crown } from 'lucide-react';
import confetti from "canvas-confetti";
import { useTranslations } from 'next-intl';

const Pricing = () => {
  const [isAnnual, setIsAnnual] = useState(false);
  const t = useTranslations('pricing');

  // Helper function to convert features object to array
  const getFeaturesArray = (featuresObj: unknown): string[] => {
    if (Array.isArray(featuresObj)) {
      return featuresObj;
    }
    if (typeof featuresObj === 'object' && featuresObj !== null) {
      return Object.values(featuresObj);
    }
    return [];
  };

  const plans = [
    {
      name: t('plans.freemium.name'),
      monthlyPrice: t('plans.freemium.monthlyPrice'),
      annualPrice: t('plans.freemium.annualPrice'),
      description: t('plans.freemium.description'),
      icon: Zap,
      features: getFeaturesArray(t.raw('plans.freemium.features')),
      isPopular: false,
      buttonText: t('plans.freemium.cta'),
      buttonStyle: "bg-black text-white hover:bg-black/90"
    },
    {
      name: t('plans.premium.name'),
      monthlyPrice: t('plans.premium.monthlyPrice'),
      annualPrice: t('plans.premium.annualPrice'),
      description: t('plans.premium.description'),
      icon: Users,
      features: getFeaturesArray(t.raw('plans.premium.features')),
      isPopular: true,
      buttonText: t('plans.premium.cta'),
      buttonStyle: "bg-[#FACC15] text-black hover:bg-[#FACC15]/90"
    },
    {
      name: t('plans.vip.name'),
      monthlyPrice: t('plans.vip.monthlyPrice'),
      annualPrice: t('plans.vip.annualPrice'),
      description: t('plans.vip.description'),
      icon: Crown,
      features: getFeaturesArray(t.raw('plans.vip.features')),
      isPopular: false,
      buttonText: t('plans.vip.cta'),
      buttonStyle: "bg-black text-white hover:bg-black/90"
    }
  ];

  const handleSwitchChange = useCallback(() => {
    setIsAnnual(!isAnnual);
    
    // Déclencher les confettis quand on passe en mode annuel
    if (!isAnnual) {
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#FACC15', '#F59E0B', '#FBBF24']
      });
    }
  }, [isAnnual]);

  return (
    <section className="w-full py-16 md:py-20 lg:py-24 bg-black relative overflow-hidden">
      {/* Background moderne avec gradients */}
      <div className="absolute inset-0 bg-gradient-to-br from-black via-gray-900 to-black"></div>
      <div className="absolute inset-0 bg-gradient-to-t from-transparent via-[#FACC15]/5 to-transparent"></div>
      
      {/* Floating Elements modernisés */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-1 h-1 bg-[#FACC15] rounded-full opacity-60 animate-pulse"></div>
        <div className="absolute top-40 right-16 w-0.5 h-0.5 bg-white rounded-full opacity-40 animate-pulse" style={{animationDelay: '0.5s'}}></div>
        <div className="absolute bottom-32 left-20 w-2 h-2 bg-[#FACC15] rounded-full opacity-80 animate-pulse" style={{animationDelay: '1s'}}></div>
        <div className="absolute bottom-20 right-32 w-1 h-1 bg-white rounded-full opacity-50 animate-pulse" style={{animationDelay: '1.5s'}}></div>
        
        {/* Lignes géométriques subtiles */}
        <div className="absolute top-0 left-1/4 w-px h-full bg-gradient-to-b from-transparent via-white/10 to-transparent"></div>
        <div className="absolute top-0 right-1/4 w-px h-full bg-gradient-to-b from-transparent via-[#FACC15]/20 to-transparent"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8 relative z-10">
        {/* Header Section avec effet de profondeur */}
        <div className="text-center mb-12 md:mb-16 lg:mb-20 relative">
          <div className="inline-flex items-center gap-3 bg-white/5 backdrop-blur-sm text-white px-6 py-3 rounded-full text-sm font-medium mb-8 border border-white/10 hover:border-[#FACC15]/30 transition-all duration-300">
            <Crown className="w-5 h-5 text-[#FACC15]" />
            <span>{t('badge')}</span>
          </div>
          
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-white mb-6 leading-tight">
            {t('title')} <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FACC15] via-[#FCD34D] to-[#F59E0B]">{t('titleHighlight')}</span>
          </h1>
          <p className="text-lg md:text-xl text-white/70 max-w-4xl mx-auto leading-relaxed font-medium mb-8">
            {t('subtitle')}
          </p>

          {/* Switch mensuel/annuel modernisé */}
          <div className="flex items-center justify-center gap-4 mb-8">
            <span className={`font-medium transition-all duration-300 ${!isAnnual ? 'text-white scale-105' : 'text-white/50'}`}>
              {t('billing.monthly')}
            </span>
            <button
              onClick={handleSwitchChange}
              className={`relative inline-flex h-7 w-12 items-center rounded-full transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-[#FACC15] focus:ring-offset-2 focus:ring-offset-gray-900 cursor-pointer shadow-lg ${
                isAnnual ? 'bg-gradient-to-r from-[#FACC15] to-[#F59E0B]' : 'bg-white/20 backdrop-blur-sm'
              }`}
            >
              <span
                className={`inline-block h-5 w-5 transform rounded-full bg-white transition-all duration-300 shadow-md ${
                  isAnnual ? 'translate-x-6 scale-110' : 'translate-x-1'
                }`}
              />
            </button>
            <span className={`font-medium transition-all duration-300 ${isAnnual ? 'text-white scale-105' : 'text-white/50'}`}>
              {t('billing.yearly')}
              <span className="ml-2 text-xs bg-gradient-to-r from-[#FACC15] to-[#F59E0B] text-black px-3 py-1 rounded-full font-bold shadow-lg animate-pulse">
                {t('billing.yearlyDiscount')}
              </span>
            </span>
          </div>
        </div>

        {/* Pricing Cards modernisées */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-6 xl:gap-8">
          {plans.map((plan, index) => {
            const IconComponent = plan.icon;
            return (
              <div
                key={index}
                className={`relative rounded-2xl p-8 transition-all duration-500 hover:scale-105 hover:-translate-y-2 group ${
                  plan.isPopular 
                    ? 'bg-gradient-to-br from-white via-white to-gray-50 border-2 border-[#FACC15] shadow-2xl shadow-[#FACC15]/20'
                    : 'bg-gradient-to-br from-white/10 via-white/5 to-transparent backdrop-blur-xl border border-white/20 hover:border-white/30'
                } overflow-hidden`}
                style={{
                  transform: plan.isPopular ? 'scale(1.05)' : 'scale(1)',
                }}
              >
                {/* Effet de brillance au hover */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 transform translate-x-[-100%] group-hover:translate-x-[100%]"></div>
                
                {/* Popular Badge modernisé */}
                {plan.isPopular && (
                  <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                    <div className="bg-gradient-to-r from-[#FACC15] via-[#FCD34D] to-[#F59E0B] text-black px-6 py-2 rounded-full text-sm font-bold shadow-lg animate-pulse">
                      {t('billing.popularBadge')}
                    </div>
                  </div>
                )}

                <div className="relative z-10">
                  {/* Icon modernisé */}
                  <div className={`flex items-center justify-center w-16 h-16 rounded-xl mb-6 transition-all duration-300 group-hover:scale-110 ${
                    plan.isPopular 
                      ? 'bg-gradient-to-br from-black via-gray-800 to-black shadow-lg' 
                      : 'bg-gradient-to-br from-[#FACC15] via-[#FCD34D] to-[#F59E0B] shadow-lg'
                  }`}>
                    <IconComponent className={`w-8 h-8 ${
                      plan.isPopular ? 'text-[#FACC15]' : 'text-black'
                    }`} />
                  </div>

                  {/* Plan Name */}
                  <h3 className={`text-2xl md:text-3xl font-bold mb-2 ${
                    plan.isPopular ? 'text-black' : 'text-white'
                  }`}>
                    {plan.name}
                  </h3>

                  {/* Description */}
                  <p className={`mb-6 leading-relaxed ${
                    plan.isPopular ? 'text-black/70' : 'text-white/70'
                  }`}>
                    {plan.description}
                  </p>

                  {/* Price avec effet moderne */}
                  <div className="mb-8">
                    <div className="flex items-baseline">
                      <span className={`text-5xl md:text-6xl font-black transition-all duration-300 ${
                        plan.isPopular 
                          ? 'text-transparent bg-clip-text bg-gradient-to-r from-black via-gray-800 to-black' 
                          : 'text-white'
                      }`}>
                        {isAnnual ? plan.annualPrice : plan.monthlyPrice}€
                      </span>
                      <span className={`text-xl ml-2 ${
                        plan.isPopular ? 'text-black/60' : 'text-white/60'
                      }`}>
                        {isAnnual ? t('billing.perYear') : t('billing.perMonth')}
                      </span>
                    </div>
                    {isAnnual && (
                      <div className={`text-sm ${
                        plan.isPopular ? 'text-black/70' : 'text-white/70'
                      }`}>
                        {t('billing.orPerMonth', { price: Math.round(parseInt(plan.annualPrice) / 12) })}
                      </div>
                    )}
                  </div>

                  {/* Features */}
                  <ul className="space-y-4 mb-8">
                    {plan.features.map((feature: string, featureIndex: number) => (
                      <li key={featureIndex} className="flex items-start">
                        <Check className={`w-5 h-5 mr-3 mt-0.5 flex-shrink-0 ${
                          plan.isPopular ? 'text-[#FACC15]' : 'text-[#FACC15]'
                        }`} />
                        <span className={`${
                          plan.isPopular ? 'text-black/80' : 'text-white/80'
                        }`}>
                          {feature}
                        </span>
                      </li>
                    ))}
                  </ul>

                  {/* CTA Button modernisé */}
                  <button className={`w-full py-4 rounded-xl text-lg font-bold transition-all duration-300 hover:scale-105 transform cursor-pointer relative overflow-hidden group ${
                    plan.isPopular 
                      ? 'bg-gradient-to-r from-[#FACC15] via-[#FCD34D] to-[#F59E0B] text-black hover:shadow-lg hover:shadow-[#FACC15]/30' 
                      : 'bg-gradient-to-r from-black via-gray-800 to-black text-white hover:from-gray-800 hover:to-gray-700 border border-white/20'
                  }`}>
                    <span className="relative z-10">{plan.buttonText}</span>
                    {/* Effet de brillance au hover */}
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 transform translate-x-[-100%] group-hover:translate-x-[100%]"></div>
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Pricing;
