"use client";

import { useState } from "react";
import { Sheet, SheetContent, SheetDescription, SheetTitle } from "@/components/ui/sheet";
import { AlignJustify, ChevronLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import { CatalogData, SubcatalogData } from "@/types";
import MobileGoSection from "./MobileGoSection";
import { ChevronRightIcon } from "@/assets/icons";

interface HeaderMobileProps {
  data: CatalogData[];
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
}

const HeaderMobile = ({ data, isOpen, setIsOpen }: HeaderMobileProps) => {
  const router = useRouter();
  const [selectedCatalog, setSelectedCatalog] = useState<CatalogData | null>(
    null
  );
  const [selectedSubcatalog, setSelectedSubcatalog] =
    useState<SubcatalogData | null>(null);
  const onClose = () => {
    setIsOpen(false);
    setSelectedCatalog(null);
    setSelectedSubcatalog(null);
  };

  const handleGoToSection = () => {
    if (selectedCatalog && selectedSubcatalog) {
      router.push(`/catalog/${selectedSubcatalog.slug}`);
      console.log(`Subcatalog slug: ${selectedSubcatalog.slug}`);
      onClose();
    } else if (selectedCatalog) {
      router.push(`/catalog/${selectedCatalog.slug}`);
      onClose();
    }
  };

  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent
        side="left"
        className="w-full max-h-screen overflow-y-auto p-0"
      >
        <SheetTitle className="hidden"></SheetTitle>
        <SheetDescription className="hidden"></SheetDescription>
        {/* header */}
        <div className="flex items-center p-[23px] border-b border-superSilver">
          {selectedCatalog ? (
            <button
              className="text-stoneCold"
              onClick={() => {
                if (selectedSubcatalog) {
                  setSelectedSubcatalog(null);
                } else {
                  setSelectedCatalog(null);
                }
              }}
            >
              <ChevronLeft className="h-5 w-5 cursor-pointer" />
            </button>
          ) : (
            <AlignJustify className="h-5 w-5 text-stoneCold" />
          )}
          <h2 className="text-lg ml-2 text-stoneCold font-normal">
            {selectedCatalog
              ? selectedSubcatalog
                ? selectedSubcatalog.title
                : selectedCatalog.title
              : "Каталог"}
          </h2>
        </div>

        <MobileGoSection selectedCatalog={selectedCatalog} handleGoToSection={handleGoToSection} onClose={onClose}/>

        {!selectedCatalog && (
          <ul className="px-[23px] ">
            {data.map((catalog) => (
              <li
                key={catalog.slug}
                className="cursor-pointer py-2 text-textColor border-b border-superSilver flex justify-between items-center"
                onClick={() => setSelectedCatalog(catalog)}
              >
                {catalog.title}
                <span>
                  <ChevronRightIcon/>
                </span>
              </li>
            ))}
          </ul>
        )}

        {selectedCatalog && !selectedSubcatalog && (
          <ul className="px-[23px]">
            {selectedCatalog.subcatalogs.map((subcatalog) => (
              <li
                key={subcatalog.slug}
                className="cursor-pointer  py-2 text-textColor border-b border-superSilver flex justify-between items-center"
                onClick={() => setSelectedSubcatalog(subcatalog)}
              >
                {subcatalog.title}
                <span>
                  <ChevronRightIcon/>
                </span>
              </li>
            ))}
          </ul>
        )}

        {selectedSubcatalog && (
          <ul className="px-[23px]">
            {selectedSubcatalog.categories.map((category) => (
              <li
                key={category.slug}
                className="cursor-pointer py-2 text-textColor border-b border-superSilver flex justify-between items-center"
                onClick={() => {
                  router.push(
                    `/catalog/${selectedSubcatalog.slug}/${category.slug}`
                  );
                  onClose();
                }}
              >
                {category.title}
                <span>
                  <ChevronRightIcon/>
                </span>
              </li>
            ))}
          </ul>
        )}
      </SheetContent>
    </Sheet>
  );
};

export default HeaderMobile;
