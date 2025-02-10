"use client";

import { useState } from "react";
import { Search, SlidersHorizontal } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils/shared";

const resourceTypes = [
  { value: "all", label: "All Resources" },
  { value: "articles", label: "Articles" },
  { value: "whitepapers", label: "Whitepapers" },
  { value: "case-studies", label: "Case Studies" },
  { value: "webinars", label: "Webinars" },
];

const categories = [
  "AI Strategy",
  "Machine Learning",
  "Open Source",
  "Enterprise AI",
  "TRiSM Framework",
  "Implementation",
];

const sortOptions = [
  { value: "latest", label: "Latest First" },
  { value: "oldest", label: "Oldest First" },
  { value: "popular", label: "Most Popular" },
];

interface ResourceFiltersProps {
  onSearch: (query: string) => void;
  onTypeChange: (type: string) => void;
  onCategoryChange: (categories: string[]) => void;
  onSortChange: (sort: string) => void;
  className?: string;
}

export function ResourceFilters({
  onSearch,
  onTypeChange,
  onCategoryChange,
  onSortChange,
  className,
}: ResourceFiltersProps) {
  const [showFilters, setShowFilters] = useState(false);
  const [selectedType, setSelectedType] = useState("all");
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedSort, setSelectedSort] = useState("latest");

  const handleTypeChange = (type: string) => {
    setSelectedType(type);
    onTypeChange(type);
  };

  const handleCategoryToggle = (category: string) => {
    const newCategories = selectedCategories.includes(category)
      ? selectedCategories.filter(c => c !== category)
      : [...selectedCategories, category];
    
    setSelectedCategories(newCategories);
    onCategoryChange(newCategories);
  };

  const handleSortChange = (sort: string) => {
    setSelectedSort(sort);
    onSortChange(sort);
  };

  return (
    <div className={cn("space-y-4", className)}>
      {/* Search and Filter Toggle */}
      <div className="flex gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            type="text"
            placeholder="Search resources..."
            className="pl-9"
            onChange={(e) => onSearch(e.target.value)}
          />
        </div>
        <Button
          variant="outline"
          size="icon"
          onClick={() => setShowFilters(!showFilters)}
          className={cn(
            "h-10 w-10",
            showFilters && "border-primary text-primary"
          )}
        >
          <SlidersHorizontal className="h-4 w-4" />
        </Button>
      </div>

      {/* Expandable Filters */}
      <AnimatePresence>
        {showFilters && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="overflow-hidden"
          >
            <div className="rounded-lg border bg-background p-4 space-y-6">
              {/* Resource Types */}
              <div>
                <h3 className="mb-3 text-sm font-medium">Resource Type</h3>
                <div className="flex flex-wrap gap-2">
                  {resourceTypes.map((type) => (
                    <Button
                      key={type.value}
                      variant={selectedType === type.value ? "default" : "outline"}
                      size="sm"
                      onClick={() => handleTypeChange(type.value)}
                    >
                      {type.label}
                    </Button>
                  ))}
                </div>
              </div>

              {/* Categories */}
              <div>
                <h3 className="mb-3 text-sm font-medium">Categories</h3>
                <div className="flex flex-wrap gap-2">
                  {categories.map((category) => (
                    <Button
                      key={category}
                      variant={selectedCategories.includes(category) ? "default" : "outline"}
                      size="sm"
                      onClick={() => handleCategoryToggle(category)}
                    >
                      {category}
                    </Button>
                  ))}
                </div>
              </div>

              {/* Sort Options */}
              <div>
                <h3 className="mb-3 text-sm font-medium">Sort By</h3>
                <div className="flex flex-wrap gap-2">
                  {sortOptions.map((option) => (
                    <Button
                      key={option.value}
                      variant={selectedSort === option.value ? "default" : "outline"}
                      size="sm"
                      onClick={() => handleSortChange(option.value)}
                    >
                      {option.label}
                    </Button>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
} 