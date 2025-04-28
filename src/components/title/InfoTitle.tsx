import { cn } from "@/lib/utils";

type Props = {
  children: React.ReactNode;
  className?: string;
};

export const InfoTitle = ({ children, className }: Props) => {
  return (
    <p
      className={cn(
        "relative font-arial font-normal text-[18px] md:text-[29px] text-textColor w-fit",
        "before:block before:w-full before:h-[2px] before:bg-cerulean before:absolute before:bottom-[-26px]",
        className
      )}
    >
      {children}
    </p>
  );
};

export default InfoTitle;
