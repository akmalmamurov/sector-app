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
  setIsOpen: (isOpen: boolean) => void;
}
export const ConfirmModal = ({ isOpen, setIsOpen }: Props) => {
  return (
    <Dialog open={isOpen} onOpenChange={() => setIsOpen(false)}>
      <DialogContent className="w-[600px] sm:rounded-none p-0">
        <DialogHeader className="p-[23px]">
          <DialogTitle className="text-textColor font-normal text-lg">
            Подтвердите удаление
          </DialogTitle>
        </DialogHeader>
        <Separator />
        <DialogDescription className="hidden">asd</DialogDescription>
        <div className="p-[23px]">

        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ConfirmModal;
