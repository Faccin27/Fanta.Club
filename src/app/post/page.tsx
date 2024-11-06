//"use client";
//import { useRouter } from 'next/router';
//import { useEffect, useState } from 'react';
//import { checkLoginStatus, User } from '@/utils/auth';
import Post from "@/components/posts";
//
//interface PostAnuciosProps {
//  loggedUser: User | null;
//}
//
//const PostLoad: React.FC<PostAnuciosProps> = () => {
//  const router = useRouter();
//  const [user, setUser] = useState<User | null>(null);
//  const [loading, setLoading] = useState(true);
//  const [error, setError] = useState<string | null>(null);
//
//  useEffect(() => {
//    async function fetchUserData() {
//      try {
//        const { isLoggedIn, user } = await checkLoginStatus();
//
//        if (isLoggedIn && user && (user.role === 'Moderator' || user.role === 'FANTA')) {
//          setUser(user);
//        } else {
//          router.push('/');
//        }
//      } catch (err) {
//        setError('Failed to fetch user data');
//      } finally {
//        setLoading(false);
//      }
//    }
//
//    fetchUserData();
//  }, [router]);
//
//  if (loading) {
//    return <div className="loading-spinner">Loading...</div>;
//  }
//
//  if (error) {
//    return <div>{error}</div>;
//  }
//
//
//  return user ? <Post loggedUser={user} /> : null;
//}
//

export default function PostPage(){
  return(
    <>
    <Post/>
    </>
  )
}