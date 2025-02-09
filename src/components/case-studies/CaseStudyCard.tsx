"use client";

import { Building2, TrendingUp } from "lucide-react";

interface CaseStudyCardProps {
  title: string;
  industry: string;
  problem: string;
  solution: string;
  outcome: string;
}

export function CaseStudyCard({
  title,
  industry,
  problem,
  solution,
  outcome,
}: CaseStudyCardProps) {
  return (
    <div className="relative overflow-hidden rounded-lg border bg-background p-2">
      <div className="flex h-full flex-col justify-between rounded-md p-6">
        <div>
          <div className="mb-4 flex items-center">
            <Building2 className="mr-2 h-5 w-5 text-primary" />
            <span className="text-sm font-medium text-muted-foreground">
              {industry}
            </span>
          </div>
          <h3 className="font-bold text-xl mb-4">{title}</h3>
          
          <div className="space-y-4">
            <div>
              <h4 className="font-semibold mb-2">Challenge</h4>
              <p className="text-muted-foreground">{problem}</p>
            </div>
            
            <div>
              <h4 className="font-semibold mb-2">Solution</h4>
              <p className="text-muted-foreground">{solution}</p>
            </div>
            
            <div>
              <h4 className="font-semibold mb-2">Results</h4>
              <div className="flex items-start">
                <TrendingUp className="mr-2 h-5 w-5 text-primary mt-0.5" />
                <p className="text-muted-foreground">{outcome}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 