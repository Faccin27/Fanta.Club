import { X } from "lucide-react";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import Image, { StaticImageData } from "next/image";
import Link from "next/link";

import FantaLight from "@/assets/images/banner.jpg";
import FantaPro from "@/assets/images/b-1.png";
import FantaUnban from "@/assets/images/b-3.jpg";

interface ProductCardProps {
  href: string;
  imageSrc: StaticImageData;
  alt: string;
  title: string;
  description: string;
}

export default function ModalProducts({ onClose }: { onClose: () => void }) {
  const { t } = useTranslation();

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black bg-opacity-20 backdrop-blur-sm flex items-center justify-center z-50 p-4"
      role="dialog"
      aria-modal="true"
    >
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.8, opacity: 0 }}
        transition={{ type: "spring", damping: 25, stiffness: 300 }}
        className="bg-[#121214] text-white max-w-2xl w-full rounded-lg shadow-xl overflow-hidden"
      >
        <div className="relative p-6 bg-[#0D0D0E] flex justify-between items-center border-b border-orange-500">
          <h2 className="text-2xl font-bold text-center flex-1">
            {t("translation.produtos_les")}
          </h2>
          <button
            onClick={onClose}
            aria-label="Close Modal"
            className="text-gray-400 hover:text-white transition-colors"
          >
            <X size={24} />
          </button>
        </div>

        <div className="p-6 space-y-6 sm:space-y-0 sm:grid sm:grid-cols-3 sm:gap-6 items-stretch">
          <ProductCard
            href="/product/fantalight"
            imageSrc={FantaLight}
            alt="Fanta Light"
            title="Fanta Light"
            description={t("translation.fanta_light_modal")}
          />
          <ProductCard
            href="/product/fantapro"
            imageSrc={FantaLight}
            alt="Fanta Pro"
            title="Fanta Pro"
            description={t("translation.fanta_pro_modal")}
          />
          <ProductCard
            href="/product/fantaunban"
            imageSrc={FantaLight}
            alt="Fanta Unban"
            title="Fanta Unban"
            description={t("translation.fanta_unban_modal")}
          />
        </div>
      </motion.div>
    </motion.div>
  );
}

function ProductCard({ href, imageSrc, alt, title, description }: ProductCardProps) {
  return (
    <Link href={href} passHref>
      <div className="h-full flex flex-col p-4 text-center bg-[#18181A] rounded-lg border border-orange-400 transition-transform transform hover:scale-105 hover:border-orange-500">
        <Image
          src={imageSrc}
          alt={alt}
          width={150}
          height={150}
          className="rounded mb-4"
          placeholder="blur"
        />
        <h3 className="text-lg font-semibold mb-2">{title}</h3>
        <p className="text-sm text-gray-400 flex-grow">{description}</p>
      </div>
    </Link>
  );
}
