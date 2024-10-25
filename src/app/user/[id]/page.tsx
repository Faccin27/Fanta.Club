'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import UserPage from '@/components/User';

interface User {
  id: number;
  name: string;
  email: string;
  photo: string | null;
  registeredDate: string;
  role: string;
}

export default function MainComponent() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  const params = useParams();
  const userId = params?.id as string;

  useEffect(() => {
    async function fetchUser() {
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API}/users/${userId}`);
        
        if (!response.ok) {
          if (response.status === 404) {
            throw new Error('Usuário não encontrado');
          }
          throw new Error('Erro ao buscar dados do usuário');
        }

        const userData = await response.json();
        setUser(userData);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Erro ao buscar dados do usuário');
      } finally {
        setLoading(false);
      }
    }

    if (userId) {
      fetchUser();
    }
  }, [userId]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900 mx-auto"></div>
          <p className="mt-2">Carregando...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-zinc-950">
        <div className="bg-zinc-900 text-red-700 px-4 py-3 rounded-md">
          {error}
        </div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="bg-yellow-50 text-yellow-700 px-4 py-3 rounded-md">
          Usuário não encontrado
        </div>
      </div>
    );
  }

  return <UserPage user={user} />;
}