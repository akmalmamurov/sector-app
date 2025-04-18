import { getAgentAdress, updateAgentAddress } from "@/api";
import useStore from "@/context/store";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { Check, CirclePlus } from "lucide-react";
import { useEffect, useState } from "react";
import { AgentAdressModal } from "../modal";
import { AddressData, DeliveryRequest } from "@/types";
import { CheckIcon, DeleteSmIcon, EditIcon } from "@/assets/icons";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import request from "@/services";
import { showError, showSuccess } from "../toast/Toast";
import { DELETE_AGENT_ADDRESS } from "@/constants";
import { UseFormSetValue } from "react-hook-form";

const DeliveryAdress = ({
  setValue,
}: {
  setValue: UseFormSetValue<DeliveryRequest>;
}) => {
  const agentId = useStore((state) => state.agentId);
  const [isOpen, setIsOpen] = useState(false);
  const toggleOpen = () => setIsOpen(!isOpen);
  const { data: agents } = useQuery({
    queryKey: ["contragents", agentId],
    queryFn: () => getAgentAdress(agentId || ""),
    enabled: !!agentId,
  });
  const address = agents?.address;

  useEffect(() => {
    const fav = agents?.address.find((c: AddressData) => c.isMain);
    if (fav) {
      setValue("agentId", fav.id);
      setValue("address", fav);
    }
  }, [agents?.address, setValue]);
  const queryClient = useQueryClient();
  const handleDelete = async (id: string) => {
    try {
      await request.delete(`${DELETE_AGENT_ADDRESS}/${id}`);
      queryClient.invalidateQueries({ queryKey: ["contragents"] });
      showSuccess("Адрес удален");
    } catch (error) {
      console.error(error);
      showError("Ошибка удаления контрагента");
    }
  };
  const handleUpdate = async (id: string) => {
    try {
      await updateAgentAddress(id);
      queryClient.invalidateQueries({ queryKey: ["contragents"] });
    } catch (error) {
      console.error(error);
      showError("Ошибка обновления контрагента");
    }
  };

  return (
    <div>
      <div className="flex items-center gap-[15px] mb-[15px]">
        <h3 className="font-normal text-textColor text-lg leading-[20.5px]">
          Сначала нужно выбрать адрес
        </h3>
        <div className="bg-greenLight w-[18px] h-[18px] rounded-full flex items-center justify-center">
          <Check className="text-white" strokeWidth={5} size={8} />
        </div>
      </div>
      <div className="grid grid-cols-3 w-full gap-[15px]">
        <button type="button" onClick={toggleOpen}>
          <div className="min-h-[190px] p-[15px] cursor-pointer h-full border-darkSoul border border-dashed flex justify-center items-center flex-col gap-2">
            <CirclePlus className="text-weekColor w-5 h-5" />
            <p className="text-weekColor text-sm mt-2">Добавить адрес</p>
          </div>
        </button>
        {address
          ?.slice()
          .sort(
            (a: AddressData, b: AddressData) =>
              (b.isMain ? 1 : 0) - (a.isMain ? 1 : 0)
          )
          .map((item: AddressData) => (
            <div
              key={item.id}
              className={`border ${
                item.isMain ? "border-cerulean" : "border-superSilver"
              } relative p-[15px]  overflow-hidden bg-custom min-h-[229px] flex flex-col justify-between`}
            >
              <div className="mb-[15px] pr-4">
                <p className="text-textColor text-xs ">
                  {item.country}, {item.region} {item.district}, {item.street},{" "}
                  {item.house} {item.apartment && `, ${item.apartment}`}
                </p>
                <p className="text-textColor text-xs ">
                  {item.index && `инд.${item.index}`}
                </p>
              </div>

              <button
                type="button"
                onClick={() => handleUpdate(item.id)}
                disabled={item.isMain}
                className="mt-[31px] flex gap-3 items-center px-[23px] text-weekColor h-[42px] border disabled:bg-cerulean disabled:text-white disabled:border-none w-fit"
              >
                <CheckIcon />
                {item.isMain ? "Выбрано" : "Выбрать"}
              </button>

              <Popover>
                <PopoverTrigger asChild>
                  <button
                    type="button"
                    className="absolute top-4 right-2 cursor-pointer w-fit"
                  >
                    <EditIcon className="w-6 h-6 text-darkSoul hover:text-textColor" />
                  </button>
                </PopoverTrigger>
                <PopoverContent className="w-[200px] p-0 rounded-none flex flex-col right-5 absolute">
                  <span
                    onClick={() => handleDelete(item.id)}
                    className="cursor-pointer py-[6px] px-4 bg-white text-xs text-textColor hover:bg-superSilver hoverEffect flex items-center gap-2"
                  >
                    <span className="w-4 h-4">
                      <DeleteSmIcon className="w-4 h-4" />
                    </span>
                    Удалить
                  </span>
                </PopoverContent>
              </Popover>
            </div>
          ))}
        <AgentAdressModal
          isOpen={isOpen}
          toggleOpen={toggleOpen}
          contrAgentId={agents?.id}
        />
      </div>
    </div>
  );
};

export default DeliveryAdress;
