"use client";

// import Link from "next/link";
// import { ArrowRight } from "lucide-react";

// const articles = [
//   {
//     title: "The Open Source Advantage: Why It's the Future of Enterprise AI",
//     summary: "Explore how open‑source tools reduce costs and increase flexibility.",
//     slug: "open-source-advantage",
//   },
//   {
//     title: "How TRiSM Mitigates BYOAI Risks",
//     summary: "A deep dive into managing trust, risk, and security in enterprise AI.",
//     slug: "trism-byoai-risks",
//   },
//   {
//     title: "The Gartner Tech Sandwich Framework Explained",
//     summary: "An accessible breakdown of scalable architecture for enterprise success.",
//     slug: "gartner-tech-sandwich",
//   },
// ];

// export function ArticlesSection() {
//   return (
//     <section className="container py-24">
//       <div className="mx-auto max-w-[58rem] text-center">
//         <h2 className="font-heading text-3xl font-bold leading-[1.1] sm:text-4xl md:text-5xl">
//           {/* Articles &{" "} */}
//           <span className="bg-gradient-to-r from-[#EE7BB3] to-[#6DC4AD] bg-clip-text text-transparent">
//             Blogs
//           </span>
//         </h2>
//       </div>

//       <div className="mx-auto mt-16 grid justify-center gap-8 sm:grid-cols-2 md:max-w-[64rem] lg:grid-cols-3">
//         {articles.map((article) => (
//           <Link
//             key={article.slug}
//             href={`/resources/articles/${article.slug}`}
//             className="group relative overflow-hidden rounded-lg border bg-background p-2 transition-colors hover:border-primary"
//           >
//             <div className="flex h-full flex-col justify-between rounded-md p-6">
//               <div>
//                 <h3 className="font-bold group-hover:text-primary">
//                   {article.title}
//                 </h3>
//                 <p className="mt-2 text-muted-foreground">
//                   {article.summary}
//                 </p>
//               </div>
//               <div className="mt-4 flex items-center text-sm text-muted-foreground">
//                 <span className="group-hover:text-primary">Read more</span>
//                 <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1 group-hover:text-primary" />
//               </div>
//             </div>
//           </Link>
//         ))}
//       </div>
//     </section>
//   );
// } 


import React from "react";




const blogPosts = [
  {
    title: "The Future of Enterprise AI",
    description: "Explore insights and trends shaping the future of AI in enterprise.",
    link: "/blogs/future-of-enterprise-ai"
  }
];

export function ArticlesSection() {
  return (
    <section className="section" id="blogs">
      <h2 className="text-[#0073e6] text-2xl mb-4">Blogs</h2>
      <div className="resources-grid flex flex-wrap gap-5">
        {blogPosts.map((post, index) => (
          <div key={index} className="resource-card flex-1 min-w-[300px] p-5 bg-[#fafafa] border rounded-md text-center">
            <img 
              src="https://via.placeholder.com/300x200?text=Blog+Image" 
              alt="Blog Post" 
              className="max-w-full h-auto rounded-md mb-4"
            />
            <h3 className="font-bold mb-2">{post.title}</h3>
            <p className="mb-4">{post.description}</p>
            <a 
              href={post.link} 
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