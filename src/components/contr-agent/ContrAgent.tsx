"use client";

import { useEffect } from "react";
import { updateAgent } from "@/api";
import { CheckIcon, EditIcon } from "@/assets/icons";
import { ContrAgentData, OrderRequest } from "@/types";
import { useQueryClient } from "@tanstack/react-query";
import { showError } from "../toast/Toast";
import { UseFormSetValue } from "react-hook-form";

export const ContrAgent = ({
  contrAgents,
  setValue,
}: {
  contrAgents: ContrAgentData[];
  setValue: UseFormSetValue<OrderRequest>;
}) => {
  const queryClient = useQueryClient();

  useEffect(() => {
    const fav = contrAgents.find((c) => c.isFavorite);
    if (fav) {
      setValue("contrAgentId", fav.id);
    }
  }, [contrAgents, setValue]);

  const handleUpdate = async (id: string) => {
    try {
      await updateAgent(id);
      queryClient.invalidateQueries({ queryKey: ["contragents"] });
      setValue("contrAgentId", id);
    } catch (error) {
      console.error(error);
      showError("Ошибка обновления контрагента");
    }
  };

  return (
    <>
      {contrAgents
        .slice()
        .sort((a, b) => (b.isFavorite ? 1 : 0) - (a.isFavorite ? 1 : 0))
        .map((item) => (
          <div
            key={item.id}
            className={`flex-shrink-0 min-w-[315px] border ${
              item.isFavorite ? "border-cerulean" : "border-superSilver"
            } relative pt-12 px-4 overflow-hidden bg-custom min-h-[229px]`}
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
              className="mt-[31px] flex gap-3 items-center px-[23px] text-weekColor h-[42px] border disabled:bg-cerulean disabled:text-white disabled:border-none"
            >
              <CheckIcon />
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
