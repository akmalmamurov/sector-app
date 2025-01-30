import { cn } from "@/lib/utils";

interface Props {
  children: React.ReactNode;
  className?: string;
}
export const Title = ({ children, className }: Props) => {
  return <h1 className={cn("font-semibold text-[32px] leading-[31px] text-textColor w-fit", className)}>{children}</h1>;
};

export default Title;
