import Image from "next/image";
import Link from "next/link";
import { ChevronDown } from "lucide-react";
import Logo from "@/assets/images/logo.png";

export default function Header() {
  return (
    <header className="bg-zinc-900 p-4 border-b border-orange-600">
      <div className="container mx-auto flex justify-between items-center">
        <Image
          src={Logo}
          alt="Fanta.Club logo"
          width={100}
          height={400}
          className="h-16 w-auto"
        />
        <nav className="hidden md:flex space-x-4">
          <Link href="/" className="hover:text-orange-400">
            Main
          </Link>
          <Link href="#" className="hover:text-orange-400">
            Forum
          </Link>
          <Link href="/showcase" className="hover:text-orange-400">
            Showcases
          </Link>
          <Link href="#" className="hover:text-orange-400">
            Tickets
          </Link>
        </nav>
        <div className="flex items-center space-x-4">
          <button className="flex items-center hover:text-orange-400">
            En <ChevronDown className="ml-1 h-4 w-4" />
          </button>
          <button className="flex items-center hover:text-orange-400">
            POZINHO <ChevronDown className="ml-1 h-4 w-4" />
          </button>
        </div>
      </div>
    </header>
  );
}