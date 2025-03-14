// import { prisma } from "@/utils/prisma";
// import nodemailer from "nodemailer";
// import crypto from "crypto";

// export async function POST(req: Request) {
//   try {
//     const { email } = await req.json();

//     if (!email) {
//       return new Response(JSON.stringify({ message: "Email is required" }), {
//         status: 400,
//       });
//     }

//     // Check if the user exists
//     const user = await prisma.user.findUnique({
//       where: { email },
//     });

//     if (!user) {
//       return new Response(JSON.stringify({ message: "User not found" }), {
//         status: 404,
//       });
//     }

//     // Generate a reset token and expiry
//     const resetToken = crypto.randomBytes(32).toString("hex");
//     const resetTokenExpiry = new Date();
//     resetTokenExpiry.setHours(resetTokenExpiry.getHours() + 1); // Token valid for 1 hour

//     // Update user with reset token
//     await prisma.user.update({
//       where: { email },
//       data: { resetToken, resetTokenExpiry },
//     });

//     // Construct password reset link
//     const resetLink = `${process.env.NEXTAUTH_URL}/reset-password?token=${resetToken}`;

//     // Send email
//     await sendResetEmail(email, resetLink);

//     return new Response(
//       JSON.stringify({ message: "Password reset email sent" }),
//       {
//         status: 200,
//       }
//     );
//   } catch (error) {
//     console.error("Error in forgot password route:", error);
//     return new Response(JSON.stringify({ message: "Something went wrong" }), {
//       status: 500,
//     });
//   }
// }

// async function sendResetEmail(email: string, resetUrl: string) {
//   const transporter = nodemailer.createTransport({
//     host: process.env.SMTP_HOST,
//     port: parseInt(process.env.SMTP_PORT!),
//     secure: false,
//     auth: {
//       user: process.env.SMTP_USER!,
//       pass: process.env.SMTP_PASS!,
//     },
//   });

//   const mailOptions = {
//     from: process.env.SMTP_USER,
//     to: email,
//     subject: "Reset Your Password",
//     html: `
//       <p>Hello,</p>
//       <p>You requested a password reset. Click the link below to reset your password:</p>
//       <a href="${resetUrl}">${resetUrl}</a>
//       <p>This link will expire in 1 hour.</p>
//     `,
//   };

//   // ✅ Send email
//   await transporter.sendMail(mailOptions);
// }

// import { NextResponse } from "next/server";
// import { prisma } from "@/utils/prisma";
// import crypto from "crypto";

// export async function POST(req: Request) {
//   try {
//     const { email } = await req.json();

//     // Find the user by email
//     const user = await prisma.user.findUnique({
//       where: { email },
//     });

//     if (!user) {
//       return NextResponse.json({ message: "User not found" }, { status: 404 });
//     }

//     // Generate a random token
//     const token = crypto.randomBytes(32).toString("hex");

//     // Set token expiration (e.g., 1 hour from now)
//     const expiresAt = new Date(Date.now() + 3600000); // 1 hour

//     // Store the token in the database
//     await prisma.passwordResetToken.create({
//       data: {
//         token,
//         expiresAt,
//         userId: user.id,
//       },
//     });

//     // Construct the reset password URL with the token
//     const resetUrl = `http://localhost:3000/reset-password?token=${token}`;

//     // Send the reset URL to the user's email (use your email service)
//     console.log("Reset URL:", resetUrl); // For testing purposes

//     return NextResponse.json({
//       message: "Reset password email sent.",
//     });
//   } catch (error) {
//     console.error("Error generating reset token:", error);
//     return NextResponse.json(
//       { message: "Internal Server Error" },
//       { status: 500 }
//     );
//   }
// }

import { NextResponse } from "next/server";
// import bcrypt from "bcryptjs";
import { prisma } from "@/utils/prisma";
import nodemailer from "nodemailer";
import jwt from "jsonwebtoken"; // Import JWT

export async function POST(req: Request) {
  try {
    const { email } = await req.json();
    console.log("Received password reset request for:", email);

    // Check if the user exists
    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }
    console.log("JWT Secret:", process.env.JWT_SECRET);

    // ✅ Generate a JWT token instead of a random one
    const token = jwt.sign(
      { userId: user.id }, // Payload
      process.env.JWT_SECRET!, // Secret key
      { expiresIn: "1h" } // Expiry time
    );
    console.log("Generated reset token:", token);

    // Store the token in the database (updating if already exists)
    await prisma.passwordResetToken.upsert({
      where: { userId: user.id }, // ✅ Now userId is unique
      update: {
        token,
        expiresAt: new Date(Date.now() + 3600000), // 1-hour expiry
      },
      create: {
        userId: user.id,
        token,
        expiresAt: new Date(Date.now() + 3600000),
      },
    });

    // Construct the reset password URL with the JWT token
    const resetUrl = `${process.env.NEXTAUTH_URL}/reset-password?token=${token}`;
    console.log("Reset URL:", resetUrl);

    // Send email with the reset link
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASSWORD,
      },
    });

    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: email,
      subject: "Reset Your Password",
      html: `<p>Click the link below to reset your password:</p>
             <a href="${resetUrl}">${resetUrl}</a>
             <p>If you did not request a password reset, please ignore this email.</p>`,
    });

    return NextResponse.json({
      message: "Reset password email sent. Please check your inbox.",
    });
  } catch (error) {
    console.error("Error in forgot-password API:", error);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}
