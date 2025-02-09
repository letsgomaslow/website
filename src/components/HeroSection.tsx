"use client";

import Link from "next/link";
import { ArrowRight, MessageCircle } from "lucide-react";

export function HeroSection() {
  return (
    <section className="relative overflow-hidden bg-background pt-16 md:pt-20 xl:pt-24">
      <div className="container relative z-10">
        <div className="mx-auto max-w-[64rem] text-center">
          <h1 className="font-heading text-4xl font-bold leading-tight tracking-tight md:text-5xl lg:text-6xl lg:leading-[1.2]">
            All You Need is Attention—Transform Your Enterprise with{" "}
            <span className="bg-gradient-to-r from-blue-600 to-violet-600 bg-clip-text text-transparent">
              Generative AI Solutions
            </span>
          </h1>
          <h2 className="mt-4 text-xl text-muted-foreground md:text-2xl">
            Empowering Enterprises with Ethical, Scalable, and Impactful AI Transformation.
          </h2>
          <p className="mt-4 text-lg text-muted-foreground md:text-xl">
            At Maslow AI, we guide enterprises through every stage of their AI transformation journey. Whether you're exploring generative AI for the first time or enhancing existing systems, our tailored strategies, open‑source innovations, and ethical frameworks ensure you unlock the full potential of AI—securely and responsibly.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <Link
              href="/contact"
              className="inline-flex h-11 items-center justify-center rounded-md bg-primary px-8 text-sm font-medium text-primary-foreground ring-offset-background transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
            >
              Start Your AI Journey
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
            <Link
              href="/chat"
              className="inline-flex h-11 items-center justify-center rounded-md border border-input bg-background px-8 text-sm font-medium ring-offset-background transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
            >
              Talk to Our Virtual Sales Assistant
              <MessageCircle className="ml-2 h-4 w-4" />
            </Link>
          </div>
        </div>
      </div>
      <div
        className="absolute left-1/2 top-1/2 -z-10 h-[800px] w-[800px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-gradient-to-tr from-blue-600/20 to-violet-600/20 blur-3xl"
        aria-hidden="true"
      />
    </section>
  );
} 