import { cn } from "@/lib/utils";

interface Props {
  children: React.ReactNode;
  className?: string;
}
export const Title = ({ children, className }: Props) => {
  return <h1 className={cn("font-normal lgl:font-semibold text-2xl lgl:text-[32px] leading-[31px] text-textColor w-fit", className)}>{children}</h1>;
};

export default Title;
