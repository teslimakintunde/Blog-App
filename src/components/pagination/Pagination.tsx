"use client";
import { useRouter } from "next/navigation";
import React from "react";

type PaginationProps = {
  page: number;
  hasNext: boolean;
  hasPrev: boolean;
  cat?: string;
};

const Pagination = ({ page, hasNext, hasPrev, cat }: PaginationProps) => {
  const router = useRouter();

  const handleNavigation = (newPage: number) => {
    const params = new URLSearchParams();
    params.set("page", newPage.toString());
    if (cat) {
      params.set("cat", cat);
    }
    router.replace(`?${params.toString()}`, { scroll: false });
  };

  return (
    <section className="sm:max-w-[80%] w-full mt-16">
      <div className="flex justify-between max-w-[80%]">
        <button
          //onClick={() => router.push(`?page=${page - 1}`)}
          onClick={() => handleNavigation(page - 1)}
          disabled={!hasPrev}
          className="disabled:cursor-not-allowed disabled:opacity-50 px-6 py-2 bg-red-400 font-medium text-white rounded-sm"
        >
          Previous
        </button>
        <button
          disabled={!hasNext}
          //onClick={() => router.push(`?page=${page + 1}`)}
          onClick={() => handleNavigation(page + 1)}
          className="disabled:cursor-not-allowed disabled:opacity-50 px-6 py-2 bg-red-400 font-medium text-white rounded-sm"
        >
          Next
        </button>
      </div>
    </section>
  );
};

export default Pagination;
