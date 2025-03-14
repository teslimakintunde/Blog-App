"use client";
import React, { useEffect, useState } from "react";

interface ItemProps {
  item: {
    desc: string;
  };
}

const DisplayText: React.FC<ItemProps> = ({ item }) => {
  const [hasMounted, setHasMounted] = useState(false);

  useEffect(() => {
    setHasMounted(true);
  }, []);

  // Sanitize the content (use a library like DOMPurify for production)
  const sanitizedDesc =
    item.desc.length > 100 ? item.desc.substring(0, 100) + "..." : item.desc;

  return (
    <div className="mt-3 md:max-w-[50ch] lg:max-w-[40ch] overflow-hidden">
      {hasMounted ? (
        <div dangerouslySetInnerHTML={{ __html: sanitizedDesc }} />
      ) : (
        <div>{sanitizedDesc}</div> // Fallback for server-side rendering
      )}
    </div>
  );
};

export default DisplayText;
