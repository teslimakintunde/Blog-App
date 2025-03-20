import React from "react";
import Image from "next/image";

import Menu from "@/components/menu/Menu";
import Comments from "@/components/comments/page";
import DisplayImage from "@/components/display-image/DisplayImage";

const getPost = async (slug: string) => {
  try {
    const BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000";
    const res = await fetch(`${BASE_URL}/api/posts/${slug}`);
    const result = await res.json();
    return result;
  } catch (error) {
    console.log(error);
  }
};

const SinglePage = async ({
  params,
}: {
  params: Promise<{ slug: string }>;
}) => {
  const { slug } = await params;
  const post = await getPost(slug);
  console.log(post);
  return (
    <section className="container pt-[70px] md:pt-[120px] font-roboto ">
      <div className="grid grid-cols-1 md:grid-cols-2 my-16 gap-8">
        <div className="flex-grow w-full">
          <h1 className="lg:text-6xl text-[20px] sm:text-[32px] font-bold">
            {post?.title}
          </h1>
          <div className="flex items-center gap-3 mt-7 md:mt-16 ">
            <span className="">
              {post?.user.image ? (
                <Image
                  src={post?.user?.image}
                  alt=""
                  width={42}
                  height={42}
                  className="rounded-full "
                />
              ) : (
                <Image
                  src={"/avatar1.png"}
                  alt=""
                  width={42}
                  height={42}
                  className="rounded-full"
                />
              )}
            </span>
            <div>
              <span>
                <p>{post?.user?.name}</p>
                <p>{post?.user?.createdAt?.substring(0, 10)}</p>
              </span>
            </div>
          </div>
        </div>
        <div className="relative sm:h-[250px] md:h-[400px] hidden sm:block">
          <DisplayImage item={post} />
        </div>
      </div>
      <div className="flex flex-row -mt-10 md:mt-0 ">
        <div className="">
          <div
            className="lg:max-w-[60%] prose"
            dangerouslySetInnerHTML={{ __html: post?.desc }}
          />

          <div>
            <Comments postSlug={slug} />
          </div>
        </div>
        <Menu />
      </div>
    </section>
  );
};

export default SinglePage;
