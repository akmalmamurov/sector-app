"use client";
import { GoogleIcon, LinkedinIcon, YandexIcon } from "@/assets/icons";
import Link from "next/link";
import useStore from "@/context/store";

type loginProp = "google" | "linkedin" | "facebook" | "yandex";
const LoginBrowser = ({ fullClose }: { fullClose: () => void }) => {
  const { setAuth } = useStore();

  const handleOAuthLogin = (provider: loginProp) => {
    const urls = {
      google: `${process.env.NEXT_PUBLIC_API_URL}/user/auth/google/login`,
      linkedin: `${process.env.NEXT_PUBLIC_API_URL}/user/auth/linkedin/login`,
      facebook: `${process.env.NEXT_PUBLIC_API_URL}/user/auth/facebook/login`,
      yandex: `${process.env.NEXT_PUBLIC_API_URL}/user/auth/yandex/login`,
    };
    window.location.href = urls[provider];
  };

  const handleLogin = (text: loginProp) => {
    handleOAuthLogin(text);
    const params = new URLSearchParams(window.location.search);
    const token = params.get("token");
    localStorage.setItem("sector-token", token ?? "");
    setAuth();
  };

  return (
    <div className="py-5 font-arial">
      <h5 className="text-center font-normal text-base text-textColor mb-5">
        Войти с помощью
      </h5>
      <div className="flex gap-[10px] justify-center mb-7">
        <button
          onClick={() => handleLogin("google")}
          className="w-[68px] h-[50px] flex items-center justify-center bg-lightBg rounded-[10px] shadow-sm hover:bg-cerulean hoverEffect"
        >
          <GoogleIcon />
        </button>
        <button
          onClick={() => handleLogin("linkedin")}
          className="w-[68px] h-[50px] flex items-center justify-center bg-lightBg rounded-[10px] shadow-sm hover:bg-cerulean hoverEffect"
        >
          <LinkedinIcon />
        </button>
        <button
          onClick={() => handleLogin("yandex")}
          className="w-[68px] h-[50px] flex items-center justify-center bg-lightBg rounded-[10px] shadow-sm hover:bg-cerulean hoverEffect"
        >
          <YandexIcon />
        </button>
      </div>
      <p className="text-center font-normal text-xs">
        Я согласен на обработку персональных данных, с{" "}
        <Link
          href="/"
          target="_blank"
          onClick={() => fullClose()}
          className="text-linkColor underline underline-offset-2"
        >
          условиями подписки,
        </Link>{" "}
        а также с подпиской на новостные рассылки. Управлять подпиской вы можете
        в личном кабинете.
      </p>
    </div>
  );
};

export default LoginBrowser;
