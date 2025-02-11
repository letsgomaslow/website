'use client';

import React, { useState } from "react";
import { SearchBar } from "@/components/resources/SearchBar";
import { ArticlesSection } from "@/components/resources/ArticlesSection";
// import { WhitepapersSection } from "@/components/resources/WhitepapersSection";
// import  CaseStudiesSection  from "@/components/resources/CaseStudiesSection";
// import { WebinarsSection } from "@/components/resources/WebinarsSection";
// import { InsightsSection } from "@/components/resources/InsightsSection";
import { blogPosts } from "@/utils/blogposts";

export default function ResourcesPage() {

  const [blogs, updateBlogPosts] = useState(blogPosts);
  console.log('ResourcesPage - Initial blogPosts:', blogPosts.length);
  
  const updateFilter = (keyword: string) => {
    console.log('ResourcesPage - updateFilter called with:', keyword); 
    console.log('ResourcesPage - Current blogs state:', blogs.length);

    const filteredPosts = blogPosts.filter((post) => {
      const match = post.title.toLowerCase().includes(keyword.toLowerCase());
      console.log(`ResourcesPage - Filtering "${post.title}": ${match}`); 
      return match;
    });
    
    console.log('ResourcesPage - Filtered posts:', filteredPosts.length);
    updateBlogPosts(filteredPosts);
    console.log('ResourcesPage - State updated with filtered posts');
  }
  

  return (
    <div>
      <div className="container">
         <section className="container py-24">
          <div className="mx-auto max-w-[58rem] text-center">
            <h1 className="font-heading text-4xl font-bold leading-[1.1] sm:text-5xl md:text-6xl">
              <span className="bg-gradient-to-r from-[#EE7BB3] to-[#6DC4AD] bg-clip-text text-transparent">
              Resources
              </span>
            </h1>
            <p className="mt-6 text-xl text-muted-foreground">
              Your hub for blogs, whitepapers, case studies, webinars, and industry insights.
            </p>
          </div>
        </section>
        <div className="mb-5">
        <SearchBar onSearch= {updateFilter}/>
          </div>
        <ArticlesSection blogPosts={blogs}/>
        {/* <WhitepapersSection />
        <CaseStudiesSection />
        <WebinarsSection />
        <InsightsSection /> */}
      </div>

</div>
  );
}


