
import axios from 'axios';
import Cookies from 'js-cookie';

export interface User {
  id: number;
  name: string;
  email: string;
  photo: string;
  registeredDate: string;
  description:string | TrustedHTML | undefined;
  expiryDate: string;
  gender: string;
  birthDate: string;
  isActive: boolean;
  role: string;
  createdAt: string;
  updatedAt: string;
}

export async function checkLoginStatus(): Promise<{ isLoggedIn: boolean; user: User | null }> {
  const token = Cookies.get('token');
  
  if (token) {
    try {
      const response = await axios.get('http://localhost:3535/users/me', {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      
      if (response.status === 200) {
        return { isLoggedIn: true, user: response.data };
      }
    } catch (error) {
      console.error('Error fetching user data:', error);
    }
  }
  
  return { isLoggedIn: false, user: null };
}