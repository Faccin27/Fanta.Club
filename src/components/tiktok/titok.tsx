"use client";
import React from "react";
import { motion } from "framer-motion";
import Script from "next/script";

declare global {
  interface Window {
    TikTok?: {
      reloadEmbeds: () => void;
    };
  }
}

const tiktokVideos = [
  {
    id: "7424521184978636037",
    username: "fiftycheat",
    postedBy: "fiftycheat",
  },
  {
    id: "7427475777320422662",
    username: "fiftycheat",
    postedBy: "fiftycheat",
  },
  {
    id: "7425364718480657670",
    username: "estouraxota",
    postedBy: "estouraxota",
  },
];

export default function Tiktok() {
  React.useEffect(() => {
    if (window.TikTok) {
      window.TikTok.reloadEmbeds();
    }
  }, []);

  return (
    <>
      <Script src="https://www.tiktok.com/embed.js" strategy="lazyOnload" />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {tiktokVideos.map((video) => (
          <motion.div
            key={video.id}
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{
              duration: 0.8,
              delay: 0.5,
              ease: [0, 0.71, 0.2, 1.01],
            }}
            className="bg-zinc-800 p-4 rounded-lg shadow-md"
          >
            <blockquote
              className="tiktok-embed w-full"
              cite={`https://www.tiktok.com/@%${video.username}/video/${video.id}`}
              data-video-id={video.id}
            >
              <section>
                <a
                  target="_blank"
                  href={`https://www.tiktok.com/@${video.username}`}
                  rel="noopener"
                >
                  @{video.username}
                </a>
              </section>
            </blockquote>
            <p className="text-zinc-400">
              Postado por:{" "}
              <span className="font-bold text-orange-400 hover:underline cursor-pointer">
                {video.postedBy}
              </span>
            </p>
          </motion.div>
        ))}
      </div>
    </>
  );
}
