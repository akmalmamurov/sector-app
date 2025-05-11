import { X } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";
import { Separator } from "../ui/separator";
interface Props {
  isOpen: boolean;
  toggleOpen: () => void;
}
export const PhoneModal = ({ isOpen, toggleOpen }: Props) => {
  return (
    <Dialog open={isOpen} onOpenChange={toggleOpen}>
      <DialogContent className="max-w-[600px] sm:rounded-none p-0 border-none">
        <DialogHeader className="px-[23px] pt-[23px] pb-1">
          <div className=" flex  justify-between items-center">
            <DialogTitle className="text-textColor font-normal text-base flex flex-col">
              <span>Необходимо заполнить учетные данные</span>
            </DialogTitle>
            <button onClick={toggleOpen}>
              <X className={"w-6 h-6  text-textColor"} />
            </button>
          </div>
        </DialogHeader>
        <DialogDescription className="hidden">asd</DialogDescription>
        <Separator className=" h-[0.5px]" />
        <div className="px-[23px] pt-1 pb-[23px]">
                asdasdasdsa
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default PhoneModal;
