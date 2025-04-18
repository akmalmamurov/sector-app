import { FieldError, UseFormRegister } from "react-hook-form";
import { cn } from "@/lib/utils";
import { AgentAdressRequest } from "@/types";

interface Props {
  name: keyof AgentAdressRequest;
  register: UseFormRegister<AgentAdressRequest>;
  error?: FieldError;
  required?: boolean;
  type?: string;
  placeholder?: string;
  className?: string;
  autoComplete?: string;
  disabled?: boolean;
}

export const AgentAdressInput = ({
  name,
  register,
  error,
  className,
  required = true,
  type = "text",
  autoComplete = "off",
  disabled = false,
  ...props
}: Props) => {
  return (
    <input
      type={type}
      id={String(name)}
      disabled={disabled}
      autoComplete={autoComplete}
      {...register(name, { required })}
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

export default AgentAdressInput;
