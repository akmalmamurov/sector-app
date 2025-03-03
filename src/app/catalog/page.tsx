import Link from "next/link";

import { getCatalog } from "@/api/catalog";
import { CatalogChevronIcon } from "@/assets/icons";
import { HomeCrumb } from "@/components/bread-crumb";
import { Container } from "@/components/container";
import { InfoHeader } from "@/components/div";
import { Section } from "@/components/section";
import { InfoTitle } from "@/components/title";
import { CatalogData } from "@/types";

const CatalogPage = async () => {
  const catalogData = await getCatalog();

  return (
    <Container className="pb-[58px]">
      <HomeCrumb paths={[{ name: "Каталог товаров" }]} />
      <Section className="px-0 rounded-none shadow-sectionShadow">
        <InfoHeader className="mb-5">
          <InfoTitle>Каталог товаров</InfoTitle>
        </InfoHeader>
        <div className="p-6 grid grid-cols-2">
          {catalogData?.map((item: CatalogData) => (
            <div key={item?.id} className="mb-[50px]">
              <div className="mb-7">
                <Link
                  href={`/catalog/${item?.slug}`}
                  className="font-normal text-[21px] text-textColor hover:text-celBlue duration-150 ease-in-out"
                >
                  {item?.title}
                </Link>
              </div>
              <div className="flex flex-col gap-2">
                {item.subcatalogs?.map((subcatalog) => (
                  <Link
                    key={subcatalog?.id}
                    href={`/catalog/${subcatalog?.slug}`}
                    className="flex items-center text-xs text-textColor hover:text-celBlue duration-150 ease-in-out"
                  >
                    <span className="mr-[4.68px]">
                      <CatalogChevronIcon />
                    </span>
                    {subcatalog?.title}
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </div>
      </Section>
    </Container>
  );
};

export default CatalogPage;
