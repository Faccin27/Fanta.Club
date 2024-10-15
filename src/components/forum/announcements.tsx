import React from 'react';
import Image from 'next/image';
import { Bell as AnnouncementsIcon } from 'lucide-react';
import pfp from "@/assets/images/pfp.png";

interface Author {
  name: string;
  image: string;
}

interface Announcement {
  id: number;
  title: string;
  author: Author;
  date: string;
}

const announcements: Announcement[] = [
  {
    id: 1,
    title: "Novo hack de mira lançado!",
    author: {
      name: "DevHacker",
      image: pfp.src,
    },
    date: "01/10/2023"
  },
  {
    id: 2,
    title: "Atualização no wallhack para evitar bans",
    author: {
      name: "AntiBanMaster",
      image: pfp.src,
    },
    date: "05/10/2023"
  },
  {
    id: 3,
    title: "Lançamento do hack de recoil perfeito",
    author: {
      name: "RecoilExpert",
      image: pfp.src,
    },
    date: "10/10/2023"
  },
  {
    id: 4,
    title: "Desconto de 20% em todos os hacks durante o fim de semana!",
    author: {
      name: "ValorantHacksStore",
      image: pfp.src,
    },
    date: "12/10/2023"
  }
];

const Announcements: React.FC = () => {
  return (
    <div className="p-4">
      <div className="flex items-center mb-6">
        <AnnouncementsIcon className="mr-2" />
        <h1 className="text-2xl font-bold">Anúncios</h1>
      </div>
      <div className="space-y-4">
        {announcements.map((announcement) => (
          <div key={announcement.id} className="bg-zinc-700 shadow rounded-lg p-4">
            <div className="flex items-center mb-2">
              <Image
                src={announcement.author.image}
                alt={`${announcement.author.name}'s profile picture`}
                width={40}
                height={40}
                className="rounded-full mr-3"
              />
              <div>
                <h2 className="text-lg text-orange-500 hover:underline cursor-pointer font-semibold">{announcement.title}</h2>
                <p className="text-sm text-gray-400">
                  Por: {announcement.author.name} em {announcement.date}
                </p>
              </div>
            </div>
            <p className="text-sm text-gray-300 cursor-pointer hover:underline">
              Clique para ver mais detalhes sobre "{announcement.title}"
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Announcements;
