import Link from "next/link";
import { Github, Linkedin, Twitter } from "lucide-react";

const footerLinks = [
  { href: "/terms", label: "Terms" },
  { href: "/privacy", label: "Privacy" },
  { href: "/contact", label: "Contact" },
];

const socialLinks = [
  {
    href: "https://twitter.com/maslow_ai",
    icon: Twitter,
    label: "Twitter",
  },
  {
    href: "https://github.com/maslow-ai",
    icon: Github,
    label: "GitHub",
  },
  {
    href: "https://linkedin.com/company/maslow-ai",
    icon: Linkedin,
    label: "LinkedIn",
  },
];

export function Footer() {
  return (
    <footer className="border-t border-border/40">
      <div className="container flex flex-col items-center gap-4 py-10 md:h-24 md:flex-row md:py-0">
        <div className="flex flex-col items-center gap-4 px-8 md:flex-row md:gap-2 md:px-0">
          <p className="text-center text-sm leading-loose text-muted-foreground md:text-left">
            Built by{" "}
            <Link
              href="/"
              className="font-medium underline underline-offset-4"
            >
              Maslow AI
            </Link>
            . All rights reserved.
          </p>
        </div>
        <nav className="flex items-center gap-4 md:gap-2">
          {footerLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm font-medium text-muted-foreground underline-offset-4 hover:underline"
            >
              {link.label}
            </Link>
          ))}
        </nav>
        <div className="flex items-center gap-4 md:ml-auto">
          {socialLinks.map((link) => {
            const Icon = link.icon;
            return (
              <Link
                key={link.href}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-foreground"
              >
                <Icon className="h-4 w-4" />
                <span className="sr-only">{link.label}</span>
              </Link>
            );
          })}
        </div>
      </div>
    </footer>
  );
} 