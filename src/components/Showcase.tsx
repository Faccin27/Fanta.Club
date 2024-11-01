"use client";

import showcaseData from "@/data/showcase.json";
import { motion } from "framer-motion";
import { GetStaticProps } from "next";
import Head from "next/head";
import Link from 'next/link';
import React from "react";
import { FaTiktok, FaYoutube } from "react-icons/fa";
import Aside from "./Aside";
import { VideoCard } from "./youtube/youtube";
import Tiktok from "./titok/titok";

interface VideoProps {
  id: string;
  title: string;
  author: string;
  thumbnail?: string;
  url?: string;
}

interface HomeProps {
  videos: VideoProps[];
}

type SocialTab = 'youtube' | 'tiktok';

const SocialMediaButton: React.FC<{
  name: string;
  icon: React.ElementType;
  isActive: boolean;
  onClick: () => void;
  ariaLabel: string;
}> = ({ name, icon: Icon, isActive, onClick, ariaLabel }) => {
  return (
    <button
      onClick={onClick}
      aria-label={ariaLabel}
      className={`
        group
        flex items-center justify-center
        py-2 px-4 text-sm font-medium
        transition-all duration-300 ease-in-out
        ${isActive ? 'bg-orange-500' : 'bg-zinc-900'}
        text-white hover:shadow-md
        hover:bg-orange-400
        min-w-[3rem]
        ${name === 'YouTube' ? 'rounded-l-md' : 'rounded-r-md'}
      `}
    >
      <Icon className="text-xl" />
      <span className="max-w-0 overflow-hidden whitespace-nowrap transition-all duration-300 group-hover:max-w-xs group-hover:ml-2">
        {name}
      </span>
    </button>
  );
};

const SocialMediaButtons: React.FC<{
  activeTab: SocialTab;
  onTabChange: (tab: SocialTab) => void;
}> = ({ activeTab, onTabChange }) => {
  const buttons = [
    {
      name: "YouTube",
      icon: FaYoutube,
      tab: 'youtube' as const,
      ariaLabel: "Mostrar vídeos do YouTube"
    },
    {
      name: "TikTok",
      icon: FaTiktok,
      tab: 'tiktok' as const,
      ariaLabel: "Mostrar vídeos do TikTok"
    }
  ];

  return (
    <div className="flex" role="tablist">
      {buttons.map((button) => (
        <SocialMediaButton
          key={button.name}
          name={button.name}
          icon={button.icon}
          isActive={activeTab === button.tab}
          onClick={() => onTabChange(button.tab)}
          ariaLabel={button.ariaLabel}
        />
      ))}
    </div>
  );
};

const EmptyState: React.FC<{ message: string }> = ({ message }) => (
  <div className="flex justify-center items-center h-64 text-zinc-400">
    <p>{message}</p>
  </div>
);

const VideoGrid: React.FC<{ videos: VideoProps[] }> = ({ videos }) => (
  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
    {videos.map((video) => (
      <VideoCard key={video.id} video={video} />
    ))}
  </div>
);

const Home: React.FC<HomeProps> = ({ videos }) => {
  const [activeTab, setActiveTab] = React.useState<SocialTab>('youtube');

  const content = React.useMemo(() => {
    if (activeTab === 'youtube') {
      return videos && videos.length > 0 ? (
        <VideoGrid videos={videos} />
      ) : (
        <EmptyState message="Nenhum vídeo do YouTube disponível" />
      );
    }
    return <Tiktok />;
  }, [activeTab, videos]);

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100">
      <Head>
        <title>Social Media Showcase</title>
        <meta name="description" content="Showcase of social media content" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-6">
          <motion.h1
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1, duration: 0.5 }}
            className="text-left text-3xl font-bold tracking-tighter sm:text-3xl"
          >
            <span
              className="relative text-orange-400 font-semibold 
                hover:after:w-full"
            >
              Social Media
            </span>
            <br />
            <span className="text-orange-400">Showcases</span>
          </motion.h1>

          <SocialMediaButtons
            activeTab={activeTab}
            onTabChange={setActiveTab}
          />
        </div>

        {content}
      </main>
      <Aside />
    </div>
  );
};

export const getStaticProps: GetStaticProps = async () => {
  try {
    if (!showcaseData?.videos?.length) {
      throw new Error('No videos found');
    }

    return {
      props: {
        videos: showcaseData.videos,
      },
      revalidate: 3600, // Revalidate every hour
    };
  } catch (error) {
    console.error('Error loading videos:', error);
    return {
      props: {
        videos: [],
      },
      revalidate: 60, // Retry sooner if there was an error
    };
  }
};

export default Home;