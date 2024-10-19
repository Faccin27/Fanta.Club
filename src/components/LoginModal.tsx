import { useState } from "react";
import Image from "next/image";
import { X } from "lucide-react";
import { FaDiscord } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";
import logo from "@/assets/images/logo.png";
import axios from "axios";
import Cookies from 'js-cookie';
import { api, handleApiError } from '@/utils/api';

export default function EnhancedLoginModal({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [isRegistering, setIsRegistering] = useState(false);
  const [acceptTerms, setAcceptTerms] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
  
    try {
      if (isRegistering) {
        if (!acceptTerms) {
          setError("Você deve aceitar os termos de uso para se registrar.");
          return;
        }
        const registrationData = {
          name: username,
          email,
          password,
          photo: null,
          registeredDate: new Date().toISOString(),
          expiryDate: new Date(new Date().setFullYear(new Date().getFullYear() + 1)).toISOString(),
          isActive: true,
          role: "User"
        };
  
        const response = await api.post("/users", registrationData);
        console.log("Registro bem-sucedido:", response.data);
      } else {
        const loginData = { email, password };
        const response = await api.post("/users/login", loginData);
        console.log("Login bem-sucedido:", response.data);
        window.location.reload()
        
        if (response.data.token) {
          Cookies.set('token', response.data.token, { expires: 7 });
          console.log("Token salvo nos cookies");
        }
      }
      
      onClose(); 
    } catch (error) {
      setError(handleApiError(error));
    }
  };

  const toggleForm = () => {  
    setIsRegistering(!isRegistering);
    setEmail("");
    setPassword("");
    setUsername("");
    setAcceptTerms(false);
  };

  if (!isOpen) return null;

  return (
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
              <h2 className="text-3xl font-bold mb-4">
                Bem vindo ao <span className="text-orange-400">Fanta.club</span>
              </h2>
              <p className="text-sm">
                Bem-vindo ao fanta.club! Entre com suas credenciais para acessar
                conteúdos exclusivos. Aqui transformamos o seu tesão por jogos em
                uma experiencia unica e inovadora. Divirta-se e jogue com
                inteligência!
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
          <AnimatePresence mode="wait">
            <motion.div
              key={isRegistering ? "register" : "login"}
              initial={{ x: 20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: -20, opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <h3 className="text-3xl font-bold mb-8">
                {isRegistering ? "Criar Conta" : "Entrar"}
              </h3>
              {error && (
                <div className="bg-red-500 text-white p-3 rounded-lg mb-4">
                  {error}
                </div>
              )}
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <input
                    type="email"
                    placeholder="Digite seu e-mail"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-4 py-3 bg-[#1A1A1C] border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-400 transition-all"
                    required
                  />
                </div>
                {isRegistering && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <input
                      type="text"
                      placeholder="Nome de usuário"
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                      className="w-full px-4 py-3 bg-[#1A1A1C] border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-400 transition-all"
                      required
                    />
                  </motion.div>
                )}
                <div className="relative">
                  <input
                    type="password"
                    placeholder="Digite sua senha"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full px-4 py-3 bg-[#1A1A1C] border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-400 transition-all"
                    required
                  />
                  {!isRegistering && (
                    <a
                      href="#"
                      className="absolute right-0 top-0 text-xs text-orange-400 hover:underline"
                    >
                      Esqueceu sua senha?
                    </a>
                  )}
                </div>
                {isRegistering && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                    className="flex items-center"
                  >
                    <input
                      type="checkbox"
                      id="terms"
                      checked={acceptTerms}
                      onChange={(e) => setAcceptTerms(e.target.checked)}
                      className="mr-2"
                      required
                    />
                    <label htmlFor="terms" className="text-sm text-gray-300">
                      Eu aceito os{" "}
                      <a href="#" className="text-orange-400 hover:underline">
                        Termos de Uso
                      </a>
                    </label>
                  </motion.div>
                )}
                <motion.button
                  type="submit"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-full py-3 bg-orange-400 hover:bg-orange-500 text-white rounded-lg transition-colors text-lg font-semibold"
                >
                  {isRegistering ? "Criar Conta" : "Entrar"}
                </motion.button>
              </form>
            </motion.div>
          </AnimatePresence>
          <div className="mt-6 text-center">
            <motion.button
              onClick={toggleForm}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="text-sm text-orange-400 hover:underline"
            >
              {isRegistering
                ? "Já tem uma conta? Entrar"
                : "Nova aqui? Criar conta"}
            </motion.button>
          </div>
          <div className="mt-10">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="w-full py-3 bg-[#1A1A1C] text-white border border-gray-700 rounded-lg hover:bg-[#2A2A2C] hover:text-orange-300 transition-colors flex items-center justify-center"
            >
              <FaDiscord className="mr-2 h-5 w-5" /> Acesse nosso Discord
            </motion.button>
            <p className="text-xs text-center mt-3 text-gray-400">
              Para dúvidas e suporte
            </p>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}