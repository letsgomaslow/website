import React from "react";
import { CaseStudyCard } from "@/components/case-studies/CaseStudyCard";

const caseStudies = [
  {
    title: "Financial Services Transformation",
    industry: "Financial Services",
    problem: "A leading bank faced inefficiencies in customer service workflows due to outdated systems.",
    solution: "Maslow AI implemented a generative AI-powered chatbot using open‑source tools.",
    outcome: "Reduced response times by 40% and improved customer satisfaction by 30%.",
  },
  {
    title: "Healthcare Compliance with TRiSM",
    industry: "Healthcare",
    problem: "A healthcare provider struggled with data privacy regulation compliance.",
    solution: "Deployed the TRiSM framework alongside custom risk management tools.",
    outcome: "Achieved 100% compliance while safeguarding patient data.",
  },
  {
    title: "Manufacturing Process Optimization",
    industry: "Manufacturing",
    problem: "A global manufacturer faced production inefficiencies and quality control challenges.",
    solution: "Implemented AI-powered predictive maintenance and quality control systems.",
    outcome: "Reduced downtime by 35% and improved product quality metrics by 25%.",
  },
  {
    title: "Retail Customer Experience Enhancement",
    industry: "Retail",
    problem: "A retail chain struggled with personalization and inventory management.",
    solution: "Deployed AI-driven customer analytics and inventory optimization tools.",
    outcome: "Increased sales by 20% and reduced stockouts by 45%.",
  },
];

export default function CaseStudiesPage() {
  return (
    <div className="flex flex-col">
      <section className="container py-24">
        <div className="mx-auto max-w-[58rem] text-center">
          <h1 className="font-heading text-4xl font-bold leading-[1.1] sm:text-5xl md:text-6xl">
            Client Success{" "}
            <span className="bg-gradient-to-r from-blue-600 to-violet-600 bg-clip-text text-transparent">
              Stories
            </span>
          </h1>
          <p className="mt-6 text-xl text-muted-foreground">
            Discover how we've helped enterprises across industries transform their operations with innovative AI solutions.
          </p>
        </div>

        <div className="mx-auto mt-16 grid justify-center gap-8 sm:grid-cols-1 md:max-w-[64rem] lg:grid-cols-2">
          {caseStudies.map((study) => (
            <CaseStudyCard
              key={study.title}
              title={study.title}
              industry={study.industry}
              problem={study.problem}
              solution={study.solution}
              outcome={study.outcome}
            />
          ))}
        </div>
      </section>
    </div>
  );
} 