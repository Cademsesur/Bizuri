"use client";

import { useRef } from 'react';
import { UserPlus, CreditCard, Gift, TrendingUp, Users } from 'lucide-react';
import { useTranslations } from 'next-intl';

const HowItWorksSection = () => {
  const t = useTranslations('howItWorks');

  const iconMap = [UserPlus, CreditCard, Gift, TrendingUp];
  
  const stepsData = [
    { title: t('steps.0.title'), description: t('steps.0.description') },
    { title: t('steps.1.title'), description: t('steps.1.description') },
    { title: t('steps.2.title'), description: t('steps.2.description') },
    { title: t('steps.3.title'), description: t('steps.3.description') },
  ];
  
  const blocksData = stepsData.map((step, index) => ({
    id: index + 1,
    IconComponent: iconMap[index],
    title: step.title,
    description: step.description,
    videoSrc: [
      "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
      "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4",
      "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4",
      "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4"
    ][index],
    reverse: index % 2 === 1
  }));

  const VideoPlayer = ({ src }: { src: string }) => {
    const videoRef = useRef(null);

    return (
      <div className="relative group">
        <div className="relative overflow-hidden rounded-2xl shadow-2xl border border-white/10 bg-black/20 backdrop-blur-sm">
          {/* Video */}
          <video
            ref={videoRef}
            className="w-full h-64 object-cover relative z-10"
            loop
            muted
            playsInline
            autoPlay
          >
            <source src={src} type="video/mp4" />
          </video>
          
          {/* Floating Elements */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <div className="absolute top-4 right-4 w-2 h-2 bg-[#FACC15] rounded-full opacity-70 animate-bounce" style={{animationDelay: '0s'}}></div>
            <div className="absolute bottom-6 left-6 w-1 h-1 bg-white rounded-full opacity-60 animate-bounce" style={{animationDelay: '1s'}}></div>
          </div>
          

        </div>
      </div>
    );
  };

  return (
    <div className="relative bg-white">
      {/* Header Section */}
      <div className="relative z-10 text-center py-20 md:py-28 lg:py-24 bg-white px-6 md:px-8 lg:px-0">
        <div className="max-w-4xl mx-auto px-4 md:px-6 lg:px-8">
          <div className="inline-flex items-center gap-3 bg-black/5 text-black px-6 py-3 rounded-full text-sm font-medium mb-8 border border-black/10">
            <Users className="w-5 h-5 text-[#FACC15]" />
            <span>{t('badge')}</span>
          </div>
          
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-black mb-6 leading-tight">
            {t('title')} <span className="text-[#FACC15]">{t('titleHighlight')}</span>
          </h2>
          <p className="text-lg md:text-xl text-black/80 leading-relaxed font-medium max-w-3xl mx-auto">
            {t('subtitle')}
          </p>
        </div>
      </div>

      {/* Sticky Blocks */}
      {blocksData.map((block, index) => (
        <div key={block.id} className="sticky top-0 h-[70vh]">
          <div className="w-full h-full bg-black flex items-center justify-center relative overflow-hidden">
            {/* Floating Elements */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
              <div className="absolute top-10 left-10 w-4 h-4 bg-[#FACC15] rounded-full opacity-70 animate-bounce" style={{animationDelay: `${index * 0.5}s`}}></div>
              <div className="absolute top-20 right-20 w-3 h-3 bg-white rounded-full opacity-50 animate-bounce" style={{animationDelay: `${index * 0.7}s`}}></div>
              <div className="absolute bottom-20 left-20 w-5 h-5 bg-[#FACC15] rounded-full opacity-60 animate-bounce" style={{animationDelay: `${index * 1}s`}}></div>
              <div className="absolute bottom-10 right-10 w-2 h-2 bg-white rounded-full opacity-80 animate-bounce" style={{animationDelay: `${index * 0.3}s`}}></div>
            </div>

            {/* Content */}
            <div className="max-w-6xl mx-auto px-6 py-12 md:py-16 lg:py-8 w-full relative z-10">
              <div className={`grid lg:grid-cols-2 gap-12 items-center ${
                block.reverse ? 'lg:grid-flow-col-dense' : ''
              }`}>
                
                {/* Text Content */}
                <div className={`space-y-6 ${block.reverse ? 'lg:col-start-2' : ''}`}>
                  <div className="flex items-center space-x-4">
                    <div className="w-16 h-16 bg-[#FACC15] rounded-2xl flex items-center justify-center shadow-lg">
                      <div className="w-8 h-8">
                        <block.IconComponent className="w-8 h-8 text-white" />
                      </div>
                    </div>
                    <span className="text-4xl font-black text-[#FACC15]">
                      {String(block.id).padStart(2, '0')}
                    </span>
                  </div>
                  
                  <h3 className="text-3xl md:text-4xl font-black leading-tight text-white">
                    {block.title}
                  </h3>
                  
                  <p className="text-lg leading-relaxed text-white/80 max-w-lg font-medium">
                    {block.description}
                  </p>
                  
                  <a href="#pricing" className="group inline-flex items-center space-x-3 bg-[#FACC15] hover:bg-[#F59E0B] text-black font-bold px-6 py-3 rounded-full transition-all duration-300 transform hover:scale-105 cursor-pointer">
                    <span>{t('cta')}</span>
                    <svg className="w-4 h-4 transform transition-transform duration-300 group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </a>
                </div>

                {/* Video */}
                <div className={`${block.reverse ? 'lg:col-start-1' : ''}`}>
                  <VideoPlayer src={block.videoSrc} />
                </div>

              </div>
            </div>

            {/* Step Indicator */}
            <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2">
              <div className="flex space-x-2">
                {blocksData.map((_, i) => (
                  <div
                    key={i}
                    className={`h-2 rounded-full transition-all duration-300 ${
                      i === index 
                        ? 'bg-[#FACC15] w-8' 
                        : 'bg-white/40 w-2'
                    }`}
                  />
                ))}
              </div>
            </div>

          </div>
        </div>
      ))}
      
    </div>
  );
};

export default HowItWorksSection;