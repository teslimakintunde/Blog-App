import { prisma } from "@/utils/prisma";
import { NextRequest, NextResponse } from "next/server";

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

export const GET = async (req: NextRequest): Promise<NextResponse> => {
  const { searchParams } = new URL(req.url);
  const page = Number(searchParams.get("page")) || 1;
  const cat = searchParams.get("cat") || "";
  const POST_PER_PAGE = 2;

  try {
    const posts = await prisma.post.findMany({
      take: POST_PER_PAGE,
      skip: POST_PER_PAGE * (page - 1),
      where: cat ? { catSlug: cat } : {},
      orderBy: { createdAt: "desc" },
    });

    const count = await prisma.post.count({
      where: cat ? { catSlug: cat } : {},
    });

    return NextResponse.json({ posts, count }, { status: 200 });
  } catch (error) {
    console.error("Error fetching posts:", error);
    return NextResponse.json(
      { message: "Failed to fetch posts" },
      { status: 500 }
    );
  }
};
