"use client";

import { useState } from "react";
import { ChevronBottomIcon } from "@/assets/icons";
import { navbarList } from "@/data";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import Link from "next/link";

const NavbarList = () => {
  const [openPopover, setOpenPopover] = useState<number | null>(null);

  const handleClose = () => setOpenPopover(null);
  
  return (
    <div>
      <div className="flex gap-1">
        {navbarList?.map((item, index) => (
          <Popover
            key={index}
            open={openPopover === index}
            onOpenChange={(isOpen) => setOpenPopover(isOpen ? index : null)}
          >
            <PopoverTrigger className="flex items-center gap-[3.26px] py-1 px-[23px]">
              <p className="font-medium text-sm text-textColor leading-[18px]">
                {item.name}
              </p>
              <ChevronBottomIcon />
            </PopoverTrigger>
            <PopoverContent className="w-fit flex flex-col border-none left-5 rounded-sm p-0 shadow-navListShadow">
              {item?.sublink?.map((subitem, subindex) => (
                <Link
                  key={subindex}
                  href={subitem.link}
                  className="font-normal text-xs text-textColor py-2 px-[15px] hover:opacity-70 hoverEffect"
                  onClick={handleClose}
                >
                  {subitem.name}
                </Link>
              ))}
            </PopoverContent>
          </Popover>
        ))}
        <div className="py-1 px-[23px]">
          <button className="font-medium text-sm text-textColor leading-[18px]">
            Онлайн чат
          </button>
        </div>
      </div>
    </div>
  );
};

export default NavbarList;
