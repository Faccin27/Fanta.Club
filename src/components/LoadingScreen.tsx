"use client"

import Image from 'next/image'
import { useEffect, useState } from 'react'
import logo from '@/assets/images/logo.png'

export default function LoadingScreen() {
  const [isSpinning, setIsSpinning] = useState(true)

  useEffect(() => {
    const spinInterval = setInterval(() => {
      setIsSpinning((prev) => !prev)
    }, 3000) 

    return () => clearInterval(spinInterval)
  }, [])

  return (
    <div className="flex items-center justify-center min-h-screen bg-zinc-900">
      <div className={`transition-transform duration-3000 ease-in-out ${isSpinning ? 'rotate-360' : 'rotate-0'}`}>
        <Image
          src={logo}
          alt="Fanta Cheats Logo"
          width={300}
          height={300}
          className="w-64 h-64 object-contain"
        />
      </div>
    </div>
  )
}