"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";

const articles = [
  {
    title: "The Open Source Advantage: Why It's the Future of Enterprise AI",
    summary: "Explore how open‑source tools reduce costs and increase flexibility.",
    slug: "open-source-advantage",
  },
  {
    title: "How TRiSM Mitigates BYOAI Risks",
    summary: "A deep dive into managing trust, risk, and security in enterprise AI.",
    slug: "trism-byoai-risks",
  },
  {
    title: "The Gartner Tech Sandwich Framework Explained",
    summary: "An accessible breakdown of scalable architecture for enterprise success.",
    slug: "gartner-tech-sandwich",
  },
];

export function ArticlesSection() {
  return (
    <section className="container py-24">
      <div className="mx-auto max-w-[58rem] text-center">
        <h2 className="font-heading text-3xl font-bold leading-[1.1] sm:text-4xl md:text-5xl">
          Articles &{" "}
          <span className="bg-gradient-to-r from-[#EE7BB3] to-[#6DC4AD] bg-clip-text text-transparent">
            Blogs
          </span>
        </h2>
      </div>

      <div className="mx-auto mt-16 grid justify-center gap-8 sm:grid-cols-2 md:max-w-[64rem] lg:grid-cols-3">
        {articles.map((article) => (
          <Link
            key={article.slug}
            href={`/resources/articles/${article.slug}`}
            className="group relative overflow-hidden rounded-lg border bg-background p-2 transition-colors hover:border-primary"
          >
            <div className="flex h-full flex-col justify-between rounded-md p-6">
              <div>
                <h3 className="font-bold group-hover:text-primary">
                  {article.title}
                </h3>
                <p className="mt-2 text-muted-foreground">
                  {article.summary}
                </p>
              </div>
              <div className="mt-4 flex items-center text-sm text-muted-foreground">
                <span className="group-hover:text-primary">Read more</span>
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1 group-hover:text-primary" />
              </div>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
} 