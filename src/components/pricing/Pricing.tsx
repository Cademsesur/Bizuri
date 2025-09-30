"use client";

import React, { useState, useCallback } from 'react';
import { Check, Zap, Users, Crown } from 'lucide-react';
import confetti from "canvas-confetti";
import { useTranslations } from 'next-intl';

const Pricing = () => {
  const [isAnnual, setIsAnnual] = useState(false);
  const t = useTranslations('pricing');

  const plans = [
    {
      name: t('plans.freemium.name'),
      monthlyPrice: t('plans.freemium.monthlyPrice'),
      annualPrice: t('plans.freemium.annualPrice'),
      description: t('plans.freemium.description'),
      icon: Zap,
      features: t.raw('plans.freemium.features'),
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
      features: t.raw('plans.premium.features'),
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
      features: t.raw('plans.vip.features'),
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
      {/* Floating Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-3 h-3 bg-[#FACC15] rounded-full opacity-60 animate-bounce"></div>
        <div className="absolute top-40 right-16 w-2 h-2 bg-white rounded-full opacity-40 animate-bounce" style={{animationDelay: '0.5s'}}></div>
        <div className="absolute bottom-32 left-20 w-1 h-1 bg-[#FACC15] rounded-full opacity-80 animate-bounce" style={{animationDelay: '1s'}}></div>
        <div className="absolute bottom-20 right-32 w-2 h-2 bg-white rounded-full opacity-50 animate-bounce" style={{animationDelay: '1.5s'}}></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8 relative z-10">
        {/* Header Section */}
        <div className="text-center mb-12 md:mb-16 lg:mb-20">
          <div className="inline-flex items-center gap-3 bg-white/10 text-white px-6 py-3 rounded-full text-sm font-medium mb-8 border border-white/20">
            <Crown className="w-5 h-5 text-[#FACC15]" />
            <span>{t('badge')}</span>
          </div>
          
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-white mb-6 leading-tight">
            {t('title')} <span className="text-[#FACC15]">{t('titleHighlight')}</span>
          </h1>
          <p className="text-lg md:text-xl text-white/80 max-w-4xl mx-auto leading-relaxed font-medium mb-8">
            {t('subtitle')}
          </p>

          {/* Switch mensuel/annuel */}
          <div className="flex items-center justify-center gap-4 mb-8">
            <span className={`font-medium transition-colors duration-300 ${!isAnnual ? 'text-white' : 'text-white/60'}`}>
              {t('billing.monthly')}
            </span>
            <button
              onClick={handleSwitchChange}
              className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-[#FACC15] focus:ring-offset-2 focus:ring-offset-gray-900 cursor-pointer ${
                isAnnual ? 'bg-[#FACC15]' : 'bg-white/20'
              }`}
            >
              <span
                className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                  isAnnual ? 'translate-x-6' : 'translate-x-1'
                }`}
              />
            </button>
            <span className={`font-medium transition-colors duration-300 ${isAnnual ? 'text-white' : 'text-white/60'}`}>
              {t('billing.yearly')}
              <span className="ml-2 text-xs bg-[#FACC15] text-black px-2 py-1 rounded-full font-bold">
                {t('billing.yearlyDiscount')}
              </span>
            </span>
          </div>
        </div>

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {plans.map((plan, index) => {
            const IconComponent = plan.icon;
            return (
              <div
                key={index}
                className={`relative rounded-2xl p-8 transition-all duration-300 hover:scale-105 ${
                  plan.isPopular 
                    ? 'bg-white border-2 border-[#FACC15] shadow-2xl shadow-[#FACC15]/20'
                    : 'bg-white/10 backdrop-blur-lg border border-white/20'
                } overflow-hidden`}
              >
                {/* Popular Badge */}
                {plan.isPopular && (
                  <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                    <div className="bg-[#FACC15] text-black px-6 py-2 rounded-full text-sm font-bold">
                      {t('billing.popularBadge')}
                    </div>
                  </div>
                )}

                <div className="relative z-10">
                  {/* Icon */}
                  <div className={`flex items-center justify-center w-16 h-16 rounded-xl mb-6 ${
                    plan.isPopular ? 'bg-black' : 'bg-[#FACC15]'
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
                  <p className={`mb-6 ${
                    plan.isPopular ? 'text-black/80' : 'text-white/80'
                  }`}>
                    {plan.description}
                  </p>

                  {/* Price */}
                  <div className="mb-8">
                    <div className="flex items-baseline">
                      <span className={`text-5xl md:text-6xl font-black ${
                        plan.isPopular ? 'text-black' : 'text-white'
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

                  {/* CTA Button */}
                  <button className={`w-full py-4 rounded-xl text-lg font-bold transition-all duration-300 hover:scale-105 transform cursor-pointer ${plan.buttonStyle}`}>
                    {plan.buttonText}
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
