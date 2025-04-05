"use client";
import React from "react";
import Link from "next/link";
import { getFilter } from "@/api";
import { useQuery } from "@tanstack/react-query";

interface FilterOption {
  title: string;
  value: string;
  // Link turi uchun qo'shimcha url maydoni
  url?: string;
}

interface FilterItem {
  icon: string;
  name: string;
  type: string;
  title: string;
  options: FilterOption[];
}

interface CategoryLeftProps {
  slug: string;
  paramKey: string;
}

export const CategoryLeft: React.FC<CategoryLeftProps> = ({ slug, paramKey }) => {
  const { data, isLoading, isError } = useQuery<FilterItem[]>({
    queryKey: ["filter", slug],
    queryFn: () => getFilter(paramKey, slug),
  });

  if (isLoading) {
    return <div>Loading filters...</div>;
  }

  if (isError || !data) {
    return <div>Error loading filters.</div>;
  }

  return (
    <div className="col-span-3">
      <div className="bg-white p-[23px] shadow-sectionShadow">
        {data.map((filter, index) => (
          <div key={index} className="mb-6">
            {/* Filter sarlavhasi va ikonkasi */}
            <div className="flex items-center mb-2">
              {/* <img src={filter.icon} alt={filter.title} className="w-6 h-6 mr-2" /> */}
              <h3 className="text-xl font-bold">{filter.title}</h3>
            </div>
            <div className="ml-8">
              {/* Checkbox yoki import-checkbox turi */}
              {(filter.type === "checkbox" || filter.type === "import-checkbox") && (
                <ul>
                  {filter.options.map((option, idx) => (
                    <li key={idx} className="mb-1">
                      <label className="cursor-pointer">
                        <input
                          type="checkbox"
                          name={filter.name}
                          value={option.value}
                          className="mr-2"
                        />
                        {option.title}
                      </label>
                    </li>
                  ))}
                </ul>
              )}
              {/* Link turi */}
              {filter.type === "link" && (
                <ul>
                  {filter.options.map((option, idx) => (
                    <li key={idx} className="mb-1">
                      <Link href={option.url ?? "#"} className="text-blue-500 underline">
                        {option.title}
                      </Link>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CategoryLeft;
