"use client";

import Link from "next/link";
import { ArrowRight, Building2, ChartBar, Cog } from "lucide-react";

const benefits = [
  {
    title: "A clear, business‑aligned AI strategy",
    description: "Develop a roadmap that aligns with your business objectives and growth targets.",
    icon: Building2,
  },
  {
    title: "Scalable architecture customized for your needs",
    description: "Build a robust foundation that grows with your business and adapts to changing demands.",
    icon: Cog,
  },
  {
    title: "Measurable outcomes driving growth",
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
    <section className="container py-24">
      <div className="mx-auto max-w-[58rem] text-center">
        <h1 className="font-heading text-4xl font-bold leading-[1.1] sm:text-5xl md:text-6xl">
          Generative AI{" "}
          <span className="bg-gradient-to-r from-[#EE7BB3] to-[#6DC4AD] bg-clip-text text-transparent">
            Strategy & Architecture
          </span>
        </h1>
        <p className="mt-6 text-xl text-muted-foreground">
          Unlock generative AI's potential with strategies tailored to your enterprise. We analyze your business needs and craft a seamless roadmap—from design to deployment—using frameworks like the Gartner AI Tech Sandwich to ensure scalability and efficiency from day one.
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
        <h2 className="text-center text-2xl font-bold">Industry Examples</h2>
        <div className="mt-8 grid gap-4 sm:grid-cols-2 md:grid-cols-3">
          {industries.map((industry) => (
            <div
              key={industry.name}
              className="rounded-lg border bg-background p-6"
            >
              <h3 className="font-bold">{industry.name}</h3>
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
          Start Building Your Generative AI Strategy Today
          <ArrowRight className="ml-2 h-4 w-4" />
        </Link>
      </div>
    </section>
  );
} 