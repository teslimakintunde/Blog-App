import { prisma } from "@/utils/prisma";
import { NextRequest, NextResponse } from "next/server";

// ✅ GET - Fetch a Single Post by Slug & Increment Views
export const GET = async (
  req: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
): Promise<NextResponse> => {
  const { slug } = await params;

  if (!slug) {
    return NextResponse.json({ error: "Slug is required" }, { status: 400 });
  }

  try {
    const post = await prisma.post.update({
      where: { slug },
      data: { views: { increment: 1 } }, // Increment views count
      include: { user: true },
    });

    return NextResponse.json(post, { status: 200 });
  } catch (error) {
    console.error("❌ Error fetching post:", error);
    return NextResponse.json(
      { error: "Failed to fetch post" },
      { status: 500 }
    );
  }
};

export const DELETE = async (
  request: Request,
  { params }: { params: Promise<{ slug: string }> }
): Promise<NextResponse> => {
  try {
    const { slug } = await params;
    console.log("🔍 Received slug:", slug); // Debugging

    if (!slug) {
      return NextResponse.json(
        { success: false, message: "Slug is missing" },
        { status: 400 }
      );
    }

    // Check if post exists
    const post = await prisma.post.findUnique({ where: { slug } });
    console.log("🔎 Found post:", post); // Debugging

    if (!post) {
      return NextResponse.json(
        { success: false, message: "Post not found" },
        { status: 404 }
      );
    }

    console.log("🗑️ Deleting post...");
    await prisma.post.delete({ where: { slug } });

    return NextResponse.json(
      { success: true, message: "Post deleted successfully" },
      { status: 200 }
    );
  } catch (error: unknown) {
    console.error("❌ Error deleting post:", error);

    return NextResponse.json(
      {
        success: false,
        message:
          error instanceof Error ? error.message : "Failed to delete post",
      },
      { status: 500 }
    );
  }
};
