import React from "react";
import Image from "next/image";
import Link from "next/link";

const Footer = () => {
  return (
    <footer className="container grid grid-cols-[minmax(300px,5fr)_1fr_1fr_1fr] my-32">
      {/*First Column */}
      <div>
        <span className="flex flex-row gap-5 mb-6 ">
          <Image
            src={"/logo (1).png"}
            alt=""
            width={42}
            height={42}
            className="rounded-full"
          />
          <p className="text-2xl font-bold">TesakBlog</p>
        </span>
        <p className="max-w-[50ch]">
          Lorem ipsum dolor sit amet consectetur, adipisicing elit. Error quasi
          optio inventore omnis quam labore velit quae repudiandae, sequi quod.
        </p>
      </div>
      {/* second column */}
      <div>
        <h4 className="mb-6">Links</h4>
        <div className="flex flex-col gap-4">
          <Link href={"/"}>Homepage</Link>
          <Link href={"/"}>About</Link>
          <Link href={"/"}>Contact</Link>
          <Link href={"/"}>Blog</Link>
        </div>
      </div>
      {/* Third  column */}
      <div>
        <h4 className="mb-6">Links</h4>
        <div className="flex flex-col gap-4">
          <Link href={"/"}>Homepage</Link>
          <Link href={"/"}>About</Link>
          <Link href={"/"}>Contact</Link>
          <Link href={"/"}>Blog</Link>
        </div>
      </div>
      {/* Third  column */}
      <div>
        <h4 className="mb-6">Links</h4>
        <div className="flex flex-col gap-4">
          <Link href={"/"}>Homepage</Link>
          <Link href={"/"}>About</Link>
          <Link href={"/"}>Contact</Link>
          <Link href={"/"}>Blog</Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
