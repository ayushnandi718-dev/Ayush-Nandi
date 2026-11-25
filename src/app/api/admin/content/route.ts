import fs from "node:fs/promises";
import path from "node:path";
import { NextResponse } from "next/server";
import { isAuthenticated } from "@/lib/admin/auth";
import { content as localContent, mergeContentWithDefaults } from "@/data/content";
import {
  CONTENT_PATH,
  isGitHubConfigured,
  isReadOnly,
  readFile,
  validateContent,
  writeFile,
} from "@/lib/admin/github";

function unauthorized() {
  return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
}

function serverError(error: unknown) {
  return NextResponse.json(
    { error: error instanceof Error ? error.message : "Unexpected error" },
    { status: 500 }
  );
}

export async function GET() {
  if (!(await isAuthenticated())) return unauthorized();

  if (!isGitHubConfigured()) {
    return NextResponse.json({ content: localContent, sha: null, source: "local" });
  }

  try {
    const file = await readFile(CONTENT_PATH);

    // Local development should mirror the homepage being previewed, even when
    // the repository still holds an older committed copy of portfolio.json.
    if (process.env.NODE_ENV !== "production") {
      return NextResponse.json({
        content: localContent,
        sha: file?.sha ?? null,
        source: "local",
      });
    }

    if (!file) {
      return NextResponse.json(
        { error: `Missing ${CONTENT_PATH} in the repository` },
        { status: 404 }
      );
    }
    return NextResponse.json({
      content: mergeContentWithDefaults(JSON.parse(file.content)),
      sha: file.sha,
      source: "github",
    });
  } catch (error) {
    return serverError(error);
  }
}

export async function POST(request: Request) {
  if (!(await isAuthenticated())) return unauthorized();
  if (isReadOnly()) {
    return NextResponse.json(
      { error: "Admin is in read-only mode. Remove ADMIN_READ_ONLY to enable saving." },
      { status: 503 }
    );
  }
  if (!isGitHubConfigured()) {
    return NextResponse.json(
      { error: "Set GITHUB_TOKEN (and repo env vars) on Vercel before saving." },
      { status: 503 }
    );
  }

  try {
    const body = (await request.json()) as {
      content?: unknown;
      sha?: string;
      message?: string;
    };
    validateContent(body.content);

    // The JSON may not exist in the repo yet (e.g. before the first push).
    // An empty sha makes the GitHub API create the file instead of updating it.
    const sha = body.sha || (await readFile(CONTENT_PATH))?.sha || "";

    const serialized = `${JSON.stringify(body.content, null, 2)}\n`;
    await writeFile(
      CONTENT_PATH,
      serialized,
      sha,
      body.message?.trim() || `${sha ? "Update" : "Create"} portfolio content from admin`
    );

    // In local dev, keep the on-disk JSON in sync so the homepage picks up the
    // saved content immediately. On Vercel the rebuild handles this instead.
    if (process.env.NODE_ENV !== "production") {
      await fs.writeFile(
        path.join(process.cwd(), "src/data/portfolio.json"),
        serialized,
        "utf8"
      );
    }

    return NextResponse.json({ ok: true });
  } catch (error) {
    return serverError(error);
  }
}
