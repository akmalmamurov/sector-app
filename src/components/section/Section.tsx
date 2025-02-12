import { cn } from "@/lib/utils";

interface Props {
  children: React.ReactNode;
  className?: string;
}
export const Section = ({ children, className }: Props) => {
  return (
    <section
      className={cn(
        "bg-white border border-superSilver p-6 rounded-[10px]",
        className
      )}
    >
      {children}
    </section>
  );
};

export default Section;
