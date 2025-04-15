import { cn } from "@/lib/utils";
import { OrderRequest } from "@/types";
import { FieldError, UseFormRegister } from "react-hook-form";

interface Props {
  name: keyof OrderRequest;
  register: UseFormRegister<OrderRequest>;
  error?: FieldError;
  required?: boolean;
  type?: string;
  placeholder?: string;
  className?: string;
}

export const FormInput = ({
  name,
  register,
  className,
  error,
  required = true,
  type = "text",
  ...props
}: Props) => {
  const validationRules = {
    required,
    ...(type === "email" && {
      pattern: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
    }),
  };

  return (
    <input
      type={type || "text"}
      id={String(name)}
      {...register(name, validationRules)}
      className={cn(
        `border ${
          error
            ? "border-dangerColor hover:border-dangerColor/50"
            : "border-superSilver hover:border-cerulean/50"
        } py-2 px-[15px] w-full focus:outline-none focus:border-cerulean`,
        className
      )}
      {...props}
      placeholder={props.placeholder}
    />
  );
};

export default FormInput;
