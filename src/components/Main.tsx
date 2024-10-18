"use client";

import React, { useRef } from "react";
import ArrowWIcon from "@/assets/icons/arrow-w.svg";
import cursorImage from "@/assets/images/cursor.png";
import messageImage from "@/assets/images/message.png";
import appScreen from "../assets/images/app-screen.png";
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import Header from "./Header";
import Aside from "./Aside";
import PricingSection from "./PriceSection";

const Hero: React.FC = () => {
  return (
    <main className="flex justify-center items-center">
      <section className="relative overflow-hidden bg-zinc-900 py-[72px] text-white sm:py-24 w-full">
        <div className="container relative mx-auto px-4 flex flex-col items-center mb-44 sm:mb-32">
          <div className="flex items-center justify-center">
            <a
              href="#"
              className="inline-flex gap-3 rounded-lg border border-orange-300/30 px-2 py-1 hover:bg-orange-900/20 transition-colors"
            >
              <span className="bg-gradient-to-r from-orange-400 to-orange-600 bg-clip-text text-transparent">
                Version 2.0 is here
              </span>
              <span className="inline-flex items-center gap-1 text-orange-300">
                <span>Read More</span>
                <Image
                  src={ArrowWIcon}
                  alt="Arrow"
                  width={20}
                  height={20}
                  className="invert"
                />
              </span>
            </a>
          </div>
          <div className="mt-8 flex justify-center w-full">
            <div className="relative inline-flex">
              <h1 className="mt-8 text-center text-7xl font-bold tracking-tighter sm:text-9xl text-orange-500">
                <span className="text-6xl">Sipping</span>
                <br />
                Fanta.club
              </h1>
              <motion.div
                drag
                className="absolute right-[-100px] top-[108px] hidden sm:inline"
              >
                <Image
                  src={cursorImage}
                  height={200}
                  width={200}
                  className="max-w-none"
                  draggable={false}
                  alt="Cursor Image | SaaS Landing Page built by Diego Tech"
                />
              </motion.div>
              <motion.div
                drag
                className="absolute left-[-100px] top-[56px] hidden sm:inline"
              >
                <Image
                  src={messageImage}
                  height={200}
                  width={200}
                  className="max-w-none"
                  draggable={false}
                  alt="Message Image | SaaS Landing Page built by Diego Tech"
                />
              </motion.div>
            </div>
          </div>
          <div className="flex justify-center w-full">
            <p className="mt-8 max-w-md text-center text-xl text-orange-200">
              Bem-vindo ao nosso site de cheats! Entre com suas credenciais para
              acessar conteúdos exclusivos. Divirta-se e jogue com inteligência!
            </p>
          </div>
          <div className="mt-8 flex justify-center">
            <button className="rounded-lg bg-orange-500 px-5 py-3 font-medium text-zinc-900 hover:bg-orange-400 transition-colors">
              Get for free
            </button>
          </div>
        </div>
        <div className="absolute left-1/2 top-[calc(100%-92px)] h-[375px] w-[750px] -translate-x-1/2 rounded-[100%] border border-orange-300 bg-[radial-gradient(closest-side,#18181b_92%,#f97316)] sm:top-[calc(100%-120px)] sm:h-[768px] sm:w-[1536px] lg:h-[1200px] lg:w-[2400px]"></div>
      </section>
    </main>
  );
};

