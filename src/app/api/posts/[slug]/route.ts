// import { prisma } from "@/utils/prisma";
// import { NextResponse } from "next/server";

// // Define the expected params type
// type Params = {
//   params: {
//     slug: string;
//   };
// };

// // GET request handler
// export const GET = async (
//   _req: Request,
//   { params }: Params
// ): Promise<NextResponse> => {
//   const { slug } = params;

//   try {
//     const post = await prisma.post.findUnique({
//       where: { slug },
//     });

//     if (!post) {
//       return new NextResponse(JSON.stringify({ message: "Post not found" }), {
//         status: 404,
//       });
//     }

//     return new NextResponse(JSON.stringify(post), { status: 200 });
//   } catch (error) {
//     console.error("Error fetching post:", error);
//     return new NextResponse(
//       JSON.stringify({ message: "Internal Server Error" }),
//       { status: 500 }
//     );
//   }
// };

// import { prisma } from "@/utils/prisma";
// import { NextResponse } from "next/server";

// export const GET = async (
//   _req: Request,
//   { params }: { params: { slug: string } }
// ): Promise<NextResponse> => {
//   const { slug } = params;

//   try {
//     const post = await prisma.post.findUnique({
//       where: { slug },
//     });

//     if (!post) {
//       return new NextResponse(JSON.stringify({ message: "Post not found" }), {
//         status: 404,
//       });
//     }

//     return NextResponse.json(post, { status: 200 }); // ✅ Cleaner response format
//   } catch (error) {
//     console.error("Error fetching post:", error);
//     return new NextResponse(
//       JSON.stringify({ message: "Internal Server Error" }),
//       { status: 500 }
//     );
//   }
// };
// import { prisma } from "@/utils/prisma";
// import { NextResponse } from "next/server";

// export async function GET(req: Request, context: { params: { slug: string } }) {
//   const { slug } = context.params;

//   try {
//     const post = await prisma.post.findUnique({
//       where: { slug },
//     });

//     if (!post) {
//       return NextResponse.json({ message: "Post not found" }, { status: 404 });
//     }

//     return NextResponse.json(post, { status: 200 });
//   } catch (error) {
//     console.error("Error fetching post:", error);
//     return NextResponse.json(
//       { message: "Internal Server Error" },
//       { status: 500 }
//     );
//   }
// }

// import { prisma } from "@/utils/prisma";
// import { NextRequest, NextResponse } from "next/server";

// export async function GET(
//   req: Request,
//   { params }: { params: Promise<Record<string, string>> } // ✅ Fix type definition
// ) {
//   const { slug } = await params; // ✅ Ensure slug is correctly extracted

//   try {
//     const post = await prisma.post.findUnique({
//       where: { slug },
//     });

//     if (!post) {
//       return NextResponse.json({ message: "Post not found" }, { status: 404 });
//     }

//     return NextResponse.json(post, { status: 200 });
//   } catch (error) {
//     console.error("Error fetching post:", error);
//     return NextResponse.json(
//       { message: "Internal Server Error" },
//       { status: 500 }
//     );
//   }
// }

// export async function GET(
//   request: Request,
//   { params }: { params: Promise<{ slug: string }> }
// ) {
//   // const { slug } = await params // 'a', 'b', or 'c'
//   const { slug } = await params; // ✅ Ensure slug is correctly extracted

//   try {
//     const post = await prisma.post.findUnique({
//       where: { slug },
//       include: { user: true },
//     });

//     if (!post) {
//       return NextResponse.json({ message: "Post not found" }, { status: 404 });
//     }

//     return NextResponse.json(post, { status: 200 });
//   } catch (error) {
//     console.error("Error fetching post:", error);
//     return NextResponse.json(
//       { message: "Internal Server Error" },
//       { status: 500 }
//     );
//   }
// }
// export const DELETE = async (
//   request: Request,
//   { params }: { params: Promise<{ slug: string }> }
// ): Promise<NextResponse> => {
//   const { slug } = await params;

//   try {
//     await prisma.post.delete({
//       where: { slug },
//     });

