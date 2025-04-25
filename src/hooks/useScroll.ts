"use client";
import { useState, useEffect, useRef } from "react";

export function useScrollDirection(threshold = 400) {
  const [scrollDir, setScrollDir] = useState<"up" | "down">("up");
  const lastScrollY = useRef(0);

  useEffect(() => {
    lastScrollY.current = window.scrollY;
    const updateScrollDir = () => {
      const currentScrollY = window.scrollY;
      if (currentScrollY > threshold) {
        setScrollDir(currentScrollY > lastScrollY.current ? "down" : "up");
      }
      lastScrollY.current = currentScrollY;
    };

    window.addEventListener("scroll", updateScrollDir);
    return () => window.removeEventListener("scroll", updateScrollDir);
  }, [threshold]);

  return scrollDir;
}
