"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils/shared";

interface TwoColumnLayoutProps {
  leftContent: React.ReactNode;
  rightContent: React.ReactNode;
  className?: string;
  reverse?: boolean;
  verticalAlignment?: "start" | "center" | "end";
  leftWidth?: "1/2" | "1/3" | "2/3";
}

export function TwoColumnLayout({
  leftContent,
  rightContent,
  className,
  reverse = false,
  verticalAlignment = "start",
  leftWidth = "1/2",
}: TwoColumnLayoutProps) {
  const gridCols = {
    "1/2": "md:grid-cols-2",
    "1/3": "md:grid-cols-[1fr,2fr]",
    "2/3": "md:grid-cols-[2fr,1fr]",
  };

  const alignItems = {
    start: "items-start",
    center: "items-center",
    end: "items-end",
  };

  return (
    <div className={cn("container py-layout-lg", className)}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true, margin: "-100px" }}
        className={cn(
          "grid gap-8",
          gridCols[leftWidth],
          alignItems[verticalAlignment]
        )}
      >
        <div className={cn(reverse && "md:order-2")}>
          {leftContent}
        </div>
        <div className={cn(reverse && "md:order-1")}>
          {rightContent}
        </div>
      </motion.div>
    </div>
  );
} 