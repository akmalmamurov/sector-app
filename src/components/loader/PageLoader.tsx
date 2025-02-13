"use client";

import { useEffect, useState } from "react";

export const PageLoader = () => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    setProgress(10);

   const interval = setInterval(() => {
      setProgress((prev) => (prev < 95 ? prev + Math.random() * 10 : prev));
    }, 200);

    return () => {
      clearInterval(interval);
      setProgress(100);
    };
  }, []);

  return (
    <div className="fixed top-0 left-0 w-full h-[4px] bg-gray-300 overflow-hidden z-50">
      <div
        className="h-full bg-gradient-to-r from-red-500 to-red-700 transition-all duration-300 ease-in-out"
        style={{ width: `${progress}%` }}
      />
    </div>
  );
};

export default PageLoader;
