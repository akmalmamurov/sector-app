"use client";
import { useEffect, useState } from "react";
import useStore from "@/context/store";
import { getProductSingle } from "@/api/product";
import { useSuspenseQueries } from "@tanstack/react-query";
import { CompareCard, ProductCard } from "../card";

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

  useEffect(() => {
    const handleScroll = () => {
      setIsScroll(window.scrollY > 150);
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

  const isLoading = productQueries.some((q) => q.isLoading);
  const isError = productQueries.some((q) => q.error);
  const products = productQueries.map((q) => q.data);

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error fetching products.</div>;

  const mergedGroups = () => {
    const groupsMap = new Map<string, Set<string>>();

    products.forEach((product) => {
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

  return (
    <div>
      <div className={`sticky top-[130px] z-[3] bg-white ${isScroll && "shadow-md"}`}>
        <div className="border-b py-[15px]   border-superSilver px-6">
          <h3 className="relative text-base font-normal text-cerulean w-[140px] text-center before:absolute before:-bottom-[15px] before:left-0 before:w-full before:h-[5px] before:bg-gradient-to-r before:from-blue-400 before:to-cerulean ">
            Все товары ({products.length})
          </h3>
        </div>
        {isScroll && (
          <div className="px-6">
            <div className="bg-white mt-5 grid grid-cols-5 gap-2 h-[64px] p-2">
              {compares.map((product, idx) => (
                <CompareCard product={product} key={idx} />
              ))}
            </div>
          </div>
        )}
      </div>
      <div className="grid grid-cols-4 gap-[21px] px-6 pt-6">
        {compares.map((product, idx) => (
          <ProductCard product={product} key={idx} />
        ))}
      </div>
      {/* Comparison table */}
      <div className="mt-6 overflow-x-auto p-6">
        <table className="min-w-full border-collapse">
          <colgroup>
            {products.map((_, idx) => (
              <col key={idx} style={{ width: "220px", minWidth: "220px" }} />
            ))}
          </colgroup>

          {mergedGroups().map((group: MergedGroup, groupIndex) => (
            <tbody key={groupIndex}>
              <tr className="bg-superSilver">
                <th
                  colSpan={products.length}
                  className="text-left px-4 py-2 font-semibold border-b-2 border-cerulean"
                >
                  {group.title}
                </th>
              </tr>

              {group.options.map((optionName, optIndex) => (
                <tr key={optIndex} className="border-b">
                  {products.map((product, prodIndex) => {
                    const productGroup = product.characteristics?.find(
                      (g: CharacteristicGroup) => g.title === group.title
                    );
                    const optionValue = productGroup?.options.find(
                      (o: CharacteristicOption) => o.name?.trim() === optionName
                    )?.value;

                    const cellContent =
                      prodIndex === 0 ? (
                        <div className="flex flex-col">
                          <span className="py-2">{optionName}</span>
                          <span className="py-2 px-[15px]">
                            {optionValue || "-"}
                          </span>
                        </div>
                      ) : (
                        optionValue || "-"
                      );

                    return (
                      <td
                        key={prodIndex}
                        className="py-2 px-[15px] text-sm text-textColor border-l"
                      >
                        {cellContent}
                      </td>
                    );
                  })}
                </tr>
              ))}
            </tbody>
          ))}
        </table>
      </div>
    </div>
  );
};

export default CompareProducts;
