"use client";

import React, { useRef } from "react";
import Aside from "./Aside";
import PricingSection from "@/components/home/PriceSection";
import FeatureSection from "@/components/home/FeatureSection";
import ProductShowcase from "@/components/home/ProductSection";
import Hero from "@/components/home/HeroSection";

const MainPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-zinc-900 text-zinc-100 overflow-x-hidden">
      <main>
        <Hero />
        <ProductShowcase />
        <FeatureSection />
        <PricingSection />
      </main>
      <Aside />
    </div>
  );
};

export default MainPage;
