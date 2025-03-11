import React from "react";
import Link from "next/link";
import AuthLinks from "../AuthLinks/AuthLinks";

const Navbar = () => {
  return (
    <nav className="container font-roboto">
      <div className="flex justify-between items-center h-[100px]">
        <span className="font-bold text-2xl">TesakB</span>
        <span className="flex space-x-5">
          <Link href={"/"}>Homepage</Link>
          <Link href={"/"}>Contact</Link>
          <Link href={"/"}>About</Link>
          <AuthLinks />
        </span>
      </div>
    </nav>
  );
};

export default Navbar;
