import { FacebookIcon, InstagramIcon, TelegramIcon } from "@/assets/icons";
import Link from "next/link";

const FooterBottom = () => {
  const currentYear = new Date().getFullYear(); // Hozirgi yilni olish

  return (
    <div className="py-[55px] flex items-center justify-between">
      <p className="text-white font-normal text-sm">
        © 2022–{currentYear} sectortechnology.uz
      </p>
      <div className="flex gap-[115px]">
        <Link href={"https://www.instagram.com/akmalmamuroff"} target="_blank">
          <InstagramIcon />
        </Link>
        <Link href={"https://t.me/akmalmamuroff"} target="_blank">
          <TelegramIcon />
        </Link>
        <Link href={"https://www.facebook.com/akmal.mamuroff.5/"} target="_blank">
          <FacebookIcon />
        </Link>
      </div>
      <div>
        <p className="text-end text-white font-normal text-sm">
          Политика конфиденциальности
        </p>
        <p className="text-white font-normal text-sm">
          Политика обработки персональных данных
        </p>
      </div>
    </div>
  );
};

export default FooterBottom;
