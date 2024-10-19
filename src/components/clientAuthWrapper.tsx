'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import { checkLoginStatus, User } from '@/utils/auth'
import Header from '@/components/Header'
import Logo from '@/assets/images/logo.png'

interface ClientAuthWrapperProps {
  children: React.ReactNode
}

export default function ClientAuthWrapper({ children }: ClientAuthWrapperProps) {
  const [isChecking, setIsChecking] = useState(true)
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [user, setUser] = useState<User | null>(null)
  const [isSpinning, setIsSpinning] = useState(true)

  useEffect(() => {
    const checkAuth = async () => {
      const { isLoggedIn, user } = await checkLoginStatus()
      setIsLoggedIn(isLoggedIn)
      setUser(user)
      setIsChecking(false)
    }

    checkAuth()
  }, [])

  useEffect(() => {
    const spinInterval = setInterval(() => {
      setIsSpinning((prev) => !prev)
    }, 3000) 

    return () => clearInterval(spinInterval)
  }, [])

  if (isChecking) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-zinc-900">
        <div className={`transition-transform duration-3000 ease-in-out ${isSpinning ? 'rotate-360' : 'rotate-0'}`}>
          <Image
            src={Logo}
            alt="Fanta Cheats Logo"
            width={500}
            height={500}
            className="w-80 h-80 object-contain"
          />
        </div>
      </div>
    )
  }

  return (
    <>
      <Header isLoggedIn={isLoggedIn} user={user} />
      {children}
    </>
  )
}