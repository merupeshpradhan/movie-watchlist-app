"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";

export default function SearchBox() {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  const handleSearch = (term: string) => {
    const params = new URLSearchParams(searchParams);
    
    if (term) {
      params.set("search", term);
    } else {
      params.delete("search");
    }
    
    // Updates the URL instantly as you type without a full page reload
    replace(`${pathname}?${params.toString()}`);
  };

  return (
    <div className="mb-6 flex gap-2 max-w-md">
      <input
        type="text"
        placeholder="🔍 Search movies..."
        defaultValue={searchParams.get("search")?.toString() || ""}
        onChange={(e) => handleSearch(e.target.value)}
        className="border p-2 rounded w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
    </div>
  );
}
