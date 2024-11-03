import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import ClientAuthWrapper from "@/components/clientAuthWrapper";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Fanta.club",
  description: "The best valorant cheats provider.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-br">
      <body className={`${inter.className} min-h-screen`}>
        <ClientAuthWrapper>
          <br />
          <br />
          <br />
          <br />
          {children}
        </ClientAuthWrapper>
      </body>
    </html>
  );
}