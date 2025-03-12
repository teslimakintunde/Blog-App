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

import { prisma } from "@/utils/prisma";
import { NextResponse } from "next/server";

export async function GET(
  req: Request,
  { params }: { params: { slug: string } }
) {
  const { slug } = params;

  try {
    const post = await prisma.post.findUnique({
      where: { slug },
    });

    if (!post) {
      return NextResponse.json({ message: "Post not found" }, { status: 404 });
    }

    return NextResponse.json(post, { status: 200 });
  } catch (error) {
    console.error("Error fetching post:", error);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}
