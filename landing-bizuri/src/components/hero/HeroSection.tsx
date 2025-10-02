"use client"
import { Play, ArrowRight } from "lucide-react"
import { useState, useEffect, useRef } from "react"
import { useTranslations } from 'next-intl'

export function HeroSection() {
  const [isVisible, setIsVisible] = useState(false)
  const videoRef = useRef<HTMLVideoElement>(null)
  const t = useTranslations('hero')
  
  useEffect(() => {
    setIsVisible(true)
  }, [])

  return (
    <section className="relative w-full min-h-screen flex items-center justify-center px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 pt-20 sm:pt-24 md:pt-28 lg:pt-32 pb-12 sm:pb-16 md:pb-20 lg:pb-24 text-center overflow-hidden bg-gradient-to-br from-[#FACC15] via-[#FCD34D] to-[#F59E0B]">
      {/* Floating Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-4 h-4 bg-white rounded-full opacity-70 animate-bounce" style={{animationDelay: '0s'}}></div>
        <div className="absolute top-40 right-20 w-3 h-3 bg-black rounded-full opacity-50 animate-bounce" style={{animationDelay: '1s'}}></div>
        <div className="absolute bottom-40 left-20 w-5 h-5 bg-white rounded-full opacity-60 animate-bounce" style={{animationDelay: '2s'}}></div>
        <div className="absolute bottom-20 right-10 w-2 h-2 bg-black rounded-full opacity-80 animate-bounce" style={{animationDelay: '0.5s'}}></div>
      </div>

      {/* Content avec animations */}
      <div className={`relative max-w-7xl mx-auto z-10 transition-all duration-1000 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
  {/* Heading avec gradient text - Responsive optimisé */}
  <h1 className={`text-4xl sm:text-5xl md:text-6xl lg:text-5xl xl:text-6xl 2xl:text-7xl font-black text-transparent bg-clip-text bg-gradient-to-r from-white via-gray-100 to-white mb-6 sm:mb-6 md:mb-8 leading-[1.05] sm:leading-tight tracking-tight transition-all duration-700 px-2 sm:px-4 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-5 opacity-0'}`}
            style={{animationDelay: '0.4s'}}>
          <span className="block break-words">
            {t('title')}
          </span>
          <span className="block text-black font-extrabold break-words">
            {t('titleHighlight')}
          </span>
        </h1>

        {/* Subtitle améliorée - Responsive optimisé */}
  <p className={`text-black/80 text-lg sm:text-xl md:text-2xl lg:text-lg xl:text-xl mb-10 sm:mb-10 md:mb-12 max-w-sm sm:max-w-lg md:max-w-2xl lg:max-w-3xl mx-auto leading-relaxed font-medium transition-all duration-700 px-2 sm:px-4 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-5 opacity-0'}`}
           style={{animationDelay: '0.6s'}}>
          {t('subtitle')}
        </p>

        {/* CTA Buttons améliorés - Responsive optimisé */}
        <div className={`flex flex-col lg:flex-row items-center justify-center gap-4 lg:gap-6 mb-12 sm:mb-14 md:mb-16 transition-all duration-700 px-2 sm:px-4 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-5 opacity-0'}`}
             style={{animationDelay: '0.8s'}}>
          
          <a href="#pricing" 
             className="group bg-black text-[#FACC15] hover:bg-gray-900 transition-all duration-300 rounded-full px-6 sm:px-6 md:px-8 lg:px-10 py-4 sm:py-3.5 md:py-4 text-base sm:text-base md:text-lg lg:text-xl font-bold inline-flex items-center hover:scale-105 transform border-2 border-black/20 w-full lg:w-auto max-w-sm lg:max-w-none justify-center cursor-pointer">
            <span className="truncate">{t('ctaPrimary')}</span>
            <ArrowRight className="w-5 h-5 sm:w-5 sm:h-5 md:w-6 md:h-6 ml-3 md:ml-3 transition-transform group-hover:translate-x-1 flex-shrink-0" />
          </a>

          <button 
             onClick={() => {
               const videoElement = videoRef.current;
               if (videoElement) {
                 videoElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
                 videoElement.play();
               }
             }}
             className="group bg-white text-black hover:bg-white/90 transition-all duration-300 rounded-full px-6 sm:px-6 md:px-8 lg:px-10 py-4 sm:py-3.5 md:py-4 text-base sm:text-base md:text-lg lg:text-xl font-bold inline-flex items-center hover:scale-105 transform border border-black/10 w-full lg:w-auto max-w-sm lg:max-w-none justify-center cursor-pointer">
            <div className="w-6 h-6 sm:w-6 sm:h-6 md:w-8 md:h-8 mr-3 md:mr-3 bg-black rounded-full flex items-center justify-center flex-shrink-0">
              <Play className="w-3 h-3 sm:w-3 sm:h-3 md:w-4 md:h-4 text-white fill-white ml-0.5" />
            </div>
            <span className="truncate">{t('ctaSecondary')}</span>
          </button>
        </div>

        {/* Video Demo Block - Responsive optimisé */}
        <div className={`mt-12 sm:mt-14 md:mt-16 max-w-sm sm:max-w-lg md:max-w-2xl lg:max-w-4xl xl:max-w-6xl 2xl:max-w-7xl mx-auto transition-all duration-700 px-1 sm:px-4 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-5 opacity-0'}`}
             style={{animationDelay: '1.2s'}}>
          <div className="relative group">
            <div className="bg-black/10 rounded-xl sm:rounded-2xl p-1 sm:p-2 border border-black/10">
              <div className="relative overflow-hidden rounded-lg sm:rounded-xl">
                <video
                  ref={videoRef}
                  className="w-full aspect-video object-cover"
                  loop
                  muted
                  playsInline
                  autoPlay
                  controls
                >
                  <source src="https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4" type="video/mp4" />
                  {t('videoAltText')}
                </video>
                
                {/* Floating Elements sur la vidéo */}
                <div className="absolute inset-0 overflow-hidden pointer-events-none">
                  <div className="absolute top-2 sm:top-4 right-2 sm:right-4 w-2 sm:w-3 h-2 sm:h-3 bg-[#FACC15] rounded-full opacity-70 animate-bounce" style={{animationDelay: '0s'}}></div>
                  <div className="absolute bottom-2 sm:bottom-4 left-2 sm:left-4 w-1.5 sm:w-2 h-1.5 sm:h-2 bg-white rounded-full opacity-60 animate-bounce" style={{animationDelay: '1s'}}></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-black/30 rounded-full flex justify-center">
          <div className="w-1 h-3 bg-black/50 rounded-full mt-2 animate-pulse"></div>
        </div>
      </div>
    </section>
  )
}