import { useState } from "react";
import Image from "next/image";
import { X } from "lucide-react";
import { FaDiscord } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";
import B1 from "@/assets/images/b-1.png";
import B2 from "@/assets/images/b-2.jpg";
import { useTranslation } from "react-i18next";

export default function ModalProducts({  onClose, }: { onClose: () => void;}) {

  const {t} = useTranslation()


    interface Product {
        name: string;
        image: any;
        price: number;
        link: string;
        downloadLink: string;
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


    const products: Product[] = [
        { 
          name: "FANTA_UNBAN", 
          image: B2, 
          price: 50, 
          link: "fantaunban",
          downloadLink: "https://easyupload.io/yvoix2"
        },
        { 
          name: "FANTA_PRO", 
          image: B1, 
          price: 60, 
          link: "fantapro",
          downloadLink: "https://easyupload.io/x1bb47"
        },  
        { 
          name: "FANTA_LIGHT", 
          image: B2, 
          price: 25, 
          link: "fantalight",
          downloadLink: "https://easyupload.io/x1bb47"
        },
      ];




      const [orders, setOrders] = useState<Order[]>([]);
const isProductActive = (productName: string) => {
    const order = orders.find((order) => order.name === productName);
    if (!order) return false;

    if (order.expiration === "LIFETIME") return true;

    const expirationDate = new Date(order.expirationDate);
    const today = new Date();
    return today < expirationDate;
  };


    return(
        <div>
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black bg-opacity-10 backdrop-blur-sm flex items-center justify-center p-4 z-50"
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        transition={{ type: "spring", damping: 25, stiffness: 120 }}
        className="bg-[#121214] text-white max-w-screen-xl w-full rounded-2xl overflow-hidden border border-orange-400"
      >
        <div className="bg-[#0D0D0E] p-8 relative">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors"
          >
            <X size={24} />
          </button>
          
          <h2 className="text-4xl font-bold mb-6">{t("translation.produtos_les")}</h2>
          
          <motion.div 
          
          className="max-h-80 overflow-y-auto">
          <h3 className="font-bold mb-4 text-2xl">
                Nosso Produto mais acessível do <span className="text-orange-400">Fanta.club</span> é para você que quer <span className="text-orange-400">acabar</span> com seus adversários sem
                precisar ser bom, mas sim possuir o dinheiro, mas fique tranquilo que não será necessário muito dinheiro. Nossa versão <span className="text-orange-400">Fanta Light</span> é tudo o que precisa: 
              </h3>  
          </motion.div>
         
        </div>
      </motion.div>
    </motion.div>
        </div>
        
    )
}
