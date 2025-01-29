import { SidebarTopIcon } from "@/assets/icons";
import Link from "next/link";

const CatalogLink = () => {
  return (
    <Link
      href={"/catalog"}
      className="bg-white relative shadow-2xl overflow-hidden pb-1 min-h-[190px] rounded-[10px] cursor-pointer flex flex-col justify-between"
    >
      <div className="px-4 py-6">
        <SidebarTopIcon className="rotate-90 w-4 h-5" />
      </div>
      <div className="px-4 w-[139px]">
        <p className="font-semibold text-sm text-textColor leading-[21px]">
          Смотреть весь каталог
        </p>
      </div>
      <div className="px-4">
        <p className="text-sm font-normal text-darkSoul">123123 товар</p>
      </div>
      <div className="bg-[#0054AE1F] w-[150px] h-[150px] rounded-full absolute top-[8px] -left-[82px]"></div>
      <div className="bg-[#0054AE1F] w-[270px] h-[270px] rounded-full absolute -top-[48px] -left-[122px]"></div>
    </Link>
  );
};

export default CatalogLink;
