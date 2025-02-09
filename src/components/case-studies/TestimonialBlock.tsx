"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Quote } from "lucide-react";
import { cn } from "@/lib/utils/shared";

interface TestimonialBlockProps {
  quote: string;
  author: string;
  role: string;
  company: string;
  avatarUrl?: string;
  className?: string;
  imagePosition?: "left" | "right";
}

export function TestimonialBlock({
  quote,
  author,
  role,
  company,
  avatarUrl,
  className,
  imagePosition = "right",
}: TestimonialBlockProps) {
  return (
    <div className={cn("py-layout-xl", className)}>
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true, margin: "-100px" }}
          className={cn(
            "grid gap-8 items-center",
            imagePosition === "right" 
              ? "md:grid-cols-[2fr,1fr]" 
              : "md:grid-cols-[1fr,2fr] md:gap-16"
          )}
        >
          {/* Quote Section */}
          <div className={cn(
            "space-y-8",
            imagePosition === "right" ? "md:pr-12" : "md:pl-12 md:order-2"
          )}>
            <Quote className="h-12 w-12 text-brand-pink opacity-50" />
            <blockquote className="text-2xl md:text-3xl font-medium leading-relaxed">
              "{quote}"
            </blockquote>
            <div className="space-y-2">
              <div className="font-semibold">{author}</div>
              <div className="text-muted-foreground">
                {role} at {company}
              </div>
            </div>
          </div>

          {/* Image Section */}
          {avatarUrl && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true, margin: "-100px" }}
              className={cn(
                "relative aspect-square w-full max-w-md mx-auto overflow-hidden rounded-full border-2",
                imagePosition === "right" ? "md:order-2" : "md:order-1"
              )}
            >
              <Image
                src={avatarUrl}
                alt={`${author} from ${company}`}
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-tr from-brand-pink/20 to-brand-green/20" />
            </motion.div>
          )}
        </motion.div>
      </div>
    </div>
  );
} 