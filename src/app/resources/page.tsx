import React from "react";
import { SearchBar } from "@/components/resources/SearchBar";
import { ArticlesSection } from "@/components/resources/ArticlesSection";
import { WhitepapersSection } from "@/components/resources/WhitepapersSection";
import { WebinarsSection } from "@/components/resources/WebinarsSection";

export default function ResourcesPage() {
  return (
    <div className="flex flex-col">
      <SearchBar />
      <ArticlesSection />
      <WhitepapersSection />
      <WebinarsSection />
    </div>
  );
} 