import React from "react";
import { RelatedCases } from "@/components/case-studies/RelatedCases";

const sampleCases = [
  {
    slug: "financial-services-transformation",
    title: "Financial Services Transformation",
    industry: "Financial Services",
    description: "How we helped a leading bank transform their customer service with AI-powered solutions.",
    imageUrl: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&q=80",
  },
  {
    slug: "healthcare-compliance",
    title: "Healthcare Compliance with TRiSM",
    industry: "Healthcare",
    description: "Implementing secure and compliant AI solutions in healthcare.",
    imageUrl: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=800&q=80",
  },
  {
    slug: "manufacturing-optimization",
    title: "Manufacturing Process Optimization",
    industry: "Manufacturing",
    description: "AI-powered quality control and process optimization for manufacturing.",
    imageUrl: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=800&q=80",
  },
  {
    slug: "retail-analytics",
    title: "Retail Analytics Platform",
    industry: "Retail",
    description: "Transforming retail operations with AI-driven analytics and insights.",
    imageUrl: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=800&q=80",
  },
  {
    slug: "education-platform",
    title: "AI in Education",
    industry: "Education",
    description: "Building an adaptive learning platform powered by AI.",
    imageUrl: "https://images.unsplash.com/photo-1509062522246-3755977927d7?w=800&q=80",
  },
];

export default function TestRelatedPage() {
  return (
    <div>
      <RelatedCases 
        cases={sampleCases}
        currentCaseSlug="manufacturing-optimization"
      />
    </div>
  );
} 