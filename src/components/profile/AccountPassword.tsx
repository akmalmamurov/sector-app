import { Check, Eye, TriangleAlert } from "lucide-react";
import React from "react";

export const AccountPassword = () => {
  return (
    <div className="border-b border-superSilver pt-5">
      <form noValidate className="pb-5">
        <div className="block lg:grid grid-cols-11 gap-6 items-center mb-3">
          <p className="text-[#000000DE] col-span-2 text-sm pt-5">
            Безопасность
          </p>

          <div className="relative w-full flex flex-col">
            <label
              htmlFor="oldPassword"
              className="text-textColor font-normal text-sm inline-block pb-2 pt-10 lg:pt-0"
            >
              Старый пароль
            </label>
            <div className="relative">
              <input
                type="password"
                id="oldPassword"
                className="pr-10 text-base rounded-none text-[#000000DE] h-[41px] border border-superSilver"
              />
              <Eye
                className="absolute right-3 top-1/2 -translate-y-1/2 text-textColor"
                size={20}
              />
            </div>
          </div>

          <div className="relative w-full flex flex-col">
            <label
              htmlFor="newPassword"
              className="text-textColor font-normal text-sm inline-block pb-2 pt-5 lg:pt-0"
            >
              Новый пароль
            </label>
            <div className="relative">
              <input
                type="password"
                id="newPassword"
                className="pr-10 text-base rounded-none text-[#000000DE] h-[41px] border border-superSilver"
              />
              <Eye
                className="absolute right-3 top-1/2 -translate-y-1/2 text-textColor"
                size={20}
              />
            </div>
          </div>

          <div className="relative w-full flex flex-col">
            <label
              htmlFor="repeatPassword"
              className="text-textColor font-normal text-sm inline-block pb-2 pt-10 lg:pt-0"
            >
              Новый пароль (повтор)
            </label>
            <div className="relative">
              <input
                type="password"
                id="repeatPassword"
                className="pr-10 text-base rounded-none text-[#000000DE] h-[41px] border border-superSilver"
              />
              <Eye
                className="absolute right-3 top-1/2 -translate-y-1/2 text-textColor"
                size={20}
              />
            </div>
          </div>
        </div>
        <div className="bg-whiteOut flex items-center gap-2 mb-6 p-5 pl-0 w-[100%] lg:w-[72%] ml-auto">
          <div className="w-[70px] flex justify-center items-center">
            <TriangleAlert className="text-[#8C8C8C] w-[24px] h-[24px]" />
          </div>
          <div className="text-[#8C8C8C] font-normal text-xs flex-1">
            <p>ВНИМАНИЕ!</p>
            <pre className="text-wrap">
              Пароль должен содержать не менее 8 символов, одну букву (A-z)(А-я)
              и одну цифру (0-9). Можно использовать специальные символы (! “ #
              $ % &amp; ' ( ) * + , - . / : ; &lt; = &gt; ? @ [ ] ^_` {"{"} |{" "}
              {"}"} ~ )
            </pre>
          </div>
        </div>
        <button className="border border-cerulean rounded-xl flex items-center gap-2 h-[42px] p-4 justify-self-end">
          <Check className="text-cerulean" />
          <span className="text-cerulean text-base font-semibold">
            Сохранить
          </span>
        </button>
      </form>
    </div>
  );
};

export default AccountPassword;
