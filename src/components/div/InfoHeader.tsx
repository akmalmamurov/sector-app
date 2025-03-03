import { cn } from "@/lib/utils";

interface InfoHeaderProps {
  children: React.ReactNode;
  className?: string;
}
export const InfoHeader = ({ children, className }: InfoHeaderProps) => {
  return (
    <div className={cn("pb-[25px] px-6  border-b border-superSilver", className)}>{children}</div>
  );
};

export default InfoHeader;
