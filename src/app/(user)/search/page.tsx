"use client";

import { useSearchParams } from "next/navigation";
import React, { Suspense } from "react";

const SearchPage = () => {
  const searchParams = useSearchParams();
  const search = searchParams.get("query");

  return (
    <div>
      <h1 className="text-2xl font-bold text-center text-blue-600 uppercase">
        {search || "No query provided"}
      </h1>
    </div>
  );
};

const SearchPageWrapper = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <SearchPage />
    </Suspense>
  );
};

export default SearchPageWrapper; 
