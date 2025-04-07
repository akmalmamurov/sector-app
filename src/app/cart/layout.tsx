"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";
import { Container } from "@/components/container";

const tabs = [
  { name: "Мои заказы", href: "/cart" },
  { name: "Мои обращения", href: "/cart/contact" },
  { name: "Контрагенты", href: "/cart/delivery" },
  { name: "Избранное", href: "/cart/favorites" },
  { name: "Настройки", href: "/profile/settings" },
];

export default function CartLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  return (
    <div className="py-[58px]">
      <Container>
        <div className="bg-white shadow-sectionShadow border rounded-[10px] ">
          {/* Scroll Bar */}
          <div
            style={{
              scrollbarWidth: "none",
              msOverflowStyle: "none",
            }}
            className="overflow-x-auto whitespace-nowrap border-b-[0.5px] border-superSilver"
          >
            <div className="grid grid-flow-col auto-cols-max">
              {tabs.map((tab) => {
                const isActive = pathname === tab.href;
                return (
                  <Link
                    key={tab.name}
                    href={tab.href}
                    className="group relative p-6 transition-all flex justify-center duration-150 ease-out
              text-text-color hover:bg-hoverBg"
                  >
                    {tab.name}
                    <span
                      className={`
              absolute -bottom-0 left-0 w-full h-[5px] transition-opacity
              ${
                isActive
                  ? "bg-gradient-to-r from-cerulean to-blue-400 opacity-100"
                  : "bg-superSilver opacity-0 group-hover:opacity-100 "
              }
            `}
                    />
                  </Link>
                );
              })}
            </div>
          </div>

          <div className="p-6">{children}</div>
        </div>
      </Container>
    </div>
  );
}
