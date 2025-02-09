import React from "react";
import { HeroSection } from "@/components/HeroSection";
import { WhyChooseUsSection } from "@/components/WhyChooseUsSection";

export default function Page() {
  return (
    <div className="flex flex-col">
      <HeroSection />
      <WhyChooseUsSection />
    </div>
  );
}
