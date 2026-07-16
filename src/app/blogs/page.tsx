import type { Metadata } from "next";
import React from "react";
import { getBlogPosts } from "@/lib/mdx";
import BlogListClient from "./blog-list-client";

export const metadata: Metadata = {
  title: "Blog",
  description: "Thoughts, tutorials, and updates on web development, React, Next.js, and creative coding by Ayush Nandi.",
  openGraph: {
    title: "Blog | Ayush Nandi",
    description: "Thoughts, tutorials, and updates on web development, React, Next.js, and creative coding.",
    type: "website",
  },
};

export default function BlogPage() {
  const posts = getBlogPosts()
    .sort((a, b) => {
      if (new Date(a.metadata.publishedAt) > new Date(b.metadata.publishedAt)) {
        return -1;
      }
      return 1;
    })
    .map((post) => ({
      slug: post.slug,
      metadata: post.metadata,
      wordCount: post.content.trim().split(/\s+/).length,
    }));

  return <BlogListClient posts={posts} />;
}
