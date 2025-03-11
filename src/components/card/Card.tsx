import React from "react";
import Image from "next/image";
import Link from "next/link";

const Card = () => {
  return (
    <div className="grid grid-cols-2 gap-5 ">
      <div className="relative h-[350px] ">
        <Image src={"/p1.jpeg"} fill alt="" className="object-cover" />
      </div>
      <div className="flex flex-col justify-between  w-full">
        <div className="flex-1">
          <span className="font-medium mr-3">01.02.2025-</span>
          <span className="font-medium text-red-500">Culture</span>
        </div>
        <div className="flex-2 h-full justify-between w-full flex flex-col">
          <h3 className="font-medium text-2xl my-5">
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Harum, ex!
          </h3>
          <p className="mb-8 -mt-9">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Saepe
            numquam nesciunt est dolor commodi consequatur deleniti
            reprehenderit, impedit sint? Numquam?
          </p>
          <Link href={"/"} className="underline font-medium items-end">
            Read More
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Card;
