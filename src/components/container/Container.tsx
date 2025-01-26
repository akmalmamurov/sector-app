import { cn } from "@/lib/utils";

interface Props {
  children: React.ReactNode;
  className?: string;
}
export const Container = ({ children, className }: Props) => {
  return (
    <div
      className={cn(
        "max-w-[1440px] w-full mx-auto px-4 sm:px-6 lg:px-6",
        className
      )}
    >
      {children}
    </div>
  );
};

export default Container;
