"use client";

import Image from "next/image";
import { Handshake } from "lucide-react";

// Exemple de logos : remplace par tes images réelles
const logos = [
  "/logo.png",
  "/logo2.png",
  "/logo3.png",
  "/logo4.png",
  "/logo6.png",
  "/logo7.png",
];

export function PartnersSection() {

  return (
    <section className="w-full py-12 md:py-16 lg:py-20 bg-white">
      {/* Title */}
     <div className="text-center mb-8 md:mb-12 lg:mb-16 px-4 md:px-6 lg:px-8">
        <div className="inline-flex items-center gap-3 bg-black/5 text-black px-6 py-3 rounded-full text-sm font-medium mb-8 border border-black/10">
          <Handshake className="w-5 h-5 text-[#FACC15]" />
          <span>Partenaires</span>
        </div>
        
        <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-black mb-6 leading-tight">
            Ils nous font{' '}
            <span className="text-[#FACC15]">
              confiance
            </span>
        </h2>
     </div>


      {/* Logos Scroller */}
      <div className="relative overflow-hidden">
        <div className="flex animate-scroll-seamless">
          {/* Répéter les logos 4 fois pour assurer une continuité parfaite */}
          {[...Array(4)].map((_, groupIndex) => (
            <div key={`group-${groupIndex}`} className="flex flex-shrink-0">
              {logos.map((logo, index) => (
                <div key={`${groupIndex}-${index}`} className="flex-shrink-0 mx-8">
                  <Image
                    src={logo}
                    alt={`Logo ${index + 1}`}
                    width={120}
                    height={60}
                    className="object-contain opacity-70 hover:opacity-100 transition-opacity duration-300 grayscale hover:grayscale-0"
                  />
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
