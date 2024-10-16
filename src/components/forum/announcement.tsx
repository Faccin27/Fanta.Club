"use client";
import React from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import {
  Bell as AnnouncementsIcon,
  XCircle as CircleX,
  ArrowLeft as BackIcon,
  XCircle,
} from "lucide-react";
import pfp from "@/assets/images/pfp.png";
import Header from "@/components/Header";
import Aside from "@/components/Aside";


interface Author {
  name: string;
  image: string;
}

interface Announcement {
  id: number;
  title: string;
  author: Author;
  date: string;
  content: string;
}

const getAnnouncementById = (id: string | number): Announcement | undefined => {
  const announcements: Announcement[] = [
    {
      id: 1,
      title: "Novo hack de mira lançado!",
      author: {
        name: "DevHacker",
        image: pfp.src,
      },
      date: "01/10/2023",
      content:
        "Estamos animados para anunciar o lançamento do nosso mais recente hack de mira! Este hack oferece precisão incomparável e é praticamente indetectável. Características principais incluem ajuste automático de mira, previsão de movimento do alvo e compatibilidade com os últimos patches do jogo.",
    },
  ];

  return announcements.find((announcement) => announcement.id === Number(id));
};

export interface AnnouncementDetailProps {
  id: string;
}

const AnnouncementDetail: React.FC<AnnouncementDetailProps> = ({ id }) => {
  const router = useRouter();
  const [announcement, setAnnouncement] = React.useState<
    Announcement | undefined
  >(undefined);

  React.useEffect(() => {
    const fetchedAnnouncement = getAnnouncementById(id);
    setAnnouncement(fetchedAnnouncement);
  }, [id]);

  if (!announcement) {
    return (
      <div className="min-h-screen bg-zinc-950 text-zinc-100">
        <Header />
        <main className="container mx-auto px-4 py-8">
          <h1 className="text-4xl font-bold text-orange-400">Fórum Fanta</h1>

          <div className="flex items-center mb-8 mt-8">
            <button
              onClick={() => router.back()}
              className="mr-4 p-2 rounded-full hover:bg-zinc-800 bg-zinc-900 transition-colors"
            >
              <BackIcon className="w-6 h-6 text-zinc-100" />
            </button>
            <XCircle className="mr-2 text-yellow-500" />
            <h1 className="text-3xl font-bold text-red-400">
              Anuncio não encontrado
            </h1>
          </div>
          <div className="bg-zinc-800 shadow-lg rounded-lg p-1">
            <div className="flex items-center mb-6">
              <div className="mt-6">
                <p className="text-zinc-300 leading-relaxed ml-6">
                  Oops, parece que voce foi enganado, este anuncio não esta
                  disponivel !!!
                </p>
              </div>
            </div>
          </div>
        </main>
        <Aside />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100">
      <Header />
      <main className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold text-orange-400">Fórum Fanta</h1>

        <div className="flex items-center mb-8 mt-8">
          <button
            onClick={() => router.back()}
            className="mr-4 p-2 rounded-full hover:bg-zinc-800 bg-zinc-900 transition-colors"
          >
            <BackIcon className="w-6 h-6 text-zinc-100" />
          </button>
          <AnnouncementsIcon className="mr-2 text-yellow-500" />
          <h1 className="text-3xl font-bold text-zinc-300">
            Detalhes do Anúncio
          </h1>
        </div>
        <div className="bg-zinc-800 shadow-lg rounded-lg p-6">
          <div className="flex items-center mb-6">
            <Image
              src={announcement.author.image}
              alt={`${announcement.author.name}'s profile picture`}
              width={60}
              height={60}
              className="rounded-full mr-4"
            />
            <div>
              <h2 className="text-2xl text-orange-400 font-semibold mb-1">
                {announcement.title}
              </h2>
              <p className="text-sm text-zinc-400">
                Por:{" "}
                <span className="text-orange-300 cursor-pointer hover:underline">
                  {announcement.author.name}{" "}
                </span>{" "}
                • {announcement.date}
              </p>
            </div>
          </div>
          <div className="mt-6">
            <p className="text-zinc-300 leading-relaxed">
              {announcement.content}
            </p>
          </div>
        </div>
      </main>
      <Aside />
    </div>
  );
};

export default AnnouncementDetail;
