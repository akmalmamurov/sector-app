import { getUser } from "@/api";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { Check, Eye, EyeOff, TriangleAlert } from "lucide-react";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { showError, showSuccess } from "../toast/Toast";
import request from "@/services";
import { UPDATE_ME_PASSWORD } from "@/constants";

export const AccountPassword = () => {
  const { data: userData, isLoading } = useQuery({
    queryKey: ["user"],
    queryFn: getUser,
  });
  const queryClient = useQueryClient();

  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm<{
    oldPassword: string;
    newPassword: string;
    confirmPassword: string;
  }>({
    mode: "onChange",
    defaultValues: { oldPassword: "", newPassword: "", confirmPassword: "" },
  });

  useEffect(() => {
    if (userData) {
      reset(userData);
    }
  }, [userData, reset]);

  const [showOld, setShowOld] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
console.log(userData);

  const onSubmit = async (data: {
    oldPassword: string;
    newPassword: string;
  }) => {
    try {
      const { oldPassword, newPassword } = data;
      const res = await request.patch(UPDATE_ME_PASSWORD, {
        oldPassword,
        newPassword,
      });
      queryClient.invalidateQueries({ queryKey: ["user"] });
      showSuccess("Пароль успешно обновлён");
      localStorage.setItem("sector-token", res.data.token);
    } catch {
      showError("Ошибка при обновлении пароля");
    }
  };

  if (isLoading) return <p>Загрузка…</p>;

  return (
    <div className="border-b border-superSilver pt-5">
      <form noValidate onSubmit={handleSubmit(onSubmit)} className="pb-5">
        <div className="grid grid-cols-4">
          <div className="col-span-4">
            <div className="flex gap-[100px]">
              <div className="w-[125px] shrink-0">
                <p className="text-[#000000DE] text-sm pt-5">Основные данные</p>
              </div>
              <div className="grid grid-cols-3 gap-[22px] flex-1 min-w-0">
                {/* Старый пароль */}
                <div className="flex flex-col">
                  <label
                    htmlFor="oldPassword"
                    className="text-textColor text-sm pb-2 pt-10 lg:pt-0 select-none"
                  >
                    Старый пароль
                  </label>
                  <div className="relative w-full">
                    <input
                      id="oldPassword"
                      type={showOld ? "text" : "password"}
                      autoComplete="off"
                      {...register("oldPassword", {
                        required: false,
                      })}
                      className="border w-full border-superSilver h-10 px-[15px] focus:outline-none hover:border-cerulean/80 focus:border-cerulean"
                    />
                    <span
                      onClick={() => setShowOld((v) => !v)}
                      className="absolute right-3 top-[12px] cursor-pointer"
                    >
                      {showOld ? (
                        <EyeOff className="w-6 h-5" />
                      ) : (
                        <Eye className="w-6 h-5" />
                      )}
                    </span>
                  </div>
                  {errors.oldPassword && (
                    <span className="text-red-500 text-sm mt-1">
                      {errors.oldPassword.message}
                    </span>
                  )}
                </div>

                {/* Новый пароль */}
                <div className="flex flex-col relative">
                  <label
                    htmlFor="newPassword"
                    className="text-textColor text-sm pb-2 pt-10 lg:pt-0"
                  >
                    Новый пароль
                  </label>
                  <div className="relative w-full">
                    <input
                      id="newPassword"
                      onDrop={(e) => e.preventDefault()}
                      onPaste={(e) => e.preventDefault()}
                      type={showNew ? "text" : "password"}
                      autoComplete="off"
                      {...register("newPassword", {
                        required: "Введите новый пароль",
                        pattern: {
                          value: /(?=.*?[0-9])(?=.*?[A-Za-z]).{8,}/,
                          message:
                            "Минимум 8 символов, одна буква и одна цифра",
                        },
                      })}
                      className="border w-full border-superSilver h-10 px-[15px] focus:outline-none hover:border-cerulean/80 focus:border-cerulean"
                    />
                    <span
                      onClick={() => setShowNew((v) => !v)}
                      className="absolute right-3 top-[12px] cursor-pointer"
                    >
                      {showNew ? (
                        <EyeOff className="w-6 h-5" />
                      ) : (
                        <Eye className="w-6 h-5" />
                      )}
                    </span>
                  </div>

                  {errors.newPassword && (
                    <span className="text-red-500 text-sm mt-1">
                      {errors.newPassword.message}
                    </span>
                  )}
                </div>

                {/* Подтверждение пароля */}
                <div className="flex flex-col relative">
                  <label
                    htmlFor="confirmPassword"
                    className="text-textColor text-sm pb-2 pt-10 lg:pt-0"
                  >
                    Повторите пароль
                  </label>
                  <div className="relative w-full">
                    <input
                      id="confirmPassword"
                      type={showConfirm ? "text" : "password"}
                      onPaste={(e) => e.preventDefault()}
                      onDrop={(e) => e.preventDefault()}
                      autoComplete="off"
                      {...register("confirmPassword", {
                        required: "Подтвердите пароль",
                        validate: (v) =>
                          v === watch("newPassword") || "Пароли не совпадают",
                      })}
                      className="border w-full border-superSilver h-10 px-[15px] focus:outline-none hover:border-cerulean/80 focus:border-cerulean"
                    />
                    <span
                      onClick={() => setShowConfirm((v) => !v)}
                      className="absolute right-3 top-[12px] cursor-pointer"
                    >
                      {showConfirm ? (
                        <EyeOff className="w-6 h-5" />
                      ) : (
                        <Eye className="w-6 h-5" />
                      )}
                    </span>
                  </div>

                  {errors.confirmPassword && (
                    <span className="text-red-500 text-sm mt-1">
                      {errors.confirmPassword.message}
                    </span>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Внимание: требования к паролю */}
        <div className="bg-whiteOut flex items-center gap-2 p-5 pl-0 ml-[225px] mt-[10px]">
          <div className="w-[70px] flex justify-center items-center">
            <TriangleAlert className="text-[#8C8C8C] w-[24px] h-[24px]" />
          </div>
          <div className="text-[#8C8C8C] font-normal text-xs flex-1">
            <p>ВНИМАНИЕ!</p>
            <pre className="whitespace-pre-wrap">
              Пароль должен содержать не менее 8 символов, одну букву (A-z)(А-я)
              и одну цифру (0-9). Можно использовать специальные символы (! “ #
              $ % & ' ( ) * + , - . / : ; &lt; = &gt; ? @ [ ] ^_` {"{"} | {"}"}{" "}
              ~ )
            </pre>
          </div>
        </div>

        {/* Кнопка сохранения */}
        <button
          type="submit"
          className="border mt-6 bg-cerulean text-white flex items-center gap-2 py-2 px-[23px] justify-self-end hover:opacity-90"
        >
          <Check />
          <span className="text-base font-semibold">Сохранить</span>
        </button>
      </form>
    </div>
  );
};

export default AccountPassword;
