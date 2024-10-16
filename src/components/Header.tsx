'use client'
import Image from "next/image";
import Link from "next/link";
import { ChevronDown } from "lucide-react";
import { useState } from "react"; 
import { motion, AnimatePresence } from "framer-motion"; 
import Logo from "@/assets/images/logo.png";
import LoginModal from '@/components/LoginModal';

export default function Header() {
  const [showLanguageOptions, setShowLanguageOptions] = useState(false);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false); // Estado para o modal

  const toggleLanguageOptions = () => {
    setShowLanguageOptions((prev) => !prev);
  };

  const openLoginModal = () => {
    setIsLoginModalOpen(true);
  };

  const closeLoginModal = () => {
    setIsLoginModalOpen(false);
  };

  // const toggleUserOptions = () => {
  //   setShowUserOptions((prev) => !prev);
  //   setShowLanguageOptions(false); 
  // };

  return (
    <header className="bg-zinc-900 p-4 border-b border-orange-600">
      <div className="container mx-auto flex justify-between items-center">
        <Image
          src={Logo}
          alt="Fanta.Club logo"
          width={100}
          height={400}
          className="h-16 w-auto"
        />
        <nav className="hidden md:flex space-x-4">
          <Link href="/" className="hover:text-orange-400">
            Main
          </Link>
          <Link href="/forum" className="hover:text-orange-400">
            Forum
          </Link>
          <Link href="/showcase" className="hover:text-orange-400">
            Showcases
          </Link>
          <Link href="#" className="hover:text-orange-400">
            Tickets
          </Link>
        </nav>
        <div className="relative flex items-center space-x-4"> 
          <button className="flex items-center hover:text-orange-400" onClick={toggleLanguageOptions}>
            EN <ChevronDown className="ml-1 h-4 w-4" />
          </button>
          <AnimatePresence>
            {showLanguageOptions && (
              <motion.div
                className="absolute top-full mt-2 bg-zinc-800 text-white border border-gray-600 rounded shadow-lg z-50"
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }} 
              >
                <Link href="#" className="block px-4 py-2 hover:bg-orange-500">
                  pt-BR
                </Link>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Comentado o código referente ao usuário logado */}
          {/* 
          <button className="flex items-center hover:text-orange-400" onClick={toggleUserOptions}>
            POZINHO <ChevronDown className="ml-1 h-4 w-4" />
          </button>
          <AnimatePresence>
            {showUserOptions && (
              <motion.div
                className="absolute left-16 top-full mt-2 bg-zinc-800 text-white border border-gray-600 rounded shadow-lg z-50"
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }} 
              > 
                <Link href="/me" className="block px-4 py-2 hover:bg-orange-500">
                  Profile
                </Link>
                <Link href="/logout" className="block px-4 py-2 hover:bg-orange-500">
                  Logout
                </Link>
              </motion.div>
            )}
          </AnimatePresence>
          */}

          {/* Botão de login substituindo o usuário logado */}
          <Link href="#" onClick={openLoginModal} className="px-4 py-2 bg-orange-500 rounded hover:bg-orange-400 text-white">
            Login
          </Link>
        </div>
      </div>
      <LoginModal isOpen={isLoginModalOpen} onClose={closeLoginModal} />
    </header>
  );
}
