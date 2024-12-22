"use client";

import React, { useEffect, useState } from "react";
import Aside from "./Aside";

interface VerifyProps {
  id: string;
}

const Verify: React.FC<VerifyProps> = ({ id }) => {
  const [status, setStatus] = useState<"loading" | "success" | "error">(
    "loading"
  );
  const [message, setMessage] = useState("");

  useEffect(() => {
    const verifyUser = async () => {
      try {
        const response = await fetch(
          `http://localhost:3535/users/verify/${id}`,
          {
            method: "POST",
          }
        );

        if (response.ok) {
          setStatus("success");
          setMessage("Email verificado com sucesso! Você já pode fazer login.");
        } else {
          const data = await response.json();
          setStatus("error");
          setMessage(data.message || "Erro ao verificar o email.");
        }
      } catch (error) {
        setStatus("error");
        setMessage(
          "Erro ao conectar com o servidor. Tente novamente mais tarde."
        );
      }
    };

    verifyUser();
  }, [id]);

  return (
    <div className="min-h-screen bg-zinc-900 text-zinc-100">
      <main className="flex flex-col items-center justify-center min-h-[80vh]">
        {status === "loading" && (
          <div className="flex flex-col items-center gap-4">
            <div className="w-8 h-8 border-4 border-zinc-500 border-t-zinc-100 rounded-full animate-spin" />
            <p>Verificando seu email...</p>
          </div>
        )}

        {status === "success" && (
          <div className="text-center space-y-4">
            <div className="text-green-500 text-6xl mb-4">✓</div>
            <h1 className="text-2xl font-bold text-green-500">
              Verificação Concluída!
            </h1>
            <p>{message}</p>
          </div>
        )}

        {status === "error" && (
          <div className="text-center space-y-4">
            <div className="text-red-500 text-6xl mb-4">✕</div>
            <h1 className="text-2xl font-bold text-red-500">
              Erro na Verificação
            </h1>
            <p>{message}</p>
          </div>
        )}
      </main>
      <Aside />
    </div>
  );
};

export default Verify;
