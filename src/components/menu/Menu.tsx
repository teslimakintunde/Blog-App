import React from "react";

import Link from "next/link";
import MenuCard from "../menu-card/MenuCard";

const Menu = () => {
  return (
    <section className="max-w-[300px] hidden lg:block w-full mt-14">
      <div>
        <span className="text-xl">What is hot</span>
        <h3 className="text-3xl font-medium">Most Popular</h3>
      </div>
      <div className="mt-10 flex gap-7 flex-col ">
        <MenuCard withImage={false} />
        <MenuCard withImage={false} />
        <MenuCard withImage={false} />
      </div>
      <div className="my-10">
        <div className="mb-5">
          <p className="mt-14">Discover by Topic.</p>
          <h3 className="text-3xl font-medium mt-2">Categories</h3>
          <div className="flex flex-col gap-5 font-medium mt-8 ">
            <div className="flex flex-wrap gap-3">
              <Link
                href={"/blog?cat=style"}
                // className="bg-bgStyle py-1 px-10 flex items-center  w-[15%] justify-center rounded-md"
                className="border px-4  flex flex-row gap-3 items-center justify-center py-3"
              >
                Style
              </Link>
              <Link
                href={"/blog?cat=style"}
                className="border px-4  flex flex-row gap-3 items-center justify-center py-3"
              >
                Fashion
              </Link>
              <Link
                href={"/blog?cat=style"}
                className="border px-4  flex flex-row gap-3 items-center justify-center py-3"
              >
                Food
              </Link>
            </div>
            <div className="flex gap-5">
              <Link
                href={"/blog?cat=style"}
                className="border px-4  flex flex-row gap-3 items-center justify-center py-3"
              >
                Travel
              </Link>
              <Link
                href={"/blog?cat=style"}
                className="border px-4  flex flex-row gap-3 items-center justify-center py-3"
              >
                Culture
              </Link>
              <Link
                href={"/blog?cat=style"}
                className="border px-4  flex flex-row gap-3 items-center justify-center py-3"
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
