// import { auth } from "@/utils/auth";
// import { prisma } from "@/utils/prisma";
// import { NextResponse } from "next/server";

// export const GET = async (req: NextRequest): Promise<NextResponse> => {
//   const { searchParams } = new URL(req.url);
//   const page = Number(searchParams.get("page")) || 1;
//   const cat = searchParams.get("cat") || "";
//   const POST_PER_PAGE = 2;

//   const query = {
//     take: POST_PER_PAGE,
//     skip: POST_PER_PAGE * (page - 1),
//     where: cat ? { catSlug: cat } : {},
//     orderBy: { createdAt: "desc" as const }, // ✅ Fixed Prisma SortOrder issue
//   };

//   try {
//     const [posts, count] = await prisma.$transaction([
//       prisma.post.findMany(query),
//       prisma.post.count({ where: query.where }),
//     ]);

//     return NextResponse.json({ posts, count }, { status: 200 });
//   } catch (error) {
//     console.error("Error fetching posts:", error);
//     return NextResponse.json(
//       { message: "Failed to fetch posts" },
//       { status: 500 }
//     );
//   }
// };

// export const GET = async (req: NextRequest): Promise<NextResponse> => {
//   const { searchParams } = new URL(req.url);
//   const page = Number(searchParams.get("page")) || 1;
//   const cat = searchParams.get("cat") || "";
//   const POST_PER_PAGE = 2;

//   try {
//     const posts = await prisma.post.findMany({
//       take: POST_PER_PAGE,
//       skip: POST_PER_PAGE * (page - 1),
//       where: cat ? { catSlug: cat } : {},
//       orderBy: { createdAt: "desc" },
//     });

//     const count = await prisma.post.count({
//       where: cat ? { catSlug: cat } : {},
//     });

//     return NextResponse.json({ posts, count }, { status: 200 });
//   } catch (error) {
//     console.error("Error fetching posts:", error);
//     return NextResponse.json(
//       { message: "Failed to fetch posts" },
//       { status: 500 }
//     );
//   }
// };

// export const POST = async (req: NextRequest): Promise<NextResponse> => {
//   try {
//     const body = await req.json();
//     const session = await auth();

//     if (!session?.user?.email) {
//       return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
//     }

//     const post = await prisma.post.create({
//       data: { ...body, userEmail: session.user.email },
//     });

//     return NextResponse.json(post, { status: 201 });
//   } catch (error) {
//     console.error("Error saving post:", error);
//     return NextResponse.json(
//       { message: "Failed to save data" },
//       { status: 500 }
//     );
//   }
// };

// export const GET = async (req) => {
//   const { searchParams } = new URL(req.url);
//   const page = searchParams.get("page");
//   const cat = searchParams.get("cat");
//   const POST_PER_PAGE = 2;

//   const query = {
//     take: POST_PER_PAGE,
//     skip: POST_PER_PAGE * (page - 1),
//     where: {
//       ...(cat && { catSlug: cat }),
//     },
//     orderBy: {
//       createdAt: "desc", // Sorts by newest posts first
//     },
//   };

//   try {
//     const [posts, count] = await prisma.$transaction([
//       prisma.post.findMany(query),
//       prisma.post.count({ where: query.where }),
//     ]);

//     if (posts) {
//       return new NextResponse(
//         JSON.stringify({ posts, count }, { status: 200 })
//       );
//     }
//   } catch (error) {
//     console.log(error);
//     return NextResponse.json({
//       success: false,
//       message: "failed to fetch data",
//     });
//   }
// };

// // CREATE POSTS
// export const POST = async (req) => {
//   const session = await auth();
//   console.log("server session", session);
//   if (!session) {
//     return new NextResponse(
//       JSON.stringify({ message: "Not Authenticated" }, { status: 401 })
//     );
//   }

//   try {
//     const body = await req.json();
//     const post = await prisma.post.create({
//       data: { ...body, userEmail: session.user.email },
//     });

//     return new NextResponse(JSON.stringify(post, { status: 200 }));
//   } catch (error) {
//     console.log(error);
//   }
// };

import { auth } from "@/utils/auth";
import { prisma } from "@/utils/prisma";
import { NextRequest, NextResponse } from "next/server";

const POST_PER_PAGE = 2;

// ✅ GET - Fetch Paginated Posts
export const GET = async (req: NextRequest): Promise<NextResponse> => {
  try {
    const { searchParams } = new URL(req.url);
    const page = Number(searchParams.get("page")) || 1;
    const cat = searchParams.get("cat") || undefined;

    if (page < 1) {
      return NextResponse.json(
        { success: false, message: "Invalid page number" },
        { status: 400 }
      );
    }

    const query = {
      take: POST_PER_PAGE,
      skip: POST_PER_PAGE * (page - 1),
      where: cat ? { catSlug: cat } : undefined,
      orderBy: {
        createdAt: "desc" as const, // ✅ Fix: TypeScript expects a literal, so use 'as const'
      },
    };

    const [posts, count] = await prisma.$transaction([
      prisma.post.findMany(query),
      prisma.post.count({ where: query.where }),
    ]);

    return NextResponse.json({ success: true, posts, count }, { status: 200 });
  } catch (error) {
    console.error("❌ Error fetching posts:", error);
    return NextResponse.json(
      { success: false, message: "Failed to fetch data" },
      { status: 500 }
    );
  }
};

// ✅ POST - Create a New Post
export const POST = async (req: NextRequest): Promise<NextResponse> => {
  try {
    const session = await auth();
    console.log("🔍 Server session:", session);

    if (!session || !session.user?.email) {
      return NextResponse.json(
        { success: false, message: "Not Authenticated" },
        { status: 401 }
      );
    }

    const body = await req.json();

    if (!body.title || !body.desc || !body.slug || !body.catSlug) {
      return NextResponse.json(
        { success: false, message: "Missing required fields" },
        { status: 400 }
      );
    }

    const post = await prisma.post.create({
      data: {
        ...body,
        userEmail: session.user.email,
      },
    });

    return NextResponse.json({ success: true, post }, { status: 200 });
  } catch (error) {
    console.error("❌ Error creating post:", error);
    return NextResponse.json(
      { success: false, message: "Internal Server Error" },
      { status: 500 }
    );
  }
};
