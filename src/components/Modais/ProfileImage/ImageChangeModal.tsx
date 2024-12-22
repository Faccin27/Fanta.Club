'use client'

import { useState, useRef } from "react";
import { X } from 'lucide-react';
import { motion, AnimatePresence } from "framer-motion";
import { api, handleApiError } from '@/utils/api';
import { useTranslation } from "react-i18next";
import { StaticImageData } from "next/image";

export default function ImageChangeModal({
  isOpen,
  onClose,
  userId,
  currentImage,
}: {
  isOpen: boolean;
  onClose: () => void;
  userId: number;
  currentImage: string | StaticImageData
}) {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const fileInputRef = useRef<HTMLInputElement>(null);

  const { t } = useTranslation();

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setSelectedImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (!selectedImage) {
      setError(t("translation.no_image_selected"));
      return;
    }

    try {
      // Converter base64 para Blob
      const response = await fetch(selectedImage);
      const blob = await response.blob();
      
      // Criar FormData
      const formData = new FormData();
      formData.append('image', blob, 'profile-picture.jpg');

      // Enviar PUT request com FormData
      await api.put(`/users/userpfp/${userId}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      
      setSuccess(t("translation.image_changed_success"));
      setTimeout(() => {
        onClose();
      }, 2000);
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
            className="absolute top-4 left-4 text-gray-400 hover:text-white transition-colors"
          >
            <X size={24} />
          </button>
          
          <h3 className="text-2xl font-bold mb-6 text-center">{t("translation.change_profile_image")}</h3>
          
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
            <div className="flex items-center justify-between">
              <div className="flex-1">
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="hidden"
                  ref={fileInputRef}
                />
                <motion.button
                  type="button"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full py-3 bg-orange-400 hover:bg-orange-500 text-white rounded-lg transition-colors text-lg font-semibold"
                  onClick={() => fileInputRef.current?.click()}
                >
                  {t("translation.attach_image")}
                </motion.button>
              </div>
              <div className="flex-1 flex justify-center">
                <div className="w-32 h-32 rounded-full border-4 border-orange-400 overflow-hidden">
                  {selectedImage ? (
                    <img src={selectedImage} alt="Preview" className="w-full h-full object-cover" />
                  ) : (
                    <div className="w-full h-full bg-gray-700 flex items-center justify-center text-gray-400">
                      {t("translation.no_image")}
                    </div>
                  )}
                </div>
              </div>
            </div>

            <motion.button
              type="submit"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="w-full py-3 bg-orange-400 hover:bg-orange-500 text-white rounded-lg transition-colors text-lg font-semibold"
              disabled={!selectedImage}
            >
              {t("translation.confirm_change")}
            </motion.button>
          </form>
        </div>
      </motion.div>
    </motion.div>
  );
}