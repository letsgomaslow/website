"use client";

import Link from "next/link";
import { ArrowRight, Code, Lock, Settings } from "lucide-react";
import { motion } from "framer-motion";

const benefits = [
  {
    title: "Cost savings without compromising quality",
    description: "Reduce your AI infrastructure costs while maintaining enterprise-grade performance.",
    icon: Settings,
  },
  {
    title: "Full control over customization",
    description: "Adapt and modify your AI systems to meet your exact business requirements.",
    icon: Code,
  },
  {
    title: "Enhanced security through transparency",
    description: "Gain complete visibility into your AI systems with auditable open-source code.",
    icon: Lock,
  },
];

const industries = [
  {
    name: "Manufacturing",
    description: "Optimize production processes and predict maintenance needs with customizable AI models.",
  },
  {
    name: "Education",
    description: "Create personalized learning experiences with adaptable AI solutions.",
  },
];


const sectionVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
};

export function OpenSourceSection() {
  return (
    <motion.section
      className="container py-24"
      initial="hidden"
      whileInView="visible"
      variants={sectionVariants}
      viewport={{ once: true, amount: 0.2 }}
    >
      <div className="mx-auto max-w-[58rem] text-center">
        <motion.h2
          className="font-heading text-3xl font-bold leading-[1.1] sm:text-4xl md:text-5xl"
          variants={sectionVariants}
        >
          Open‑Source{" "}
          <span className="bg-gradient-to-r from-[#EE7BB3] to-[#6DC4AD] bg-clip-text text-transparent">
            Alternatives (BYOAI & Beyond)
          </span>
        </motion.h2>
        <motion.p className="mt-6 text-xl text-muted-foreground" variants={sectionVariants}>
          With the increasing trend of employees bringing their own AI tools, we offer robust open-source solutions. Our approach provides greater control and mitigates risks associated with proprietary systems.
        </motion.p>
      </div>

      <div className="mx-auto mt-16 grid justify-center gap-4 sm:grid-cols-2 md:max-w-[64rem] md:grid-cols-3">
      {benefits.map((benefit) => {
  const Icon = benefit.icon;
  return (
    <motion.div
      key={benefit.title}
      className="relative overflow-hidden rounded-lg border bg-background p-2 transition-all"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
      viewport={{ once: true }}
    >
      <div className="flex h-full flex-col justify-between rounded-md p-6">
        <Icon className="h-12 w-12 text-primary" />
        <div className="mt-4">
          <h3 className="font-bold">{benefit.title}</h3>
          <p className="mt-2 text-muted-foreground">{benefit.description}</p>
        </div>
      </div>
    </motion.div>
  );
})}
      </div>

      <div className="mx-auto mt-16 max-w-[58rem]">
        <h3 className="text-center text-2xl font-bold">Industry Examples</h3>
        <div className="mt-8 grid gap-4 sm:grid-cols-2">
        {industries.map((industry) => (
  <motion.div
    key={industry.name}
    className="rounded-lg border bg-background p-6 transition-all"
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.4, ease: "easeOut" }}
    viewport={{ once: true, amount: 0.2 }}
  >
    <h4 className="font-bold">{industry.name}</h4>
    <p className="mt-2 text-sm text-muted-foreground">{industry.description}</p>
  </motion.div>
))}
        </div>
      </div>

        <motion.div 
        className="mx-auto mt-16 text-center"
        variants={itemVariants}
      >
        <Link
          href="/contact"
          className="inline-flex h-12 items-center justify-center rounded-md bg-primary px-8 text-sm font-medium text-primary-foreground ring-offset-background transition-transform hover:scale-105 hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 group"
        >
          Discover Open Source AI Today
          <ArrowRight className="ml-2 h-5 w-5 transition-transform duration-300 group-hover:translate-x-2" />
        </Link>
      </motion.div>
    </motion.section>
  );
}
