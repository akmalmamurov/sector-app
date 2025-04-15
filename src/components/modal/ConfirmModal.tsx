import { Button } from "../ui/button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, } from "../ui/dialog";
import { Separator } from "../ui/separator";
interface Props {
  isOpen: boolean;
  message: string;
  onConfirm: (() => void) | null;
  closeModal: () => void;
}
export const ConfirmModal = ({
  isOpen,
  message,
  onConfirm,
  closeModal,
}: Props) => {
  return (
    <Dialog modal={true} open={isOpen} onOpenChange={closeModal}>
      <DialogContent className="max-w-[600px] sm:rounded-none p-0 border-none">
        <DialogHeader className="px-[23px] pt-[23px] pb-1">
          <DialogTitle className="text-textColor font-normal text-lg">
            Подтвердите удаление
          </DialogTitle>
        </DialogHeader>
        <DialogDescription className="hidden">asd</DialogDescription>
        <Separator className=" h-[0.5px]" />
        <div className="px-[23px] pt-1 pb-[23px]">
          <p className="text-textColor mb-5 ">
            {message}

          </p>
          <div className="flex justify-end gap-2">
            <Button
              onClick={() => {
                if (onConfirm) onConfirm();
                closeModal();
              }}
              className="w-[108px] h-10  bg-dangerColor hover:bg-dangerColor text-white flex justify-center items-center font-semibold hover:opacity-80 duration-200 ease-in-out rounded-none"
            >
              Удалить
            </Button>
            <Button
              onClick={closeModal}
              className="w-[108px] h-10 border border-wasabiColor bg-white text-wasabiColor flex justify-center items-center font-semibold hover:border-cerulean hover:text-cerulean duration-200 ease-in-out rounded-none hover:bg-white"
            >
              Отмена
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ConfirmModal;
