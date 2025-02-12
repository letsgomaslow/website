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




"use client";

import React from "react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.3
    }
  }
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 }
};

export function ArticlesSection({ blogPosts }: { blogPosts: Array<any> }) {
  const router = useRouter();

  const handleLearnMore = (postId: string) => {
    router.push(`/resources/${postId}`);
  };

  return (
    <motion.section 
      className="my-5 p-5 bg-white rounded-lg shadow-sm"
      id="blogs"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <motion.div 
        className="flex flex-wrap gap-5"
        variants={container}
        initial="hidden"
        animate="show"
      >
        {blogPosts.map((post, index) => (
          <motion.div
            key={index}
            className="flex-1 basis-[300px] bg-white border border-[#ddd] rounded-lg overflow-hidden text-center group"
            variants={item}
            whileHover={{ 
              scale: 1.02,
              transition: { duration: 0.2 }
            }}
          >
            <div className="p-5">
              <motion.img
                src={post.thumbnail}
                alt="Blog Post"
                className="w-full h-auto rounded-lg mb-4"
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.3 }}
              />
              <h3 className="text-xl font-bold mb-3 text-[#333]">{post.title}</h3>
              <p className="text-[#666] mb-4">{post.description}</p>
              <motion.button
                onClick={() => handleLearnMore(post.id)}
                className="inline-block bg-[#ff9900] text-white px-6 py-2 rounded-md font-bold hover:bg-[#e68a00] transition-colors cursor-pointer"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Learn More
              </motion.button>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </motion.section>
  );
}