"use client";

import { Outfit } from "next/font/google";
import "./globals.css";

import { SidebarProvider } from "@/context/SidebarContext";
import { ThemeProvider } from "@/context/ThemeContext";
import { SessionProvider } from "next-auth/react";
import AppSidebarFinal from "@/layout/AppSidebar";

const outfit = Outfit({
  subsets: ["latin"],
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${outfit.className} dark:bg-gray-900`}>
        {/* WAJIB DI SINI — agar useSession() bisa nyala di seluruh app */}
        <SessionProvider>
          <ThemeProvider>
            <SidebarProvider>
              <div className="flex">
                {/* Halaman utama */}
                <main className="flex-1 min-h-screen">
                  {children}
                </main>
              </div>
            </SidebarProvider>
          </ThemeProvider>
        </SessionProvider>
      </body>
    </html>
  );
}
