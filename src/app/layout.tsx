import React from "react";
import "@/app/globals.css";
import "react-toastify/dist/ReactToastify.css";
import { Inter } from "next/font/google";
import { TRPCReactProvider } from "@/lib/trpc/react";
import { Metadata } from "next";
import ClientProvider from "@/components/ClientProvider";
import { ThemeProvider } from "@/components/theme/ThemeProvider";
import { ThemeAwareToast } from "@/components/theme/ThemeAwareToast";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { VoiceChatProvider } from "@/components/chat/VoiceChatProvider";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Maslow AI - Enterprise AI Solutions",
  description: "Transform your enterprise with ethical, scalable, and impactful AI solutions.",
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning className={inter.variable}>
      <body>
        <ThemeProvider defaultTheme="system" enableSystem>
          <ClientProvider>
            <TRPCReactProvider>
              <div className="relative min-h-screen">
                <Header />
                <main className="container py-12 pt-32">{children}</main>
                <Footer />
                <VoiceChatProvider />
              </div>
              <ThemeAwareToast />
            </TRPCReactProvider>
          </ClientProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
