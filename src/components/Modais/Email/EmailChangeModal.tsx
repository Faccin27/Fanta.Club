import { useState } from "react";
import { X } from "lucide-react";
import { motion } from "framer-motion";
import { api, handleApiError } from '@/utils/api';
export default function EmailChangeModal({
  isOpen,
  onClose,
  userId
}: {
  isOpen: boolean;
  onClose: () => void;
  userId: number;
}) {
  const [newEmail, setNewEmail] = useState("");
  const [confirmEmail, setConfirmEmail] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    if (newEmail !== confirmEmail) {
      setError("Os emails não coincidem");
      return;
    }
    try {
      await api.put(`/users/${userId}/email`, {
        newEmail
      });
      
      setSuccess("Um link de confirmação foi enviado para seu novo email!");
      setTimeout(() => {
        onClose();
      }, 3000);
    } catch (error) {
      setError(handleApiError(error));
    }
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
        className="bg-[#121214] text-white max-w-md w-full rounded-2xl overflow-hidden border border-orange-400"
      >
        <div className="bg-[#0D0D0E] p-8 relative">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors"
          >
            <X size={24} />
          </button>
          
          <h3 className="text-2xl font-bold mb-6">Alterar Email</h3>
          
          {error && (
            <div className="bg-red-500 text-white p-3 rounded-lg mb-4">
              {error}
            </div>
          )}
          
          {success && (
            <div className="bg-green-500 text-white p-3 rounded-lg mb-4">
              {success}
            </div>
          )}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <input
                type="email"
                placeholder="Novo email"
                value={newEmail}
                onChange={(e) => setNewEmail(e.target.value)}
                className="w-full px-4 py-3 bg-[#1A1A1C] border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-400 transition-all"
                required
              />
            </div>
            <div>
              <input
                type="email"
                placeholder="Confirme o novo email"
                value={confirmEmail}
                onChange={(e) => setConfirmEmail(e.target.value)}
                className="w-full px-4 py-3 bg-[#1A1A1C] border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-400 transition-all"
                required
              />
            </div>
            <motion.button
              type="submit"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="w-full py-3 bg-orange-400 hover:bg-orange-500 text-white rounded-lg transition-colors text-lg font-semibold"
            >
              Alterar Email
            </motion.button>
          </form>
        </div>
      </motion.div>
    </motion.div>
  );
}