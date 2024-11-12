"use client";
import { useEffect, useState } from 'react';
import { checkLoginStatus, User } from '@/utils/auth';
import Post from "@/components/posts";

export default function PostPage(){

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
    return <div className="animate-spin">Loading...</div>; 
  }

  if (error) {
    return <div>{error}</div>;
  }


  return(
    <>
    <Post/>
    </>
  )
}