import React from "react";
import Image from "next/image";
import Link from "next/link";

const Footer = () => {
  return (
    <footer className="container pt-[100px] mb-32 font-roboto ">
      <div className="grid grid-cols-1 lg:grid-cols-[minmax(300px,5fr)_1fr_1fr_1fr] sm:grid-cols-[minmax(250px,2fr)_1fr]  md:grid-cols-[minmax(250px,3fr)_1fr_1fr] gap-5">
        <div className="">
          <div className="flex flex-row gap-2">
            <Image
              src={"/avatar2.png"}
              alt=""
              width={32}
              height={32}
              className="rounded-full"
            />
            <p className="font-bold text-2xl">TesakBlog</p>
          </div>

          <div>
            <p className="max-w-[50ch] mt-6">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Animi
              aliquid repellat neque libero a velit! Rem vero fugit voluptate!
              Dolorum!
            </p>
          </div>
        </div>
        {/* Second column */}
        <div className="items-center">
          <Link href={"/"} className="text-xl">
            Home
          </Link>
          <div className="flex flex-col gap-5 mt-5">
            <Link href={"/"}>HomePage</Link>
            <Link href={"/"}>About</Link>
            <Link href={"/"}>Contact</Link>
            <Link href={"/"}>Blog</Link>
          </div>
        </div>
        {/* Second column */}
        <div className="items-center">
          <Link href={"/"} className="text-xl">
            About
          </Link>
          <div className="flex flex-col gap-5 mt-5">
            <Link href={"/"}>HomePage</Link>
            <Link href={"/"}>About</Link>
            <Link href={"/"}>Contact</Link>
            <Link href={"/"}>Blog</Link>
          </div>
        </div>
        {/* Second column */}
        <div className="items-center">
          <Link href={"/"} className="text-xl">
            Blog
          </Link>
          <div className="flex flex-col gap-5 mt-5">
            <Link href={"/"}>HomePage</Link>
            <Link href={"/"}>About</Link>
            <Link href={"/"}>Contact</Link>
            <Link href={"/"}>Blog</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
