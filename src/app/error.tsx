"use client";

import { useEffect } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error);
  }, [error]);

  return (
    <div className="relative min-h-[calc(100vh-4rem)] flex items-center justify-center">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="flex flex-col items-center gap-8 text-center"
      >
        <div className="space-y-4">
          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
            Oops! Something went wrong
          </h1>
          <p className="mx-auto max-w-[600px] text-lg text-muted-foreground">
            {error.message || "An unexpected error occurred. Please try refreshing the page."}
          </p>
        </div>
        <div className="flex gap-4">
          <Button
            variant="default"
            onClick={() => reset()}
            size="lg"
            className="font-medium"
          >
            Try again
          </Button>
          <Link href="/">
            <Button
              variant="outline"
              size="lg"
              className="font-medium"
            >
              Go back home
            </Button>
          </Link>
        </div>
      </motion.div>
    </div>
  );
} 