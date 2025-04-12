"use client";
import { updateAgent } from "@/api";
import { CheckIcon, EditIcon } from "@/assets/icons";
import { ContrAgentData } from "@/types";
import { useQueryClient } from "@tanstack/react-query";
import { showError } from "../toast/Toast";

export const ContrAgent = ({
  contrAgents,
}: {
  contrAgents: ContrAgentData[];
}) => {
  const queryClient = useQueryClient();
  const handleUpdate = async (id: string) => {
    try {
      await updateAgent(id);
      queryClient.invalidateQueries({ queryKey: ["contragents"] });
    } catch (error) {
      console.log(error);
      showError("Ошибка обновления контрагента");
    }
  };
  return (
    <>
      {(contrAgents ?? [])
        .slice()
        .sort(
          (a: ContrAgentData, b: ContrAgentData) =>
            (b.isFavorite ? 1 : 0) - (a.isFavorite ? 1 : 0)
        )
        .map((item: ContrAgentData) => (
          <div
            key={item.id}
            className={`border min-w-[315px] ${
              item.isFavorite ? "border-cerulean" : "border-superSilver"
            } relative pt-12 px-4 overflow-hidden bg-custom min-h-[229px] `}
          >
            <div className="mb-[15px]">
              <h5 className="text-textColor text-sm mb-2">{item.name}</h5>
              <p className="text-weekColor text-xs">ИНН {item.inn}</p>
            </div>
            <div className="gap-2 flex mb-2">
              <span className="border-b border-dashed pb-[2px] text-xs text-cerulean border-cerulean">
                Розничная цена
              </span>
              <span className="border-b border-dashed pb-[2px] text-xs text-cerulean border-cerulean">
                Адреса отгрузки: 0
              </span>
            </div>

            <button
              type="button"
              onClick={() => handleUpdate(item.id)}
              disabled={item.isFavorite}
              className={`mt-[31px] flex gap-3 items-center px-[23px] text-weekColor h-[42px] border disabled:bg-cerulean disabled:text-white disabled:border-none `}
            >
              <span>
                <CheckIcon />
              </span>
              {item.isFavorite ? "Выбрано" : "Выбрать"}
            </button>

            <span className="absolute top-4 right-2 cursor-pointer">
              <EditIcon className="w-6 h-6 text-darkSoul hover:text-textColor" />
            </span>
          </div>
        ))}
    </>
  );
};

export default ContrAgent;
