"use client";

import LoginForm from "@/components/login-form/LoginForm";
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
    <section className="container py-[120px] font-roboto">
      <div className="max-w-[800px] mx-auto shadow-lg bg-slate-100 flex flex-col gap-8 items-center justify-center rounded-sm">
        <div className="md:w-[60%] mx-auto text-center flex flex-col gap-5 pb-[60px]">
          <div className="mt-16">
            <h1 className="text-3xl font-medium font-Abril_Fatface">Sign In</h1>
          </div>

          <form
            onSubmit={handleGoogleLogin}
            className="px-[30px] py-2 bg-red-400 font-medium text-center  text-white rounded-md"
          >
            <button className="sm:text-[20px] font-medium">
              Sign in with Google
            </button>
          </form>

          <LoginForm />
        </div>
      </div>
    </section>
  );
};

export default LoginPage;
