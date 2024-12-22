"use client";
import pfp from "@/assets/images/pfp.png";
import Aside from "@/components/Aside";
import {
  ArrowLeft as BackIcon,
  XCircle
} from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { Type } from "./updates";

interface Author {
  name: string;
  image: string;
}
interface Updates {
  id: number;
  title: string;
  content: string;
  type: Type;
  createdAt: string | number | bigint | boolean | null | undefined;
  createdById: number;
  createdByPhoto:string | undefined;
  createdByName: string | undefined;
}


interface IdInt{
  id:number
}
function UpdateDetail({id}:IdInt) {
  const router = useRouter();
  const [updates, setUpdate] = useState<Updates | null>(null);

  useEffect(() => {
    const fetchUpdates = async () => { 
      try{
        const response = await fetch(`http://localhost:3535/announcements/${id}`)
        const result:Updates = await response.json();
        setUpdate(result);
      } catch(err){
        throw new Error(`Erro para efetuar o fetch dos Updates. Erro: ${err}`);
      };
    };
    fetchUpdates();
    
  }, []);


  if(!updates) {
    return (
      <div className="min-h-screen bg-zinc-950 text-zinc-100">
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
              src={updates?.createdByPhoto || pfp}
              alt={`${updates?.createdByName}'s profile picture`}
              width={60}
              height={60}
              className="rounded-full mr-4"
            />
            <div>
              <h2 className="text-2xl text-orange-400 font-semibold mb-1">
                {updates?.title}
              </h2>
              <p className="text-sm text-zinc-400">
                Por:{" "}
                <span className="text-orange-300 cursor-pointer hover:underline">
                  {updates?.createdByName}
                </span>{" "}
                • {updates?.createdAt}
              </p>
            </div>
          </div>
          <div className="mt-6">
          <div
              className="prose prose-h1:text-orange-600 prose-p:text-orange-400 prose-img:max-w-52"
            dangerouslySetInnerHTML={{__html: updates.content}}
              />
          </div>
        </div>
      </main>
      <Aside />
    </div>
  )
};

export default UpdateDetail;