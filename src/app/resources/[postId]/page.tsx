"use client";

import { Divide, Space } from "lucide-react";
import { useParams } from "next/navigation";
import ReactMarkdown from "react-markdown";
import { use, useEffect, useState } from "react";
import { Span } from "next/dist/trace";
import { getBlogById } from "@/utils/blogposts";

export default function ResourcePage() {
  const params = useParams();
  const [blog, setContent] = useState<any>({});
  const postId = Array.isArray(params?.postId) ? params.postId[0] : params?.postId;

  useEffect(() => {
    const fetchData = async () => {
      if (postId) {
        const result = await getBlogById(Number(postId));
        setContent(result as string);
      }
    };
    fetchData();
  }, [postId]);

  return (
    <div className="flex flex-col">
      <section className="container py-24">
        <div className="mx-auto max-w-[58rem]">
          <h1 className="font-heading text-4xl font-bold leading-[1.1] sm:text-5xl md:text-6xl mb-4">
            <span className="bg-gradient-to-r from-[#EE7BB3] to-[#6DC4AD] bg-clip-text text-transparent">
              {blog?.title}
            </span>
          </h1>
          
          <p className="text-black/70 mb-8">
            {blog?.publishedDate} | {blog?.publisher}
          </p>
          
          <div className="border-t-2 border-black/10 mb-1"></div>
          <div className="border-t-2 border-black/10 mb-8"></div>

          <ReactMarkdown
            components={{
              p: ({ node, ...props }) => <p className="text-black/70 mb-6" {...props} />,
              h1: ({ node, ...props }) => <h1 className="text-[#EE7BB3] text-3xl font-bold mt-8 mb-4" {...props} />,
              h2: ({ node, ...props }) => <h2 className="text-[#EE7BB3] text-2xl font-semibold mt-8 mb-4" {...props} />,
              h3: ({ node, ...props }) => <h3 className="text-[#EE7BB3] text-xl font-semibold mt-6 mb-3" {...props} />,
              h4: ({ node, ...props }) => <h4 className="text-[#EE7BB3] text-lg font-semibold mt-6 mb-3" {...props} />,
              h5: ({ node, ...props }) => <h5 className="text-[#EE7BB3] text-base font-semibold mt-6 mb-3" {...props} />,
              h6: ({ node, ...props }) => <h6 className="text-[#EE7BB3] text-base font-semibold mt-6 mb-3" {...props} />,
              i: ({ node, ...props }) => <i className="text-black/90 italic" {...props} />,
              li: ({ node, ...props }) => (
                <li className="text-black/70 mb-2 flex items-center" {...props}>
                  <span className="text-[#6DC4AD] mr-2 text-xl">•</span>
                  <span>{props.children}</span>
                </li>
              ),
            }}
          >
            {blog?.content}
          </ReactMarkdown>
        </div>
      </section>
    </div>
  );
}