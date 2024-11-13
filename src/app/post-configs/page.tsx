"use client"

import PostConfigs from "@/components/post-configs";
import { useEffect, useState } from 'react';
import { checkLoginStatus, User } from '@/utils/auth';


export default function PagePostConfigs(){
    const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchUserData() {
      try {
        const { isLoggedIn, user } = await checkLoginStatus();
        
        if (isLoggedIn && user && (user.role === 'Moderator' || user.role === 'FANTA'|| user.role === "Premium")) {
          setUser(user);
        } else {
          window.location.href = '/'; 
        }
        if (isLoggedIn && user && (user.isActive === false)) {
            window.location.href = '/ban';
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
    return <div className="bg-orange-600 animate-spin">Loading...</div>; 
  }

  if (error) {
    return <div>{error}</div>;
  }

    return(
        <>
            <PostConfigs/>
        </>
    )
}