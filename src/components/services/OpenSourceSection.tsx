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

export function OpenSourceSection() {
  return (
    <motion.section 
      className="container py-24"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-100px" }}
      // variants={sectionVariants}
    >
    <section className="container py-24">
      <div className="mx-auto max-w-[58rem] text-center">
        <h2 className="font-heading text-3xl font-bold leading-[1.1] sm:text-4xl md:text-5xl">
          Open‑Source{" "}
          <span className="bg-gradient-to-r from-blue-600 to-violet-600 bg-clip-text text-transparent">
          Alternatives (BYOAI & Beyond)
          </span>
        </h2>
        <p className="mt-6 text-xl text-muted-foreground">
        With the increasing trend of employees bringing their own AI tools, we offer robust open-source solutions. Our approach provides greater control and mitigates risks associated with proprietary systems.
        </p>
      </div>

      <div className="mx-auto mt-16 grid justify-center gap-4 sm:grid-cols-2 md:max-w-[64rem] md:grid-cols-3">
        {benefits.map((benefit) => {
          const Icon = benefit.icon;
          return (
            <div
              key={benefit.title}
              className="relative overflow-hidden rounded-lg border bg-background p-2"
            >
              <div className="flex h-full flex-col justify-between rounded-md p-6">
                <Icon className="h-12 w-12 text-primary" />
                <div className="mt-4">
                  <h3 className="font-bold">{benefit.title}</h3>
                  <p className="mt-2 text-muted-foreground">
                    {benefit.description}
                  </p>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="mx-auto mt-16 max-w-[58rem]">
        <h3 className="text-center text-2xl font-bold">Industry Examples</h3>
        <div className="mt-8 grid gap-4 sm:grid-cols-2">
          {industries.map((industry) => (
            <div
              key={industry.name}
              className="rounded-lg border bg-background p-6"
            >
              <h4 className="font-bold">{industry.name}</h4>
              <p className="mt-2 text-sm text-muted-foreground">
                {industry.description}
              </p>
            </div>
          ))}
        </div>
      </div>

      <div className="mx-auto mt-16 text-center">
        <Link
          href="/contact"
          className="inline-flex h-11 items-center justify-center rounded-md bg-primary px-8 text-sm font-medium text-primary-foreground ring-offset-background transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
        >
          Discover Open Source AI Today
          <ArrowRight className="ml-2 h-4 w-4" />
        </Link>
      </div>
    </section>
    </motion.section>
  );
} 