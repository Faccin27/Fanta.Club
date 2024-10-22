import React, { useState, useEffect } from "react";
import Image from "next/image";
import { CalendarDays, User as UserIcon } from "lucide-react";
import Aside from "./Aside";
import PFP from "@/assets/images/pfp.png";
import B1 from "@/assets/images/b-1.png";
import B2 from "@/assets/images/b-2.jpg";

interface User {
  id: number;
  name: string;
  email: string;
  photo: string | null;
  registeredDate: string;
  role: string;
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

const products: Product[] = [
  { name: "FANTA_UNBAN", image: B2, price: 50, link: "fantaunban" },
  { name: "FANTA_PRO", image: B1, price: 60, link: "fantapro" },
  { name: "FANTA_LIGHT", image: B2, price: 25, link: "fantalight" },
];

export default function Component({ user }: { user: User }) {
  const [orders, setOrders] = useState<Order[]>([]);

  // Função para definir o estilo do cargo
  const getRoleStyles = (role: string) => {
    switch (role) {
      case 'FANTA':
        return 'font-bold animate-pulse bg-gradient-to-r from-red-500 via-yellow-500 to-orange-500 text-transparent bg-clip-text';
      case 'Moderator':
        return 'text-purple-400 font-bold';
      case 'Premium':
        return 'text-orange-400 font-bold';
      default: 
        return 'text-zinc-400 font-bold';
    }
  };

  // Buscar os pedidos do usuário
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
  }, [user]);

  // Verificar se o produto está ativo
  const isProductActive = (productName: string) => {
    const order = orders.find((order) => order.name === productName);
    if (!order) return false;

    if (order.expiration === "LIFETIME") return true;

    const expirationDate = new Date(order.expirationDate);
    const today = new Date();
    return today < expirationDate;
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
              src={user.photo || PFP}
              alt="profile picture"
              width={128}
              height={128}
              className="mx-auto h-32 w-32 rounded-full border-2 border-orange-500 shadow-lg"
            />
            <div className="mt-4 flex items-center justify-center">
              <h1 className="text-3xl font-bold text-orange-400">
                {user.name}
              </h1>
            </div>
            <div className="mt-2 flex items-center justify-center">
              <UserIcon className="mr-2 h-4 w-4 text-zinc-400" />
              <span className={getRoleStyles(user.role)}>{user.role}</span>
            </div>
          </div>
          <div className="mt-8 flex flex-wrap justify-center space-x-4">
            <div className="text-zinc-400">
              <CalendarDays className="inline mr-1 h-4 w-4" /> 
              Member since {new Date(user.registeredDate).toLocaleDateString()}
            </div>
          </div>
          
          {/* Seção de banners dos produtos */}
          <div className="mt-16 space-y-5 pb-32">
            {products.map((product, index) => {
              const isActive = isProductActive(product.name);
              return (
                <div
                  key={index}
                  className="relative w-full h-48 md:h-56 rounded-lg overflow-hidden"
                >
                  <Image
                    src={product.image}
                    alt={`banner ${product.name}`}
                    layout="fill"
                    objectFit="cover"
                    className={`transition-all duration-300 ${
                      !isActive ? "filter grayscale" : ""
                    }`}
                  />
                  <div className="relative h-full flex flex-col justify-center items-center">
                    <h2 className="text-5xl font-bold text-white text-center">
                      {product.name.replace("_", " ")}
                    </h2>
                    {!isActive ? (
                      <p className="absolute bottom-3 right-3 text-white opacity-50">
                        Not Active
                      </p>
                    ) : (
                      <p className="absolute bottom-3 right-3 text-white">
                        Active
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