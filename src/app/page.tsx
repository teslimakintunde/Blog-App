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
    <section className="container font-roboto">
      <div className="overflow-hidden">
        <Featured />
      </div>

      <div className="mb-32">
        <CategoryList />
      </div>
      <div className="flex flex-row justify-between items-start -mt-[90px]">
        <CardList cat={cat} page={page} />
        <Menu />
      </div>
    </section>
  );
};

export default HomePage;
