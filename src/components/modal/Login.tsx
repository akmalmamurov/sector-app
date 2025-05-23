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
import useStore from "@/context/store";
import { showError } from "../toast/Toast";
import request from "@/services";
import { DOMAIN } from "@/constants";

interface Props {
  handleClose: (newStep?: number) => void;
  formMethods: UseFormReturn<{ contact: string }>;
  fullClose: () => void;
}

const Login = ({ handleClose, formMethods, fullClose }: Props) => {
  const { setContact } = useStore();
  const {
    control,
    handleSubmit,
    setValue,
    formState: { errors, isValid },
  } = formMethods;

  const onInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setValue("contact", value, { shouldValidate: true });
  };

  const onSubmitStep = async (data: { contact: string }) => {
    setContact(data.contact);

    try {
      const response = await request.post(
        `${DOMAIN}/user/auth/send-otp`,
        { email: data.contact },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (response.statusText === "OK") {
        handleClose(4);
      }
    } catch (error) {
      console.error("Login error:", error);
      showError("OTP уже отправлен, попробуйте еще раз");
    }
  };

  return (
    <>
      <DialogHeader className="px-[40px] pt-5">
        <DialogTitle className="font-arial font-normal text-[26px] text-black">
          Вход или регистрация
        </DialogTitle>
        <button
          onClick={() => fullClose()}
          className="text-black hover:text-gray-600 focus:outline-none absolute right-4 top-4"
        >
          <X className="w-6 h-6" />
        </button>
      </DialogHeader>
      <DialogDescription className="hidden">asdsad</DialogDescription>
      <div className="px-[40px]">
        <Form {...formMethods}>
          <form
            noValidate
            onSubmit={handleSubmit(onSubmitStep)}
            className="pb-5"
          >
            <FormField
              control={control}
              name="contact"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <input
                      placeholder="Телефон или E-mail"
                      type="text"
                      {...field}
                      onChange={onInputChange}
                      className={`w-full px-3 py-[12px] border-2 text-sm placeholder:text-darkSoul focus:outline-none 
                        ring-2 ring-darkSoul focus:ring-2 hover:ring-cerulean/70
                        ${
                          errors.contact
                            ? "ring-red-500 focus:ring-red-500"
                            : "focus:ring-cerulean/70"
                        }`}
                    />
                  </FormControl>
                  <FormMessage>{errors.contact?.message} </FormMessage>
                </FormItem>
              )}
            />

            <Button
              type="submit"
              disabled={!isValid}
              className={`mt-6 w-full h-12 bg-cerulean text-white pt-[15px] pb-[17px] font-bold text-base leading-[18px] rounded-[9px] hover:bg-cerulean/90 hoverEffect
                ${!isValid ? " bg-darkSoul " : ""}`}
            >
              Продолжить
            </Button>
          </form>
        </Form>

        <div className="pb-6 border-b border-beluga flex justify-center">
          <Button
            variant={"link"}
            onClick={() => handleClose(2)}
            className="font-arial font-normal text-base underline-offset-4 text-linkColor group"
          >
            <p className="group-hover:underline hoverEffect">Войти с паролем</p>
          </Button>
        </div>

        <LoginBrowser fullClose={fullClose} />
      </div>
    </>
  );
};

export default Login;
