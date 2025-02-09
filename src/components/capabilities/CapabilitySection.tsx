"use client";

import { motion } from "framer-motion";
import { Brain, Code, ShieldCheck, Cog, LucideIcon } from "lucide-react";
import Image from "next/image";
import { cn } from "@/lib/utils/shared";

type IconName = "Brain" | "Code" | "ShieldCheck" | "Cog";

const iconMap: Record<IconName, LucideIcon> = {
  Brain,
  Code,
  ShieldCheck,
  Cog,
};

interface CapabilitySectionProps {
  title: string;
  description: string;
  features: {
    title: string;
    description: string;
  }[];
  iconName: IconName;
  colorScheme: "pink" | "green" | "blue" | "purple";
  imageUrl: string;
  reverse?: boolean;
  className?: string;
}

export function CapabilitySection({
  title,
  description,
  features,
  iconName,
  colorScheme,
  imageUrl,
  reverse = false,
  className,
}: CapabilitySectionProps) {
  const Icon = iconMap[iconName];

  const colors = {
    pink: "from-brand-pink to-brand-purple",
    green: "from-brand-green to-brand-blue",
    blue: "from-brand-blue to-brand-purple",
    purple: "from-brand-purple to-brand-pink",
  };

  return (
    <section className={cn("py-layout-2xl", reverse && "bg-muted/50", className)}>
      <div className="container">
        <div className={cn(
          "grid gap-12 items-center lg:grid-cols-2",
          reverse && "lg:[&>*:first-child]:order-2"
        )}>
          {/* Content */}
          <motion.div
            initial={{ opacity: 0, x: reverse ? 20 : -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true, margin: "-100px" }}
            className="space-y-8"
          >
            <div className="space-y-4">
              <div className={cn(
                "inline-flex h-12 w-12 items-center justify-center rounded-lg bg-gradient-to-r",
                colors[colorScheme]
              )}>
                <Icon className="h-6 w-6 text-white" />
              </div>
              <h2 className="text-3xl font-bold">{title}</h2>
              <p className="text-lg text-muted-foreground">{description}</p>
            </div>

            <div className="space-y-4">
              {features.map((feature, index) => (
                <motion.div
                  key={feature.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true, margin: "-100px" }}
                  className="relative pl-8"
                >
                  <div className={cn(
                    "absolute left-0 top-2 h-3 w-3 rounded-full bg-gradient-to-r",
                    colors[colorScheme]
                  )} />
                  <h3 className="font-semibold">{feature.title}</h3>
                  <p className="text-muted-foreground">{feature.description}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Image/Visual */}
          <motion.div
            initial={{ opacity: 0, x: reverse ? -20 : 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true, margin: "-100px" }}
            className={cn(
              "relative aspect-square rounded-2xl border bg-muted/50 p-2 overflow-hidden group",
              "before:absolute before:inset-0 before:rounded-2xl before:bg-gradient-to-r",
              `before:${colors[colorScheme]}`,
              "before:opacity-10 before:z-10"
            )}
          >
            <div className="relative h-full rounded-xl overflow-hidden">
              <Image
                src={imageUrl}
                alt={title}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-105"
                sizes="(min-width: 1024px) 50vw, 100vw"
              />
              <div className="absolute inset-0 bg-gradient-to-tr from-background/80 via-background/20 to-transparent" />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
} 