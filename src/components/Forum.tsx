"use client";
import React, { useState } from "react";
import Header from "./Header";
import {
  MessageSquare,
  Bell,
  RefreshCw,
  Settings,
  HelpCircle,
  Search,
} from "lucide-react";
import AnnouncementsContent from "@/components/forum/announcements";
import UpdatesContent from "@/components/forum/updates";
import ConfigsContent from "@/components/forum/settings";
import QuestionsContent from "@/components/forum/questions";

interface ForumCategory {
  icon: React.ElementType;
  label: string;
  color: string;
}

const categories: ForumCategory[] = [
  { icon: Bell, label: "Announcements", color: "text-yellow-500" },
  { icon: RefreshCw, label: "Updates", color: "text-blue-500" },
  { icon: Settings, label: "Configs", color: "text-green-500" },
  { icon: HelpCircle, label: "Questions", color: "text-purple-500" },
];

const categoryComponents = {
  Announcements: AnnouncementsContent,
  Updates: UpdatesContent,
  Configs: ConfigsContent,
  Questions: QuestionsContent,
};

const ForumCategory: React.FC<ForumCategory & { onClick: () => void }> = ({
  icon: Icon,
  label,
  color,
  onClick,
}) => (
  <button
    onClick={onClick}
    className={`flex items-center space-x-3 p-4 rounded-lg bg-zinc-800 hover:bg-zinc-700 transition-colors ${color}`}
  >
    <Icon size={24} />
    <span className="text-lg font-semibold">{label}</span>
  </button>
);

const ForumPage: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<string>("");

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100">
      <Header />
      <main className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-4xl font-bold text-orange-400">Fórum Fanta</h1>
          <div className="relative">
            <input
              type="text"
              placeholder="Pesquisar no fórum..."
              className="bg-zinc-800 text-zinc-100 pl-10 pr-4 py-2 rounded-full focus:outline-none focus:ring-2 focus:ring-orange-400"
            />
            <Search
              className="absolute left-3 top-1/2 transform -translate-y-1/2 text-zinc-400"
              size={18}
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {categories.map((cat) => (
            <ForumCategory
              key={cat.label}
              {...cat}
              onClick={() => setActiveCategory(cat.label)}
            />
          ))}
        </div>

        {activeCategory && (
          <div className="bg-zinc-800 p-6 rounded-lg">
            {React.createElement(
              categoryComponents[
                activeCategory as keyof typeof categoryComponents
              ]
            )}
          </div>
        )}
      </main>
    </div>
  );
};

export default ForumPage;
