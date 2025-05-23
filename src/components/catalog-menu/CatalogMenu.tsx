import { useState, useRef, useEffect, memo } from "react";
import { Container } from "../container";
import Link from "next/link";
import { CloseIcon } from "@/assets/icons";
import { CatalogData } from "@/types";
import { usePathname } from "next/navigation";

interface Props {
  setMenuOpen: (open: boolean) => void;
  open: boolean;
  toggleButtonRef: React.RefObject<HTMLButtonElement | null>;
  catalogData: CatalogData[];
}

const CatalogMenu = ({
  setMenuOpen,
  toggleButtonRef,
  open,
  catalogData,
}: Props) => {
  const [hoveredParentIndex, setHoveredParentIndex] = useState<number>(0);
  const [delayedHoveredParentIndex, setDelayedHoveredParentIndex] =
    useState<number>(0);
  const menuRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();
  console.log(pathname.split("/"));

  useEffect(() => {
    const handleOutsideClick = (event: MouseEvent) => {
      if (
        menuRef.current &&
        !menuRef.current.contains(event.target as Node) &&
        toggleButtonRef.current &&
        !toggleButtonRef.current.contains(event.target as Node)
      ) {
        setMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleOutsideClick);
    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, [setMenuOpen, toggleButtonRef]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDelayedHoveredParentIndex(hoveredParentIndex);
    }, 300);
    return () => clearTimeout(timer);
  }, [hoveredParentIndex]);

  return (
    <div
      data-state={open ? "open" : "closed"}
      className={`fixed z-[101] bg-gray-500/50 flex justify-center transition-all ease-in-out w-full
        ${
          open
            ? "animate-in fade-in opacity-100 duration-300"
            : "animate-out fade-out opacity-0 duration-300"
        }
      `}
    >
      <Container>
        <div
          ref={menuRef}
          className="w-full bg-white h-screen overflow-y-auto shadow-lg transition-all duration-300 transform"
        >
          <div className="flex h-full w-full">
            <div className="w-[450px] xl:w-[537px] bg-cottonBall h-full py-[10px]">
              <ul className="flex flex-col">
                {catalogData?.map((item, parentIndex) => (
                  <Link
                    href={`${pathname.split("/")[2] === item.slug ? "" : `/catalog/${item.slug}`}`}
                    key={`parent-${parentIndex}`}
                    onClick={() => {
                      if (pathname.split("/")[2] === item.slug) {
                        setMenuOpen(true);
                      } else {
                        setMenuOpen(false);
                      }
                    }}
                    onMouseEnter={() => setHoveredParentIndex(parentIndex)}
                    className={`relative ${pathname.split("/")[2] === item.slug ? "text-cerulean cursor-default" : "text-black"} block py-[10px] px-3 xl:px-4 text-xs xl:text-sm font-normal transition-all duration-300 
                      ${
                        hoveredParentIndex === parentIndex
                          ? "bg-whisperBlue"
                          : "bg-transparent hover:bg-whisperBlue"
                      }
                    `}
                  >
                    {item.title}
                  </Link>
                ))}
              </ul>
            </div>

            <div className="bg-white w-full pl-5 xl:pl-[26px] xl:pr-10 pt-7 pb-12 relative overflow-y-auto h-[calc(100vh-200px)] flex justify-between">
              <div className="xl:w-[80%]">
                {delayedHoveredParentIndex !== null && (
                  <div
                    key={delayedHoveredParentIndex}
                    className="transition-all duration-300 ease-in-out opacity-100"
                  >
                    <ul className="grid grid-cols-3 gap-8">
                      {catalogData[delayedHoveredParentIndex]?.subcatalogs?.map(
                        (subCatalog, subIndex) => (
                          <li
                            key={`sub-${delayedHoveredParentIndex}-${subIndex}`}
                          >
                            <Link
                              onClick={() => {
                                if (
                                  pathname.split("/")[2] === subCatalog.slug &&
                                  !pathname.split("/")[3]
                                ) {
                                  setMenuOpen(true);
                                } else {
                                  setMenuOpen(false);
                                }
                              }}
                              href={`${pathname.split("/")[2] === subCatalog.slug && !pathname.split("/")[3] ? null : `/catalog/${subCatalog.slug}`}`}
                              className={`text-sm block font-semibold mb-3 ${pathname.split("/")[2] === subCatalog.slug && !pathname.split("/")[3] ? "text-cerulean cursor-default" : "text-black"} hover:text-cerulean duration-150`}
                            >
                              {subCatalog?.title}
                            </Link>
                            <div className="flex flex-col gap-4 transition-all duration-300 ease-in-out">
                              {subCatalog?.categories?.map(
                                (category, linkIndex) => (
                                  <Link
                                    onClick={() => {
                                      if (
                                        pathname.split("/")[2] ===
                                          subCatalog.slug &&
                                        pathname.split("/")[3] ===
                                          category?.slug
                                      ) {
                                        setMenuOpen(true);
                                      } else {
                                        setMenuOpen(false);
                                      }
                                    }}
                                    href={`${pathname.split("/")[2] === subCatalog.slug && pathname.split("/")[3] === category?.slug ? "" : `/catalog/${subCatalog.slug}/${category?.slug}`}`}
                                    key={`link-${delayedHoveredParentIndex}-${subIndex}-${linkIndex}`}
                                    className={`font-normal text-black text-xs hover:text-cerulean duration-150 ${pathname.split("/")[2] === subCatalog.slug && pathname.split("/")[3] === category?.slug ? "text-cerulean cursor-default" : "text-black"}`}
                                  >
                                    {category?.title}
                                  </Link>
                                )
                              )}
                            </div>
                          </li>
                        )
                      )}
                    </ul>
                  </div>
                )}
              </div>

              <div className="flex justify-start h-fit w-[20%]">
                <button
                  onClick={() => setMenuOpen(false)}
                  className="hover:bg-gray-200 rounded-full p-2 transition"
                >
                  <CloseIcon />
                </button>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default memo(CatalogMenu);
