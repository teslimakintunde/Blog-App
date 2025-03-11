import React from "react";

const Pagination = () => {
  return (
    <div className="flex justify-between mt-10 w-[80%] ">
      <button className="bg-red-500 font-medium px-6 py-2 text-white rounded-sm">
        Previous
      </button>
      <button className="bg-red-500 font-medium px-6 py-2 text-white rounded-sm">
        Next
      </button>
    </div>
  );
};

export default Pagination;
