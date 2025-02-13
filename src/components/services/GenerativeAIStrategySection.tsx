"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Building2, ChartBar, Cog } from "lucide-react";

const sectionVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: {
      duration: 0.8,
      staggerChildren: 0.25,
      ease: "easeOut"
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
};

const cardVariants = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: { 
    opacity: 1, 
    scale: 1,
    transition: { duration: 0.5, ease: "easeOut" }
  }
};

const benefits = [
  {
    title: "A clear, business‑aligned AI strategy",
    description: "Develop a roadmap that aligns with your business objectives and growth targets.",
    icon: Building2,
  },
  {
    title: "Scalable architecture customized for your operational needs",
    description: "Build a robust foundation that grows with your business and adapts to changing demands.",
    icon: Cog,
  },
  {
    title: "Measurable outcomes driving growth and innovation",
    description: "Track and optimize your AI initiatives with clear KPIs and success metrics.",
    icon: ChartBar,
  },
];

const industries = [
  {
    name: "Finance",
    description: "Automate risk assessment and enhance customer service with AI-powered insights.",
  },
  {
    name: "Healthcare",
    description: "Improve patient care and streamline operations while maintaining compliance.",
  },
  {
    name: "Retail",
    description: "Personalize customer experiences and optimize inventory management.",
  },
];

export function GenerativeAIStrategySection() {
  return (
    <motion.section 
      className="container py-24"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      variants={sectionVariants}
    >
      {/* Header */}
      <motion.div 
        className="mx-auto max-w-[58rem] text-center"
        variants={itemVariants}
      >
        <h1 className="font-heading text-4xl font-bold leading-[1.1] sm:text-5xl md:text-6xl">
          Generative AI{" "}
          <span className="bg-gradient-to-r from-[#EE7BB3] to-[#6DC4AD] bg-clip-text text-transparent">
            Strategy & Architecture
          </span>
        </h1>
        <p className="mt-6 text-xl text-muted-foreground">
          Our Generative AI solutions help you design a strategic roadmap tailored to your enterprise. We provide architectures that scale as your business grows—turning AI hype into clear, measurable outcomes.
        </p>
      </motion.div>

      {/* Benefits Grid */}
      <motion.div 
        className="mx-auto mt-16 grid justify-center gap-6 sm:grid-cols-2 md:max-w-[64rem] md:grid-cols-3"
        variants={itemVariants}
      >
        {benefits.map((benefit) => {
          const Icon = benefit.icon;
          return (
            <motion.div
              key={benefit.title}
              variants={cardVariants}
              className="relative overflow-hidden rounded-xl border bg-background p-4 shadow-sm transition-all"
            >
              <div className="flex h-full flex-col justify-between rounded-md p-6">
                <Icon className="h-14 w-14 text-primary" />
                <div className="mt-5">
                  <h3 className="font-bold text-lg">{benefit.title}</h3>
                  <p className="mt-2 text-muted-foreground text-sm">
                    {benefit.description}
                  </p>
                </div>
              </div>
            </motion.div>
          );
        })}
      </motion.div>

      {/* Industry Examples */}
      <motion.div 
        className="mx-auto mt-16 max-w-[58rem]"
        variants={itemVariants}
      >
        <h2 className="text-center text-2xl font-bold">Industry Examples</h2>
        <div className="mt-8 grid gap-6 sm:grid-cols-2 md:grid-cols-3">
          {industries.map((industry) => (
            <motion.div
              key={industry.name}
              variants={cardVariants}
              className="rounded-xl border bg-background p-6 transition-all"
            >
              <h3 className="font-bold text-lg">{industry.name}</h3>
              <p className="mt-3 text-sm text-muted-foreground">
                {industry.description}
              </p>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Call to Action */}
      <motion.div 
        className="mx-auto mt-16 text-center"
        variants={itemVariants}
      >
        <Link
          href="/contact"
          className="inline-flex h-12 items-center justify-center rounded-md bg-primary px-8 text-sm font-medium text-primary-foreground ring-offset-background transition-transform hover:scale-105 hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 group"
        >
          Start Building Your Generative AI Strategy Today
          <ArrowRight className="ml-2 h-5 w-5 transition-transform duration-300 group-hover:translate-x-2" />
        </Link>
      </motion.div>
    </motion.section>
  );
}
