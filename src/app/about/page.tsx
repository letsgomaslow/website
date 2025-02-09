import React from "react";
import { WhoWeAreSection } from "@/components/about/WhoWeAreSection";
import { OurApproachSection } from "@/components/about/OurApproachSection";
import { TeamSection } from "@/components/about/TeamSection";
import { JourneySection } from "@/components/about/JourneySection";

export default function AboutPage() {
  return (
    <div className="flex flex-col">
      <WhoWeAreSection />
      <OurApproachSection />
      <TeamSection />
      <JourneySection />
    </div>
  );
} 