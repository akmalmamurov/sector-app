import Image from "next/image";
import { Container } from "../container";
import { logo } from "@/assets/images";
import Form from "next/form";
import { SearchIcon } from "@/assets/icons";
import Link from "next/link";
import { headerMenuData } from "@/data/header-menu-data";
const HeaderMenu = () => {
  return (
    <div className="py-2 bg-white border-b border-b-superSilver">
      <Container className="flex justify-between items-center gap-[42px]">
        {/* logo */}
        <Link href="/">
          <Image src={logo} alt="logo" />
        </Link>
        {/* search */}
        <Form action="/search" className="flex-1 relative">
          <input
            type="text"
            name="query"
            placeholder="Введите поисковый запрос"
            className="input-autofill w-full py-[15px] pl-4 pr-[13px] rounded-[10px] border bg-background focus:outline-none focus:border-transparent focus:shadow-lg focus:bg-white placeholder-opacity-0"
            
          />
          <button className="absolute top-[13px] right-[15px]">
            <SearchIcon />
          </button>
        </Form>
        {/* menu */}
        <div className="flex items-center">
          {headerMenuData?.map((item, index) =>
            item?.link ? (
              // Menu item with link
              <Link
                key={index}
                href={item.link}
                className="w-[100px] flex items-center flex-col h-[50px] justify-between text-textColor"
              >
                <span className="h-6 w-6">{item.icon}</span>
                <span className="text-sm leading-[18px] font-medium">
                  {item.name}
                </span>
              </Link>
            ) : (
              <div
                key={index}
                className="w-[100px] flex items-center flex-col h-[50px] justify-between text-textColor cursor-pointer"
              >
                <span className="h-6 w-6">{item.icon}</span>
                <span className="text-sm leading-[18px] font-medium">
                  {item.name}
                </span>
              </div>
            )
          )}
        </div>
      </Container>
    </div>
  );
};

export default HeaderMenu;
