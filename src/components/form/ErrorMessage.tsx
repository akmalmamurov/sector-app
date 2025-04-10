import { twMerge } from "tailwind-merge";

export const ErrorMessage = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <span className={twMerge("text-dangerColor text-xs font-normal mt-2 pb-2",className)}>
      {children}
    </span>
  );
};

export default ErrorMessage;
