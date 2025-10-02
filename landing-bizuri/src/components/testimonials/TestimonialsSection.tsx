"use client";

import Image from 'next/image';
import { Star } from 'lucide-react';
import { useTranslations } from 'next-intl';

// SVG pour étoile pleine jaune
const StarFull = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="w-5 h-5"
    viewBox="0 0 20 20"
    fill="#FACC15"
  >
    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.974a1 1 0 00.95.69h4.178c.969 0 1.371 1.24.588 1.81l-3.38 2.455a1 1 0 00-.364 1.118l1.286 3.974c.3.921-.755 1.688-1.54 1.118l-3.38-2.455a1 1 0 00-1.176 0l-3.38 2.455c-.784.57-1.838-.197-1.539-1.118l1.285-3.974a1 1 0 00-.364-1.118L2.047 9.401c-.783-.57-.38-1.81.588-1.81h4.178a1 1 0 00.95-.69l1.286-3.974z" />
  </svg>
);

export function TestimonialsSection() {
  const t = useTranslations('testimonials');
  
  const testimonials = [
    {
      name: t('items.0.name'),
      position: t('items.0.position'),
      content: t('items.0.content'),
      photo: t('items.0.photo'),
    },
    {
      name: t('items.1.name'),
      position: t('items.1.position'),
      content: t('items.1.content'),
      photo: t('items.1.photo'),
    },
    {
      name: t('items.2.name'),
      position: t('items.2.position'),
      content: t('items.2.content'),
      photo: t('items.2.photo'),
    },
    {
      name: t('items.3.name'),
      position: t('items.3.position'),
      content: t('items.3.content'),
      photo: t('items.3.photo'),
    },
    {
      name: t('items.4.name'),
      position: t('items.4.position'),
      content: t('items.4.content'),
      photo: t('items.4.photo'),
    },
  ];
  return (
    <section className="w-full bg-white py-12 md:py-16 lg:py-20 relative overflow-hidden">
      {/* Blocs de marges/tunnels gauche et droite - marges très larges sur ordinateur */}
      <div className="absolute inset-y-0 left-0 hidden lg:block w-48 xl:w-56 2xl:w-64 bg-gradient-to-r from-white via-white/95 to-transparent z-10 pointer-events-none"></div>
      <div className="absolute inset-y-0 right-0 hidden lg:block w-48 xl:w-56 2xl:w-64 bg-gradient-to-l from-white via-white/95 to-transparent z-10 pointer-events-none"></div>
      
      {/* Titre et sous-titre */}
      <div className="text-center mb-10 md:mb-12 lg:mb-16 px-4 md:px-6 lg:px-8 relative z-20">
        <div className="inline-flex items-center gap-3 bg-black/5 text-black px-6 py-3 rounded-full text-sm font-medium mb-8 border border-black/10">
          <Star className="w-5 h-5 text-[#FACC15]" />
          <span>{t('badge')}</span>
        </div>
        
        <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-black mb-6 leading-tight">
          {t('title')}{' '}
          <span className="text-[#FACC15]">
            {t('titleHighlight')}
          </span>
        </h2>
      </div>

      {/* Ligne 1 - Animation avec effet de débordement */}
      <div className="relative overflow-hidden mb-6 md:mb-8">
        {/* Extension gauche pour effet tunnel - marges très larges */}
        <div className="absolute left-0 top-0 h-full hidden lg:block w-48 xl:w-56 bg-gradient-to-r from-white to-transparent z-10 pointer-events-none"></div>
        {/* Extension droite pour effet tunnel - marges très larges */}
        <div className="absolute right-0 top-0 h-full hidden lg:block w-48 xl:w-56 bg-gradient-to-l from-white to-transparent z-10 pointer-events-none"></div>
        
        <div className="flex animate-scroll-left gap-6 lg:-ml-48 xl:-ml-56">
          {[...Array(3)].flatMap((_, groupIndex) => 
            testimonials.map((t, idx) => (
              <div
                key={`top-${groupIndex}-${idx}`}
                className="relative bg-black text-white rounded-xl p-6 w-[300px] h-auto min-h-[260px] flex flex-col justify-between flex-shrink-0 shadow-lg overflow-hidden transition-transform duration-300"
              >
                {/* Content */}
                <div className="relative z-10 flex flex-col h-full justify-between">
                  {/* Photo et infos */}
                  <div className="flex items-center mb-2">
                    <div className="w-12 h-12 rounded-full overflow-hidden mr-4 flex-shrink-0 bg-gray-200">
                      <Image 
                        src={t.photo} 
                        alt={t.name}
                        width={48}
                        height={48}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="text-left">
                      <h3 className="text-lg font-semibold mb-1">{t.name}</h3>
                      <span className="text-xs text-gray-300">{t.position}</span>
                    </div>
                  </div>
                  
                  {/* Citation alignée à gauche - centrée verticalement */}
                  <div className="flex-1 flex items-start">
                    <p className="text-base text-gray-200 text-left line-clamp-3 max-h-[4.5rem] overflow-hidden">&quot;{t.content}&quot;</p>
                  </div>
                  
                  {/* Étoiles alignées à gauche */}
                  <div className="flex mt-3 items-center">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <StarFull key={i} />
                    ))}
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      {/* Ligne 2 - Animation inverse avec effet de débordement */}
      <div className="relative overflow-hidden">
        {/* Extension gauche pour effet tunnel - marges très larges */}
        <div className="absolute left-0 top-0 h-full hidden lg:block w-48 xl:w-56 bg-gradient-to-r from-white to-transparent z-10 pointer-events-none"></div>
        {/* Extension droite pour effet tunnel - marges très larges */}
        <div className="absolute right-0 top-0 h-full hidden lg:block w-48 xl:w-56 bg-gradient-to-l from-white to-transparent z-10 pointer-events-none"></div>
        
        <div className="flex animate-scroll-right gap-6 lg:-mr-48 xl:-mr-56">
          {[...Array(3)].flatMap((_, groupIndex) => 
            testimonials.map((t, idx) => (
              <div
                key={`bottom-${groupIndex}-${idx}`}
                className="relative bg-black text-white rounded-xl p-6 w-[300px] h-auto min-h-[260px] flex flex-col justify-between flex-shrink-0 shadow-lg overflow-hidden transition-transform duration-300"
              >
                {/* Content */}
                <div className="relative z-10 flex flex-col h-full justify-between">
                  {/* Photo et infos */}
                  <div className="flex items-center mb-2">
                    <div className="w-12 h-12 rounded-full overflow-hidden mr-4 flex-shrink-0 bg-gray-200">
                      <Image 
                        src={t.photo} 
                        alt={t.name}
                        width={48}
                        height={48}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="text-left">
                      <h3 className="text-lg font-semibold mb-1">{t.name}</h3>
                      <span className="text-xs text-gray-300">{t.position}</span>
                    </div>
                  </div>
                  
                  {/* Citation alignée à gauche - centrée verticalement */}
                  <div className="flex-1 flex items-start">
                    <p className="text-base text-gray-200 text-left line-clamp-3 max-h-[4.5rem] overflow-hidden">&quot;{t.content}&quot;</p>
                  </div>
                  
                  {/* Étoiles alignées à gauche */}
                  <div className="flex mt-3 items-center">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <StarFull key={i} />
                    ))}
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      {/* Animation scroll */}
      <style jsx>{`
        @keyframes scroll-left {
          0% { transform: translateX(0); }
          100% { transform: translateX(-33.33%); }
        }
        @keyframes scroll-right {
          0% { transform: translateX(-33.33%); }
          100% { transform: translateX(0); }
        }
        .animate-scroll-left {
          display: flex;
          animation: scroll-left 45s linear infinite;
        }
        .animate-scroll-right {
          display: flex;
          animation: scroll-right 45s linear infinite;
        }
      `}</style>
    </section>
  );
}
