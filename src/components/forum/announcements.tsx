import React, { useEffect, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { Bell as AnnouncementsIcon } from "lucide-react";
import pfp from "@/assets/images/pfp.png";
import { checkLoginStatus, User as AuthUser } from "@/utils/auth"; // Renomeado para evitar conflito

interface Author {
  name: string;
  image: string;
}

interface Announcement {
  id: number;
  title: string;
  author: Author;
  date: string;
}

const announcements: Announcement[] = [
  {
    id: 1,
    title: "Novo hack de mira lançado!",
    author: {
      name: "DevHacker",
      image: pfp.src,
    },
    date: "01/10/2023",
  },
  {
    id: 2,
    title: "Atualização no wallhack para evitar bans",
    author: {
      name: "AntiBanMaster",
      image: pfp.src,
    },
    date: "05/10/2023",
  },
  {
    id: 3,
    title: "Lançamento do hack de recoil perfeito",
    author: {
      name: "RecoilExpert",
      image: pfp.src,
    },
    date: "10/10/2023",
  },
  {
    id: 4,
    title: "Desconto de 20% em todos os hacks durante o fim de semana!",
    author: {
      name: "ValorantHacksStore",
      image: pfp.src,
    },
    date: "12/10/2023",
  },
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

export default function Announcements() {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [orders, setOrders] = useState<Order[]>([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const fetchUserData = async () => {
      const { isLoggedIn, user } = await checkLoginStatus();
      setIsLoggedIn(isLoggedIn);
      setUser(user);
    };
    fetchUserData();
  }, []);

  const canPostAnnouncement = user && (user.role === 'FANTA' || user.role === 'Moderator');

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
          <h1 className="text-2xl font-bold">Anúncios</h1>
        </div>
        {canPostAnnouncement && (
          <button
            className="rounded-lg bg-orange-500 px-5 py-3 font-medium text-zinc-900 hover:bg-orange-400 transition-colors"
            onClick={() => router.push("/post")}
          >
            Postar novo anúncio
          </button>
        )}
      </div>
      <div className="space-y-4">
        {announcements.map((announcement) => (
          <motion.div
          initial={{ opacity: 2, x: 60 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{
           duration: 0.5,
           delay: 0.1
         }}
            key={announcement.id}
            className="bg-zinc-700 shadow rounded-lg p-4"
          >
            <div className="flex items-center mb-2">
              <Image
                src={announcement.author.image}
                alt={`${announcement.author.name}'s profile picture`}
                width={40}
                height={40}
                className="rounded-full mr-3"
              />
              <div>
                <Link href={`/forum/announcements/${announcement.id}`}>
                  <h2 className="text-lg text-orange-500 hover:underline cursor-pointer font-semibold">
                    {announcement.title}
                  </h2>
                </Link>
                <p className="text-sm text-gray-400">
                  Por: {announcement.author.name} em {announcement.date}
                </p>
              </div>
            </div>
            <Link href={`/forum/announcements/${announcement.id}`}>
              <p className="text-sm text-gray-300 cursor-pointer hover:underline">
                Clique para ver mais detalhes sobre "{announcement.title}"
              </p>
            </Link>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
