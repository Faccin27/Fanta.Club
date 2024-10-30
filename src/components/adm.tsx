'use client'

import { motion, AnimatePresence } from "framer-motion"
import Link from "next/link"
import React, { useState } from "react"
import Data1 from "@/data/atividade.json"
import { UserIcon, X, Trash2 } from "lucide-react"

interface User {
  id: number
  name: string
  email: string
  photo: string | null
  registeredDate: string
  role: string
}

interface Atividade {
  nome: string
  user_id: string
  email: string
  plano: string
}

interface Coupon {
  id: string
  name: string
  discount: number
  createdAt: string
  expiresAt: string
}

const getRoleStyles = (role: string) => {
  switch (role) {
    case "FANTA":
      return "font-bold animate-pulse bg-gradient-to-r from-red-500 via-yellow-500 to-orange-500 text-transparent bg-clip-text"
    case "Moderator":
      return "text-purple-400 font-bold"
    case "Premium":
      return "text-orange-400 font-bold"
    default:
      return "text-zinc-400 font-bold"
  }
}

export default function AdmComponent({ user }: { user: User }) {
  const atividade: Atividade[] = Data1
  const [coupons, setCoupons] = useState<Coupon[]>([
    { id: "1", name: "SUMMER2023", discount: 20, createdAt: "2023-06-01T12:00", expiresAt: "2023-08-31T23:59" },
    { id: "2", name: "WELCOME10", discount: 10, createdAt: "2023-05-15T09:00", expiresAt: "2023-12-31T23:59" },
    { id: "3", name: "FLASH50", discount: 50, createdAt: "2023-07-01T00:00", expiresAt: "2023-07-02T23:59" },
    { id: "4", name: "NEWUSER25", discount: 25, createdAt: "2023-06-15T10:00", expiresAt: "2023-09-15T23:59" },
    { id: "5", name: "HOLIDAY15", discount: 15, createdAt: "2023-12-01T00:00", expiresAt: "2023-12-25T23:59" },
    { id: "6", name: "SPRING30", discount: 30, createdAt: "2023-03-20T09:00", expiresAt: "2023-06-20T23:59" },
    { id: "7", name: "LOYALTY20", discount: 20, createdAt: "2023-01-01T00:00", expiresAt: "2023-12-31T23:59" },
    { id: "8", name: "WEEKEND40", discount: 40, createdAt: "2023-07-07T18:00", expiresAt: "2023-07-09T23:59" },
    { id: "9", name: "MOBILE15", discount: 15, createdAt: "2023-08-01T00:00", expiresAt: "2023-10-31T23:59" },
    { id: "10", name: "BDAY30", discount: 30, createdAt: "2023-09-01T00:00", expiresAt: "2023-09-30T23:59" },
    { id: "11", name: "FALL25", discount: 25, createdAt: "2023-09-22T09:00", expiresAt: "2023-11-30T23:59" },
    { id: "12", name: "CYBER50", discount: 50, createdAt: "2023-11-27T00:00", expiresAt: "2023-11-27T23:59" },
    { id: "13", name: "XMAS20", discount: 20, createdAt: "2023-12-15T00:00", expiresAt: "2023-12-25T23:59" },
    { id: "14", name: "NEWYEAR30", discount: 30, createdAt: "2023-12-31T18:00", expiresAt: "2024-01-02T23:59" },
    { id: "15", name: "VALENTINE15", discount: 15, createdAt: "2024-02-01T00:00", expiresAt: "2024-02-14T23:59" },
    { id: "16", name: "EASTER25", discount: 25, createdAt: "2024-03-15T00:00", expiresAt: "2024-04-10T23:59" },
    { id: "17", name: "EARTH20", discount: 20, createdAt: "2024-04-22T00:00", expiresAt: "2024-04-22T23:59" },
    { id: "18", name: "MOTHER30", discount: 30, createdAt: "2024-05-01T00:00", expiresAt: "2024-05-12T23:59" },
    { id: "19", name: "FATHER25", discount: 25, createdAt: "2024-06-01T00:00", expiresAt: "2024-06-16T23:59" },
    { id: "20", name: "BACKSCHOOL40", discount: 40, createdAt: "2024-08-01T00:00", expiresAt: "2024-09-15T23:59" },
    { id: "21", name: "HALLOWEEN20", discount: 20, createdAt: "2024-10-15T00:00", expiresAt: "2024-10-31T23:59" },
    { id: "22", name: "BLACKFRI60", discount: 60, createdAt: "2024-11-29T00:00", expiresAt: "2024-11-29T23:59" },
  ])

  const itensPerPage: number = 7
  const [userPage, setUserPage] = useState<number>(1)
  const [couponPage, setCouponPage] = useState<number>(1)
  const totalUserPages = Math.ceil(atividade.length / itensPerPage)
  const totalCouponPages = Math.ceil(coupons.length / itensPerPage)

  const [isModalOpen, setIsModalOpen] = useState(false)
  const [newCoupon, setNewCoupon] = useState<Omit<Coupon, "id" | "createdAt">>({
    name: "",
    discount: 0,
    expiresAt: "",
  })

  const currentUsers = atividade.slice(
    (userPage - 1) * itensPerPage,
    userPage * itensPerPage
  )

  const currentCoupons = coupons.slice(
    (couponPage - 1) * itensPerPage,
    couponPage * itensPerPage
  )

  const handleUserPageChange = (newPage: number) => {
    setUserPage(newPage)
  }

  const handleCouponPageChange = (newPage: number) => {
    setCouponPage(newPage)
  }

  const renderPaginationButtons = (currentPage: number, totalPages: number, onPageChange: (page: number) => void) => {
    const buttons = []
    const maxVisibleButtons = 5
    let startPage = Math.max(1, currentPage - Math.floor(maxVisibleButtons / 2))
    let endPage = Math.min(totalPages, startPage + maxVisibleButtons - 1)

    if (endPage - startPage + 1 < maxVisibleButtons) {
      startPage = Math.max(1, endPage - maxVisibleButtons + 1)
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
      )
    }

    return buttons
  }

  const handleCreateCoupon = (e: React.FormEvent) => {
    e.preventDefault()
    const createdCoupon: Coupon = {
      ...newCoupon,
      id: (coupons.length + 1).toString(),
      createdAt: new Date().toISOString().slice(0, 16),
    }
    setCoupons([...coupons, createdCoupon])
    setIsModalOpen(false)
    setNewCoupon({ name: "", discount: 0, expiresAt: "" })
  }

  const handleDeleteCoupon = (id: string) => {
    setCoupons(coupons.filter(coupon => coupon.id !== id))
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
          Área de Administração
        </motion.h1>
      </div>
      <section className="container mx-auto px-4">
        <h2 className="text-2xl font-bold mb-4 text-orange-400">Usuarios</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full border-collapse rounded-lg overflow-hidden shadow-xl text-left">
            <thead className="bg-gradient-to-r from-orange-500 via-orange-700 to-orange-400 text-white font-semibold">
              <tr>
                <th className="px-4 py-2 border-b border-zinc-800">Id</th>
                <th className="px-4 py-2 border-b border-zinc-800">Nome</th>
                <th className="px-4 py-2 border-b border-zinc-800">Email</th>
                <th className="px-4 py-2 border-b border-zinc-800">Plano</th>
                <th className="px-4 py-2 border-b border-zinc-800">Ação</th>
              </tr>
            </thead>
            <tbody>
              {currentUsers.map(({ nome, user_id, email, plano }, index) => (
                <tr key={index} className="bg-zinc-800 transition-colors">
                  <td className="px-4 py-2 border-b border-zinc-800">
                    {user_id}
                  </td>
                  <td className="px-4 py-2 border-b border-zinc-800">
                    <Link
                      href={`/me/:${user?.id}`}
                      target="_blank"
                      className="text-orange-600 font-medium hover:text-orange-700 transition-colors"
                    >
                      {nome}
                    </Link>
                  </td>
                  <td className="px-4 py-2 border-b border-zinc-800">
                    {email}
                  </td>
                  <td className="px-4 py-2 border-b border-zinc-800">
                    <span className="text-green-400 font-medium">{plano}</span>
                  </td>
                  <td className="px-4 py-2 border-b border-zinc-800">
                    <button className="bg-red-600 text-white font-medium px-3 py-1 rounded hover:bg-red-700 transition-colors">
                      Banir
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="flex justify-center space-x-2 mt-4 flex-wrap">
          {renderPaginationButtons(userPage, totalUserPages, handleUserPageChange)}
        </div>
        <br />
      </section>

      <section className="container mx-auto px-4 mt-8">
        <h2 className="text-2xl font-bold mb-4 text-orange-400">Cupons</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full border-collapse rounded-lg overflow-hidden shadow-xl text-left">
            <thead className="bg-gradient-to-r from-orange-500 via-orange-700 to-orange-400 text-white font-semibold">
              <tr>
                <th className="px-4 py-2 border-b border-zinc-800">Nome</th>
                <th className="px-4 py-2 border-b border-zinc-800">Desconto</th>
                <th className="px-4 py-2 border-b border-zinc-800">Criado em</th>
                <th className="px-4 py-2 border-b border-zinc-800">Expira em</th>
                <th className="px-4 py-2 border-b border-zinc-800">Ação</th>
              </tr>
            </thead>
            <tbody>
              {currentCoupons.map((coupon) => (
                <tr key={coupon.id} className="bg-zinc-800 transition-colors">
                  <td className="px-4 py-2 border-b border-zinc-800">{coupon.name}</td>
                  <td className="px-4 py-2 border-b border-zinc-800">{coupon.discount}%</td>
                  <td className="px-4 py-2 border-b border-zinc-800">{new Date(coupon.createdAt).toLocaleString()}</td>
                  <td className="px-4 py-2 border-b border-zinc-800">{new Date(coupon.expiresAt).toLocaleString()}</td>
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
          {renderPaginationButtons(couponPage, totalCouponPages, handleCouponPageChange)}
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
                <h2 className="text-xl font-bold text-orange-400">Criar Novo Cupom</h2>
                <button
                  onClick={() => setIsModalOpen(false)}
                  className="text-zinc-400 hover:text-zinc-100"
                >
                  <X size={24} />
                </button>
              </div>
              <form onSubmit={handleCreateCoupon}>
                <div className="mb-4">
                  <label htmlFor="name" className="block text-sm font-medium text-zinc-300 mb-1">
                    Nome
                  </label>
                  <input
                    type="text"
                    id="name"
                    value={newCoupon.name}
                    onChange={(e) => setNewCoupon({ ...newCoupon, name: e.target.value })}
                    className="w-full px-3 py-2 bg-zinc-700 text-zinc-100 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
                    required
                  />
                </div>
                <div className="mb-4">
                  <label htmlFor="discount" className="block text-sm font-medium text-zinc-300 mb-1">
                    Desconto (%)
                  </label>
                  <input
                    type="number"
                    id="discount"
                    value={newCoupon.discount}
                    onChange={(e) => setNewCoupon({ ...newCoupon, discount: Number(e.target.value) })}
                    className="w-full px-3 py-2 bg-zinc-700 text-zinc-100 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
                    required
                    min="0"
                    max="100"
                  />
                </div>
                <div className="mb-6">
                  <label htmlFor="expiresAt" className="block text-sm font-medium text-zinc-300 mb-1">
                    Expira em
                  </label>
                  <input
                    type="datetime-local"
                    id="expiresAt"
                    value={newCoupon.expiresAt}
                    onChange={(e) => setNewCoupon({ ...newCoupon, expiresAt: e.target.value })}
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
  )
}