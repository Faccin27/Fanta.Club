import React, { useState, useEffect, useRef } from "react";
import B1 from "@/assets/images/b-1.png";
import { motion } from "framer-motion";
import B2 from "@/assets/images/b-2.jpg";
import PFP from "@/assets/images/pfp.png";
import {
  Clock,
  Download,
  Edit,
  Lock,
  X,
  Mail,
  RefreshCw,
  ShieldCheck,
  Pencil,
  Camera,
} from "lucide-react";
import Image, { StaticImageData } from "next/image";
import Link from "next/link";
import Aside from "./Aside";
import PasswordChangeModal from "@/components/Modais/Password/PasswordChangeModal";
import { useTranslation } from "react-i18next";
import ModalLoader from "./Modais/Download/modal-loader";
import EmailChangeModal from "./Modais/Email/EmailChangeModal";
import NameModal from "./Modais/Name/NameModal";
import AboutModal from "./Modais/About/AboutModal";
import ImageChangeModal from "@/components/Modais/ProfileImage/ImageChangeModal";
import dynamic from "next/dynamic";
import "react-quill/dist/quill.snow.css";

const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });

interface User {
  id: number;
  name: string;
  email: string;
  photo: string;
  registeredDate: string;
  expiryDate: string;
  gender: string;
  birthDate: string;
  isActive: boolean;
  description: string | TrustedHTML | undefined;
  role: string;
  createdAt: string;
  updatedAt: string;
}

export interface Order {
  id: number;
  name: string;
  price: number;
  expiration: string;
  createdAt: string;
  userId: number;
  expirationDate: string;
}

interface Product {
  name: string;
  image: any;
  price: number;
  link: string;
  downloadLink: string;
}

interface ImageChangeModalProps {
  isOpen: boolean;
  onClose: () => void;
  userId?: number;
  currentImage: string | null;
}

const getRoleStyles = (role: string) => {
  switch (role) {
    case "FANTA":
      return "font-bold animate-pulse bg-gradient-to-r from-red-500 via-yellow-500 to-orange-500 text-transparent bg-clip-text";
    case "Moderator":
      return "text-purple-400 font-bold";
    case "Premium":
      return "text-orange-400 font-bold";
    default:
      return "text-zinc-400 font-bold";
  }
};

interface MeProps {
  user: User | undefined;
  ident: number | undefined;
}

const products: Product[] = [
  {
    name: "FANTA_UNBAN",
    image: B2,
    price: 90,
    link: "fantaunban",
    downloadLink: "https://easyupload.io/yvoix2",
  },
  {
    name: "FANTA_PRO",
    image: B1,
    price: 60,
    link: "fantapro",
    downloadLink: "https://easyupload.io/x1bb47",
  },
  {
    name: "FANTA_LIGHT",
    image: B2,
    price: 25,
    link: "fantalight",
    downloadLink: "https://easyupload.io/x1bb47",
  },
];

