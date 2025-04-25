"use client";
import { useState, useEffect } from "react";
import HeaderTop from "./HeaderTop";
import HeaderMenu from "./HeaderMenu";
import Navbar from "../navbar/Navbar";
import { useScrollDirection } from "@/hooks";
import { THRESHOLD } from "@/constants";

export const Header = () => {
  const scrollDir = useScrollDirection(THRESHOLD);

  const [scrolledBeyond, setScrolledBeyond] = useState(false);
  useEffect(() => {
    const checkScroll = () => {
      setScrolledBeyond(window.scrollY > THRESHOLD);
    };
    window.addEventListener("scroll", checkScroll);
    return () => window.removeEventListener("scroll", checkScroll);
  }, []);

  const baseClasses =
    "bg-white shadow-md w-full z-20 transform transition-opacity duration-300 ease-in-out";
  const stickyClasses = scrolledBeyond
    ? scrollDir === "up"
      ? " sticky top-0 translate-y-0 duration-300 ease-in-out"
      : " -translate-y-full duration-300 ease-in-out"
    : "";

  return (
    <header className={baseClasses + stickyClasses}>
      <div>
        <HeaderTop />
        <HeaderMenu />
        <Navbar />
      </div>
    </header>
  );
};
