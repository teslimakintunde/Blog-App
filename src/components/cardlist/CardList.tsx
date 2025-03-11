import React from "react";
import Card from "../card/Card";
import Pagination from "../pagination/Pagination";

const CardList = () => {
  return (
    <section className="col-span-4">
      <div>
        <h3 className="text-4xl font-bold my-16">Recent Post</h3>
        <div className="flex gap-5 flex-col">
          <Card />
          <Card />
          <Card />
        </div>
        <Pagination />
      </div>
    </section>
  );
};

export default CardList;
