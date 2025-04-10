"use client";
import React from "react";
import Link from "next/link";
import { getFilter } from "@/api";
import { useQuery } from "@tanstack/react-query";
import Image from "next/image";
import FilterIcon from "@/assets/icons/FilterIcon";
import { Section } from "../section";
import { SearchIcon } from "@/assets/icons";
import { Checkbox } from "../ui/checkbox";
import { CatalogData, CategoryData } from "@/types";

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
  catalogItem?: CatalogData;
}

export const CategoryLeft: React.FC<CategoryLeftProps> = ({
  slug,
  paramKey,
  catalogItem,
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
      <Section className="rounded-[10px] p-0 shadow-sectionShadow">
        <div className="flex items-center gap-4 bg-white p-5 rounded-[10px]">
          <FilterIcon className="w-6 h-6" />
          <h3 className="text-base font-normal text-textColor">Фильтры</h3>
        </div>
        <div className="mb-4">
          <div className="flex items-center mb-2 bg-background px-5 py-3">
            <Image
              src={"/subcategories.svg"}
              width={25}
              height={25}
              alt={"subcategories"}
              className="w-6 h-6 mr-3"
            />
            <h3 className="text-sm font-normal text-textColor">Подкатегории</h3>
          </div>
          <div className="px-5 pt-3">
            <ul className="list-disc pl-4">
              {(catalogItem?.categories as CategoryData[]).map(
                (category, idx) => (
                  <li key={idx} className="mb-1 marker:text-textColor">
                    <Link
                      href={`/catalog/${catalogItem?.slug}/${category.slug}`}
                      className="hover:text-blue-500 transition-colors duration-200 text-xs font-normal text-textColor"
                    >
                      {category.title}
                    </Link>
                  </li>
                )
              )}
            </ul>
          </div>
        </div>
        {data.map(
          (filter, index) =>
            filter.options?.length > 0 && (
              <div key={index} className="mb-4">
                <div className="flex items-center mb-2 bg-background px-5 py-3">
                  <Image
                    src={filter.icon}
                    width={25}
                    height={25}
                    alt={filter.title}
                    className="w-4 h-4 mr-3"
                  />
                  <h3 className="text-sm font-normal text-textColor">
                    {filter.title}
                  </h3>
                </div>
                <div className="px-5 pt-3">
                  {(filter.type === "checkbox" ||
                    filter.type === "import-checkbox") && (
                    <ul>
                      {filter.options.map((option, idx) => (
                        <li key={idx} className="mb-2.5 text-xs font-normal">
                          <label className="cursor-pointer flex items-center text-xs font-normal text-textColor">
                            <Checkbox
                              value={option.value}
                              onCheckedChange={() => {}}
                              className="mr-2.5 w-4 h-4 border rounded-[3px] border-[#E1E1E1]"
                            />
                            {option.title}
                          </label>
                        </li>
                      ))}
                    </ul>
                  )}
                  {/* Link turi */}
                  {filter.type === "link" && (
                    <div>
                      <div className="flex items-center gap-2 relative mb-5">
                        <input
                          type="text"
                          className="w-full text-textColor text-base border placeholder:text-darkSoul border-superSilver rounded-[10px] px-3.5 py-2.5 pr-10"
                          placeholder="Быстрый поиск"
                        />
                        <SearchIcon
                          color="#333333"
                          className="w-6 h-6 absolute right-3"
                        />
                      </div>
                      <ul className="overflow-y-auto scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100 max-h-[225px]">
                        {filter.options.map((option, idx) => (
                          <li key={idx} className="mb-1">
                            <Link
                              href={option.url ?? "#"}
                              className="hover:text-blue-500 transition-colors duration-200 text-xs font-normal text-textColor"
                            >
                              {option.title}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              </div>
            )
        )}
      </Section>
    </div>
  );
};

export default CategoryLeft;
