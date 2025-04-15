"use client";

import { useForm } from "react-hook-form";
import { ContrAgentModal } from "@/components/modal";
import { useState, useEffect } from "react";

const ContractorsPage = () => {
  const [isOpen, setIsOpen] = useState(false);
  const toggleOpen = () => setIsOpen((prev) => !prev);

  const {
    handleSubmit,
  } = useForm();

  const onSubmit = (data: any) => {
    console.log(data);
  };

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
      window.history.replaceState(null, "", window.location.pathname + window.location.search);
    }
  }, [isOpen]);

  return (
    <div className="pt-5 pb-10">
      <form
        noValidate
        onSubmit={handleSubmit(onSubmit)}
        className="pb-5 flex flex-col gap-4 w-[30%]"
      >
        asdasddas
      </form>

      <ContrAgentModal isOpen={isOpen} toggleOpen={toggleOpen} />
    </div>
  );
};

export default ContractorsPage;
