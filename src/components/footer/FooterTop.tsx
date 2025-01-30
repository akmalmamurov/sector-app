import { footerData } from "@/data";
import Link from "next/link";

const FooterTop = () => {
  return (
    <div className="grid grid-cols-4 gap-7.5 pb-[56px]">
      {footerData.map((el, index) => (
        <div key={index}>
          <h3 className="text-white font-medium text-sm leading-[21px] uppercase w-fit">
            {el.name}
          </h3>
          <ul className="pt-6 flex flex-col gap-4">
            {el.links.map((item, index) => (
              <li key={index}>
                <Link
                  href={item?.link}
                  className="font-normal text-sm leading-[21px] text-white hover:text-white/80 hoverEffect"
                >
                  {item.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      ))}
      <div>
        <h3 className="text-white font-medium text-sm leading-[21px] uppercase w-fit">
          Ваш офис
        </h3>
        <ul className="pt-6 flex flex-col gap-4">
          <p className="font-normal text-sm leading-[21px] text-white">
            Ташкент
          </p>
          <Link
            href={"tel:+9999999999"}
            className="font-normal text-sm leading-[21px] text-white hover:text-white/80 hoverEffect"
          >
            +998 99 999 9999
          </Link>
          <Link
            href={"mailto:sales@nag.uz"}
            className="font-normal text-sm leading-[21px] text-white hover:text-white/80 hoverEffect"
          >
            sales@nag.uz
          </Link>
          <p className="font-normal text-sm leading-[21px] text-white">
            Ташкент, Мирзо-Улугбекский р-н, ул. Сайрам 7-тор (бывш.
            Э.Мараимова), д.52
          </p>
        </ul>
      </div>
    </div>
  );
};

export default FooterTop;
