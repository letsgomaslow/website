import React from "react";
import { HeroSection } from "@/components/HeroSection";
import { WhyChooseUsSection } from "@/components/WhyChooseUsSection";
import { CaseStudiesGrid } from "@/components/case-studies/CaseStudiesGrid";
import { InsightsTimeline } from "@/components/insights/InsightsTimeline";

export default function Page() {
  return (
    <div className="flex flex-col">
      <HeroSection />
      <WhyChooseUsSection />
      <CaseStudiesGrid />
      <InsightsTimeline />
    </div>
  );
}
