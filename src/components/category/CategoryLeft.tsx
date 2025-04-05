"use client";
import React from "react";
import Link from "next/link";
import { getFilter } from "@/api";
import { useQuery } from "@tanstack/react-query";
import Image from "next/image";
import FilterIcon from "@/assets/icons/FilterIcon";

interface FilterOption {
  title: string;
  value: string;
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
  slug?: string;
  paramKey?: string;
}

export const CategoryLeft: React.FC<CategoryLeftProps> = ({
  slug,
  paramKey,
}) => {
  const { data, isLoading, isError } = useQuery<FilterItem[]>({
    queryKey: ["filter", slug],
    queryFn: () => getFilter(slug || "", paramKey || ""),
  });

  if (isLoading) {
    return <div>Loading filters...</div>;
  }

  if (isError || !data) {
    return <div>Error loading filters.</div>;
  }

  return (
    <div className="col-span-3">
      <div className="bg-white shadow-sectionShadow border border-superSilver rounded-[10px]">
        <div className="flex items-center gap-4 bg-white px-5 py-6 rounded-[10px]">
          <FilterIcon />
          <h3 className="text-base font-normal text-textColor">Фильтры</h3>
        </div>
        {data.map(
          (filter, index) =>
            filter.options.length > 0 && (
              <div key={index} className="mb-4">
                <div className="flex items-center mb-2 bg-background px-5 py-3">
                  <Image
                    src={filter.icon}
                    width={25}
                    height={25}
                    alt={filter.title}
                    className="w-6 h-6 mr-3"
                  />
                  <h3 className="text-base font-normal">{filter.title}</h3>
                </div>
                <div className="ml-8 pt-3">
                  {(filter.type === "checkbox" ||
                    filter.type === "import-checkbox") && (
                    <ul>
                      {filter.options.map((option, idx) => (
                        <li key={idx} className="mb-2.5 text-xs font-normal">
                          <label className="cursor-pointer flex items-center text-xs">
                            <input
                              type="checkbox"
                              name={filter.name}
                              value={option.value}
                              className="mr-2 w-4 h-4 text-[#E1E1E1]"
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
                          <Link
                            href={option.url ?? "#"}
                            className="text-blue-500 underline"
                          >
                            {option.title}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              </div>
            )
        )}
      </div>
    </div>
  );
};

export default CategoryLeft;
