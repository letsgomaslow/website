"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { StrategySessionForm } from "./StrategySessionForm";

export function CTAButtons() {
  const [showStrategyForm, setShowStrategyForm] = useState(false);
  const router = useRouter();

  const handleWorkbookClick = () => {
    router.push("/contact"); // Adjust this path to your contact page route
  };

  return (
    <div className="flex gap-4 items-center">
      <Button 
        variant="gradient" 
        onClick={() => setShowStrategyForm(true)}
      >
        Book a 30-Minute AI Strategy Session
      </Button>
      
      <Button 
        variant="outline"
        onClick={handleWorkbookClick}
      >
        Download Free AI Planning Workbook
      </Button>

      {showStrategyForm && (
        <StrategySessionForm onClose={() => setShowStrategyForm(false)} />
      )}
    </div>
  );
}