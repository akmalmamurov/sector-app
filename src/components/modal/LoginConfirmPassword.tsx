import { X } from "lucide-react";
import { UseFormReturn } from "react-hook-form";
import {
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "../ui/form";
import LoginBrowser from "./LoginBrowser";
import { Button } from "../ui/button";
import axios from "axios";
import useStore from "@/context/store";
import { showError, showSuccess } from "../toast/Toast";
import Countdown from "react-countdown";
import { useEffect, useState } from "react";
import { maskEmail, validateNumber } from "@/utils";

interface Props {
  handleClose: (newStep?: number) => void;
  formMethods: UseFormReturn<{ optCode: string }>;
  fullClose: () => void;
}

const LoginConfirmPassword = ({
  handleClose,
  formMethods,
  fullClose,
}: Props) => {
  const {
    control,
    setValue,
    watch,
    formState: { errors },
  } = formMethods;
  const { setAuth, contact } = useStore();
  const [isExpired, setIsExpired] = useState(false);
  const [countdownEnd, setCountdownEnd] = useState<number | null>(null);

  useEffect(() => {
    if (!countdownEnd) {
      setCountdownEnd(Date.now() + 40 * 1000);
    }
  }, [countdownEnd]);

  const resendCode = () => {
    setIsExpired(false);
    setCountdownEnd(Date.now() + 40 * 1000);
  };

  const onInputChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setValue("optCode", value, { shouldValidate: true });
    const optCodeValue = watch("optCode");
    if (validateNumber(optCodeValue)) {
      try {
        const response = await axios.post(
          `${process.env.NEXT_PUBLIC_API_URL}/user/auth/sign-up`,
          { email: contact, optCode: optCodeValue },
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        console.log(response);
        
        fullClose();
        setAuth(true);
        localStorage.setItem("sector-token", response.data.token);
        showSuccess("Вы успешно зарегистрировались!!");
      } catch (error) {
        console.error("Login error:", error);
        showError("Ошибка регистрации");
      }
    }
  };

  return (
    <>
      <DialogHeader className="px-[40px] pt-5">
        <DialogTitle className="font-arial font-normal text-[26px] text-black">
          Введите код из E-mail
        </DialogTitle>
        <button
          onClick={() => fullClose()}
          className="text-black hover:text-gray-600 focus:outline-none absolute right-4 top-4"
        >
          <X className="w-6 h-6" />
        </button>
      </DialogHeader>
      <DialogDescription className="px-[40px] font-normal text-base text-textColor">
        Email получателя: {maskEmail(contact)}
      </DialogDescription>
      <div className="px-[40px]">
        <Form {...formMethods}>
          <form noValidate className="pb-5">
            <FormField
              control={control}
              name="optCode"
              render={({ field }) => (
                <FormItem className="mb-3">
                  <FormControl>
                    <input
                      placeholder="Введите пароль"
                      type="text"
                      {...field}
                      onChange={(e) => {
                        field.onChange(e);
                        onInputChange(e);
                      }}
                      className={`w-full px-3 py-[12px] mt-2 text-sm placeholder:text-darkSoul focus:outline-none 
                        ring-1 ring-darkSoul focus:ring-2 hover:ring-cerulean/70
                        ${
                          errors.optCode
                            ? "ring-red-500 focus:ring-red-500"
                            : "focus:ring-cerulean/70"
                        }`}
                    />
                  </FormControl>
                  <FormMessage>{errors.optCode?.message} </FormMessage>
                </FormItem>
              )}
            />
            {!isExpired ? (
              <div className="flex justify-center items-center mb-2 gap-1">
                <p className="font-normal text-base text-textColor">
                  Отправить код повторно через
                </p>
                {countdownEnd && (
                  <Countdown
                    date={countdownEnd}
                    onComplete={() => setIsExpired(true)}
                    renderer={({ minutes, seconds }) => (
                      <span className="font-normal text-base text-textColor">
                        0{minutes}:{seconds < 10 ? `0${seconds}` : seconds}
                      </span>
                    )}
                  />
                )}

                <p className="font-normal text-base text-textColor"> минута</p>
              </div>
            ) : (
              <Button
                type="submit"
                onClick={resendCode}
                // disabled={!isValid}
                //   className={`mt-6 w-full h-12 bg-cerulean text-white pt-[15px] pb-[17px] font-bold text-base leading-[18px] rounded-[9px] hover:bg-cerulean/90 hoverEffect
                // ${!isValid ? " bg-darkSoul " : ""}`}
                className={`mt-6 w-full h-12 bg-cerulean text-white pt-[15px] pb-[17px] font-bold text-base leading-[18px] rounded-[9px] hover:bg-cerulean/90 hoverEffect`}
              >
                Отправить код повторно
              </Button>
            )}
          </form>
        </Form>

        <div className="pb-6 border-b border-beluga flex justify-center">
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

export default LoginConfirmPassword;
