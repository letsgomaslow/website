"use client";

import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <html>
      <body>
        <div className="relative min-h-screen bg-background flex items-center justify-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="container flex flex-col items-center justify-center gap-4 text-center"
          >
            <div className="space-y-2">
              <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
                Something went wrong!
              </h1>
              <p className="mx-auto max-w-[600px] text-lg text-muted-foreground">
                {error.message || "An unexpected error occurred. Please try refreshing the page."}
              </p>
            </div>
            <div className="flex gap-4">
              <Button
                variant="default"
                onClick={() => reset()}
                className="mt-4"
              >
                Try again
              </Button>
              <Button
                variant="outline"
                onClick={() => window.location.href = '/'}
                className="mt-4"
              >
                Go back home
              </Button>
            </div>
          </motion.div>
        </div>
      </body>
    </html>
  );
} 