export default function Component({ user, ident }: MeProps) {
  const [orders, setOrders] = useState<Order[]>([]);
  const [isPasswordModalOpen, setIsPasswordModalOpen] = useState(false);
  const [descriptionOpen, setDesc] = useState<boolean>(false);
  const [newDescription, setNew] = useState<string | TrustedHTML | undefined>(
    user?.description
  );
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [isModalNameOpen, setIsModalNameOpen] = useState<boolean>(false);
  const [notification, setNotification] = useState();
  const [isEmailModalOpen, setIsEmailModalOpen] = useState<boolean>(false);
  const [isProfileImageModalOpen, setIsProfileImageModalOpen] = useState(false);

  const audioRefComponent = useRef<HTMLAudioElement | null>(null);

  const playAudio = () => {
    if (audioRefComponent.current) {
      audioRefComponent.current.play();
    }
  };

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
          const data: Order[] = await response.json();
          setOrders(data);
        } catch (error) {
          console.error("Error fetching orders:", error);
        }
      }
    };
    fetchOrders();
  }, [user]);

  const isProductActive = (productName: string) => {
    const order = orders.find((order) => order.name === productName);
    if (!order) return false;

    if (order.expiration === "LIFETIME") return true;

    const expirationDate = new Date(order.expirationDate);
    const today = new Date();
    return today < expirationDate;
  };

  const toolbarOptions = [
    ["bold", "italic", "underline"], // Negrito, itálico, sublinhado
    ["blockquote"], // Bloco de citação
    [{ list: "ordered" }, { list: "bullet" }], // Listas ordenadas e não ordenadas
    [{ align: [] }], // Alinhamento do texto
    [{ header: [1, 2, false] }], // Cabeçalhos H1 e H2
    ["clean"], // Remover formatação
  ];

  const getRemainingDays = (productName: string) => {
    const order = orders.find((order) => order.name === productName);
    if (order) {
      if (order.expiration === "LIFETIME") return "NEVER";

      const expirationDate = new Date(order.expirationDate);
      const today = new Date();
      if (today >= expirationDate) return 0;

      const diffTime = Math.abs(expirationDate.getTime() - today.getTime());
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      return diffDays;
    }
    return null;
  };

  const handleDownload = (downloadLink: string) => {
    window.open(downloadLink);
  };

  const handleShowDescriptionEdit = () => {
    setDesc(true);
  };
  const handleUnShowDescriptionEdit = () => {
    setDesc(false);
  };

  const handleOpenNameModal = () => {
    setIsModalNameOpen(true);
  };

  const handleCloseNameModal = () => {
    setIsModalNameOpen(false);
  };

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };
  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleSubmit = async (evento: React.FormEvent) => {
    evento.preventDefault();
    try {
      await fetch(`http://localhost:3535/users/${ident}/desc`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          description: newDescription,
        }),
      });
      alert(t("translation.recharg"));
    } catch (err) {
      throw new Error(`We can't update your description Error: ${err}`);
    }
  };

  const handleOpenEmailModal = () => {
    setIsEmailModalOpen(true);
  };
  const handleCloseEmailModal = () => {
    setIsEmailModalOpen(false);
  };

  const handleOpenProfileImageModal = () => {
    setIsProfileImageModalOpen(true);
  };

  const handleCloseProfileImageModal = () => {
    setIsProfileImageModalOpen(false);
  };

  const { t } = useTranslation();

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100">
      <main>
        <div className="relative">
          <div className="h-40"></div>
        </div>
        <div className="container mx-auto px-4 -mt-16">
          <div className="text-center">
            <div
              className="relative mx-auto h-32 w-32 group"
              onClick={handleOpenProfileImageModal}
            >
              <Image
                src={user?.photo == null ? PFP : user.photo}
                alt="profile picture"
                width={128}
                height={128}
                className="mx-auto h-32 w-32 rounded-full border-2 border-orange-500 shadow-lg group-hover:opacity-70 transition-opacity duration-300 "
              />
              <div
                className="absolute inset-0 flex items-center justify-center 
                  opacity-0 group-hover:opacity-100 transition-opacity duration-300 
                  cursor-pointer"
              >
                <Camera className="text-white w-10 h-10" />
              </div>
            </div>
            <div className="mt-4 flex items-center justify-center">
              <h1 className="text-3xl font-bold text-orange-400">
                {user?.name}
              </h1>
              <br />
            </div>
            <div>
              {isModalNameOpen && (
                <NameModal
                  onClose={handleCloseNameModal}
                  id={user?.id}
                  user={user}
                />
              )}
            </div>
            <div className="mt-2 flex items-center justify-center text-zinc-400">
              <Mail className="mr-2 h-4 w-4" />
              <span>{user?.email || "email@example.com"}</span>
              <button
                onClick={handleOpenEmailModal}
                disabled={user?.isActive === false ? true : false}
                className={`ml-2 p-1 rounded-full hover:text-orange-400 ${
                  user?.isActive === false ? "cursor-no-drop" : "cursor-pointer"
                } transition-colors`}
              >
                <Edit className="mr-2 h-4 w-4" />
                <span className="sr-only">{t("translation.email")}</span>
              </button>
            </div>
            <div>
              {isEmailModalOpen && (
                <EmailChangeModal
                  isOpen={handleOpenEmailModal}
                  onClose={handleCloseEmailModal}
                  userId={Number(user?.id)}
                />
              )}
            </div>
            <div className="mt-2 flex items-center justify-center">
              {user?.isActive === false ? (
                <span className={"text-red-500 font-bold"}>
                  {t("translation.banned")}
                </span>
              ) : (
                <span className={user?.role ? getRoleStyles(user.role) : ""}>
                  {user?.role || "N/A"}
                </span>
              )}
            </div>

            <div>
              {user?.isActive === false ? (
                <>
                  <br />
                  <span className={"text-red-500 font-bold"}>
                    {t("translation.ahora")}
                  </span>
                </>
              ) : null}
            </div>
            {user?.isActive === false ? null : (
              <button
                onClick={handleOpenModal}
                className="mt-8 bg-orange-400 hover:bg-orange-600 text-white px-4 py-2 rounded-md transition-colors flex items-center justify-center mx-auto"
              >
                <Download className="inline mr-1 h-4 w-4" />{" "}
                {t("translation.forje")}
              </button>
            )}
          </div>
          <div>
            {isModalOpen && (
              <ModalLoader
                onClose={handleCloseModal}
                id={user?.id}
                user={user}
              />
            )}
          </div>
          <div className="mt-8 flex flex-wrap justify-center space-x-4">
            <button
              disabled={user?.isActive === false ? true : false}
              onClick={(e) => {
                e.preventDefault();
                setIsPasswordModalOpen(true);
              }}
              className={`text-zinc-400 hover:text-orange-400  ${
                user?.isActive === false ? "cursor-no-drop" : "cursor-pointer"
              } transition-colors`}
            >
              <Lock className="inline mr-1 h-4 w-4" />{" "}
              {t("translation.password")}
            </button>
            <button
              disabled={user?.isActive === false ? true : false}
              className={`text-zinc-400 hover:text-orange-400 ${
                user?.isActive === false ? "cursor-no-drop" : "cursor-pointer"
              } transition-colors`}
            >
              <ShieldCheck className="inline mr-1 h-4 w-4" />{" "}
              {t("translation.Enable")} 2FA
            </button>
          </div>
          <br />
          <div className="max-w-fit ml-auto mr-auto">
            {user?.description === null ? (
              <button
                onClick={handleShowDescriptionEdit}
                className={`text-zinc-400 hover:text-orange-400 ${
                  user?.isActive === false ? "cursor-no-drop" : "cursor-pointer"
                } transition-colors`}
              >
                {descriptionOpen ? null : (
                  <Pencil className="inline mr-1 h-4 w-4" />
                )}
                {descriptionOpen ? null : t("translation.alala")}
              </button>
            ) : (
              <button
                onClick={handleShowDescriptionEdit}
                className={`text-zinc-400 hover:text-orange-400 ${
                  user?.isActive === false ? "cursor-no-drop" : "cursor-pointer"
                } transition-colors`}
              >
                {descriptionOpen ? null : (
                  <Pencil className="inline mr-1 h-4 w-4" />
                )}
                {descriptionOpen ? null : t("translation.att")}
              </button>
            )}
            <div>
              {descriptionOpen && (
                <div className="mt-10 mb-10">
                  <div className="container mx-auto px-4 -mt-16">
                    <div className="text-center">
                      <div className="z-50">
                        <motion.form
                          initial={{ opacity: 0, scale: 0.5 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{
                            duration: 0.8,
                            delay: 0.5,
                            ease: [0, 0.71, 0.2, 1.01],
                          }}
                          onSubmit={handleSubmit}
                        >
                          <div className="mt-6  rounded-xl shadow-2xl p-6 outline-none border  border-orange-500 min-w-full">
                            <div className="flex flex-col">
                              <div className="self-end">
                                <button
                                  onClick={handleUnShowDescriptionEdit}
                                  className="text-3xl text-orange-600 mb-5 hover:text-orange-400"
                                >
                                  <X size={40} />
                                </button>
                              </div>
                            </div>
                            <div>
                              <motion.div
                                initial={{ opacity: 0, scale: 0.5 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{
                                  duration: 0.9,
                                  ease: [0, 0.71, 0.2, 1.01],
                                  scale: {
                                    type: "spring",
                                    damping: 5,
                                    stiffness: 100,
                                    restDelta: 0.001,
                                  },
                                }}
                                className="mb-32"
                              >
                                <ReactQuill
                                  modules={{
                                    toolbar: toolbarOptions,
                                  }}
                                  theme="snow"
                                  value={String(newDescription)}
                                  onChange={(evento) => setNew(evento)}
                                  className="quill-editor custom-toolbar text-white outline-none border-zinc-200 h-40 w-[33rem]"
                                  style={{
                                    minWidth: "auto",
                                    minHeight: "auto",
                                  }}
                                />
                              </motion.div>
                            </div>
                            <motion.button
                              initial={{ opacity: 0, y: -50 }}
                              animate={{ opacity: 1, y: 0 }}
                              transition={{ duration: 3 }}
                              type="submit"
                              className="bg-orange-600 shadow-2xl rounded-lg hover:bg-orange-400 px-8 py-2"
                            >
                              {t("translation.userr")}
                            </motion.button>
                          </div>
                        </motion.form>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
          <div className="mt-16 space-y-5 pb-32">
            {products.map((product, index) => {
              const isActive = isProductActive(product.name);
              return (
                <div
                  key={index}
                  className={`relative w-full h-48 md:h-56 rounded-lg overflow-hidden ${
                    !isActive ? "group cursor-pointer" : ""
                  }`}
                  onClick={() => {
                    isActive
                      ? ""
                      : (window.location.href = `/product/${product.link}`);
                  }}
                >
                  <Image
                    src={product.image}
                    alt={`banner ${product.name}`}
                    layout="fill"
                    objectFit="cover"
                    className={`transition-all duration-300 ${
                      !isActive
                        ? "filter grayscale group-hover:grayscale-0"
                        : ""
                    }`}
                  />
                  <div className="relative h-full flex flex-col justify-center items-center">
                    <h2 className="text-5xl font-bold text-white text-center">
                      {product.name.replace("_", " ")}
                    </h2>
                    {isActive ? (
                      <>
                        <p className="absolute bottom-3 right-3 text-white">
                          Subscription end:{" "}
                          <span className="font-bold">
                            {getRemainingDays(product.name)}
                            {getRemainingDays(product.name) == "NEVER"
                              ? ""
                              : "d"}
                          </span>
                        </p>
                        <div className="absolute bottom-3 left-3 flex space-x-2">
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              handleDownload(product.downloadLink);
                            }}
                            className="bg-orange-400 hover:bg-orange-600 text-white px-3 py-1 rounded transition-colors flex items-center"
                          >
                            <Download className="mr-1 h-4 w-4" /> Download
                          </button>
                          <button className="bg-orange-400 hover:bg-orange-600 text-white px-3 py-1 rounded transition-colors flex items-center">
                            <RefreshCw className="mr-1 h-4 w-4" /> Reset HWID
                          </button>
                          <button className="bg-orange-400 hover:bg-orange-600 text-white px-3 py-1 rounded transition-colors flex items-center">
                            <Clock className="mr-1 h-4 w-4" /> Freeze
                          </button>
                        </div>
                      </>
                    ) : (
                      <p className="absolute bottom-3 right-3 text-white">
                        Starting From{" "}
                        <span className="font-bold">R$ {product.price}</span>
                      </p>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
        {isProfileImageModalOpen && (
          <ImageChangeModal
            isOpen={isProfileImageModalOpen}
            onClose={handleCloseProfileImageModal}
            userId={user?.id || 0}
            currentImage={user?.photo || PFP}
          />
        )}
        <PasswordChangeModal
          isOpen={isPasswordModalOpen}
          onClose={() => setIsPasswordModalOpen(false)}
          userId={user?.id || 0}
        />
      </main>

      <Aside />
    </div>
  );
}
