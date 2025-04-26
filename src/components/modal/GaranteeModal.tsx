import { X } from "lucide-react";
import Link from "next/link";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
} from "../ui/dialog";
import PriceFormatter from "../format-price/PriceFormatter";
import {  UseFormSetValue } from "react-hook-form";
import { OrderRequest } from "@/types";
import { useEffect } from "react";
type GuaranteeOption = {
  id: string;
  title: string;
  price: string;
};
interface Props {
  productId: string;
  isOpen: boolean;
  toggleModal: () => void;
  garantee: GuaranteeOption[];
  count: number;
  setValue: UseFormSetValue<OrderRequest>;
  addGaranteePrice: (price: number) => void;
  selected: string;
  setSelected: (id: string) => void;
  getValues: () => OrderRequest["productDetails"] | undefined;
}

const GaranteeModal: React.FC<Props> = ({
  isOpen,
  toggleModal,
  garantee,
  setValue,
  count,
  addGaranteePrice,
  selected,
  setSelected,
  productId,
  getValues,
}) => {
  useEffect(() => {
    if (!isOpen) return;

    const prevDetails = getValues() || [];

    const updatedDetails = prevDetails.map((detail) =>
      detail.productId === productId
        ? { ...detail, garanteeId: selected }
        : detail
    );

    setValue("productDetails", updatedDetails);

    const priceNum =
      selected === "0"
        ? 0
        : Number(garantee.find((g) => g.id === selected)?.price || 0) * count;

    addGaranteePrice(priceNum);
  }, [
    isOpen,
    selected,
    garantee,
    count,
    addGaranteePrice,
    setValue,
    productId,
    getValues,
  ]);

  const handleConfirm = () => {
    const prevDetails = getValues() || [];

    const updatedDetails = prevDetails.map((detail) =>
      detail.productId === productId
        ? { ...detail, garanteeId: selected }
        : detail
    );

    setValue("productDetails", updatedDetails);

    const priceNum =
      selected === "0"
        ? 0
        : Number(garantee.find((g) => g.id === selected)?.price || 0) * count;

    addGaranteePrice(priceNum);
    toggleModal();
  };

  console.log(garantee);

  return (
    <Dialog open={isOpen} onOpenChange={toggleModal}>
      <DialogContent className="p-0 sm:rounded-none border-none max-w-[900px]">
        <div className="flex justify-between p-6 border-b border-superSilver">
          <DialogTitle className="w-fit text-textColor text-lg font-normal">
            Выбор гарантии
          </DialogTitle>
          <button onClick={toggleModal} className="text-textColor">
            <X />
          </button>
        </div>
        <DialogDescription className="hidden">asd</DialogDescription>
        <div className="px-6 py-4">
          <p className="text-textColor mb-4">
            Выберите пакет дополнительной гарантии. Также см.{" "}
            <Link href="/extended-warranty" className="text-cerulean">
              Преимущества расширенной гарантии
            </Link>
          </p>

          <table className="w-full text-left border">
            <thead className="border-b">
              <tr>
                <th className="pb-2 pt-[10px] px-1 border-r"></th>
                <th className="pb-2 pt-[10px] px-[10px] border-r"></th>
                <th className="pb-2 pt-[10px] px-[10px] text-center">
                  Стоимость
                </th>
              </tr>
            </thead>
            <tbody>
              <tr className="pb-2 pt-[10px] px-1 border">
                <td className="pb-2 pt-[10px] px-1 border">
                  <div className="flex items-center justify-center">
                    <input
                      id={"0"}
                      type="radio"
                      name="garantee"
                      value={"0"}
                      checked={selected === "0"}
                      onChange={() => setSelected("0")}
                    />
                  </div>
                </td>
                <td className=" text-textColor pb-2 pt-[10px] px-[10px] border">
                  <label htmlFor={"0"}>Стандартная гарантия </label>
                </td>
                <td className=" text-textColor pb-2 pt-[10px] px-[10px] border text-end">
                  <PriceFormatter amount={0} className="inline-block" />
                </td>
              </tr>
              {garantee.map((g) => (
                <tr
                  key={g.id}
                  className={selected === g.id ? "bg-gray-50" : ""}
                >
                  <td className="pb-2 pt-[10px] px-1 border">
                    <div className="flex items-center justify-center">
                      <input
                        id={g.id}
                        type="radio"
                        name="garantee"
                        value={g.id}
                        checked={selected === g.id}
                        onChange={() => setSelected(g.id)}
                      />
                    </div>
                  </td>
                  <td className=" text-textColor pb-2 pt-[10px] px-[10px] border">
                    <label htmlFor={g.id}>{g.title}</label>
                  </td>
                  <td className=" text-textColor pb-2 pt-[10px] px-[10px] border text-end">
                    <PriceFormatter
                      amount={Number(g.price)}
                      className="inline-block"
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="flex justify-end p-6 border-t border-superSilver">
          <button
            type="button"
            onClick={handleConfirm}
            className="px-6 py-2 bg-cerulean text-white rounded shadow"
          >
            Выбрать
          </button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default GaranteeModal;
