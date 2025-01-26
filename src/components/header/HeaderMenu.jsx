import Image from "next/image";
import { Container } from "../container";
import { logo } from "@/assets/images";
import Form from "next/form";
import { SearchIcon } from "@/assets/icons";
import Link from "next/link";
const HeaderMenu = () => {
  return (
    <div className="py-2 bg-white">
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
            className="input-autofill w-full py-[15px] pl-4 pr-[13px] rounded-[10px] border bg-background focus:outline-none focus:border-transparent focus:shadow-lg"
          />
          <button className="absolute top-[13px] right-[15px]">
            <SearchIcon />
          </button>
        </Form>
        {/* menu */}
        <div className="flex">
      
        </div>
      </Container>
    </div>
  );
};

export default HeaderMenu;
