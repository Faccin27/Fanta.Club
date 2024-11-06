"use client";
import AnnouncementsContent from "@/components/forum/announcements";
import QuestionsContent from "@/components/forum/questions";
import ConfigsContent from "@/components/forum/settings";
import { motion } from "framer-motion";
import UpdatesContent from "@/components/forum/updates";
import {
  Bell,
  HelpCircle,
  RefreshCw,
  Search,
  Settings
} from "lucide-react";
import React, { useState } from "react";
import Aside from "./Aside";
import { useTranslation } from "react-i18next";
interface ForumCategory {
  icon: React.ElementType;
  label: string;
  color: string;
}


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
const [activeCategory, setActiveCategory] = useState<string>("Announcements");
const {t} = useTranslation();
const categories: ForumCategory[] = [
  { icon: Bell, label: t("translation.Announcements"), color: "text-yellow-500" },
  { icon: RefreshCw, label: t("translation.Updates"), color: "text-blue-500" },
  { icon: Settings, label: t("translation.Configs"), color: "text-green-500" },
  { icon: HelpCircle, label: t("translation.Questions"), color: "text-purple-500" },
];

const categoryComponents = {
  Announcements: AnnouncementsContent,
  Updates: UpdatesContent,
  Configs: ConfigsContent,
  Questions: QuestionsContent,
  Anúncios: AnnouncementsContent,
  Atualizações:UpdatesContent,
  Configurações:ConfigsContent,
  Perguntas: QuestionsContent
};


  return (
    <div 
    className="min-h-screen bg-zinc-950 text-zinc-100">
      <main className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-4xl font-bold text-orange-400">{t("translation.fanta_forum")}</h1>
          <div className="relative">
            <input
              type="text"
              placeholder={t("translation.pesquisar")}
              className="bg-zinc-800 text-zinc-100 pl-10 pr-4 py-2 rounded-full focus:outline-none focus:ring-2 focus:ring-orange-400"
            />
            <Search
              className="absolute left-3 top-1/2 transform -translate-y-1/2 text-zinc-400"
              size={18}
            />
          </div>
        </div>

        <motion.div
       initial={{ opacity: 0, y: -40 }}
       animate={{ opacity: 1, y: 0 }}
       transition={{
        duration: 0.8,
        delay: 0.5
      }}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {categories.map((cat) => (
            <ForumCategory
              key={cat.label}
              {...cat}
              onClick={() => setActiveCategory(cat.label)}
            />
          ))}
        </motion.div>

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
      <Aside />
    </div>
  );
};

export default ForumPage;
