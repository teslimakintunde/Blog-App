import React from "react";
import Image from "next/image";
import Link from "next/link";

type MenuCardProps = {
  withImage?: boolean;
};

const MenuCard: React.FC<MenuCardProps> = ({ withImage }) => {
  return (
    <Link href={"/"} className="col-span-2">
      <div className={`${withImage && "flex flex-row gap-4"}`}>
        <div className="flex gap-4">
          {withImage && (
            <div className="relative w-[32] h-[32] rounded-full shrink-0">
              <Image
                src={"/avatar2.png"}
                width={32}
                height={32}
                alt=""
                className="rounded-full"
              />
            </div>
          )}
        </div>
        <div>
          <span className="px-6 py-2 bg-red-400 text-white font-medium rounded-full">
            Travel
          </span>
          <p className="mt-3 font-medium">
            Lorem ipsum dolor sit amet, consectetur adipisicing elit.
            Recusandae, eos.
          </p>
          <div className="mt-3 flex gap-5 font-medium">
            <span>John Doe</span>
            <span>01.02.2025</span>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default MenuCard;
