import React from "react";
import { OurApproachSection } from "@/components/about/OurApproachSection";
import { TeamSection } from "@/components/about/TeamSection";
import { JourneySection } from "@/components/about/JourneySection";
import { OurCommitmentSection } from "@/components/about/OurCommitmentSection";
import { WhoWeAreSection } from "@/components/about/WhoWeAreSection";

export default function AboutPage() {
  return (
    <div className="flex flex-col">
      <WhoWeAreSection />
      <OurApproachSection />
      <TeamSection />
      <JourneySection />
      <OurCommitmentSection />
    </div>
  );
} 