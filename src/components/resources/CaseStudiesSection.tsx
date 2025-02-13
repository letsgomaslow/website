"use client";
import React from "react";


const caseStudies = [
  {
    title: "Financial Services Transformation",
    description: "See how we helped a leading bank reduce response times by 40%.",
    link: "/case-studies/financial-transformation"
  }
];

export default function CaseStudiesSection() {
  return (
    <section className="section" id="case-studies">
      <h2 className="text-[#0073e6] text-2xl mb-4">Case Studies</h2>
      <div className="resources-grid flex flex-wrap gap-5">
        {caseStudies.map((study, index) => (
          <div key={index} className="resource-card flex-1 min-w-[300px] p-5 bg-[#fafafa] border rounded-md text-center">
            <img 
              src="https://via.placeholder.com/300x200?text=Case+Study" 
              alt="Case Study" 
              className="max-w-full h-auto rounded-md mb-4"
            />
            <h3 className="font-bold mb-2">{study.title}</h3>
            <p className="mb-4">{study.description}</p>
            <a 
              href={study.link} 
              className="inline-block bg-[#ff9900] text-white px-4 py-2 rounded-md font-bold"
            >
              Learn More
            </a>
          </div>
        ))}
      </div>
    </section>
  );
}