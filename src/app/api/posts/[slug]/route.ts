import { prisma } from "@/utils/prisma";
import { NextResponse } from "next/server";

// Define the expected params type
type Params = {
  params: {
    slug: string;
  };
};

// GET request handler
export const GET = async (
  _req: Request,
  { params }: Params
): Promise<NextResponse> => {
  const { slug } = params;

  try {
    const post = await prisma.post.findUnique({
      where: { slug },
    });

    if (!post) {
      return new NextResponse(JSON.stringify({ message: "Post not found" }), {
        status: 404,
      });
    }

    return new NextResponse(JSON.stringify(post), { status: 200 });
  } catch (error) {
    console.error("Error fetching post:", error);
    return new NextResponse(
      JSON.stringify({ message: "Internal Server Error" }),
      { status: 500 }
    );
  }
};
