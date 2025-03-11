import React from "react";
import Image from "next/image";
import Link from "next/link";

type MenuCardProps = {
  withImage?: boolean;
};

const MenuCard: React.FC<MenuCardProps> = ({ withImage }) => {
  return (
    <Link href={"/"} className="">
      <div className={`${withImage && "flex flex-row gap-4"}`}>
        <div className="">
          {withImage && (
            <Image
              src={"/p1.jpeg"}
              width={32}
              height={32}
              alt=""
              className="rounded-full"
            />
          )}
        </div>
        <div>
          <span className="bg-red-600 font-medium rounded-full px-8 py-1 text-white">
            Travel
          </span>
          <p className="my-2 font-medium">
            Lorem ipsum dolor sit amet, consectetur adipisicing elit.
            Recusandae, eos.
          </p>
          <div className="space-x-4">
            <span>John Doe</span>
            <span>01.02.2025</span>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default MenuCard;
