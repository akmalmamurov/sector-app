"use client";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Input } from "@/components/ui/input";
import { Plus, Search } from "lucide-react";
import { useState } from "react";
const ContractorsPage = () => {
  const formSchema = z.object({
    // search: z.string().min(1, ""),
  });
  const [file, setFile] = useState<File | null>(null);
  const formMethods = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      select: "",
      search: "",
    },
  });
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = formMethods;
  const onSubmitStep2 = async (data: { select: string; search: string }) => {
    console.log(data);
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      setFile(event.target.files[0]);
    }
  };

  return (
    <div className="pt-5 pb-10">
      <Form {...formMethods}>
        <form
          noValidate
          onSubmit={handleSubmit(onSubmitStep2)}
          className="pb-5 flex flex-col gap-4 w-[30%]"
        >
          <FormField
            control={control}
            name="search"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <div className="relative w-full">
                    <Input
                      {...field}
                      type="text"
                      placeholder="Заказ, серийный номер, название"
                      className="pr-10 text-[14px] leading-[25px] h-[41px]"
                    />
                    <Search
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-darkSoul"
                      size={20}
                    />
                  </div>
                </FormControl>
                <FormMessage>{errors.search?.message}</FormMessage>
              </FormItem>
            )}
          />
          <FormField
            control={control}
            name="select"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <label
                    htmlFor="file-upload"
                    onDragOver={(e) => e.preventDefault()}
                    className="flex flex-col gap-4 items-center justify-center border-dashed border-2 border-[#E3E2E2] w-full h-[205px] cursor-pointer hover:bg-gray-50 transition relative"
                  >
                    <input
                      id="file-upload"
                      type="file"
                      {...field}
                      className="hidden"
                      onChange={handleFileChange}
                    />
                    {file ? (
                      <p className="text-gray-500 mt-2">{file.name}</p>
                    ) : (
                      <>
                        <Plus className="text-darkSoul w-10 h-10" />
                        <p className="text-darkSoul mt-2">
                          Добавить контрагенты
                        </p>
                      </>
                    )}
                  </label>
                </FormControl>
                <FormMessage>{errors.select?.message}</FormMessage>
              </FormItem>
            )}
          />
        </form>
      </Form>
    </div>
  );
};

export default ContractorsPage;
