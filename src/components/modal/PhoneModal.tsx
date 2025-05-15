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
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
interface Props {
  isOpen: boolean;
  toggleOpen: () => void;
  step: number;
  setStep: (step: number) => void;
}
export const PhoneModal = ({ isOpen, toggleOpen, step, setStep }: Props) => {
  const [phone, setPhone] = useState<string>("+998 __ ___ ____");
  const [error, setError] = useState(false);
  const [isPhoneComplete, setIsPhoneComplete] = useState(false);
  const [isOtpComplete, setIsOtpComplete] = useState(false);
  const [otp, setOtp] = useState<string>("");

  const submitClick = () => {
    if (otp.length !== 6) {
      setError(true);
      return;
    }
    setError(false);
    console.log("PHONE", phone);
    console.log("OTP", otp);
  };

  return (
    <Dialog open={isOpen} onOpenChange={toggleOpen}>
      <DialogContent className="max-w-[600px] sm:rounded-none p-0 border-none">
        {step === 1 ? (
          <>
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
            <DialogDescription
              onClick={() => setError(true)}
              className="hidden"
            >
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
                  onClick={() => setStep(2)}
                  className="py-2 px-[23px] disabled:bg-superSilver bg-cerulean text-white disabled:text-darkSoul font-semibold"
                >
                  Далее
                </button>
              </div>
            </div>
          </>
        ) : (
          <>
            <DialogHeader className="px-[23px] pt-[23px] pb-1">
              <div className=" flex  justify-between items-center">
                <DialogTitle className="text-textColor font-normal text-base flex flex-col">
                  <span>Введите одноразовый пароль</span>
                </DialogTitle>
                <button onClick={toggleOpen}>
                  <X className={"w-6 h-6  text-textColor"} />
                </button>
              </div>
            </DialogHeader>
            <DialogDescription
              onClick={() => setError(true)}
              className="hidden"
            >
              asd
            </DialogDescription>
            <Separator className=" h-[0.5px]" />
            <div className="px-[23px] pt-1 pb-[23px]">
              <div className="relative flex flex-col items-center">
                <InputOTP
                  maxLength={6}
                  value={otp}
                  onChange={(value) => {
                    if (value.length === 6) {
                      setIsOtpComplete(true);
                    } else {
                      setIsOtpComplete(false);
                    }
                    setOtp(value);
                  }}
                >
                  <InputOTPGroup className="gap-2">
                    <InputOTPSlot className="text-base" index={0} />
                    <InputOTPSlot className="text-base" index={1} />
                    <InputOTPSlot className="text-base" index={2} />
                    <InputOTPSlot className="text-base" index={3} />
                    <InputOTPSlot className="text-base" index={4} />
                    <InputOTPSlot className="text-base" index={5} />
                  </InputOTPGroup>
                </InputOTP>
                <div className="text-center text-sm mt-4">
                  {otp === "" && !error ? (
                    <span className="text-pelati">
                      Введите одноразовый пароль.
                    </span>
                  ) : (
                    <span className="text-textColor"></span>
                  )}
                  {error && (
                    <span className="text-pelati">Пароль неверный</span>
                  )}
                </div>
              </div>
              <div className="mt-10 flex justify-end gap-4">
                <button
                  onClick={() => setStep(1)}
                  className="py-2 px-[23px] disabled:bg-superSilver hover:border-cerulean/80 hover:text-cerulean/80 bg-white text-cerulean border border-cerulean disabled:text-darkSoul font-semibold"
                >
                  Назад
                </button>
                <button
                  disabled={!isOtpComplete}
                  onClick={submitClick}
                  className="py-2 px-[23px] disabled:bg-superSilver hover:bg-cerulean/80 bg-cerulean text-white disabled:text-darkSoul font-semibold"
                >
                  Отправить
                </button>
              </div>
            </div>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default PhoneModal;
