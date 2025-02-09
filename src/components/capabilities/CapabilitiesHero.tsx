"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { cn } from "@/lib/utils/shared";

interface CapabilitiesHeroProps {
  className?: string;
}

export function CapabilitiesHero({ className }: CapabilitiesHeroProps) {
  return (
    <section className={cn("relative min-h-[80vh] flex items-center justify-center", className)}>
      {/* Background Image */}
      <div className="absolute inset-0">
        <Image
          src="https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=1920&q=80"
          alt="AI Technology Background"
          fill
          className="object-cover"
          priority
          sizes="100vw"
        />
        {/* Overlay System */}
        <div className="absolute inset-0 bg-gradient-to-b from-background/80 via-background/50 to-background" />
        <div className="absolute inset-0 bg-gradient-to-r from-background/80 via-transparent to-background/80" />
      </div>

      {/* Content */}
      <div className="container relative">
        <div className="max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="space-y-6"
          >
            {/* Two-part heading */}
            <h1 className="flex flex-col gap-4 text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl lg:text-7xl">
              <span className="text-foreground">
                Enterprise AI
              </span>
              <span className="bg-gradient-to-r from-brand-pink to-brand-green bg-clip-text text-transparent">
                Capabilities
              </span>
            </h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="max-w-2xl text-xl text-muted-foreground"
            >
              From strategy to implementation, we provide end-to-end AI solutions that transform enterprises. Discover our comprehensive suite of capabilities designed to drive innovation and growth.
            </motion.p>
          </motion.div>
        </div>
      </div>

      {/* Decorative Elements */}
      <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-background to-transparent" />
      <div className="absolute bottom-0 left-1/2 h-24 w-px -translate-x-1/2 bg-border/50" />
    </section>
  );
} 