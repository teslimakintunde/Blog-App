"use client";
import { signIn } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

const LoginForm = () => {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    console.log("Attempting login with:", email, password);

    const result = await signIn("credentials", {
      email,
      password,
      redirect: false, // Prevent automatic redirection
    });

    console.log("SignIn result:", result);

    if (result?.error) {
      console.warn("Login failed:", result.error); // Use console.warn instead of console.error to avoid red warnings
      if (result.error === "CredentialsSignin") {
        setError(
          "Invalid email or password. You can register if you have not!  "
        ); // Show a user-friendly message
      } else {
        setError("An unexpected error occurred. Please try again.");
      }
    } else {
      console.log("Login successful, redirecting...");
      router.push("/");
    }
    setLoading(false);
  };
  const handleForgotPassword = () => {
    if (!email) {
      alert("Please enter your email before resetting your password.");
      return;
    }
    router.push(`/forgot-password?email=${encodeURIComponent(email)}`);
  };

  return (
    <section className="p-3 md:p-0 font-roboto">
      <form onSubmit={handleLogin} className="flex flex-col gap-5 ">
        <input
          type="email"
          placeholder="Enter your email"
          name="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="px-4 py-2 rounded-sm w-full"
          autoComplete="off"
          required
        />
        {/* <input
          type="password"
          placeholder="Enter your password"
          name="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="px-4 py-2 rounded-sm w-full"
          required
        /> */}
        <div className="relative">
          <input
            type={showPassword ? "text" : "password"}
            placeholder="password"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="px-3 py-3 w-full border"
          />
          <span
            className="absolute inset-y-0 right-0 pr-3 flex items-center cursor-pointer"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? "👁️" : "👁️‍🗨️"}
          </span>
        </div>
        {error && <p className="text-red-500">{error}</p>}
        <button
          type="submit"
          className="bg-red-400 text-white font-medium px-4 py-2 rounded-sm mb-10 disabled:opacity-50"
          disabled={loading}
        >
          {loading ? "Logging in..." : "Login"}
        </button>
        <div className="flex flex-col gap-y-5 md:flex-row justify-between items-center">
          <Link href="/register" className="text-black font-bold">
            {"Don't have an account?"} <b>Register</b>
          </Link>
          <button
            type="button"
            className="text-blue-500 hover:underline"
            onClick={handleForgotPassword}
          >
            Forgot Password?
          </button>
        </div>
      </form>
    </section>
  );
};

export default LoginForm;
