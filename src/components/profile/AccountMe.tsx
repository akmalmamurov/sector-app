import { Check } from "lucide-react";

export const AccountMe = () => {
  return (
    <div className="border-b border-superSilver pt-5">
      <form noValidate className="pb-5">
        <div className="block lg:grid grid-cols-11 gap-6 items-center mb-4">
          <p className="text-[#000000DE] col-span-2 text-sm pt-5">
            Основные данные
          </p>

          <div className="relative w-full">
            <label
              htmlFor="name"
              className="text-textColor font-normal text-sm inline-block pb-2 pt-10 lg:pt-0"
            >
              Имя
            </label>
            <input
              type="text"
              id="name"
              value={"Негматов Бобурмирзо"}
              className="text-base rounded-none h-[41px] text-[#000000DE] border-superSilver"
            />
          </div>

          <div className="relative w-full">
            <label
              htmlFor="email"
              className="text-textColor font-normal text-sm inline-block pb-2 pt-10 lg:pt-0"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              className="text-base rounded-none text-[#000000DE] h-[41px] border-superSilver"
            />
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

export default AccountMe;
