"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { insights } from "@/data/insights";

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
    },
  },
};

const item = {
  hidden: { opacity: 0, x: -20 },
  show: { opacity: 1, x: 0 },
};

export function InsightsTimeline() {
  return (
    <section className="container py-layout-2xl">
      <div className="flex flex-col gap-layout-xl">
        {/* Section Header */}
        <div className="flex flex-col gap-component-md text-center">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold">
            Latest Insights
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Stay ahead with our latest thoughts on AI transformation, open-source innovation, and enterprise security.
          </p>
        </div>

        {/* Timeline */}
        <motion.div
          className="relative max-w-4xl mx-auto"
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-100px" }}
        >
          {/* Timeline Line */}
          <div className="absolute left-0 top-0 bottom-0 w-px bg-border ml-8 sm:ml-[7.5rem]" />

          {/* Timeline Items */}
          <div className="flex flex-col gap-layout-lg">
            {insights.map((insight, index) => {
              const date = new Date(insight.date);
              return (
                <motion.div
                  key={index}
                  variants={item}
                  className="group relative pl-16 sm:pl-[11rem]"
                >
                  {/* Date */}
                  <time className="absolute left-0 top-0 w-12 sm:w-40 text-sm text-muted-foreground">
                    {date.toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                      year: "numeric",
                    })}
                  </time>

                  {/* Content */}
                  <div className="relative">
                    {/* Dot */}
                    <div className="absolute -left-[2.45rem] sm:-left-[2.45rem] top-3 h-3 w-3 rounded-full border-2 border-brand-pink bg-background transition-colors duration-200 group-hover:bg-brand-pink" />

                    <Link 
                      href={`/insights/${insight.title.toLowerCase().replace(/\s+/g, "-")}`}
                      className="block space-y-3 rounded-2xl border bg-card p-6 transition-all duration-200 hover:shadow-lg"
                    >
                      <div className="flex items-center gap-2 text-sm">
                        <span className="text-brand-pink font-medium">
                          {insight.category}
                        </span>
                        <span className="text-muted-foreground">
                          · {insight.readTime}
                        </span>
                      </div>

                      <h3 className="text-xl font-bold tracking-tight group-hover:text-brand-pink transition-colors duration-200">
                        {insight.title}
                      </h3>

                      <p className="text-muted-foreground">
                        {insight.description}
                      </p>

                      {/* <div className="pt-2">
                        <span className="inline-flex items-center gap-2 text-sm font-medium text-brand-pink">
                          Read More
                          <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" />
                        </span>
                      </div> */}
                    </Link>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </motion.div>

        {/* CTA */}
        <div className="flex justify-center">
          <Link href="/insights">
            <Button
              variant="outline"
              size="lg"
              className="group gap-2 text-base"
            >
              View All Insights
              <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}