"use client";
import Link from "next/link";
import React, { useRef, useState } from "react";
import Image from "next/image";
import PFP from "@/assets/images/pfp.png";
import { useRouter } from "next/navigation";
import Data1 from "@/data/atividade.json";

interface User {
  id: number;
  name: string;
  email: string;
  photo: string | null;
  registeredDate: string;
  role: string;
}

interface Atividade {
  nome: string;
  user_id: string;
  current_activity: string;
  start_time: string;
  duration: string;
  email: string;
  plano:string
}

export default function AdmComponent({ user }: { user: User }) {
  const atividade: Atividade = Data1;

  return (
    <div className="min-h-screen bg-zinc-900 text-zinc-100">
      <h2 className="h-12">{user?.name}</h2>
      <div className="flex justify-center flex-col md:flex-row">
        <div className="flex-shrink-0">

        <Image
          src={user?.photo || PFP}
          alt={user?.name}
          className="mx-auto h-32 w-32 rounded-full border-2 border-orange-500 shadow-lg"
        />
        </div>
      </div>
      <div>
        <br />
        <section>
          <div className="overflow-x-auto">
            <table className="min-w-full border-collapse rounded-lg overflow-hidden shadow-lg text-left">
              <thead className="bg-orange-500 text-zinc-900 font-semibold">
                <tr>
                  <th className="px-4 py-2 border-b border-zinc-800">Nome</th>
                  <th className="px-4 py-2 border-b border-zinc-800">Id</th>
                  <th className="px-4 py-2 border-b border-zinc-800">Email</th>
                  <th className="px-4 py-2 border-b border-zinc-800">
                    Atividade Atual
                  </th>
                  <th className="px-4 py-2 border-b border-zinc-800">
                  Duração
                  </th>
                  <th className="px-4 py-2 border-b border-zinc-800">
                  Plano
                  </th>
                  <th className="px-4 py-2 border-b border-zinc-800">
                    Área Perigosa
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr className="bg-zinc-800  transition-colors">
                  <td className="px-4 py-2 border-b border-zinc-800">
                  <Link 
                  href={`/me/:${user?.id}`}
                  target="_blank"
                  className=" text-orange-600  font-medium  hover:text-orange-400 transition-colors">
                    {atividade.nome}
                    </Link>
                  </td>
                  <td className="px-4 py-2 border-b border-zinc-800">
                    {atividade.user_id}
                  </td>
                  <td className="px-4 py-2 border-b border-zinc-800">
                    {atividade.email}
                  </td>
                  <td className="px-4 py-2 border-b border-zinc-800">
                    {atividade.current_activity}
                  </td>
                  <td className="px-4 py-2 border-b border-zinc-800">
                    {atividade.duration}
                  </td>
                  <td className="px-4 py-2 border-b border-zinc-800">
                    <p className=" text-green-600  font-medium  hover:text-green-400 transition-colors">

                    {atividade.plano}
                    </p>
                  </td>
                  <td>
                    <button  className=" text-orange-600  font-medium  hover:text-orange-400 transition-colors">
                      Deletar usuário
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>
      </div>
    </div>
  );
}
