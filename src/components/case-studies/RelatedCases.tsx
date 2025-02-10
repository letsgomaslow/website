"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils/shared";
import { Button } from "@/components/ui/button";

interface RelatedCase {
  slug: string;
  title: string;
  industry: string;
  description: string;
  imageUrl: string;
}

interface RelatedCasesProps {
  cases: RelatedCase[];
  currentCaseSlug?: string;
  className?: string;
}

export function RelatedCases({
  cases,
  currentCaseSlug,
  className
}: RelatedCasesProps) {
  // Filter out current case study if provided
  const filteredCases = currentCaseSlug
    ? cases.filter(c => c.slug !== currentCaseSlug)
    : cases;

  const [currentPage, setCurrentPage] = useState(0);
  const itemsPerPage = 3;
  const totalPages = Math.ceil(filteredCases.length / itemsPerPage);
  
  const visibleCases = filteredCases.slice(
    currentPage * itemsPerPage,
    (currentPage + 1) * itemsPerPage
  );

  const nextPage = () => {
    setCurrentPage((prev) => (prev + 1) % totalPages);
  };

  const prevPage = () => {
    setCurrentPage((prev) => (prev - 1 + totalPages) % totalPages);
  };

  return (
    <section className={cn("py-layout-2xl bg-muted/50", className)}>
      <div className="container">
        <div className="flex flex-col gap-layout-lg">
          {/* Section Header */}
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold sm:text-3xl">Related Case Studies</h2>
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="icon"
                onClick={prevPage}
                disabled={totalPages <= 1}
                className="h-8 w-8 rounded-full"
              >
                <ArrowLeft className="h-4 w-4" />
                <span className="sr-only">Previous page</span>
              </Button>
              <Button
                variant="outline"
                size="icon"
                onClick={nextPage}
                disabled={totalPages <= 1}
                className="h-8 w-8 rounded-full"
              >
                <ArrowRight className="h-4 w-4" />
                <span className="sr-only">Next page</span>
              </Button>
            </div>
          </div>

          {/* Cases Grid */}
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {visibleCases.map((caseStudy, index) => (
              <motion.div
                key={caseStudy.slug}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
              >
                <Link
                  href={`/case-studies/${caseStudy.slug}`}
                  className="group relative flex h-full flex-col overflow-hidden rounded-lg border bg-background transition-all duration-300 hover:border-primary hover:shadow-lg"
                >
                  {/* Image */}
                  <div className="relative aspect-[16/9] overflow-hidden">
                    <Image
                      src={caseStudy.imageUrl}
                      alt={caseStudy.title}
                      fill
                      className="object-cover transition-transform duration-300 group-hover:scale-105"
                      sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                  </div>

                  {/* Content */}
                  <div className="flex flex-1 flex-col gap-2 p-6">
                    <div className="text-sm font-medium text-muted-foreground">
                      {caseStudy.industry}
                    </div>
                    <h3 className="text-lg font-bold tracking-tight group-hover:text-primary">
                      {caseStudy.title}
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      {caseStudy.description}
                    </p>
                    <div className="mt-auto pt-4">
                      <span className="inline-flex items-center text-sm font-medium text-primary">
                        Read case study
                        <ArrowRight className="ml-2 h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" />
                      </span>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
} 