import { CompareIcon, CompareSucessIcon, GoToSectionIcon, HeartActiveIcon, HeartIcon } from "@/assets/icons";
import useStore from "@/context/store";
import { CatalogData } from "@/types";
import Link from "next/link";

interface MobileGoSectionProps {
  selectedCatalog: CatalogData | null;
  handleGoToSection: () => void;
  onClose: () => void;
}
const MobileGoSection = ({
  selectedCatalog,
  handleGoToSection,
  onClose,
}: MobileGoSectionProps) => {
  const { favorites, compares } = useStore();
  return (
    <div className="flex flex-col mb-[30px]  px-[23px] pt-[23px]">
      {selectedCatalog !== null && (
        <button
          className="w-full h-10 flex items-center  border-b border-superSilver"
          onClick={handleGoToSection}
        >
          <GoToSectionIcon />
          <p className="text-textColor font-semibold ml-[15px]">
            Перейти в раздел
          </p>
        </button>
      )}
      <Link
        href={"/compare"}
        className="w-full h-10 flex items-center justify-between border-b border-superSilver text-textColor font-semibold"
        onClick={() => {
          onClose();
        }}
      >
        <div className="flex items-center">
          <span>
            {compares?.length > 0 ? (
              <CompareSucessIcon className="text-cerulean" />
            ) : (
              <CompareIcon className="text-darkSoul" />
            )}
          </span>
          <p
            className={`${compares?.length < 1 && "text-darkSoul"} font-semibold ml-[15px]`}
          >
            Перейти к сравнению
          </p>
        </div>
        <span
          className={`${compares?.length > 0 ? "text-white bg-dangerColor" : "text-darkSoul bg-transparent"} w-[22px] h-[22px] text-sm font-semibold rounded-full flex items-center justify-center`}
        >
          {compares.length}
        </span>
      </Link>
      <Link
        href={"/profile/favorites"}
        className="w-full h-10 flex items-center justify-between border-b border-superSilver"
        onClick={() => {
          onClose();
        }}
      >
        <div className="flex items-center">
          <span>
            {favorites?.length > 0 ? (
                 <HeartActiveIcon className="text-dangerColor w-6 h-6" />
            ) : (
              <HeartIcon className="text-darkSoul w-6 h-6" />
            )}
          </span>
          <p
            className={`${favorites?.length < 1 && "text-darkSoul"} font-semibold ml-[15px]`}
          >
            Перейти к избранное
          </p>
        </div>
        <span
          className={`${favorites?.length > 0 ? "text-white bg-dangerColor" : "text-darkSoul bg-transparent"} w-[22px] h-[22px] text-sm font-semibold rounded-full flex items-center justify-center`}
        >
          {favorites.length}
        </span>
      </Link>
    </div>
  );
};

export default MobileGoSection;
