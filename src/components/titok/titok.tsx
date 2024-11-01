"use client";
import { motion } from "framer-motion";

export default function Tiktok() {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.5 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{
        duration: 0.8,
        delay: 0.5,
        ease: [0, 0.71, 0.2, 1.01],
      }}
      className="bg-zinc-800 p-4 rounded-lg shadow-md mb-4"
    >
      <iframe
        width="100%"
        height="315"
        src={`https://www.tiktok.com/en/`}
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      ></iframe>
      <h2 className="text-xl font-bold mt-2">Tik Tok Showcases</h2>
      <p className="text-zinc-400">
        Postado por:{" "}
        <span className="font-bold text-orange-400 hover:underline cursor-pointer">
          Made By Big Dick
        </span>
      </p>
    </motion.div>
  );
}
