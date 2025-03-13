"use client";

import { CatalogData } from "@/types";
import { useState } from "react";
import { Sheet, SheetContent, SheetTitle } from "@/components/ui/sheet";
import { AlignJustify, ArrowLeft, ChevronRight } from "lucide-react";
import { useRouter } from "next/navigation";

const HeaderMobile = ({
  data,
  isOpen,
  setIsOpen,
}: {
  data: CatalogData[];
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}) => {
  const router = useRouter();
  const [activeSub, setActiveSub] = useState<string | null>(null);
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [subSlug, setSubSlug] = useState<string | null>(null);

  function onClose() {
    setIsOpen(false);
    setActiveSub(null);
    setActiveCategory(null);
    setSubSlug(null);
  }

  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent
        side="left"
        aria-describedby={undefined}
        className="w-full p-4 max-h-screen overflow-y-auto"
      >
        <SheetTitle className="sr-only">Katalog</SheetTitle>
        {!activeSub ? (
          <>
            <div className="flex items-center pb-4 mb-4 border-b border-stoneCold">
              <AlignJustify className="h-5 w-5 text-stoneCold" />
              <h2 className="text-lg ml-2 text-stoneCold font-normal">
                Katalog
              </h2>
            </div>

            <ul className="space-y-2">
              {data.map((item) => (
                <li
                  key={item.title}
                  className="flex justify-between items-center cursor-pointer hover:bg-gray-100 py-2 rounded-md"
                  onClick={() => {
                    setActiveSub(item.title);
                  }}
                >
                  <p className="flex-1">{item.title}</p>
                  <div className="w-4 h-4">
                    {item.subcatalogs.length > 0 && (
                      <ChevronRight className="w-full h-full" />
                    )}
                  </div>
                </li>
              ))}
            </ul>
          </>
        ) : !activeCategory ? (
          <>
            <div className="flex items-center mb-4">
              <ArrowLeft
                className="h-5 w-5 cursor-pointer"
                onClick={() => setActiveSub(null)}
              />
              <h2 className="text-lg font-bold ml-2">{activeSub}</h2>
            </div>

            <ul className="space-y-2">
              {data
                .find((sub) => sub.title === activeSub)
                ?.subcatalogs.map((item) => (
                  <li
                    key={item.title}
                    className="flex justify-between items-center cursor-pointer hover:bg-gray-100 p-2 rounded-md"
                    onClick={() => {
                      setActiveCategory(item.title);
                      setSubSlug(item.slug);
                    }}
                  >
                    <p>{item.title}</p>
                    {item.categories.length > 0 && (
                      <ChevronRight className="h-4 w-4" />
                    )}
                  </li>
                ))}
            </ul>
          </>
        ) : (
          <>
            <div className="flex items-center mb-4">
              <ArrowLeft
                className="h-5 w-5 cursor-pointer"
                onClick={() => setActiveCategory(null)}
              />
              <h2 className="text-lg font-bold ml-2">{activeCategory}</h2>
            </div>
            <ul className="space-y-2">
              {data
                .find((sub) => sub.title === activeSub)
                ?.subcatalogs.find(
                  (category) => category.title === activeCategory
                )
                ?.categories.map((item) => (
                  <li
                    onClick={() => {
                      if (subSlug) {
                        router.push(`/catalog/${subSlug}/${item.slug}`);
                        onClose();
                      }
                    }}
                    key={item.id}
                    className="p-2 hover:bg-gray-100 rounded-md cursor-pointer"
                  >
                    {item.title}
                  </li>
                ))}
            </ul>
          </>
        )}
      </SheetContent>
    </Sheet>
  );
};

export default HeaderMobile;
