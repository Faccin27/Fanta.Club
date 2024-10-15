import Image from "next/image";
import Link from "next/link";
import Logo from "@/assets/images/logo.png";
import PFP from "@/assets/images/pfp.png";
import B1 from "@/assets/images/b-1.png";
import B2 from "@/assets/images/b-2.jpg";
import {
  ChevronDown,
  Download,
  Mail,
  Lock,
  ShieldCheck,
  Edit,
  MessageSquare,
  Youtube,
  RefreshCw,
  Clock,
} from "lucide-react";
import {
  FaDiscord,
  FaTelegramPlane,
  FaTiktok,
  FaYoutube,
} from "react-icons/fa";

export default function Component() {
  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100">
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
            <Link href="#" className="hover:text-orange-400">
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
      <main>
        <div className="relative">
          <div className="h-40"></div>
        </div>
        <div className="container mx-auto px-4 -mt-16">
          <div className="text-center">
            <Image
              src={PFP}
              alt="profile picture"
              width={128}
              height={128}
              className="mx-auto h-32 w-32 rounded-full border-2 border-orange-500 shadow-lg"
            />
            <div className="mt-4 flex items-center justify-center">
              <h1 className="text-3xl font-bold text-orange-400">POZINHO</h1>
              <button className="ml-2 p-1 rounded-full bg-zinc-800 hover:bg-zinc-700 transition-colors">
                <Edit className="mr-2 h-4 w-4" />
                <span className="sr-only">Edit Profile</span>
              </button>
            </div>
            <div className="mt-2 flex items-center justify-center text-zinc-400">
              <Mail className="mr-2 h-4 w-4" />
              <span>pozinhoisback01@gmail.com</span>
            </div>
            <button className="mt-8 bg-orange-400 hover:bg-orange-600 text-white px-4 py-2 rounded-md transition-colors flex items-center justify-center mx-auto">
              <Download className="inline mr-1 h-4 w-4" /> Download Loader
            </button>
          </div>
          <div className="mt-8 flex flex-wrap justify-center space-x-4">
            <Link
              href="#"
              className="text-zinc-400 hover:text-orange-400 transition-colors"
            >
              <Lock className="inline mr-1 h-4 w-4" /> Change Password
            </Link>
            <Link
              href="#"
              className="text-zinc-400 hover:text-orange-400 transition-colors"
            >
              <ShieldCheck className="inline mr-1 h-4 w-4" /> Enable 2FA
            </Link>
          </div>
          {/* SEÇÃO DO BANNER DO PRODUTO */}
          <div className="mt-16 space-y-5">
            <div className="relative w-full h-48 md:h-56 rounded-lg overflow-hidden">
              <Image
                src={B2}
                alt="banner esp"
                layout="fill"
                objectFit="cover"
                className="transition-all duration-300"
              />
              <div className="relative h-full flex flex-col justify-center items-center">
                <h2 className="text-5xl font-bold text-white hover:text-orange-600 text-center">
                  Fanta Unban
                </h2>
                <p className="absolute bottom-3 right-3 text-white">
                  Subscription end: <span className="font-bold">18d</span>
                </p>
                <div className="absolute bottom-3 left-3 flex space-x-2">
                  <button className="bg-orange-400 hover:bg-orange-600 text-white px-3 py-1 rounded transition-colors flex items-center">
                    <Download className="mr-1 h-4 w-4" /> Download
                  </button>
                  <button className="bg-orange-400 hover:bg-orange-600 text-white px-3 py-1 rounded transition-colors flex items-center">
                    <RefreshCw className="mr-1 h-4 w-4" /> Reset HWID
                  </button>
                  <button className="bg-orange-400 hover:bg-orange-600 text-white px-3 py-1 rounded transition-colors flex items-center">
                    <Clock className="mr-1 h-4 w-4" /> Freeze
                  </button>
                </div>
              </div>
            </div>

            <div className="relative w-full h-48 md:h-56 rounded-lg overflow-hidden group">
              <Image
                src={B1}
                alt="banner esp"
                layout="fill"
                objectFit="cover"
                className="transition-all duration-300 filter grayscale group-hover:grayscale-0"
              />
              <div className="relative h-full flex flex-col justify-center items-center">
                <h2 className="text-7xl font-bold text-white hover:text-orange-600 text-center">
                  Fanta Pro
                </h2>
                <p className="absolute bottom-3 right-3 text-white">
                  Starting From <span className="font-bold">R$ 160</span>
                </p>
              </div>
            </div>

            <div className="relative w-full h-48 md:h-56 rounded-lg overflow-hidden group">
              <Image
                src={B2}
                alt="banner esp"
                layout="fill"
                objectFit="cover"
                className="transition-all duration-300 filter grayscale group-hover:grayscale-0"
              />
              <div className="relative h-full flex flex-col justify-center items-center">
                <h2 className="text-7xl font-bold text-white hover:text-orange-600 text-center">
                  Fanta Light
                </h2>
                <p className="absolute bottom-3 right-3 text-white">
                  Starting From <span className="font-bold">R$ 90</span>
                </p>
              </div>
            </div>
          </div>
          <br />
          <br />
          <br />
          <br />
          <br />
        </div>
      </main>

      <aside className="fixed left-0 top-1/2 transform -translate-y-1/2 bg-zinc-900 text-zinc-100 p-4 rounded-r-lg border-r-2 border-t-2 border-b-2 border-orange-600">
        <div className="space-y-4">
          <Link
            href="#"
            className="block hover:text-orange-400 transition-colors"
          >
            <FaDiscord className="h-6 w-6" />
            <span className="sr-only">Discord</span>
          </Link>
          <Link
            href="#"
            className="block hover:text-orange-400 transition-colors"
          >
            <FaYoutube className="h-6 w-6" />
            <span className="sr-only">Youtube</span>
          </Link>
          <Link
            href="#"
            className="block hover:text-orange-400 transition-colors"
          >
            <FaTiktok className="h-6 w-6" />
            <span className="sr-only">Tiktok</span>
          </Link>
          <Link
            href="#"
            className="block hover:text-orange-400 transition-colors"
          >
            <FaTelegramPlane className="h-6 w-6" />
            <span className="sr-only">Telegram</span>
          </Link>
        </div>
      </aside>
    </div>
  );
}
