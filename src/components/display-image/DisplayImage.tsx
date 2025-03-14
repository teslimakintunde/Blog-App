"use client";

import { CldImage } from "next-cloudinary";
import Image from "next/image";

type DisplayImageProps = {
  item: {
    img?: string;
  };
};

const DisplayImage = ({ item }: DisplayImageProps) => {
  return (
    <div className="relative sm:h-[250px] md:h-[400px] hidden sm:block">
      {item.img ? (
        <div className="relative h-[320px]">
          <CldImage
            src={item?.img}
            alt="collection"
            className="object-cover rounded-lg"
            fill
          />
        </div>
      ) : (
        <div className="relative h-[300px]">
          <Image src={"/p1.jpeg"} alt="" fill />
        </div>
      )}
    </div>
  );
};

export default DisplayImage;
