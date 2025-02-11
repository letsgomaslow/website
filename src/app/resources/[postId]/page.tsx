"use client";

import { getBlogById } from "@/utils/blogposts";
import { Divide, Space } from "lucide-react";
import { useParams } from "next/navigation";
import ReactMarkdown from "react-markdown";
import { use, useEffect, useState } from "react";
import { Span } from "next/dist/trace";

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
    <div>
      <h1 style={{fontSize: 40, fontWeight: 600, marginBottom: 15, background: 'linear-gradient(to right, #EC79B3, #78bdad)', WebkitBackgroundClip: 'text', color: 'transparent'}}>{blog?.title}</h1>
      <p style={{ marginBottom: '15px', color: '#efefef' }}>
        {blog?.publishedDate} | {blog?.publisher}
      </p>
      <div style={{ borderTop: '1.5px solid #efefef', marginBottom: '2px' }}></div>
      <div style={{ borderTop: '1.5px solid #efefef', marginBottom:"25px"}}></div>
        <ReactMarkdown
          components={{
          p: ({ node, ...props }) => <p style={{ marginBottom: '15px' , color: '#d0d0d0'}} {...props} />,
          h1: ({ node, ...props }) => <h1 style={{ color: '#EC79B3', marginBottom: '10px', marginTop:'20px' }} {...props} />,
          h2: ({ node, ...props }) => <h2 style={{ color: '#EC79B3',  marginBottom: '10px', marginTop:'20px', fontSize:"18px" , fontWeight:"600" }} {...props} />,
          h3: ({ node, ...props }) => <h3 style={{ color: '#EC79B3',  marginBottom: '10px', marginTop:'20px'  }} {...props} />,
          h4: ({ node, ...props }) => <h4 style={{ color: '#EC79B3',  marginBottom: '10px', marginTop:'20px' }} {...props} />,
          h5: ({ node, ...props }) => <h5 style={{ color: '#EC79B3', marginBottom: '10px', marginTop:'20px'  }} {...props} />,
          h6: ({ node, ...props }) => <h6 style={{ color: '#EC79B3',  marginBottom: '10px', marginTop:'20px'  }} {...props} />,
          i: ({ node, ...props }) => <i style={{ color: '#ffffff',  marginBottom: '10px', marginTop:'20px'  }} {...props} />,
          li: ({ node, ...props }) => (
            <li style={{ color: '#d0d0d0', marginBottom: '5px' }} {...props}>
              {<span style={{ color: '#78bdad', marginRight:10}}>•</span>}
              {<span>{props.children}</span>}
            </li>
          ),
            }}
          >
          {blog?.content}
        </ReactMarkdown>
    </div>
  );
}
