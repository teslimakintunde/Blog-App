import React from "react";
import Image from "next/image";

const Featured = () => {
  return (
    <section className="container mt-10 font-poppins">
      <h1 className="text-[75px] leading-none">
        <b> Hey, Tesak dev here!</b> Discover my stories and creative ideas.
      </h1>
      <div className="flex items-center gap-8 mt-[40px]">
        <div className="relative flex-1 h-[450px]">
          <Image
            src={"/hero-image.jpg"}
            alt=""
            fill
            className="object-cover rounded-md"
          />
        </div>
        <div className="flex-1 flex flex-col gap-5">
          <h1 className="text-4xl font-medium  ">
            Simple Waay to Inspire Your Inner Innovator
          </h1>
          <p>
            Lorem, ipsum dolor sit amet consectetur adipisicing elit.
            Distinctio, voluptatibus veritatis quibusdam rem non rerum quam
            praesentium eaque. Porro, alias!
          </p>
          <button className="font-medium bg-gray-300 px-6 py-2 rounded-md w-max">
            Read More
          </button>
        </div>
      </div>
    </section>
  );
};

export default Featured;
