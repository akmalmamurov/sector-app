import { useState, useEffect, useRef } from "react";

export function useScrollDirection() {
  const [scrollDir, setScrollDir] = useState<"up" | "down">("up");
  const lastScrollY = useRef(0);

  useEffect(() => {
    lastScrollY.current = window.scrollY;

    const update = () => {
      const currentY = window.scrollY;
      setScrollDir(currentY > lastScrollY.current ? "down" : "up");
      lastScrollY.current = currentY;
    };

    window.addEventListener("scroll", update);
    return () => window.removeEventListener("scroll", update);
  }, []);

  return scrollDir;
}
