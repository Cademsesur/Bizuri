"use client"
import { Facebook, Twitter, Instagram, Linkedin, ArrowRight } from "lucide-react"
import { useTranslations } from 'next-intl'

export function Footer() {
  const t = useTranslations('footer')

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
              {t('description')}
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
            <h3 className="text-white font-bold text-lg mb-4">{t('links.product.title')}</h3>
            <ul className="space-y-3">
              {t.raw('links.product.items').map((item: string, index: number) => (
                <li key={index}><a href="#features" className="text-white/80 hover:text-[#FACC15] transition-colors duration-300 text-sm cursor-pointer">{item}</a></li>
              ))}
            </ul>
          </div>

          {/* Bloc 3 - Support */}
          <div className="lg:col-span-1">
            <h3 className="text-white font-bold text-lg mb-4">{t('links.support.title')}</h3>
            <ul className="space-y-3">
              {t.raw('links.support.items').map((item: string, index: number) => (
                <li key={index}><a href="#contact" className="text-white/80 hover:text-[#FACC15] transition-colors duration-300 text-sm cursor-pointer">{item}</a></li>
              ))}
            </ul>
          </div>

          {/* Bloc 4 - Légal */}
          <div className="lg:col-span-1">
            <h3 className="text-white font-bold text-lg mb-4">{t('links.company.title')}</h3>
            <ul className="space-y-3">
              {t.raw('links.company.items').map((item: string, index: number) => (
                <li key={index}><a href="#" className="text-white/80 hover:text-[#FACC15] transition-colors duration-300 text-sm cursor-pointer">{item}</a></li>
              ))}
            </ul>
          </div>

          {/* Bloc 5 - Call to Action */}
          <div className="lg:col-span-1">
            <h3 className="text-white font-bold text-lg mb-4">{t('cta.title')}</h3>
            <p className="text-white/80 text-sm mb-6">
              {t('cta.description')}
            </p>
            <a href="#pricing" className="group bg-[#FACC15] text-black hover:bg-[#F59E0B] transition-all duration-300 rounded-full px-6 py-3 text-sm font-bold inline-flex items-center transform hover:scale-105 cursor-pointer">
              {t('cta.button')}
              <ArrowRight className="w-4 h-4 ml-2 transition-transform group-hover:translate-x-1" />
            </a>
          </div>
        </div>

        {/* Trait de division */}
        <div className="border-t border-white/20 pt-8">
          {/* Copyright et liens légaux */}
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-white/70 text-sm">
              {t('copyright')}
            </p>
            
            <div className="flex items-center gap-6">
              <a href="#" className="text-white/70 hover:text-[#FACC15] transition-colors duration-300 text-sm cursor-pointer">
                {t('legal.privacy')}
              </a>
              <a href="#" className="text-white/70 hover:text-[#FACC15] transition-colors duration-300 text-sm cursor-pointer">
                {t('legal.terms')}
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
