"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { SearchBar } from "@/components/resources/SearchBar";
import { ArticlesSection } from "@/components/resources/ArticlesSection";
import { blogPosts } from "@/utils/blogposts";

export const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.3
    }
  }
};

export const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 }
};

export default function ResourcesPage() {
  const [blogs, updateBlogPosts] = useState(blogPosts);

  const updateFilter = (keyword: string) => {
    const filteredPosts = blogPosts.filter((post) => {
      return post.title.toLowerCase().includes(keyword.toLowerCase());
    });
    updateBlogPosts(filteredPosts);
  };

  return (
    <div className="relative overflow-hidden">
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-0 w-72 h-72 bg-[#EE7BB3]/10 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-0 w-72 h-72 bg-[#6DC4AD]/10 rounded-full blur-3xl" />
      </div>

      <div className="container relative">
        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
        >
          <section className="container py-24">
            <motion.div 
              className="mx-auto max-w-[58rem] text-center"
              variants={item}
            >
              <h1 className="font-heading text-4xl font-bold leading-[1.1] sm:text-5xl md:text-6xl">
                <span className="bg-gradient-to-r from-[#EE7BB3] to-[#6DC4AD] bg-clip-text text-transparent">
                  Resources
                </span>
              </h1>
              <motion.p 
                className="mt-6 text-xl text-muted-foreground"
                variants={item}
              >
                Your hub for blogs, whitepapers, case studies, webinars, and industry insights.
              </motion.p>
            </motion.div>
          </section>

          <motion.div 
            className="mb-5"
            variants={item}
          >
            <SearchBar onSearch={updateFilter} />
          </motion.div>

          <motion.div
            variants={item}
          >
            <ArticlesSection blogPosts={blogs} />
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}