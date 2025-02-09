"use client";

import Link from "next/link";
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

export function CustomSolutionsSection() {
  return (
    <section className="container py-24">
      <div className="mx-auto max-w-[58rem] text-center">
        <h2 className="font-heading text-3xl font-bold leading-[1.1] sm:text-4xl md:text-5xl">
          Custom{" "}
          <span className="bg-gradient-to-r from-blue-600 to-violet-600 bg-clip-text text-transparent">
            Solutions & Products
          </span>
        </h2>
        <p className="mt-6 text-xl text-muted-foreground">
          Every business is unique. We design bespoke AI solutions—from custom products to end‑to‑end systems—that address your specific challenges and deliver measurable impact.
        </p>
      </div>

      <div className="mx-auto mt-16 grid justify-center gap-4 sm:grid-cols-2 md:max-w-[64rem] md:grid-cols-3">
        {features.map((feature) => {
          const Icon = feature.icon;
          return (
            <div
              key={feature.title}
              className="relative overflow-hidden rounded-lg border bg-background p-2"
            >
              <div className="flex h-full flex-col justify-between rounded-md p-6">
                <Icon className="h-12 w-12 text-primary" />
                <div className="mt-4">
                  <h3 className="font-bold">{feature.title}</h3>
                  <p className="mt-2 text-muted-foreground">
                    {feature.description}
                  </p>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="mx-auto mt-16 text-center">
        <Link
          href="/contact"
          className="inline-flex h-11 items-center justify-center rounded-md bg-primary px-8 text-sm font-medium text-primary-foreground ring-offset-background transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
        >
          Request a Custom Solution
          <ArrowRight className="ml-2 h-4 w-4" />
        </Link>
      </div>
    </section>
  );
} 