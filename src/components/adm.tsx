"use client";

import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import React, { useState, useEffect } from "react";
import { Gavel, X, Trash2 } from "lucide-react";
import { useRouter } from "next/navigation";
import PFP from "@/assets/images/b-2.jpg";
import { useTranslation } from "react-i18next";
import { checkLoginStatus } from "@/utils/auth";
import Image from "next/image";

interface AdmComponentProps {
  LogedUser: User | null;
}

interface User {
  id: number;
  name: string;
  email: string;
  photo: string | null;
  registeredDate: string;
  role: string;
  isActive: boolean;
}

interface MeProps {
  user: User | null;
}

interface Coupon {
  id: number;
  name: string;
  discount: number;
  createdAt: string;
  expiryDate: string;
  createdById: number;
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

export default function AdmComponent(
  { LogedUser }: AdmComponentProps,
  { user }: MeProps
) {
  const [users, setUsers] = useState<User[]>([]);
  const [coupons, setCoupons] = useState<Coupon[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isDisable, setIsDisable] = useState<boolean>(true);

  const [orders, setOrders] = useState<Order[]>([]);
  const [isPasswordModalOpen, setIsPasswordModalOpen] = useState(false);
  const rota = useRouter();

  // User Fetch /////////////////////////
  useEffect(() => {
    const fetchOrders = async () => {
      if (user) {
        if (user.role != "FANTA" || "Moderator") {
          rota.back();
        }
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
  /////////////////////////////////////////

  const [usere, setUser] = useState<User | null>(null);
  useEffect(() => {
    async function fetchUserData() {
      try {
        const { isLoggedIn, user } = await checkLoginStatus();
        setUser(user);
      } catch (err) {
        setError("Failed to fetch user data");
      } finally {
        setLoading(false);
      }
    }

    fetchUserData();
  }, []);

  //// Users Fetch /////////////////////////
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [usersResponse] = await Promise.all([
          fetch("http://localhost:3535/users"),
        ]);

        if (!usersResponse.ok) {
          throw new Error("Failed to fetch users");
        }

        const userData = await usersResponse.json();

        setUsers(userData);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to fetch data");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);
  ////////////////////////////

  const itensPerPage: number = 7;
  const { t } = useTranslation();
  const [userPage, setUserPage] = useState<number>(1);
  const [couponPage, setCouponPage] = useState<number>(1);
  const totalUserPages = Math.ceil((users?.length || 0) / itensPerPage);
  const totalCouponPages = Math.ceil(coupons.length / itensPerPage);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newCoupon, setNewCoupon] = useState<
    Omit<Coupon, "id" | "createdAt" | "createdById">
  >({
    name: "",
    discount: 0,
    expiryDate: "",
  });

  const currentUsers = users.slice(
    (userPage - 1) * itensPerPage,
    userPage * itensPerPage
  );

  const currentCoupons = coupons.slice(
    (couponPage - 1) * itensPerPage,
    couponPage * itensPerPage
  );

  const handleUserPageChange = (newPage: number) => {
    setUserPage(newPage);
  };

  const handleCouponPageChange = (newPage: number) => {
    setCouponPage(newPage);
  };

  const renderPaginationButtons = (
    currentPage: number,
    totalPages: number,
    onPageChange: (page: number) => void
  ) => {
    const buttons = [];
    const maxVisibleButtons = 5;
    let startPage = Math.max(
      1,
      currentPage - Math.floor(maxVisibleButtons / 2)
    );
    let endPage = Math.min(totalPages, startPage + maxVisibleButtons - 1);

    if (endPage - startPage + 1 < maxVisibleButtons) {
      startPage = Math.max(1, endPage - maxVisibleButtons + 1);
    }

    for (let i = startPage; i <= endPage; i++) {
      buttons.push(
        <button
          key={i}
          onClick={() => onPageChange(i)}
          className={`px-3 py-2 rounded-lg transition-colors ${
            currentPage === i
              ? "bg-orange-500 text-white"
              : "bg-gray-600 text-zinc-100 hover:bg-orange-600"
          }`}
        >
          {i}
        </button>
      );
    }

    return buttons;
  };

  const handleCreateCoupon = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:3535/coupons", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...newCoupon,
          createdById: LogedUser != null ? LogedUser.id : "n logado",
          createdAt: new Date().toISOString(),
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to create coupon");
      }

      const createdCoupon = await response.json();
      setCoupons([...coupons, createdCoupon]);
      setIsModalOpen(false);
      setNewCoupon({ name: "", discount: 0, expiryDate: "" });
    } catch (err) {
      console.error("Error creating coupon:", err);
      alert("Failed to create coupon");
    }
  };

  const handleDeleteCoupon = async (id: number) => {
    try {
      const response = await fetch(`http://localhost:3535/coupons/${id}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error("Failed to delete coupon");
      }

      setCoupons(coupons.filter((coupon) => coupon.id !== id));
    } catch (err) {
      console.error("Error deleting coupon:", err);
      alert("Failed to delete coupon");
    }
  };

  const handleToggleUserStatus = async (userId: number) => {
    try {
      const response = await fetch(
        `http://localhost:3535/users/toggle-status/${userId}`,
        {
          method: "PATCH",
        }
      );

      if (!response.ok) {
        throw new Error("Failed to toggle user status");
      }

      // Atualiza a lista de usuários com o novo status
      setUsers(
        users.map((user) => {
          if (user.id === userId) {
            return {
              ...user,
              isActive: !user.isActive,
            };
          }
          return user;
        })
      );
    } catch (error) {
      console.error("Error toggling user status:", error);
      alert("Failed to toggle user status");
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-zinc-900 text-zinc-100 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-orange-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-zinc-900 text-zinc-100 flex items-center justify-center">
        <div className="text-red-500">Error: {error}</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-zinc-900 text-zinc-100">
      <div className="p-8 font-sans">
        <motion.h1
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.1, duration: 0.5 }}
          className="text-left text-3xl font-bold tracking-tighter sm:text-3xl text-orange-400"
        >
          {t("translation.adm")}
        </motion.h1>
      </div>
      <section className="container mx-auto px-4">
        <h2 className="text-2xl font-bold mb-4 text-orange-400">
          {t("translation.user")}
        </h2>
        <div className="overflow-x-auto">
          <table className="min-w-full border-collapse rounded-lg overflow-hidden shadow-xl text-left">
            <thead className="bg-gradient-to-r from-orange-500 via-orange-700 to-orange-400 text-white font-semibold">
              <tr>
                <th className="px-4 py-2 border-b border-zinc-800">Id</th>
                <th className="px-4 py-2 border-b border-zinc-800">
                  {t("translation.name_admin")}
                </th>
                <th className="px-4 py-2 border-b border-zinc-800">Email</th>
                <th className="px-4 py-2 border-b border-zinc-800">
                  {t("translation.role")}
                </th>
                <th className="px-4 py-2 border-b border-zinc-800">
                  {t("translation.regis")}
                </th>
                <th className="px-4 py-2 border-b border-zinc-800">Status</th>
                <th className="px-4 py-2 border-b border-zinc-800">
                  {t("translation.action_admin")}
                </th>
              </tr>
            </thead>
            <tbody>
              {currentUsers.map((userData) => (
                <tr key={userData.id} className="bg-zinc-800 transition-colors">
                  <td className="px-4 py-2 border-b border-zinc-800">
                    {userData.id}
                  </td>
                  <td className="px-4 py-2 border-b border-zinc-800">
                    <Link
                      href={`/user/${userData.id}`}
                      target="_blank"
                      className="text-orange-600 font-medium hover:text-orange-700 transition-colors"
                    >
                      {userData.name}
                    </Link>
                  </td>
                  <td className="px-4 py-2 border-b border-zinc-800">
                    {userData.email}
                  </td>
                  <td className="px-4 py-2 border-b border-zinc-800">
                    <span className={getRoleStyles(userData.role)}>
                      {userData.role}
                    </span>
                  </td>
                  <td className="px-4 py-2 border-b border-zinc-800">
                    {new Date(userData.registeredDate).toLocaleDateString()}
                  </td>
                  <td className="px-4 py-2 border-b border-zinc-800">
                    <span
                      className={`font-medium ${
                        userData.isActive ? "text-green-400" : "text-red-400"
                      }`}
                    >
                      {userData.isActive
                        ? t("translation.admin_ativo")
                        : t("translation.admin_nao_ativo")}
                    </span>
                  </td>
                  <td className="px-4 py-2 border-b border-zinc-800">
                    <button
                      onClick={() => handleToggleUserStatus(userData.id)}
                      disabled={
                        (usere?.role !== "FANTA" &&
                          userData.role === "FANTA") ||
                        userData.role === "Moderator"
                          ? true
                          : false
                      }
                      className={`${
                        userData.isActive
                          ? "bg-red-600 hover:bg-red-700 text-white"
                          : "bg-green-600 hover:bg-green-700 text-white"
                      } text-white font-medium px-3 py-[6px] rounded hover:bg-red-700 transition-colors flex items-center ${
                        (usere?.role !== "FANTA" &&
                          userData.role === "FANTA") ||
                        userData.role === "Moderator"
                          ? "cursor-no-drop"
                          : ""
                      }`}
                    >
                      <Gavel size={22} className="mr-2" />
                      {userData.isActive
                        ? t("translation.ban")
                        : t("translation.unban")}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="flex justify-center space-x-2 mt-4 flex-wrap">
          {renderPaginationButtons(
            userPage,
            totalUserPages,
            handleUserPageChange
          )}
        </div>
        <br />
      </section>

      <section className="container mx-auto px-4 mt-8">
        <h2 className="text-2xl font-bold mb-4 text-orange-400">
          {t("translation.cupom")}
        </h2>
        <div className="overflow-x-auto">
          <table className="min-w-full border-collapse rounded-lg overflow-hidden shadow-xl text-left">
            <thead className="bg-gradient-to-r from-orange-500 via-orange-700 to-orange-400 text-white font-semibold">
              <tr>
                <th className="px-4 py-2 border-b border-zinc-800">
                  {t("translation.cupom_name")}
                </th>
                <th className="px-4 py-2 border-b border-zinc-800">
                  {t("translation.cupom_discount")}
                </th>
                <th className="px-4 py-2 border-b border-zinc-800">
                  {t("translation.cupom_created_at")}
                </th>
                <th className="px-4 py-2 border-b border-zinc-800">
                  {t("translation.cupom_expire_in")}
                </th>
                <th className="px-4 py-2 border-b border-zinc-800">
                  {t("translation.action")}
                </th>
              </tr>
            </thead>
            <tbody>
              {currentCoupons.map((coupon) => (
                <tr key={coupon.id} className="bg-zinc-800 transition-colors">
                  <td className="px-4 py-2 border-b border-zinc-800">
                    {coupon.name}
                  </td>
                  <td className="px-4 py-2 border-b border-zinc-800">
                    {coupon.discount}%
                  </td>
                  <td className="px-4 py-2 border-b border-zinc-800">
                    {new Date(coupon.createdAt).toLocaleString()}
                  </td>
                  <td className="px-4 py-2 border-b border-zinc-800">
                    {new Date(coupon.expiryDate).toLocaleString()}
                  </td>
                  <td className="px-4 py-2 border-b border-zinc-800">
                    <button
                      onClick={() => handleDeleteCoupon(coupon.id)}
                      className="bg-red-600 text-white font-medium px-3 py-1 rounded hover:bg-red-700 transition-colors flex items-center"
                      aria-label={`Deletar cupom ${coupon.name}`}
                    >
                      <Trash2 size={16} className="mr-1" />
                      Deletar
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="flex justify-center space-x-2  mt-4 flex-wrap">
          {renderPaginationButtons(
            couponPage,
            totalCouponPages,
            handleCouponPageChange
          )}
        </div>
        <div className="flex justify-center mt-16">
          <motion.button
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.3 }}
            className="rounded-lg bg-orange-500 px-5 py-3 font-medium text-zinc-900 hover:bg-orange-600 transition-colors"
            onClick={() => setIsModalOpen(true)}
          >
            Gerar Cupom
          </motion.button>
        </div>
      </section>

      <AnimatePresence>
        {isModalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4"
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="bg-zinc-800 rounded-lg p-6 w-full max-w-md"
            >
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-bold text-orange-400">
                  Criar Novo Cupom
                </h2>
                <button
                  onClick={() => setIsModalOpen(false)}
                  className="text-zinc-400 hover:text-zinc-100"
                >
                  <X size={24} />
                </button>
              </div>
              <form onSubmit={handleCreateCoupon}>
                <div className="mb-4">
                  <label
                    htmlFor="name"
                    className="block text-sm font-medium text-zinc-300 mb-1"
                  >
                    Nome
                  </label>
                  <input
                    type="text"
                    id="name"
                    value={newCoupon.name}
                    onChange={(e) =>
                      setNewCoupon({ ...newCoupon, name: e.target.value })
                    }
                    className="w-full px-3 py-2 bg-zinc-700 text-zinc-100 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
                    required
                  />
                </div>
                <div className="mb-4">
                  <label
                    htmlFor="discount"
                    className="block text-sm font-medium text-zinc-300 mb-1"
                  >
                    Desconto (%)
                  </label>
                  <input
                    type="number"
                    id="discount"
                    value={newCoupon.discount}
                    onChange={(e) =>
                      setNewCoupon({
                        ...newCoupon,
                        discount: Number(e.target.value),
                      })
                    }
                    className="w-full px-3 py-2 bg-zinc-700 text-zinc-100 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
                    required
                    min="0"
                    max="100"
                  />
                </div>
                <div className="mb-6">
                  <label
                    htmlFor="expiresAt"
                    className="block text-sm font-medium text-zinc-300 mb-1"
                  >
                    Expira em
                  </label>
                  <input
                    type="datetime-local"
                    id="expiresAt"
                    value={newCoupon.expiryDate}
                    onChange={(e) =>
                      setNewCoupon({ ...newCoupon, expiryDate: e.target.value })
                    }
                    className="w-full px-3 py-2 bg-zinc-700 text-zinc-100 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
                    required
                  />
                </div>
                <div className="flex justify-end">
                  <button
                    type="submit"
                    className="bg-orange-500 text-zinc-900 px-4 py-2 rounded-md hover:bg-orange-600 transition-colors"
                  >
                    Criar Cupom
                  </button>
                </div>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
