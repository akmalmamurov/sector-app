import { getSearchProduct } from "@/api";
import { SearchIcon } from "@/assets/icons";
import { DOMAIN } from "@/constants";
import { ProductData } from "@/types";
import { useQuery } from "@tanstack/react-query";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import PriceFormatter from "../format-price/PriceFormatter";

const SearchMenu = () => {
  const [search, setSearch] = useState("");
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const router = useRouter();
  useEffect(() => {
    document.addEventListener("click", (e) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    });
  }, []);
  const { data: searchData = [] } = useQuery({
    queryKey: ["search-data", search],
    queryFn: () => getSearchProduct(search),
    enabled: open && search.trim().length > 0,
  });
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (search.trim()) {
      router.push(`/catalog/search?query=${encodeURIComponent(search)}`);
      setOpen(false);
    }
  };

  console.log(searchData);
  console.log(search);
  const handleGo = () => {
    router.push(`/catalog/search?query=${encodeURIComponent(search)}`);
    setOpen(false);
  };
  return (
    <div
      ref={ref}
      className={`relative flex-1  ${open ? "shadow-searchShadow" : ""}`}
    >
      <div>
        <form onSubmit={handleSubmit}>
          <div>
            <input
              type="text"
              name="query"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              onFocus={() => setOpen(true)}
              placeholder="Введите поисковый запрос"
              className={`input-autofill w-full py-[12px] xl:py-[12px] pl-4 pr-[40px]  border focus:outline-none focus:border-transparent focus:bg-white placeholder-opacity-0 text-ellipsis overflow-hidden whitespace-nowrap ${open ? "bg-white border-transparent " : "bg-background border-superSilver"}`}
            />
            <button
              type="submit"
              className="absolute top-1/2 right-[15px] -translate-y-1/2"
            >
              <SearchIcon />
            </button>
          </div>
        </form>
        {/* results */}
        {open && search.length > 0 && (
          <div className="absolute top-[100%] left-0 w-full border-t bg-white z-[22] shadow-searchShadow">
            {searchData?.products?.slice?.(0, 6).map((product: ProductData) => (
              <div
                key={product.id + product.title}
                onClick={() => setOpen(false)}
                className="py-2 px-[15px] border-b  bg-white hover:bg-whiteOut hoverEffect"
              >
                <Link
                  href={`/catalog/${product?.subcatalog?.slug}/${product?.category?.slug}/${product?.slug}`}
                  className="flex justify-between"
                >
                  <div className="flex">
                    {/* image */}
                    <Image
                      src={`${DOMAIN}/${product?.mainImage}`}
                      width={41}
                      height={41}
                      alt={product.title}
                      className="object-cover w-[41px] h-[41px] mr-[15px]"
                    />
                    <p className="text-textColor max-w-[400px]">
                      {product.title}
                    </p>
                  </div>
                  <PriceFormatter
                    amount={product.price}
                    className="font-normal text-textColor"
                  />
                </Link>
              </div>
            ))}
            <div className="flex justify-center py-[15px] px-5 bg-white">
              <button onClick={handleGo} className="text-dangerColor text-sm">
                Смотреть все {searchData?.total} товаров
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchMenu;
