import { X } from "lucide-react";
import { UseFormReturn } from "react-hook-form";
import { Form, FormControl, FormField, FormItem, FormMessage, } from "../ui/form";
import { DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { showError, showSuccess } from "../toast/Toast";
import { LOGIN_PASSWORD } from "@/constants";
import LoginBrowser from "./LoginBrowser";
import useStore from "@/context/store";
import { Button } from "../ui/button";
import request from "@/services";

interface Props {
  handleClose: (newStep?: number) => void;
  formMethods: UseFormReturn<{ email: string; password: string }>;
  fullClose: () => void;
}

const LoginPassword = ({ handleClose, formMethods, fullClose }: Props) => {
  const {
    control,
    handleSubmit,
    formState: { errors, isValid },
  } = formMethods;
  const { setAuth } = useStore();

  const onSubmitStep2 = async (data: { email: string; password: string }) => {
    try {
      const response = await request.post(LOGIN_PASSWORD, data);
      if (response.statusText === "OK") {
        fullClose();
        setAuth(true);
        localStorage.setItem("sector-token", response.data.token);
        showSuccess("Вы успешно вошли в систему!");
      }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      if (error.status === 400) {
        showError("Парол или E-mail неверны");
      }
    }
  };

  return (
    <>
      <DialogHeader className="px-[40px] pt-5 ">
        <DialogTitle className="font-arial font-normal text-[26px] text-black">
          Вход с паролем
        </DialogTitle>
        <button
          onClick={() => fullClose()}
          className="text-black hover:text-gray-600 focus:outline-none absolute right-4 top-4"
        >
          <X className="w-6 h-6" />
        </button>
      </DialogHeader>

      <div className="px-[40px]">
        <Form {...formMethods}>
          <form
            noValidate
            onSubmit={handleSubmit(onSubmitStep2)}
            className="pb-5"
          >
            <FormField
              control={control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <input
                      placeholder="Введите E-mail"
                      type="email"
                      {...field}
                      className={`w-full border-2 px-3 py-[12px] text-sm placeholder:text-darkSoul focus:outline-none ring-1 
                        ring-darkSoul focus:ring-2 hover:ring-cerulean/70
                      ${errors.email ? "ring-red-500 focus:ring-red-500" : "focus:ring-cerulean/70"}`}
                    />
                  </FormControl>
                  <FormMessage>{errors.email?.message}</FormMessage>
                </FormItem>
              )}
            />
            <FormField
              control={control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <input
                      placeholder="Введите пароль"
                      type="password"
                      {...field}
                      className={`w-full border-2 px-3 py-[12px] mt-2 text-sm placeholder:text-darkSoul focus:outline-none 
                        ring-1 ring-darkSoul focus:ring-2 hover:ring-cerulean/70
                        ${
                          errors.password
                            ? "ring-red-500 focus:ring-red-500"
                            : "focus:ring-cerulean/70"
                        }`}
                    />
                  </FormControl>
                  <FormMessage>{errors.password?.message}</FormMessage>
                </FormItem>
              )}
            />
            <Button
              disabled={!isValid}
              type="submit"
              className={`mt-6 w-full h-12 bg-cerulean text-white pt-[15px] pb-[17px] font-bold text-base leading-[18px] rounded-[9px] hover:bg-cerulean/90 hoverEffect
                ${!isValid ? " bg-darkSoul " : ""}`}
            >
              Войти
            </Button>
          </form>
        </Form>

        <div className="pb-6 border-b border-beluga flex flex-col gap-3 items-center-center">
          <button
            onClick={() => handleClose(3)}
            className="font-arial font-normal text-base underline-offset-4 text-linkColor group"
          >
            <p className="group-hover:underline hoverEffect">Забыли пароль?</p>
          </button>
          <button
            onClick={() => handleClose(1)}
            className="font-arial font-normal text-base underline-offset-4 text-linkColor group"
          >
            <p className="group-hover:underline hoverEffect">
              Выбрать другой способ входа
            </p>
          </button>
        </div>
        <LoginBrowser fullClose={fullClose} />
      </div>
    </>
  );
};

export default LoginPassword;
