"use client";
import { useParams } from "next/navigation";

const CategoryPage = () => {
  const { subSlug} = useParams();
  
  return (
    <div>
      <h1>CategoryPage</h1>
      <h3>{subSlug}</h3>
    </div>
  );
};

export default CategoryPage;
