import Link from "next/link";
import { Container } from "../container";
import Image from "next/image";

const FooterBottom = () => {
  const currentYear = new Date().getFullYear();

  return (
    <div className="bg-[#003c82]">
      <Container>
        <div className="py-[55px] flex items-center justify-center md:justify-between flex-wrap md:flex-nowrap gap-8 gap-y-8">
          <p className="text-linkColor sm:text-white font-normal text-sm">
            © 2023–{currentYear} sectortechnology.uz
          </p>
          <div className="flex gap-[80px] items-center">
            <Link
              className="hover:opacity-80"
              target="_blank"
              href={"https://www.instagram.com/sectortechnology.ltd/"}
            >
              <Image
                className="md:w-[38px] md:h-[38px] w-[27px] h-[27px]"
                src="/instagram.svg"
                alt="instagram"
                width={39}
                height={39}
              />
            </Link>
            <Link
              className="hover:opacity-80"
              target="_blank"
              href={"https://t.me/SECTORTECHNOLOGYUZ"}
            >
              <Image
                className="md:w-[38px] md:h-[38px] w-[27px] h-[27px]"
                src="/telegram.svg"
                alt="telegram"
                width={39}
                height={39}
              />
            </Link>
            <Link
              className="hover:opacity-80"
              target="_blank"
              href={"#"}
            >
              <Image
                className="md:w-[35px] md:h-[25px] w-[27px] h-[27px]"
                src="/facebook.svg"
                alt="facebook"
                width={39}
                height={39}
              />
            </Link>
          </div>
          <div className="flex flex-col gap-2 gap-y-3">
            <Link
              href="#"
              className="text-end text-linkColor sm:text-white font-normal text-sm hover:opacity-80"
            >
              Политика конфиденциальности
            </Link>
            <Link
              href="/soglasie-na-obrabotku-personalnyh-dannyh"
              className="text-linkColor sm:text-white font-normal text-sm hover:opacity-80"
            >
              Политика обработки персональных данных
            </Link>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default FooterBottom;
