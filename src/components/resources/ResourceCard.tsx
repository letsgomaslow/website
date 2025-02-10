"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { Calendar, Clock, FileText, Video } from "lucide-react";
import { cn } from "@/lib/utils/shared";

interface ResourceCardProps {
  type: "article" | "whitepaper" | "case-study" | "webinar";
  title: string;
  description: string;
  coverImage: string;
  categories: string[];
  date: string;
  readTime?: string;
  author?: {
    name: string;
    role: string;
  };
  slug: string;
  className?: string;
}

export function ResourceCard({
  type,
  title,
  description,
  coverImage,
  categories,
  date,
  readTime,
  author,
  slug,
  className,
}: ResourceCardProps) {
  const TypeIcon = type === "webinar" ? Video : FileText;

  return (
    <Link href={`/resources/${type}s/${slug}`}>
      <motion.article
        whileHover={{ y: -4 }}
        transition={{ duration: 0.2 }}
        className={cn(
          "group relative flex flex-col overflow-hidden rounded-lg border bg-background transition-colors hover:border-primary",
          className
        )}
      >
        {/* Cover Image */}
        <div className="relative aspect-video overflow-hidden">
          <Image
            src={coverImage}
            alt={title}
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent" />
          
          {/* Resource Type Badge */}
          <div className="absolute top-4 left-4 flex items-center gap-1.5 rounded-full bg-primary/90 px-3 py-1 text-sm font-medium text-white">
            <TypeIcon className="h-4 w-4" />
            <span className="capitalize">{type}</span>
          </div>
          
          {/* Categories */}
          <div className="absolute bottom-4 left-4 flex flex-wrap gap-2">
            {categories.map((category) => (
              <span
                key={category}
                className="rounded-full bg-background/90 px-2.5 py-0.5 text-xs font-medium text-foreground"
              >
                {category}
              </span>
            ))}
          </div>
        </div>

        {/* Content */}
        <div className="flex flex-1 flex-col gap-4 p-6">
          <h3 className="line-clamp-2 text-xl font-bold group-hover:text-brand-pink">
            {title}
          </h3>
          
          <p className="line-clamp-2 text-muted-foreground">
            {description}
          </p>

          {/* Meta Information */}
          <div className="mt-auto flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
            <div className="flex items-center gap-2">
              <Calendar className="h-4 w-4" />
              <span>{date}</span>
            </div>
            {readTime && (
              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4" />
                <span>{readTime} read</span>
              </div>
            )}
          </div>

          {/* Author (if available) */}
          {author && (
            <div className="mt-4 border-t pt-4 text-sm">
              <div className="font-medium text-foreground">{author.name}</div>
              <div className="text-muted-foreground">{author.role}</div>
            </div>
          )}
        </div>
      </motion.article>
    </Link>
  );
} 