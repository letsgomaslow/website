"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { MagneticButton } from "@/components/ui/magnetic-button";

export function CapabilitiesCTA() {
  return (
    <section className="relative py-layout-2xl overflow-hidden">
      {/* Gradient Background */}
      <div className="absolute inset-0 bg-gradient-to-r from-brand-pink/10 via-brand-purple/10 to-brand-green/10" />
      <div className="absolute inset-0">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-brand-pink/20 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-brand-green/20 rounded-full blur-3xl" />
      </div>

      <div className="container relative">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true, margin: "-100px" }}
          className="flex flex-col items-center gap-8 text-center max-w-3xl mx-auto"
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold">
            Ready to Transform Your Enterprise with{" "}
            <span className="bg-gradient-to-r from-brand-pink to-brand-green bg-clip-text text-transparent">
              AI Solutions
            </span>
            ?
          </h2>
          
          <p className="text-lg text-muted-foreground">
            Let's discuss how our AI capabilities can drive innovation and growth for your business.
          </p>

          <div className="flex flex-col sm:flex-row gap-4">
            <MagneticButton>
              <Link href="/contact">
                <Button 
                  size="lg" 
                  variant="gradient"
                  className="group gap-2 text-base"
                >
                  Schedule a Consultation
                  <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" />
                </Button>
              </Link>
            </MagneticButton>

            <MagneticButton>
              <Link href="/case-studies">
                <Button 
                  size="lg" 
                  variant="outline"
                  className="group gap-2 text-base"
                >
                  View Success Stories
                  <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" />
                </Button>
              </Link>
            </MagneticButton>
          </div>
        </motion.div>
      </div>
    </section>
  );
} 