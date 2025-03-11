import CardList from "@/components/cardlist/CardList";
import CategoryList from "@/components/categoryList/CategoryList";
import Featured from "@/components/featured/Featured";
import Menu from "@/components/menu/Menu";
import React from "react";

const HomePage = () => {
  return (
    <div className="font-roboto">
      <Featured />
      <CategoryList />
      <div className="container grid grid-cols-6">
        <CardList />
        <Menu />
      </div>
    </div>
  );
};

export default HomePage;
