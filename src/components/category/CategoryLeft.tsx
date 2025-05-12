"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { getFilter } from "@/api";
import { useQuery } from "@tanstack/react-query";
import Image from "next/image";
import FilterIcon from "@/assets/icons/FilterIcon";
import { Section } from "../section";
import { SearchIcon } from "@/assets/icons";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { CatalogData, CategoryData, SubcatalogData } from "@/types";
import CustomRangeSlider from "../slider/CustomRangeSlider";
import { useSetOptionsQuery } from "@/hooks/useSetOptionsQuery";
import { useGetOptionsQuery } from "@/hooks/useGetOptionsQuery";

interface FilterOption {
  title: string;
  value: string;
  url?: string;
  productCount?: number;
  name?: string;
}

interface FilterItem {
  icon: string;
  name: string;
  type: string;
  title: string;
  options: FilterOption[];
  withSearch?: boolean;
}

interface CategoryLeftProps {
  slug?: string;
  paramKey?: string;
  catalogItem?: CatalogData;
  mainSlug?: string;
}
export interface FilterOptionRequest {
  name: string;
  options: { name: string | undefined }[];
}

export const CategoryLeft: React.FC<CategoryLeftProps> = ({
  slug,
  paramKey,
  catalogItem,
  mainSlug,
}) => {
  const { getOptions } = useGetOptionsQuery();
  const [filterCheckedData, setFilterCheckedData] =
    useState<FilterOptionRequest[]>(getOptions());
  const { data, isLoading, isError } = useQuery<FilterItem[]>({
    queryKey: ["filter", slug, paramKey],
    queryFn: () => getFilter(slug || "", paramKey || ""),
  });
  const { setOptions } = useSetOptionsQuery();

  // const { data: filterSearch } = useQuery<FilterSearchItem>({
  //   queryKey: ["filterSearch", filterCheckedData, mainSlug, slug, paramKey],
  //   queryFn: () =>
  //     getFilterSearch({
  //       subcatalogSlug: mainSlug ? null : slug,
  //       categorySlug: mainSlug ? slug : null,
  //       options: filterCheckedData.map((filter) => ({
  //         name: filter.name,
  //         options: filter.options.map((option) => ({
  //           name: option.name || null,
  //         })),
  //       })),
  //     }),
  // });
  // console.log(filterSearch);

  useEffect(() => {
    setOptions(
      filterCheckedData.map((filter) => ({
        name: filter.name,
        options: filter.options.map((option) => ({ name: option.name || "" })),
      }))
    );
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filterCheckedData]);
  const [isShow, setIsShow] = useState(false);

  if (isLoading) {
    return <div>Loading filters...</div>;
  }

  if (isError || !data) {
    return <div>Error loading filters.</div>;
  }

  function handleLinkClick(filterName: string, url: string) {
    console.log(url);
    console.log(filterName);
    console.log(mainSlug);
    console.log(slug);
  }

  const handleFilterChecked = (filter: FilterOption, name: string) => {
    if (
      filterCheckedData.some(
        (item) =>
          item.name === name &&
          item.options.some((option) => option.name === filter.name)
      )
    ) {
      if (
        filterCheckedData.some(
          (item) => item.name === name && item.options.length === 1
        )
      ) {
        setFilterCheckedData(
          filterCheckedData.filter((item) => item.name !== name)
        );
      } else {
        setFilterCheckedData(
          filterCheckedData.map((item) =>
            item.name === name
              ? {
                  ...item,
                  options: item.options.filter(
                    (option) => option.name !== filter.name
                  ),
                }
              : item
          )
        );
      }
    } else if (filterCheckedData.some((item) => item.name === name)) {
      setFilterCheckedData(
        filterCheckedData.map((item) =>
          item.name === name
            ? { ...item, options: [...item.options, { name: filter.name }] }
            : item
        )
      );
    } else {
      setFilterCheckedData((prev) => [
        ...prev,
        { name: name, options: [{ name: filter.name }] },
      ]);
    }
  };

  return (
    <div className="col-span-3 hidden lg:flex">
      <Section className="rounded-[10px] p-0 shadow-sectionShadow">
        <div className="flex items-center gap-4 bg-white p-5 rounded-[10px]">
          <FilterIcon className="w-6 h-6" />
          <h3 className="text-base font-normal text-textColor">Фильтры</h3>
        </div>

        {(catalogItem?.categories?.length || 0) > 0 ||
          ((catalogItem?.subcatalogs?.length || 0) > 0 && (
            <div className="mb-4">
              <div className="flex items-center mb-2 bg-background px-5 py-3">
                <Image
                  src={"/subcategories.svg"}
                  width={25}
                  height={25}
                  alt={"categories"}
                  className="w-6 h-6 mr-3"
                />
                <h3 className="text-sm font-normal text-textColor">
                  Подкатегории
                </h3>
              </div>
              <div className="px-5 pt-3">
                <ul className="list-disc pl-5 pb-2">
                  {(
                    (catalogItem?.categories as CategoryData[]) ||
                    (catalogItem?.subcatalogs as SubcatalogData[])
                  )?.map((category, idx) => (
                    <li key={idx} className="mb-1 marker:text-textColor">
                      <Link
                        href={`/catalog/${catalogItem?.slug}/${category.slug}`}
                        className="hover:text-blue-500 transition-colors duration-200 text-xs font-normal text-textColor"
                      >
                        {category.title}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}

        {data.slice(0, isShow ? data?.length : 5).map((filter, index) => (
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
                  {filter.options?.map((option, idx) => (
                    <li key={idx} className="mb-2.5 text-xs font-normal">
                      <label className="cursor-pointer flex items-center text-xs font-normal text-textColor">
                        <Checkbox
                          checked={filterCheckedData.some(
                            (item) =>
                              item.name === filter.name &&
                              item.options.some(
                                (itemOption) => itemOption.name === option.name
                              )
                          )}
                          value={option.value}
                          onCheckedChange={() =>
                            handleFilterChecked(option, filter.name)
                          }
                          className="mr-2.5 w-[18px] h-[18px] border rounded-[3px] border-[#E1E1E1]"
                        />
                        {option.title} ({option.productCount})
                      </label>
                    </li>
                  ))}
                </ul>
              )}
              {filter.name === "tsena" && (
                <>
                  <CustomRangeSlider />
                </>
              )}
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
                  <ul className="overflow-y-auto scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100 max-h-[225px] pl-1">
                    {filter.options?.map((option, idx) => (
                      <li key={idx} className="mb-1">
                        <Link
                          onClick={() =>
                            handleLinkClick(filter.name, option.name || "")
                          }
                          href={option.name || ""}
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
        ))}
        {data?.length > 5 && (
          <Button
            onClick={() => setIsShow(!isShow)}
            className="w-full rounded-none text-white text-base font-semibold bg-cerulean mt-4 h-[42px] hover:bg-cerulean/85"
          >
            {" "}
            {isShow ? "Скрыть фильтры" : `Все фильтры (+${data?.length - 5})`}
          </Button>
        )}
      </Section>
    </div>
  );
};

export default CategoryLeft;
