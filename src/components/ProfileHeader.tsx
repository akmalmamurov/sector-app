"use client";
import useStore from "@/context/store";
import { useScrollDirection } from "@/hooks";
import Link from "next/link";
import { usePathname } from "next/navigation";

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

  return (
    <div
      style={{
        scrollbarWidth: "none",
        msOverflowStyle: "none",
      }}
      className={`sticky z-10 bg-white border border-superSilver transition-top duration-150 ease-out 
        ${isScroll ? "top-[126px]" : "top-0 "}`}
    >
      <div className={`grid grid-cols-5`}>
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
              className="group relative px-6 py-4 flex justify-center transition-all duration-150 ease-out text-text-color hover:bg-hoverBg"
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