const ProductShowcase: React.FC = () => {
  const refImage = useRef<HTMLImageElement>(null);

  const { scrollYProgress } = useScroll({
    target: refImage,
    offset: ["start end", "end end"],
  });

  const rotateX = useTransform(scrollYProgress, [0, 1], [15, 0]);
  const opacity = useTransform(scrollYProgress, [0, 1], [0.5, 1]);

  return (
    <section className="overflow-hidden bg-gradient-to-b from-zinc-900  via-[#ab452cc4] to-black  py-[72px] text-white sm:py-24">
      <div className="container mx-auto px-4 flex flex-col items-center">
        <h2 className="text-center text-5xl font-bold tracking-tighter sm:text-6xl">
          Fanta Pro
        </h2>
        <div className="mt-5 max-w-xl text-center">
          <p className="text-xl text-white/70">
            Nosso melhor e mais promissor produto.{" "}
            <span className="text-orange-500 text-2xl font-bold">
              Fanta PRO
            </span>{" "}
            a solução para voce, o pratinha que quer amassar todo mundo no
            radiante sem dificuldade alguma.
          </p>
        </div>
      </div>
      <motion.div
        style={{
          opacity,
          rotateX,
          transformPerspective: "800px",
        }}
        className="mt-12 flex justify-center"
      >
        <Image
          ref={refImage}
          src={appScreen}
          alt="The product screenshot | SaaS Landing Page built by Diego Tech"
        />
      </motion.div>
    </section>
  );
};



const getColor = (color: string) => {
  switch (color) {
    case "orange":
      return { text: "#f97316", border: "#fb923c", glow: "rgba(249, 115, 22, 0.5)" }
    case "purple":
      return { text: "#a855f7", border: "#c084fc", glow: "rgba(168, 85, 247, 0.5)" }
    case "green":
      return { text: "#22c55e", border: "#4ade80", glow: "rgba(34, 197, 94, 0.5)" }
    default:
      return { text: "#ffffff", border: "#ffffff", glow: "rgba(255, 255, 255, 0.5)" }
  }
}

const FeatureSection: React.FC = () => {
  const features = [
    {
      title: "Fanta pro",
      description:
        "A elite dos cheats, para voce usuario que quer bater em todo radiante sem se preocupar em ter a minima habilidade necessaria. Agora voce consegue.",
      videoUrl: "/videos/show.mp4",
      accentColor: "orange",
    },
    {
      title: "Fanta light",
      description:
        "Para voce, usuario que quer aperfeiçoar as suas habilidades, tendo consistencia e liderança em suas partidas, fanta light suprira suas necessidades.",
      videoUrl: "/videos/show.mp4",
      accentColor: "purple",
    },
    {
      title: "Fanta unban",
      description:
        "Foi de vasco? A fanta resolve, nosso spoofer remove o banimento de seu valorant e quaisquer outros jogos, facil rapido e funcional.",
      videoUrl: "/videos/show.mp4",
      accentColor: "green",
    },
  ]

  return (
    <section className="bg-gradient-to-b from-black to-zinc-900 py-24 text-white">
      <div className="container mx-auto px-4">
        {features.map((feature, index) => {
          const colors = getColor(feature.accentColor)
          return (
            <div
              key={index}
              className={`flex flex-col md:flex-row items-center justify-between mb-24 ${
                index % 2 !== 0 ? "md:flex-row-reverse" : ""
              } `}
            >
              <div className={`md:w-1/2 mb-8 md:mb-0 ${index % 2 !== 0 ? "md:pl-8" : "md:pr-8"}`}>
                <h2 className="text-4xl font-bold mb-4" style={{ color: colors.text }}>
                  {feature.title}
                </h2>
                <p className="text-xl text-white/70">{feature.description}</p>
              </div>
              <div className="md:w-1/2">
                <div
                  className="rounded-lg shadow-lg overflow-hidden"
                  style={{
                    boxShadow: `0 0 9999px ${colors.glow}`,
                    border: `4px solid ${colors.border}`,
                  }}
                >
                  <motion.video
                    autoPlay
                    muted
                    loop
                    playsInline
                    className="w-full"
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 1 }}
                  >
                    <source src={feature.videoUrl} type="video/mp4" />
                    Seu navegador não suporta video.
                  </motion.video>
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </section>
  )
}



const MainPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-zinc-900 text-zinc-100">
      <Header />
      <main>
        <Hero />
        <ProductShowcase />
        <FeatureSection />
        <PricingSection />
      </main>
      <Aside />
    </div>
  );
};

export default MainPage;
