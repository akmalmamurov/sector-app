"use client";

import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import HeaderTop from "./HeaderTop";
import HeaderMenu from "./HeaderMenu";
import Navbar from "../navbar/Navbar";
import { useScrollDirection } from "@/hooks";
import { THRESHOLD } from "@/constants";

export const Header = () => {
  const pathname = usePathname();
  const scrollDir = useScrollDirection();
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const onScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", onScroll);
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const isHome = pathname === "/";

  const shouldBeSticky = scrollDir === "up" && (isHome ? scrollY > THRESHOLD : true);

  return (
    <header
      className={`bg-white shadow-md w-full z-20  top-0 ${shouldBeSticky ? "sticky" : "static"}`}
    >
      <HeaderTop />
      <HeaderMenu />
      <Navbar />
    </header>
  );
};
