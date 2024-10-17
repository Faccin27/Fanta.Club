"use client";
import React from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import {
  XCircle,
  ArrowLeft as BackIcon,
  Download as DownloadIcon,
} from "lucide-react";
import pfp from "@/assets/images/pfp.png";
import Header from "@/components/Header";
import Aside from "@/components/Aside";

interface Author {
  name: string;
  image: string;
}

interface Update {
  id: number;
  title: string;
  author: Author;
  date: string;
  description: string;
  downloadUrl: string;
}

const getUpdateById = (id: string | number): Update | undefined => {
  const updates: Update[] = [
    {
      id: 1,
      title: "Nova Atualização Hack Valorant - Versão 3.0",
      author: {
        name: "HackMaster",
        image: pfp.src,
      },
      date: "10/10/2023",
      description:
        "A versão 3.0 do hack de Valorant inclui melhorias significativas no aimbot, correções de bugs e novas funcionalidades para o modo 'Ghost'. Certifique-se de baixar a atualização abaixo e seguir as instruções de instalação.",
      downloadUrl: "/api/updates/valorant-hack-v3.json",
    },
    // Adicione mais atualizações conforme necessário
  ];

  return updates.find((update) => update.id === Number(id));
};

export interface UpdateDetailProps {
  id: string;
}

const UpdateDetail: React.FC<UpdateDetailProps> = ({ id }) => {
  const router = useRouter();
  const [update, setUpdate] = React.useState<Update | undefined>(undefined);

  React.useEffect(() => {
    const fetchedUpdate = getUpdateById(id);
    setUpdate(fetchedUpdate);
  }, [id]);

  if (!update) {
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
              Atualização não encontrada
            </h1>
          </div>
          <div className="bg-zinc-800 shadow-lg rounded-lg p-1">
            <div className="flex items-center mb-6">
              <div className="mt-6">
                <p className="text-zinc-300 leading-relaxed ml-6">
                  Oops, parece que voce foi enganado, esta atualização não esta
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
          <h1 className="text-3xl font-bold text-zinc-300">
            Detalhes da Atualização
          </h1>
        </div>
        <div className="bg-zinc-800 shadow-lg rounded-lg p-6">
          <div className="flex items-center mb-6">
            <Image
              src={update.author.image}
              alt={`${update.author.name}'s profile picture`}
              width={60}
              height={60}
              className="rounded-full mr-4"
            />
            <div>
              <h2 className="text-2xl text-orange-400 font-semibold mb-1">
                {update.title}
              </h2>
              <p className="text-sm text-zinc-400">
                Por:{" "}
                <span className="text-orange-300 cursor-pointer hover:underline">
                  {update.author.name}
                </span>{" "}
                • {update.date}
              </p>
            </div>
          </div>
          <div className="mt-6">
            <p className="text-zinc-300 leading-relaxed mb-4">
              {update.description}
            </p>
          </div>
        </div>
      </main>
      <Aside />
    </div>
  );
};

export default UpdateDetail;
