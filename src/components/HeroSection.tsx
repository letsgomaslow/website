"use client";

import { useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowRight, MessageCircle } from "lucide-react";
// import { renderCanvas } from "@/components/ui/canvas";
import { Button } from "@/components/ui/button";
import { MagneticButton } from "@/components/ui/magnetic-button";
import { useState } from "react";
import { StrategySessionForm } from "@/components/StrategySessionForm";

export function HeroSection() {
  const [showForm, setShowForm] = useState(false);

  return (
    <section className="relative min-h-[calc(100vh-4rem)] flex items-center justify-center overflow-hidden">
      {/* Background with Gradient */}
      <div className="absolute inset-0">
        <Image
          src="/images/hero-bg.jpg"
          alt="AI Technology Background"
          fill
          className="object-cover hidden dark:block"
          priority
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-background/80 via-background/50 to-background dark:from-background/80 dark:via-background/50 dark:to-background" />
        <div className="absolute inset-0 bg-gradient-to-r from-background/80 via-transparent to-background/80 dark:from-background/80 dark:via-transparent dark:to-background/80" />
      </div>
      
      <div className="container relative py-layout-2xl">
        <div className="mx-auto max-w-[90rem]">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="flex flex-col items-center gap-layout-2xl"
          >
            {/* Two-part headline */}
            <div className="flex flex-col gap-component-lg text-center">
              <motion.h1 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="flex flex-col gap-2 text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl"
              >
                <span className="text-foreground">
                  When Ordinary AI Becomes
                </span>
                <span className="bg-gradient-to-r from-brand-pink to-brand-green bg-clip-text text-transparent">
                  Extraordinary
                </span>
              </motion.h1>
              
              <motion.h2 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="text-xl sm:text-2xl md:text-3xl text-muted-foreground font-medium"
              >
                Transforming Enterprise Realities with Ethical, Scalable, and Cleverly Engineered AI Solutions
              </motion.h2>
            </div>

            {/* Description */}
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="max-w-3xl text-center text-lg text-muted-foreground/80"
            >
              At Maslow AI, we don't just implement AI—we transform enterprises through strategic innovation. 
              Our solutions combine cutting-edge technology with ethical frameworks to deliver measurable, 
              sustainable results that drive your business forward.
            </motion.p>

            {/* CTA Buttons */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.8 }}
              className="flex flex-col sm:flex-row gap-4 sm:gap-6 w-full justify-center"
            >
              <MagneticButton className="w-full sm:w-auto">
                <Button 
                  variant="gradient" 
                  size="lg"
                  className="w-full sm:w-auto text-base sm:text-lg font-semibold group"
                  onClick={() => setShowForm(true)}
                >
                  Book a 30-Minute AI Strategy Session
                  <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
                </Button>
              </MagneticButton>
              
              <MagneticButton className="w-full sm:w-auto">
                <Link href="/contact" className="w-full sm:w-auto">
                  <Button 
                    variant="outline" 
                    size="lg"
                    className="w-full sm:w-auto text-base sm:text-lg font-semibold group"
                  >
                    Download Free AI Planning Workbook
                    <MessageCircle className="ml-2 h-5 w-5 transition-transform group-hover:rotate-12" />
                  </Button>
                </Link>
              </MagneticButton>
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Show the form popup when showForm is true */}
      {showForm && <StrategySessionForm onClose={() => setShowForm(false)} />}

      {/* Decorative Elements */}
      <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-background to-transparent" />
      <div className="absolute bottom-0 left-1/2 h-24 w-px -translate-x-1/2 bg-border/50" />
    </section>
  );
}