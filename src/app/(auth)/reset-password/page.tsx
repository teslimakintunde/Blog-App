// "use client";
// import { FormEvent, useState } from "react";
// import { useRouter } from "next/navigation";

// const ResetPassword = () => {
//   const router = useRouter();
//   const [email, setEmail] = useState("");
//   const [newPassword, setNewPassword] = useState("");
//   const [error, setError] = useState("");
//   const [success, setSuccess] = useState("");

//   const handleResetPassword = async (e: FormEvent) => {
//     e.preventDefault();
//     setError("");
//     setSuccess("");

//     const response = await fetch("/api/auth/reset-password", {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify({ email, newPassword }),
//     });

//     const data: { message: string } = await response.json();
//     if (response.ok) {
//       router.push("/login");
//       setSuccess(data.message);
//     } else {
//       setError(data.message);
//     }
//   };

//   return (
//     <section>
//       <form onSubmit={handleResetPassword} className="max-w-md mx-auto py-10">
//         <input
//           type="email"
//           placeholder="Enter your email"
//           value={email}
//           onChange={(e) => setEmail(e.target.value)}
//           className="px-3 py-3 w-full my-5 border rounded-md"
//           required
//         />
//         <input
//           type="password"
//           placeholder="Enter new password"
//           value={newPassword}
//           onChange={(e) => setNewPassword(e.target.value)}
//           className="px-3 py-3 w-full border rounded-md"
//           required
//         />
//         {error && <p className="text-red-500">{error}</p>}
//         {success && <p className="text-green-500">{success}</p>}
//         <button
//           type="submit"
//           className="bg-blue-600 text-white font-medium text-center w-full py-3 rounded-md mt-5"
//         >
//           Reset Password
//         </button>
//       </form>
//     </section>
//   );
// };

// export default ResetPassword;

// "use client";
// import { useState, useEffect } from "react";
// import { useRouter, useSearchParams } from "next/navigation";

// const ResetPassword = () => {
//   const router = useRouter();
//   const searchParams = useSearchParams();
//   const [token, setToken] = useState("");
//   const [newPassword, setNewPassword] = useState("");
//   const [message, setMessage] = useState("");

//   useEffect(() => {
//     const tokenParam = searchParams.get("token");
//     if (tokenParam) {
//       setToken(tokenParam);
//     }
//   }, [searchParams]);

//   const handleResetPassword = async () => {
//     if (!token || !newPassword) {
//       setMessage("Invalid request.");
//       return;
//     }

//     const response = await fetch("/api/auth/reset-password", {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify({ token, newPassword }),
//     });

//     const data = await response.json();
//     if (response.ok) {
//       setMessage("Password has been successfully reset.");
//       setTimeout(() => router.push("/login"), 2000); // Redirect after success
//     } else {
//       setMessage(data.message);
//     }
//   };

//   return (
//     <section className="max-w-md mx-auto py-10">
//       <h2 className="text-xl font-semibold">Reset Password</h2>
//       <input
//         type="password"
//         placeholder="Enter new password"
//         value={newPassword}
//         onChange={(e) => setNewPassword(e.target.value)}
//         className="px-3 py-3 w-full my-5 border rounded-md"
//         required
//       />
//       <button
//         onClick={handleResetPassword}
//         className="bg-blue-600 text-white font-medium w-full py-3 rounded-md"
//       >
//         Reset Password
//       </button>
//       {message && <p className="mt-3 text-green-500">{message}</p>}
//     </section>
//   );
// };

// export default ResetPassword;

"use client";
import { FormEvent, useState, useEffect, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";

const ResetPasswordContent = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const token = searchParams.get("token"); // Get token from URL

  const [newPassword, setNewPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  useEffect(() => {
    if (!token) {
      setError("Invalid or missing token.");
    }
  }, [token]);

  const handleResetPassword = async (e: FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (!token) {
      setError("Invalid or missing token.");
      return;
    }

    const BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000";

    const response = await fetch(`${BASE_URL}/api/auth/reset-password}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ token, newPassword }), // Send token and new password
    });
    if (!response.ok) {
      throw new Error("Network response was not ok.");
    }

    const data = await response.json();
    if (response.ok) {
      setSuccess(data.message);
      setTimeout(() => router.push("/login"), 2000); // Redirect after success
    } else {
      setError(
        data.message || "An error occurred while resetting the password."
      );
    }
  };

  return (
    <section>
      <form
        onSubmit={handleResetPassword}
        className="max-w-md mx-auto py-[100px]"
      >
        <input
          type="password"
          placeholder="Enter new password"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          className="px-3 py-3 w-full border rounded-md"
          required
        />
        {error && <p className="text-red-500">{error}</p>}
        {success && <p className="text-green-500">{success}</p>}
        <button
          type="submit"
          className="bg-blue-600 text-white font-medium text-center w-full py-3 rounded-md mt-5"
          disabled={!token}
        >
          Reset Password
        </button>
      </form>
    </section>
  );
};

const ResetPassword = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <ResetPasswordContent />
    </Suspense>
  );
};

export default ResetPassword;
