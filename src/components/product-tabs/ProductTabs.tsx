import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { productData, saleCategory } from "@/data";
import { ProductCard } from "../card";
import { ProductData } from "@/types";

type Category = {
  head: string;
  products: ProductData[];
};

type FormattedData = {
  [key: string]: Category;
};

const ProductTabs = () => {
  const formattedData: FormattedData = {};

  productData.forEach((category) => {
    const [key, value] = Object.entries(category)[0];
    formattedData[key] = value as Category;
  });

  formattedData["sale"] = saleCategory;
  console.log(Object.entries(formattedData));
  
  return (
    <Tabs defaultValue={Object.keys(formattedData)[0]} className="bg-white">
      <TabsList className="flex gap-4 rounded-none mb-4 border-b h-[54px] justify-between bg-white p-0">
        {Object.entries(formattedData).map(([key, category]) => (
          <TabsTrigger
            key={key}
            value={key}
            className="relative data-[state=active]:bg-white w-[208px] text-gray-600 rounded-none data-[state=active]:shadow-none transition-all before:absolute before:-bottom-[15px] before:left-0 before:w-full before:h-[5px] before:bg-gradient-to-r before:from-blue-400 before:to-cerulean before:opacity-0 data-[state=active]:before:opacity-100"
          >
            {category.head}
          </TabsTrigger>
        ))}
      </TabsList>

      {Object.entries(formattedData).map(([key, category]) => (
        <TabsContent
          key={key}
          value={key}
          className="grid grid-cols-3 lgl:grid-cols-4 gap-4 px-5"
        >
          {category.products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </TabsContent>
      ))}
    </Tabs>
  );
};

export default ProductTabs;
