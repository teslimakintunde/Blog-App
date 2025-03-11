import { prisma } from "@/utils/prisma";
import { NextResponse } from "next/server";

export const GET = async (): Promise<NextResponse> => {
  try {
    const categories = await prisma.category.findMany();
    if (!categories || categories.length === 0) {
      return new NextResponse(
        JSON.stringify({ message: "No categories found" }),
        { status: 404 }
      );
    }

    return new NextResponse(JSON.stringify(categories), { status: 200 });
  } catch (error) {
    console.error("Database Error:", error);
    return new NextResponse(
      JSON.stringify({ message: "Internal Server Error" }),
      { status: 500 }
    );
  }
};
