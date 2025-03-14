"use client";
import React, { useState } from "react";
import Image from "next/image";
import { useSession } from "next-auth/react";
import useSWR from "swr";

interface Comment {
  id: string;
  desc: string;
  createdAt: string;
  user: {
    name: string;
    image?: string;
  };
}

const fetcher = async (url: string): Promise<Comment[]> => {
  const res = await fetch(url);
  // const data = await res.json();
  // return data;
  if (!res.ok) throw new Error("Failed to fetch comments");
  const data: Comment[] = await res.json();
  return data || [];
};

const Comments = ({ postSlug }: { postSlug: string }) => {
  const { status } = useSession();
  const [desc, setDesc] = useState("");
  //const status = "unauthenticated";
  const {
    data = [],
    mutate,
    isLoading,
  } = useSWR(
    `http://localhost:3000/api/comments?postSlug=${postSlug}`,
    fetcher
  );
  const handleSubmit = async () => {
    if (!desc.trim()) return; // Prevent empty comments
    try {
      const res = await fetch("/api/comments", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ desc, postSlug }),
      });
      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.message || "Failed to post comment");
      }
      setDesc("");
      mutate();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <section className="md:mt-32 mt-10">
      <div>
        {status === "authenticated" ? (
          <div className="flex flex-col md:flex-row gap-5 items-start">
            <div className="h-[150px] w-full  md:w-[50%]">
              <textarea
                value={desc}
                onChange={(e) => setDesc(e.target.value)}
                name=""
                id=""
                className="border w-full h-full p-5"
              />
            </div>
            <button
              onClick={handleSubmit}
              className="px-6 py-2 bg-red-400 text-white font-medium rounded-sm"
            >
              {isLoading ? "Sending..." : "Send"}
            </button>
          </div>
        ) : null}
        <div className="flex flex-col gap-9 mt-16">
          {/* USER ! */}
          {data &&
            data?.map((item) => (
              <div key={item.id}>
                <div className="flex flex-row items-center gap-5 mb-6">
                  <span>
                    {item.user.image && (
                      <Image
                        src={item.user.image}
                        alt=""
                        width={32}
                        height={32}
                        className="rounded-full"
                      />
                    )}
                  </span>
                  <div>
                    <p>{item.user.name}</p>
                    <p>{item?.createdAt?.substring(0, 10)}</p>
                  </div>
                </div>
                <div>
                  <p className="max-w-[60ch]">{item?.desc}</p>
                </div>
              </div>
            ))}
        </div>
      </div>
    </section>
  );
};

export default Comments;
