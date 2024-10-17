import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { RefreshCw as UpdatesIcon } from 'lucide-react';
import pfp from "@/assets/images/pfp.png";

interface Author {
  name: string;
  image: string;
}

interface Update {
  id: number;
  title: string;
  author: Author;
  date: string;
}

const updates: Update[] = [
  {
    id: 1,
    title: "Atualização de segurança para evitar banimentos",
    author: {
      name: "DevTeam",
      image: pfp.src,
    },
    date: "01/09/2023"
  },
  {
    id: 2,
    title: "Aimbot otimizado para headshots com maior precisão",
    author: {
      name: "AimMaster",
      image: pfp.src,
    },
    date: "10/09/2023"
  },
  {
    id: 3,
    title: "Wallhack atualizado para compatibilidade com novos mapas",
    author: {
      name: "MapPro",
      image: pfp.src,
    },
    date: "15/09/2023"
  },
  {
    id: 4,
    title: "Correção de bugs e melhoria de desempenho do radar hack",
    author: {
      name: "CheatFixer",
      image: pfp.src,
    },
    date: "22/09/2023"
  }
];

const Updates: React.FC = () => {
  return (
    <div className="p-4">
      <div className="flex items-center mb-6">
        <UpdatesIcon className="mr-2" />
        <h1 className="text-2xl font-bold">Atualizações</h1>
      </div>
      <div className="space-y-4">
        {updates.map((update) => (
          <div key={update.id} className="bg-zinc-700 shadow rounded-lg p-4">
            <div className="flex items-center mb-2">
              <Image
                src={update.author.image}
                alt={`${update.author.name}'s profile picture`}
                width={40}
                height={40}
                className="rounded-full mr-3"
              />
              <div>
                <Link href={`/forum/updates/${update.id}`}>
                  <h2 className="text-lg text-orange-500 hover:underline cursor-pointer font-semibold">
                    {update.title}
                  </h2>
                </Link>
                <p className="text-sm text-gray-400">
                  Por: {update.author.name} em {update.date}
                </p>
              </div>
            </div>
            <Link href={`/forum/updates/${update.id}`}>
              <p className="text-sm text-gray-300 cursor-pointer hover:underline">
                Clique para ver mais detalhes sobre "{update.title}"
              </p>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Updates;
