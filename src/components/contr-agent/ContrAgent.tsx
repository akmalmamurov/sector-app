"use client";

import { useEffect, useState } from "react";
import { updateAgent } from "@/api";
import {
  CheckIcon,
  DeleteSmIcon,
  EditIcon,
  ShippingIcon,
} from "@/assets/icons";
import { ContrAgentData, OrderRequest } from "@/types";
import { useQueryClient } from "@tanstack/react-query";
import { showError, showSuccess } from "../toast/Toast";
import { UseFormSetValue } from "react-hook-form";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import request from "@/services";
import { DELETE_AGENT } from "@/constants";
import { AgentAdressModal } from "../modal";
import { cn } from "@/lib/utils";

export const ContrAgent = ({
  contrAgents,
  setValue,
  className,
}: {
  contrAgents: ContrAgentData[];
  setValue?: UseFormSetValue<OrderRequest>;
  className?: string;
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const toggleOpen = () => setIsOpen(!isOpen);
  const queryClient = useQueryClient();
console.log(contrAgents);

  useEffect(() => {
    const fav = contrAgents.find((c) => c.isFavorite);
    if (fav && setValue) {
      setValue("contrAgentId", fav.id);
    }
  }, [contrAgents, setValue]);

  const handleUpdate = async (id: string) => {
    try {
      await updateAgent(id);
      queryClient.invalidateQueries({ queryKey: ["contragents"] });
      if (setValue) {
        setValue("contrAgentId", id);
      }
    } catch (error) {
      console.error(error);
      showError("Ошибка обновления контрагента");
    }
  };
  const handleDelete = async (id: string) => {
    try {
      await request.delete(`${DELETE_AGENT}/${id}`);
      queryClient.invalidateQueries({ queryKey: ["contragents"] });
      showSuccess("Контрагент удален");
    } catch (error) {
      console.error(error);
      showError("Ошибка обновления контрагента");
    }
  };
  console.log(contrAgents);

  return (
    <>
      {contrAgents
        ?.slice()
        .sort((a, b) => (b.isFavorite ? 1 : 0) - (a.isFavorite ? 1 : 0))
        .map((item) => (
          <div
            key={item.id}
            className={cn(
              `border ${
                item.isFavorite ? "border-cerulean" : "border-superSilver"
              } relative pt-12 px-4 overflow-hidden bg-custom min-h-[229px]`,
              className
            )}
          >
            <div className="mb-[15px]">
              <h5 className="text-textColor text-sm mb-2">{item.name}</h5>
              <p className="text-weekColor text-xs">ИНН {item.inn}</p>
            </div>

            <div className="gap-2 flex mb-2">
              <span className="border-b border-dashed pb-[2px] text-xs text-cerulean border-cerulean">
                Розничная цена
              </span>
              <span
                onClick={toggleOpen}
                className="border-b border-dashed pb-[2px] text-xs text-cerulean border-cerulean cursor-pointer"
              >
                Адреса отгрузки: {item.address.length}
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
                  onClick={toggleOpen}
                  className="cursor-pointer py-[6px] px-4 bg-white text-xs text-textColor hover:bg-superSilver hoverEffect flex items-center gap-2"
                >
                  <span>
                    <ShippingIcon />
                  </span>
                  Адреса отгрузки: 0
                </span>

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
            <AgentAdressModal
              isOpen={isOpen}
              toggleOpen={toggleOpen}
              name={item?.name}
              contrAgentId={item?.id}
            />
          </div>
        ))}
    </>
  );
};

export default ContrAgent;
