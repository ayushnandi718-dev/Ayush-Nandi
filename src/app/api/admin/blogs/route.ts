import { NextResponse } from "next/server";
import { isAuthenticated } from "@/lib/admin/auth";
import { listBlogs } from "@/lib/admin/github";

export async function GET() {
  if (!(await isAuthenticated())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    return NextResponse.json({ blogs: await listBlogs() });
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Unexpected error" },
      { status: 500 }
    );
  }
}
