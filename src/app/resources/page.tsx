import React from "react";
import { SearchBar } from "@/components/resources/SearchBar";
import { ArticlesSection } from "@/components/resources/ArticlesSection";
import { WhitepapersSection } from "@/components/resources/WhitepapersSection";
import  CaseStudiesSection  from "@/components/resources/CaseStudiesSection";
import { WebinarsSection } from "@/components/resources/WebinarsSection";
import { InsightsSection } from "@/components/resources/InsightsSection";

// export default function ResourcesPage() {
//   return (
//     <div className="flex flex-col">
//       <SearchBar />
//       <ArticlesSection />
//       <WhitepapersSection />
//       <WebinarsSection />
//     </div>
//   );
// } 

export default function ResourcesPage() {
  return (
      <div className="container">
        <SearchBar />
        <ArticlesSection />
        <WhitepapersSection />
        <CaseStudiesSection />
        <WebinarsSection />
        <InsightsSection />
      </div>
  );
}