"use client";
import { CldImage } from "next-cloudinary";
import React, { useEffect } from "react";
import useSWR from "swr";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import toast from "react-hot-toast";

// Define Post type based on Prisma schema
interface Post {
  id: string;
  createdAt: string; // ISO date string
  slug: string;
  title: string;
  desc: string;
  img?: string;
  views: number;
  catSlug: string;
  userEmail: string;
}

const fetcher = async (url: string) => {
  try {
    const data = await fetch(url);
    const res = await data.json();
    return res;
  } catch (error) {
    console.log(error);
  }
};

const ViewPost = () => {
  const { data, mutate, isLoading } = useSWR<Post[]>(
    "/api/view-posts",
    fetcher
  );
  const { data: session, status } = useSession();
  const router = useRouter();
  useEffect(() => {
    if (status === "unauthenticated") {
      return router.push("/login");
    }
  }, [status, router]);
  if (status === "loading") {
    return <p>Loading...</p>; // Prevent hydration issues
  }

  if (!session) {
    return null; // Prevents rendering before redirect
  }

  const handleDelete = async (slug: string) => {
    // ✅ Use slug instead of id
    try {
      const BASE_URL =
        process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000";
      const res = await fetch(`${BASE_URL}/api/posts/${slug}`, {
        method: "DELETE",
      });
      const data = await res.json();
      console.log("Delete response:", data); // Debugging
      if (data) {
        toast.success("Post deleted successfully");
      }
      mutate();
    } catch (error) {
      console.log("Delete error:", error);
    }
  };
  console.log(data);
  return (
    <section className="container pt-[130px] font-roboto">
      <div className="">
        <h1 className="text-4xl font-medium"></h1>
      </div>
      <div>
        {isLoading ? (
          <p className="text-2xl">Posts Loading...</p>
        ) : data && data.length > 0 ? (
          data.map((item, i) => (
            <div
              key={i}
              className="grid grid-cols-1 gap-5  md:grid-cols-2 mb-8  md:mb-10"
            >
              <div className="max-w-[600px]">
                {item.img ? (
                  <div className="relative h-[320px]">
                    <CldImage
                      src={item?.img}
                      alt="collection"
                      className="object-cover rounded-lg"
                      fill
                    />
                  </div>
                ) : (
                  <div className="relative h-[300px]">
                    <Image
                      src={"/blog-image.jpg"}
                      alt=""
                      fill
                      className="rounded-md"
                    />
                  </div>
                )}
              </div>
              <div className="mb-7 md:mb-0">
                <p className="md:text-3xl text-[20px] font-medium mb-5">
                  {item.title}
                </p>

                <div
                  className="mt-3 max-w-[60ch]"
                  dangerouslySetInnerHTML={{
                    __html:
                      item.desc.length > 200
                        ? item.desc.substring(0, 200) + "..."
                        : item.desc,
                  }}
                />
                <div className="md:mt-10 mt-6">
                  <button
                    onClick={() => handleDelete(item.slug)}
                    className="px-6 py-2 text-white bg-red-400 font-medium rounded-md"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p className="text-2xl font-medium">No Post</p>
        )}
      </div>
    </section>
  );
};

export default ViewPost;
