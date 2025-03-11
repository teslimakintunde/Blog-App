"use client";

import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";

const LoginPage = () => {
  const router = useRouter();
  const { status } = useSession();

  useEffect(() => {
    if (status === "authenticated") {
      router.push("/");
    }
  }, [status, router]);

  const handleGoogleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      await signIn("google");
    } catch (error) {
      console.log(error);
    }
  };
  console.log(status);
  return (
    <section className="container">
      <div className=" max-w-[700px] mx-auto bg-slate-100 flex flex-col gap-8 items-center justify-center my-32 rounded-sm">
        <div className="mt-16">
          <h1 className="text-3xl font-medium ">Sign In</h1>
        </div>

        <form
          onSubmit={handleGoogleLogin}
          className="w-[60%] py-2 bg-red-400 text-xl font-medium text-center  text-white rounded-md"
        >
          <button>Sign in with Google</button>
        </form>

        {/* <LoginForm /> */}
      </div>
    </section>
  );
};

export default LoginPage;
