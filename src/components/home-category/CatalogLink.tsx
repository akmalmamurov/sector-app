import { SidebarTopIcon } from "@/assets/icons";
import Link from "next/link";

const CatalogLink = ({ total }: { total: number }) => {
  return (
    <Link
      href={"/catalog"}
      className="bg-white relative shadow-md overflow-hidden pb-1 w-[175px] h-[165px] lg:w-[282px]
       lg:min-h-[190px] rounded-[10px] cursor-pointer flex flex-col justify-between group"
    >
      <div className="px-4 py-6">
        <SidebarTopIcon className="rotate-90 w-4 h-5 group-hover:scale-110 transform duration-300 ease-in-out" />
      </div>
      <div className="px-4 w-[139px]">
        <p className="font-semibold text-sm text-textColor leading-[21px]">
          Смотреть весь каталог
        </p>
      </div>
      <div className="px-4">
        <p className="text-sm font-normal text-darkSoul">{total} товаров</p>
      </div>
      <div className="bg-lobster w-[150px] h-[150px] rounded-full absolute top-[8px] -left-[82px] group-hover:scale-110 transform duration-300 ease-in-out"></div>
      <div className="bg-lobster w-[270px] h-[270px] rounded-full absolute -top-[48px] -left-[122px]"></div>
    </Link>
  );
};

export default CatalogLink;
