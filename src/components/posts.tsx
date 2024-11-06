"use client";
import { motion } from "framer-motion";
import ReactQuill from "react-quill";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { User as UserIcon } from "lucide-react";
import PFP from "@/assets/images/pfp.png";
import { useRouter } from "next/navigation";
import "react-quill/dist/quill.snow.css"; // ou o tema que você está usando
import Aside from "./Aside";
import { useTranslation } from "react-i18next";

interface User {
  id: number;
  name: string;
  email: string;
  photo: string | null;
  registeredDate: string;
  role: string;
}

interface PostProps {
  loggedUser: User | null;
}


interface Order {
  id: number;
  name: string;
  price: number;
  expiration: string;
  createdAt: string;
  userId: number;
  expirationDate: string;
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


//Depois colocar isso: ////////////////////////////////
//{loggedUser}:PostProps
////////////////////////////////

  export default function Post() {
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



  const handleSubmitForm = (evento: React.FormEvent<HTMLFormElement>) => {
    //Aqui vai ficar o fetch
    alert("Fazendo a publicação do anúncio");
  };


  const {t} = useTranslation()
  const [anuncioP, setAnuncioP] = useState<string>("");
  const [anuncioT, setAnuncioT] = useState<string>("");
  const [anuncio, setAnuncio] = useState();
  const [atualizacao, setAtualizacao] = useState();
  const [configs, setConfigs] = useState();
  return (
    <div className="min-h-screen bg-zinc-900 text-zinc-100">
      <div className="p-8 font-sans">
        <motion.h1
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.1, duration: 0.5 }}
          className="text-left text-3xl font-bold tracking-tighter sm:text-3xl text-orange-400"
        >
        {t("translation.posts_header")}
        </motion.h1>
      </div>
      <main>
        <div className="relative">
          <div className="h-40"></div>
        </div>
        <div className="container mx-auto px-4 -mt-16">
          <div className="text-center">
            <div className="bg-zinc-800 z-50">
              <motion.form
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{
                  duration: 0.8,
                  delay: 0.5,
                  ease: [0, 0.71, 0.2, 1.01],
                }}
                onSubmit={handleSubmitForm}
              >
                <div className="mt-6 bg-gradient-to-r from-orange-400 to-orange-600 rounded-xl shadow-lg p-6">
                  <div className="mb-4">
                    <h2 className="text-lg font-bold mb-2 block">{t("translation.posts_title")}</h2>
                    <input
                      required
                      type="text"
                      value={anuncioT}
                      onChange={(evento) => setAnuncioT(evento.target.value)}
                      placeholder={t("translation.posts_place")}
                      className="w-full bg-zinc-800 rounded-lg p-3 outline-none border border-zinc-700 focus:border-orange-500 text-white sm:p-2"
                    />
                  </div>
                  <h2 className="text-lg font-bold mb-2 block">{t("translation.posts_content")}</h2>
                  <div>
                    <motion.div 
                      initial={{ opacity: 0, scale: 0.5 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{
                        duration: 0.9,
                        ease: [0, 0.71, 0.2, 1.01], 
                        scale: {
                          type: "spring",
                          damping: 5,
                          stiffness: 100,
                          restDelta: 0.001,
                        },
                      }}
                      className="min-w-100 mb-32"
                    >
                      <ReactQuill
                        modules={{
                          toolbar: {
                            container: toolbarOptions,
                          },
                        }}
                        theme="snow"
                        value={anuncioP}
                        onChange={setAnuncioP}
                        className="quill-editor custom-toolbar text-white h-auto border-orange-500 bg-zinc-900"
                        style={{ minWidth: "auto", minHeight: "auto" }}
                      />
                    </motion.div>
                    <div className="mb-12">
                      <h2 className="text-lg font-bold mb-2 block">
                      {t("translation.posts_type")}
                      </h2>
                      <div>
                        <select
                          name="Tipo do anúncio"
                          id="opcoes"
                          className="rounded-lg bg-zinc-900 px-5 py-3 font-medium text-white transition-colors sm:px-4 sm:py-2"
                          required
                        >
                          <option value={anuncio}>Announcements</option>
                          <option value={atualizacao}>Updates</option>
                          <option value={configs}>Configs</option>
                        </select>
                      </div>
                    </div>
                  </div>
                  <motion.button
                    initial={{ opacity: 0, y: -50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 3 }}
                    type="submit"
                    className="bg-zinc-900 shadow-2xl rounded-lg sm:px-4 sm:py-2 hover:bg-orange-400"
                  >
                    {t("translation.posts_post")}
                  </motion.button>
                </div>
              </motion.form>
            </div>
          </div>
        </div>
      </main>
      <Aside />
    </div>
  );
}
