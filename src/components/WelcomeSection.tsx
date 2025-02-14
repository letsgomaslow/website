"use client";

import { motion } from "framer-motion";
import Image from "next/image";

export function WelcomeSection() {
  return (
    <section className="relative py-layout-xl overflow-hidden">
      <div className="container relative">
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-16 items-center">
          {/* Content */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="flex flex-col gap-6"
          >
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold">
              Welcome to{" "}
              <span className="bg-gradient-to-r from-brand-pink to-brand-green bg-clip-text text-transparent">
                Maslow AI
              </span>
            </h2>
            <p className="text-lg text-muted-foreground leading-relaxed">
              At Maslow AI, we believe true innovation comes from understanding both the human and economic forces behind AI. While many companies chase the latest trends, we deliver practical, measurable outcomes that transform your business. In an era of AI hype, we focus on turning investment into tangible value.
            </p>
          </motion.div>

          {/* Image */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            className="relative aspect-video lg:aspect-square rounded-2xl overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-tr from-brand-pink/20 to-brand-green/20" />
            <Image
              src="/images/welcome/hero-image2.jpg"
              alt="AI Innovation"
              fill
              className="object-cover"
            />
            {/* Decorative Elements */}
            <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 p-6">
              <div className="w-full h-1 bg-gradient-to-r from-brand-pink to-brand-green rounded-full" />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
} 