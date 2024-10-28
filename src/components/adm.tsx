"use client";
import { motion } from "framer-motion";
import Link from "next/link";
import React, { useRef, useState } from "react";
import Image from "next/image";
import PFP from "@/assets/images/pfp.png";
import { useRouter } from "next/navigation";
import Data1 from "@/data/atividade.json";
import Aside from "./Aside";
import { UserIcon } from "lucide-react";

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
  plano: string;
}

const getRoleStyles = (role: string) => {
  switch (role) {
    case "FANTA":
      return "font-bold animate-pulse bg-gradient-to-r from-red-500 via-yellow-500 to-orange-500 text-transparent bg-clip-text";
    case "Moderator":
      return "text-purple-400 font-bold";
    case "Premium":
      return "text-orange-400 font-bold";
    default:
      return "text-zinc-400 font-bold";
  }
};

export default function AdmComponent({ user }: { user: User }) {
  const atividade: Atividade[] = Data1;

  return (
    <div className="min-h-screen bg-zinc-900 text-zinc-100">
    <div className="p-8 font-sans">
     <motion.h1
       initial={{ opacity: 0, x: -50 }}
       animate={{ opacity: 1, x: 0 }}
       transition={{ delay: 0.1, duration: 0.5 }}
       className="text-left text-3xl font-bold tracking-tighter sm:text-3xl text-orange-400"
     >
       Área de Adiministração
     </motion.h1>
     </div>
     <main>

     <div className="container mx-auto px-4 -mt-16">
            <div className="text-center">
              <Image
                src={user?.photo || PFP}
                alt="profile picture"
                width={128}
                height={128}
                className="mx-auto h-32 w-32 rounded-full border-2 border-orange-500 shadow-lg sm:h-24 sm:w-24"
              />
              <div className="mt-4 flex items-center justify-center">
                <h1 className="text-lg font-bold mb-2 block sm:text-base">
                  {user?.name}
                </h1>
              </div>
              <div className="mt-2 flex items-center justify-center">
                <UserIcon className="mr-2 h-4 w-4 text-zinc-400" />
                <span className={getRoleStyles(user?.role)}>{user?.role}</span>
              </div>
      </div>
      </div>
     </main>
        <br />
        <section
        >
          <div className="overflow-x-auto">
            <table className="min-w-full border-collapse rounded-lg overflow-hidden shadow-xl text-left">
              <thead className="bg-gradient-to-r from-orange-500 via-orange-700 to-orange-400 text-white font-semibold">
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
                  <th className="px-4 py-2 border-b border-zinc-800">Plano</th>
                  <th className="px-4 py-2 border-b border-zinc-800">
                    Área Perigosa
                  </th>
                </tr>
              </thead>
              {atividade.map(({nome,user_id,email,current_activity,duration,plano},index)=>(
                <tbody key={index} className="">
                <tr className="bg-zinc-800 transition-colors">
                  <td className="px-4 py-2 border-b border-zinc-800">
                    <Link
                      href={`/me/:${user?.id}`}
                      target="_blank"
                      className=" text-orange-600  font-medium  hover:text-orange-700 transition-colors"
                    >
                      {nome}
                    </Link>
                  </td>
                  <td className="px-4 py-2 border-b border-zinc-800">
                    {user_id}
                  </td>
                  <td className="px-4 py-2 border-b border-zinc-800">
                    {email}
                  </td>
                  <td className="px-4 py-2 border-b border-zinc-800">
                    {current_activity}
                  </td>
                  <td className="px-4 py-2 border-b border-zinc-800">
                    {duration}
                  </td>
                  <td className="px-4 py-2 border-b border-zinc-800">
                    <p className=" text-green-400  font-medium  hover:text-green-600 transition-colors">
                      {plano}
                    </p>
                  </td>
                  <td>
                    <button className=" text-orange-600  font-medium  hover:text-red-800  transition-colors">
                      Deletar usuário
                    </button>
                  </td>
                </tr>
              </tbody>
              ))}
              
            </table>
          </div>
          <br />
          <div className="flex justify-center">
            <motion.button 
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.3 }}
            className="rounded-lg bg-orange-500 px-5 py-3 font-medium text-zinc-900 hover:bg-green-600 transition-colors">
              Gerar Cupom
            </motion.button>
          </div>
        </section>
      </div>
  );
}
