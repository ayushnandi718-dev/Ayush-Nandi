import type { ReactNode } from "react";

export function slugify(text: string) {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

export function stripMarkdown(raw: string) {
  return raw
    .replace(/`([^`]+)`/g, "$1")
    .replace(/\[([^\]]+)\]\([^)]+\)/g, "$1")
    .replace(/\*\*([^*]+)\*\*/g, "$1")
    .replace(/(?<!\*)\*([^*]+)\*(?!\*)/g, "$1")
    .replace(/^#+\s*/, "")
    .trim();
}

export function childrenToText(node: ReactNode): string {
  if (typeof node === "string" || typeof node === "number") {
    return String(node);
  }
  if (Array.isArray(node)) {
    return node.map(childrenToText).join("");
  }
  if (node && typeof node === "object" && "props" in node) {
    return childrenToText((node as { props: { children?: ReactNode } }).props.children);
  }
  return "";
}

export type TocItem = {
  id: string;
  text: string;
  level: number;
};

export function getToc(content: string): TocItem[] {
  const toc: TocItem[] = [];
  const lines = content.split("\n");
  for (const line of lines) {
    const match = line.match(/^(#{2,3})\s+(.+)$/);
    if (!match) continue;
    const level = match[1].length;
    const text = stripMarkdown(match[2]);
    if (!text) continue;
    toc.push({ id: slugify(text), text, level });
  }
  return toc;
}

export function estimateReadTime(content: string) {
  const words = content.trim().split(/\s+/).length;
  return Math.max(1, Math.ceil(words / 200));
}
