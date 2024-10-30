'use client'
import { useEffect, useState } from 'react';
import { checkLoginStatus, User } from '@/utils/auth';
import AdmComponent from "@/components/adm";

export default function AdministradorPage() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchUserData() {
      try {
        const { isLoggedIn, user } = await checkLoginStatus();
        
        if (isLoggedIn && user && (user.role === 'Moderator' || user.role === 'FANTA')) {
          setUser(user);
        } else {
          window.location.href = '/'; 
        }
      } catch (err) {
        setError('Failed to fetch user data');
      } finally {
        setLoading(false);
      }
    }

    fetchUserData();
  }, []);

  if (loading) {
    return <div className="loading-spinner">Loading...</div>; 
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <>
      <AdmComponent />
    </>
  );
}
