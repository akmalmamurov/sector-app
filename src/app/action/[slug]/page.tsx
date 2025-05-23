import { getPromotionSingle } from "@/api/promotion";
import { HomeCrumb } from "@/components/bread-crumb";
import { Container } from "@/components/container";
import { InfoHeader } from "@/components/div";
import { Section } from "@/components/section";
import { InfoTitle } from "@/components/title";
import { DOMAIN } from "@/constants";
import { formatDate } from "@/utils";
import { Metadata } from "next";
import Image from "next/image";
type Props = {
  params: Promise<{ slug: string }>;
};
export const metadata: Metadata = {
  title: "Акции, расподажи и скидки | Sector Technology",
  description: "Акции, расподажи и скидки",
};
const SingleDiscount = async ({ params }: Props) => {
  const { slug } = await params;
  const discount = await getPromotionSingle(slug);
  console.log(discount);

  return (
    <Container className="pb-[58px]">
      <HomeCrumb
        paths={[{ name: "Акции", href: "/action" }, { name: discount?.title }]}
      />
      <Section className="py-[23px] px-0 rounded-none shadow-sectionShadow">
        <InfoHeader>
          <InfoTitle className="font-wix text-[21px]">
            {discount?.title}
          </InfoTitle>
        </InfoHeader>
        <div className="p-[23px]">
          <div className="flex flex-col ">
            <Image
              src={`${DOMAIN}/${discount?.bannerImage}`}
              alt="bannerImage"
              width={600}
              height={200}
              className="w-full h-[221px] md:h-[421px] object-cover"
            />
            <div className="bg-white shadow-md flex flex-col gap-4 md:flex-row justify-between p-[23px]">
              <p>Сезонная распродажа грозозащиты</p>
              <p className="text-[#FF3333] text-xs font-normal mt-auto flex justify-end">
                Действует до <span>{formatDate(discount.expireDate)}</span>
              </p>
            </div>
          </div>
        </div>
      </Section>
    </Container>
  );
};

export default SingleDiscount;
