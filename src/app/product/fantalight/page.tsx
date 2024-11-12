"use client";
import Fantalight from "@/components/products/fantalight";
import { useEffect, useState } from 'react';
import { checkLoginStatus, User } from '@/utils/auth';


export default function MainComponent() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);


  useEffect(() => {
    async function fetchUserData() {
      try {
        const { isLoggedIn, user } = await checkLoginStatus();
        
        if (isLoggedIn && user && (user.isActive === false )) {
          null
        } else {
          setUser(user);
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
      <Fantalight LogedUser={user} />
    </>
  );
}

