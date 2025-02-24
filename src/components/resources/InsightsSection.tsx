"use client";
import React from "react";


export function InsightsSection() {
  return (
    <section className="section" id="insights">
      <h2 className="text-[#0073e6] text-2xl mb-4">Gartner Insights & Proprietary Research</h2>
      <p className="mb-4">
        Stay ahead with in-depth research and insights from Gartner, combined with our proprietary analyses to help guide your AI strategy.
      </p>
      <a 
        href="/insights" 
        className="inline-block bg-[#ff9900] text-white px-4 py-2 rounded-md font-bold"
      >
        Learn More
      </a>
    </section>
  );
}