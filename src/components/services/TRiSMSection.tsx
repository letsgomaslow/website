"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Shield, Lock, CheckCircle } from "lucide-react";

const benefits = [
  {
    title: "Proactive risk management",
    description: "Identify and mitigate potential risks before they impact your AI systems.",
    icon: Shield,
  },
  {
    title: "Enhanced trust via ethical practices",
    description: "Build stakeholder confidence with transparent and ethical AI governance.",
    icon: CheckCircle,
  },
  {
    title: "Compliance with industry standards",
    description: "Stay compliant with evolving AI regulations and industry requirements.",
    icon: Lock,
  },
];

const industries = [
  {
    name: "Healthcare (HIPAA compliance)",
    description: "Ensure patient data privacy and regulatory compliance in AI-powered healthcare solutions.",
  },
  {
    name: "Financial Services",
    description: "Meet stringent security and compliance requirements for AI in financial operations.",
  },
];

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
};


export function TRiSMSection() {
  return (
    <motion.section
      className="container py-24"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
    >
      {/* Header */}
      <motion.div
        className="mx-auto max-w-[58rem] text-center"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        <h2 className="font-heading text-3xl font-bold leading-[1.1] sm:text-4xl md:text-5xl">
          TRiSM –{" "}
          <span className="bg-gradient-to-r from-blue-600 to-violet-600 bg-clip-text text-transparent">
            Trust, Risk, and Security Management
          </span>
        </h2>
        <p className="mt-6 text-xl text-muted-foreground">
          In an unpredictable AI landscape, our TRiSM framework ensures that your AI initiatives are secure, compliant, and reliable. We focus on proactive risk management and ethical governance to safeguard your operations.
        </p>
      </motion.div>

      {/* Benefits Section */}
      <motion.div
        className="mx-auto mt-16 grid justify-center gap-4 sm:grid-cols-2 md:max-w-[64rem] md:grid-cols-3"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        {benefits.map((benefit, index) => {
          const Icon = benefit.icon;
          return (
            <motion.div
              key={benefit.title}
              className="relative overflow-hidden rounded-lg border bg-background p-2"
              variants={{
                hidden: { opacity: 0, y: 20 },
                visible: { opacity: 1, y: 0, transition: { delay: index * 0.2, duration: 0.5 } },
              }}
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
            </motion.div>
          );
        })}
      </motion.div>

      {/* Industry Section */}
      <motion.div
        className="mx-auto mt-16 max-w-[58rem]"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        <h3 className="text-center text-2xl font-bold">Industry Examples</h3>
        <div className="mt-8 grid gap-4 sm:grid-cols-2">
          {industries.map((industry, index) => (
            <motion.div
              key={industry.name}
              className="rounded-lg border bg-background p-6"
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, ease: "easeOut", delay: index * 0.2 }}
            >
              <h4 className="font-bold">{industry.name}</h4>
              <p className="mt-2 text-sm text-muted-foreground">
                {industry.description}
              </p>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* CTA Button */}
      <motion.div 
        className="mx-auto mt-16 text-center"
        variants={itemVariants}
      >
        <Link
          href="/contact"
          className="inline-flex h-12 items-center justify-center rounded-md bg-primary px-8 text-sm font-medium text-primary-foreground ring-offset-background transition-transform hover:scale-105 hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 group"
        >
          Secure Your AI Systems Today
          <ArrowRight className="ml-2 h-5 w-5 transition-transform duration-300 group-hover:translate-x-2" />
        </Link>
      </motion.div>
    </motion.section>
  );
}
