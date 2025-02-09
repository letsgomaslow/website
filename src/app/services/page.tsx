import React from "react";
import { GenerativeAIStrategySection } from "@/components/services/GenerativeAIStrategySection";
import { OpenSourceSection } from "@/components/services/OpenSourceSection";

export default function ServicesPage() {
  return (
    <div className="flex flex-col">
      <GenerativeAIStrategySection />
      <OpenSourceSection />
    </div>
  );
} 