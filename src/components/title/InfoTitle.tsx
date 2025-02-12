import { cn } from "@/lib/utils";

type Props = {
  children: React.ReactNode;
  className?: string;
};

export const InfoTitle = ({ children, className }: Props) => {
  return (
    <h3
      className={cn(
        "relative font-arial font-normal text-[29px] text-textColor w-fit",
        "before:block before:w-full before:h-[2px] before:bg-cerulean before:absolute before:bottom-[-26px]",
        className
      )}
    >
      {children}
    </h3>
  );
};

export default InfoTitle;
