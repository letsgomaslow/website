"use client";

import { motion } from "framer-motion";
import { ArrowRight, Gauge, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const paceTypes = [
  {
    title: "AI Steady Pace",
    description: "Focus on incremental productivity gains and systematic implementation.",
    icon: Gauge,
    color: "from-brand-blue to-brand-green"
  },
  {
    title: "AI Accelerated Pace",
    description: "Push boundaries and unlock all benefits of generative AI rapidly.",
    icon: Zap,
    color: "from-brand-pink to-brand-purple"
  }
];

export function PaceAssessmentSection() {
  return (
    <section className="relative py-layout-2xl overflow-hidden bg-muted/50">
      {/* Background Decorations */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 right-0 w-72 h-72 bg-brand-pink/10 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 left-0 w-72 h-72 bg-brand-blue/10 rounded-full blur-3xl" />
      </div>

      <div className="container relative">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="flex flex-col gap-layout-lg items-center text-center"
        >
          {/* Header */}
          <div className="max-w-2xl space-y-4">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold">
              What{" "}
              <span className="bg-gradient-to-r from-brand-pink to-brand-green bg-clip-text text-transparent">
                Pace
              </span>
              {" "}is Your Enterprise?
            </h2>
            <p className="text-lg text-muted-foreground">
              Not every organization needs to sprint in the AI race. Discover your optimal AI implementation pace.
            </p>
          </div>

          {/* Pace Types Grid */}
          <div className="grid md:grid-cols-2 gap-8 w-full max-w-4xl mt-8">
            {paceTypes.map((type, index) => {
              const Icon = type.icon;
              return (
                <motion.div
                  key={type.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.2 }}
                  viewport={{ once: true }}
                  className="relative group"
                >
                  <div className="relative rounded-2xl border bg-card p-6 h-full transition-shadow hover:shadow-lg">
                    <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r rounded-t-2xl opacity-80"
                      style={{
                        background: `linear-gradient(to right, var(--${type.color.split(' ')[1]}) 0%, var(--${type.color.split(' ')[3]}) 100%)`
                      }}
                    />
                    <div className="flex flex-col gap-4">
                      <div className="bg-gradient-to-r w-fit p-2 rounded-lg"
                        style={{
                          background: `linear-gradient(to right, var(--${type.color.split(' ')[1]}) 0%, var(--${type.color.split(' ')[3]}) 100%)`
                        }}
                      >
                        <Icon className="h-6 w-6 text-white" />
                      </div>
                      <h3 className="text-xl font-bold">{type.title}</h3>
                      <p className="text-muted-foreground">{type.description}</p>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>

          {/* CTA */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            viewport={{ once: true }}
            className="mt-8"
          >
            <Link href="/assessment">
              <Button
                size="lg"
                className="group gap-2"
              >
                Take the Assessment
                <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" />
              </Button>
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
} 