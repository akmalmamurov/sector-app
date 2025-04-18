import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { X } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { usePathname } from "next/navigation";

import { MenuLegalIcon, UserIcon } from "@/assets/icons";
import { profileMenuData } from "@/data";
import useStore from "@/context/store";
import { getUser } from "@/api";
import { ContrAgentModal } from "../modal";

export const ProfileMenu = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const auth = useStore((state) => state.auth);
  const logOut = useStore((state) => state.logOut);
  const menuRef = useRef<HTMLDivElement>(null);
  const { data: userData = [] } = useQuery({
    queryKey: ["user"],
    queryFn: getUser,
    enabled: auth,
  });
  const pathName = usePathname();
  const addModal = pathName === "/profile/contractors";
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);
  const handleLogout = () => {
    logOut();
    setIsOpen(false);
  };
  return (
    <div
      ref={menuRef}
      className="w-[50px] xl:w-[100px] h-[50px] flex items-center justify-center relative "
    >
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-[50px] xl:w-[100px] h-10 xl:h-[50px]  flex items-center flex-col justify-between text-textColor"
      >
        <span>
          <UserIcon className="w-7 h-6 lg:w-5 lg:h-5 xl:w-6 xl:h-6" />
        </span>
        <span className="header-menu-link hidden lg:block">Кабинет</span>
        <span className="header-menu-link block lg:hidden p-[2px] text-[9px] pt-1">
          Профиль
        </span>
      </button>

      {isOpen && (
        <div
          className={`
            w-[343px] bg-white absolute top-[57px] -right-[82px] border shadow-navListShadow
            animate-in slide-in-from-bottom-2 duration-200 overflow-hidden
          `}
        >
          {/* header */}
          <div className="p-[15px] flex justify-between items-center border-b">
            <h3 className="text-base text-textColor">{userData?.name}</h3>
            <button onClick={() => setIsOpen(false)}>
              <X className="w-5 h-5" />
            </button>
          </div>
          {/* content */}
          <div className="mt-[15px]">
            <div className="border-b">
              <ul className=" mb-[15px]">
                {profileMenuData.map(({ name, link, icon }, index) => (
                  <Link
                    href={link}
                    key={index}
                    className="bg-white hover:bg-superSilver h-10 flex items-center duration-200 ease-in-out"
                    onClick={() => setIsOpen(false)}
                  >
                    <div className="flex items-center gap-[15px] text-xs px-[15px]">
                      <span className="w-[17px] h-[17px]">{icon}</span>
                      <span>{name}</span>
                    </div>
                  </Link>
                ))}
                {!addModal ? (
                  <Link
                    href={"/profile/contractors#add_contractor"}
                    className="bg-white hover:bg-superSilver h-10 flex items-center duration-200 ease-in-out"
                  >
                    <div className="flex items-center gap-[15px] text-xs px-[15px]">
                      <span className="w-[17px] h-[17px]">
                        <MenuLegalIcon />
                      </span>
                      <span className="header-menu-link">
                        Покупайте как юрлицо
                      </span>
                    </div>
                  </Link>
                ) : (
                  <button
                    onClick={() => setModalOpen(true)}
                    className="bg-white hover:bg-superSilver h-10 flex items-center duration-200 ease-in-out"
                  >
                    <div className="flex items-center gap-[15px] text-xs px-[15px]">
                      <span className="w-[17px] h-[17px]">
                        <MenuLegalIcon />
                      </span>
                      <span className="header-menu-link">
                        Покупайте как юрлицо
                      </span>
                    </div>
                  </button>
                )}
              </ul>
            </div>
            {/* logout */}
            <div className="py-[5px] px-[15px] flex justify-center items-center">
              <button
                onClick={handleLogout}
                className="text-dangerColor hover:opacity-70 duration-100 ease-in-out w-full"
              >
                Выход
              </button>
            </div>
          </div>
        </div>
      )}
      <ContrAgentModal
        isOpen={modalOpen}
        toggleOpen={() => setModalOpen(!modalOpen)}
      />
    </div>
  );
};

export default ProfileMenu;
