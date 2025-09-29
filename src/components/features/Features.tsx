import React from 'react';
import { MessageSquare, Users, Megaphone, ShoppingCart, Bell, BarChart3 } from 'lucide-react';

const Features = () => {
  const features = [
    {
      title: "Configuration bots WhatsApp & Telegram",
      subtitle: "Créez vos canaux de communication en quelques clics. Connectez votre boutique instantanément aux messageries préférées de vos clients.",
      icon: MessageSquare
    },
    {
      title: "Gestion clientèle centralisée",
      subtitle: "Enregistrez et organisez tous vos clients dans une base unique. Segmentez facilement pour des campagnes ciblées et personnalisées.",
      icon: Users
    },
    {
      title: "Campagnes promotionnelles automatisées",
      subtitle: "Créez des promotions et événements personnalisés avec vos propres champs. Envoyez tout instantanément à vos listes clients.",
      icon: Megaphone
    },
    {
      title: "Vente de produits intégrée",
      subtitle: "Publiez vos produits avec descriptions, prix et conditions de livraison. Gérez les commandes directement depuis la plateforme.",
      icon: ShoppingCart
    },
    {
      title: "Messages de relance intelligents",
      subtitle: "Automatisez le suivi client avec des rappels personnalisés. Relancez les prospects et fidélisez automatiquement vos acheteurs.",
      icon: Bell
    },
    {
      title: "Dashboard complet multi-admin",
      subtitle: "Gérez plusieurs administrateurs, suivez vos performances en temps réel et personnalisez entièrement votre compte entreprise.",
      icon: BarChart3
    }
  ];

  return (
    <section className="w-full py-16 md:py-20 lg:py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
        {/* Header Section */}
        <div className="text-center mb-12 md:mb-16 lg:mb-20">
          <div className="inline-flex items-center gap-3 bg-black/5 text-black px-6 py-3 rounded-full text-sm font-medium mb-8 border border-black/10">
            <MessageSquare className="w-5 h-5 text-[#FACC15]" />
            <span>Fonctionnalités</span>
          </div>
          
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-black mb-6 leading-tight">
            Tout pour automatiser vos <span className="text-[#FACC15]">communications clients</span>
          </h1>
          <p className="text-lg md:text-xl text-black/80 max-w-4xl mx-auto leading-relaxed font-medium">
            Découvrez les fonctionnalités qui transforment votre façon de communiquer avec vos clients. Simples, puissantes et conçues pour les commerces africains.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => {
            const IconComponent = feature.icon;
            return (
              <div
                key={index}
                className="relative bg-black rounded-2xl p-8 hover:scale-105 transition-all duration-300 border border-white/10 overflow-hidden"
              >
                {/* Floating Elements */}
                <div className="absolute inset-0 overflow-hidden pointer-events-none">
                  <div className="absolute top-4 right-4 w-2 h-2 bg-white rounded-full opacity-40 animate-bounce" style={{animationDelay: `${index * 0.3}s`}}></div>
                  <div className="absolute bottom-6 left-6 w-1 h-1 bg-white rounded-full opacity-60 animate-bounce" style={{animationDelay: `${index * 0.5}s`}}></div>
                </div>

                <div className="relative z-10">
                  <div className="flex items-center justify-center w-16 h-16 bg-[#FACC15] rounded-xl mb-6">
                    <IconComponent className="w-8 h-8 text-black" />
                  </div>
                  
                  <h3 className="text-xl md:text-2xl font-bold text-white mb-4">
                    {feature.title}
                  </h3>
                  
                  <p className="text-white/80 leading-relaxed">
                    {feature.subtitle}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Call to Action */}
        <div className="text-center mt-16">
          <a href="#pricing" className="bg-black text-white hover:bg-black/90 transition-all duration-300 rounded-full px-8 md:px-12 py-3 md:py-4 text-lg md:text-xl font-bold hover:scale-105 transform cursor-pointer inline-block">
            Prendre un pack maintenant
          </a>
        </div>
      </div>
    </section>
  );
};

export default Features;