"use client"

import { useEffect, useState } from 'react';

export default function Scroll() {
    const [scrollPercentage, setScrollPercentage] = useState(0);

    // Função para caluclar a quantidade da págian já visitada //////////////////////////////
    const handleScrollPercent = () => {
      const scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
      const scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      const scrollPercent = (scrollTop / scrollHeight) * 100;
      setScrollPercentage(scrollPercent);
    };

    // adicionando na janela //////////////////////////

    useEffect(()=>{
        window.addEventListener("scroll", handleScrollPercent)
        return () => {
            window.removeEventListener("scroll", handleScrollPercent)
        }
    },[])


    return (
        <nav className="fixed top-24 left-0 w-full">
            <div 
                className="relative h-0.5 bg-gray-200"
            >
                <div 
                    className="h-full bg-orange-500 transition-all duration-200" 
                    style={{ width: `${scrollPercentage}%` }}    
                />
                <span 
                    className="absolute right-0 top-12 text-xs text-gray-700 z-50"
                    style={{ right: `${100 - scrollPercentage}%` }}
                >
                </span>
            </div>
        </nav>
    )
}