"use client";

import { useCallback, useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { content as localContent } from "@/data/content";
import { PROJECT_SKILL_KEYS } from "@/data/content";
import type { Cta, PortfolioContent } from "@/data/content";
import type { BlogSummary } from "@/lib/admin/github";

type Tab =
  | "hero"
  | "projects"
  | "building"
  | "journey"
  | "stack"
  | "site"
  | "blogs";

const TABS: { id: Tab; label: string }[] = [
  { id: "hero", label: "Hero & CTAs" },
  { id: "projects", label: "Projects" },
  { id: "building", label: "Building & Metrics" },
  { id: "journey", label: "Journey & Contact" },
  { id: "stack", label: "Stack, Socials & Footer" },
  { id: "site", label: "SEO & Site" },
  { id: "blogs", label: "Blog Posts" },
];

const clone = <T,>(value: T): T => JSON.parse(JSON.stringify(value)) as T;
const asLines = (items: string[]) => items.join("\n");
const fromLines = (value: string) =>
  value.split("\n").map((line) => line.trim()).filter(Boolean);

const inputClass =
  "w-full rounded-lg border border-border bg-background px-3 py-2 text-sm text-foreground outline-none transition-colors placeholder:text-muted-foreground focus:ring-2 focus:ring-ring";

function Field({
  label,
  value,
  onChange,
  multiline = false,
  rows = 3,
  type = "text",
}: {
  label: string;
  value: string | number;
  onChange: (value: string) => void;
  multiline?: boolean;
  rows?: number;
  type?: string;
}) {
  return (
    <label className="block space-y-1.5">
      <span className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
        {label}
      </span>
      {multiline ? (
        <textarea
          className={inputClass}
          rows={rows}
          value={String(value)}
          onChange={(event) => onChange(event.target.value)}
        />
      ) : (
        <input
          className={inputClass}
          type={type}
          value={String(value)}
          onChange={(event) => onChange(event.target.value)}
        />
      )}
    </label>
  );
}

function StringList({
  label,
  value,
  onChange,
  rows = 4,
}: {
  label: string;
  value: string[];
  onChange: (value: string[]) => void;
  rows?: number;
}) {
  return (
    <Field
      label={`${label} (one per line)`}
      value={asLines(value)}
      multiline
      rows={rows}
      onChange={(next) => onChange(fromLines(next))}
    />
  );
}

function Card({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="space-y-4 rounded-xl border border-border bg-secondary/20 p-5">
      <h2 className="font-display text-lg font-bold text-foreground">{title}</h2>
      {children}
    </section>
  );
}

function RemoveButton({ onClick }: { onClick: () => void }) {
  return (
    <Button type="button" variant="ghost" size="sm" onClick={onClick} aria-label="Remove item">
      Remove
    </Button>
  );
}

const newBlogTemplate = (slug: string) => `---
title: "${slug.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase())}"
id: "blog-${Date.now()}"
publishedAt: "${new Date().toISOString().slice(0, 10)}"
summary: "A short summary of the post."
author: "Ayush Nandi"
tags: []
---

# ${slug.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase())}

Start writing here.
`;

export default function AdminPage() {
  const [auth, setAuth] = useState<"loading" | "yes" | "no">("loading");
  const [password, setPassword] = useState("");
  const [draft, setDraft] = useState<PortfolioContent | null>(null);
  const [sha, setSha] = useState<string | null>(null);
  const [source, setSource] = useState<"github" | "local" | null>(null);
  const [tab, setTab] = useState<Tab>("hero");
  const [status, setStatus] = useState("");
  const [saving, setSaving] = useState(false);

  const [blogs, setBlogs] = useState<BlogSummary[]>([]);
  const [blogSlug, setBlogSlug] = useState("");
  const [blogRaw, setBlogRaw] = useState("");
  const [blogSha, setBlogSha] = useState("");
  const [newBlogSlug, setNewBlogSlug] = useState("");

  const update = useCallback((mutate: (next: PortfolioContent) => void) => {
    setDraft((previous) => {
      if (!previous) return previous;
      const next = clone(previous);
      mutate(next);
      return next;
    });
  }, []);

  const loadContent = useCallback(async () => {
    const response = await fetch("/api/admin/content", { cache: "no-store" });
    if (response.status === 401) {
      setAuth("no");
      return;
    }
    if (!response.ok) {
      setStatus("Could not load content. Check the server logs.");
      setAuth("yes");
      return;
    }
    const data = (await response.json()) as {
      content: PortfolioContent;
      sha: string | null;
      source: "github" | "local";
    };
    setDraft(data.content);
    setSha(data.sha);
    setSource(data.source);
    setAuth("yes");
  }, []);

  const loadBlogs = useCallback(async () => {
    const response = await fetch("/api/admin/blogs", { cache: "no-store" });
    if (response.ok) {
      const data = (await response.json()) as { blogs: BlogSummary[] };
      setBlogs(data.blogs);
    }
  }, []);

  useEffect(() => {
    void loadContent();
  }, [loadContent]);

  useEffect(() => {
    if (auth === "yes" && tab === "blogs") void loadBlogs();
  }, [auth, tab, loadBlogs]);

  async function login(event: React.FormEvent) {
    event.preventDefault();
    setStatus("");
    const response = await fetch("/api/admin/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ password }),
    });
    if (!response.ok) {
      setStatus("Incorrect password.");
      return;
    }
    setPassword("");
    await loadContent();
  }

  async function logout() {
    await fetch("/api/admin/logout", { method: "POST" });
    setAuth("no");
    setDraft(null);
  }

  async function save() {
    if (!draft) return;
    setSaving(true);
    setStatus("");
    try {
      const response = await fetch("/api/admin/content", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ content: draft, sha, message: `Update portfolio: ${tab}` }),
      });
      const data = (await response.json()) as { error?: string };
      if (!response.ok) throw new Error(data.error || "Could not save");
      setStatus("Saved to GitHub. Vercel will redeploy the site shortly.");
      await loadContent();
    } catch (error) {
      setStatus(error instanceof Error ? error.message : "Could not save");
    } finally {
      setSaving(false);
    }
  }

  async function openBlog(slug: string) {
    setStatus("");
    const response = await fetch(`/api/admin/blogs/${slug}`, { cache: "no-store" });
    if (!response.ok) {
      setStatus("Could not open that post.");
      return;
    }
    const data = (await response.json()) as { raw: string; sha: string };
    setBlogSlug(slug);
    setBlogRaw(data.raw);
    setBlogSha(data.sha);
  }

  async function saveBlog() {
    if (!blogSlug) return;
    setSaving(true);
    setStatus("");
    try {
      const response = await fetch(`/api/admin/blogs/${blogSlug}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ raw: blogRaw, sha: blogSha }),
      });
      const data = (await response.json()) as { error?: string };
      if (!response.ok) throw new Error(data.error || "Could not save post");
      setStatus("Blog post committed to GitHub.");
      await loadBlogs();
      await openBlog(blogSlug);
    } catch (error) {
      setStatus(error instanceof Error ? error.message : "Could not save post");
    } finally {
      setSaving(false);
    }
  }

  async function deleteBlog(slug: string) {
    if (!window.confirm(`Delete ${slug}?`)) return;
    const response = await fetch(`/api/admin/blogs/${slug}`, { method: "DELETE" });
    if (!response.ok) {
      const data = (await response.json()) as { error?: string };
      setStatus(data.error || "Could not delete post");
      return;
    }
    setStatus("Blog post deleted from GitHub.");
    if (blogSlug === slug) {
      setBlogSlug("");
      setBlogRaw("");
      setBlogSha("");
    }
    await loadBlogs();
  }

  async function createBlog() {
    const slug = newBlogSlug.trim().toLowerCase().replace(/[^a-z0-9-]+/g, "-").replace(/^-|-$/g, "");
    if (!slug) {
      setStatus("Enter a valid slug first.");
      return;
    }
    setBlogSlug(slug);
    setBlogRaw(newBlogTemplate(slug));
    setBlogSha("");
    setNewBlogSlug("");
    setStatus(`Drafting ${slug}. Hit Save post to create it on GitHub.`);
  }

  if (auth === "loading") {
    return <main className="mx-auto max-w-3xl px-4 py-20 text-center text-muted-foreground">Loading admin…</main>;
  }

  if (auth === "no" || !draft) {
    return (
      <main className="mx-auto flex min-h-screen max-w-md flex-col justify-center px-4">
        <form
          onSubmit={login}
          className="space-y-5 rounded-2xl border border-border bg-secondary/20 p-7"
        >
          <div>
            <h1 className="font-display text-2xl font-bold text-foreground">Portfolio Admin</h1>
            <p className="mt-1 text-sm text-muted-foreground">Enter your admin password to continue.</p>
          </div>
          <Field
            label="Password"
            type="password"
            value={password}
            onChange={setPassword}
          />
          <Button type="submit" className="w-full">Sign in</Button>
          {status && <p className="text-sm text-red-500">{status}</p>}
        </form>
      </main>
    );
  }

  return (
    <main className="mx-auto max-w-6xl px-4 py-10">
      <header className="flex flex-wrap items-end justify-between gap-4 border-b border-border pb-6">
        <div>
          <h1 className="font-display text-3xl font-bold text-foreground">Portfolio Admin</h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Editing {source === "github" ? "the committed site content" : "the bundled defaults"} · changes commit to GitHub and redeploy automatically.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button onClick={save} disabled={saving || tab === "blogs"}>
            {saving ? "Saving…" : "Save changes"}
          </Button>
          <Button variant="outline" onClick={logout}>Sign out</Button>
        </div>
      </header>

      {status && <p className="mt-5 rounded-lg border border-border bg-secondary/30 px-4 py-3 text-sm text-foreground">{status}</p>}

      <nav className="mt-6 flex flex-wrap gap-2">
        {TABS.map((item) => (
          <Button
            key={item.id}
            variant={tab === item.id ? "default" : "outline"}
            size="sm"
            onClick={() => { setTab(item.id); setStatus(""); }}
          >
            {item.label}
          </Button>
        ))}
      </nav>

      <div className="mt-8 space-y-6 pb-20">
        {tab === "hero" && (
          <>
            <Card title="Hero copy">
              <div className="grid gap-4 sm:grid-cols-2">
                <Field label="Greeting" value={draft.hero.greeting} onChange={(v) => update((d) => { d.hero.greeting = v; })} />
                <Field label="Name" value={draft.hero.name} onChange={(v) => update((d) => { d.hero.name = v; })} />
                <Field label="Role" value={draft.hero.role} onChange={(v) => update((d) => { d.hero.role = v; })} />
                <Field label="Tagline" value={draft.hero.tagline} onChange={(v) => update((d) => { d.hero.tagline = v; })} />
                <Field label="Stack line" value={draft.hero.stackLine} onChange={(v) => update((d) => { d.hero.stackLine = v; })} />
                <Field label="AUX Studio URL" value={draft.hero.auxStudioUrl} onChange={(v) => update((d) => { d.hero.auxStudioUrl = v; })} />
                <StringList label="Affiliations" rows={2} value={draft.hero.affiliations} onChange={(v) => update((d) => { d.hero.affiliations = v; })} />
              </div>
              <StringList label="Description lines" value={draft.hero.description} onChange={(v) => update((d) => { d.hero.description = v; })} />
            </Card>
            <Card title="CTA buttons">
              {draft.hero.ctas.map((cta: Cta, index) => (
                <div key={index} className="grid gap-3 rounded-lg border border-border p-4 sm:grid-cols-[1fr_2fr_1fr_auto]">
                  <Field label="Label" value={cta.label} onChange={(v) => update((d) => { d.hero.ctas[index].label = v; })} />
                  <Field label="Link" value={cta.href} onChange={(v) => update((d) => { d.hero.ctas[index].href = v; })} />
                  <label className="block space-y-1.5">
                    <span className="text-xs font-medium uppercase tracking-wider text-muted-foreground">Style</span>
                    <select
                      className={inputClass}
                      value={cta.variant}
                      onChange={(event) => update((d) => { d.hero.ctas[index].variant = event.target.value as Cta["variant"]; })}
                    >
                      {["primary", "outline", "github", "linkedin"].map((variant) => (
                        <option key={variant} value={variant}>{variant}</option>
                      ))}
                    </select>
                  </label>
                  <div className="flex items-end justify-end">
                    <RemoveButton onClick={() => update((d) => { d.hero.ctas.splice(index, 1); })} />
                  </div>
                </div>
              ))}
              <Button
                variant="outline"
                size="sm"
                onClick={() => update((d) => { d.hero.ctas.push({ label: "New link", href: "#contact", variant: "outline" }); })}
              >
                Add CTA
              </Button>
            </Card>
          </>
        )}

        {tab === "projects" && (
          <>
            <Card title="Projects section">
              <Field label="Section title" value={draft.projects.title} onChange={(v) => update((d) => { d.projects.title = v; })} />
              <Field
                label="See More link (GitHub repositories)"
                value={draft.site.githubReposUrl}
                onChange={(v) => update((d) => { d.site.githubReposUrl = v; })}
              />
              <p className="text-xs text-muted-foreground">
                This card opens when a project tile is clicked. Screenshot paths are relative to <code>/public</code>.
              </p>
            </Card>
            {draft.projects.items.map((project, index) => (
              <Card key={index} title={project.title || `Project ${index + 1}`}>
                <div className="grid gap-4 sm:grid-cols-2">
                  <Field label="ID (wallpaper key)" value={project.id} onChange={(v) => update((d) => { d.projects.items[index].id = v; })} />
                  <Field label="Category" value={project.category} onChange={(v) => update((d) => { d.projects.items[index].category = v; })} />
                  <Field label="Title" value={project.title} onChange={(v) => update((d) => { d.projects.items[index].title = v; })} />
                  <Field label="Live URL" value={project.live} onChange={(v) => update((d) => { d.projects.items[index].live = v; })} />
                  <Field label="GitHub URL" value={project.github || ""} onChange={(v) => update((d) => { d.projects.items[index].github = v; })} />
                  <Field label="Screenshot path" value={project.src} onChange={(v) => update((d) => { d.projects.items[index].src = v; })} />
                </div>
                <StringList label="Screenshots" rows={2} value={project.screenshots} onChange={(v) => update((d) => { d.projects.items[index].screenshots = v; })} />
                <div className="grid gap-4 sm:grid-cols-2">
                  <StringList label="Frontend skills" rows={3} value={project.skills.frontend} onChange={(v) => update((d) => { d.projects.items[index].skills.frontend = v as PortfolioContent["projects"]["items"][number]["skills"]["frontend"]; })} />
                  <StringList label="Backend skills" rows={3} value={project.skills.backend} onChange={(v) => update((d) => { d.projects.items[index].skills.backend = v as PortfolioContent["projects"]["items"][number]["skills"]["backend"]; })} />
                </div>
                <p className="text-xs text-muted-foreground">
                  Skill keys: {PROJECT_SKILL_KEYS.join(", ")}
                </p>
                <Field label="Tagline" multiline value={project.tagline} onChange={(v) => update((d) => { d.projects.items[index].tagline = v; })} />
                <Field label="Description" multiline rows={4} value={project.description} onChange={(v) => update((d) => { d.projects.items[index].description = v; })} />
                <div className="grid gap-4 sm:grid-cols-2">
                  <Field label="Features heading" value={project.featuresHeading} onChange={(v) => update((d) => { d.projects.items[index].featuresHeading = v; })} />
                  <Field label="Features detail" multiline value={project.features} onChange={(v) => update((d) => { d.projects.items[index].features = v; })} />
                </div>
                <RemoveButton onClick={() => update((d) => { d.projects.items.splice(index, 1); })} />
              </Card>
            ))}
            <Button
              variant="outline"
              size="sm"
              onClick={() => update((d) => {
                const id = `project-${Date.now()}`;
                d.projects.items.push({
                  id,
                  category: "Web App",
                  title: "New project",
                  src: `/assets/projects-screenshots/${id}/landing.png`,
                  screenshots: ["landing.png"],
                  skills: { frontend: [], backend: [] },
                  tagline: "A short line shown at the top of the dialog.",
                  description: "What this project is and who it helps.",
                  featuresHeading: "Key Features",
                  features: "Describe the important details.",
                  live: "#",
                  github: d.site.githubReposUrl,
                });
              })}
            >
              Add project
            </Button>
          </>
        )}

        {tab === "building" && (
          <>
            <Card title="Currently building">
              <div className="grid gap-4 sm:grid-cols-2">
                <Field label="Section title" value={draft.building.title} onChange={(v) => update((d) => { d.building.title = v; })} />
                <Field label="Description" value={draft.building.description} onChange={(v) => update((d) => { d.building.description = v; })} />
                <Field label="View More link (GitHub repositories)" value={draft.site.githubReposUrl} onChange={(v) => update((d) => { d.site.githubReposUrl = v; })} />
              </div>
            </Card>
            <Card title="Building project cards">
              {draft.featuredProjects.items.map((project, index) => (
                <div key={index} className="space-y-4 rounded-lg border border-border p-4">
                  <div className="grid gap-4 sm:grid-cols-2">
                    <Field label="ID" value={project.id} onChange={(v) => update((d) => { d.featuredProjects.items[index].id = v; })} />
                    <Field label="Icon (emoji)" value={project.icon} onChange={(v) => update((d) => { d.featuredProjects.items[index].icon = v; })} />
                    <Field label="Title" value={project.title} onChange={(v) => update((d) => { d.featuredProjects.items[index].title = v; })} />
                    <Field label="GitHub URL" value={project.href} onChange={(v) => update((d) => { d.featuredProjects.items[index].href = v; })} />
                  </div>
                  <Field label="Summary" multiline value={project.summary} onChange={(v) => update((d) => { d.featuredProjects.items[index].summary = v; })} />
                  <StringList label="Tech tags" value={project.tech} rows={2} onChange={(v) => update((d) => { d.featuredProjects.items[index].tech = v; })} />
                  <div className="grid gap-4 sm:grid-cols-3">
                    <Field label="Problem" multiline value={project.caseStudy.problem} onChange={(v) => update((d) => { d.featuredProjects.items[index].caseStudy.problem = v; })} />
                    <Field label="Solution" multiline value={project.caseStudy.solution} onChange={(v) => update((d) => { d.featuredProjects.items[index].caseStudy.solution = v; })} />
                    <Field label="Result" multiline value={project.caseStudy.result} onChange={(v) => update((d) => { d.featuredProjects.items[index].caseStudy.result = v; })} />
                  </div>
                  <RemoveButton onClick={() => update((d) => { d.featuredProjects.items.splice(index, 1); })} />
                </div>
              ))}
              <Button
                variant="outline"
                size="sm"
                onClick={() => update((d) => {
                  d.featuredProjects.items.push({
                    id: `build-${Date.now()}`,
                    icon: "✨",
                    title: "New build",
                    summary: "What this project does.",
                    tech: ["Next.js"],
                    caseStudy: { problem: "What needed fixing?", solution: "What I built.", result: "What changed." },
                    href: d.site.githubReposUrl,
                  });
                })}
              >
                Add build
              </Button>
            </Card>
            <Card title="Builder metrics">
              <div className="grid gap-4 sm:grid-cols-2">
                <Field label="Title" value={draft.metrics.title} onChange={(v) => update((d) => { d.metrics.title = v; })} />
                <Field label="Description" value={draft.metrics.description} onChange={(v) => update((d) => { d.metrics.description = v; })} />
              </div>
              {draft.metrics.items.map((metric, index) => (
                <div key={index} className="grid gap-3 rounded-lg border border-border p-4 sm:grid-cols-[1fr_2fr_auto]">
                  <Field label="Value" value={metric.value} onChange={(v) => update((d) => { d.metrics.items[index].value = v; })} />
                  <Field label="Label" value={metric.label} onChange={(v) => update((d) => { d.metrics.items[index].label = v; })} />
                  <div className="flex items-end justify-end"><RemoveButton onClick={() => update((d) => { d.metrics.items.splice(index, 1); })} /></div>
                </div>
              ))}
              <Button variant="outline" size="sm" onClick={() => update((d) => { d.metrics.items.push({ value: "New", label: "Metric" }); })}>Add metric</Button>
            </Card>
          </>
        )}

        {tab === "journey" && (
          <>
            <Card title="My journey">
              <div className="grid gap-4 sm:grid-cols-2">
                <Field label="Heading" value={draft.journey.heading} onChange={(v) => update((d) => { d.journey.heading = v; })} />
                <Field label="Description" value={draft.journey.description} onChange={(v) => update((d) => { d.journey.description = v; })} />
                <Field label="Location" value={draft.journey.location} onChange={(v) => update((d) => { d.journey.location = v; })} />
                <Field label="Profile title" value={draft.journey.profileTitle} onChange={(v) => update((d) => { d.journey.profileTitle = v; })} />
                <Field label="Handle" value={draft.journey.handle} onChange={(v) => update((d) => { d.journey.handle = v; })} />
                <Field label="Status" value={draft.journey.status} onChange={(v) => update((d) => { d.journey.status = v; })} />
              </div>
              <StringList label="Paragraphs" rows={6} value={draft.journey.paragraphs} onChange={(v) => update((d) => { d.journey.paragraphs = v; })} />
            </Card>
            <Card title="Contact section">
              <div className="grid gap-4 sm:grid-cols-2">
                <Field label="Heading" value={draft.contact.heading} onChange={(v) => update((d) => { d.contact.heading = v; })} />
                <Field label="Card title" value={draft.contact.title} onChange={(v) => update((d) => { d.contact.title = v; })} />
                <Field label="Intro" multiline value={draft.contact.intro} onChange={(v) => update((d) => { d.contact.intro = v; })} />
                <Field label="WhatsApp URL" value={draft.contact.whatsapp} onChange={(v) => update((d) => { d.contact.whatsapp = v; })} />
                <Field label="WhatsApp label" value={draft.contact.whatsappLabel} onChange={(v) => update((d) => { d.contact.whatsappLabel = v; })} />
                <Field label="Email" value={draft.contact.email} onChange={(v) => update((d) => { d.contact.email = v; })} />
                <Field label="Location" value={draft.contact.location} onChange={(v) => update((d) => { d.contact.location = v; })} />
                <Field label="Linktree URL" value={draft.contact.linktree} onChange={(v) => update((d) => { d.contact.linktree = v; })} />
              </div>
            </Card>
          </>
        )}

        {tab === "stack" && (
          <>
            <Card title="Tech stack">
              <div className="grid gap-4 sm:grid-cols-2">
                <Field label="Title" value={draft.techStack.title} onChange={(v) => update((d) => { d.techStack.title = v; })} />
                <Field label="Description" value={draft.techStack.description} onChange={(v) => update((d) => { d.techStack.description = v; })} />
              </div>
              {draft.techStack.groups.map((group, index) => (
                <div key={index} className="grid gap-3 rounded-lg border border-border p-4 sm:grid-cols-[1fr_2fr_auto]">
                  <Field label="Group" value={group.title} onChange={(v) => update((d) => { d.techStack.groups[index].title = v; })} />
                  <StringList label="Items" value={group.items} rows={2} onChange={(v) => update((d) => { d.techStack.groups[index].items = v; })} />
                  <div className="flex items-end justify-end"><RemoveButton onClick={() => update((d) => { d.techStack.groups.splice(index, 1); })} /></div>
                </div>
              ))}
              <Button variant="outline" size="sm" onClick={() => update((d) => { d.techStack.groups.push({ title: "New group", items: [] }); })}>Add group</Button>
            </Card>
            <Card title="Social links">
              <div className="grid gap-4 sm:grid-cols-2">
                {Object.keys(draft.socials).map((key) => (
                  <Field
                    key={key}
                    label={key}
                    value={draft.socials[key]}
                    onChange={(v) => update((d) => { d.socials[key] = v; })}
                  />
                ))}
              </div>
            </Card>
            <Card title="Footer">
              <div className="grid gap-4 sm:grid-cols-2">
                <Field label="Name" value={draft.footer.name} onChange={(v) => update((d) => { d.footer.name = v; })} />
                <Field label="Role" value={draft.footer.role} onChange={(v) => update((d) => { d.footer.role = v; })} />
                <Field label="Stack line" value={draft.footer.stackLine} onChange={(v) => update((d) => { d.footer.stackLine = v; })} />
                <Field label="Location" value={draft.footer.location} onChange={(v) => update((d) => { d.footer.location = v; })} />
              </div>
              <StringList label="Footer lines" value={draft.footer.lines} rows={2} onChange={(v) => update((d) => { d.footer.lines = v; })} />
            </Card>
          </>
        )}

        {tab === "site" && (
          <>
            <Card title="SEO">
              <div className="grid gap-4 sm:grid-cols-2">
                <Field label="Page title" value={draft.seo.title} onChange={(v) => update((d) => { d.seo.title = v; })} />
                <Field label="Job title (schema)" value={draft.seo.jobTitle} onChange={(v) => update((d) => { d.seo.jobTitle = v; })} />
                <Field label="Twitter handle" value={draft.seo.twitterHandle} onChange={(v) => update((d) => { d.seo.twitterHandle = v; })} />
              </div>
              <Field label="Long description" multiline value={draft.seo.descriptionLong} onChange={(v) => update((d) => { d.seo.descriptionLong = v; })} />
              <Field label="Short description" multiline value={draft.seo.descriptionShort} onChange={(v) => update((d) => { d.seo.descriptionShort = v; })} />
              <StringList label="Keywords" rows={5} value={draft.seo.keywords} onChange={(v) => update((d) => { d.seo.keywords = v; })} />
            </Card>
            <Card title="Site identity">
              <div className="grid gap-4 sm:grid-cols-2">
                <Field label="Author" value={draft.site.author} onChange={(v) => update((d) => { d.site.author = v; })} />
                <Field label="Email" value={draft.site.email} onChange={(v) => update((d) => { d.site.email = v; })} />
                <Field label="Site URL" value={draft.site.url} onChange={(v) => update((d) => { d.site.url = v; })} />
                <Field label="GitHub username" value={draft.site.githubUsername} onChange={(v) => update((d) => { d.site.githubUsername = v; })} />
                <Field label="GitHub repo" value={draft.site.githubRepo} onChange={(v) => update((d) => { d.site.githubRepo = v; })} />
                <Field label="GitHub repos URL" value={draft.site.githubReposUrl} onChange={(v) => update((d) => { d.site.githubReposUrl = v; })} />
                <Field label="Copyright year" type="number" value={draft.site.copyrightYear} onChange={(v) => update((d) => { d.site.copyrightYear = Number(v); })} />
              </div>
            </Card>
          </>
        )}

        {tab === "blogs" && (
          <>
            <Card title="Existing posts">
              {blogs.length === 0 && <p className="text-sm text-muted-foreground">No posts found.</p>}
              <div className="flex flex-wrap gap-2">
                {blogs.map((blog) => (
                  <div key={blog.slug} className="flex items-center gap-1 rounded-full border border-border px-3 py-1.5 text-sm">
                    <button type="button" onClick={() => openBlog(blog.slug)} className="text-foreground hover:underline">
                      {blog.slug}
                    </button>
                    <button type="button" onClick={() => deleteBlog(blog.slug)} className="text-xs text-red-500 hover:underline" aria-label={`Delete ${blog.slug}`}>
                      ✕
                    </button>
                  </div>
                ))}
              </div>
            </Card>
            <Card title="New post">
              <div className="flex flex-wrap items-end gap-3">
                <div className="min-w-56 flex-1">
                  <Field label="Slug" value={newBlogSlug} onChange={setNewBlogSlug} />
                </div>
                <Button variant="outline" onClick={createBlog}>Start draft</Button>
              </div>
            </Card>
            <Card title="Editor">
              <Field label="MDX (frontmatter + content)" multiline rows={22} value={blogRaw} onChange={setBlogRaw} />
              <div className="flex flex-wrap items-center gap-3">
                <Button onClick={saveBlog} disabled={saving || !blogSlug}>
                  {saving ? "Saving…" : "Save post"}
                </Button>
                {blogSlug && <span className="text-sm text-muted-foreground">Editing: {blogSlug}</span>}
              </div>
            </Card>
          </>
        )}
      </div>
    </main>
  );
}
