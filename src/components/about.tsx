'use client'

import React, { useState } from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { ChevronDown, ChevronUp, User } from 'lucide-react'

export default function About() {
  const [showSecret, setShowSecret] = useState(false)
  const [openFaq, setOpenFaq] = useState<string | null>(null)

  const timelineEvents = [
    { year: 2021, event: "Born as 'Fifty aim'" },
    { year: 2022, event: "Reached 1,000 badass users" },
    { year: 2023, event: "Expanded to new games" },
    { year: 2024, event: "Rebranded to fanta.club" },
  ]

  const teamMembers = [
    { id: '2', name: 'Pozinho' },
    { id: '3', name: 'Lkzin' },
    { id: '1', name: 'Faccin' }
  ]

  const faqItems = [
    { 
      question: "Unmatched Performance", 
      answer: "Our cheats are optimized for speed and efficiency. You'll feel like you're playing with god mode on!" 
    },
    { 
      question: "Stealth Mode", 
      answer: "We've mastered the art of staying undetected. Cheat with confidence, knowing you're invisible to anti-cheat systems." 
    },
    { 
      question: "Badass Community", 
      answer: "Join our Discord and be part of a thriving community of elite cheaters. Share exploits, tricks, and dominate together!" 
    },
  ]

  return (
    <div className="min-h-screen bg-zinc-900 text-zinc-100 p-8 font-sans">
      <motion.h1 
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-4xl font-bold text-orange-500 mb-6"
      >
        Welcome to the fanta.club
      </motion.h1>

      <motion.p 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.5 }}
        className="text-xl mb-8"
      >
        Yo, Valorant cheater! 👋 We're not just another cheat provider - we're your secret weapon in the Valorant battleground. Born from the twisted minds of three hardcore gamers in 2021, we're on a mission to turn your gameplay into pure domination.
      </motion.p>

      <h2 className="text-2xl font-semibold mb-4">Our Badass Journey</h2>
      <div className="space-y-4 mb-8">
        {timelineEvents.map((event, index) => (
          <motion.div 
            key={index}
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 * index, duration: 0.5 }}
            className="flex items-center space-x-4"
          >
            <div className="w-16 text-right">{event.year}</div>
            <div className="text-orange-500">→</div>
            <div>{event.event}</div>
          </motion.div>
        ))}
      </div>

      <h2 className="text-2xl font-semibold mb-4">Meet the Cheat Masterminds</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        {teamMembers.map((member) => (
          <Link 
            href={`/user/${member.id}`} 
            key={member.id}
            className="bg-zinc-800 p-4 rounded-lg transition-transform hover:scale-105 cursor-pointer"
          >
            <div className="w-12 h-12 bg-orange-500 rounded-full mb-2 flex items-center justify-center text-2xl">
              <User className="w-6 h-6 text-zinc-900" />
            </div>
            <h3 className="text-lg font-semibold">{member.name}</h3>
            <p className="text-sm text-zinc-400">Co-founder</p>
          </Link>
        ))}
      </div>
      <h2 className="text-2xl font-semibold mb-4">Why fanta.club Kicks Ass</h2>
      <div className="mb-8">
        {faqItems.map((item, index) => (
          <div key={index} className="mb-4">
            <button
              onClick={() => setOpenFaq(openFaq === item.question ? null : item.question)}
              className="w-full text-left p-4 bg-zinc-800 rounded-lg focus:outline-none flex justify-between items-center"
              aria-expanded={openFaq === item.question}
              aria-controls={`faq-answer-${index}`}
            >
              <span className="font-semibold">{item.question}</span>
              {openFaq === item.question ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
            </button>
            {openFaq === item.question && (
              <motion.div 
                id={`faq-answer-${index}`}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="p-4 bg-zinc-700 rounded-b-lg mt-1"
              >
                {item.answer}
              </motion.div>
            )}
          </div>
          
        ))}
      </div>
      <div className="text-center mb-8">
        <button 
          onClick={() => setShowSecret(!showSecret)}
          className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded"
          aria-expanded={showSecret}
        >
          {showSecret ? "Hide the Secret" : "Reveal the Secret"}
        </button>
        {showSecret && (
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-4 text-lg"
          >
            Psst... Use code "FANTACHEATS" for a sick 20% discount on your first purchase! 🎉
          </motion.p>
        )}
        </div>

      <div className="text-center">
        <h2 className="text-2xl font-semibold mb-4">Ready to Crush Your Opponents?</h2>
        <button className="bg-green-500 hover:bg-green-600 text-white px-6 py-3 rounded text-lg font-bold">
          Join fanta.club now!
        </button>
      </div>
      </div>
      
    )
  }