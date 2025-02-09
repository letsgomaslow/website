"use client";

import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { CaseStudyCard } from "./CaseStudyCard";

const FEATURED_CASE_STUDIES = [
  {
    title: "Financial Services Transformation",
    industry: "Financial Services",
    problem: "A leading bank faced inefficiencies in customer service workflows due to outdated systems.",
    solution: "Maslow AI implemented a generative AI-powered chatbot using open‑source tools.",
    outcome: "Reduced response times by 40% and improved customer satisfaction by 30%.",
    imageUrl: "/images/case-studies/finance.jpg",
  },
  {
    title: "Healthcare Compliance with TRiSM",
    industry: "Healthcare",
    problem: "A healthcare provider struggled with data privacy regulation compliance.",
    solution: "Deployed the TRiSM framework alongside custom risk management tools.",
    outcome: "Achieved 100% compliance while safeguarding patient data.",
    imageUrl: "/images/case-studies/healthcare.jpg",
  },
  {
    title: "Manufacturing Process Optimization",
    industry: "Manufacturing",
    problem: "A global manufacturer needed to optimize their quality control process.",
    solution: "Implemented AI-powered visual inspection system with real-time analytics.",
    outcome: "Reduced defect rates by 45% and increased production efficiency by 25%.",
    imageUrl: "/images/case-studies/manufacturing.jpg",
  },
];

export function CaseStudiesGrid() {
  return (
    <section className="container py-layout-2xl">
      <div className="flex flex-col gap-layout-xl">
        {/* Section Header */}
        <div className="flex flex-col gap-component-md text-center">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold">
            Success Stories
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Discover how we've helped enterprises across industries transform their operations with AI solutions.
          </p>
        </div>

        {/* Case Studies Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {FEATURED_CASE_STUDIES.map((study, index) => (
            <div 
              key={index}
              className="group relative bg-card rounded-lg overflow-hidden transition-all duration-300 hover:shadow-lg hover:-translate-y-1"
            >
              {/* Image */}
              <div className="relative h-48 overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent z-10" />
                <Image
                  src={study.imageUrl}
                  alt={study.title}
                  fill
                  className="object-cover transition-transform duration-300 group-hover:scale-105"
                />
                <div className="absolute bottom-4 left-4 z-20">
                  <span className="text-sm font-medium text-white/80">
                    {study.industry}
                  </span>
                </div>
              </div>

              {/* Content */}
              <div className="p-6">
                <CaseStudyCard {...study} />
              </div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="flex justify-center">
          <Link href="/case-studies">
            <Button
              variant="outline"
              size="lg"
              className="group gap-2 text-base"
            >
              View All Case Studies
              <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
} 