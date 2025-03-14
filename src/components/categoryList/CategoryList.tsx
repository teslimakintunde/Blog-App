import Link from "next/link";
import React from "react";
import Image from "next/image";

// Define the category type
type Category = {
  id: string;
  title: string;
  slug: keyof typeof bgClass; // Ensure the slug matches one of the bgClass keys
  img?: string;
};

// Define background class mappings
const bgClass: Record<string, string> = {
  sport: "bg-sport",
  travel: "bg-travel",
  coding: "bg-coding",
  fashion: "bg-fashion",
  food: "bg-food",
  culture: "bg-culture",
};

const getData = async (): Promise<Category[] | null> => {
  // const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000/api";
  // const apiRes = await fetch(`${apiUrl}/categories`);

  const BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000"; // Default to localhost if not in Vercel
  try {
    //const apiRes = await fetch("http://localhost:3000/api/categories");
    const apiRes = await fetch(`${BASE_URL}/api/categories`);
    if (!apiRes.ok) throw new Error("Failed to fetch data");
    const result: Category[] = await apiRes.json();
    return result;
  } catch (error) {
    console.log(error);
    return null;
  }
};

const CategoryList = async () => {
  const data = await getData();

  return (
    <section className="container lg:mt-[10px]">
      <div>
        <h2 className="text-[30px] md:text-4xl font-medium mb-5">
          Popular Category
        </h2>
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-3 items-center lg:grid-cols-6 gap-5 flex-wrap lg:flex-shrink-0">
        {data &&
          data.map((item) => (
            <Link
              key={item.id}
              href={`blog?cat=${item.slug}`}
              className={`${
                bgClass[item.slug]
              } border  w-full flex h-full flex-row gap-3 items-center justify-center py-3`}
            >
              <div>
                {item.img && (
                  <Image
                    src={item?.img}
                    alt=""
                    width={32}
                    height={32}
                    className="rounded-full"
                  />
                )}
              </div>
              <p className="text-[1rem]">{item.title}</p>
            </Link>
          ))}
      </div>
    </section>
  );
};

export default CategoryList;
