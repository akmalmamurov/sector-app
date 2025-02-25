"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";
import { Container } from "@/components/container";

const tabs = [
  { name: "Мои заказы", href: "/profile/orders" },
  { name: "Мои обращения", href: "/profile/issues" },
  { name: "Контрагенты", href: "/profile/contractors" },
  { name: "Избранное", href: "/profile/favorites" },
  { name: "Настройки", href: "/profile/settings" },
];

export default function ProfileLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  return (
    <div className="py-[58px]">
      <Container>
        <div className=" bg-white shadow-sectionShadow border  rounded-[10px]">
          <div className="grid grid-cols-5 p-6 border-b-[0.5px] border-bottomBorder">
            {tabs.map((tab) => {
              const isActive = pathname === tab.href;
              return (
                <Link
                  key={tab.name}
                  href={tab.href}
                  className={`${isActive ? "text-cerulean" : ""}`}
                >
                  {tab.name}
                </Link>
              );
            })}
          </div>

          <div className="p-6">{children}</div>
        </div>
      </Container>
    </div>
  );
}
