"use client";

import Link from "next/link";
import Image, { StaticImageData } from "next/image";
import React, { useState, useRef, useEffect } from "react";
import useStore from "@/context/store";
import { MenuLegalIcon, NavBottomCart } from "@/assets/icons";
import LoginModal from "../modal/LoginModal";
import { X } from "lucide-react";
import { profileMenuData } from "@/data";
import { usePathname } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { getAgent, getUser } from "@/api";
import { ContrAgentModal } from "../modal";
import { KontrAgents } from "@/types";
import NavBottomCatalog from "@/assets/icons/NavBottomCatalog";
import NavBottomInfo from "@/assets/icons/NavBottomInfo";
import NavBottomHome from "@/assets/icons/NavBottomHome";
import NavBottomUser from "@/assets/icons/NavBottomUser";
import NavCatalogItem from "./NavCatalogItem";
import { useMobileMenuStore } from "@/stores/mobileMenuStore";

const BottomNavbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const auth = useStore((state) => state.auth);
  const logOut = useStore((state) => state.logOut);
  const [modalOpen, setModalOpen] = useState(false);
  const pathName = usePathname();
  const addModal = pathName === "/profile/contractors";
  const { data: agentsData = [] } = useQuery({
    queryKey: ["contragents"],
    queryFn: () => getAgent(),
    enabled: auth,
  });
  const { data: userData = [] } = useQuery({
    queryKey: ["user"],
    queryFn: getUser,
    enabled: auth,
  });

  const { openMenu } = useMobileMenuStore();
  const contrAgents = agentsData?.kontragents || [];
  const favoriteAgent = contrAgents?.find(
    (agent: KontrAgents) => agent.isFavorite === true
  );

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleLogout = () => {
    logOut();
    setMenuOpen(false);
  };

  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);


  
  return (
<div className="fixed bottom-0 left-0 w-full z-[20] bg-white shadow-md border-t flex justify-around py-2 will-change-transform">
<NavItem src={NavBottomHome} label="Главная" href="/" />
      <NavItem src={NavBottomInfo} label="Информация" href="/about" />
      <NavCatalogItem
  src={NavBottomCatalog}
  label="Каталог"
  href="#"
  onClick={(e) => {
    e.preventDefault();
    openMenu(); // headerdagi mobile menyuni ochadi
  }}
/>
     <NavItem src={NavBottomCart} label="Корзина" href="/cart" />

      {/* Profile */}
      {auth ? (
        <div ref={menuRef} className="relative">
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="header-menu-item"
          >
            <span>
              <NavBottomUser className="w-7 h-7" />
            </span>
            <span className="text-[9px] pt-1">Профиль</span>
          </button>

          {menuOpen && (
            <div className="fixed inset-0 z-30 bg-transparent backdrop-blur-sm">
              <div className="absolute  bottom-0 left-0 w-full h-full overflow-y-auto bg-white border shadow-lg animate-in slide-in-from-bottom-2 duration-200">
              
                <div className="mb-4 border-b">
                  <div className="p-[25px] flex justify-between items-center border-b">
                    <h3 className="text-lg text-textColor">Профиль</h3>
                    <button onClick={() => setMenuOpen(false)}>
                      <X className="w-5 h-5" />
                    </button>
                  </div>
                  <div className="flex flex-col justify-center items-center pt-7 mb-2">
                    <h4 className="text-textColor text-lg">{userData?.name}</h4>
                    <p className="text-textColor text-sm opacity-70">
                      {userData?.email}
                    </p>
                  </div>

                  <div className="mt-[15px] mb-5 border-t mx-[10%] ">
                    <div className="bg-[#f8f8f8] border flex justify-between items-center py-4 px-2 mt-3">
                      {}
                      <div>
                        <Link className="text-sm pl-4 text-merlin" href="/">
                          {favoriteAgent?.name ?? userData?.name}
                        </Link>
                        {favoriteAgent?.inn && (
                          <p className="text-xs pl-4 opacity-70">
                            ИНН {favoriteAgent.inn}
                          </p>
                        )}
                      </div>
                      <svg
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                        height="24"
                        viewBox="0 0 24 24"
                        width="24"
                        className="jsx-2658685973 "
                      >
                        <path
                          d="M17.5 11.0001C19.433 11.0001 21 12.5671 21 14.5001C21 15.5056 20.5761 16.412 19.8971 17.0504C21.7335 17.939 23 19.8216 23 22.0001C23 22.5524 22.5523 23.0001 22 23.0001H13C12.4477 23.0001 12 22.5524 12 22.0001C12 19.8216 13.2666 17.939 15.1035 17.0483C14.424 16.412 14 15.5056 14 14.5001C14 12.5671 15.567 11.0001 17.5 11.0001ZM3.00003 15.0001C3.51287 15.0001 3.93554 15.3862 3.99331 15.8835L4.00003 16.0001V19.0001C4.00003 19.5129 4.38608 19.9356 4.88341 19.9934L5.00003 20.0001H8.00003C8.55232 20.0001 9.00003 20.4478 9.00003 21.0001C9.00003 21.513 8.61399 21.9356 8.11665 21.9934L8.00003 22.0001H5.00003C3.40236 22.0001 2.09637 20.7512 2.00513 19.1764L2.00003 19.0001V16.0001C2.00003 15.4478 2.44775 15.0001 3.00003 15.0001ZM17.5 18.5001C15.9536 18.5001 14.6415 19.503 14.1785 20.8938L14.146 21.0001H20.853L20.8216 20.8938C20.3779 19.5609 19.1543 18.5844 17.6921 18.5053L17.5 18.5001ZM17.5 13.0001C16.6716 13.0001 16 13.6717 16 14.5001C16 15.3285 16.6716 16.0001 17.5 16.0001C18.3285 16.0001 19 15.3285 19 14.5001C19 13.6717 18.3285 13.0001 17.5 13.0001ZM19 2.00011C20.5977 2.00011 21.9037 3.24904 21.9949 4.82384L22 5.00011V8.00011C22 8.5524 21.5523 9.00011 21 9.00011C20.4872 9.00011 20.0645 8.61407 20.0068 8.11674L20 8.00011V5.00011C20 4.48729 19.614 4.06461 19.1166 4.00684L19 4.00011H16C15.4477 4.00011 15 3.5524 15 3.00011C15 2.48728 15.3861 2.06461 15.8834 2.00684L16 2.00011H19Z"
                          fill="#333333"
                        ></path>
                        <path
                          d="M7 1C8.933 1 10.5 2.567 10.5 4.5C10.5 5.50546 10.076 6.41189 9.39711 7.05028C11.2335 7.93886 12.5 9.82151 12.5 12C12.5 12.5523 12.0523 13 11.5 13H2.5C1.94772 13 1.5 12.5523 1.5 12C1.5 9.82151 2.76653 7.93886 4.60342 7.0482C3.92397 6.41189 3.5 5.50546 3.5 4.5C3.5 2.567 5.067 1 7 1ZM7 8.5C5.45359 8.5 4.14144 9.50287 3.67843 10.8937L3.646 11H10.353L10.3216 10.8937C9.87786 9.56082 8.65428 8.58425 7.19204 8.50518L7 8.5ZM7 3C6.17157 3 5.5 3.67157 5.5 4.5C5.5 5.32843 6.17157 6 7 6C7.82843 6 8.5 5.32843 8.5 4.5C8.5 3.67157 7.82843 3 7 3Z"
                          fill="#333333"
                        ></path>
                      </svg>
                    </div>
                    <div className="flex justify-start border-t mt-3">
                      <ul className="mb-[15px] mt-[10px] w-full ml-[3%]">
                        {profileMenuData.map(({ name, link, icon }, index) => (
                          <Link
                            href={link}
                            key={index}
                            className="bg-white hover:bg-gray-200 h-10 flex items-center border-b duration-200 ease-in-out w-full text-merlin"
                            onClick={() => setMenuOpen(false)}
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
                            className="bg-white hover:bg-superSilver h-10 w-full flex items-center duration-200 ease-in-out"
                          >
                            <div className="flex items-center gap-[15px] text-xs px-[15px]">
                              <span className="w-[17px] h-[17px] text-merlin">
                                <MenuLegalIcon />
                              </span>
                              <span className="header-menu-link text-merlin">
                                Покупайте как юрлицо
                              </span>
                            </div>
                          </Link>
                        ) : (
                          <button
                            onClick={() => setModalOpen(true)}
                            className="bg-white w-full hover:bg-superSilver h-10 flex items-center duration-200 ease-in-out"
                          >
                            <div className="flex items-center gap-[15px] text-xs px-[15px]">
                              <span className="w-[17px] h-[17px] text-merlin">
                                <MenuLegalIcon />
                              </span>
                              <span className="header-menu-link text-merlin">
                                Покупайте как юрлицо
                              </span>
                            </div>
                          </button>
                        )}
                      </ul>
                    </div>

                    {/* Logout */}
                    <div className="pt-[5px] py-[5px] px-[15px] flex justify-center items-center">
                      <button
                        onClick={handleLogout}
                        className="text-merlin hover:opacity-70 duration-100 ease-in-out "
                      >
                        Выход
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      ) : (
        <button onClick={() => setIsOpen(!isOpen)} className="header-menu-item">
          <span>
            <NavBottomUser className="w-7 h-7" />
          </span>
          <span className="text-[9px] pt-1">Профиль</span>
        </button>
      )}
      <LoginModal isOpen={isOpen} handleOpen={() => setIsOpen(!isOpen)} />
      <ContrAgentModal
        isOpen={modalOpen}
        toggleOpen={() => setModalOpen(!modalOpen)}
      />
    </div>
    
  );
};
const NavItem = ({
  src,
  label,
  href,
}: {
  src: StaticImageData | React.FC<{ className?: string }>;
  label: string;
  href: string;
}) => {
  return (
    <Link href={href} className="flex flex-col items-center gap-1">
      <div className="relative w-[28px] h-[28px]">
        {typeof src === "function" ? (
          React.createElement(src, { className: "w-full h-full" })
        ) : (
          <Image src={src} alt={label} fill className="object-contain" />
        )}
      </div>
      <span className="text-[9px] text-textColor">{label}</span>
    </Link>
  );
};

export default BottomNavbar;
