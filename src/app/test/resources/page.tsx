"use client";

import { useState, useMemo } from "react";
import { ResourceFilters } from "@/components/resources/ResourceFilters";
import { ResourceCard } from "@/components/resources/ResourceCard";

// Sample data
const resources = [
  {
    type: "article" as const,
    title: "The Future of AI in Enterprise: A Comprehensive Guide",
    description: "Explore how artificial intelligence is transforming enterprise operations and decision-making processes in 2024 and beyond.",
    coverImage: "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800&q=80",
    categories: ["AI Strategy", "Enterprise AI"],
    date: "March 15, 2024",
    readTime: "12 min",
    author: {
      name: "Sarah Chen",
      role: "Head of AI Strategy"
    },
    slug: "future-of-ai-enterprise"
  },
  {
    type: "whitepaper" as const,
    title: "TRiSM Framework Implementation Guide",
    description: "A detailed guide on implementing the Trust, Risk and Security Management framework in your AI systems.",
    coverImage: "https://images.unsplash.com/photo-1516321497487-e288fb19713f?w=800&q=80",
    categories: ["TRiSM Framework", "Implementation"],
    date: "March 10, 2024",
    readTime: "25 min",
    author: {
      name: "Dr. Michael Ross",
      role: "Chief Security Officer"
    },
    slug: "trism-implementation-guide"
  },
  {
    type: "case-study" as const,
    title: "Machine Learning at Scale: Fortune 500 Success Story",
    description: "Learn how a Fortune 500 company leveraged machine learning to transform their operations and achieve unprecedented growth.",
    coverImage: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=800&q=80",
    categories: ["Machine Learning", "Enterprise AI"],
    date: "March 5, 2024",
    readTime: "15 min",
    author: {
      name: "Alex Thompson",
      role: "Lead Data Scientist"
    },
    slug: "ml-fortune-500-case-study"
  },
  {
    type: "webinar" as const,
    title: "Open Source AI Tools for Enterprise",
    description: "Join us for an in-depth look at the most powerful open source AI tools available for enterprise use.",
    coverImage: "https://images.unsplash.com/photo-1591453089816-0fbb971b454c?w=800&q=80",
    categories: ["Open Source", "Implementation"],
    date: "March 20, 2024",
    author: {
      name: "Lisa Wang",
      role: "Open Source Advocate"
    },
    slug: "open-source-ai-tools-webinar"
  }
];

export default function ResourcesPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedType, setSelectedType] = useState("all");
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [sortBy, setSortBy] = useState("latest");

  const filteredResources = useMemo(() => {
    return resources
      .filter(resource => {
        // Type filter
        if (selectedType !== "all" && resource.type !== selectedType) {
          return false;
        }

        // Category filter
        if (selectedCategories.length > 0 && !resource.categories.some(cat => selectedCategories.includes(cat))) {
          return false;
        }

        // Search filter
        if (searchQuery) {
          const searchLower = searchQuery.toLowerCase();
          return (
            resource.title.toLowerCase().includes(searchLower) ||
            resource.description.toLowerCase().includes(searchLower) ||
            resource.categories.some(cat => cat.toLowerCase().includes(searchLower))
          );
        }

        return true;
      })
      .sort((a, b) => {
        // Sort
        if (sortBy === "latest") {
          return new Date(b.date).getTime() - new Date(a.date).getTime();
        }
        if (sortBy === "oldest") {
          return new Date(a.date).getTime() - new Date(b.date).getTime();
        }
        // For "popular", we would typically use a view/engagement count
        // Here we're just using the same order as the original array
        return 0;
      });
  }, [searchQuery, selectedType, selectedCategories, sortBy]);

  return (
    <div className="min-h-screen bg-background">
      <div className="container py-12">
        <div className="mb-8 space-y-4">
          <h1 className="text-4xl font-bold">Resources</h1>
          <p className="text-xl text-muted-foreground">
            Explore our collection of articles, whitepapers, case studies, and webinars
          </p>
        </div>

        <ResourceFilters
          onSearch={setSearchQuery}
          onTypeChange={setSelectedType}
          onCategoryChange={setSelectedCategories}
          onSortChange={setSortBy}
          className="mb-8"
        />

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filteredResources.map((resource) => (
            <ResourceCard
              key={resource.slug}
              {...resource}
            />
          ))}
        </div>

        {filteredResources.length === 0 && (
          <div className="flex flex-col items-center justify-center py-12 text-center">
            <p className="text-lg font-medium">No resources found</p>
            <p className="text-muted-foreground">
              Try adjusting your filters or search query
            </p>
          </div>
        )}
      </div>
    </div>
  );
} 