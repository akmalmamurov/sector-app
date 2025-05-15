"use client";
import useStore from "@/context/store";
import { useScrollDirection } from "@/hooks";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef } from "react";

const allTabs = [
  { name: "Мои заказы", href: "/profile/orders" },
  { name: "Мои обращения", href: "/profile/issues" },
  { name: "Контрагенты", href: "/profile/contractors" },
  { name: "Избранное", href: "/profile/favorites" },
  { name: "Настройки", href: "/profile/settings" },
];

const ProfileHeader = () => {
  const pathname = usePathname();
  const auth = useStore((state) => state.auth);
  const scrollDir = useScrollDirection();
  const isScroll = scrollDir === "up" ? true : false;

  const tabs = auth
    ? allTabs
    : allTabs.filter((tab) => tab.href === "/profile/favorites");

  const tabRefs = useRef<Record<string, HTMLAnchorElement | null>>({});

  useEffect(() => {
    const activeTab = tabs.find((tab) => {
      if (tab.href === "/profile/orders") {
        return (
          pathname === "/profile/orders" ||
          pathname.startsWith("/profile/orders/")
        );
      }
      return pathname === tab.href;
    });

    if (activeTab && tabRefs.current[activeTab.href]) {
      tabRefs.current[activeTab.href]?.scrollIntoView({
        behavior: "smooth",
        inline: "center",
        block: "nearest",
      });
    }
  }, [pathname, tabs]);

  return (
    <div
      style={{
        scrollbarWidth: "none",
        msOverflowStyle: "none",
      }}
      className={`sticky z-10 bg-white border border-superSilver transition-top duration-150 ease-out overflow-x-auto    
        ${isScroll ? "top-[126px]" : "top-0 "}`}
    >
      <div className="flex">
        {tabs.map((tab) => {
          const isActive =
            tab.href === "/profile/orders"
              ? pathname === "/profile/orders" ||
                pathname.startsWith("/profile/orders/")
              : pathname === tab.href;
          return (
            <Link
              key={tab.name}
              href={tab.href}
              ref={(el) => {
                if (el) {
                  tabRefs.current[tab.href] = el;
                }
              }}
              className="text-nowrap group relative px-6 py-4 flex justify-center transition-all duration-150 ease-out text-text-color hover:bg-hoverBg"
            >
              {tab.name}
              <span
                className={`
                  absolute bottom-0 left-0 w-full h-[5px] transition-opacity
                  ${
                    isActive
                      ? "bg-gradient-to-r from-cerulean to-blue-400 opacity-100"
                      : "bg-superSilver opacity-0 group-hover:opacity-100"
                  }
                `}
              />
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default ProfileHeader;
