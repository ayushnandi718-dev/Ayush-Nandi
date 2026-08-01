import React from "react";
import Link from "next/link";
import { ArrowUpRight, Clock } from "lucide-react";
import { Cover } from "./cover";

type Post = {
  slug: string;
  metadata: {
    id?: string;
    title: string;
    publishedAt: string;
    summary: string;
    tags?: string[];
  };
  wordCount: number;
};

function readTime(wordCount: number) {
  return Math.max(1, Math.ceil(wordCount / 200));
}

function getRelated(currentSlug: string, all: Post[], count = 3) {
  const current = all.find((p) => p.slug === currentSlug);
  if (!current) return all.filter((p) => p.slug !== currentSlug).slice(0, count);
  const currentTags = new Set(current.metadata.tags || []);

  return all
    .filter((p) => p.slug !== currentSlug)
    .sort((a, b) => {
      const aOverlap = (a.metadata.tags || []).filter((t) => currentTags.has(t)).length;
      const bOverlap = (b.metadata.tags || []).filter((t) => currentTags.has(t)).length;
      if (aOverlap !== bOverlap) return bOverlap - aOverlap;
      return new Date(b.metadata.publishedAt).getTime() - new Date(a.metadata.publishedAt).getTime();
    })
    .slice(0, count);
}

export function RelatedPosts({ slug, posts }: { slug: string; posts: Post[] }) {
  const related = getRelated(slug, posts);
  if (related.length === 0) return null;

  return (
    <div className="mt-20">
      <div className="flex items-center gap-2 mb-6 text-xs font-medium tracking-[0.2em] uppercase text-[hsl(20,100%,70%)]">
        Keep reading
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {related.map((post) => (
          <Link
            key={post.slug}
            href={`/blogs/${post.metadata.id || post.slug}`}
            className="group block border border-border/50 rounded-xl overflow-hidden hover:border-[hsl(20,100%,70%)]/30 transition-all bg-card/20 backdrop-blur-sm"
          >
            <Cover slug={post.slug} compact />
            <div className="p-5">
              <div className="flex items-center gap-2 text-xs text-muted-foreground mb-2 font-sans">
                <Clock className="w-3 h-3" />
                {readTime(post.wordCount)} min read
              </div>
              <h3 className="font-display text-base leading-snug mb-2 group-hover:text-[hsl(20,100%,70%)] transition-colors duration-300 line-clamp-2">
                {post.metadata.title}
              </h3>
              <div className="flex items-center gap-1 text-sm text-muted-foreground group-hover:text-[hsl(20,100%,70%)] transition-colors font-sans">
                Read
                <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
