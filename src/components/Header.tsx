"use client";

import Image from "next/image";
import Link from "next/link";
import { ChevronDown } from "lucide-react";
import { useState, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Logo from "@/assets/images/logo.png";
import LoginModal from "@/components/LoginModal";
import { User } from "@/utils/auth";
import pfp from "@/assets/images/pfp.png";
import { usePathname } from "next/navigation";
import Scroll from "./scroll-bar/scroll";
import { FaDiscord } from "react-icons/fa";
import { useTranslation } from "react-i18next";
interface HeaderProps {
  isLoggedIn: boolean;
  user: User | null;
}

export default function Component({ isLoggedIn, user }: HeaderProps) {
  const [showLanguageOptions, setShowLanguageOptions] = useState(false);
  const [showUserOptions, setShowUserOptions] = useState(false);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const languageButtonRef = useRef<HTMLButtonElement>(null);
  const [BanModal, setIsopenBanModal] = useState<boolean>(false);

  const OpenbanModal = () => {
    setIsopenBanModal(true);
  };

  const ClosebanModal = () => {
    setIsopenBanModal(false);
  };

  const { t, i18n } = useTranslation();
  const [currentLang, setCurrentLang] = useState(i18n.language);

  const userButtonRef = useRef<HTMLButtonElement>(null);

  const pathName = usePathname();

  const handleChangeLanguagePtBr = () => {
    const newLang = currentLang === "en" ? "pt" : "pt";
    i18n.changeLanguage(newLang);
    setCurrentLang(newLang);
    localStorage.setItem("USER_LANG", newLang);
  };
  const handleChangeLanguageEn = () => {
    const newLang = currentLang === "pt" ? "en" : "en";
    i18n.changeLanguage(newLang);
    setCurrentLang(newLang);
    localStorage.setItem("USER_LANG", newLang);
  };

  const toggleLanguageOptions = () => {
    setShowLanguageOptions((prev) => !prev);
    setShowUserOptions(false);
  };

  const toggleUserOptions = () => {
    setShowUserOptions((prev) => !prev);
    setShowLanguageOptions(false);
  };

  const openLoginModal = () => {
    setIsLoginModalOpen(true);
  };

  const closeLoginModal = () => {
    setIsLoginModalOpen(false);
  };

  const handleLogout = useCallback(() => {
    document.cookie = "token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    window.location.reload();
  }, []);

  return (
    <header className="bg-zinc-900 p-4 border-b border-orange-600 fixed z-50 w-full">
      <div className="container mx-auto flex justify-between items-center">
        <Image
          src={Logo}
          alt="Fanta.Club logo"
          width={100}
          height={400}
          className="h-16 w-auto"
        />
        <nav className="hidden md:flex space-x-4 text-white/70">
          <Link
            href="/"
            className={`relative  font-semibold after:absolute after:left-0 after:-bottom-1 after:h-[2px] after:bg-orange-600 after:w-0 after:transition-all after:duration-[700ms] hover:after:w-full hover:text-orange-400 active:text-orange-400 transition-colors duration-200 ${
              pathName == "/"
                ? "text-orange-400 hover:text-orange-600 animate-pulse"
                : "text-white/70"
            }`}
          >
            Main
          </Link>
          <Link
            href="/forum"
            className={`relative  font-semibold after:absolute after:left-0 after:-bottom-1 after:h-[2px] after:bg-orange-600 after:w-0 after:transition-all after:duration-[700ms] hover:after:w-full hover:text-orange-400 active:text-orange-400 transition-colors duration-200 ${
              pathName == "/forum"
                ? "text-orange-400 hover:text-orange-600 animate-pulse"
                : "text-white/70"
            }`}
          >
            Forum
          </Link>
          <Link
            href="/showcase"
            className={`relative  font-semibold after:absolute after:left-0 after:-bottom-1 after:h-[2px] after:bg-orange-600 after:w-0 after:transition-all after:duration-[700ms] hover:after:w-full hover:text-orange-400 active:text-orange-400 transition-colors duration-200 ${
              pathName == "/showcase"
                ? "text-orange-400 hover:text-orange-600 animate-pulse"
                : "text-white/70"
            }`}
          >
            Showcases
          </Link>
          <Link
            href="/about"
            className={`relative  font-semibold after:absolute after:left-0 after:-bottom-1 after:h-[2px] after:bg-orange-600 after:w-0 after:transition-all after:duration-[700ms] hover:after:w-full hover:text-orange-400 active:text-orange-400 transition-colors duration-200 ${
              pathName == "/about"
                ? "text-orange-400 hover:text-orange-600 animate-pulse"
                : "text-white/70"
            }`}
          >
            About
          </Link>
        </nav>
        <div className="relative flex items-center space-x-4 text-white/70">
          <div className="relative">
            <button
              ref={languageButtonRef}
              className="flex items-center hover:text-orange-400"
              onClick={toggleLanguageOptions}
            >
              {currentLang}
              <ChevronDown className="ml-1 h-4 w-4" />
            </button>
            <AnimatePresence>
              {showLanguageOptions && (
                <motion.div
                  className="absolute left-0 mt-2 bg-zinc-800 text-white border border-gray-600 rounded shadow-lg z-50"
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.2 }}
                  style={{
                    width: "max-content",
                    minWidth: languageButtonRef.current?.offsetWidth,
                  }}
                >
                  <button
                    onClick={handleChangeLanguagePtBr}
                    className="block px-4 py-2 hover:bg-orange-500 whitespace-nowrap"
                  >
                    pt-BR
                  </button>
                  <button
                    onClick={handleChangeLanguageEn}
                    className="block px-4 py-2 hover:bg-orange-500 whitespace-nowrap w-full"
                  >
                    En
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {isLoggedIn && user ? (
            <div className="relative">
              <button
                ref={userButtonRef}
                className="flex items-center hover:text-orange-400 bg-zinc-800 rounded-md px-1 py-1"
                onClick={toggleUserOptions}
              >
                <Image
                  src={user?.photo == null ? pfp : user.photo}
                  alt={`${user.name}'s avatar`}
                  width={32}
                  height={32}
                  className="rounded-lg mr-2"
                />
                <span>{user.name}</span>
                <ChevronDown className="ml-1 h-4 w-4" />
              </button>
              <AnimatePresence>
                {showUserOptions && (
                  <motion.div
                    className="absolute right-0 mt-2 bg-zinc-800 text-white border border-gray-600 rounded shadow-lg z-50"
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.2 }}
                    style={{
                      width: userButtonRef.current?.offsetWidth,
                    }}
                  >
                    {user.role === "FANTA" || user.role == "Moderator" ? (
                      <Link
                        href="/admin"
                        className={`block px-4 py-2 hover:bg-orange-500 ${
                          pathName == "/admin"
                            ? "text-orange-400 hover:bg-orange-600 animate-pulse"
                            : ""
                        }`}
                      >
                        Admin
                      </Link>
                    ) : null}
                    {!user?.isActive ? (
                      <p
                        onClick={() => OpenbanModal()}
                        className="block px-4 py-2 hover:bg-orange-500 cursor-pointer"
                      >
                        Profile
                      </p>
                    ) : (
                      <Link
                        href="/me"
                        className={`block px-4 py-2 hover:bg-orange-500 ${
                          pathName == "/me"
                            ? "text-orange-400 hover:bg-orange-600 animate-pulse"
                            : ""
                        }`}
                      >
                        Profile
                      </Link>
                    )}

                    <button
                      onClick={handleLogout}
                      className="block w-full text-left px-4 py-2 hover:bg-orange-500"
                    >
                      Logout
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>  
              <div>
                {BanModal && <BanModalFunction closeModal={ClosebanModal} />}
              </div>
            </div>
          ) : (
            <Link
              href="#"
              onClick={openLoginModal}
              className="px-4 py-2 bg-orange-500 rounded hover:bg-orange-400 text-white"
            >
              Login
            </Link>
          )}
        </div>
      </div>
      <LoginModal isOpen={isLoginModalOpen} onClose={closeLoginModal} />
      <div></div>
      <div>
        <Scroll />
      </div>
    </header>
  );
}

interface ModalBan {
  closeModal: () => void;
}

function BanModalFunction({ closeModal }: ModalBan) {
  const [BanModal, setIsopenBanModal] = useState<boolean>(false);
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm flex items-center justify-center p-4 z-50 w-full"
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
            <div className="p-8">
              <h2 className="text-3xl font-bold mb-4">
                Sua conta está <span className="text-orange-400">BANIDA</span>
              </h2>
              <p className="text-sm">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Magni
                inventore tempore cumque labore, libero, voluptatibus fuga,
                voluptatem odit tempora facere aliquam unde veritatis recusandae
                suscipit. Expedita facere cum veritatis enim.
              </p>
            </div>
          </div>
        </div>

        {/* Right Column */}
        <div className="w-full md:w-1/2 p-10 relative">
          <button
            onClick={closeModal}
            className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors"
          >
            <div>
              <p className="text-2xl">X</p>
            </div>
          </button>
          <motion.div
            initial={{ x: 20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: -20, opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            <h3 className="text-3xl font-bold mb-8">
              Acesse nosso <strong className="text-orange-400">DISCORD</strong>{" "}
              para entender o motivo
            </h3>
          </motion.div>
          <div className="mt-10">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="w-full py-3 bg-[#1A1A1C] text-white border border-gray-700 rounded-lg hover:bg-[#2A2A2C] hover:text-orange-300 transition-colors flex items-center justify-center"
            >
              <FaDiscord className="mr-2 h-5 w-5" /> Acesse nosso Discord
            </motion.button>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}
