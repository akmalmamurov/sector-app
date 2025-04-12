import { ContrAgentRequest } from "@/types";
import { FieldError, UseFormRegister } from "react-hook-form";

interface Props {
  name: keyof ContrAgentRequest;
  register: UseFormRegister<ContrAgentRequest>;
  error?: FieldError;
  required?: boolean;
  type?: string;
}

export const AgentInput = ({
  name,
  register,
  error,
  required = true,
  type = "text",
  ...props
}: Props) => {
  const validationRules = {
    required: required ? "Это поле обязательно" : false,
    ...(name === "inn" && {
      pattern: {
        value: /^\d{9}$/, // Faqat 9 ta raqam
        message: "ИНН должен состоять из 9 цифр.",
      },
    }),
    ...(name === "oked" && {
      pattern: {
        value: /^\d{5}$/, // Faqat 5 ta raqam
        message: "ОКЭД может состоять только из 5 цифр.",
      },
    }),
  };

  return (
    <input
      type={type}
      id={String(name)}
      {...register(name, validationRules)}
      className={`border py-2 px-[15px] w-full focus:outline-none focus:border-cerulean ${
        error
          ? "border-dangerColor hover:border-dangerColor/50"
          : "border-superSilver hover:border-cerulean/50"
      }`}
      {...props}
    />
  );
};

export default AgentInput;
