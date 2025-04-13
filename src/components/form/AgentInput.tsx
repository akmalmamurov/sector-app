import { cn } from "@/lib/utils";
import { ContrAgentRequest } from "@/types";
import { FieldError, UseFormRegister } from "react-hook-form";

interface Props {
  name: keyof ContrAgentRequest;
  register: UseFormRegister<ContrAgentRequest>;
  error?: FieldError;
  required?: boolean;
  type?: string;
  placeholder?: string;
  className?: string;
}

export const AgentInput = ({
  name,
  register,
  error,
  required = true,
  type = "text",
  className,
  
  ...props
}: Props) => {
  const validationRules = {
    required: required ? "Это поле обязательно" : false,
    ...(name === "inn" && {
      pattern: {
        value: /^\d{9}$/, 
        message: "ИНН должен состоять из 9 цифр.",
      },
    }),
    ...(name === "oked" && {
      pattern: {
        value: /^\d{5}$/,
        message: "ОКЭД может состоять только из 5 цифр.",
      },
    }),
  };

  return (
    <input
      type={type}
      id={String(name)}
      {...register(name, validationRules)}
      className={cn(`border py-2 px-[15px] w-full focus:outline-none focus:border-cerulean ${
        error
          ? "border-dangerColor hover:border-dangerColor/50"
          : "border-superSilver hover:border-cerulean/50"
      }`, className)}
      {...props}
      placeholder={props.placeholder}
    />
  );
};

export default AgentInput;