//     return NextResponse.json(
//       { success: true, message: "Post deleted successfully" },
//       { status: 200 }
//     );
//   } catch (error) {
//     console.error("Error deleting post:", error);
//     return NextResponse.json(
//       { success: false, message: "Failed to delete post" },
//       { status: 500 }
//     );
//   }
// };
// export const DELETE = async (
//   request: NextRequest,
//   { params }: { params: { slug: string } } // ✅ Correct type
// ): Promise<NextResponse> => {
//   const { slug } = params; // ✅ No need to await

//   try {
//     await prisma.post.delete({
//       where: { slug },
//     });

//     return NextResponse.json(
//       { success: true, message: "Post deleted successfully" },
//       { status: 200 }
//     );
//   } catch (error) {
//     console.error("Error deleting post:", error);
//     return NextResponse.json(
//       { success: false, message: "Failed to delete post" },
//       { status: 500 }
//     );
//   }
// };

// export const DELETE = async (
//   request: NextRequest,
//   { params }: { params: Promise<{ slug: string }> }
// ): Promise<NextResponse> => {
//   const { slug } = await params;

//   try {
//     console.log("Deleting post with slug:", slug);

//     const post = await prisma.post.findUnique({ where: { slug } });
//     if (!post) {
//       return NextResponse.json(
//         { success: false, message: "Post not found" },
//         { status: 404 }
//       );
//     }

//     await prisma.post.delete({ where: { slug } });

//     return NextResponse.json(
//       { success: true, message: "Post deleted successfully" },
//       { status: 200 }
//     );
//   } catch (error: any) {
//     console.error("Error deleting post:", error);
//     return NextResponse.json(
//       { success: false, message: error.message || "Failed to delete post" },
//       { status: 500 }
//     );
//   }
// };

// export const DELETE = async (
//   request: Request,
//   { params }: { params: { slug: string } }
// ): Promise<NextResponse> => {
//   try {
//     const { slug } = params;

//     console.log("Checking if post exists with slug:", slug);

//     const post = await prisma.post.findUnique({
//       where: { slug },
//     });

//     if (!post) {
//       return NextResponse.json(
//         { success: false, message: "Post not found" },
//         { status: 404 }
//       );
//     }

//     console.log("Deleting post...");
//     await prisma.post.delete({
//       where: { slug },
//     });

//     return NextResponse.json(
//       { success: true, message: "Post deleted successfully" },
//       { status: 200 }
//     );
//   } catch (error: any) {
//     console.error("Error deleting post:", error);
//     return NextResponse.json(
//       { success: false, message: error.message || "Failed to delete post" },
//       { status: 500 }
//     );
//   }
// };

import { prisma } from "@/utils/prisma";
import { NextRequest, NextResponse } from "next/server";

// export const GET = async (req, { params }) => {
//   const { slug } = params;
//   if (!slug) {
//     return new NextResponse(JSON.stringify({ error: "Slug is required" }), {
//       status: 400,
//     });
//   }
//   try {
//     // const post = await prisma.post.findUnique({
//     //   where: { slug },
//     //   include: { user: true },
//     // });
//     const post = await prisma.post.update({
//       where: { slug },
//       data: { views: { increment: 1 } },
//       include: { user: true },
//     });

//     if (!post) {
//       return new NextResponse(JSON.stringify({ error: "Post not found" }), {
//         status: 404,
//       });
//     }

//     return new NextResponse(JSON.stringify(post, { status: 200 }));
//   } catch (error) {
//     console.log(error);
//   }
// };

// // DELETE POST
// export const DELETE = async (req, { params }) => {
//   const { slug } = params; // Get post ID from the request params

//   if (!slug) {
//     return NextResponse.json(
//       { success: false, message: "Post ID is required" },
//       { status: 400 }
//     );
//   }

//   try {
//     const deletePost = await prisma.post.delete({
//       where: { id: slug },
//     });
//     return new NextResponse(
//       JSON.stringify(
//         { success: true, message: "Post Deleted successfully", deletePost },
//         { status: 200 }
//       )
//     );
//   } catch (error) {
//     console.error("Error deleting post:", error);
//     return NextResponse.json(
//       { success: false, message: "Failed to delete post" },
//       { status: 500 }
//     );
//   }
// };

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
  { params }: { params: { slug: string } }
): Promise<NextResponse> => {
  try {
    const { slug } = params;
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
