import React from "react";
import Image from "next/image";

import Menu from "@/components/menu/Menu";
import Comments from "@/components/comments/page";
import DisplayImage from "@/components/display-image/DisplayImage";

const getPost = async (slug: string) => {
  try {
    const res = await fetch(`http://localhost:3000/api/posts/${slug}`);
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
    // <section className="container font-roboto">
    //   <div className="grid grid-cols-2 gap-6">
    //     <div>
    //       <h1 className="text-5xl leading-[65px] font-bold ">
    //         Lorem ipsum dolor sit, amet consectetur adipisicing elit. Doloribus,
    //         voluptas!
    //       </h1>
    //       <div className="flex flex-row gap-2 mt-16">
    //         <span>
    //           <Image
    //             src={"/logo (1).png"}
    //             height={40}
    //             width={40}
    //             alt=""
    //             className="rounded-full"
    //           />
    //         </span>
    //         <span>
    //           <p className="font-medium text-xl">Williams Randaph</p>
    //           <p>25. April 2025</p>
    //         </span>
    //       </div>
    //     </div>
    //     <div className="relative h-[400px] ">
    //       <Image
    //         src={"/p1.jpeg"}
    //         fill
    //         alt=""
    //         className="object-cover rounded-md"
    //       />
    //     </div>
    //   </div>
    //   <div className="grid grid-cols-6">
    //     <Comments />
    //     <Menu />
    //   </div>
    // </section>
    <section className="container pt-[70px] md:pt-[120px] font-roboto ">
      <div className="grid grid-cols-1 md:grid-cols-2 my-16 gap-8">
        <div className="flex-grow w-full">
          <h1 className="lg:text-6xl text-[20px] sm:text-[32px] font-bold">
            {post?.title}
          </h1>
          <div className="flex gap-3 mt-7 md:mt-16 ">
            <span className="">
              {post?.user.image && (
                <Image
                  src={post?.user?.image}
                  alt=""
                  width={42}
                  height={42}
                  className="rounded-full "
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
