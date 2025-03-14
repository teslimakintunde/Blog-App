// import { NextResponse } from "next/server";
// // import { hash } from "bcrypt";
// import bcryptjs from "bcryptjs";
// import { prisma } from "@/utils/prisma";

// export async function POST(req: Request) {
//   try {
//     const { token, newPassword } = await req.json();

//     if (!token || !newPassword) {
//       return NextResponse.json({ message: "Invalid request" }, { status: 400 });
//     }

//     // Find the reset token in the database
//     const resetToken = await prisma.passwordResetToken.findFirst({
//       where: {
//         token: token,
//         expiresAt: { gte: new Date() }, // Ensure token is not expired
//       },
//     });

//     if (!resetToken) {
//       return NextResponse.json(
//         { message: "Invalid or expired token" },
//         { status: 400 }
//       );
//     }

//     // Hash the new password
//     const hashedPassword = await bcryptjs.hash(newPassword, 10);

//     // Update user password
//     await prisma.user.update({
//       where: { id: resetToken.userId },
//       data: {
//         password: hashedPassword,
//       },
//     });

//     // Delete the reset token after use
//     await prisma.passwordResetToken.delete({
//       where: { id: resetToken.id },
//     });

//     return NextResponse.json({
//       message: "Password has been successfully reset.",
//     });
//   } catch (error) {
//     console.error("Error resetting password:", error);
//     return NextResponse.json(
//       { message: "Internal Server Error" },
//       { status: 500 }
//     );
//   }
// }

// import jwt from "jsonwebtoken";
// import { NextResponse } from "next/server";
// import bcryptjs from "bcryptjs";
// import { prisma } from "@/utils/prisma";

// import jwt, { JwtPayload } from "jsonwebtoken";

// export async function POST(req: Request) {
//   try {
//     const { token, newPassword } = await req.json();
//     if (!token || !newPassword) {
//       return NextResponse.json({ message: "Invalid request" }, { status: 400 });
//     }

//     // Verify token
//     let decoded: JwtPayload;
//     try {
//       decoded = jwt.verify(token, process.env.JWT_SECRET!) as JwtPayload;
//     } catch (error) {
//       console.log(error);
//       return NextResponse.json(
//         { message: "Invalid or expired token" },
//         { status: 400 }
//       );
//     }

//     const userId = decoded.userId as string; // Ensure TypeScript recognizes userId

//     if (!userId) {
//       return NextResponse.json(
//         { message: "Invalid token payload" },
//         { status: 400 }
//       );
//     }

//     // Find the user by ID
//     const user = await prisma.user.findUnique({ where: { id: userId } });

//     if (!user) {
//       return NextResponse.json({ message: "User not found" }, { status: 404 });
//     }

//     // Hash the new password
//     const hashedPassword = await bcryptjs.hash(newPassword, 10);
//     console.log("Generated Hashed Password:", hashedPassword); // Log new hash

//     // Update user password
//     await prisma.user.update({
//       where: { id: userId },
//       data: { password: hashedPassword },
//     });

//     // Verify password update (Debugging)
//     const updatedUser = await prisma.user.findUnique({ where: { id: userId } });
//     console.log("Stored Password Hash in DB:", updatedUser?.password);

//     // Delete all active sessions to force re-login
//     await prisma.session.deleteMany({ where: { userId } });
//     console.log("Deleted old sessions for user:", userId);

//     return NextResponse.json({ message: "Password successfully reset" });
//   } catch (error) {
//     console.error("Error resetting password:", error);
//     return NextResponse.json(
//       { message: "Internal Server Error" },
//       { status: 500 }
//     );
//   }
// }

import { NextResponse } from "next/server";
import bcryptjs from "bcryptjs";
import { prisma } from "@/utils/prisma";
import jwt, { JwtPayload } from "jsonwebtoken";

export async function POST(req: Request) {
  try {
    const { token, newPassword } = await req.json();
    console.log("Received token:", token);
    console.log("Received new password:", newPassword);

    if (!token || !newPassword) {
      return NextResponse.json({ message: "Invalid request" }, { status: 400 });
    }

    // Verify token
    let decoded: JwtPayload;
    try {
      decoded = jwt.verify(token, process.env.JWT_SECRET!) as JwtPayload;
      console.log("Decoded token payload:", decoded);
    } catch (error) {
      console.log("JWT verification error:", error);
      return NextResponse.json(
        { message: "Invalid or expired token" },
        { status: 400 }
      );
    }

    const userId = decoded.userId as string;
    console.log("Extracted userId from token:", userId);

    if (!userId) {
      return NextResponse.json(
        { message: "Invalid token payload" },
        { status: 400 }
      );
    }

    // Find the user by ID
    let user;
    try {
      user = await prisma.user.findUnique({ where: { id: userId } });
      console.log("Found user:", user);
    } catch (error) {
      console.error("Error fetching user:", error);
    }

    if (!user) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }

    // Hash the new password
    const hashedPassword = await bcryptjs.hash(newPassword, 10);
    console.log("Generated Hashed Password:", hashedPassword);

    // Update user password
    try {
      await prisma.user.update({
        where: { id: userId },
        data: { password: hashedPassword },
      });

      const updatedUser = await prisma.user.findUnique({
        where: { id: userId },
      });
      console.log("Stored Password Hash in DB:", updatedUser?.password);
    } catch (error) {
      console.error("Error updating password:", error);
    }

    // Delete all active sessions
    try {
      const sessionsBefore = await prisma.session.findMany({
        where: { userId },
      });
      console.log("Active sessions before deletion:", sessionsBefore);

      await prisma.session.deleteMany({ where: { userId } });
      console.log("Deleted old sessions for user:", userId);

      const sessionsAfter = await prisma.session.findMany({
        where: { userId },
      });
      console.log("Active sessions after deletion:", sessionsAfter);
    } catch (error) {
      console.error("Error deleting sessions:", error);
    }

    return NextResponse.json({ message: "Password successfully reset" });
  } catch (error) {
    console.error("Error resetting password:", error);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}
