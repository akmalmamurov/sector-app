/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { X } from "lucide-react";
import { useState } from "react";
import { Input } from "../ui/input";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "../ui/form";

const formSchema = z.object({
  contact: z.string().refine((val) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phoneRegex = /^\+?[1-9]\d{1,14}$/;
    return emailRegex.test(val) || phoneRegex.test(val);
  }, "Введите корректный E-mail или номер телефона"),
});

interface Props {
  isOpen: boolean;
  handleOpen: () => void;
}

const LoginModal = ({ isOpen, handleOpen }: Props) => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      contact: "",
    },
  });

  const [inputType, setInputType] = useState<"email" | "tel">("email");

  const onInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phoneRegex = /^\+?[1-9]\d{1,14}$/;

    if (value.includes("@")) {
      setInputType("email");
    } else {
      setInputType("tel");
    }

    form.setValue("contact", value);
  };

  const onSubmit = (data: z.infer<typeof formSchema>) => {
    console.log("Form Data:", data);
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleOpen}>
      <DialogContent className="sm:max-w-[600px] rounded-none top-72 sm:rounded-none p-0">
        <DialogHeader className="px-[50px] py-10">
          <DialogTitle className="font-arial font-normal text-[26px] text-black">
            Вход и регистрация
          </DialogTitle>
          <button
            onClick={handleOpen}
            className="text-black hover:text-gray-600 focus:outline-none absolute right-4 top-4"
          >
            <X className="w-6 h-6" />
          </button>
        </DialogHeader>
        <div className="px-[50px]">
          <Form {...form}>
            <form noValidate onSubmit={form.handleSubmit(onSubmit)}>
              <FormField
                control={form.control}
                name="contact"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input
                        placeholder="Телефон или E-mail"
                        type={inputType}
                        {...field}
                        onChange={onInputChange}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <button
                type="submit"
                className="mt-4 w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700"
              >
                Отправить
              </button>
            </form>
          </Form>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default LoginModal;
