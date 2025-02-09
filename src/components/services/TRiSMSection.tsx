"use client";

import Link from "next/link";
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

export function TRiSMSection() {
  return (
    <section className="container py-24">
      <div className="mx-auto max-w-[58rem] text-center">
        <h2 className="font-heading text-3xl font-bold leading-[1.1] sm:text-4xl md:text-5xl">
          TRiSM{" "}
          <span className="bg-gradient-to-r from-blue-600 to-violet-600 bg-clip-text text-transparent">
            Framework
          </span>
        </h2>
        <p className="mt-6 text-xl text-muted-foreground">
          Adopting AI need not come with undue risk. Our TRiSM framework ensures that your AI systems are secure, compliant, and trustworthy at every stage.
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
          Secure Your AI Systems Today
          <ArrowRight className="ml-2 h-4 w-4" />
        </Link>
      </div>
    </section>
  );
} 