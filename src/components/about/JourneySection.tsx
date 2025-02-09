"use client";

const milestones = [
  {
    year: "2018",
    title: "Founded with a mission",
    description: "Founded with a mission to democratize AI.",
  },
  {
    year: "2020",
    title: "First Open Source Product",
    description: "Launched first open‑source generative AI product.",
  },
  {
    year: "2022",
    title: "TRiSM Framework",
    description: "Introduced the TRiSM framework for risk management.",
  },
];

export function JourneySection() {
  return (
    <section className="container py-24 bg-muted/50">
      <div className="mx-auto max-w-[58rem] text-center">
        <h2 className="font-heading text-3xl font-bold leading-[1.1] sm:text-4xl md:text-5xl">
          Our{" "}
          <span className="bg-gradient-to-r from-blue-600 to-violet-600 bg-clip-text text-transparent">
            Journey
          </span>
        </h2>
      </div>

      <div className="mx-auto mt-16 max-w-[64rem]">
        <div className="relative">
          <div className="absolute left-1/2 h-full w-0.5 -translate-x-1/2 bg-border" />
          <div className="space-y-12">
            {milestones.map((milestone, index) => (
              <div
                key={milestone.year}
                className={`relative flex items-center ${
                  index % 2 === 0 ? "justify-start" : "justify-end"
                }`}
              >
                <div
                  className={`w-1/2 ${
                    index % 2 === 0 ? "pr-12" : "pl-12"
                  } relative`}
                >
                  <div className="absolute top-1/2 -mt-2 h-4 w-4 rounded-full bg-primary">
                    <div className="absolute left-1/2 top-1/2 h-2 w-2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-background" />
                  </div>
                  <div
                    className={`rounded-lg border bg-background p-6 ${
                      index % 2 === 0 ? "text-right" : "text-left"
                    }`}
                  >
                    <span className="text-sm font-medium text-muted-foreground">
                      {milestone.year}
                    </span>
                    <h3 className="mt-2 font-bold">{milestone.title}</h3>
                    <p className="mt-1 text-sm text-muted-foreground">
                      {milestone.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
} 