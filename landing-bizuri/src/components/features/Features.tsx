import React from 'react';
import { MessageSquare, Users, Megaphone, ShoppingCart, Bell, BarChart3 } from 'lucide-react';
import { useTranslations } from 'next-intl';

interface FeatureItem {
  title: string;
  subtitle: string;
  icon: React.ComponentType<{ className?: string }>;
}

const Features = () => {
  const t = useTranslations('features');

  const iconMap = [MessageSquare, Users, Megaphone, ShoppingCart, Bell, BarChart3];
  
  // Récupération directe des données depuis les traductions
  const featuresData = [
    { title: t('items.0.title'), subtitle: t('items.0.subtitle') },
    { title: t('items.1.title'), subtitle: t('items.1.subtitle') },
    { title: t('items.2.title'), subtitle: t('items.2.subtitle') },
    { title: t('items.3.title'), subtitle: t('items.3.subtitle') },
    { title: t('items.4.title'), subtitle: t('items.4.subtitle') },
    { title: t('items.5.title'), subtitle: t('items.5.subtitle') },
  ];
  
  const features: FeatureItem[] = featuresData.map((item, index) => ({
    ...item,
    icon: iconMap[index]
  }));

  return (
    <section className="w-full py-16 md:py-20 lg:py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
        {/* Header Section */}
        <div className="text-center mb-12 md:mb-16 lg:mb-20">
          <div className="inline-flex items-center gap-3 bg-black/5 text-black px-6 py-3 rounded-full text-sm font-medium mb-8 border border-black/10">
            <MessageSquare className="w-5 h-5 text-[#FACC15]" />
            <span>{t('badge')}</span>
          </div>
          
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-black mb-6 leading-tight">
            {t('title')} <span className="text-[#FACC15]">{t('titleHighlight')}</span>
          </h1>
          <p className="text-lg md:text-xl text-black/80 max-w-4xl mx-auto leading-relaxed font-medium">
            {t('subtitle')}
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature: FeatureItem, index: number) => {
            const IconComponent = feature.icon;
            return (
              <div
                key={index}
                className="relative bg-black rounded-2xl p-8 hover:scale-105 transition-all duration-300 border border-white/10 overflow-hidden"
              >
                {/* Floating Elements */}
                <div className="absolute inset-0 overflow-hidden pointer-events-none">
                  <div className="absolute top-4 right-4 w-2 h-2 bg-white rounded-full opacity-40 animate-bounce" style={{animationDelay: `${index * 0.3}s`}}></div>
                  <div className="absolute bottom-6 left-6 w-1 h-1 bg-white rounded-full opacity-60 animate-bounce" style={{animationDelay: `${index * 0.5}s`}}></div>
                </div>

                <div className="relative z-10">
                  <div className="flex items-center justify-center w-16 h-16 bg-[#FACC15] rounded-xl mb-6">
                    <IconComponent className="w-8 h-8 text-black" />
                  </div>
                  
                  <h3 className="text-xl md:text-2xl font-bold text-white mb-4">
                    {feature.title}
                  </h3>
                  
                  <p className="text-white/80 leading-relaxed">
                    {feature.subtitle}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Call to Action */}
        <div className="text-center mt-16">
          <a href="#pricing" className="bg-black text-white hover:bg-black/90 transition-all duration-300 rounded-full px-8 md:px-12 py-3 md:py-4 text-lg md:text-xl font-bold hover:scale-105 transform cursor-pointer inline-block">
            {t('cta')}
          </a>
        </div>
      </div>
    </section>
  );
};

export default Features;