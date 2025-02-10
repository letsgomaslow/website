import React from "react";
import { ContactFormNew } from "@/components/contact/ContactFormNew";

export default function TestContactPage() {
  return (
    <div className="container py-12">
      <div className="mx-auto max-w-2xl">
        <div className="mb-8 space-y-4 text-center">
          <h1 className="text-4xl font-bold">Get in Touch</h1>
          <p className="text-xl text-muted-foreground">
            Ready to start your AI transformation journey? Fill out the form below and we'll get back to you shortly.
          </p>
        </div>

        <div className="rounded-lg border bg-card p-8">
          <ContactFormNew />
        </div>
      </div>
    </div>
  );
} 