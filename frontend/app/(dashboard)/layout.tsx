"use client";
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Sidebar from "@/components/Sidebar";
import "@/app/globals.css";
import AuthLoader from "@/components/AuthLoader";
import Providers from "../Providers";
import { useState } from "react";
import { MenuIcon } from "lucide-react";
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <Providers>
      <div className="flex flex-col min-h-screen overflow-auto">
        <MenuIcon
          onClick={() => {
            setIsOpen(!isOpen);
            console.log(isOpen);
          }}
          className="fixed top-5 right-5 z-40 md:hidden bg-text-primary p-1 rounded-sm"
        />
        <AuthLoader />
        <div className="flex">
          <div className="md:flex-1 flex-0">
            <Sidebar isOpen={isOpen} />
          </div>
          <main className="flex-4 h-screen overflow-auto">{children}</main>
        </div>
      </div>
    </Providers>
  );
}
