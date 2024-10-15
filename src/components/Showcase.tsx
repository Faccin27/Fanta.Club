"use client"
import React from "react";
import { GetStaticProps } from "next";
import Head from "next/head";
import Header from "./Header";
import showcaseData from "@/data/showcase.json";
import { FaYoutube, FaTiktok } from 'react-icons/fa';

interface Video {
  id: string;
  title: string;
  author: string;
}

interface HomeProps {
  videos: Video[];
}

const VideoCard: React.FC<{ video: Video }> = ({ video }) => (
  <div className="bg-zinc-800 p-4 rounded-lg shadow-md mb-4">
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
    <p className="text-zinc-400">Postado por: <span className="font-bold text-orange-400 hover:underline cursor-pointer">{video.author}</span></p>
  </div>
);

const SocialMediaButtons: React.FC = () => {
  const [hoveredButton, setHoveredButton] = React.useState<string | null>(null);

  const buttons = [
    { name: 'YouTube', icon: FaYoutube, color: 'red' },
    { name: 'TikTok', icon: FaTiktok, color: 'pink' },
  ];

  return (
    <div className="flex">
      {buttons.map((button, index) => (
        <button
          key={button.name}
          onMouseEnter={() => setHoveredButton(button.name)}
          onMouseLeave={() => setHoveredButton(null)}
          className={`
            flex items-center justify-center
            py-2 px-4 text-sm font-medium
            transition-all duration-300 ease-in-out
            ${hoveredButton === button.name ? `bg-${button.color}-500 w-32` : `bg-zinc-900 w-12`}
            text-white hover:shadow-md
            ${index === 0 ? 'rounded-l-md' : ''}
            ${index === buttons.length - 1 ? 'rounded-r-md' : ''}
            hover:bg-orange-500
          `}
        >
          <button.icon className="text-xl" />
          {hoveredButton === button.name && (
            <span className="ml-2 whitespace-nowrap overflow-hidden transition-all duration-300 ease-in-out">
              {button.name}
            </span>
          )}
        </button>
      ))}
    </div>
  );
};

const Home: React.FC<HomeProps> = ({ videos }) => {
  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100">
      <Head>
        <title>YouTube Showcase</title>
        <meta name="description" content="Showcase of YouTube videos" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Header />
      
      <main className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold">Youtube showcase</h1>
          <SocialMediaButtons />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {videos.map((video) => (
            <VideoCard key={video.id} video={video} />
          ))}
        </div>
      </main>
    </div>
  );
};

export const getStaticProps: GetStaticProps = async () => {
  return {
    props: {
      videos: showcaseData.videos,
    },
  };
};

export default Home;