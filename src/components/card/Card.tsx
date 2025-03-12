import React from "react";
import Image from "next/image";
import Link from "next/link";

interface Post {
  id: string;
  title: string;
  desc: string; // ✅ Added missing `desc`
  slug: string;
  createdAt: string;
  img?: string; // Optional image property
  views: number;
  catSlug: string; // ✅ Added missing `catSlug`
  userEmail: string;
}

// Define props type
interface CardProps {
  item: Post;
}

const Card: React.FC<CardProps> = ({ item }) => {
  return (
    <div className="grid grid-cols-2 gap-5 ">
      {item.img ? (
        <div className="relative h-[350px] ">
          <Image src={item.img} fill alt="" className="object-cover" />
        </div>
      ) : (
        <div className="relative h-[350px] ">
          <Image src={"/p1.jpeg"} fill alt="" className="object-cover" />
        </div>
      )}

      <div className="flex flex-col justify-between  w-full">
        <div className="flex-1">
          <span className="font-medium mr-3">
            {item.createdAt.substring(0, 10)}-
          </span>
          <span className="font-medium text-red-500">{item.catSlug}</span>
        </div>
        <div className="flex-2 h-full justify-between w-full flex flex-col">
          <Link
            href={`/posts/${item.slug}`}
            className="font-medium text-2xl my-5"
          >
            {item.title}
          </Link>
          <p className="mb-8 -mt-9">{item.desc.substring(0, 60)}</p>
          <Link
            href={`/posts/${item.slug}`}
            className="underline font-medium items-end"
          >
            Read More
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Card;
