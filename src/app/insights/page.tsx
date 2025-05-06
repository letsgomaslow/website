"use client";

import React from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { insights } from "@/data/insights";

export default function InsightsPage() {
  return (
    <div className="py-layout-2xl">
      <div className="container">
        {/* Header */}
        <div className="text-center space-y-4 mb-16">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold">
            All Insights
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Explore our comprehensive collection of insights on AI transformation
          </p>
        </div>

        {/* Insights List */}
        <div className="max-w-4xl mx-auto space-y-8">
          {insights.map((insight, index) => {
            const date = new Date(insight.date);
            return (
              <Link 
                key={index}
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
                  <span className="text-muted-foreground">
                    · {date.toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                      year: "numeric",
                    })}
                  </span>
                </div>

                <h2 className="text-xl font-bold tracking-tight hover:text-brand-pink transition-colors duration-200">
                  {insight.title}
                </h2>

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
            );
          })}
        </div>
      </div>
    </div>
  );
}