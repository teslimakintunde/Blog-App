"use client";
import React, { useEffect, useState } from "react";
import "quill/dist/quill.bubble.css"; // For bubble theme

import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import toast from "react-hot-toast";
import { nanoid } from "nanoid";
import ImageUpload from "@/components/image-upload/ImageUpload";

import dynamic from "next/dynamic";
const ReactQuill = dynamic(() => import("react-quill-new"), { ssr: false });

const WritePage = () => {
  const { status } = useSession();

  const [loading, setLoading] = useState(false);
  const router = useRouter();

  // Form states
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [content, setContent] = useState("");

  const [image, setImage] = useState(""); // Store Cloudinary image URL
  const [hasMounted, setHasMounted] = useState(false);

  useEffect(() => {
    if (status === "unauthenticated") {
      return router.push("/login");
    }
  }, [status, router]);

  // Prevent hydration mismatch (use client-side rendering)

  useEffect(() => {
    setHasMounted(true);
  }, []);
  if (!hasMounted) return null;

  const slugify = (str: string) =>
    str
      .toLowerCase()
      .trim()
      .replace(/[^\w\s-]/g, "")
      .replace(/[\s_-]+/g, "-")
      .replace(/^-+|-+$/g, "");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!title || !category || !content || !image) {
      return toast.error("Missing Input Fields");
    }

    setLoading(true);
    try {
      const uniqueSlug = `${slugify(title)}-${nanoid(6)}`; // Add 6-char nanoid

      const res = await fetch("/api/posts/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title,
          desc: content,
          img: image,
          slug: uniqueSlug,
          catSlug: category,
        }),
      });

      if (!res.ok) throw new Error("Failed to create the blog post");
      // if (res.status === 200) {
      //   // await res.json();
      //   toast.success("Post created successfully");
      //   router.push("/");
      // }
      toast.success("Post created successfully");
      router.push("/");
    } catch (error) {
      console.log(error);
      toast.error("Error submitting post");
    } finally {
      setLoading(false);
    }
  };
  const handleDiscard = () => {
    setTitle("");
    setCategory("");
    setContent("");
    toast.success("Post draft discarded");
  };

  console.log(image);

  return (
    <section className="container relative font-roboto py-[120px]">
      <form onSubmit={handleSubmit}>
        <div className="">
          <div>
            <label className="font-medium text-4xl">Title</label>

            <div className="flex flex-col gap-5 mt-5 max-w-[600px]">
              <input
                type="text"
                placeholder="Enter Your Blog Title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="flex text-[1rem] font-medium  border border-solid  p-2"
              />
              <select
                name=""
                id=""
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="border border-solid p-3 rounded-sm"
              >
                <option value="" disabled>
                  Choose Your Blog Category.....
                </option>
                <option value="style">sport</option>
                <option value="fashion">fashion</option>
                <option value="food">food</option>
                <option value="culture">culture</option>
                <option value="travel">travel</option>
                <option value="coding">coding</option>
              </select>
            </div>
            <div className="mt-10">
              <p className="font-medium text-xl">
                Write Your Blog Description..
              </p>

              {/* <textarea
                value={content}
                onChange={(e) => setContent(e.target.value)}
                placeholder="Tell Your story..."
                className="text-xl border border-solid mt-3 h-[300px] max-w-[700px]"
              /> */}
              <div className="max-w-[600px] mt-[30px]">
                <ReactQuill
                  theme="bubble"
                  value={content}
                  onChange={setContent}
                  placeholder="Tell Your story..."
                  // className="text-xl border border-solid mt-3 h-[300px] max-w-[700px]"
                  className="border h-[300px] w-full p-5"
                />
              </div>
            </div>
            <div className="mt-9">
              <ImageUpload
                value={image ? [image] : []}
                onChange={(url) => setImage(url)}
                onRemove={() => setImage("")}
              />
            </div>
          </div>
        </div>
        <div className="flex gap-5 mt-9">
          <button
            type="submit"
            onClick={() => router.push("/")}
            className="px-6 py-2 rounded-sm font-medium text-white bg-blue-600"
          >
            {loading ? "Publishing..." : "Publish"}
          </button>
          <button
            type="button"
            onClick={handleDiscard}
            className="px-6 py-2 rounded-sm font-medium text-white bg-blue-600"
          >
            Discard
          </button>
        </div>
      </form>
    </section>
  );
};

export default WritePage;
