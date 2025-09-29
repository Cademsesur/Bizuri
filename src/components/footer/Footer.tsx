"use client"
import { Facebook, Twitter, Instagram, Linkedin, ArrowRight } from "lucide-react"

export function Footer() {

  
  return (
    <footer className="relative w-full px-6 py-16 overflow-hidden bg-black">
      {/* Floating Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-10 left-20 w-3 h-3 bg-white rounded-full opacity-60 animate-bounce" style={{animationDelay: '0s'}}></div>
        <div className="absolute top-32 right-10 w-4 h-4 bg-white rounded-full opacity-40 animate-bounce" style={{animationDelay: '1.5s'}}></div>
        <div className="absolute bottom-20 left-10 w-2 h-2 bg-white rounded-full opacity-70 animate-bounce" style={{animationDelay: '2.5s'}}></div>
        <div className="absolute bottom-40 right-32 w-5 h-5 bg-white rounded-full opacity-50 animate-bounce" style={{animationDelay: '0.8s'}}></div>
      </div>

      <div className="relative max-w-7xl mx-auto z-10">
        {/* Footer Content - 5 blocs */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 md:gap-12 mb-12">
          
          {/* Bloc 1 - Logo et réseaux sociaux */}
          <div className="lg:col-span-1">
            <div className="text-3xl font-black text-white mb-4">Bizuri</div>
            <p className="text-white/80 text-sm leading-relaxed mb-6 max-w-xs">
              La solution SaaS pensée pour fidéliser vos clients en Afrique. Simple, moderne et efficace.
            </p>
            <div className="flex gap-4">
              <a href="#" className="w-10 h-10 bg-[#FACC15] hover:bg-[#F59E0B] rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110 cursor-pointer">
                <Facebook className="w-5 h-5 text-black" />
              </a>
              <a href="#" className="w-10 h-10 bg-[#FACC15] hover:bg-[#F59E0B] rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110 cursor-pointer">
                <Twitter className="w-5 h-5 text-black" />
              </a>
              <a href="#" className="w-10 h-10 bg-[#FACC15] hover:bg-[#F59E0B] rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110 cursor-pointer">
                <Instagram className="w-5 h-5 text-black" />
              </a>
              <a href="#" className="w-10 h-10 bg-[#FACC15] hover:bg-[#F59E0B] rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110 cursor-pointer">
                <Linkedin className="w-5 h-5 text-black" />
              </a>
            </div>
          </div>

          {/* Bloc 2 - Navigation principale */}
          <div className="lg:col-span-1">
            <h3 className="text-white font-bold text-lg mb-4">Navigation</h3>
            <ul className="space-y-3">
              <li><a href="#features" className="text-white/80 hover:text-[#FACC15] transition-colors duration-300 text-sm cursor-pointer">Fonctionnalités</a></li>
              <li><a href="#how-it-works" className="text-white/80 hover:text-[#FACC15] transition-colors duration-300 text-sm cursor-pointer">Comment ça marche</a></li>
              <li><a href="#pricing" className="text-white/80 hover:text-[#FACC15] transition-colors duration-300 text-sm cursor-pointer">Tarifs</a></li>
              <li><a href="#faq" className="text-white/80 hover:text-[#FACC15] transition-colors duration-300 text-sm cursor-pointer">Questions fréquentes</a></li>
              <li><a href="#contact" className="text-white/80 hover:text-[#FACC15] transition-colors duration-300 text-sm cursor-pointer">Contact</a></li>
            </ul>
          </div>

          {/* Bloc 3 - Support */}
          <div className="lg:col-span-1">
            <h3 className="text-white font-bold text-lg mb-4">Support</h3>
            <ul className="space-y-3">
              <li><a href="#contact" className="text-white/80 hover:text-[#FACC15] transition-colors duration-300 text-sm cursor-pointer">Centre d&apos;aide</a></li>
              <li><a href="#contact" className="text-white/80 hover:text-[#FACC15] transition-colors duration-300 text-sm cursor-pointer">Nous contacter</a></li>
              <li><a href="#faq" className="text-white/80 hover:text-[#FACC15] transition-colors duration-300 text-sm cursor-pointer">Documentation</a></li>
            </ul>
          </div>

          {/* Bloc 4 - Légal */}
          <div className="lg:col-span-1">
            <h3 className="text-white font-bold text-lg mb-4">Légal</h3>
            <ul className="space-y-3">
              <li><a href="#" className="text-white/80 hover:text-[#FACC15] transition-colors duration-300 text-sm cursor-pointer">Conditions d&apos;utilisation</a></li>
              <li><a href="#" className="text-white/80 hover:text-[#FACC15] transition-colors duration-300 text-sm cursor-pointer">Politique de confidentialité</a></li>
              <li><a href="#" className="text-white/80 hover:text-[#FACC15] transition-colors duration-300 text-sm cursor-pointer">Mentions légales</a></li>
              <li><a href="#" className="text-white/80 hover:text-[#FACC15] transition-colors duration-300 text-sm cursor-pointer">CGV</a></li>
            </ul>
          </div>

          {/* Bloc 5 - Call to Action */}
          <div className="lg:col-span-1">
            <h3 className="text-white font-bold text-lg mb-4">Commencer</h3>
            <p className="text-white/80 text-sm mb-6">
              Prêt à révolutionner votre gestion client ? Choisissez votre plan maintenant.
            </p>
            <a href="#pricing" className="group bg-[#FACC15] text-black hover:bg-[#F59E0B] transition-all duration-300 rounded-full px-6 py-3 text-sm font-bold inline-flex items-center transform hover:scale-105 cursor-pointer">
              Voir les tarifs
              <ArrowRight className="w-4 h-4 ml-2 transition-transform group-hover:translate-x-1" />
            </a>
          </div>
        </div>

        {/* Trait de division */}
        <div className="border-t border-white/20 pt-8">
          {/* Copyright et liens légaux */}
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-white/70 text-sm">
              © 2024 Bizuri. Tous droits réservés.
            </p>
            
            <div className="flex items-center gap-6">
              <a href="#" className="text-white/70 hover:text-[#FACC15] transition-colors duration-300 text-sm cursor-pointer">
                Politique de confidentialité
              </a>
              <a href="#" className="text-white/70 hover:text-[#FACC15] transition-colors duration-300 text-sm cursor-pointer">
                Conditions d&apos;utilisation
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}