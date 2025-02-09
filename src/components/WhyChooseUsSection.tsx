"use client";

import { Brain, Code, ShieldCheck } from "lucide-react";

const features = [
  {
    title: "Generative AI Expertise",
    description: "Tailored strategies aligned with your business goals.",
    icon: Brain,
  },
  {
    title: "Open‑Source Innovation",
    description: "Cost‑effective alternatives providing full customization.",
    icon: Code,
  },
  {
    title: "TRiSM Framework",
    description: "Trust, Risk, and Security Management to mitigate risks.",
    icon: ShieldCheck,
  },
];

export function WhyChooseUsSection() {
  return (
    <section className="container py-24">
      <div className="mx-auto max-w-[58rem] text-center">
        <h2 className="font-heading text-3xl leading-[1.1] sm:text-3xl md:text-5xl">
          Why Choose{" "}
          <span className="bg-gradient-to-r from-blue-600 to-violet-600 bg-clip-text text-transparent">
            Maslow AI
          </span>
        </h2>
        <p className="mt-4 text-muted-foreground sm:text-lg">
          We combine expertise, innovation, and security to deliver transformative AI solutions.
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
    </section>
  );
} 