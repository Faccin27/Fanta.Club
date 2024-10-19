'use client'
import React, { useEffect, useState } from 'react';
import { checkLoginStatus, User } from '@/utils/auth'; 
const UserProfile: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchUserData() {
      const { isLoggedIn, user } = await checkLoginStatus();
      if (isLoggedIn && user) {
        setUser(user);
      }
      setLoading(false);
    }

    fetchUserData();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!user) {
    return <div>User not logged in</div>;
  }

  return (
    <div className="user-profile-container">
      <h1>{user.name}'s Profile</h1>
      <img src={user.photo || '/default-avatar.png'} alt="User Avatar" />
      <p>Email: {user.email}</p>
      <p>Gender: {user.gender}</p>
      <p>Birth Date: {new Date(user.birthDate).toLocaleDateString()}</p>
      <p>Registered Date: {new Date(user.registeredDate).toLocaleDateString()}</p>
      <p>Expiry Date: {new Date(user.expiryDate).toLocaleDateString()}</p>
      <p>Role: {user.role}</p>
      <p>Active: {user.isActive ? 'Yes' : 'No'}</p>
      <p>Created At: {new Date(user.createdAt).toLocaleDateString()}</p>
      <p>Updated At: {new Date(user.updatedAt).toLocaleDateString()}</p>
    </div>
  );
};

export default UserProfile;
