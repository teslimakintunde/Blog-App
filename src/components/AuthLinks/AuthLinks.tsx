"use client";
import { useSession } from "next-auth/react";
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
          <Link href={"/logout"}>Logout</Link>
        </>
      )}
      {/* <Link href={"/"}>AuthLinks</Link> */}
    </div>
  );
};

export default AuthLinks;
