import Link from "next/link";
import React from "react";
import Image from "next/image";
const CategoryList = () => {
  return (
    <section className="container">
      <div>
        <h2 className="text-[50px] mt-10 font-medium mb-6 ">
          Popular Category
        </h2>
      </div>
      <div className="flex gap-5 flex-row">
        <Link
          href={"/blog?cat=style"}
          className="bg-bgStyle py-4 flex flex-row gap-5 items-center w-[15%] justify-center rounded-md"
        >
          <Image
            src={"/p1.jpeg"}
            alt=""
            width={32}
            height={32}
            className="rounded-full"
          />
          Style
        </Link>
        <Link
          href={"/blog?cat=style"}
          className="bg-bgFashion py-4 flex flex-row gap-5 items-center w-[15%] justify-center rounded-md"
        >
          <Image
            src={"/p1.jpeg"}
            alt=""
            width={32}
            height={32}
            className="rounded-full"
          />
          Fashion
        </Link>
        <Link
          href={"/blog?cat=style"}
          className="bg-bgFood py-4 flex flex-row gap-5 items-center w-[15%] justify-center rounded-md"
        >
          <Image
            src={"/p1.jpeg"}
            alt=""
            width={32}
            height={32}
            className="rounded-full"
          />
          Food
        </Link>
        <Link
          href={"/blog?cat=style"}
          className="bg-bgTravel py-4 flex flex-row gap-5 items-center w-[15%] justify-center rounded-md"
        >
          <Image
            src={"/p1.jpeg"}
            alt=""
            width={32}
            height={32}
            className="rounded-full"
          />
          Travel
        </Link>
        <Link
          href={"/blog?cat=style"}
          className="bg-bgCulture py-4 flex flex-row gap-5 items-center w-[15%] justify-center rounded-md"
        >
          <Image
            src={"/p1.jpeg"}
            alt=""
            width={32}
            height={32}
            className="rounded-full"
          />
          Culture
        </Link>
        <Link
          href={"/blog?cat=style"}
          className="bg-bgCoding py-4 flex flex-row gap-5 items-center w-[15%] justify-center rounded-md"
        >
          <Image
            src={"/p1.jpeg"}
            alt=""
            width={32}
            height={32}
            className="rounded-full"
          />
          Coding
        </Link>
      </div>
    </section>
  );
};

export default CategoryList;
