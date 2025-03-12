import React from "react";
import Image from "next/image";

import Menu from "@/components/menu/Menu";
import Comments from "@/components/comments/page";

const SinglePage = () => {
  return (
    <section className="container font-roboto">
      <div className="grid grid-cols-2 gap-6">
        <div>
          <h1 className="text-5xl leading-[65px] font-bold ">
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Doloribus,
            voluptas!
          </h1>
          <div className="flex flex-row gap-2 mt-16">
            <span>
              <Image
                src={"/logo (1).png"}
                height={40}
                width={40}
                alt=""
                className="rounded-full"
              />
            </span>
            <span>
              <p className="font-medium text-xl">Williams Randaph</p>
              <p>25. April 2025</p>
            </span>
          </div>
        </div>
        <div className="relative h-[400px] ">
          <Image
            src={"/p1.jpeg"}
            fill
            alt=""
            className="object-cover rounded-md"
          />
        </div>
      </div>
      <div className="grid grid-cols-6">
        <Comments />
        <Menu />
      </div>
    </section>
  );
};

export default SinglePage;
