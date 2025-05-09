import { footerData } from "@/data";
import Link from "next/link";
import { Container } from "../container";

const FooterTop = () => {
  return (
    <div className="bg-cerulean">
      <Container>
        <div className="flex flex-col flex-wrap pl-4 md:pl-1  sm:grid grid-cols-4 gap-7.5 pb-[56px]">
          {footerData.map((el, index) => (
            <div key={index}>
              <h3 className="text-white font-medium text-sm leading-[21px] uppercase w-fit">
                {el.name}
              </h3>
              <ul className="pt-6 pb-4 sm:pb-0 sm:pt-6 pl-4 sm:pl-0 flex flex-col gap-4">
                {el.links.map((item, index) => (
                  <li key={index}>
                    <Link
                      href={item?.link}
                      className="font-normal text-sm leading-[21px] text-linkColor sm:text-white hover:text-white/80 hoverEffect"
                    >
                      {item.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
          <div>
            <h3 className="text-white pt-8 sm:pt-1 font-medium text-sm leading-[21px] uppercase w-fit">
              Ваш офис
            </h3>
            <ul className="pt-6 flex flex-col gap-4 pl-4">
              <p className="font-normal text-sm leading-[21px] text-linkColor sm:text-white">
                Ташкент
              </p>
              <Link
                href={"tel:+998953731313"}
                className="font-normal text-sm leading-[21px] text-linkColor sm:text-white hover:text-white/80 hoverEffect"
              >
                +998 95 373 13 13
              </Link>
              <Link
                href={"mailto:sales@sectortechnology.uz"}
                className="font-normal text-sm leading-[21px] text-linkColor sm:text-white hover:text-white/80 hoverEffect"
              >
                sales@sectortechnology.uz
              </Link>
              <p className="font-normal text-sm leading-[21px] text-linkColor sm:text-white">
                Ташкент, Чиланзарский район, массив Чиланзар, 17-й квартал, 6
              </p>
            </ul>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default FooterTop;
