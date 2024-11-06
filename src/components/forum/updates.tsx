import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { RefreshCw as UpdatesIcon } from 'lucide-react';
import pfp from "@/assets/images/pfp.png";
import { useTranslation } from 'react-i18next';
import { checkLoginStatus, User as AuthUser } from "@/utils/auth"; 
import { useRouter } from 'next/navigation';
import { motion } from "framer-motion";

interface Author {
  name: string;
  image: string;
}

interface Update {
  id: number;
  title: string;
  author: Author;
  date: string;
}

const updates: Update[] = [
  {
    id: 1,
    title: "Atualização de segurança para evitar banimentos",
    author: {
      name: "DevTeam",
      image: pfp.src,
    },
    date: "01/09/2023"
  },
  {
    id: 2,
    title: "Aimbot otimizado para headshots com maior precisão",
    author: {
      name: "AimMaster",
      image: pfp.src,
    },
    date: "10/09/2023"
  },
  {
    id: 3,
    title: "Wallhack atualizado para compatibilidade com novos mapas",
    author: {
      name: "MapPro",
      image: pfp.src,
    },
    date: "15/09/2023"
  },
  {
    id: 4,
    title: "Correção de bugs e melhoria de desempenho do radar hack",
    author: {
      name: "CheatFixer",
      image: pfp.src,
    },
    date: "22/09/2023"
  }
];

interface Order {
  id: number;
  name: string;
  price: number;
  expiration: string;
  createdAt: string;
  userId: number;
  expirationDate: string;
}

const Updates: React.FC = () => {
  const {t} = useTranslation()
  const [user, setUser] = useState<AuthUser | null>(null);
  const [orders, setOrders] = useState<Order[]>([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);


  useEffect(() => {
    const fetchUserData = async () => {
      const { isLoggedIn, user } = await checkLoginStatus();
      setIsLoggedIn(isLoggedIn);
      setUser(user);
    };
    fetchUserData();
  }, []);



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




  const canPostAnnouncement = user && (user.role === 'FANTA' || user.role === 'Moderator');
  const canPostConfig = user && (user.role === "Premium");
  const router = useRouter()


  return (
    <div className="p-4">
      <div className="flex items-center mb-6">
        <UpdatesIcon className="mr-2" />
        <h1 className="text-2xl font-bold">{t("translation.updates_title")}</h1>
        <div className='relative left-3/4 md:left-3/4'>
      {canPostAnnouncement && (
          <div className="flex justify-between gap-4">
          
          <button
            className="rounded-lg bg-orange-500 px-5 py-3 font-medium text-zinc-900 hover:bg-orange-400 transition-colors"
            onClick={() => router.push("/post")}
          >
            {t("translation.Post")}
          </button>
          </div>
        )}
        </div>
      </div>
      <motion.div
      initial={{ opacity: 2, x: 60 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{
       duration: 0.5,
       delay: 0.1
      }}
      className="space-y-4">
        {updates.map((update) => (
          <div key={update.id} className="bg-zinc-700 shadow rounded-lg p-4">
            <div className="flex items-center mb-2">
              <Image
                src={update.author.image}
                alt={`${update.author.name}'s profile picture`}
                width={40}
                height={40}
                className="rounded-full mr-3"
              />
              <div>
                <Link href={`/forum/updates/${update.id}`}>
                  <h2 className="text-lg text-orange-500 hover:underline cursor-pointer font-semibold">
                    {update.title}
                  </h2>
                </Link>
                <p className="text-sm text-gray-400">
                  Por: {update.author.name} em {update.date}
                </p>
              </div>
            </div>
            <Link href={`/forum/updates/${update.id}`}>
              <p className="text-sm text-gray-300 cursor-pointer hover:underline">
                Clique para ver mais detalhes sobre "{update.title}"
              </p>
            </Link>
          </div>
        ))}
      </motion.div>
    </div>
  );
};

export default Updates;
