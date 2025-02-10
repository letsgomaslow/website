import React from "react";
import { HeroSection } from "@/components/HeroSection";
import { WelcomeSection } from "@/components/WelcomeSection";
import { ValuePropositionSection } from "@/components/ValuePropositionSection";
import { PaceAssessmentSection } from "@/components/PaceAssessmentSection";
import { GartnerInsightsSection } from "@/components/GartnerInsightsSection";
import { CaseStudiesGrid } from "@/components/case-studies/CaseStudiesGrid";
import { InsightsTimeline } from "@/components/insights/InsightsTimeline";

export default function Page() {
  return (
    <div className="flex flex-col">
      <HeroSection />
      <WelcomeSection />
      <ValuePropositionSection />
      <PaceAssessmentSection />
      <GartnerInsightsSection />
      <CaseStudiesGrid />
      <InsightsTimeline />
    </div>
  );
}
