"use client";
import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
import React from "react";

const AuthLinks = () => {
  const { status } = useSession();
  return (
    <div>
      {status === "unauthenticated" ? (
        <Link href={"/login"}>Login</Link>
      ) : (
        <>
          <Link href={"/write"} className="mr-5">
            Write
          </Link>
          <button
            className="hidden md:block px-4 py-2  text-white bg-red-600 rounded-md transition"
            onClick={() => signOut()}
          >
            Logout
          </button>
        </>
      )}
      {/* <Link href={"/"}>AuthLinks</Link> */}
    </div>
  );
};

export default AuthLinks;
