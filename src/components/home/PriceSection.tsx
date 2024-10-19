import React from "react";
import Image from "next/image";
import { Check, LucideIcon, FlaskConical, Eye, Unlock } from "lucide-react";

import { StaticImageData } from "next/image";
import p1 from "@/assets/images/banner.jpg";
import p2 from "@/assets/images/b-1.png";
import p3 from "@/assets/images/b-2.jpg";

interface Plan {
  name: string;
  description: string;
  price: number;
  icon: LucideIcon;
  features: string[];
  moreFeatures: number;
  popular: boolean;
  link: string;
}

interface PricingCardProps {
  plan: Plan;
  accentColor: string;
  glowColor: string;
  bannerImage: StaticImageData;
}

const PricingCard: React.FC<PricingCardProps> = ({
  plan,
  accentColor,
  glowColor,
  bannerImage,
}) => (
  <div
    className={`relative overflow-hidden rounded-2xl bg-transparent transition-all duration-300 hover:scale-105 ${accentColor}`}
    style={{
      boxShadow: `0 0 40px 5px ${glowColor}`,
    }}
  >
    <div className="absolute inset-0 opacity-20 bg-gradient-to-b from-transparent via-transparent to-black z-0"></div>
    <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black z-10"></div>
    <div className="absolute inset-0 z-0" style={{ height: "50%" }}>
      <Image
        src={bannerImage}
        alt={`${plan.name} banner`}
        layout="fill"
        objectFit="cover"
        objectPosition="center"
      />
    </div>
    <div className="relative z-20 p-6">
      {plan.popular && (
        <div className="absolute top-0 right-0 bg-white text-black text-xs font-bold px-3 py-1 rounded-bl-lg">
          Popular
        </div>
      )}
      <div className="flex justify-center mb-4">
        <div className="w-12 h-12 rounded-full bg-black bg-opacity-50 flex items-center justify-center">
          <plan.icon className="w-6 h-6 text-white" />
        </div>
      </div>
      <h3 className="text-2xl font-bold text-white text-center mb-2">
        {plan.name}
      </h3>
      <p className="text-zinc-300 text-center mb-4">{plan.description}</p>
      <div className="text-4xl font-bold text-white text-center mb-1">
        R$ {plan.price}
      </div>
      <p className="text-zinc-300 text-center mb-6">Mensalmente.</p>
      <button
        className={`w-full py-2 rounded-lg font-medium transition-colors duration-1000 hover:scale-110 ${
          plan.popular
            ? "bg-white text-black hover:bg-zinc-200"
            : "bg-black bg-opacity-50 text-white hover:bg-opacity-70  "
        }`}
        onClick={() => window.location.href = `product/${plan.link}`}      >
        Get Started
      </button>
      <div className="mt-6">
        <h4 className="text-white font-semibold mb-2">Features:</h4>
        <ul className="space-y-2">
          {plan.features.map((feature, index) => (
            <li key={index} className="flex items-center text-zinc-300">
              <Check className="w-5 h-5 mr-2 text-green-500" />
              {feature}
            </li>
          ))}
        </ul>
        <a
          href="#"
          className="block mt-4 text-sm text-zinc-400 hover:text-white transition-colors duration-300"
        >
          and {plan.moreFeatures} more
        </a>
      </div>
    </div>
  </div>
);

const PricingSection: React.FC = () => {
  const plans: Plan[] = [
    {
      name: "Fanta Light",
      description:
        "Para quem quer aperfeiçoar a jogabilidade, contendo a honra do jogo.",
      price: 25,
      icon: FlaskConical,
      features: ["Aimbot", "Trigger Bot", "Recoil System", "Flickbot"],
      moreFeatures: 2,
      popular: false,
      link: 'fantalight'
    },
    {
      name: "Fanta Pro",
      description:
        "Para quem quer dominar o cenario do valorant mesmo sem nunca ter jogado o jogo.",
      price: 60,
      icon: Eye,
      features: ["ESP", "Aimbot", "Trigger Bot", "Recoil System"],
      moreFeatures: 6,
      popular: true,
      link: 'fantapro'
    },
    {
      name: "Fanta Unban",
      description:
        "Para quem usou o produto concorrente e precisa remover o banimento.",
      price: 90,
      icon: Unlock,
      features: [
        "Todos os jogos",
        "Uso unico",
        "Suporte 24/7",
        "Seguro e facil",
      ],
      moreFeatures: 6,
      popular: false,
      link: 'fantaunban'
    },
  ];

  const accentColors: string[] = [
    "bg-purple-500/30",
    "bg-orange-500/30",
    "bg-green-500/30",
  ];

  const glowColors: string[] = [
    "rgba(168, 85, 247, 0.5)", // Roxo
    "rgba(249, 115, 22, 0.5)", // Laranja
    "rgba(34, 197, 94, 0.5)", // Verde
  ];

  const bannerImages: StaticImageData[] = [p1, p2, p3];

  return (
    <div className="container mx-auto px-4 py-16">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {plans.map((plan, index) => (
          <PricingCard
            key={plan.name}
            plan={plan}
            accentColor={accentColors[index]}
            glowColor={glowColors[index]}
            bannerImage={bannerImages[index]}
          />
        ))}
      </div>
    </div>
  );
};

export default PricingSection;
