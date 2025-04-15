"use client";
import { getAgent } from "@/api";
import { ContrAgent } from "@/components/contr-agent";
import { ContrAgentModal } from "@/components/modal";
import { useQuery } from "@tanstack/react-query";
import { CirclePlus } from "lucide-react";
import { useState, useEffect } from "react";

const ContractorsPage = () => {
  const [isOpen, setIsOpen] = useState(false);
  const toggleOpen = () => setIsOpen((prev) => !prev);
  const { data: agentsData = [] } = useQuery({
    queryKey: ["contragents"],
    queryFn: getAgent,
  });

  useEffect(() => {
    if (
      typeof window !== "undefined" &&
      window.location.hash === "#add_contractor"
    ) {
      setIsOpen(true);
    }
  }, []);

  useEffect(() => {
    if (typeof window === "undefined") return;

    if (isOpen) {
      window.history.replaceState(null, "", "#add_contractor");
    } else {
      window.history.replaceState(
        null,
        "",
        window.location.pathname + window.location.search
      );
    }
  }, [isOpen]);

  return (
    <div>
      <div className="grid grid-cols-3 border-b border-superSilver pb-8 gap-[22px] w-full ">
        <div className="flex flex-col">
          <button
            type="button"
            onClick={toggleOpen}
            className={` min-h-[229px]  cursor-pointer bg-custom border border-dashed  border-superSilver flex justify-center items-center flex-col gap-2`}
          >
            <CirclePlus className="text-weekColor w-10 h-10" />
            <p className="text-weekColor mt-2">Добавить контрагенты</p>
          </button>
        </div>
        {/* get contragents */}
        <ContrAgent contrAgents={agentsData?.kontragents || []}  />
      </div>
      <ContrAgentModal isOpen={isOpen} toggleOpen={toggleOpen} />
    </div>
  );
};

export default ContractorsPage;
