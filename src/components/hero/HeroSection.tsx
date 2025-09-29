"use client"
import { Play, ArrowRight } from "lucide-react"
import { useState, useEffect, useRef } from "react"

export function HeroSection() {
  const [isVisible, setIsVisible] = useState(false)
  const videoRef = useRef<HTMLVideoElement>(null)
  
  useEffect(() => {
    setIsVisible(true)
  }, [])

  return (
    <section className="relative w-full min-h-screen flex items-center justify-center px-4 md:px-6 lg:px-8 pt-24 md:pt-32 pb-16 md:pb-20 lg:pb-24 text-center overflow-hidden bg-gradient-to-br from-[#FACC15] via-[#FCD34D] to-[#F59E0B]">
      {/* Floating Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-4 h-4 bg-white rounded-full opacity-70 animate-bounce" style={{animationDelay: '0s'}}></div>
        <div className="absolute top-40 right-20 w-3 h-3 bg-black rounded-full opacity-50 animate-bounce" style={{animationDelay: '1s'}}></div>
        <div className="absolute bottom-40 left-20 w-5 h-5 bg-white rounded-full opacity-60 animate-bounce" style={{animationDelay: '2s'}}></div>
        <div className="absolute bottom-20 right-10 w-2 h-2 bg-black rounded-full opacity-80 animate-bounce" style={{animationDelay: '0.5s'}}></div>
      </div>

      {/* Content avec animations */}
      <div className={`relative max-w-5xl mx-auto z-10 transition-all duration-1000 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
        


        {/* Heading avec gradient text */}
        <h1 className={`text-5xl md:text-7xl lg:text-8xl font-black text-transparent bg-clip-text bg-gradient-to-r from-white via-gray-100 to-white mb-8 leading-tight tracking-tight transition-all duration-700 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-5 opacity-0'}`}
            style={{animationDelay: '0.4s'}}>
          Vos clients reviennent,
          <span className="block text-black font-extrabold">
            vos ventes explosent
          </span>
        </h1>

        {/* Subtitle améliorée */}
        <p className={`text-black/80 text-xl md:text-2xl mb-12 max-w-3xl mx-auto leading-relaxed font-medium transition-all duration-700 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-5 opacity-0'}`}
           style={{animationDelay: '0.6s'}}>
          Automatisez vos campagnes WhatsApp et Telegram, fidélisez votre clientèle et <span className="font-bold text-black">boostez vos ventes en quelques clics.</span> Simple, rapide, efficace.
        </p>

        {/* CTA Buttons améliorés */}
        <div className={`flex flex-col sm:flex-row items-center justify-center gap-4 md:gap-6 mb-16 transition-all duration-700 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-5 opacity-0'}`}
             style={{animationDelay: '0.8s'}}>
          
          <a href="#pricing" 
             className="group bg-black text-[#FACC15] hover:bg-gray-900 transition-all duration-300 rounded-full px-6 sm:px-8 md:px-10 py-3 md:py-4 text-base sm:text-lg md:text-xl font-bold inline-flex items-center hover:scale-105 transform border-2 border-black/20 whitespace-nowrap w-full sm:w-auto justify-center cursor-pointer">
            <span className="hidden sm:inline">Prendre un pack maintenant</span>
            <span className="sm:hidden">Prendre un pack maintenant</span>
            <ArrowRight className="w-5 h-5 md:w-6 md:h-6 ml-2 md:ml-3 transition-transform group-hover:translate-x-1" />
          </a>

          <button 
             onClick={() => {
               const videoElement = videoRef.current;
               if (videoElement) {
                 videoElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
                 videoElement.play();
               }
             }}
             className="group bg-white text-black hover:bg-white/90 transition-all duration-300 rounded-full px-6 sm:px-8 md:px-10 py-3 md:py-4 text-base sm:text-lg md:text-xl font-bold inline-flex items-center hover:scale-105 transform border border-black/10 whitespace-nowrap w-full sm:w-auto justify-center cursor-pointer">
            <div className="w-6 h-6 md:w-8 md:h-8 mr-2 md:mr-3 bg-black rounded-full flex items-center justify-center">
              <Play className="w-3 h-3 md:w-4 md:h-4 text-white fill-white ml-0.5" />
            </div>
            <span className="hidden sm:inline">Voir la démo (2 min)</span>
            <span className="sm:hidden">Voir la démo (2 min)</span>
          </button>
        </div>

        {/* Video Demo Block */}
        <div className={`mt-16 max-w-2xl lg:max-w-7xl mx-auto transition-all duration-700 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-5 opacity-0'}`}
             style={{animationDelay: '1.2s'}}>
          <div className="relative group">
            <div className="bg-black/10 rounded-2xl p-2 border border-black/10">
              <div className="relative overflow-hidden rounded-xl">
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
                  Votre navigateur ne supporte pas la lecture de vidéos.
                </video>
                
                {/* Floating Elements sur la vidéo */}
                <div className="absolute inset-0 overflow-hidden pointer-events-none">
                  <div className="absolute top-4 right-4 w-3 h-3 bg-[#FACC15] rounded-full opacity-70 animate-bounce" style={{animationDelay: '0s'}}></div>
                  <div className="absolute bottom-4 left-4 w-2 h-2 bg-white rounded-full opacity-60 animate-bounce" style={{animationDelay: '1s'}}></div>
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