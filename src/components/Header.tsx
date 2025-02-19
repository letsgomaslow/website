// "use client";

// import { useEffect, useState } from "react";
// import Link from "next/link";
// import Image from "next/image";
// import { useTheme } from "next-themes";
// import { usePathname } from "next/navigation";
// import { Home, Briefcase, User, Book, FileText, Phone } from "lucide-react";
// import { NavBar } from "@/components/ui/tubelight-navbar";
// import { ThemeToggle } from "./theme/ThemeToggle";

// const navItems = [
//   { name: "Home", url: "/", icon: Home },
//   { name: "Services", url: "/services", icon: Briefcase },
//   { name: "About Us", url: "/about", icon: User },
//   { name: "Resources", url: "/resources", icon: Book },
//   { name: "Case Studies", url: "/case-studies", icon: FileText },
//   { name: "Contact Us", url: "/contact", icon: Phone },
// ];

// export function Header() {
//   const { resolvedTheme } = useTheme();
//   const [mounted, setMounted] = useState(false);

//   useEffect(() => {
//     setMounted(true);
//   }, []);

//   // During SSR and before hydration, display a placeholder
//   if (!mounted) {
//     return (
//       <header className="fixed top-0 z-50 w-full">
//         <div className="container flex h-16 items-center justify-between">
//           <Link href="/" className="flex items-center space-x-2 z-50">
//             <div className="relative h-8 w-[160px] bg-muted/10" />
//           </Link>
//           <div className="flex items-center space-x-4">
//             <div className="h-9 w-9" />
//           </div>
//         </div>
//         <NavBar items={navItems} className="sm:pt-0" />
//       </header>
//     );
//   }

//   const logoSrc = resolvedTheme === 'dark' 
//     ? "/Maslow-white.png" 
//     : "/Maslow-black.png";

//   return (
//     <header className="fixed top-0 z-50 w-full backdrop-blur-md">
//       <div className="container flex h-16 items-center justify-between px-4">
//         <Link href="/" className="flex items-center space-x-2 z-50">
//           <div className="relative h-8 w-[160px]">
//             <Image
//               src={logoSrc}
//               alt="Maslow AI"
//               fill
//               className="object-contain transition-opacity duration-300"
//               priority
//               sizes="160px"
//             />
//           </div>
//         </Link>
//         <div className="flex items-center space-x-4">
//           <ThemeToggle />
//         </div>
//         <NavBar items={navItems} className="sm:pt-2 flex flex-wrap gap-4 whitespace-nowrap" />
//         {/* <NavBar items={navItems} className="flex flex-wrap gap-4 whitespace-nowrap text-sm md:text-base" /> */}
//       </div>
//     </header>
//   );
// } 

"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useTheme } from "next-themes";
import { usePathname } from "next/navigation";
import { Home, Briefcase, User, Book, FileText, Phone, Menu, X } from "lucide-react";
import { NavBar } from "@/components/ui/tubelight-navbar";
import { ThemeToggle } from "./theme/ThemeToggle";
import { Button } from "@/components/ui/button";

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
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

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
      </header>
    );
  }

  const logoSrc = resolvedTheme === 'dark' 
    ? "/Maslow-white.png" 
    : "/Maslow-black.png";

  return (
    <header className="fixed top-0 z-50 w-full backdrop-blur-md">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
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

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-4">
            <NavBar 
              items={navItems} 
              className="sm:pt-0 flex-1" 
            />
            <ThemeToggle />
          </div>

          {/* Mobile Menu Button */}
          <div className="flex md:hidden items-center gap-4">
            <ThemeToggle />
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="h-9 w-9"
            >
              {isMenuOpen ? (
                <X className="h-5 w-5" />
              ) : (
                <Menu className="h-5 w-5" />
              )}
              <span className="sr-only">Toggle menu</span>
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden">
            <NavBar 
              items={navItems} 
              className="flex flex-col items-center py-4 space-y-2 bg-background/95 backdrop-blur-sm"
            />
          </div>
        )}
      </div>
    </header>
  );
}