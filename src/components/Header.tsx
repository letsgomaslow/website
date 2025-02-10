"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useTheme } from "next-themes";
import { usePathname } from "next/navigation";
import { Home, Briefcase, User, Book, FileText, Phone } from "lucide-react";
import { NavBar } from "@/components/ui/tubelight-navbar";
import { ThemeToggle } from "./theme/ThemeToggle";

const navItems = [
  { name: "Home", url: "/", icon: Home },
  { name: "Services", url: "/services", icon: Briefcase },
  { name: "About Us", url: "/about", icon: User },
  { name: "Resources", url: "/resources", icon: Book },
  { name: "Case Studies", url: "/case-studies", icon: FileText },
  { name: "Contact Us", url: "/contact", icon: Phone },
];

export function Header() {
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // During SSR and before hydration, display a placeholder
  if (!mounted) {
    return (
      <header className="fixed top-0 z-50 w-full">
        <div className="container flex h-16 items-center justify-between">
          <Link href="/" className="flex items-center space-x-2 z-50">
            <div className="relative h-8 w-[160px] bg-muted/10" />
          </Link>
          <div className="flex items-center space-x-4">
            <div className="h-9 w-9" />
          </div>
        </div>
        <NavBar items={navItems} className="sm:pt-0" />
      </header>
    );
  }

  const logoSrc = resolvedTheme === 'dark' 
    ? "/Maslow, Complete Logo (White).png" 
    : "/Maslow, Complete Logo (Black).png";

  return (
    <header className="fixed top-0 z-50 w-full">
      <div className="container flex h-16 items-center justify-between">
        <Link href="/" className="flex items-center space-x-2 z-50">
          <div className="relative h-8 w-[160px]">
            <Image
              src={logoSrc}
              alt="Maslow AI"
              fill
              className="object-contain transition-opacity duration-300"
              priority
              sizes="160px"
            />
          </div>
        </Link>
        <div className="flex items-center space-x-4">
          <ThemeToggle />
        </div>
      </div>
      <NavBar items={navItems} className="sm:pt-0" />
    </header>
  );
} 