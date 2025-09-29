"use client";

import Image from 'next/image';
import { Star } from 'lucide-react';

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

// Exemple de témoignages avec photo
const testimonials = [
  {
    name: "Mbaki Luemba",
    position: "Propriétaire, Supermarché Central - Kinshasa",
    content:
      "Depuis Bizuri, j'envoie mes promos à 300 clients en 1 clic via WhatsApp. Mon chiffre d'affaires a augmenté de 35% en 2 mois !",
    photo: "/avatar.png",
  },
  {
    name: "Amadou Diallo",
    position: "Gérant, Boutique Mode Africaine - Dakar",
    content:
      "Configuration en 5 minutes, mes clients reçoivent tout sur Telegram automatiquement. Plus de perte de temps, plus de ventes !",
    photo: "/avatar2.png",
  },
  {
    name: "Sarah Kouame",
    position: "Directrice, Pharmacie Santé Plus - Abidjan",
    content:
      "Les relances automatiques m'ont fait récupérer 40% de clients perdus. Bizuri paie déjà son investissement au premier mois.",
    photo: "/avatar3.png",
  },
  {
    name: "Jean-Paul Makaya",
    position: "CEO, Épicerie Moderne - Brazzaville",
    content: "Interface simple, résultats immédiats. Mes campagnes atteignent 500+ clients instantanément. Indispensable !",
    photo: "/avatar4.png",
  },
  {
    name: "Fatima Ben Ali",
    position: "Fondatrice, Bazar Al-Maghrib - Casablanca",
    content: "Bizuri a automatisé toute ma communication client. Je me concentre sur mon business, les ventes suivent naturellement.",
    photo: "/avatar5.png",
  },
];

export function TestimonialsSection() {
  return (
    <section className="w-full bg-white py-12 md:py-16 lg:py-20">
      {/* Titre et sous-titre */}
      <div className="text-center mb-10 md:mb-12 lg:mb-16 px-4 md:px-6 lg:px-8">
        <div className="inline-flex items-center gap-3 bg-black/5 text-black px-6 py-3 rounded-full text-sm font-medium mb-8 border border-black/10">
          <Star className="w-5 h-5 text-[#FACC15]" />
          <span>Témoignages</span>
        </div>
        
        <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-black mb-6 leading-tight">
          +500 commerces nous{' '}
          <span className="text-[#FACC15]">
            font confiance
          </span>
        </h2>
      </div>

      {/* Ligne 1 */}
      <div className="relative overflow-hidden mb-6 md:mb-8">
        <div className="flex animate-scroll-left gap-6">
          {[...Array(3)].flatMap((_, groupIndex) => 
            testimonials.map((t, idx) => (
              <div
                key={`top-${groupIndex}-${idx}`}
                className="relative bg-black text-white rounded-xl p-6 w-[300px] h-[280px] flex flex-col justify-between flex-shrink-0 shadow-lg overflow-hidden"
              >
                {/* Content */}
                <div className="relative z-10 flex flex-col h-full justify-between">
                  {/* Photo et infos */}
                  <div className="flex items-center mb-2">
                    <Image 
                      src={t.photo} 
                      alt={t.name}
                      width={48}
                      height={48}
                      className="rounded-full object-cover mr-4"
                    />
                    <div className="text-left">
                      <h3 className="text-lg font-semibold mb-1">{t.name}</h3>
                      <span className="text-xs text-gray-300">{t.position}</span>
                    </div>
                  </div>
                  
                  {/* Citation alignée à gauche - centrée verticalement */}
                  <div className="flex-1 flex items-center">
                    <p className="text-base text-gray-200 text-left">&quot;{t.content}&quot;</p>
                  </div>
                  
                  {/* Étoiles alignées à gauche */}
                  <div className="flex mt-2">
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

      {/* Ligne 2 */}
      <div className="relative overflow-hidden">
        <div className="flex animate-scroll-right gap-6">
          {[...Array(3)].flatMap((_, groupIndex) => 
            testimonials.map((t, idx) => (
              <div
                key={`bottom-${groupIndex}-${idx}`}
                className="relative bg-black text-white rounded-xl p-6 w-[300px] h-[280px] flex flex-col justify-between flex-shrink-0 shadow-lg overflow-hidden"
              >
                {/* Content */}
                <div className="relative z-10 flex flex-col h-full justify-between">
                  {/* Photo et infos */}
                  <div className="flex items-center mb-2">
                    <Image 
                      src={t.photo} 
                      alt={t.name}
                      width={48}
                      height={48}
                      className="rounded-full object-cover mr-4"
                    />
                    <div className="text-left">
                      <h3 className="text-lg font-semibold mb-1">{t.name}</h3>
                      <span className="text-xs text-gray-300">{t.position}</span>
                    </div>
                  </div>
                  
                  {/* Citation alignée à gauche - centrée verticalement */}
                  <div className="flex-1 flex items-center">
                    <p className="text-base text-gray-200 text-left">&quot;{t.content}&quot;</p>
                  </div>
                  
                  {/* Étoiles alignées à gauche */}
                  <div className="flex mt-2">
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
