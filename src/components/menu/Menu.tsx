import React from "react";

import Link from "next/link";
import MenuCard from "../menu-card/MenuCard";

const Menu = () => {
  return (
    <section className="col-span-2">
      <p className="mt-14">What is hot</p>
      <h3 className="text-4xl font-bold ">Most Popular</h3>
      <div className="mt-10 flex gap-7 flex-col ">
        <MenuCard withImage={false} />
        <MenuCard withImage={false} />
        <MenuCard withImage={false} />
      </div>
      <div>
        <div>
          <p className="mt-14">Discover by Topic</p>
          <p className="text-4xl font-bold ">Categories</p>
          <div className="flex flex-col gap-5 font-medium mt-8 ">
            <div className="flex gap-5 font-medium">
              <Link
                href={"/blog?cat=style"}
                className="bg-bgStyle py-1 px-10 flex items-center  w-[15%] justify-center rounded-md"
              >
                Style
              </Link>
              <Link
                href={"/blog?cat=style"}
                className="bg-bgFashion py-1 px-10 flex items-center  w-[15%] justify-center rounded-md"
              >
                Fashion
              </Link>
              <Link
                href={"/blog?cat=style"}
                className="bg-bgFood py-1 px-10 flex items-center  w-[15%] justify-center rounded-md"
              >
                Food
              </Link>
            </div>
            <div className="flex gap-5">
              <Link
                href={"/blog?cat=style"}
                className="bg-bgTravel py-1 px-10 flex items-center  w-[15%] justify-center rounded-md"
              >
                Travel
              </Link>
              <Link
                href={"/blog?cat=style"}
                className="bg-bgCulture py-1 px-10 flex items-center  w-[15%] justify-center rounded-md"
              >
                Culture
              </Link>
              <Link
                href={"/blog?cat=style"}
                className="bg-bgCoding py-1 px-10 flex items-center  w-[15%] justify-center rounded-md"
              >
                Coding
              </Link>
            </div>
          </div>
        </div>
      </div>
      <div>
        <div className="mb-9">
          <p className="mt-14">Choosen by the Editor</p>
          <h3 className="text-4xl font-bold ">Editor&apos;s Pick</h3>
        </div>
        <div className="flex flex-col gap-8">
          <MenuCard withImage={true} />
          <MenuCard withImage={true} />
          <MenuCard withImage={true} />
        </div>
      </div>
    </section>
  );
};

export default Menu;
