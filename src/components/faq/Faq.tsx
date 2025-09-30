"use client"
import { useState } from 'react';
import { ChevronDown, ChevronUp, HelpCircle } from 'lucide-react';
import { useTranslations } from 'next-intl';

const FAQ = () => {
  const [openItems, setOpenItems] = useState<number[]>([]);
  const t = useTranslations('faq');

  const faqItems = [
    { question: t('items.0.question'), answer: t('items.0.answer') },
    { question: t('items.1.question'), answer: t('items.1.answer') },
    { question: t('items.2.question'), answer: t('items.2.answer') },
    { question: t('items.3.question'), answer: t('items.3.answer') },
    { question: t('items.4.question'), answer: t('items.4.answer') },
    { question: t('items.5.question'), answer: t('items.5.answer') },
    { question: t('items.6.question'), answer: t('items.6.answer') },
    { question: t('items.7.question'), answer: t('items.7.answer') },
  ];

  const toggleItem = (index: number) => {
    setOpenItems(prev => 
      prev.includes(index) 
        ? prev.filter(i => i !== index)
        : [...prev, index]
    );
  };

  return (
    <section className="w-full py-16 md:py-20 lg:py-24 bg-white relative overflow-hidden">
      <div className="max-w-4xl mx-auto px-4 md:px-6 lg:px-8 relative z-10">
        {/* Header Section */}
        <div className="text-center mb-12 md:mb-16 lg:mb-20">
          <div className="inline-flex items-center gap-3 bg-black/5 backdrop-blur-sm text-black px-6 py-3 rounded-full text-sm font-medium mb-8 border border-black/10">
            <HelpCircle className="w-5 h-5 text-[#FACC15]" />
            <span>{t('badge')}</span>
          </div>
          
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-black mb-6 leading-tight">
            {t('title')} <span className="text-[#FACC15]">{t('titleHighlight')}</span>
          </h1>
          
          <p className="text-lg md:text-xl text-black/70 max-w-3xl mx-auto leading-relaxed font-medium">
            {t('subtitle')}
          </p>
        </div>

        {/* FAQ Grid */}
        <div className="space-y-3 md:space-y-4 lg:space-y-6">
          {faqItems.map((item, index) => (
            <div
              key={index}
              className="bg-white border-2 border-black/10 rounded-2xl overflow-hidden"
            >
              <button
                onClick={() => toggleItem(index)}
                className="w-full px-4 md:px-6 lg:px-8 py-4 md:py-6 text-left flex items-center justify-between focus:outline-none cursor-pointer"
              >
                <h3 className="text-lg md:text-xl font-bold text-black pr-4">
                  {item.question}
                </h3>
                
                <div className={`flex-shrink-0 w-8 h-8 bg-black/5 rounded-full flex items-center justify-center transition-all duration-300 ${
                  openItems.includes(index) ? 'bg-[#FACC15] rotate-180' : ''
                }`}>
                  {openItems.includes(index) ? (
                    <ChevronUp className="w-5 h-5 text-black" />
                  ) : (
                    <ChevronDown className="w-5 h-5 text-black/60" />
                  )}
                </div>
              </button>

              <div className={`transition-all duration-300 ease-in-out ${
                openItems.includes(index) 
                  ? 'max-h-96 opacity-100 pb-6' 
                  : 'max-h-0 opacity-0 pb-0'
              } overflow-hidden`}>
                <div className="px-4 md:px-6 lg:px-8">
                  <div className="border-t border-black/10 pt-4 md:pt-6">
                    <p className="text-black/80 leading-relaxed text-base md:text-lg">
                      {item.answer}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FAQ;