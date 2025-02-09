"use client";

import { useEffect } from "react";
import Link from "next/link";
import { ArrowRight, MessageCircle } from "lucide-react";
// import { renderCanvas } from "@/components/ui/canvas";
import { Button } from "@/components/ui/button";
import { MagneticButton } from "@/components/ui/magnetic-button";

export function HeroSection() {
  // useEffect(() => {
  //   renderCanvas();
  // }, []);

  return (
    <section className="relative min-h-[calc(100vh-4rem)] flex items-center justify-center">
      <div className="absolute inset-0 bg-gradient-to-b from-background to-background/50 pointer-events-none" />
      
      <div className="container relative py-layout-2xl">
        <div className="mx-auto max-w-[90rem] animate-fadeIn animation-delay-200">
          <div className="flex flex-col items-center gap-layout-2xl">
            {/* Two-part headline */}
            <div className="flex flex-col gap-component-lg text-center">
              <h1 className="flex flex-col gap-2 text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl">
                <span className="text-foreground">
                  All You Need is Attention—
                </span>
                <span className="bg-gradient-to-r from-brand-pink to-brand-green bg-clip-text text-transparent">
                  Transform Your Enterprise with Generative AI Solutions
                </span>
              </h1>
              
              <h2 className="text-xl sm:text-2xl md:text-3xl text-muted-foreground font-medium">
                Empowering Enterprises with Ethical, Scalable, and Impactful AI Transformation
              </h2>
            </div>

            {/* Description */}
            <p className="max-w-3xl text-center text-lg text-muted-foreground/80">
              At Maslow AI, we guide enterprises through every stage of their AI transformation journey. Whether you're exploring generative AI for the first time or enhancing existing systems, our tailored strategies, open‑source innovations, and ethical frameworks ensure you unlock the full potential of AI—securely and responsibly.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 w-full justify-center">
              <MagneticButton className="w-full sm:w-auto">
                <Link href="/contact" className="w-full sm:w-auto">
                  <Button 
                    variant="gradient" 
                    size="lg"
                    className="w-full sm:w-auto text-base sm:text-lg font-semibold"
                  >
                    Start Your AI Journey
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </Link>
              </MagneticButton>
              
              <MagneticButton className="w-full sm:w-auto">
                <Link href="/chat" className="w-full sm:w-auto">
                  <Button 
                    variant="outline" 
                    size="lg"
                    className="w-full sm:w-auto text-base sm:text-lg font-semibold"
                  >
                    Talk to Our Virtual Sales Assistant
                    <MessageCircle className="ml-2 h-5 w-5" />
                  </Button>
                </Link>
              </MagneticButton>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
} 