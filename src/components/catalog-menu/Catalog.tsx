"use client";

import React, { useEffect, useState } from "react";
import { CatalogData } from "@/types";
import { CatalogChevronIcon } from "@/assets/icons";
import { getCatalog } from "@/api";
import Link from "next/link";
import Skeleton from "../skeleton/skeleton";

const Catalog = () => {
  const [catalogData, setCatalogData] = useState<CatalogData[]>([]);
  const [loading, setLoading] = useState(true); //Local Loading

  useEffect(() => {
    async function fetchData() {
      try {
        const data = await getCatalog();
        setCatalogData(data || []);
      } catch (error) {
        console.error("Error fetching catalog data:", error);
      } finally {
        setLoading(false); 
      }
    }

    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="p-4 md:p-6 grid grid-cols-2 gap-6">
        {Array.from({ length: 6 }).map((_, idx) => (
          <div key={idx} className="mb-[30px] md:mb-[50px]">
            <Skeleton className="w-[40%] h-4 md:h-5 mb-4 md:mb-6 rounded-full skeleton-shimmer" />
            <div className="flex flex-col gap-3">
              {Array.from({ length: 4 }).map((_, subIdx) => (
                <Skeleton
                  key={subIdx}
                  className="w-[60%] h-3 md:h-4 rounded-full skeleton-shimmer"
                />
              ))}
            </div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="p-4 md:p-6 grid grid-cols-2 gap-6">
      {catalogData?.map((item: CatalogData) => (
        <div key={item?.id} className="mb-[50px]">
          <div className="mb-7">
            <Link
              href={`/catalog/${item?.slug}`}
              className="font-normal text-[16px] sm:text-[21px] text-textColor hover:text-celBlue duration-150 ease-in-out text-wrap"
            >
              {item?.title}
            </Link>
          </div>
          <div className="flex flex-col gap-2">
            {item.subcatalogs?.map((subcatalog) => (
              <Link
                key={subcatalog?.id}
                href={`/catalog/${subcatalog?.slug}`}
                className="flex items-center text-xs text-textColor hover:text-celBlue duration-150 ease-in-out text-wrap"
              >
                <span className="mr-[4.68px]">
                  <CatalogChevronIcon />
                </span>
                {subcatalog?.title}
              </Link>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default Catalog;
