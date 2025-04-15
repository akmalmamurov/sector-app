"use client";
import { getAgent } from "@/api";
import { SearchIcon } from "@/assets/icons";
import { ContrAgent } from "@/components/contr-agent";
import { ContrAgentModal } from "@/components/modal";
import { useQuery } from "@tanstack/react-query";
import { CirclePlus } from "lucide-react";
import { useState, useEffect } from "react";

const ContractorsPage = () => {
  const [isOpen, setIsOpen] = useState(false);
  const toggleOpen = () => setIsOpen((prev) => !prev);
  const [search, setSearch] = useState("");
  const { data: agentsData = [] } = useQuery({
    queryKey: ["contragents", search],
    queryFn: ()=>
      getAgent(search),
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
      <div className="relative mb-[33px]">
        <input
          type="text"
          placeholder="Поиск контрагента"
          className=" w-full h-[41px] px-3 border border-superSilver hover:border-cerulean/70 focus:outline-none
           focus:ring-1 focus:ring-cerulean focus:border-transparent transition"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <span className="absolute right-3 top-1/2 transform -translate-y-1/2">
          <SearchIcon/>
        </span>
      </div>
      <div className="grid grid-cols-4 border-b border-superSilver pb-8 gap-[22px] w-full ">
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
        <ContrAgent contrAgents={agentsData?.kontragents || []} />
      </div>
      <ContrAgentModal isOpen={isOpen} toggleOpen={toggleOpen} />
    </div>
  );
};

export default ContractorsPage;
