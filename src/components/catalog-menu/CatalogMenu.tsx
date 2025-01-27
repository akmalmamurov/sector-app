import { useState, useRef, useEffect } from "react";
import { catalogMenu } from "@/data/catalogMenu";
import { Container } from "../container";
import Link from "next/link";
import { CloseIcon } from "@/assets/icons";

interface Props {
  setMenuOpen: (open: boolean) => void;
  toggleButtonRef: React.RefObject<HTMLButtonElement | null> ; 
}

const CatalogMenu = ({ setMenuOpen, toggleButtonRef }: Props) => {
  const [hoveredParentIndex, setHoveredParentIndex] = useState<number>(0);
  const menuRef = useRef<HTMLDivElement>(null) ;

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
    <div className="bg-gray-500 w-full min-h-screen overflow-y-hidden flex flex-row justify-center">
      <Container>
        <div className="w-full bg-white h-screen overflow-y-auto" ref={menuRef}>
          <div className="flex h-full">
            {/* Parent Links */}
            <div className="w-[537px] bg-cottonBall h-full py-7">
              <ul className="flex flex-col gap-[15px]">
                {catalogMenu.map((item, parentIndex) => (
                  <Link
                    href={`catalog/${item.id}`}
                    key={`parent-${parentIndex}`}
                    onMouseEnter={() => setHoveredParentIndex(parentIndex)}
                    className={`relative ${
                      hoveredParentIndex === parentIndex ? "bg-whisperBlue" : ""
                    } bg-transparent hover:bg-whisperBlue py-[10px] px-4 transition duration-300 text-textColor text-sm font-semibold`}
                  >
                    {item.name}
                  </Link>
                ))}
              </ul>
            </div>

            {/* Submenu Section */}
            <div
              className="bg-white w-full pl-[26px] pr-10 pt-7 pb-12 relative overflow-y-auto h-[calc(100vh-200px)] flex justify-between"
              style={{ scrollbarWidth: "none" }}
            >
              <div className="w-[80%]">
                {hoveredParentIndex !== null && (
                  <div
                    className={`transition-opacity duration-300 opacity-100`}
                  >
                    <ul className="grid grid-cols-3 gap-8">
                      {catalogMenu[hoveredParentIndex].subLinks.map(
                        (subLink, subIndex) => (
                          <li key={`sub-${hoveredParentIndex}-${subIndex}`}>
                            <Link
                              href={`/catalog/${subLink._id}`}
                              className="text-sm block font-semibold mb-[25px]"
                            >
                              {subLink.name}
                            </Link>
                            <div className="flex flex-col gap-2">
                              {subLink.links.map((links, linkIndex) => (
                                <Link
                                  href={`/catalog/${links?.id}`}
                                  key={`link-${hoveredParentIndex}-${subIndex}-${linkIndex}`}
                                  className="font-normal text-black text-sm"
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
