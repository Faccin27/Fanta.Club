'use client'

import { useState } from 'react'
import Image from 'next/image'
import { Check, ShoppingCart } from 'lucide-react'
import img1 from '@/assets/images/app-screen.png'
import img2 from '@/assets/images/logo.png'

const plans = [
  { id: 'daily', name: 'Diário', price: 9.99 },
  { id: 'weekly', name: 'Semanal', price: 49.99 },
  { id: 'monthly', name: 'Mensal', price: 149.99 },
]

const features = [
  'Valorant',
  'Fivem',
  'Call of duty',
  'Gamersclub',
  'Dayz',
  'Fortnite',
  'Apex',
  'Faceit',
]

export default function ProductPage() {
  const [selectedImage, setSelectedImage] = useState(0)
  const [selectedPlan, setSelectedPlan] = useState(plans[0])
  const [coupon, setCoupon] = useState('')

  const images = [
    img1,
    img1,
    img1,
    img1,
  ]

  const handleAddToCart = async () => {
    try {
      const response = await fetch('/api/add-to-cart', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          productId: 'unbanservice',
          planId: selectedPlan.id,
          coupon: coupon,
        }),
      })
      if (response.ok) {
        alert('Produto adicionado ao carrinho!')
      } else {
        alert('Erro ao adicionar produto ao carrinho.')
      }
    } catch (error) {
      console.error('Erro ao adicionar ao carrinho:', error)
      alert('Erro ao adicionar produto ao carrinho.')
    }
  }

  return (
    <div className="min-h-screen bg-zinc-900 text-white">
      <div className="container mx-auto px-4 py-8">
        <div className="grid md:grid-cols-2 gap-8 items-start">
          <div className="space-y-4">
            <div className="relative aspect-square bg-cover">
              <Image
                src={images[selectedImage]}
                alt="Produto em destaque"
                layout="fill"
                objectFit="contain"
                className="rounded-lg"
              />
            </div>
            <div className="grid grid-cols-4 gap-2">
              {images.map((img, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedImage(index)}
                  className={`relative aspect-square ${selectedImage === index ? 'ring-2 ring-green-500' : ''}`}
                >
                  <Image
                    src={img}
                    alt={`Miniatura ${index + 1}`}
                    layout="fill"
                    objectFit="cover"
                    className="rounded-md"
                  />
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-6 bg-zinc-800 p-6 rounded-lg h-full">
            <h1 className="text-3xl font-bold text-green-400">Fanta Unban</h1>
            <div className="flex items-center space-x-2">
              <span className="font-semibold">Status:</span>
              <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium  text-green-500 border border-green-500 shadow-md transition-all duration-300 hover:shadow-lg hover:bg-green-500 hover:text-black">
                <Check className="w-4 h-4 mr-2" />
                Working
              </span>
            </div>
            <div className="space-y-2">
              <label htmlFor="plan-select" className="block text-sm font-medium text-gray-300">
                Selecione o plano
              </label>
              <select
                id="plan-select"
                className="w-full bg-zinc-700 border-zinc-600 rounded-md p-2 text-white"
                onChange={(e) => setSelectedPlan(plans.find(plan => plan.id === e.target.value) || plans[0])}
              >
                {plans.map((plan) => (
                  <option key={plan.id} value={plan.id}>
                    {plan.name} - R$ {plan.price.toFixed(2)}
                  </option>
                ))}
              </select>
            </div>
            <div className="flex items-center space-x-2">
              <input 
                type="text"
                placeholder="Cupom de desconto" 
                className="flex-grow bg-zinc-700 border-zinc-600 rounded-md p-2 text-white"
                value={coupon}
                onChange={(e) => setCoupon(e.target.value)}
              />
              <button className="px-4 py-2 bg-zinc-700 border border-zinc-600 rounded-md hover:bg-zinc-600 transition-colors">
                Aplicar
              </button>
            </div>
            <div className="text-2xl font-bold">
              R$ {selectedPlan.price.toFixed(2)}
            </div>
            <button 
              className="w-full bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded-md transition-colors flex items-center justify-center"
              onClick={handleAddToCart}
            >
              <ShoppingCart className="w-4 h-4 mr-2" />
              Adicionar ao Carrinho
            </button>
            <p className="text-gray-300">
              Nosso serviço de remoção de banimento é a solução ideal para você que deseja recuperar o acesso 
              às suas contas em jogos e plataformas protegidas por anticheat. Com tecnologia de bypass avançada, 
              você poderá voltar a jogar sem preocupações.
            </p>
          </div>
        </div>

        <div className="mt-16 bg-zinc-800 rounded-lg p-8">
          <h2 className="text-2xl font-bold mb-6 text-center">Recursos do Serviço de Remoção de Banimento</h2>
          <div className="grid md:grid-cols-3 lg:grid-cols-4 gap-4">
            {features.map((feature, index) => (
              <div key={index} className="flex items-center space-x-2">
                <Check className="w-5 h-5 text-green-500 flex-shrink-0" />
                <span>{feature}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
