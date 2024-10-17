import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Settings as SettingsIcon } from 'lucide-react';
import pfp from "@/assets/images/pfp.png";

interface Author {
  name: string;
  image: string;
}

interface Post {
  id: number;
  title: string;
  author: Author;
  date: string;
}

const posts: Post[] = [
  {
    id: 1,
    title: "Aim color settings",
    author: {
      name: "Usuário 32",
      image: pfp.src,
    },
    date: "31/02/2023"
  },
  {
    id: 2,
    title: "Keyboard shortcuts customization",
    author: {
      name: "Gamer Pro",
      image: pfp.src,
    },
    date: "15/03/2023"
  },
  {
    id: 3,
    title: "Audio settings for competitive play",
    author: {
      name: "SoundMaster",
      image: pfp.src,
    },
    date: "02/04/2023"
  },
  {
    id: 4,
    title: "Graphics optimization guide",
    author: {
      name: "FPSWizard",
      image: pfp.src,
    },
    date: "18/04/2023"
  }
];

const Settings: React.FC = () => {
  return (
    <div className="p-4">
      <div className="flex items-center mb-6">
        <SettingsIcon className="mr-2" />
        <h1 className="text-2xl font-bold">Configurações</h1>
      </div>
      <div className="space-y-4">
        {posts.map((post) => (
          <div key={post.id} className="bg-zinc-700 shadow rounded-lg p-4">
            <div className="flex items-center mb-2">
              <Image
                src={post.author.image}
                alt={`${post.author.name}'s profile picture`}
                width={40}
                height={40}
                className="rounded-full mr-3"
              />
              <div>
                <Link href={`/forum/settings/${post.id}`}>
                  <h2 className="text-lg text-orange-500 hover:underline cursor-pointer font-semibold">
                    {post.title}
                  </h2>
                </Link>
                <p className="text-sm text-gray-400">
                  Por: {post.author.name} em {post.date}
                </p>
              </div>
            </div>
            <Link href={`/forum/settings/${post.id}`}>
              <p className="text-sm text-gray-300 cursor-pointer hover:underline">
                Clique para ver mais detalhes sobre "{post.title}"
              </p>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Settings;
