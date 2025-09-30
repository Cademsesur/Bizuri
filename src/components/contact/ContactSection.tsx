'use client';

import React from 'react';
import { Star, Crown } from 'lucide-react';
import Image from 'next/image';
import { useTranslations } from 'next-intl';

const ContactSection = () => {
  const t = useTranslations('contact');
  
  const avatars = [
    '/avatar.png',
    '/avatar2.png', 
    '/avatar3.png',
    '/avatar4.png',
    '/avatar5.png',
    '/avatar6.png'
  ];

  return (
    <section className="w-full py-16 md:py-20 lg:py-24 bg-white relative overflow-hidden">
      <div className="max-w-4xl mx-auto px-4 md:px-6 lg:px-8 relative z-10">
        <div className="text-center p-6 md:p-8 lg:p-10 bg-black rounded-2xl md:rounded-3xl border border-black/10 shadow-2xl">
          
          {/* Rating avec 5 étoiles */}
          <div className="flex items-center justify-center gap-1 mb-4">
            {[1, 2, 3, 4, 5].map((star) => (
              <Star 
                key={star} 
                className={`w-5 h-5 ${star <= 4 ? 'fill-[#FACC15] text-[#FACC15]' : star === 5 ? 'fill-[#FACC15]/50 text-[#FACC15]' : 'text-gray-300'}`} 
              />
            ))}
            <span className="ml-2 text-white/80 font-semibold">4,5/5</span>
          </div>

          {/* Cercles d'avatars */}
          <div className="flex items-center justify-center mb-8">
            <div className="flex -space-x-3">
              {avatars.map((avatar, index) => (
                <div 
                  key={index}
                  className="w-12 h-12 rounded-full border-3 border-white bg-white/10 overflow-hidden shadow-lg"
                >
                  <Image
                    src={avatar}
                    alt={`Avatar ${index + 1}`}
                    width={48}
                    height={48}
                    className="w-full h-full object-cover"
                  />
                </div>
              ))}
              
              {/* Cercle 100+ */}
              <div className="w-12 h-12 rounded-full border-3 border-white bg-[#FACC15] flex items-center justify-center shadow-lg">
                <span className="text-black font-bold text-xs">100+</span>
              </div>
            </div>
          </div>

          <div className="inline-flex items-center gap-3 bg-white/10 text-white px-6 py-3 rounded-full text-sm font-medium mb-8 border border-white/20">
            <Crown className="w-5 h-5 text-[#FACC15]" />
            <span>{t('badge')}</span>
          </div>
          
          {/* Titre d'appel à l'action */}
          <h3 className="text-3xl md:text-4xl lg:text-5xl font-black text-white mb-4 leading-tight">
            {t('title')}{' '}
            <span className="text-[#FACC15]">
              {t('titleHighlight')}
            </span>
          </h3>
          
          {/* Sous-titre d'appel à l'action */}
          <p className="text-lg md:text-xl text-white/70 mb-8 max-w-2xl mx-auto leading-relaxed">
            {t('subtitle')}
          </p>
          
          {/* Bouton principal */}
          <a href="#pricing" className="bg-[#FACC15] text-black hover:bg-[#F59E0B] transition-all duration-300 rounded-full px-8 md:px-10 lg:px-12 py-3 md:py-4 lg:py-5 text-base md:text-lg lg:text-xl font-bold hover:scale-105 transform cursor-pointer inline-block">
            {t('cta')}
          </a>
          
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
