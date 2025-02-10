"use client";

import { Brain, Code, ShieldCheck, Zap, Target, Users } from "lucide-react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils/shared";

const features = [
  {
    title: "Strategic AI Innovation",
    description: "Transform your business with custom AI strategies that align perfectly with your goals and industry requirements.",
    icon: Brain,
    gradient: "from-brand-pink to-brand-purple",
    stats: "30% faster implementation",
  },
  {
    title: "Open‑Source Excellence",
    description: "Leverage powerful open-source solutions that provide complete control and significant cost savings without compromising quality.",
    icon: Code,
    gradient: "from-brand-green to-brand-blue",
    stats: "40% cost reduction",
  },
  {
    title: "Enterprise‑Grade Security",
    description: "Our TRiSM framework ensures your AI systems meet the highest standards of trust, risk management, and security compliance.",
    icon: ShieldCheck,
    gradient: "from-brand-blue to-brand-pink",
    stats: "100% compliance rate",
  },
  {
    title: "Rapid Deployment",
    description: "Get your AI solutions up and running quickly with our streamlined implementation process and expert team.",
    icon: Zap,
    gradient: "from-brand-purple to-brand-green",
    stats: "2x faster deployment",
  },
  {
    title: "Measurable Results",
    description: "Track and optimize your AI initiatives with clear KPIs and success metrics that demonstrate real business impact.",
    icon: Target,
    gradient: "from-brand-pink to-brand-blue",
    stats: "25% ROI increase",
  },
  {
    title: "Expert Support",
    description: "Access our team of AI specialists who provide ongoing guidance and support throughout your AI transformation journey.",
    icon: Users,
    gradient: "from-brand-green to-brand-purple",
    stats: "24/7 support",
  },
];

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 },
};

export function WhyChooseUsSection() {
  return (
    <section className="relative py-layout-2xl overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-muted/50" />
      <div className="absolute inset-0">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-brand-pink/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-brand-green/10 rounded-full blur-3xl" />
      </div>

      <div className="container relative">
        <div className="flex flex-col gap-layout-xl">
          {/* Section Header */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true, margin: "-100px" }}
            className="mx-auto max-w-[58rem] text-center flex flex-col gap-component-md"
          >
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold">
              Why Leading Enterprises Choose{" "}
              <span className="bg-gradient-to-r from-brand-pink to-brand-green bg-clip-text text-transparent">
                Maslow AI
              </span>
            </h2>
            <p className="text-lg text-muted-foreground">
              We bring together deep expertise, cutting-edge innovation, and enterprise-grade security 
              to deliver AI solutions that drive real business transformation.
            </p>
          </motion.div>

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
                  <div 
                    className="absolute inset-0 rounded-2xl bg-gradient-to-r opacity-0 blur-xl transition-all duration-500 group-hover:opacity-70"
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
                    
                    <p className="mb-4 text-muted-foreground">
                      {feature.description}
                    </p>

                    <div className="mt-auto">
                      <span className="inline-block px-3 py-1 text-sm font-medium rounded-full bg-muted">
                        {feature.stats}
                      </span>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </div>
    </section>
  );
} 