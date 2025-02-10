"use client";

export function WhoWeAreSection() {
  return (
    <section className="container py-24">
      <div className="mx-auto max-w-[58rem] text-center">
        <h1 className="font-heading text-4xl font-bold leading-[1.1] sm:text-5xl md:text-6xl">
          Who{" "}
          <span className="bg-gradient-to-r from-[#EE7BB3] to-[#6DC4AD] bg-clip-text text-transparent">
            We Are
          </span>
        </h1>
        <p className="mt-6 text-xl text-muted-foreground">
          Maslow AI is more than just an AI services provider – we are your strategic partner in transforming enterprise challenges into measurable growth opportunities. We blend cutting-edge technology with deep industry insights to drive real-world results.
        </p>
      </div>
    </section>
  );
}