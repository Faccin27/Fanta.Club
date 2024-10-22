import React, { useState, useEffect } from "react";
import B1 from "@/assets/images/b-1.png";
import B2 from "@/assets/images/b-2.jpg";
import PFP from "@/assets/images/pfp.png";
import {
  Clock,
  Download,
  Edit,
  Lock,
  Mail,
  RefreshCw,
  ShieldCheck,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import Aside from "./Aside";

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
  role: string;
  createdAt: string;
  updatedAt: string;
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

interface Product {
  name: string;
  image: any;
  price: number;
  link: string;
}

interface MeProps {
  user: User | null;
}

const products: Product[] = [
  { name: "FANTA_UNBAN", image: B2, price: 50, link: "fantaunban" },
  { name: "FANTA_PRO", image: B1, price: 60, link: "fantapro" },
  { name: "FANTA_LIGHT", image: B2, price: 25, link: "fantalight" },
];

export default function Component({ user }: MeProps) {
  const [orders, setOrders] = useState<Order[]>([]);

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
          const data = await response.json();
          setOrders(data);
        } catch (error) {
          console.error("Error fetching orders:", error);
        }
      }
    };
    fetchOrders();
    console.log(orders);
  }, []);

  const isProductActive = (productName: string) => {
    const order = orders.find((order) => order.name === productName);
    if (!order) return false;

    if (order.expiration === "LIFETIME") return true;

    const expirationDate = new Date(order.expirationDate);
    const today = new Date();
    return today < expirationDate;
  };

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

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100">
      <main>
        <div className="relative">
          <div className="h-40"></div>
        </div>
        <div className="container mx-auto px-4 -mt-16">
          <div className="text-center">
            <Image
              src={user?.photo == null ? PFP : user.photo}
              alt="profile picture"
              width={128}
              height={128}
              className="mx-auto h-32 w-32 rounded-full border-2 border-orange-500 shadow-lg"
            />
            <div className="mt-4 flex items-center justify-center">
              <h1 className="text-3xl font-bold text-orange-400">
                {user?.name}
              </h1>
              <button className="ml-2 p-1 rounded-full hover:text-orange-400 transition-colors">
                <Edit className="mr-2 h-4 w-4" />
                <span className="sr-only">Edit Profile</span>
              </button>
            </div>
            <div className="mt-2 flex items-center justify-center text-zinc-400">
              <Mail className="mr-2 h-4 w-4" />
              <span>{user?.email || "email@example.com"}</span>
            </div>
            <button className="mt-8 bg-orange-400 hover:bg-orange-600 text-white px-4 py-2 rounded-md transition-colors flex items-center justify-center mx-auto">
              <Download className="inline mr-1 h-4 w-4" /> Download Loader
            </button>
          </div>
          <div className="mt-8 flex flex-wrap justify-center space-x-4">
            <Link
              href="#"
              className="text-zinc-400 hover:text-orange-400 transition-colors"
            >
              <Lock className="inline mr-1 h-4 w-4" /> Change Password
            </Link>
            <Link
              href="#"
              className="text-zinc-400 hover:text-orange-400 transition-colors"
            >
              <ShieldCheck className="inline mr-1 h-4 w-4" /> Enable 2FA
            </Link>
          </div>
          {/* SEÇÃO DO BANNER DO PRODUTO */}
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
                          <button className="bg-orange-400 hover:bg-orange-600 text-white px-3 py-1 rounded transition-colors flex items-center">
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
      </main>

      <Aside />
    </div>
  );
}
