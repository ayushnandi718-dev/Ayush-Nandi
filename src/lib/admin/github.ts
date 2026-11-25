import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import type { PortfolioContent } from "@/data/content";

export const CONTENT_PATH = "src/data/portfolio.json";
export const BLOG_DIR = "src/content/blogs";

const OWNER = process.env.GITHUB_REPO_OWNER || "ayushnandi718-dev";
const REPO = process.env.GITHUB_REPO_NAME || "Ayush-Nandi";
const BRANCH = process.env.GITHUB_BRANCH || "main";
const TOKEN = process.env.GITHUB_TOKEN;

export function isGitHubConfigured() {
  return Boolean(TOKEN);
}

/** Local review mode: load content but never commit from the admin. */
export function isReadOnly() {
  return process.env.ADMIN_READ_ONLY === "1";
}

function apiUrl(filePath: string) {
  return `https://api.github.com/repos/${OWNER}/${REPO}/contents/${filePath.split("/").map(encodeURIComponent).join("/")}?ref=${encodeURIComponent(BRANCH)}`;
}

function authHeaders() {
  return {
    Authorization: `Bearer ${TOKEN}`,
    Accept: "application/vnd.github+json",
    "X-GitHub-Api-Version": "2022-11-28",
    "Content-Type": "application/json",
  };
}

export type RemoteFile = { content: string; sha: string };

export async function readFile(filePath: string): Promise<RemoteFile | null> {
  const response = await fetch(apiUrl(filePath), { headers: authHeaders(), cache: "no-store" });
  if (response.status === 404) return null;
  if (!response.ok) {
    throw new Error(`GitHub read failed (${response.status}): ${await response.text()}`);
  }

  const data = (await response.json()) as { content: string; sha: string };
  return {
    content: Buffer.from(data.content.replace(/\s/g, ""), "base64").toString("utf8"),
    sha: data.sha,
  };
}

export async function writeFile(filePath: string, content: string, sha: string, message: string) {
  const response = await fetch(apiUrl(filePath), {
    method: "PUT",
    headers: authHeaders(),
    body: JSON.stringify({
      message,
      content: Buffer.from(content, "utf8").toString("base64"),
      ...(sha ? { sha } : {}),
      branch: BRANCH,
    }),
  });
  if (!response.ok) {
    throw new Error(`GitHub commit failed (${response.status}): ${await response.text()}`);
  }
}

export async function deleteFile(filePath: string, sha: string, message: string) {
  const response = await fetch(apiUrl(filePath), {
    method: "DELETE",
    headers: authHeaders(),
    body: JSON.stringify({ message, sha, branch: BRANCH }),
  });
  if (!response.ok) {
    throw new Error(`GitHub delete failed (${response.status}): ${await response.text()}`);
  }
}

export function validateContent(value: unknown): asserts value is PortfolioContent {
  if (!value || typeof value !== "object") throw new Error("Invalid content payload");
  const draft = value as Record<string, unknown>;
  for (const key of [
    "seo",
    "site",
    "hero",
    "featuredProjects",
    "projects",
    "building",
    "metrics",
    "journey",
    "techStack",
    "socials",
    "footer",
    "contact",
  ]) {
    if (!draft[key] || typeof draft[key] !== "object") throw new Error(`Missing section: ${key}`);
  }
  for (const [section, field] of [
    ["featuredProjects", "items"],
    ["projects", "items"],
    ["building", "items"],
    ["metrics", "items"],
    ["techStack", "groups"],
  ]) {
    const parent = draft[section] as Record<string, unknown>;
    if (!Array.isArray(parent[field])) throw new Error(`Missing list: ${section}.${field}`);
  }
  if (!Array.isArray((draft.hero as Record<string, unknown>).ctas)) {
    throw new Error("Missing list: hero.ctas");
  }
  if (!Array.isArray((draft.journey as Record<string, unknown>).paragraphs)) {
    throw new Error("Missing list: journey.paragraphs");
  }
}

export type BlogSummary = {
  slug: string;
  sha: string;
  title: string;
  publishedAt: string;
  summary: string;
};

function summarize(slug: string, sha: string, raw: string): BlogSummary {
  const { data } = matter(raw);
  return {
    slug,
    sha,
    title: String(data.title || slug),
    publishedAt: String(data.publishedAt || ""),
    summary: String(data.summary || ""),
  };
}

export async function listBlogs(): Promise<BlogSummary[]> {
  if (isGitHubConfigured()) {
    const response = await fetch(apiUrl(BLOG_DIR), { headers: authHeaders(), cache: "no-store" });
    if (!response.ok) throw new Error(`GitHub blog list failed (${response.status})`);
    const files = (await response.json()) as { name: string; sha: string }[];
    const mdxFiles = files.filter((file) => file.name.endsWith(".mdx"));
    return Promise.all(
      mdxFiles.map(async (file) => {
        const remote = await readFile(`${BLOG_DIR}/${file.name}`);
        return summarize(file.name.replace(/\.mdx$/, ""), file.sha, remote?.content ?? "");
      })
    );
  }

  const directory = path.join(process.cwd(), BLOG_DIR);
  return fs
    .readdirSync(directory)
    .filter((file) => file.endsWith(".mdx"))
    .map((file) =>
      summarize(
        file.replace(/\.mdx$/, ""),
        "",
        fs.readFileSync(path.join(directory, file), "utf8")
      )
    );
}

export async function getBlog(slug: string): Promise<{ raw: string; sha: string } | null> {
  if (isGitHubConfigured()) {
    const remote = await readFile(`${BLOG_DIR}/${slug}.mdx`);
    return remote ? { raw: remote.content, sha: remote.sha } : null;
  }

  const filePath = path.join(process.cwd(), BLOG_DIR, `${slug}.mdx`);
  if (!fs.existsSync(filePath)) return null;
  return { raw: fs.readFileSync(filePath, "utf8"), sha: "" };
}
