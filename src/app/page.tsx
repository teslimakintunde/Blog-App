import CardList from "@/components/cardlist/CardList";
import CategoryList from "@/components/categoryList/CategoryList";
import Featured from "@/components/featured/Featured";
import Menu from "@/components/menu/Menu";
import React from "react";

interface HomePageProps {
  searchParams: Promise<{ page?: string; cat?: string }>;
}

const HomePage = async ({ searchParams }: HomePageProps) => {
  const params = await searchParams; // ✅ Await searchParams before using it

  const page = parseInt(params.page || "1", 10);
  const cat = params.cat || "";

  return (
    <div className="font-roboto">
      <Featured />
      <CategoryList />
      <div className="container grid grid-cols-6">
        <CardList page={page} cat={cat} />
        <Menu />
      </div>
    </div>
  );
};

export default HomePage;
