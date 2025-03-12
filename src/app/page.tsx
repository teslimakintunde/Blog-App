import CardList from "@/components/cardlist/CardList";
import CategoryList from "@/components/categoryList/CategoryList";
import Featured from "@/components/featured/Featured";
import Menu from "@/components/menu/Menu";
import React from "react";

interface HomePageProps {
  searchParams: { page?: string; cat?: string };
}

const HomePage: React.FC<HomePageProps> = ({ searchParams }) => {
  const page = parseInt(searchParams.page || "1", 10);
  const cat = searchParams.cat || ""; // Ensure `cat` is always defined

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
