"use client";

import { Brain, Code, ShieldCheck } from "lucide-react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils/shared";

const features = [
  {
    title: "Generative AI Expertise",
    description: "Tailored strategies aligned with your business goals.",
    icon: Brain,
    gradient: "from-brand-pink to-brand-purple",
  },
  {
    title: "Open‑Source Innovation",
    description: "Cost‑effective alternatives providing full customization.",
    icon: Code,
    gradient: "from-brand-green to-brand-blue",
  },
  {
    title: "TRiSM Framework",
    description: "Trust, Risk, and Security Management to mitigate risks.",
    icon: ShieldCheck,
    gradient: "from-brand-blue to-brand-pink",
  },
];

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
    },
  },
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 },
};

export function WhyChooseUsSection() {
  return (
    <section className="container py-layout-2xl overflow-hidden">
      <div className="flex flex-col gap-layout-xl">
        {/* Section Header */}
        <div className="mx-auto max-w-[58rem] text-center flex flex-col gap-component-md">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold">
            Why Choose{" "}
            <span className="bg-gradient-to-r from-brand-pink to-brand-green bg-clip-text text-transparent">
              Maslow AI
            </span>
          </h2>
          <p className="text-lg text-muted-foreground">
            We combine expertise, innovation, and security to deliver transformative AI solutions.
          </p>
        </div>

        {/* Features Grid */}
        <motion.div 
          className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3"
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-100px" }}
        >
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <motion.div
                key={feature.title}
                variants={item}
                className="group relative"
              >
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-r opacity-0 blur-xl transition-all duration-500 group-hover:opacity-70"
                  style={{
                    background: `linear-gradient(to right, var(--${feature.gradient.split(' ')[1]}) 0%, var(--${feature.gradient.split(' ')[3]}) 100%)`,
                  }}
                />
                
                <div className="relative h-full rounded-2xl border bg-card p-8 transition-all duration-300 group-hover:scale-[1.02] group-hover:shadow-xl">
                  <div className="mb-6">
                    <div className={cn(
                      "inline-flex h-12 w-12 items-center justify-center rounded-lg bg-gradient-to-r",
                      feature.gradient
                    )}>
                      <Icon className="h-6 w-6 text-white" />
                    </div>
                  </div>
                  
                  <h3 className="mb-2 text-xl font-bold tracking-tight">
                    {feature.title}
                  </h3>
                  
                  <p className="text-muted-foreground">
                    {feature.description}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
} 