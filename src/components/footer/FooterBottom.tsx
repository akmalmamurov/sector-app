import { FacebookIcon, InstagramIcon, TelegramIcon } from "@/assets/icons";
import Link from "next/link";
import { Container } from "../container";

const FooterBottom = () => {
  const currentYear = new Date().getFullYear();

  return (
    <div className="bg-[#003c82]">
      <Container>
        <div className="py-[55px] flex items-center justify-center md:justify-between flex-wrap md:flex-nowrap gap-8 gap-y-8">
          <p className="text-linkColor sm:text-white font-normal text-sm">
            © 2022–{currentYear} sectortechnology.uz
          </p>
          <div className="flex gap-[80px]">
            <Link
              className="hover:opacity-80"
              target="_blank"
              href={"https://www.instagram.com/sectortechnology.ltd/"}
            >
              <InstagramIcon />
            </Link>
            <Link
              className="hover:opacity-80"
              target="_blank"
              href={"https://t.me/SECTORTECHNOLOGYUZ"}
            >
              <TelegramIcon />
            </Link>
            <Link
              className="hover:opacity-80"
              target="_blank"
              href={"https://www.facebook.com/akmal.mamuroff.5/"}
            >
              <FacebookIcon />
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
