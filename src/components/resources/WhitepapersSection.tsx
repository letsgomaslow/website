// "use client";

// import { Download } from "lucide-react";

// const whitepapers = [
//   {
//     title: "Enterprise AI Transformation Guide",
//     description: "A comprehensive guide to implementing AI in your enterprise.",
//     fileSize: "2.4 MB",
//     fileType: "PDF",
//   },
//   {
//     title: "TRiSM Framework Implementation",
//     description: "Step-by-step guide to implementing the TRiSM framework.",
//     fileSize: "1.8 MB",
//     fileType: "PDF",
//   },
//   {
//     title: "Open Source AI Tools Comparison",
//     description: "Detailed comparison of popular open-source AI tools.",
//     fileSize: "3.1 MB",
//     fileType: "PDF",
//   },
// ];

// export function WhitepapersSection() {
//   return (
//     <section className="container py-24 bg-muted/50">
//       <div className="mx-auto max-w-[58rem] text-center">
//         <h2 className="font-heading text-3xl font-bold leading-[1.1] sm:text-4xl md:text-5xl">
//           Whitepapers &{" "}
//           <span className="bg-gradient-to-r from-blue-600 to-violet-600 bg-clip-text text-transparent">
//             Guides
//           </span>
//         </h2>
//       </div>

//       <div className="mx-auto mt-16 grid justify-center gap-8 sm:grid-cols-2 md:max-w-[64rem] lg:grid-cols-3">
//         {whitepapers.map((whitepaper) => (
//           <div
//             key={whitepaper.title}
//             className="relative overflow-hidden rounded-lg border bg-background p-2"
//           >
//             <div className="flex h-full flex-col justify-between rounded-md p-6">
//               <div>
//                 <h3 className="font-bold">{whitepaper.title}</h3>
//                 <p className="mt-2 text-muted-foreground">
//                   {whitepaper.description}
//                 </p>
//               </div>
//               <div className="mt-4">
//                 <button
//                   className="inline-flex h-9 items-center justify-center rounded-md border border-input bg-background px-4 py-2 text-sm font-medium ring-offset-background transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
//                   onClick={() => {
//                     // TODO: Implement download functionality
//                     alert("Download functionality will be implemented");
//                   }}
//                 >
//                   <Download className="mr-2 h-4 w-4" />
//                   Download {whitepaper.fileType} ({whitepaper.fileSize})
//                 </button>
//               </div>
//             </div>
//           </div>
//         ))}
//       </div>
//     </section>
//   );
// } 


"use client";
import React from "react";

const whitepapers = [
  {
    title: "The C-Suite Guide to Generative AI Transformation",
    description: "An in-depth guide to understanding and implementing generative AI at scale.",
    link: "/whitepapers/c-suite-guide"
  }
];

export function WhitepapersSection() {
  return (
    <section className="section" id="whitepapers">
      <h2 className="text-[#0073e6] text-2xl mb-4">Whitepapers & Guides</h2>
      <div className="resources-grid flex flex-wrap gap-5">
        {whitepapers.map((paper, index) => (
          <div key={index} className="resource-card flex-1 min-w-[300px] p-5 bg-[#fafafa] border rounded-md text-center">
            <img 
              src="https://via.placeholder.com/300x200?text=Whitepaper" 
              alt="Whitepaper" 
              className="max-w-full h-auto rounded-md mb-4"
            />
            <h3 className="font-bold mb-2">{paper.title}</h3>
            <p className="mb-4">{paper.description}</p>
            <a 
              href={paper.link} 
              className="inline-block bg-[#ff9900] text-white px-4 py-2 rounded-md font-bold"
            >
              Download Now
            </a>
          </div>
        ))}
      </div>
    </section>
  );
}