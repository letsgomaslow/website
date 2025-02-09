"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils/shared";

interface ContentBlockProps {
  title?: string;
  subtitle?: string;
  content: string | React.ReactNode;
  className?: string;
  variant?: "default" | "large" | "small";
}

export function ContentBlock({
  title,
  subtitle,
  content,
  className,
  variant = "default",
}: ContentBlockProps) {
  const titleSizes = {
    default: "text-2xl md:text-3xl",
    large: "text-3xl md:text-4xl",
    small: "text-xl md:text-2xl",
  };

  const subtitleSizes = {
    default: "text-lg",
    large: "text-xl",
    small: "text-base",
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      viewport={{ once: true, margin: "-100px" }}
      className={cn("space-y-6", className)}
    >
      {title && (
        <h2 className={cn(
          "font-bold tracking-tight",
          titleSizes[variant]
        )}>
          {title}
        </h2>
      )}
      
      {subtitle && (
        <p className={cn(
          "text-muted-foreground font-medium",
          subtitleSizes[variant]
        )}>
          {subtitle}
        </p>
      )}

      <div className={cn(
        "prose prose-zinc dark:prose-invert max-w-none",
        "prose-p:leading-relaxed",
        "prose-a:text-brand-pink hover:prose-a:text-brand-pink/80",
        "prose-strong:text-foreground",
        "prose-li:marker:text-brand-pink"
      )}>
        {typeof content === "string" ? (
          <p>{content}</p>
        ) : (
          content
        )}
      </div>
    </motion.div>
  );
} 