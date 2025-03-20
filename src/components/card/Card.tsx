"use client";
import React from "react";
import Link from "next/link";
import { CldImage } from "next-cloudinary";
import Image from "next/image";
import DisplayText from "../display-text/DisplayText";

// Define the TypeScript type for Post
interface Post {
  id: string;
  createdAt: string;
  slug: string;
  title: string;
  desc: string;
  img?: string;
  views: number;
  catSlug: string;
}

// Function to remove HTML tags
const stripHtml = (html: string): string => {
  return html.replace(/<\/?[^>]+(>|$)/g, "");
};

// Define props type for Card component
interface CardProps {
  item: Post;
}
const Card: React.FC<CardProps> = ({ item }) => {
  return (
    <section className="grid grid-cols-1 md:gap-5 md:grid-cols-2">
      <div className="h-[350px]">
        {item.img ? (
          <div className="relative h-[320px]">
            <CldImage
              src={item?.img}
              alt="collection"
              className="object-cover rounded-lg"
              fill
            />
          </div>
        ) : (
          <div className="relative h-[300px]">
            <Image src={"/blog-image.jpg"} alt="" fill className="rounded-md" />
          </div>
        )}
      </div>
      <div className="h-full -mt-5 md:-mt-0  ">
        <div className="flex flex-row md:gap-3">
          <span>{new Date(item.createdAt).toISOString().split("T")[0]} - </span>
          <p className="capitalize text-red-400 font-bold">{item.catSlug}</p>
        </div>
        <div className="mt-5 mb-10">
          <h3 className="sm:text-3xl text-[20px] font-bold max-w-[20ch]">
            {stripHtml(item.title).length > 30
              ? stripHtml(item.title).substring(0, 30) + "..."
              : stripHtml(item.title)}
          </h3>

          {/* <div
            className="mt-3 md:max-w-[50ch] lg:max-w-[40ch] overflow-hidden"
            dangerouslySetInnerHTML={{
              __html:
                item.desc.length > 100
                  ? item.desc.substring(0, 100) + "..."
                  : item.desc,
            }}
          /> */}
          <DisplayText item={item} />
        </div>
        <Link
          href={`/posts/${item?.slug}`}
          className="px-6 py-2 bg-red-400 font-medium rounded-md text-white"
        >
          Read More
        </Link>
      </div>
    </section>
  );
};

export default Card;
