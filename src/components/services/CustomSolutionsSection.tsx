"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Layers, Settings, Wrench } from "lucide-react";

const features = [
  {
    title: "Industry‑specific solutions",
    description: "Custom AI solutions designed for your industry's unique challenges and requirements.",
    icon: Layers,
  },
  {
    title: "Fully custom‑built products",
    description: "End-to-end AI products tailored to your specific business needs and workflows.",
    icon: Settings,
  },
  {
    title: "Ongoing support and maintenance",
    description: "Continuous optimization and support to ensure your AI systems perform at their best.",
    icon: Wrench,
  },
];

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
};

export function CustomSolutionsSection() {
  return (
    <motion.section
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      viewport={{ once: true }}
      className="container py-24"
    >
      {/* Title & Description */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="mx-auto max-w-[58rem] text-center"
      >
        <h2 className="font-heading text-3xl font-bold leading-[1.1] sm:text-4xl md:text-5xl">
          Custom AI{" "}
          <span className="bg-gradient-to-r from-blue-600 to-violet-600 bg-clip-text text-transparent">
            Solutions
          </span>
        </h2>
        <p className="mt-6 text-xl text-muted-foreground">
          Every enterprise is unique. Our custom AI solutions are crafted to address your specific challenges—from industry-specific applications to end-to-end system integrations.
        </p>
      </motion.div>

      {/* Features Section */}
      <div className="mx-auto mt-16 grid justify-center gap-4 sm:grid-cols-2 md:max-w-[64rem] md:grid-cols-3">
        {features.map((feature, index) => {
          const Icon = feature.icon;
          return (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
              viewport={{ once: true }}
              className="relative overflow-hidden rounded-lg border bg-background p-2 hover:scale-105 transition-transform duration-300 ease-in-out"
            >
              <div className="flex h-full flex-col justify-between rounded-md p-6">
                <Icon className="h-12 w-12 text-primary" />
                <div className="mt-4">
                  <h3 className="font-bold">{feature.title}</h3>
                  <p className="mt-2 text-muted-foreground">{feature.description}</p>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Call to Action */}
      <motion.div 
        className="mx-auto mt-16 text-center"
        variants={itemVariants}
      >
        <Link
          href="/contact"
          className="inline-flex h-12 items-center justify-center rounded-md bg-primary px-8 text-sm font-medium text-primary-foreground ring-offset-background transition-transform hover:scale-105 hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 group"
        >
          Request a Custom Solution
          <ArrowRight className="ml-2 h-5 w-5 transition-transform duration-300 group-hover:translate-x-2" />
        </Link>
      </motion.div>
    </motion.section>
  );
}
