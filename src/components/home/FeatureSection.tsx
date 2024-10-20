import React from "react";
import { motion } from "framer-motion";

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
          const isEven = index % 2 === 0
          
          return (
            <div
              key={index}
              className={`flex flex-col md:flex-row items-center justify-between mb-24 ${
                !isEven ? "md:flex-row-reverse" : ""
              }`}
            >
              <motion.div 
                className={`md:w-1/2 mb-8 md:mb-0 ${!isEven ? "md:pl-8" : "md:pr-8"}`}
                initial={{ opacity: 0, x: isEven ? -50 : 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
              >
                <h2 className="text-4xl font-bold mb-4" style={{ color: colors.text }}>
                  {feature.title}
                </h2>
                <p className="text-xl text-white/70">{feature.description}</p>
              </motion.div>
              <motion.div 
                className="md:w-1/2"
                initial={{ opacity: 0, x: isEven ? 50 : -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
              >
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
                    transition={{ duration: 1.5 }}
                  >
                    <source src={feature.videoUrl} type="video/mp4" />
                    Seu navegador não suporta video.
                  </motion.video>
                </div>
              </motion.div>
            </div>
          )
        })}
      </div>
    </section>
  )
}

export default FeatureSection;