import RegisterForm from "@/components/register-form/RegisterForm";
import React from "react";

const RegisterPage = () => {
  return (
    <section className="container pt-[100px]">
      <div className="max-w-[600px] mx-auto text-center">
        <h1 className="text-3xl font-medium">Create Account</h1>
      </div>
      <RegisterForm />
    </section>
  );
};

export default RegisterPage;
