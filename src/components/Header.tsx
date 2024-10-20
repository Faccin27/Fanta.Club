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

interface HeaderProps {
  isLoggedIn: boolean;
  user: User | null;
}

export default function Component({ isLoggedIn, user }: HeaderProps) {
  const [showLanguageOptions, setShowLanguageOptions] = useState(false);
  const [showUserOptions, setShowUserOptions] = useState(false);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const languageButtonRef = useRef<HTMLButtonElement>(null);
  const userButtonRef = useRef<HTMLButtonElement>(null);

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
    <header className="bg-zinc-900 p-4 border-b border-orange-600">
      <div className="container mx-auto flex justify-between items-center">
        <Image
          src={Logo}
          alt="Fanta.Club logo"
          width={100}
          height={400}
          className="h-16 w-auto"
        />
        <nav className="hidden md:flex space-x-4 text-white/70">
          <Link href="/" className="hover:text-orange-400">
            Main
          </Link>
          <Link href="/forum" className="hover:text-orange-400">
            Forum
          </Link>
          <Link href="/showcase" className="hover:text-orange-400">
            Showcases
          </Link>
          <Link href="/about" className="hover:text-orange-400">
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
              EN <ChevronDown className="ml-1 h-4 w-4" />
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
                  <Link
                    href="#"
                    className="block px-4 py-2 hover:bg-orange-500 whitespace-nowrap"
                  >
                    pt-BR
                  </Link>
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
                    <Link
                      href="/me"
                      className="block px-4 py-2 hover:bg-orange-500"
                    >
                      Profile
                    </Link>
                    <button
                      onClick={handleLogout}
                      className="block w-full text-left px-4 py-2 hover:bg-orange-500"
                    >
                      Logout
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
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
    </header>
  );
}
