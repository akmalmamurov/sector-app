import {
  FlexColIcon,
  FlexIcon,
  SortChevronIcon,
  SortIconDesc,
} from "@/assets/icons";
import useStore from "@/context/store";
import { useEffect, useRef, useState } from "react";
interface SortProductsProps {
  selected: string | null;
  setSelected: (selected: string | null) => void;
  inStock: boolean;
  setInStock: (inStock: boolean) => void;
  popular: boolean;
  setPopular: (popular: boolean) => void;
  setPriceSort: (priceSort: "asc" | "desc" | null) => void;
  setNameSort: (nameSort: "asc" | "desc" | null) => void;
  limit: number;
  setLimit: (limit: number) => void;
}
export const SortProducts: React.FC<SortProductsProps> = (props) => {
  const {
    selected,
    setSelected,
    inStock,
    setInStock,
    setPopular,
    setPriceSort,
    setNameSort,
    limit,
    setLimit,
  } = props;
  const { toggleRowCol, rowCol } = useStore();
  const [open, setOpen] = useState(false);
  const [openLimit, setOpenLimit] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const limitRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        setOpen(false);
      }
      if ( limitRef.current && !limitRef.current.contains(event.target as Node)) {
        setOpenLimit(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
  }, []);
  const handleToggleRowCol = (row: boolean) => {
    toggleRowCol(row);
  };
  return (
    <div className="p-[15px] flex justify-between items-center border-b border-superSilver">
      <div className="flex gap-2">
        <button
          onClick={() => handleToggleRowCol(false)}
          className="w-[42px] h-[42px] flex items-center justify-center border border-superSilver"
        >
          <FlexIcon
            className={`${!rowCol ? "text-merlin" : "text-dove"} w-6 h-6`}
          />
        </button>
        <button
          onClick={() => handleToggleRowCol(true)}
          className="w-[42px] h-[42px] flex items-center justify-center border border-superSilver"
        >
          <FlexColIcon
            className={`${rowCol ? "text-merlin" : "text-dove"} w-6 h-6 `}
          />
        </button>
      </div>

      <div className="flex">
        <div className="flex mr-2">
          <button
            onClick={() => setInStock(false)}
            className={`border border-superSilver w-[160px] h-[42px] flex items-center justify-center font-semibold text-weekColor ${!inStock && "bg-greenLight text-white"}`}
          >
            Все товары
          </button>
          <button
            onClick={() => setInStock(true)}
            className={`border border-superSilver w-[160px] h-[42px] flex items-center justify-center font-semibold text-weekColor ${inStock && "bg-greenLight text-white"}`}
          >
            В наличии
          </button>
        </div>
        {/* menu sort */}
        <div
          ref={ref}
          onClick={() => setOpen(!open)}
          className=" border border-superSilver cursor-pointer p-2 flex items-center relative mr-4"
        >
          <div className="flex justify-between w-full items-center">
            <div className="flex items-center gap-2">
              <SortIconDesc />
              <span className="select-none font-normal text-textColor text-base leading-6">
                {selected || "Популярность"}
              </span>
            </div>
            <span className="ml-[21px] mr-[15px]">
              <SortChevronIcon />
            </span>
          </div>
          {open && (
            <ul className="absolute top-full left-0 w-full z-10 bg-white shadow-lg min-w-[187px]">
              <li
                onClick={() => {
                  setSelected("Популярность");
                  setPopular(true);
                  setOpen(false);
                }}
                className="py-[15px] px-6  cursor-pointer flex items-center gap-2"
              >
                <SortIconDesc />
                <span>Популярность</span>
              </li>
              <li
                onClick={() => {
                  setSelected("Цена");
                  setPriceSort("asc");
                  setPopular(false);
                  setOpen(false);
                }}
                className="py-[15px] px-6  cursor-pointer flex items-center gap-2"
              >
                <SortIconDesc />
                <span>Цена</span>
              </li>
              <li
                onClick={() => {
                  setSelected("Цена");
                  setPriceSort("desc");
                  setPopular(false);
                  setOpen(false);
                }}
                className="py-[15px] px-6  cursor-pointer flex items-center gap-2"
              >
                <SortIconDesc className="rotate-180" />
                <span>Цена</span>
              </li>
              <li
                onClick={() => {
                  setSelected("Наименование");
                  setNameSort("asc");
                  setPopular(false);
                  setOpen(false);
                }}
                className="py-[15px] px-6  cursor-pointer flex items-center gap-2"
              >
                <SortIconDesc />
                <span>Наименование</span>
              </li>
              <li
                onClick={() => {
                  setSelected("Наименование");
                  setNameSort("desc");
                  setPopular(false);
                  setOpen(false);
                }}
                className="py-[15px] px-6  cursor-pointer flex items-center gap-2"
              >
                <SortIconDesc className="rotate-180" />
                <span>Наименование</span>
              </li>
            </ul>
          )}
        </div>
        {/* limit products */}
        <div
          ref={limitRef}
          onClick={() => setOpenLimit(!openLimit)}
          className="border border-superSilver cursor-pointer py-2 pl-2 flex items-center relative"
        >
          <div className="flex justify-between w-full items-center">
            <span className="select-none font-normal text-textColor text-base leading-6">
              {limit}
            </span>
            <span className=" mx-[15px]">
              <SortChevronIcon />
            </span>
          </div>
          {openLimit && (
            <ul className="absolute top-full left-0 w-full z-10 bg-white shadow-lg ">
              <li
                onClick={() => setLimit(40)}
                className="py-[15px] px-4  cursor-pointer flex items-center gap-2"
              >
                40
              </li>
              <li
                onClick={() => setLimit(80)}
                className="py-[15px] px-4  cursor-pointer flex items-center gap-2"
              >
                80
              </li>
              <li
                onClick={() => setLimit(120)}
                className="py-[15px] px-4  cursor-pointer flex items-center gap-2"
              >
                120
              </li>
            </ul>
          )}
        </div>
      </div>
    </div>
  );
};

export default SortProducts;
