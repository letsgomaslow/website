"use client";

import { Lightbulb, Code, ShieldCheck } from "lucide-react";

const approaches = [
  {
    title: "Innovation First",
    description: "We stay at the forefront of AI technology, constantly exploring new possibilities to deliver cutting-edge solutions.",
    icon: Lightbulb,
  },
  {
    title: "Open‑Source Focus",
    description: "We leverage and contribute to open-source technologies, ensuring transparency and flexibility in our solutions.",
    icon: Code,
  },
  {
    title: "Ethical Governance (via TRiSM)",
    description: "Our TRiSM framework ensures all AI solutions meet the highest standards of trust, risk management, and security.",
    icon: ShieldCheck,
  },
];

export function OurApproachSection() {
  return (
    <section className="container py-24 bg-muted/50">
      <div className="mx-auto max-w-[58rem] text-center">
        <h2 className="font-heading text-3xl font-bold leading-[1.1] sm:text-4xl md:text-5xl">
          Our{" "}
          <span className="bg-gradient-to-r from-blue-600 to-violet-600 bg-clip-text text-transparent">
            Approach
          </span>
        </h2>
      </div>

      <div className="mx-auto mt-16 grid justify-center gap-4 sm:grid-cols-2 md:max-w-[64rem] md:grid-cols-3">
        {approaches.map((approach) => {
          const Icon = approach.icon;
          return (
            <div
              key={approach.title}
              className="relative overflow-hidden rounded-lg border bg-background p-2"
            >
              <div className="flex h-full flex-col justify-between rounded-md p-6">
                <Icon className="h-12 w-12 text-primary" />
                <div className="mt-4">
                  <h3 className="font-bold">{approach.title}</h3>
                  <p className="mt-2 text-muted-foreground">
                    {approach.description}
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