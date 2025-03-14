import { getBrandSingle } from "@/api";
import BrandFilter from "@/components/brand-filter/BrandFilter";
import { HomeCrumb } from "@/components/bread-crumb";
import { Container } from "@/components/container";
import { InfoHeader } from "@/components/div";
import { Section } from "@/components/section";
import { InfoTitle } from "@/components/title";

import Image from "next/image";

const SingleBrandPage = async ({
  params,
}: {
  params: Promise<{ slug: string }>;
}) => {
  const { slug } = await params;
  const brand = await getBrandSingle(slug);

  return (
    <Container className="pb-[58px]">
      <HomeCrumb
        paths={[
          { name: "Каталог брендов", href: "/brands" },
          { name: `${brand?.title}` },
        ]}
      />
      <div className="grid grid-cols-12 gap-4 lg:gap-8">
        <div className="col-span-3">
          <BrandFilter />
        </div>
        <div className="col-span-9">
          <Section className="mb-8 px-0 pb-20 shadow-sectionShadow">
            <InfoHeader className="mb-2">
              <InfoTitle>{brand?.title}</InfoTitle>
            </InfoHeader>

            <section className="p-6 min-h-[250px] relative">
              <div className="w-[300px] h-[250px] flex float-right justify-center items-center border border-superSilver mb-6 ml-5">
                <Image
                  src={`${process.env.NEXT_PUBLIC_API_URL}/${brand?.path}`}
                  alt={brand?.title}
                  className="w-auto h-auto max-w-[150px] max-h-[60px]"
                  width={200}
                  height={100}
                />
              </div>
              <h4 className="info-text text-base text-textColor">
                {brand?.description}
              </h4>
            </section>
          </Section>
          <Section className="mb-8 px-0 pb-6 shadow-sectionShadow">
            <InfoHeader className="mb-2">
              <InfoTitle>Товары {brand?.title}</InfoTitle>
            </InfoHeader>
          </Section>
        </div>
      </div>
    </Container>
  );
};

export default SingleBrandPage;
