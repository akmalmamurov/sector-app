import { getUser } from "@/api";
import { useQuery } from "@tanstack/react-query";
import { Pencil } from "lucide-react";
import { useState } from "react";
import { PhoneModal } from "../modal";

export const EditNumber = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { data: userData } = useQuery({
    queryKey: ["user"],
    queryFn: getUser,
  });
  console.log(userData);
  
const toggleOpen = () => setIsOpen(!isOpen);
  return (
    <div className="border-b border-superSilver pt-5">
      <div className="pb-5">
        <div className="grid grid-cols-4">
          <div className="col-span-4">
            <div className="flex gap-[100px]">
              <div className="w-[125px] shrink-0">
                <p className="text-[#000000DE] text-sm pt-5">Контакты</p>
              </div>
              <div className="grid grid-cols-3 gap-[22px] flex-1 min-w-0">
                <div className="flex flex-col">
                  <label
                    htmlFor="oldPassword"
                    className="text-textColor text-sm pb-2 pt-10 lg:pt-0 select-none"
                  >
                    Телефон
                  </label>
                  <div className="relative w-full">
                    {userData?.phone && (
                      <input
                        id="oldPassword"
                        autoComplete="off"
                        className="border w-full border-superSilver h-10 px-[15px] focus:outline-none hover:border-cerulean/80 focus:border-cerulean"
                      />
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <button
          type="button"
          onClick={toggleOpen}
          className="border mt-6 bg-cerulean text-white flex items-center gap-2 py-2 px-[23px] justify-self-end hover:opacity-90"
        >
          <Pencil />
          <span className="text-base font-semibold">Изменить</span>
        </button>
      </div>

      <PhoneModal isOpen={isOpen} toggleOpen={toggleOpen} />
    </div>
  );
};

export default EditNumber;
