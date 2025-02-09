import React from "react";
import { ImageGallery } from "@/components/case-studies/ImageGallery";

const images = [
  {
    src: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&q=80",
    alt: "Financial dashboard showing AI-powered analytics",
    caption: "AI-powered financial analytics dashboard with real-time insights"
  },
  {
    src: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=800&q=80",
    alt: "Healthcare compliance system interface",
    caption: "HIPAA-compliant healthcare data management system"
  },
  {
    src: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=800&q=80",
    alt: "Manufacturing process visualization",
    caption: "Real-time manufacturing process monitoring with AI insights"
  },
  {
    src: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=800&q=80",
    alt: "Retail analytics platform",
    caption: "Customer behavior analysis and inventory optimization system"
  },
  {
    src: "https://images.unsplash.com/photo-1509062522246-3755977927d7?w=800&q=80",
    alt: "Educational platform interface",
    caption: "Adaptive learning platform powered by AI"
  },
  {
    src: "https://images.unsplash.com/photo-1494412519320-aa613dfb7738?w=800&q=80",
    alt: "Supply chain optimization dashboard",
    caption: "AI-driven supply chain optimization and tracking"
  }
];

export default function TestPage() {
  return (
    <div className="space-y-24 py-12">
      <section>
        <h2 className="text-2xl font-bold mb-8 container">2-Column Gallery</h2>
        <ImageGallery images={images.slice(0, 4)} columns={2} />
      </section>

      <section>
        <h2 className="text-2xl font-bold mb-8 container">3-Column Gallery (Default)</h2>
        <ImageGallery images={images} />
      </section>

      <section>
        <h2 className="text-2xl font-bold mb-8 container">4-Column Gallery</h2>
        <ImageGallery images={images} columns={4} />
      </section>
    </div>
  );
} 