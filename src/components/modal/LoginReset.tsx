import { X } from "lucide-react";
import { DialogHeader, DialogTitle } from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "../ui/form";
import { UseFormReturn } from "react-hook-form";
import { Button } from "../ui/button";

interface Props {
  formMethods: UseFormReturn<{ resetEmail: string }>;
  fullClose: () => void;
}

const LoginReset = ({ formMethods, fullClose }: Props) => {
  const {
    control,
    handleSubmit,
    formState: { errors, isValid },
  } = formMethods;

  const onSubmitStep3 = (data: { resetEmail: string }) => {
    console.log("Step 3 Data:", data);
  };

  return (
    <>
      <DialogHeader className="px-[40px] pt-8">
        <DialogTitle className="font-arial font-normal text-[26px] text-black">
          Восстановление пароля
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
            onSubmit={handleSubmit(onSubmitStep3)}
            className="pb-[32px]"
          >
            <FormField
              control={control}
              name="resetEmail"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <input
                      placeholder="Введите ваш E-mail"
                      type="email"
                      {...field}
                      className={`w-full px-3 py-[12px] mt-2 text-sm placeholder:text-darkSoul focus:outline-none hoverEffect 
                        ring-1 ring-darkSoul focus:ring-2 hover:ring-cerulean/70
                        ${
                          errors.resetEmail
                            ? "ring-red-500 focus:ring-red-500"
                            : "focus:ring-cerulean/70"
                        }`}
                    />
                  </FormControl>
                  <FormMessage>{errors.resetEmail?.message}</FormMessage>
                </FormItem>
              )}
            />
            <Button
              disabled={!isValid}
              type="submit"
              className={`mt-6 w-full h-12 bg-cerulean text-white pt-[15px] pb-[17px] font-bold text-base leading-[18px] rounded-[9px] hover:bg-cerulean/90 hoverEffect
                ${!isValid ? " bg-darkSoul " : ""}`}
            >
              Восстановить пароль
            </Button>
          </form>
        </Form>
      </div>
    </>
  );
};

export default LoginReset;
