"use client";
import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
import React, { useEffect, useState } from "react";

const AuthLinks = () => {
  const { status } = useSession();
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient || status === "loading") return null; // Avoid rendering on SSR

  return (
    <div>
      {status === "unauthenticated" ? (
        <Link
          href="/login"
          className="px-4 py-2 bg-blue-600 text-white font-medium rounded-sm"
        >
          Login
        </Link>
      ) : (
        <button
          className="hidden md:block px-4 py-2 text-white bg-red-600 rounded-md transition"
          onClick={() => signOut()}
        >
          Logout
        </button>
      )}
    </div>
  );
};

export default AuthLinks;
