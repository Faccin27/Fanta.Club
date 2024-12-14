'use client';
import React, { useEffect, useState } from 'react';
import { checkLoginStatus, User } from '@/utils/auth'; 
import Me from "@/components/Me";

export default function MainComponent() {
  const [user, setUser] = useState<User | undefined>(undefined);
  const [indentifier, setIndentifier] = useState<number | undefined>(undefined);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchUserData() {
      try {
        const { isLoggedIn, user } = await checkLoginStatus();
        if (isLoggedIn && user) {
          setUser(user);
          console.log(user.id);
        } else {
          window.location.href = '/'
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
      <Me user={user} ident={user?.id} />
    </>
  );
}
