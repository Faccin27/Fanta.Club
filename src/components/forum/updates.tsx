import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { RefreshCw as UpdatesIcon } from 'lucide-react';
import pfp from "@/assets/images/pfp.png";
import { useTranslation } from 'react-i18next';
import { checkLoginStatus, User as AuthUser } from "@/utils/auth"; 
import { useRouter } from 'next/navigation';
import { motion } from "framer-motion";
import { Types } from './announcements';

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


export enum Type{
  Updates = "Updates"
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





const Updates: React.FC = () => {
  const {t} = useTranslation()
  const [user, setUser] = useState<AuthUser | null>(null);
  const [updates, setUpdate] = useState<Updates[] | undefined>(undefined);
  const [orders, setOrders] = useState<Order[]>([]);
  
  useEffect((()=>{
    const fetchUpdates = async () => {
      try{
        const response = await fetch("http://localhost:3535/anun/buscaType?type=Updates");
        const result: Updates[] = await response.json();
        setUpdate(result);
      } catch(err){
        throw new Error(`Encontramos um erro para poder fazer o GET dos Updates. Verifique o erro: ${err}`)
      };
    };
    fetchUpdates();
  }),[]);

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




  const canPostUpdate = user && (user.role === 'FANTA' || user.role === 'Moderator');
  const router = useRouter()


  return (
    <div className="p-4">
      <div className="flex items-center justify-center mb-6">
      <div className="flex items-center">
      <UpdatesIcon className='mr-3'/>
          <h1 className="text-2xl font-bold">{t("translation.Updates")}</h1>
        </div>
        {canPostUpdate ? (
          <div>
          <button
          className="rounded-lg bg-orange-500 px-5 py-3 font-medium text-zinc-900 hover:bg-orange-400 transition-colors ml-[61rem]"
          onClick={()=>router.push("/post-up")}
          >
                Post
          </button>
        </div>

):null}
</div>
      <motion.div
      initial={{ opacity: 2, x: 60 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{
       duration: 0.5,
       delay: 0.1
      }}
      className="space-y-4">
        {updates?.map((update) => (
          <div key={update.id} className="bg-zinc-700 shadow rounded-lg p-4">
            <div className="flex items-center mb-2">
              <Image
                src={update.createdByPhoto || pfp}
                alt={`profile picture`}
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
                  Criado por: <strong className='fonrt-bold text-orange-500'>{update.createdByName}</strong> no horário:{update.createdAt}
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
