import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import Image from "next/image";
import { productData } from "@/data";
type Product = {
  id: number;
  title: string;
  article: string;
  price: string;
  amount?: number;
  image: string;
};

type Category = {
  head: string;
  products: Product[];
};

type FormattedData = {
  [key: string]: Category;
};

const saleCategory: Category = {
  head: "Акции",
  products: [
    {
      id: 2001,
      title: "Акционный товар 1",
      article: "SALE-001",
      price: "500000",
      amount: 5,
      image: "/sale1.webp",
    },
    {
      id: 2002,
      title: "Акционный товар 2",
      article: "SALE-002",
      price: "750000",
      amount: 8,
      image: "/sale2.webp",
    },
  ],
};

const ProductTabs = () => {
  const formattedData: FormattedData = productData.reduce(
    (acc: FormattedData, category) => {
      const [key, value] = Object.entries(category)[0];
      acc[key] = value as Category;
      return acc;
    },
    {} as FormattedData
  );

  const keys = Object.keys(formattedData);
  const newFormattedData: FormattedData = {};
  keys.forEach((key, index) => {
    newFormattedData[key] = formattedData[key];
    if (index === 1) {
      newFormattedData["sale"] = saleCategory;
    }
  });
  return (
    <Tabs defaultValue={Object.keys(newFormattedData)[0]} className="bg-white">
      <TabsList className="flex gap-4 mb-4 border-b h-[54px] justify-between bg-white p-0">
        {Object.entries(newFormattedData).map(([key, category]) => (
          <TabsTrigger
            key={key}
            value={key}
            className="relative data-[state=active]:bg-white w-[208px]  text-gray-600  rounded-none data-[state=active]:shadow-none transition-all  before:absolute before:-bottom-[15px] before:left-0 before:w-full before:h-[5px] before:bg-gradient-to-r before:from-blue-400 before:to-cerulean before:opacity-0 data-[state=active]:before:opacity-100"
          >
            {category.head}
          </TabsTrigger>
        ))}
      </TabsList>

      {Object.entries(newFormattedData).map(([key, category]) => (
        <TabsContent
          key={key}
          value={key}
          className="grid grid-cols-4 gap-4 px-5"
        >
          {category.products.map((product) => (
            <div key={product.id} className="p-4 border rounded-lg">
              <div className="flex flex-col items-center text-center">
                <Image
                  src={product.image}
                  alt={product.title}
                  width={150}
                  height={150}
                  className="mb-2"
                />
                <h3 className="text-sm font-bold">{product.title}</h3>
                <p className="text-gray-500">{product.article}</p>
                <p className="text-lg font-semibold text-blue-600">
                  {product.price} сум
                </p>
              </div>
            </div>
          ))}
        </TabsContent>
      ))}
    </Tabs>
  );
};

export default ProductTabs;
