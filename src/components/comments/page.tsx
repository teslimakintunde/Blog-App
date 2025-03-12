import Link from "next/link";
import React from "react";
import Image from "next/image";

const Comments = () => {
  const status = "authenticated";

  return (
    <div className="col-span-4 my-16">
      <div className="my-15">
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Quos, dolore
          quis? Excepturi sit facilis optio itaque libero dolores iste aliquid.
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Quos, dolore
          quis? Excepturi sit facilis optio itaque libero dolores iste aliquid.
        </p>
        <p className="my-8">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Quos, dolore
          quis? Excepturi sit facilis optio itaque libero dolores iste aliquid.
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Quos, dolore
          quis? Excepturi sit facilis optio itaque libero dolores iste aliquid.
        </p>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Quos, dolore
          quis? Excepturi sit facilis optio itaque libero dolores iste aliquid.
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Quos, dolore
          quis? Excepturi sit facilis optio itaque libero dolores iste aliquid.
        </p>
      </div>
      <div className="my-32">
        {status === "authenticated" ? (
          <div className="flex flex-row gap-5 items-start">
            <div className="w-4/5 h-[150px] border-solid border">
              <textarea
                placeholder="write a comments"
                className="border border-solid w-full h-full p-5"
              />
            </div>
            <button className="bg-red-400 text-white justify-start font-medium px-6 py-2 rounded-sm w-max">
              Send
            </button>
          </div>
        ) : (
          <Link href={"/login"}>Login to write comments</Link>
        )}
      </div>
      <div className="flex gap-10 flex-col">
        {/* First User */}
        <div className="">
          <span className="flex gap-3">
            <Image
              src={"/logo (1).png"}
              alt=""
              width={40}
              height={40}
              className="rounded-full"
            />
            <span>
              <p className="font-medium text-xl">John Doeee</p>
              <p>01.02.2025</p>
            </span>
          </span>
          <p className="mt-7 max-w-[70ch]">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Doloribus
            tempore pariatur laboriosam eum at distinctio ad! Maxime modi odio
            eum?
          </p>
        </div>
        {/* First User */}
        <div className="">
          <span className="flex gap-3">
            <Image
              src={"/logo (1).png"}
              alt=""
              width={40}
              height={40}
              className="rounded-full"
            />
            <span>
              <p className="font-medium text-xl">John Doeee</p>
              <p>01.02.2025</p>
            </span>
          </span>
          <p className="mt-7 max-w-[70ch]">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Doloribus
            tempore pariatur laboriosam eum at distinctio ad! Maxime modi odio
            eum?
          </p>
        </div>
      </div>
    </div>
  );
};

export default Comments;
