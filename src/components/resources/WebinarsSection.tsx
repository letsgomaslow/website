"use client";

import { Calendar, Clock } from "lucide-react";

const events = [
  {
    title: "Getting Started with Generative AI",
    description: "Learn the basics of implementing generative AI in your enterprise.",
    date: "March 15, 2024",
    time: "2:00 PM EST",
    type: "Webinar",
  },
  {
    title: "TRiSM Framework Workshop",
    description: "Hands-on workshop on implementing the TRiSM framework.",
    date: "March 22, 2024",
    time: "11:00 AM EST",
    type: "Workshop",
  },
  {
    title: "Open Source AI Tools Deep Dive",
    description: "Technical deep dive into popular open-source AI tools.",
    date: "April 5, 2024",
    time: "1:00 PM EST",
    type: "Webinar",
  },
];

export function WebinarsSection() {
  return (
    <section className="container py-24">
      <div className="mx-auto max-w-[58rem] text-center">
        <h2 className="font-heading text-3xl font-bold leading-[1.1] sm:text-4xl md:text-5xl">
          Webinars &{" "}
          <span className="bg-gradient-to-r from-blue-600 to-violet-600 bg-clip-text text-transparent">
            Workshops
          </span>
        </h2>
      </div>

      <div className="mx-auto mt-16 grid justify-center gap-8 sm:grid-cols-2 md:max-w-[64rem] lg:grid-cols-3">
        {events.map((event) => (
          <div
            key={event.title}
            className="relative overflow-hidden rounded-lg border bg-background p-2"
          >
            <div className="flex h-full flex-col justify-between rounded-md p-6">
              <div>
                <div className="mb-4 inline-block rounded-full bg-primary/10 px-3 py-1 text-sm font-medium text-primary">
                  {event.type}
                </div>
                <h3 className="font-bold">{event.title}</h3>
                <p className="mt-2 text-muted-foreground">
                  {event.description}
                </p>
              </div>
              <div className="mt-4 space-y-2">
                <div className="flex items-center text-sm text-muted-foreground">
                  <Calendar className="mr-2 h-4 w-4" />
                  {event.date}
                </div>
                <div className="flex items-center text-sm text-muted-foreground">
                  <Clock className="mr-2 h-4 w-4" />
                  {event.time}
                </div>
                <button
                  className="mt-4 inline-flex h-9 w-full items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground ring-offset-background transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                  onClick={() => {
                    // TODO: Implement registration functionality
                    alert("Registration functionality will be implemented");
                  }}
                >
                  Register Now
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
} 