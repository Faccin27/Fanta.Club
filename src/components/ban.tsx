"use client";
import { BanModalFunction } from "@/components/Header";
import { useState } from "react";

export default function BanComponent() {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const handleCloseModalANdRedirect = () => {
    window.history.back();
  };

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100">
      {/* Ban Modal */}
      <div>
        <BanModalFunction closeModal={handleCloseModalANdRedirect} />
      </div>
    </div>
  );
}
