"use client";
import { motion } from "framer-motion";
import React from "react";

interface Video {
  id: string;
  title: string;
  author: string;
}
export const VideoCard: React.FC<{ video: Video }> = ({ video }) => (
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
      src={`https://www.youtube.com/embed/${video.id}`}
      title={video.title}
      frameBorder="0"
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
      allowFullScreen
    ></iframe>
    <h2 className="text-xl font-bold mt-2">{video.title}</h2>
    <p className="text-zinc-400">
      Postado por:{" "}
      <span className="font-bold text-orange-400 hover:underline cursor-pointer">
        {video.author}
      </span>
    </p>
  </motion.div>
);
