"use client";
import { motion } from "framer-motion";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css"; // ou o tema que você está usando
import Aside from "./Aside";
import { useTranslation } from "react-i18next";
import { api } from "@/utils/api";
import { ApiError } from "next/dist/server/api-utils";
import { checkLoginStatus } from "@/utils/auth";
import DOMPurify from "dompurify";
import { AdmComponentProps } from "./adm";
import { Announcement } from "./forum/announcements";

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

export default function UpdateAnun({ LogedUser }: AdmComponentProps) {
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

  const { t } = useTranslation();
  const [usere, setUsere] = useState<User | null>(null);
  const [title, setTitle] = useState<string>("");
  const [modal, setModal] = useState<boolean>(false);
  const [anun, setAnun] = useState<Announcement | null>(null);
  const [anunci, setAnunci] = useState<Announcement[] | null>(null);
  const [content, setContent] = useState<string>("");
  const [anuncio, setAnuncio] = useState<string>("");
  const [identifier, setIdentifier] = useState<number | undefined>(undefined);
  const [id, setId] = useState<number | undefined>(undefined);

  useEffect(() => {
    async function fetchUserData() {
      try {
        const { user } = await checkLoginStatus();
        setUsere(user);
        setIdentifier(usere?.id);
      } catch (err) {
        alert(err);
      }
    }

    fetchUserData();
  }, []);

  useEffect(() => {
    const handleFetchAnnouncement = async () => {
      try {
        const response = await fetch("http://localhost:3535/anun/");
        const result: Announcement | null = await response.json();
        setAnun(result);
      } catch (err) {
        throw new Error(`Não conseguimos efetuar o Fetch dos anúncios!`);
      }
    };
    handleFetchAnnouncement();
  }, []);

  useEffect(() => {
    const handleFetchAnnouncement = async () => {
      try {
        const response = await fetch("http://localhost:3535/anun/");
        const result: Announcement[] | null = await response.json();
        setAnunci(result);
      } catch (err) {
        throw new Error(`Não conseguimos efetuar o Fetch dos anúncios!`);
      }
    };
    handleFetchAnnouncement();
  }, []);

  useEffect(() => {
    console.log(`id: ${id}`);
  }, [id]);

  const handleSubmitForm = async (evento: React.FormEvent<HTMLFormElement>) => {
    evento.preventDefault();
    console.log(usere);

    try {
      await fetch(`http://localhost:3535/anun/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title: title,
          content: content,
        }),
      });
      console.log(title);
      console.log(id);
      alert("Postagem realizada com sucesso!");
      setTitle("");
      setContent("");
      await fetch(`http://localhost:3535/users/${usere?.id}/up`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          updating: false,
        }),
      });
    } catch (err) {
      alert(err);
      throw new Error(`We can't update the announcement here, error: ${err}`);
    }
  };

  return (
    <div className="min-h-screen bg-zinc-900 text-zinc-100">
      <div className="p-8 font-sans">
        <motion.h1
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.1, duration: 0.5 }}
          className="text-left text-3xl font-bold tracking-tighter sm:text-3xl text-orange-400"
        >
          {t("translation.updating")}
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
                <div className="mt-6 bg-zinc-800 rounded-xl shadow-2xl p-6 outline-none border  border-orange-500">
                  <div className="mb-4">
                    <h2 className="text-lg font-bold mb-2 block">
                      {t("translation.posts_title")}
                    </h2>
                    <input
                      required
                      type="text"
                      value={title}
                      onChange={(evento) => setTitle(evento.target.value)}
                      placeholder={t("translation.posts_place")}
                      className="w-full bg-zinc-800 rounded-lg sm:p-2 outline-none border border-zinc-200 text-white text-center"
                    />
                  </div>
                  <h2 className="text-lg font-bold mb-2 block">
                    {t("translation.posts_content")}
                  </h2>
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
                        value={content}
                        onChange={setContent}
                        className="quill-editor custom-toolbar text-white outline-none border-zinc-200  bg-zinc-800 h-40"
                        style={{ minWidth: "auto", minHeight: "auto" }}
                      />
                    </motion.div>
                    <div className="flex justify-center items-center">
                      <select
                        name="role"
                        id="role"
                        value={id}
                        onChange={(evento) =>
                          setId(Number(evento.target.value))
                        }
                        className="px-4 py-3 bg-[#1A1A1C] border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-400 transition-all mb-7"
                        required
                      >
                        <option value={0} className="text-zinc-400 font-bold">
                          {t("translation.role_modal")}
                        </option>

                        {anunci?.map((item) => (
                          <option
                            key={item.id}
                            value={item.id}
                            className="text-zinc-400 font-bold"
                          >
                            {item.title}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                  <motion.button
                    initial={{ opacity: 0, y: -50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 3 }}
                    type="submit"
                    className="bg-orange-600 shadow-2xl rounded-lg hover:bg-orange-400 px-8 py-2"
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
