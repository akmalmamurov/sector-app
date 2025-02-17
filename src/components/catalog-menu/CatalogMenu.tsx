import { useState, useRef, useEffect } from "react";
import { catalogMenu } from "@/data/catalogMenu";
import { Container } from "../container";
import Link from "next/link";
import { CloseIcon } from "@/assets/icons";

interface Props {
  setMenuOpen: (open: boolean) => void;
  open: boolean;
  toggleButtonRef: React.RefObject<HTMLButtonElement | null>;
}

const CatalogMenu = ({ setMenuOpen, toggleButtonRef, open }: Props) => {
  const [hoveredParentIndex, setHoveredParentIndex] = useState<number>(0);
  const menuRef = useRef<HTMLDivElement>(null);

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

  return (
    <div
      data-state={open ? "open" : "closed"}
      className={`fixed  z-50 bg-gray-500/50 flex justify-center transition-all ease-in-out  w-full
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
          className="w-full bg-white h-screen overflow-y-auto shadow-lg  transition-all duration-300 transform 
       "
        >
          <div className="flex h-full">
            {/* Parent Links */}
            <div className="w-[537px] bg-cottonBall h-full py-7">
              <ul className="flex flex-col gap-[15px]">
                {catalogMenu.map((item, parentIndex) => (
                  <Link
                    href={`/catalog/${item.id}`}
                    key={`parent-${parentIndex}`}
                    onClick={() => setMenuOpen(false)}
                    onMouseEnter={() => setHoveredParentIndex(parentIndex)}
                    className={`relative block py-[10px] px-4 text-sm font-semibold transition-all duration-300 
                      ${
                        hoveredParentIndex === parentIndex
                          ? "bg-whisperBlue"
                          : "bg-transparent hover:bg-whisperBlue"
                      }
                    `}
                  >
                    {item.name}
                  </Link>
                ))}
              </ul>
            </div>

            {/* Submenu Section */}
            <div className="bg-white w-full pl-[26px] pr-10 pt-7 pb-12 relative overflow-y-auto h-[calc(100vh-200px)] flex justify-between">
              <div className="w-[80%]">
                {hoveredParentIndex !== null && (
                  <div className="transition-opacity duration-300 opacity-100">
                    <ul className="grid grid-cols-3 gap-8">
                      {catalogMenu[hoveredParentIndex].subLinks.map(
                        (subLink, subIndex) => (
                          <li key={`sub-${hoveredParentIndex}-${subIndex}`}>
                            <Link
                              onClick={() => setMenuOpen(false)}
                              href={`/catalog/${subLink._id}`}
                              className="text-sm block font-semibold mb-[25px]"
                            >
                              {subLink.name}
                            </Link>
                            <div className="flex flex-col gap-2">
                              {subLink.links.map((links, linkIndex) => (
                                <Link
                                  onClick={() => setMenuOpen(false)}
                                  href={`/catalog/${links?.id}`}
                                  key={`link-${hoveredParentIndex}-${subIndex}-${linkIndex}`}
                                  className="font-normal text-black text-sm hover:text-cerulean hoverEffect"
                                >
                                  {links?.name}
                                </Link>
                              ))}
                            </div>
                          </li>
                        )
                      )}
                    </ul>
                  </div>
                )}
              </div>

              {/* Close Button */}
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

export default CatalogMenu;
