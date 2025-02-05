import { GoogleIcon, LinkedinIcon, YandexIcon } from "@/assets/icons";
import Link from "next/link";

const LoginBrowser = () => {
  return (
    <div className="py-5  font-arial">
      <h5 className="text-center font-normal text-base  text-textColor mb-5">
        Войти с помощью
      </h5>
      <div className="flex gap-[10px] justify-center mb-7">
        <button className="w-[68px] h-[50px] flex items-center justify-center bg-lightBg rounded-[10px] shadow-sm hover:bg-cerulean hoverEffect">
          <GoogleIcon/>
        </button>
        <button className="w-[68px] h-[50px] flex items-center justify-center bg-lightBg rounded-[10px] shadow-sm hover:bg-cerulean hoverEffect">
          <LinkedinIcon/>
        </button>
        <button className="w-[68px] h-[50px] flex items-center justify-center bg-lightBg rounded-[10px] shadow-sm hover:bg-cerulean hoverEffect">
          <YandexIcon/>
        </button>
      </div>
      <p className="text-center font-normal text-xs">
        Я согласен на обработку персональных данных, с 
        <Link href="/" className="text-linkColor underline underline-offset-2">
          условиями подписки,
        </Link>{" "}
        а также с подпиской на новостные рассылки. Управлять подпиской вы можете
        в личном кабинете.
      </p>
    </div>
  );
};

export default LoginBrowser;
