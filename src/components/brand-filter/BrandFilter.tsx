import DownRightIcon from "@/assets/icons/DownRightIcon";
import FilterIcon from "@/assets/icons/FilterIcon";
import Link from "next/link";
const data = [
  { text: "Новые поступления", link: "#", subItem: [] },
  {
    text: "Видеонаблюдение",
    link: "#",
    subItem: [
      { text: "IP Видеокамеры", link: "#" },
      { text: "Кронштейны и коробки", link: "#" },
      { text: "Отраслевые решения", link: "#" },
      { text: "Программное обеспечение OmnyVideo", link: "#" },
    ],
  },
  { text: "Архив", link: "#", subItem: [] },
  { text: "Распродажа", link: "#", subItem: [] },
];

export const BrandFilter = () => {
  return (
    <div className="shadow-sectionShadow border border-superSilver bg-white mb-10">
      <div className="flex items-center gap-2.5 p-[22px]">
        <FilterIcon />
        <p className="text-base font-normal text-textColor">Фильтры</p>
      </div>
      <div className="p-4 flex items-center gap-2.5 bg-background">
        <DownRightIcon />
        <p className="text-sm font-normal text-textColor">Категории</p>
      </div>
      <div className="py-[22px] px-9">
        {data.map((sub) => {
          return (
            <ul className="list-disc flex flex-col gap-2" key={sub.text}>
              <Link href={sub.link} className="text-xs font-normal text-textColor transition-colors hover:text-linkColor">
                <li className="marker:text-textColor">{sub.text}</li>
              </Link>
              <ul className="list-disc pl-4 flex flex-col gap-2 pb-2">
                {sub.subItem.map((item) => (
                  <Link className="text-xs font-normal text-textColor transition-colors hover:text-linkColor" href={item.link} key={item.text}>
                    <li>{item.text}</li>
                  </Link>
                ))}
              </ul>
            </ul>
          );
        })}
      </div>
    </div>
  );
};

export default BrandFilter;
