import { cn } from "@/lib/utils";
import { AgentAdressRequest } from "@/types";
import { FieldError, UseFormRegister } from "react-hook-form";

interface Props {
  name: keyof AgentAdressRequest;
  register: UseFormRegister<AgentAdressRequest>;
  error?: FieldError;
  required?: boolean;
  type?: string;
  placeholder?: string;
  className?: string;
}

export const AgentAdressInput = ({
  name,
  register,
  error,
  className,
  required = true,
  type = "text",
  ...props
}: Props) => {
  return (
    <input
      type={type}
      id={String(name)}
      {...register(name, { required })}
      className={cn(
        `border ${
          error
            ? "border-dangerColor hover:border-dangerColor/50"
            : "border-superSilver hover:border-cerulean/50"
        } py-2 px-[15px] w-full focus:outline-none focus:border-cerulean`,className
      )}
      {...props}
      placeholder={props.placeholder}
    />
  );
};

export default AgentAdressInput;
