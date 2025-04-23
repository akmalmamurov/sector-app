import { getUser } from "@/api";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { Check } from "lucide-react";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { showError, showSuccess } from "../toast/Toast";
import request from "@/services";
import { UPDATE_ME } from "@/constants";

export const AccountMe = () => {
  const { data: userData, isLoading } = useQuery({
    queryKey: ["user"],
    queryFn: getUser,
  });

  const {
    register,
    handleSubmit,
    reset,
    formState: { isDirty },
  } = useForm<{ name: string; email: string }>({
    mode: "onChange",
    defaultValues: { name: "", email: "" },
  });
  const queryClient = useQueryClient();
  useEffect(() => {
    if (userData) {
      reset({ name: userData.name, email: userData.email });
    }
  }, [userData, reset]);

  const onSubmit = async (data: { name: string; email: string }) => {
    try {
      const res =  await request.put(UPDATE_ME, data);
      queryClient.invalidateQueries({ queryKey: ["user"] });
      showSuccess("Данные успешно обновлены");
      console.log(res);
      
      localStorage.setItem("sector-token", res.data.token);
    } catch (error) {
      console.log(error);
      showError("Произошла ошибка");
    }
    console.log(data);
  };

  if (isLoading) return <p>Загрузка…</p>;

  return (
    <div className="border-b border-superSilver pt-5">
      <form noValidate onSubmit={handleSubmit(onSubmit)} className="pb-5">
        <div className="grid grid-cols-4">
          <div className="col-span-3">
            <div className="flex gap-[100px]">
              <div className="w-[125px] shrink-0">
                <p className="text-[#000000DE] text-sm pt-5">Основные данные</p>
              </div>

              <div className="grid grid-cols-2 gap-[22px] flex-1 min-w-0">
                {/* Имя */}
                <div className="flex flex-col">
                  <label
                    htmlFor="name"
                    className="text-textColor font-normal text-sm inline-block pb-2 pt-10 lg:pt-0"
                  >
                    Имя
                  </label>
                  <input
                    id="name"
                    type="text"
                    autoComplete="off"
                    {...register("name")}
                    className="border border-superSilver h-10 focus:outline-none hover:border-cerulean/80 focus:border-cerulean text-black px-[15px]"
                  />
                </div>

                {/* Email */}
                <div className="flex flex-col">
                  <label
                    htmlFor="email"
                    className="text-textColor font-normal text-sm inline-block pb-2 pt-10 lg:pt-0"
                  >
                    Email
                  </label>
                  <input
                    id="email"
                    type="email"
                    autoComplete="off"
                    {...register("email")}
                    className="border border-superSilver h-10 focus:outline-none hover:border-cerulean/80 focus:border-cerulean text-black px-[15px]"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        <button
          type="submit"
          disabled={!isDirty}
          className="border mt-6 disabled:border-cerulean disabled:bg-white disabled:text-cerulean  flex items-center gap-2  py-2 px-[23px] justify-self-end text-white bg-cerulean"
        >
          <Check />
          <span className=" text-base font-semibold">Сохранить</span>
        </button>
      </form>
    </div>
  );
};

export default AccountMe;
