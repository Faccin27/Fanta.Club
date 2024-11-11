// components/Aside.tsx

import { FaDiscord, FaTelegramPlane, FaTiktok, FaYoutube } from "react-icons/fa";
import Link from "next/link";

export default function Aside() {
  return (
    <aside className="fixed left-0 top-1/2 transform -translate-y-1/2 bg-zinc-900 text-zinc-100 p-4 rounded-r-lg border-r-2 border-t-2 border-b-2 border-orange-500">
      <div className="space-y-4">
        <Link href="#" className="block hover:text-orange-400 transition-colors" target="_blank">
          <FaDiscord className="h-6 w-6" />
          <span className="sr-only">Discord</span>
        </Link>
        <Link href="#" className="block hover:text-orange-400 transition-colors" target="_blank">
          <FaYoutube className="h-6 w-6" />
          <span className="sr-only">Youtube</span>
        </Link>
        <Link href="https://www.tiktok.com/@fiftycheat" className="block hover:text-orange-400 transition-colors" target="_blank">
          <FaTiktok className="h-6 w-6" />
          <span className="sr-only">Tiktok</span>
        </Link>
        <Link href="#" className="block hover:text-orange-400 transition-colors" target="_blank">
          <FaTelegramPlane className="h-6 w-6" />
          <span className="sr-only">Telegram</span>
        </Link>
      </div>
    </aside>
  );
}
