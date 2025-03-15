"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import AuthLinks from "../AuthLinks/AuthLinks";
import { motion } from "framer-motion";

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    // Detect scroll for background change
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    // Detect window resize to close menu on larger screens
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setIsMenuOpen(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <nav
      className={`font-roboto fixed w-full top-0 z-50 transition-all duration-300 ${
        isScrolled ? "bg-white shadow-md" : "bg-transparent"
      }`}
    >
      <div className="container mx-auto px-5 flex justify-between items-center h-[80px]">
        {/* Logo */}
        <Link href={"/"} className="font-bold text-2xl">
          TesakB
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center space-x-5">
          <Link
            href="/"
            className="text-black px-4 py-2 rounded-md hover:bg-slate-100 transition"
          >
            Home
          </Link>
          <Link
            href="/"
            className="text-black px-4 py-2 rounded-md hover:bg-slate-100 transition"
          >
            About
          </Link>
          <Link
            href="/write"
            className="text-black px-4 py-2 rounded-md hover:bg-slate-100 transition"
          >
            Write
          </Link>
          <Link
            href="/view-posts"
            className="text-black px-4 py-2 rounded-md hover:bg-slate-100 transition"
          >
            View Posts
          </Link>
          <AuthLinks />
        </div>

        {/* Mobile Menu Button */}
        <button className="md:hidden" onClick={() => setIsMenuOpen(true)}>
          <Menu size={30} />
        </button>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-50"
            onClick={() => setIsMenuOpen(false)}
          />

          {/* Menu Content */}
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", stiffness: 100, damping: 15 }}
            className="fixed top-0 right-0 w-3/4 h-screen bg-white shadow-lg flex flex-col items-center justify-center space-y-6 p-5"
          >
            <button
              className="absolute top-5 right-5"
              onClick={() => setIsMenuOpen(false)}
            >
              <X size={30} className="text-black" />
            </button>

            {/* Mobile Menu Links */}
            {["Homepage", "Contact", "About"].map((title, index) => (
              <Link
                key={index}
                href={`/${title.toLowerCase().replace(" ", "-")}`}
                className="text-black text-xl px-4 py-2 rounded-lg hover:bg-gray-200 transition w-full text-center"
                onClick={() => setIsMenuOpen(false)}
              >
                {title}
              </Link>
            ))}

            {/* "Write" and "View Posts" as Buttons */}
            <Link
              href="/write"
              className="bg-blue-500 w-max text-white px-6 py-3 rounded-lg hover:bg-blue-600 transition text-center"
              onClick={() => setIsMenuOpen(false)}
            >
              Write
            </Link>
            <Link
              href="/view-posts"
              className="bg-green-500 w-max text-white px-6 py-3 rounded-lg hover:bg-green-600 transition text-center"
              onClick={() => setIsMenuOpen(false)}
            >
              View Posts
            </Link>

            <AuthLinks />
          </motion.div>
        </>
      )}
    </nav>
  );
};

export default Navbar;
