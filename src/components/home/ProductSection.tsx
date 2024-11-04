import React, { useRef,useState } from "react";
import appScreen from "@/assets/images/app-screen.png";
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import { useTranslation } from "react-i18next";


const ProductShowcase: React.FC = () => {
    const refImage = useRef<HTMLImageElement>(null);
  
  const { t, i18n } = useTranslation();
  const [currentLang, setCurrentLang] = useState(i18n.language);

  const handleChangeLanguage = () => {
      const newLang = currentLang === "en" ? "pt" : "en";
      i18n.changeLanguage(newLang);
      setCurrentLang(newLang);
  };
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
           {t("translation.fantaPro_v1")}
              {" "}
              <span className="text-orange-500 text-2xl font-bold">
                Fanta PRO
              </span>{", "}
              {t("translation.fantaPro_v2")}
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

export default ProductShowcase;