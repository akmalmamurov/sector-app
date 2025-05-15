/* eslint-disable react-hooks/rules-of-hooks */
"use client";
import { useEffect, useState, useRef, Fragment } from "react";
import useStore from "@/context/store";
import { getProductSingle } from "@/api/product";
import { getPromotion } from "@/api/promotion";
import { useSuspenseQueries } from "@tanstack/react-query";
import { CompareCard, ProductCard } from "../card";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import { Swiper as SwiperClass } from "swiper/types";
import { ArrowRightIcon } from "@/assets/icons";
import { WarningSector } from "../warning-sector";
// import { Loading } from "../loader";
import { useScrollDirection } from "@/hooks";
import Skeleton from "../skeleton/skeleton";

interface CharacteristicOption {
  name?: string;
  value?: string;
}

interface CharacteristicGroup {
  title: string;
  options: CharacteristicOption[];
}

interface MergedGroup {
  title: string;
  options: string[];
}

export const CompareProducts = () => {
  const { compares = [] } = useStore();
  const [isScroll, setIsScroll] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isBeginning, setIsBeginning] = useState(true);
  const [isEnd, setIsEnd] = useState(false);
  const tableRef = useRef<HTMLTableElement>(null);
  const swiperRef = useRef<SwiperClass | null>(null);
  const scrollDir = useScrollDirection();
  const [isLoading, setIsLoading] = useState(true);
  const [_discount, setDiscount] = useState([]);
  const checkScroll = scrollDir === "up" ? true : false;
  useEffect(() => {
    const handleScroll = () => {
      if (tableRef.current) {
        const { top } = tableRef.current.getBoundingClientRect();
        setIsScroll(top <= 100);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const productQueries = useSuspenseQueries({
    queries: compares.map((el) => ({
      queryKey: ["product", el.slug],
      queryFn: () => getProductSingle(el.slug),
    })),
  });

  // const isLoading = productQueries.some((q) => q.isLoading);
  const isError = productQueries.some((q) => q.error);
  const products = productQueries.map((q) => q.data);

  // if (isLoading) return <Loading />;
  if (isError) return <div>Error fetching products.</div>;

  const visibleProducts = products.slice(currentIndex, currentIndex + 5);

  const mergedGroups = () => {
    const groupsMap = new Map<string, Set<string>>();
    visibleProducts.forEach((product) => {
      product.characteristics?.forEach((group: CharacteristicGroup) => {
        if (!groupsMap.has(group.title)) {
          groupsMap.set(group.title, new Set());
        }
        const optionSet = groupsMap.get(group.title)!;
        group.options.forEach((opt) => {
          if (opt.name?.trim()) {
            optionSet.add(opt.name.trim());
          }
        });
      });
    });

    return Array.from(groupsMap.entries()).map(([title, options]) => ({
      title,
      options: Array.from(options),
    }));
  };

  const updateNavigationState = (swiper: SwiperClass) => {
    setIsBeginning(swiper.isBeginning);
    setIsEnd(swiper.isEnd);
  };
  console.log(isScroll);

// Skeleton Loading
  useEffect(() => {
    async function fetchPromotions() {
      try {
        const res = await getPromotion();
        setDiscount(res || []);
      } catch (error) {
        console.error("Promotion error:", error);
      } finally {
        setIsLoading(false);
      }
    }

    fetchPromotions();
  }, []);

  if (isLoading) {
    return (
      <div className="flex flex-col gap-4 ">
      <Skeleton className="w-[30%] h-6 skeleton-shimmer  mx-6 mt-5"></Skeleton>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-[28px] mx-6">
        {Array.from({ length: 4 }).map((_, index) => (
          <Skeleton key={index} className="bg-superSilver shadow-sidebarWadow overflow-hidden h-[448px]">
            <Skeleton className="overflow-hidden px-2 w-full h-[70%] rounded-md skeleton-shimmer" />
            <Skeleton className="py-2 h-[30%] flex flex-col gap-2 overflow-hidden px-6 min-h-[166px]">
              <Skeleton className="w-[100%] h-4 rounded-full skeleton-shimmer" />
              <Skeleton className="w-[80%] h-4 rounded-full skeleton-shimmer" />
              <Skeleton className="w-[80%] mt-3 h-3 rounded-full skeleton-shimmer" />
              <Skeleton className="w-[70%] h-3 rounded-full skeleton-shimmer" />
            </Skeleton>
          </Skeleton>
        ))}
      </div>
      <div className="flex flex-col gap-2 mx-6">
      <Skeleton className="w-[100%] h-5 skeleton-shimmer  "/>
      <Skeleton className="w-[80%] h-5 skeleton-shimmer  "/>
      <Skeleton className="w-[50%] h-5 skeleton-shimmer  "/>
      <Skeleton className="w-[100%] h-5 skeleton-shimmer  "/>
      <Skeleton className="w-[85%] h-5 skeleton-shimmer  "/>
      <Skeleton className="w-[75%] h-5 skeleton-shimmer "/>
      <Skeleton className="w-[45%] h-5 skeleton-shimmer "/>
      <Skeleton className="w-[100%] h-5 skeleton-shimmer  "/>
      </div>
      </div>
    );
  }

  return (
    <div>
        <div>
          {compares?.length > 0 ? (
            <div>
              <div
                className={`sticky ${checkScroll ? "top-[78px] lg:top-[130px]" : "top-0"}  md:z-[3] bg-white ${isScroll ? "shadow-md" : ""}`}
              >
                <div
                  className={`border-b py-[15px] border-superSilver px-6 ${isScroll && "hidden md:block"}`}
                >
                  <h3 className="relative text-base font-normal text-cerulean w-[140px] text-center before:absolute before:-bottom-[15px] before:left-0 before:w-full before:h-[5px] before:bg-gradient-to-r before:from-blue-400 before:to-cerulean">
                    Все товары ({products.length})
                  </h3>
                </div>
                <div
                  className={`sticky md:sticky-none ${checkScroll ? "top-[78px] lg:top-[130px]" : "top-0"} md:z-[3] bg-white ${isScroll ? "shadow-md" : ""}`}
                >
                  {isScroll && (
                    <div className="px-0 md:px-6 ">
                      <div className="relative group">
                        <Swiper
                          slidesPerView={2}
                          spaceBetween={2}
                          slidesPerGroup={1}
                          navigation={{
                            nextEl: ".swiper-button-next",
                            prevEl: ".swiper-button-prev",
                          }}
                          modules={[Navigation]}
                          onSlideChange={(swiper) => {
                            setCurrentIndex(swiper.activeIndex);
                            updateNavigationState(swiper);
                          }}
                          onSwiper={(swiper) => {
                            swiperRef.current = swiper;
                            updateNavigationState(swiper);
                          }}
                          breakpoints={{
                            768: {
                              slidesPerView: 3,
                              spaceBetween: 2,
                            },
                            1024: {
                              slidesPerView: 5,
                              spaceBetween: 2,
                            },
                          }}
                        >
                          {compares.map((product, idx) => (
                            <SwiperSlide key={idx}>
                              <CompareCard product={product} />
                            </SwiperSlide>
                          ))}
                        </Swiper>
                        {!isBeginning && (
                          <div
                            className="absolute left-0 top-2 border border-superSilver z-[1] w-[42px] h-[42px] rounded-full bg-iconBox/70 flex items-center justify-center cursor-pointer transition-all duration-300 ease-in-out opacity-0 group-hover:opacity-100 group-hover:scale-110"
                            onClick={() => swiperRef.current?.slidePrev()}
                          >
                            <ArrowRightIcon className="w-[22px] h-[20px] rotate-180 text-titleColor" />
                          </div>
                        )}
                        {!isEnd && (
                          <div
                            className="absolute right-0 top-2 border border-superSilver z-[1] w-[42px] h-[42px] rounded-full bg-iconBox/70 flex items-center justify-center cursor-pointer transition-all duration-300 ease-in-out opacity-0 group-hover:opacity-100 group-hover:scale-110"
                            onClick={() => swiperRef.current?.slideNext()}
                          >
                            <ArrowRightIcon className="w-[22px] h-[20px] text-titleColor" />
                          </div>
                        )}
                      </div>
                    </div>
                  )}
                </div>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-[21px] px-6 pt-6">
                {compares.map((product, idx) => (
                  <ProductCard product={product} key={idx} />
                ))}
              </div>
              <div className="mt-6 overflow-x-auto p-6">
                <table ref={tableRef} className="w-fit">
                  <colgroup>
                    {visibleProducts.map((_, idx) => (
                      <col
                        key={idx}
                        style={{ width: "321px", minWidth: "274px" }}
                      />
                    ))}
                  </colgroup>
                  {mergedGroups().map((group: MergedGroup, groupIndex) => (
                    <tbody key={groupIndex}>
                      <tr className="bg-superSilver">
                        <th
                          colSpan={visibleProducts.length}
                          className="text-left px-4 py-2 font-normal  text-[#000000DE]"
                        >
                          {group.title}
                        </th>
                      </tr>
                      {group.options.map((optionName, optIndex) => (
                        <Fragment key={optIndex}>
                          <tr
                            className={`border-b-2 last:!border-none  ${optIndex % 2 === 0 ? "bg-whiteOut" : "bg-white"}`}
                          >
                            {visibleProducts.map((product, prodIndex) => {
                              const productGroup = product.characteristics?.find(
                                (g: CharacteristicGroup) => g.title === group.title
                              );
                              const optionValue = productGroup?.options.find(
                                (o: CharacteristicOption) =>
                                  o.name?.trim() === optionName
                              )?.value;
                              const cellContent =
                                prodIndex === 0 ? (
                                  <div className="flex flex-col">
                                    <div className="w-full py-2 px-[5px] text-sm text-weekColor flex items-center">
                                      <span className="w-[10px] h-[10px] rounded-full bg-cerulean mr-[5px]"></span>
                                      <span>{optionName}</span>
                                    </div>
                                    <span className="py-2 px-[15px] text-textColor">
                                      {optionValue || "-"}
                                    </span>
                                  </div>
                                ) : (
                                  <div className="flex flex-col">
                                    <span className="h-[36px]"></span>
                                    <span className="py-2 px-[15px] text-textColor">
                                      {optionValue || "-"}
                                    </span>
                                  </div>
                                );

                              return (
                                <td key={prodIndex} className="text-sm">
                                  {cellContent}
                                </td>
                              );
                            })}
                          </tr>
                        </Fragment>
                      ))}
                    </tbody>
                  ))}
                </table>
                <WarningSector />
              </div>
            </div>
          ) : (
            <div className="pt-6 px-6">
              <p className="font-normal text-base text-textColor">
                Добавьте товары для сравнения
              </p>
            </div>
          )}
        </div>
    </div>
  );
};

export default CompareProducts;
