"use client";

export function WhoWeAreSection() {
  return (
    <section className="container py-24">
      <div className="mx-auto max-w-[58rem] text-center">
        <h1 className="font-heading text-4xl font-bold leading-[1.1] sm:text-5xl md:text-6xl">
          Who{" "}
          <span className="bg-gradient-to-r from-blue-600 to-violet-600 bg-clip-text text-transparent">
            We Are
          </span>
        </h1>
        <p className="mt-6 text-xl text-muted-foreground">
          Maslow AI isn't just an AI services provider—we are your strategic partner in transformation. Our mission is to empower enterprises with innovative, ethical, and scalable AI solutions that drive real‑world results.
        </p>
      </div>
    </section>
  );
} 