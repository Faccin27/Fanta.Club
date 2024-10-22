import React from "react";
import Image from "next/image";
import { CalendarDays, User as UserIcon } from "lucide-react";
import Aside from "./Aside";
import PFP from "@/assets/images/pfp.png";

interface User {
  id: number;
  name: string;
  email: string;
  photo: string | null;
  registeredDate: string;
  role: string;
}

export default function Component({ user }: { user: User }) {
  // Function to determine role styling
  const getRoleStyles = (role: string) => {
    switch (role) {
      case 'FANTA':
        return 'font-bold animate-pulse bg-gradient-to-r from-red-500 via-yellow-500 to-orange-500 text-transparent bg-clip-text';
      case 'Moderator':
        return 'text-purple-400 font-bold';
      case 'Premium':
        return 'text-orange-400 font-bold';
      default: 
        return 'text-zinc-400 font-bold';
    }
  };

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100">
      <main>
        <div className="relative">
          <div className="h-40"></div>
        </div>
        <div className="container mx-auto px-4 -mt-16">
          <div className="text-center">
            <Image
              src={user.photo || PFP}
              alt="profile picture"
              width={128}
              height={128}
              className="mx-auto h-32 w-32 rounded-full border-2 border-orange-500 shadow-lg"
            />
            <div className="mt-4 flex items-center justify-center">
              <h1 className="text-3xl font-bold text-orange-400">
                {user.name}
              </h1>
            </div>
            <div className="mt-2 flex items-center justify-center">
              <UserIcon className="mr-2 h-4 w-4 text-zinc-400" />
              <span className={getRoleStyles(user.role)}>{user.role}</span>
            </div>
          </div>
          <div className="mt-8 flex flex-wrap justify-center space-x-4">
            <div className="text-zinc-400">
              <CalendarDays className="inline mr-1 h-4 w-4" /> Member since {new Date(user.registeredDate).toLocaleDateString()}
            </div>
          </div>
          
          <div className="mt-16 space-y-5 pb-32">
            {/* FUTURE */}
          </div>
        </div>
      </main>

      <Aside />
    </div>
  );
}