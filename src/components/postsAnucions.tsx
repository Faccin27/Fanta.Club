"use client";

import ReactQuill from "react-quill";
import React, { useRef, useState } from "react";
import Image from "next/image";
import { User as UserIcon } from "lucide-react";
import PFP from "@/assets/images/pfp.png";
import { useRouter } from "next/navigation";
import "react-quill/dist/quill.snow.css"; // ou o tema que você está usando

interface User {
  id: number;
  name: string;
  email: string;
  photo: string | null;
  registeredDate: string;
  role: string;
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

export default function PostAnucios({ user }: { user: User }) {
  //Funcionalidades do Quill:
  const toolbarOptions = [
    ["bold", "italic", "underline"], // toggled buttons
    ["blockquote", "code-block"],
    ["link", "image", "video"],

    [{ header: 1 }, { header: 2 }], // custom button values
    [{ list: "ordered" }, { list: "bullet" }, { list: "check" }],
    [{ script: "sub" }, { script: "super" }], // superscript/subscript
    [{ indent: "-1" }, { indent: "+1" }], // outdent/indent
    [{ direction: "rtl" }], // text direction

    [{ size: ["small", false, "large", "huge"] }], // custom dropdown
    [{ header: [1, 2, 3, 4, 5, 6, false] }],

    [{ color: [] }, { background: [] }], // dropdown with defaults from theme
    [{ font: [] }],
    [{ align: [] }],

    ["clean"], // remove formatting button
  ];

  const rota = useRouter();

  const handleSubmitForm = (evento: React.FormEvent<HTMLFormElement>) => {
    //Aqui vai ficar o fetch
    alert("Fazendo a publicação do anúncio");
    window.location.reload();
  };

  const [anuncioP, setAnuncioP] = useState<string>("");
  const [anuncioT, setAnuncioT] = useState<string>("");

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100">
      <main>
        <div className="relative">
          <div className="h-40"></div>
        </div>
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
            <br />
            <br />
            <form onSubmit={handleSubmitForm}>
              <div className="mt-6 bg-gradient-to-b from-orange-600 via-zinc-800 to-zinc-900 rounded-xl shadow-2xl p-6">
                <div className="mb-4">
                  <h2 className="text-lg font-bold mb-2 block">Título</h2>
                  <input
                    required
                    type="text"
                    value={anuncioT}
                    onChange={(evento) => setAnuncioT(evento.target.value)}
                    placeholder="Insira o título do post"
                    className="w-full bg-zinc-800 rounded-lg p-3 outline-none border border-zinc-700 focus:border-orange-500 text-white sm:p-2"
                  />
                </div>
                <h2 className="text-lg font-bold mb-2 block">Conteúdo</h2>
                <div>
                  <div className="min-w-100">
                    <ReactQuill
                      modules={{
                        toolbar: {
                          container: toolbarOptions,
                        },
                      }}
                      theme="snow"
                      value={anuncioP}
                      onChange={setAnuncioP}
                      className="quill-editor custom-toolbar text-white h-56 border-orange-500"
                      style={{ minWidth: "auto", minHeight: "auto" }}
                    />
                  </div>
                </div>
                <br />
                <br />
                <button
                  type="submit"
                  className="rounded-lg bg-orange-500 px-5 py-3 font-medium text-zinc-900 hover:bg-orange-400 transition-colors sm:px-4 sm:py-2"
                >
                  Postar Anúncio
                </button>
              </div>
            </form>
          </div>
        </div>
      </main>
    </div>
  );
}
