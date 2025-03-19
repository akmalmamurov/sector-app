import { FlexColIcon, FlexIcon } from "@/assets/icons";
import { InfoHeader } from "../div";
import { InfoTitle } from "../title";
import { ProductCard, ProductColCard } from "../card";
import useStore from "@/context/store";
import { CategoryProducts, ProductData } from "@/types";
interface CatalogsProductsProps {
    data: CategoryProducts;
    title: string;
}
export const CatalogsProducts: React.FC<CatalogsProductsProps> = ({ data, title}) => {
    const { rowCol, toggleRowCol } = useStore();
    const handleToggleRowCol = () => {
        toggleRowCol();
      };
  const productData: ProductData[] = data?.products;

  return (
    <div>
      <InfoHeader className="flex gap-[14px]">
        <InfoTitle>{title}</InfoTitle>
        <span className="text-weekColor font-medium text-base leading-6">
          {data?.total} товаров
        </span>
      </InfoHeader>
      {/* sort pagination grids */}
      <div className="p-[15px] pr-[125px] flex justify-between items-center border-b border-superSilver">
        <div className="flex gap-2">
          <button
            onClick={handleToggleRowCol}
            className="w-[42px] h-[42px] flex items-center justify-center border border-superSilver rounded-[10px]"
          >
            <FlexIcon
              className={`${!rowCol ? "text-merlin" : "text-dove"} w-6 h-6`}
            />
          </button>
          <button
            onClick={handleToggleRowCol}
            className="w-[42px] h-[42px] flex items-center justify-center border border-superSilver rounded-[10px]"
          >
            <FlexColIcon
              className={`${rowCol ? "text-merlin" : "text-dove"} w-6 h-6 `}
            />
          </button>
        </div>
      </div>
      {/* products */}
      <div className={!rowCol ? "p-5" : "p-0"}>
        {!rowCol ? (
          <div className="grid grid-cols-4 gap-[21px]">
            {productData?.map((item, index) => (
              <ProductCard key={index} product={item} />
            ))}
          </div>
        ) : (
          <div>
            {productData?.map((item, index) => (
              <ProductColCard key={index} product={item} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default CatalogsProducts;
