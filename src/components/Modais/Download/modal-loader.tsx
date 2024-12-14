
import { useEffect, useState, useTransition } from "react";
import Image from "next/image";
import { X } from "lucide-react";
import { FaDiscord } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";
import logo from "@/assets/images/logo.png";
import axios from "axios";
import Cookies from 'js-cookie';
import { api, handleApiError } from '@/utils/api';
import { useTranslation } from "react-i18next";
import { MeProps } from "@/components/products/fantalight";
import { Order } from "@/components/Me";
import { User } from "@/utils/auth";


interface ModalLoader{
    onClose: ()=> void;
    id: number | undefined;
    user: User | undefined;
}

export default function ModalLoader({onClose, id, user}:ModalLoader,){
    const [order, setOrders] = useState<Order[] | null>(null);
    const [usere, setUser] = useState();

    const {t} = useTranslation();


    useEffect(() => {
        const fetchOrders = async () => {
          if (id) {
            try {
              const response = await fetch(
                `http://localhost:3535/users/orders/${id}`
              );
              if (!response.ok) {
                throw new Error("Failed to fetch orders");
              }
              const data:Order[] = await response.json();
              setOrders(data);
            } catch (error) {
              console.error("Error fetching orders:", error);
            }
          }
        };
        fetchOrders();
      }, [id]);    


    return(
        <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm flex items-center justify-center p-4 z-50"
    >
        <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            transition={{ type: "spring", damping: 25, stiffness: 120 }}
            className="bg-[#121214] text-white max-w-5xl w-full rounded-2xl overflow-hidden flex border border-orange-400"
        >
            {/* Left Column */}
            <div className="relative w-1/2 hidden md:flex md:flex-col">
                <div className="absolute inset-0 flex flex-col">
                    <div className="flex-grow flex items-center justify-center p-8">
                        <div className="relative w-full h-full">
                            <Image
                                src={logo}
                                alt="Fanta.club logo"
                                layout="fill"
                                objectFit="contain"
                            />
                        </div>
                    </div>
                    <div className="p-8 bg-gradient-to-t from-black to-transparent">
                        <h2 className="text-3xl font-bold mb-4 flex justify-center items-center">
                            <span className="text-orange-400">{t("translation.thanks5")} {" "} {user?.name}{"!"}</span>
                        </h2>
                        <p className="text-sm">
                          {t("translation.thanks1")}  {" "} <span className="text-orange-400 hover:text-orange-600 cursor-pointer">{t("translation.thanks2")}</span> {" "}
                          {t("translation.thanks3")} {" "}<span className="text-orange-400 hover:text-orange-600 cursor-pointer">Fanta.club</span>, {" "}{t("translation.thanks4")}!
                        </p>
                    </div>
                </div>
            </div>

            {/* Right Column */}
            <div className="w-full md:w-1/2 bg-[#0D0D0E] p-10 relative">
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors"
                >
                    <X size={24} />
                </button>

                <div className="space-y-6">    
                <h2 className="text-2xl font-bold mb-4">
                            {t("translation.sabedoria")}
                        </h2>
                </div>

                <div className="mt-6 text-center">
                <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="w-full py-3 bg-[#1A1A1C] text-white border border-gray-700 rounded-lg hover:bg-[#2A2A2C] hover:text-orange-300 transition-colors flex items-center justify-center"
            >
              <FaDiscord className="mr-2 h-5 w-5" /> Acesse nosso Discord
            </motion.button>
                </div>
      {order?.map((produto)=>(

                <div className="mt-10">
                    <motion.button
                       // onClick={}
                        type="submit"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="w-full py-3 bg-orange-400 hover:bg-orange-500 text-white rounded-lg transition-colors text-lg font-semibold"
                    >
                        {t("translation.download_forje")} {" "} {produto.name}
                    </motion.button>
                </div>
      ))}
            </div>
        </motion.div>
    </motion.div>

    )
}
