import {
  HoverCard,
  HoverCardTrigger,
  HoverCardContent,
} from "@/components/ui/hover-card";

interface TooltipProps {
  text: string;
  children: React.ReactNode;
}

export const Tooltip: React.FC<TooltipProps> = ({ children, text }) => {
  return (
    <HoverCard openDelay={200}>
      <HoverCardTrigger asChild>{children}</HoverCardTrigger>
      <HoverCardContent
        className="relative text-xs text-white bg-gray-800 px-3 py-2 rounded-md shadow-md border-none w-fit mr-1"
        side="right"
        align="center"
      >
        {text}
        <span className="absolute w-3 h-2 bg-gray-800 rotate-45 transform -right-1 top-[11px]"></span>
      </HoverCardContent>
    </HoverCard>
  );
};

export default Tooltip;
