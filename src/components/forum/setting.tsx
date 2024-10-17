"use client";
import React from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import {
  Settings as SettingsIcon,
  XCircle,
  ArrowLeft as BackIcon,
  Download as DownloadIcon
} from "lucide-react";
import pfp from "@/assets/images/pfp.png";
import Header from "@/components/Header";
import Aside from "@/components/Aside";

interface Author {
  name: string;
  image: string;
}

interface Setting {
  id: number;
  title: string;
  author: Author;
  date: string;
  content: string;
  jsonUrl: string;
}

const getSettingById = (id: string | number): Setting | undefined => {
  const settings: Setting[] = [
    {
      id: 1,
      title: "Nova configuração de aimbot disponível",
      author: {
        name: "ConfigMaster",
        image: pfp.src,
      },
      date: "15/10/2023",
      content:
        "Lançamos uma nova configuração de aimbot otimizada para o mapa mais recente. Esta configuração oferece melhor precisão em áreas abertas e ajuste fino para combates de curta distância. Baixe o arquivo de configuração abaixo e siga as instruções de instalação no nosso fórum.",
      jsonUrl: "/api/settings/aimbot-config-v2.json"
    },
  ];

  return settings.find((setting) => setting.id === Number(id));
};

export interface SettingDetailProps {
  id: string;
}

const SettingDetail: React.FC<SettingDetailProps> = ({ id }) => {
  const router = useRouter();
  const [setting, setSetting] = React.useState<Setting | undefined>(undefined);

  React.useEffect(() => {
    const fetchedSetting = getSettingById(id);
    setSetting(fetchedSetting);
  }, [id]);

  const handleDownload = () => {
    if (setting) {
      const link = document.createElement('a');
      link.href = setting.jsonUrl;
      link.download = `setting-${setting.id}.json`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

  if (!setting) {
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
              Configuração não encontrada
            </h1>
          </div>
          <div className="bg-zinc-800 shadow-lg rounded-lg p-6">
            <div className="mt-6">
              <p className="text-zinc-300 leading-relaxed">
                Ops, parece que você foi enganado. Esta configuração não está disponível!
              </p>
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
          <SettingsIcon className="mr-2 text-yellow-500" />
          <h1 className="text-3xl font-bold text-zinc-300">
            Detalhes da Configuração
          </h1>
        </div>
        <div className="bg-zinc-800 shadow-lg rounded-lg p-6">
          <div className="flex items-center mb-6">
            <Image
              src={setting.author.image}
              alt={`${setting.author.name}'s profile picture`}
              width={60}
              height={60}
              className="rounded-full mr-4"
            />
            <div>
              <h2 className="text-2xl text-orange-400 font-semibold mb-1">
                {setting.title}
              </h2>
              <p className="text-sm text-zinc-400">
                Por:{" "}
                <span className="text-orange-300 cursor-pointer hover:underline">
                  {setting.author.name}{" "}
                </span>{" "}
                • {setting.date}
              </p>
            </div>
          </div>
          <div className="mt-6">
            <p className="text-zinc-300 leading-relaxed mb-4">
              {setting.content}
            </p>
            <button
              onClick={handleDownload}
              className="flex items-center bg-orange-500 hover:bg-orange-600 text-white font-bold py-2 px-4 rounded transition-colors"
            >
              <DownloadIcon className="mr-2" />
              Baixar Config
            </button>
          </div>
        </div>
      </main>
      <Aside />
    </div>
  );
};

export default SettingDetail;