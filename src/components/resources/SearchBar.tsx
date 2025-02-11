// "use client";

// import { Search } from "lucide-react";

// const resourceTypes = [
//   { value: "all", label: "All Resources" },
//   { value: "articles", label: "Articles & Blogs" },
//   { value: "whitepapers", label: "Whitepapers" },
//   { value: "webinars", label: "Webinars" },
//   { value: "workshops", label: "Workshops" },
// ];

// export function SearchBar() {
//   return (
//     <div className="container py-8">
//       <div className="mx-auto flex max-w-[64rem] flex-col gap-4 sm:flex-row">
//         <div className="relative flex-1">
//           <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
//           <input
//             type="text"
//             placeholder="Search by topic, industry, or solution type..."
//             className="h-10 w-full rounded-md border border-input bg-background pl-9 pr-3 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
//           />
//         </div>
//         <select
//           className="h-10 w-full rounded-md border border-input bg-background px-3 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 sm:w-[200px]"
//           defaultValue="all"
//         >
//           {resourceTypes.map((type) => (
//             <option key={type.value} value={type.value}>
//               {type.label}
//             </option>
//           ))}
//         </select>
//       </div>
//     </div>
//   );
// } 



import React, { useRef } from "react";

export function SearchBar({ onSearch }: { onSearch: (keyword: string) => void }) {
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    onSearch(event.target.value); // Pass the typed keyword to the parent
  };

  const inputRef = useRef<HTMLInputElement>(null);

  const handleClick = () => {
    inputRef.current?.focus();
  };


  return (
    <div className="search-filter my-5 text-center" onClick={handleClick}>
      <input
        ref={inputRef}
        type="text"
        placeholder="Search by topic, industry, or solution type..."
        className="w-full max-w-[400px] p-3 border rounded-md"
        onChange={handleInputChange}
      />
    </div>
  );
}

