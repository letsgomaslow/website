import React from "react";
import { ContactForm } from "@/components/contact/ContactForm";
import { FAQSection } from "@/components/contact/FAQSection";
import { Mic } from "lucide-react";

export default function ContactPage() {
  return (
    <div className="flex flex-col">
      <section className="container py-24">
        <div className="mx-auto max-w-[58rem] text-center">
          <h1 className="font-heading text-4xl font-bold leading-[1.1] sm:text-5xl md:text-6xl">
            Get in{" "}
            <span className="bg-gradient-to-r from-[#EE7BB3] to-[#6DC4AD] bg-clip-text text-transparent">
              Touch
            </span>
          </h1>
          <p className="mt-6 text-xl text-muted-foreground">
            Have questions about our services? Ready to start your AI transformation journey? We're here to help.
          </p>
        </div>

        <div className="mx-auto mt-8 max-w-[58rem]">
          {/* <div className="mb-12 rounded-lg border bg-muted/50 p-6">
            <div className="flex items-center gap-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                <Mic className="h-6 w-6 text-primary" />
              </div>
              <p className="text-lg">
                Use our voice‑based assistant for instant answers! Just ask: "What services do you offer?"
              </p>
            </div>
          </div> */}

          <div className="rounded-lg border bg-background p-8">
            <ContactForm />
          </div>
        </div>

        <div className="mx-auto mt-24 max-w-[58rem]">
          <FAQSection />
        </div>
      </section>
    </div>
  );
} 