import React, {useState, useEffect} from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Settings as SettingsIcon } from 'lucide-react';
import pfp from "@/assets/images/pfp.png";
import { checkLoginStatus, User as AuthUser } from "@/utils/auth";
import { useTranslation } from 'react-i18next';
import { useRouter } from 'next/navigation';
import { motion } from "framer-motion";

interface Author {
  name: string;
  image: string;
}

interface Post {
  id: number;
  title: string;
  author: Author;
  date: string;
}

const posts: Post[] = [
  {
    id: 1,
    title: "Aim color settings",
    author: {
      name: "Usuário 32",
      image: pfp.src,
    },
    date: "31/02/2023"
  },
  {
    id: 2,
    title: "Keyboard shortcuts customization",
    author: {
      name: "Gamer Pro",
      image: pfp.src,
    },
    date: "15/03/2023"
  },
  {
    id: 3,
    title: "Audio settings for competitive play",
    author: {
      name: "SoundMaster",
      image: pfp.src,
    },
    date: "02/04/2023"
  },
  {
    id: 4,
    title: "Graphics optimization guide",
    author: {
      name: "FPSWizard",
      image: pfp.src,
    },
    date: "18/04/2023"
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




const Settings: React.FC = () => {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [orders, setOrders] = useState<Order[]>([]);
  const router = useRouter()
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





  
  const {t} = useTranslation();
  const canPostConfig = user && (user.role === "Premium");



  return (
    <div className="p-4">
      <div className="flex items-center mb-6">
        <SettingsIcon className="mr-2" />
        <h1 className="text-2xl font-bold">{t("translation.configs_title")}</h1>
      </div>
      <div className='flex justify-end'>
      {canPostConfig && (
          <button
        className="rounded-lg bg-orange-500 px-5 py-3 font-medium text-zinc-900 hover:bg-orange-400 transition-colors"
        onClick={() => router.push("/post-configs")}
        >
        {t("translation.config")}
        </button>
        )}
      </div>
      <motion.div
      initial={{ opacity: 2, x: 60 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{
       duration: 0.5,
       delay: 0.1
      }}
      className="space-y-4">
        {posts.map((post) => (
          <div key={post.id} className="bg-zinc-700 shadow rounded-lg p-4">
            <div className="flex items-center mb-2">
              <Image
                src={post.author.image}
                alt={`${post.author.name}'s profile picture`}
                width={40}
                height={40}
                className="rounded-full mr-3"
              />
              <div>
                <Link href={`/forum/settings/${post.id}`}>
                  <h2 className="text-lg text-orange-500 hover:underline cursor-pointer font-semibold">
                    {post.title}
                  </h2>
                </Link>
                <p className="text-sm text-gray-400">
                  Por: {post.author.name} em {post.date}
                </p>
              </div>
            </div>
            <Link href={`/forum/settings/${post.id}`}>
              <p className="text-sm text-gray-300 cursor-pointer hover:underline">
                Clique para ver mais detalhes sobre "{post.title}"
              </p>
            </Link>
          </div>
        ))}
      </motion.div>
    </div>
  );
};

export default Settings;
