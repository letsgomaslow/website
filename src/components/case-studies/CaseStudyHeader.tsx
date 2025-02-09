"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { Building2, Calendar, Clock } from "lucide-react";
import { cn } from "@/lib/utils/shared";

interface CaseStudyHeaderProps {
  title: string;
  industry: string;
  date: string;
  readTime: string;
  imageUrl: string;
  className?: string;
}

export function CaseStudyHeader({
  title,
  industry,
  date,
  readTime,
  imageUrl,
  className,
}: CaseStudyHeaderProps) {
  return (
    <header className={cn("relative w-full h-[70vh] min-h-[600px] overflow-hidden", className)}>
      {/* Background Image with Gradient Overlay */}
      <div className="absolute inset-0">
        <Image
          src={imageUrl}
          alt={title}
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-b from-background/80 via-background/50 to-background" />
      </div>

      {/* Content */}
      <div className="container relative h-full">
        <div className="flex flex-col justify-end h-full pb-24">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-4xl space-y-6"
          >
            {/* Meta Info */}
            <div className="flex flex-wrap gap-4 text-white/90">
              <div className="flex items-center gap-2">
                <Building2 className="h-4 w-4" />
                <span className="text-sm font-medium">{industry}</span>
              </div>
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4" />
                <span className="text-sm">{date}</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4" />
                <span className="text-sm">{readTime} read</span>
              </div>
            </div>

            {/* Title */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-4xl sm:text-5xl md:text-6xl font-bold text-white"
            >
              {title}
            </motion.h1>
          </motion.div>
        </div>
      </div>
    </header>
  );
} 