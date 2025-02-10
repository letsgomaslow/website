"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils/shared";

interface Metric {
  value: string;
  label: string;
  description?: string;
}

interface MetricsGridProps {
  metrics: Metric[];
  className?: string;
}

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

export function MetricsGrid({ metrics, className }: MetricsGridProps) {
  return (
    <div className={cn("py-layout-xl bg-muted/50", className)}>
      <div className="container">
        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8"
        >
          {metrics.map((metric, index) => (
            <motion.div
              key={index}
              variants={item}
              className="relative overflow-hidden rounded-lg border bg-background p-6"
            >
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-brand-pink via-brand-purple to-brand-green opacity-75" />
              <div className="space-y-2">
                <div className="text-4xl font-bold bg-gradient-to-r from-brand-pink to-brand-green bg-clip-text text-transparent">
                  {metric.value}
                </div>
                <div className="font-semibold">{metric.label}</div>
                {metric.description && (
                  <p className="text-sm text-muted-foreground">
                    {metric.description}
                  </p>
                )}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  );
} 