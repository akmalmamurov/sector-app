"use client";
import { useSearchParams } from "next/navigation";
const SearchPage = () => {
  const searchParams = useSearchParams();

  const search = searchParams.get("query");

  return (
    <div>
      <h1 className="text-2xl font-bold text-center text-blue-600 uppercase">
        {search}
      </h1>
    </div>
  );
};

export default SearchPage;
