import React from "react";
import ArrowWIcon from "@/assets/icons/arrow-w.svg";
import cursorImage from "@/assets/images/cursor.png";
import messageImage from "@/assets/images/message.png";
import Image from "next/image";
import { motion} from "framer-motion";


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

export default Hero;