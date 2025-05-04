import { Button } from "../ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";
import { Separator } from "../ui/separator";
import request from "@/services";
import { TOGGLE_CART } from "@/constants";
import { showError, showToast } from "../toast/Toast";
import { OrderProducts } from "@/types";
import { useQueryClient } from "@tanstack/react-query";
interface Props {
  open: boolean;
  toggleModal: () => void;
  product: OrderProducts[];
}
export const DuplicateModal = ({ open, product, toggleModal }: Props) => {
    const queryClient = useQueryClient();
  const finishOrder = async () => {
    try {
      const requests = product.map(({ productId, count }) =>
        request.post(TOGGLE_CART, { productId }, { params: { count } })
      );
      await Promise.all(requests);
      queryClient.invalidateQueries({ queryKey: ["cart"] });
      toggleModal();
      showToast({
        message: `Товар добавлен в корзину`,
        type: "success",
        href: "/cart",
        hrefName: "Перейти в корзине",
      });
      window.scrollTo(0, 0);
    } catch (error) {
      console.log(error);
      showError("При завершении заказа произошла ошибка");
    }
  };
  return (
    <Dialog open={open} onOpenChange={toggleModal}>
      <DialogContent className="max-w-[600px] sm:rounded-none p-0 border-none">
        <DialogHeader className="px-[23px] pt-[23px] pb-1">
          <DialogTitle className="text-textColor font-normal text-lg">
            Дублирование заказа
          </DialogTitle>
        </DialogHeader>
        <DialogDescription className="hidden">asd</DialogDescription>
        <Separator className=" h-[0.5px]" />
        <div className="px-[23px] pt-1 pb-[23px]">
          <p className="text-textColor mb-5 ">
            Вы уверены, что хотите дублировать заказ?
          </p>
          <div className="flex justify-end gap-2">
            <Button
              type="button"
              onClick={finishOrder}
              className="py-2 px-[23px] h-[42px]  bg-cerulean hover:bg-cerulean/80 text-white flex justify-center items-center font-semibold hover:opacity-95 duration-200 ease-in-out rounded-none"
            >
              Дублировать заказ
            </Button>
            <Button
              onClick={toggleModal}
              className="w-[108px] h-[42px] border border-wasabiColor bg-white text-wasabiColor flex justify-center items-center font-semibold hover:border-cerulean hover:text-cerulean duration-200 ease-in-out rounded-none hover:bg-white"
            >
              Закрыть
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default DuplicateModal;
