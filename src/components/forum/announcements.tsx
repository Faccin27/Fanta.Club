import React, { useEffect, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { Bell as AnnouncementsIcon,
  Ellipsis as Options  } from "lucide-react";
import pfp from "@/assets/images/pfp.png";
import { useTranslation } from "react-i18next";
import { checkLoginStatus, User as AuthUser, User } from "@/utils/auth"; // Renomeado para evitar conflito
import DropdownComponent from "../Dropdown";

interface Author {
  name: string;
  image: string;
}


export enum Types{
  Announcements = "Announcements",
  Updates = "Updates",
  Configs = "Configs"
}
export interface Announcement {
  id: number;
  title: string;
  content: string;
  type: Types;
  createdAt: string | number | bigint | boolean | null | undefined;
  createdById: number;
  createdByPhoto:string | undefined;
  createdByName: string | undefined;
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



export default function Announcements() {
  const {t} = useTranslation()
  const [user, setUser] = useState<AuthUser | null>(null);
  const [identifier, setindentifier] = useState<number | undefined>(undefined);
  const [orders, setOrders] = useState<Order[]>([]);
  const [anuncios, setAnuncios] = useState<Announcement[] | undefined>(undefined);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [modalOptions, setModalOpitions] = useState<boolean>(false);
  const router = useRouter();



  useEffect(()=>{
    const fetchAnuncios = async () => {
      try{
        const response = await fetch("http://localhost:3535/anun/buscaType?type=Announcements");
        const result:Announcement[] = await response.json();
        setAnuncios(result);
        console.log("Anuncios recebidos")
      } catch(err){
        throw new Error(`Erro ao fazer o GET dos anuncios. Erro: ${err}`)
      };
    };
    fetchAnuncios();
  },[]);


  useEffect(() => {
    const fetchUserData = async () => {
      const { isLoggedIn, user } = await checkLoginStatus();
      setIsLoggedIn(isLoggedIn);
      setUser(user);
    };
    fetchUserData();
  }, []);

  const canPostAnnouncement = user && (user.role === 'FANTA' || user.role === 'Moderator');
  const canPostConfig = user && (user.role === "Premium");

  useEffect(() => {
    const fetchOrders = async () => {
      if (user) {
        try {
          const response = await fetch(
            `http://localhost:3535/users/orders/${user.id}`
          );
          if (!response.ok) {
            throw new Error("Failed to fetch orders");
          }
          const data = await response.json();
          setOrders(data); // Definindo as ordens corretamente
        } catch (error) {
          console.error("Error fetching orders:", error);
        }
      }
    };
    fetchOrders();
  }, [user]);



  return (
    <div className="p-4">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center">
          <AnnouncementsIcon className="mr-2" />
          <h1 className="text-2xl font-bold">{t("translation.anuncios")}</h1>
        </div>
        {canPostAnnouncement && (
          <div className="flex justify-between gap-4">
          
          <button
            className="rounded-lg bg-orange-500 px-5 py-3 font-medium text-zinc-900 hover:bg-orange-400 transition-colors"
            onClick={() => router.push("/post-anun")}
          >
            {t("translation.Post")}
          </button>
          </div>
        )}
      </div>
      <div className="space-y-4">
        {anuncios?.map((anuncio) => (
          <motion.div
          initial={{ opacity: 2, x: 60 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{
           duration: 0.5,
           delay: 0.1
         }}
            key={anuncio.id}
            className="bg-zinc-700 shadow rounded-lg p-4"
          >
            <div className="flex items-center mb-2">
                <Image
                src={anuncio.createdByPhoto || pfp}
                alt={`profile picture`}
                width={40}
                height={40}
                className="rounded-full mr-3"
              />
              <div>
                {user?.role === "Moderator" || user?.role === "FANTA" ?(
                   <DropdownComponent anunId={anuncio.id}/>
                ) : null}
           
                <Link href={`/forum/announcements/${anuncio.id}`}>
                  <h2 className="text-lg text-orange-500 hover:underline cursor-pointer font-semibold">
                    {anuncio.title}
                  </h2>
                </Link>
                <p className="text-sm text-gray-400">
                  Criado por:  <strong className='fonrt-bold text-orange-500'>{anuncio.createdByName}</strong> no horário: {anuncio.createdAt}
                </p>
              </div>
            </div>
            <Link href={`/forum/announcements/${anuncio.id}`}>
              <p className="text-sm text-gray-300 cursor-pointer hover:underline">
                Clique para ver mais detalhes sobre "{anuncio.title}"
              </p>
            </Link>
          </motion.div>
        ))}
      </div>
      </div>
  );
}