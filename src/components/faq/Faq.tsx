"use client"
import { useState } from 'react';
import { ChevronDown, ChevronUp, HelpCircle } from 'lucide-react';

const FAQ = () => {
  const [openItems, setOpenItems] = useState<number[]>([]);

  const toggleItem = (index: number) => {
    setOpenItems(prev => 
      prev.includes(index) 
        ? prev.filter(i => i !== index)
        : [...prev, index]
    );
  };

  const faqData = [
    {
      question: "Comment ça marche concrètement ?",
      answer: "Vous vous inscrivez en 2 minutes, connectez vos bots WhatsApp et Telegram automatiquement, ajoutez vos clients et envoyez vos premières campagnes instantanément. Tout est guidé et notre support vous aide si besoin."
    },
    {
      question: "Mes clients doivent-ils installer quelque chose ?",
      answer: "Non ! Vos clients reçoivent vos messages directement sur WhatsApp et Telegram qu'ils utilisent déjà. Aucune app à télécharger, aucune inscription supplémentaire requise."
    },
    {
      question: "Est-ce que c'est compliqué à configurer ?",
      answer: "Pas du tout ! Notre interface est conçue pour être simple. Configuration des bots en 1 clic, ajout de clients par import ou manuellement, création de campagnes en quelques clics. Si vous savez envoyer un SMS, vous savez utiliser Bizuri."
    },
    {
      question: "Puis-je vraiment envoyer à tous mes clients d'un coup ?",
      answer: "Oui ! Une fois vos clients enregistrés, vous créez votre promotion/événement et l'envoyez instantanément à toute votre liste via WhatsApp et Telegram. En 30 secondes, tous vos clients sont informés."
    },
    {
      question: "Combien ça coûte vraiment ?",
      answer: "Freemium 14$/mois (150 clients), Premium 25$/mois (400 clients), VIP 99$/mois (1000+ clients). Pas de frais cachés, pas d'engagement. Annulez quand vous voulez, gardez vos données."
    },
    {
      question: "Mes données client sont-elles sécurisées ?",
      answer: "Absolument ! Cryptage SSL, serveurs sécurisés, conformité RGPD. Vos données vous appartiennent, nous ne les partageons jamais. Vous pouvez exporter et supprimer vos données à tout moment."
    },
    {
      question: "Et si ça ne marche pas pour mon commerce ?",
      answer: "Notre solution fonctionne pour tous types de commerces : supermarchés, boutiques, pharmacies, restaurants... Plus de 500 commerces nous font confiance. Notre support vous accompagne pour adapter Bizuri à vos besoins spécifiques."
    },
    {
      question: "Y a-t-il un support et de la formation ?",
      answer: "Oui ! Formation gratuite incluse, documentation complète en français, support par chat (Premium) ou email. Notre équipe francophone basée en Afrique comprend vos enjeux et vous aide à réussir."
    }
  ];

  return (
    <section className="w-full py-16 md:py-20 lg:py-24 bg-white relative overflow-hidden">
      <div className="max-w-4xl mx-auto px-4 md:px-6 lg:px-8 relative z-10">
        {/* Header Section */}
        <div className="text-center mb-12 md:mb-16 lg:mb-20">
          <div className="inline-flex items-center gap-3 bg-black/5 backdrop-blur-sm text-black px-6 py-3 rounded-full text-sm font-medium mb-8 border border-black/10">
            <HelpCircle className="w-5 h-5 text-[#FACC15]" />
            <span>Questions fréquentes</span>
          </div>
          
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-black mb-6 leading-tight">
            Toutes vos questions <span className="text-[#FACC15]">ont une réponse</span>
          </h1>
          
          <p className="text-lg md:text-xl text-black/70 max-w-3xl mx-auto leading-relaxed font-medium">
            Découvrez tout ce que vous devez savoir sur Bizuri. Notre équipe répond à vos questions pour vous aider à démarrer en toute confiance.
          </p>
        </div>

        {/* FAQ Grid */}
        <div className="space-y-3 md:space-y-4 lg:space-y-6">
          {faqData.map((item, index) => (
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