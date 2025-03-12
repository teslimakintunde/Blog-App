import React from "react";
import Card from "../card/Card";
import Pagination from "../pagination/Pagination";

// Define the Post type based on Prisma schema
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

// Define the response type for API
interface ApiResponse {
  posts: Post[];
  count: number;
}

// Define the props for CardList
interface CardListProps {
  page: number;
  cat?: string;
}

const getData = async (
  page: number,
  cat?: string
): Promise<ApiResponse | null> => {
  try {
    const apiRes = await fetch(
      `http://localhost:3000/api/posts?page=${page}&cat=${cat ?? ""}`
    );
    if (!apiRes.ok) throw new Error("Failed to fetch data");

    return apiRes.json();
  } catch (error) {
    console.log(error);
    return null;
  }
};

const CardList: React.FC<CardListProps> = async ({ page, cat }) => {
  // const { posts, count } = await getData(page, cat);
  const data = await getData(page, cat);
  if (!data) return <p className="text-red-500">Failed to load posts</p>;

  const { posts, count } = data;

  const POST_PER_PAGE = 2;

  const hasPrev = POST_PER_PAGE * (page - 1) > 0;
  const hasNext = POST_PER_PAGE * (page - 1) + POST_PER_PAGE < count;

  return (
    <section className="col-span-4">
      <div>
        <h3 className="text-4xl font-bold my-16">Recent Post</h3>
        <div className="flex gap-5 flex-col">
          {/* {posts && posts?.map((item) => <Card key={item.id} item={item} />)} */}
          {posts.length > 0 ? (
            posts.map((item: Post) => <Card key={item.id} item={item} />)
          ) : (
            <p>No posts available.</p>
          )}
        </div>
        <Pagination page={page} hasNext={hasNext} hasPrev={hasPrev} />
      </div>
    </section>
  );
};

export default CardList;
