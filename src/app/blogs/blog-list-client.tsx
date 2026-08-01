"use client";

import React, { useMemo, useState } from "react";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { CalendarDays, ArrowUpRight, Clock, NotebookPen, Search } from "lucide-react";
import { motion } from "motion/react";
import { Cover } from "@/components/blog/cover";
import { cn } from "@/lib/utils";

type Post = {
  slug: string;
  metadata: {
    id?: string;
    title: string;
    publishedAt: string;
    summary: string;
    image?: string;
    author?: string;
    tags?: string[];
  };
  wordCount: number;
};

function readTime(wordCount: number) {
  return Math.max(1, Math.ceil(wordCount / 200));
}

function formatDate(dateStr: string) {
  const date = new Date(dateStr);
  return date.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

export default function BlogListClient({ posts }: { posts: Post[] }) {
  const [query, setQuery] = useState("");
  const [activeTag, setActiveTag] = useState<string | null>(null);

  const allTags = useMemo(() => {
    const tagCount = new Map<string, number>();
    posts.forEach((p) => p.metadata.tags?.forEach((t) => tagCount.set(t, (tagCount.get(t) || 0) + 1)));
    return Array.from(tagCount.entries()).sort((a, b) => b[1] - a[1]);
  }, [posts]);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return posts.filter((post) => {
      if (activeTag && !post.metadata.tags?.includes(activeTag)) return false;
      if (!q) return true;
      const haystack = `${post.metadata.title} ${post.metadata.summary} ${(post.metadata.tags || []).join(" ")}`.toLowerCase();
      return haystack.includes(q);
    });
  }, [posts, query, activeTag]);

  const featured = filtered[0];
  const rest = filtered.slice(1);

  return (
    <div className="min-h-screen font-sans">
      {/* Decorative background */}
      <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
        <div className="absolute top-0 right-0 w-[600px] h-[600px] rounded-full bg-[hsl(20,100%,70%)]/5 blur-[120px]" />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] rounded-full bg-[hsl(20,100%,70%)]/3 blur-[100px]" />
      </div>

      <div className="container mx-auto px-4 pt-32 pb-24 max-w-6xl">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="mb-16"
        >
          <div className="flex items-center gap-3 mb-6">
            <div className="h-px flex-1 max-w-[60px] bg-[hsl(20,100%,70%)]" />
            <NotebookPen className="w-5 h-5 text-[hsl(20,100%,70%)]" />
            <span className="text-[hsl(20,100%,70%)] text-sm font-medium tracking-[0.2em] uppercase font-sans">
              Blog
            </span>
          </div>
          <h1 className="font-display text-3xl md:text-5xl leading-[0.95] tracking-tight">
            Thoughts &<br />
            <span className="text-[hsl(20,100%,70%)]">Dispatches</span>
          </h1>
          <p className="mt-6 text-muted-foreground text-lg max-w-lg leading-relaxed font-sans">
            Notes on building things, breaking things, and occasionally writing about it.
          </p>
        </motion.div>

        {/* Search + filters */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
          className="mb-12 flex flex-col gap-5"
        >
          <div className="relative max-w-md">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground/60 pointer-events-none" />
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search posts…"
              className="w-full pl-11 pr-4 py-3 rounded-full bg-muted/30 border border-border/50 focus:outline-none focus:border-[hsl(20,100%,70%)]/50 text-sm font-sans placeholder:text-muted-foreground/50 transition-colors"
            />
          </div>

          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => setActiveTag(null)}
              className={cn(
                "px-4 py-1.5 rounded-full border text-xs font-medium transition-all",
                activeTag === null
                  ? "border-[hsl(20,100%,70%)] text-[hsl(20,100%,70%)] bg-[hsl(20,100%,70%)]/10"
                  : "border-border/50 text-muted-foreground hover:text-[hsl(20,100%,70%)] hover:border-[hsl(20,100%,70%)]/40"
              )}
            >
              All
            </button>
            {allTags.map(([tag, count]) => (
              <button
                key={tag}
                onClick={() => setActiveTag(activeTag === tag ? null : tag)}
                className={cn(
                  "px-4 py-1.5 rounded-full border text-xs font-medium transition-all",
                  activeTag === tag
                    ? "border-[hsl(20,100%,70%)] text-[hsl(20,100%,70%)] bg-[hsl(20,100%,70%)]/10"
                    : "border-border/50 text-muted-foreground hover:text-[hsl(20,100%,70%)] hover:border-[hsl(20,100%,70%)]/40"
                )}
              >
                {tag} · {count}
              </button>
            ))}
          </div>
        </motion.div>

        {/* Featured post */}
        {featured && (
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
            className="mb-16"
          >
            <Link href={`/blogs/${featured.metadata.id || featured.slug}`} className="group block">
              <div className="relative border border-border/50 rounded-2xl overflow-hidden transition-colors hover:border-[hsl(20,100%,70%)]/30 bg-card/30 backdrop-blur-sm">
                <Cover slug={featured.slug} compact />

                <div className="p-8 md:p-12 pt-7 md:pt-9 relative">
                  {/* Corner accent */}
                  <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-[hsl(20,100%,70%)]/10 to-transparent rounded-bl-full pointer-events-none" />

                  <div className="relative">
                    <div className="flex items-center gap-4 mb-6 text-sm text-muted-foreground font-sans">
                      <span className="text-[hsl(20,100%,70%)] font-medium tracking-[0.15em] uppercase text-xs">
                        Featured
                      </span>
                      <span className="h-1 w-1 rounded-full bg-muted-foreground/50" />
                      <span className="flex items-center gap-1.5">
                        <CalendarDays className="w-3.5 h-3.5" />
                        {formatDate(featured.metadata.publishedAt)}
                      </span>
                      <span className="flex items-center gap-1.5">
                        <Clock className="w-3.5 h-3.5" />
                        {readTime(featured.wordCount)} min read
                      </span>
                    </div>

                    <h2 className="font-display text-2xl md:text-3xl leading-[1.15] mb-4 group-hover:text-[hsl(20,100%,70%)] transition-colors duration-300">
                      {featured.metadata.title}
                    </h2>

                    <p className="text-muted-foreground text-lg leading-relaxed max-w-2xl mb-8 font-sans">
                      {featured.metadata.summary}
                    </p>

                    <div className="flex items-center justify-between">
                      <div className="flex gap-2 flex-wrap">
                        {featured.metadata.tags?.map((tag) => (
                          <Badge
                            key={tag}
                            variant="outline"
                            className="border-[hsl(20,100%,70%)]/20 text-[hsl(20,100%,70%)] bg-[hsl(20,100%,70%)]/5 rounded-full px-3"
                          >
                            {tag}
                          </Badge>
                        ))}
                      </div>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground group-hover:text-[hsl(20,100%,70%)] transition-colors font-sans">
                        Read article
                        <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          </motion.div>
        )}

        {/* Divider */}
        {rest.length > 0 && (
          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 0.8, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="h-px bg-gradient-to-r from-transparent via-border to-transparent mb-16 origin-left"
          />
        )}

        {/* Post grid */}
        {rest.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {rest.map((post, index) => (
              <motion.div
                key={post.slug}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.6,
                  delay: 0.35 + index * 0.1,
                  ease: [0.22, 1, 0.36, 1],
                }}
              >
                <Link href={`/blogs/${post.metadata.id || post.slug}`} className="group block h-full">
                  <div className="h-full border border-border/50 rounded-xl overflow-hidden transition-all duration-300 hover:border-[hsl(20,100%,70%)]/30 hover:bg-card/40 bg-card/20 backdrop-blur-sm flex flex-col">
                    <Cover slug={post.slug} compact className="rounded-none border-0" />
                    <div className="p-6 md:p-8 flex flex-col flex-1">
                      <div className="flex items-center gap-3 mb-4 text-xs text-muted-foreground font-sans">
                        <span className="flex items-center gap-1.5">
                          <CalendarDays className="w-3 h-3" />
                          {formatDate(post.metadata.publishedAt)}
                        </span>
                        <span className="h-1 w-1 rounded-full bg-muted-foreground/50" />
                        <span className="flex items-center gap-1.5">
                          <Clock className="w-3 h-3" />
                          {readTime(post.wordCount)} min
                        </span>
                      </div>

                      <h3 className="font-display text-lg md:text-xl leading-tight mb-3 group-hover:text-[hsl(20,100%,70%)] transition-colors duration-300">
                        {post.metadata.title}
                      </h3>

                      <p className="text-muted-foreground text-sm leading-relaxed mb-6 line-clamp-2 font-sans">
                        {post.metadata.summary}
                      </p>

                      <div className="flex items-center justify-between mt-auto">
                        <div className="flex gap-1.5 flex-wrap">
                          {post.metadata.tags?.slice(0, 2).map((tag) => (
                            <Badge
                              key={tag}
                              variant="outline"
                              className="border-border/50 text-muted-foreground text-[10px] rounded-full px-2 py-0"
                            >
                              {tag}
                            </Badge>
                          ))}
                        </div>
                        <ArrowUpRight className="w-4 h-4 text-muted-foreground group-hover:text-[hsl(20,100%,70%)] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
                      </div>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        )}

        {/* Empty state */}
        {filtered.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="text-center py-24"
          >
            <p className="text-muted-foreground text-lg font-sans">
              No posts match your search. Try another keyword or tag.
            </p>
          </motion.div>
        )}
      </div>
    </div>
  );
}
