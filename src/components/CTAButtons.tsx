"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";

export function CTAButtons() {
  return (
    <div className="flex gap-4 items-center">
      <Link 
        href="https://calendly.com/maslow-ai/30min" 
        target="_blank" 
        rel="noopener noreferrer"
      >
        <Button variant="gradient">
          Book a 30-Minute AI Strategy Session
        </Button>
      </Link>
      
      <Link 
        href="https://conversationalai.maslow.ai/" 
        target="_blank" 
        rel="noopener noreferrer"
      >
        <Button variant="outline">
          Talk to our AI Sales Avatar
        </Button>
      </Link>
    </div>
  );
}