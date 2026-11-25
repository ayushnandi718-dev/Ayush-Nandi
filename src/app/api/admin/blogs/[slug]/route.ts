import { NextResponse } from "next/server";
import { isAuthenticated } from "@/lib/admin/auth";
import {
  BLOG_DIR,
  deleteFile,
  getBlog,
  isGitHubConfigured,
  isReadOnly,
  writeFile,
} from "@/lib/admin/github";

const validSlug = (slug: string) => /^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(slug);

type Context = { params: Promise<{ slug: string }> };

function unauthorized() {
  return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
}

function serverError(error: unknown) {
  return NextResponse.json(
    { error: error instanceof Error ? error.message : "Unexpected error" },
    { status: 500 }
  );
}

export async function GET(_request: Request, { params }: Context) {
  if (!(await isAuthenticated())) return unauthorized();
  const { slug } = await params;
  if (!validSlug(slug)) return NextResponse.json({ error: "Invalid slug" }, { status: 400 });

  try {
    const blog = await getBlog(slug);
    if (!blog) return NextResponse.json({ error: "Post not found" }, { status: 404 });
    return NextResponse.json(blog);
  } catch (error) {
    return serverError(error);
  }
}

export async function PUT(request: Request, { params }: Context) {
  if (!(await isAuthenticated())) return unauthorized();
  if (isReadOnly()) {
    return NextResponse.json({ error: "Admin is in read-only mode." }, { status: 503 });
  }
  if (!isGitHubConfigured()) {
    return NextResponse.json({ error: "Set GITHUB_TOKEN before saving." }, { status: 503 });
  }

  const { slug } = await params;
  if (!validSlug(slug)) return NextResponse.json({ error: "Invalid slug" }, { status: 400 });

  try {
    const body = (await request.json()) as { raw?: string; sha?: string; message?: string };
    if (typeof body.raw !== "string" || !body.raw.trim()) {
      return NextResponse.json({ error: "Post content is required" }, { status: 400 });
    }

    const filePath = `${BLOG_DIR}/${slug}.mdx`;
    const sha = body.sha || (await getBlog(slug))?.sha;
    await writeFile(
      filePath,
      body.raw,
      sha || "",
      body.message?.trim() || `${sha ? "Update" : "Create"} blog post: ${slug}`
    );
    return NextResponse.json({ ok: true });
  } catch (error) {
    return serverError(error);
  }
}

export async function DELETE(_request: Request, { params }: Context) {
  if (!(await isAuthenticated())) return unauthorized();
  if (isReadOnly()) {
    return NextResponse.json({ error: "Admin is in read-only mode." }, { status: 503 });
  }
  if (!isGitHubConfigured()) {
    return NextResponse.json({ error: "Set GITHUB_TOKEN before deleting." }, { status: 503 });
  }

  const { slug } = await params;
  if (!validSlug(slug)) return NextResponse.json({ error: "Invalid slug" }, { status: 400 });

  try {
    const sha = (await getBlog(slug))?.sha;
    if (!sha) return NextResponse.json({ error: "Post not found" }, { status: 404 });
    await deleteFile(`${BLOG_DIR}/${slug}.mdx`, sha, `Delete blog post: ${slug}`);
    return NextResponse.json({ ok: true });
  } catch (error) {
    return serverError(error);
  }
}
