// import { NextRequest, NextResponse } from "next/server";
// import bcryptjs from "bcryptjs";
// import { prisma } from "@/utils/prisma";

// export const POST = async (req: NextRequest): Promise<NextResponse> => {
//   try {
//     const { email, password }: { email: string; password: string } =
//       await req.json();

//     if (!email || !password) {
//       return NextResponse.json(
//         { success: false, message: "Email and password are required" },
//         { status: 400 }
//       );
//     }

//     // Check if the user already exists
//     const existingUser = await prisma.user.findUnique({ where: { email } });

//     if (existingUser) {
//       return NextResponse.json(
//         { success: false, message: "User already exists" },
//         { status: 400 }
//       );
//     }

//     // Hash password
//     const hashedPassword = await bcryptjs.hash(password, 10);

//     // Create new user in Prisma
//     const user = await prisma.user.create({
//       data: { email, password: hashedPassword },
//     });

//     return NextResponse.json(
//       { success: true, message: "User registration successful", user },
//       { status: 201 }
//     );
//   } catch (error) {
//     console.error("Registration error:", error);
//     return NextResponse.json(
//       { success: false, error: "Something went wrong" },
//       { status: 500 }
//     );
//   }
// };
// import { NextRequest, NextResponse } from "next/server";
// import bcryptjs from "bcryptjs";
// import { prisma } from "@/utils/prisma";

// export const POST = async (req: NextRequest): Promise<NextResponse> => {
//   try {
//     const { email, password }: { email: string; password: string } =
//       await req.json();

//     if (!email || !password) {
//       return NextResponse.json(
//         { success: false, message: "Email and password are required" },
//         { status: 400 }
//       );
//     }

//     // Check if the user exists
//     const user = await prisma.user.findUnique({ where: { email } });

//     if (!user) {
//       return NextResponse.json(
//         { success: false, message: "User not found" },
//         { status: 404 }
//       );
//     }
//     // Compare provided password with stored hashed password
//     if (!user.password) {
//       return NextResponse.json(
//         { success: false, message: "User password is missing" },
//         { status: 500 }
//       );
//     }

//     // Compare provided password with stored hashed password
//     const isPasswordCorrect = await bcryptjs.compare(password, user.password);

//     console.log("User-entered password:", password);
//     console.log("Stored hashed password:", user.password);
//     console.log("Password match:", isPasswordCorrect);

//     if (!isPasswordCorrect) {
//       return NextResponse.json(
//         { success: false, message: "Incorrect password" },
//         { status: 401 }
//       );
//     }

//     return NextResponse.json({ success: true, message: "Login successful" });
//   } catch (error) {
//     console.error("Error in login API:", error);
//     return NextResponse.json(
//       { success: false, error: "Internal Server Error" },
//       { status: 500 }
//     );
//   }
// };
// import { NextRequest, NextResponse } from "next/server";
// import bcrypt from "bcryptjs";
// import { prisma } from "@/utils/prisma";

// export const POST = async (req: NextRequest): Promise<NextResponse> => {
//   try {
//     const { email, password }: { email: string; password: string } =
//       await req.json();

//     if (!email || !password) {
//       return NextResponse.json(
//         { success: false, message: "Email and password are required" },
//         { status: 400 }
//       );
//     }

//     // Check if the user already exists
//     const existingUser = await prisma.user.findUnique({ where: { email } });

//     if (existingUser) {
//       return NextResponse.json(
//         { success: false, message: "User already exists" },
//         { status: 400 }
//       );
//     }

//     // Hash password
//     const hashedPassword = await bcrypt.hash(password, 10);

//     // Create new user in Prisma
//     const user = await prisma.user.create({
//       data: { email, password: hashedPassword },
//     });

//     return NextResponse.json(
//       { success: true, message: "User registration successful", user },
//       { status: 201 }
//     );
//   } catch (error) {
//     console.error("Registration error:", error);
//     return NextResponse.json(
//       { success: false, error: "Something went wrong" },
//       { status: 500 }
//     );
//   }
// };

import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { prisma } from "@/utils/prisma";

export const POST = async (req: NextRequest) => {
  try {
    const { email, password }: { email: string; password: string } =
      await req.json();

    console.log(
      "Received request - Email:",
      email,
      "Password:",
      password ? "****" : "No password provided"
    );

    if (!email || !password) {
      console.error("Missing email or password");
      return NextResponse.json(
        { success: false, message: "Email and password are required" },
        { status: 400 }
      );
    }

    // Check if user already exists
    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      console.log("User already exists:", existingUser);
      return NextResponse.json(
        { success: false, message: "User already exists" },
        { status: 400 }
      );
    }

    try {
      // Hash password
      const hashedPassword = await bcrypt.hash(password, 10);
      console.log("Generated hashed password:", hashedPassword);

      // Save user in database
      const user = await prisma.user.create({
        data: { email, password: hashedPassword },
      });

      console.log("User created successfully:", user);

      return NextResponse.json(
        { success: true, message: "User registration successful", user },
        { status: 201 }
      );
    } catch (error) {
      console.error("Error during registration:", error);
      return NextResponse.json(
        { success: false, message: "Something went wrong" },
        { status: 500 }
      );
    }
  } catch (error) {
    console.error("Error parsing request:", error);
    return NextResponse.json(
      { success: false, message: "Invalid request data" },
      { status: 400 }
    );
  }
};
