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
  const handleLearnMore = (link: string) => {
    window.location.href = link;
  };

  return (
    <section className="my-5 p-5 bg-white rounded-lg shadow-sm" id="case-studies">
      <h2 className="text-[#0073e6] text-2xl font-bold mb-5">Case Studies</h2>
      <div className="flex flex-wrap gap-5">
        {caseStudies.map((study, index) => (
          <div 
            key={index} 
            className="flex-1 basis-[300px] bg-white border border-[#ddd] rounded-lg overflow-hidden text-center">
            <div className="p-5">
              <img 
                src="/api/placeholder/300/200" 
                alt="Case Study" 
                className="w-full h-auto rounded-lg mb-4"
              />
              <h3 className="text-xl font-bold mb-3 text-[#333]">{study.title}</h3>
              <p className="text-[#666] mb-4">{study.description}</p>
              <button 
                onClick={() => handleLearnMore(study.link)}
                className="inline-block bg-[#ff9900] text-white px-6 py-2 rounded-md font-bold hover:bg-[#e68a00] transition-colors cursor-pointer">
                Learn More
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}