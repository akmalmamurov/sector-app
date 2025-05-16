"use client";
import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import FilterIcon from "@/assets/icons/FilterIcon";
import { Section } from "../section";
import { SearchIcon } from "@/assets/icons";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { CatalogData, CategoryData, SubcatalogData } from "@/types";
import CustomRangeSlider from "../slider/CustomRangeSlider";

interface FilterOption {
  title: string;
  value?: string;
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
  data: FilterItem[];
  isLoading: boolean;
  isError: boolean;
}
interface FilterOptionRequest {
  name: string;
  options: { name: string | undefined }[];
}

export const CategoryLeft: React.FC<CategoryLeftProps> = ({
  slug,
  catalogItem,
  mainSlug,
  data,
  isLoading,
  isError,
}) => {
  const [isShow, setIsShow] = useState(false);
  const [isShowOptionsMap, setIsShowOptionsMap] = useState<{
    [key: string]: boolean;
  }>({});
  const [filterCheckedData, setFilterCheckedData] = useState<
    FilterOptionRequest[]
  >([]);

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

  const toggleShowOptions = (filterName: string) => {
    setIsShowOptionsMap((prev) => ({
      ...prev,
      [filterName]: !prev[filterName],
    }));
  };

  const customFilter = [
    {
      title: "Актуальность товара",
      icon: "/filter.svg",
      type: "checkbox",
      name: "актуальность-товара",
      options: [
        {
          title: "Актуальность",
          name: "актуальность-товара",
          productCount: 10,
        },
        {
          title: "Снято с производства (EoS)",
          name: "снято-с-производства-eos",
          productCount: 10,
        },
      ],
    },
    {
      title: "Состояние товара",
      icon: "/filter.svg",
      type: "checkbox",
      name: "состояние-товара",
      options: [
        {
          title: "Seller RFB",
          name: "seller-rfb",
          productCount: 10,
        },
        {
          title: "Новый",
          name: "новый",
          productCount: 10,
        },
      ],
    },
  ];

  return (
    <div className="col-span-3 hidden lg:flex items-start w-full">
      <Section className="rounded-[10px] p-0 shadow-sectionShadow w-full">
        <div className="flex items-center gap-4 bg-white p-5 rounded-[10px]">
          <FilterIcon className="w-6 h-6" />
          <h3 className="text-base font-normal text-textColor">Фильтры</h3>
        </div>

        {!mainSlug && (
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
        )}
        <div className="flex flex-col gap-4">
          {data?.slice(0, isShow ? data.length : 5).map((filter, index) => {
            if (
              (filter.type === "checkbox" ||
                filter.type === "import-checkbox") &&
              !filter.options?.length
            ) {
              return null;
            } else {
              return (
                <div key={index}>
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
                        {filter.options
                          ?.slice(
                            0,
                            isShowOptionsMap[filter.name]
                              ? filter.options.length
                              : 5
                          )
                          .map((option, idx) => {
                            return (
                              <li
                                key={idx}
                                className="mb-2.5 text-xs font-normal"
                              >
                                <label className="cursor-pointer flex items-center text-xs font-normal text-textColor">
                                  <Checkbox
                                    value={option.name}
                                    onCheckedChange={() =>
                                      handleFilterChecked(option, filter.name)
                                    }
                                    className="mr-2.5 w-[18px] h-[18px] rounded-[1px] border-t border-r border-b-2 border-l  border-cerulean"
                                  />
                                  {option.title} ({option.productCount})
                                </label>
                              </li>
                            );
                          })}
                        {filter.options?.length > 5 && (
                          <li>
                            <span
                              onClick={() => toggleShowOptions(filter.name)}
                              className="text-cerulean text-xs font-normal cursor-pointer"
                            >
                              {isShowOptionsMap[filter.name]
                                ? `Скрыть ${filter.options.length - 5}`
                                : `Ещё ${filter.options.length - 5}`}
                            </span>
                          </li>
                        )}
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
                        <ul className="overflow-y-auto [scrollbar-width:thin] [scrollbar-color:#0054AE_#e5e7eb] [scrollbar-track-color:#e5e7eb] max-h-[225px] pl-1">
                          {filter.options?.map((option, idx) => (
                            <li key={idx} className="mb-1">
                              <Link
                                onClick={() =>
                                  handleLinkClick(
                                    filter.name,
                                    option.name || ""
                                  )
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
              );
            }
          })}
          {customFilter.map((filter, index) => (
            <div key={index}>
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
                <ul>
                  {filter.options.map((option, idx) => (
                    <li key={idx} className="mb-2.5 text-xs font-normal">
                      <label className="cursor-pointer flex items-center text-xs font-normal text-textColor">
                        <Checkbox
                          value={option.name}
                          onCheckedChange={() =>
                            handleFilterChecked(option, filter.name)
                          }
                          className="mr-2.5 w-[18px] h-[18px] rounded-[1px] border-t border-r border-b-2 border-l  border-cerulean"
                        />
                        {option.title}
                      </label>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
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
