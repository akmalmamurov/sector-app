import { Phone, X } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";
import { Separator } from "../ui/separator";
import { useState } from "react";
import { PhoneInput } from "../phone-input";
interface Props {
  isOpen: boolean;
  toggleOpen: () => void;
}
export const PhoneModal = ({ isOpen, toggleOpen }: Props) => {
  const [phone, setPhone] = useState<string>("+998 __ ___ ____");
  const [error, setError] = useState(false);
  const [isPhoneComplete, setIsPhoneComplete] = useState(false);
  const submitClick = () => {
    console.log("PHONE", phone);
  };
  return (
    <Dialog open={isOpen} onOpenChange={toggleOpen}>
      <DialogContent className="max-w-[600px] sm:rounded-none p-0 border-none">
        <DialogHeader className="px-[23px] pt-[23px] pb-1">
          <div className=" flex  justify-between items-center">
            <DialogTitle className="text-textColor font-normal text-base flex flex-col">
              <span>Необходимо заполнить учетные данные</span>
            </DialogTitle>
            <button onClick={toggleOpen}>
              <X className={"w-6 h-6  text-textColor"} />
            </button>
          </div>
        </DialogHeader>
        <DialogDescription onClick={() => setError(true)} className="hidden">
          asd
        </DialogDescription>
        <Separator className=" h-[0.5px]" />
        <div className="px-[23px] pt-1 pb-[23px]">
          <div className="relative">
            <PhoneInput
              id="phoneNumber"
              value={phone}
              onChange={setPhone}
              onComplete={() => setIsPhoneComplete(true)}
              onIncomplete={() => setIsPhoneComplete(false)}
              className={`border ${
                error
                  ? "border-dangerColor hover:border-dangerColor/50"
                  : "border-superSilver hover:border-cerulean/50"
              } py-2 pl-[15px] pr-[47px] w-full focus:outline-none focus:border-cerulean`}
            />
            <span className="absolute right-0 top-1/2 transform -translate-y-1/2 pr-3">
              <Phone
                className={
                  isPhoneComplete ? "text-cerulean" : "text-superSilver"
                }
              />
            </span>
          </div>
          <div className="mt-10 flex justify-end">
            <button
              disabled={!isPhoneComplete}
              onClick={submitClick}
              className="py-2 px-[23px] disabled:bg-superSilver bg-cerulean text-white disabled:text-darkSoul font-semibold"
            >
              Сохранить
            </button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default PhoneModal;
