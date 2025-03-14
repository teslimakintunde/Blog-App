import React from "react";
import Image from "next/image";

const Featured = () => {
  return (
    <section className="container lg:pb-[150px] font-roboto lg:-mb-[150px]">
      <div className="py-[60px]">
        <h1 className="text-[32px] sm:text-[40px] md:text-[60px] lg:text-[80px] leading-snug md:leading-none md:my-20 my-10">
          <b>Hi, I&apos;m Tesak!</b> Explore my stories and creative
          inspirations.
        </h1>
        <div className="grid md:grid-cols-2 grid-cols-1 items-center gap-9">
          <div className="relative sm:h-[330px] h-[250px] ">
            <Image
              src={"/hero-image.jpg"}
              alt=""
              fill
              className="object-cover rounded-md"
            />
          </div>
          <div className="">
            <h1 className="text-[20px] md:text-5xl font-bold">
              Simple Tips to Unleash Your Innovative Spirit
            </h1>
            <p className="my-7 text-gray-600">
              Lorem ipsum dolor sit amet consectetur, adipisicing elit. Minima
              soluta dignissimos iste reiciendis at aliquam debitis, quo
              sapiente id molestiae.
            </p>
            <button className="font-medium text-xl px-6 py-2 bg-red-400 text-white rounded-sm">
              Read More
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Featured;
