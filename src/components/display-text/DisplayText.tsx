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

// "use client";
// import React, { useEffect, useState } from "react";
// import DOMPurify from "dompurify";

// interface ItemProps {
//   item: {
//     desc: string;
//   };
// }

// const DisplayText: React.FC<ItemProps> = ({ item }) => {
//   const [hasMounted, setHasMounted] = useState(false);

//   useEffect(() => {
//     setHasMounted(true);
//   }, []);

//   // Sanitize and optionally truncate the HTML content
//   const sanitizeAndTruncate = (html: string, maxLength: number = 100) => {
//     const sanitized = DOMPurify.sanitize(html); // Remove unsafe tags/scripts
//     if (sanitized.length > maxLength) {
//       // Truncate while preserving HTML structure (simplified)
//       const tempDiv = document.createElement("div");
//       tempDiv.innerHTML = sanitized;
//       const textContent = tempDiv.textContent || tempDiv.innerText || "";
//       if (textContent.length > maxLength) {
//         return sanitized.substring(0, maxLength) + "..."; // Fallback truncation
//       }
//       return sanitized; // Return full if text content fits
//     }
//     return sanitized;
//   };

//   const sanitizedDesc = sanitizeAndTruncate(item.desc);

//   console.log("Raw desc:", item.desc);
//   console.log("Sanitized desc:", sanitizedDesc);

//   return (
//     <div className="mt-3 md:max-w-[50ch] lg:max-w-[40ch]">
//       {hasMounted ? (
//         <div
//           className="prose prose-sm md:prose-base"
//           dangerouslySetInnerHTML={{ __html: sanitizedDesc }}
//         />
//       ) : (
//         <div className="prose prose-sm md:prose-base">
//           {sanitizedDesc.replace(/<[^>]+>/g, "")} {/* Strip HTML for SSR */}
//         </div>
//       )}
//     </div>
//   );
// };

// export default DisplayText;
