"use client";

import { Search } from "lucide-react";

const resourceTypes = [
  { value: "all", label: "All Resources" },
  { value: "articles", label: "Articles & Blogs" },
  { value: "whitepapers", label: "Whitepapers" },
  { value: "webinars", label: "Webinars" },
  { value: "workshops", label: "Workshops" },
];

export function SearchBar() {
  return (
    <div className="container py-8">
      <div className="mx-auto flex max-w-[64rem] flex-col gap-4 sm:flex-row">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search resources..."
            className="h-10 w-full rounded-md border border-input bg-background pl-9 pr-3 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
          />
        </div>
        <select
          className="h-10 w-full rounded-md border border-input bg-background px-3 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 sm:w-[200px]"
          defaultValue="all"
        >
          {resourceTypes.map((type) => (
            <option key={type.value} value={type.value}>
              {type.label}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
} 