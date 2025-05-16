import { useState } from "react";
import { Phone, X } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../ui/dialog";
import { Separator } from "../ui/separator";
import { PhoneInput } from "../phone-input";
import { Button } from "../ui/button";
import { InputOTP, InputOTPSlot } from "../ui/input-otp";
import Countdown from "react-countdown";

interface Props {
  isOpen: boolean;
  toggleOpen: () => void;
  step: number;
  setStep: (step: number) => void;
}

export const PhoneModal = ({ isOpen, toggleOpen }: Props) => {
  const [step, setStep] = useState<1 | 2>(1);

  const [phone, setPhone] = useState<string>("+998 __ ___ ____");
  const [isPhoneComplete, setIsPhoneComplete] = useState(false);
  const [phoneError, setPhoneError] = useState(false);

  const [otp, setOtp] = useState<string>("");
  const [isExpired, setIsExpired] = useState(false);
  const [countdownEnd, setCountdownEnd] = useState<number | null>(null);

  const resendCode = () => {
    setIsExpired(false);

    setCountdownEnd(Date.now() + 40 * 1000);
  };
  const handleNext = () => {
    if (isPhoneComplete) {
      setStep(2);
      setPhoneError(false);
      if (!countdownEnd) {
        setCountdownEnd(Date.now() + 60 * 1000);
      }
    } else {
      setPhoneError(true);
    }
  };

  const handleConfirm = () => {
    console.log("Verify OTP:", otp);
    toggleOpen();
  };

  return (
    <Dialog open={isOpen} onOpenChange={toggleOpen}>
      <DialogContent className="max-w-[600px] sm:rounded-none p-0 border-none">
        <DialogHeader className="px-[23px] pt-[23px] pb-1">
          <div className="flex justify-between items-center">
            <DialogTitle className="text-textColor font-normal text-base">
              {step === 1
                ? "Введите номер телефона"
                : "Введите код подтверждения"}
            </DialogTitle>
            <button onClick={toggleOpen}>
              <X className="w-6 h-6 text-textColor" />
            </button>
          </div>
        </DialogHeader>
        <Separator className="h-[0.5px]" />

        <div className="px-[23px] pt-6 pb-[23px]">
          {step === 1 ? (
            <>
              <div className="relative">
                <PhoneInput
                  id="phoneNumber"
                  value={phone}
                  onChange={(val) => {
                    setPhone(val);
                    setPhoneError(false);
                  }}
                  onComplete={() => setIsPhoneComplete(true)}
                  onIncomplete={() => {
                    setIsPhoneComplete(false);
                  }}
                  className={`w-full py-2 pl-[15px] pr-[47px] rounded border ${
                    phoneError
                      ? "border-dangerColor"
                      : "border-superSilver hover:border-cerulean"
                  } focus:outline-none focus:border-cerulean`}
                />
                <span className="absolute right-0 top-1/2 transform -translate-y-1/2 pr-3">
                  <Phone
                    className={
                      isPhoneComplete ? "text-cerulean" : "text-superSilver"
                    }
                  />
                </span>
              </div>
              {phoneError && (
                <p className="mt-2 text-sm text-dangerColor">
                  Пожалуйста, введите корректный номер
                </p>
              )}
              <div className="mt-10 flex justify-end">
                <Button
                  onClick={handleNext}
                  disabled={!isPhoneComplete}
                  className="px-[23px] py-2 bg-cerulean text-white disabled:bg-superSilver disabled:text-darkSoul"
                >
                  Далее
                </Button>
              </div>
            </>
          ) : (
            <>
              <p className="mb-4 text-sm text-darkSoul">
                Мы отправили код на номер <strong>{phone}</strong>
              </p>
              {!isExpired ? (
                <div>
                  <div className="flex justify-center items-center mb-2 gap-1">
                    <p className="font-normal text-base text-textColor">
                      Отправить код повторно через
                    </p>
                    {countdownEnd && (
                      <Countdown
                        date={countdownEnd}
                        onComplete={() => setIsExpired(true)}
                        renderer={({ minutes, seconds }) => (
                          <span className="font-normal text-base text-textColor">
                            0{minutes}:{seconds < 10 ? `0${seconds}` : seconds}
                          </span>
                        )}
                      />
                    )}

                    <p className="font-normal text-base text-textColor">
                      {" "}
                      минута
                    </p>
                  </div>
                  <div className="flex justify-center mb-6">
                    <InputOTP
                      maxLength={4}
                      value={otp}
                      onChange={(value) => setOtp(value)}
                      type="numeric"
                      autoFocus
                      className="space-x-2"
                    >
                      <InputOTPSlot index={0} />
                      <InputOTPSlot index={1} />
                      <InputOTPSlot index={2} />
                      <InputOTPSlot className="rounded-r-md" index={3} />
                    </InputOTP>
                  </div>
                  <div className="flex justify-end">
                    <Button
                      onClick={handleConfirm}
                      disabled={otp.length < 4}
                      className="px-[23px] py-2 bg-cerulean text-white disabled:bg-superSilver disabled:text-darkSoul"
                    >
                      Подтвердить
                    </Button>
                  </div>
                </div>
              ) : (
                <Button
                  type="submit"
                  onClick={resendCode}
                  // disabled={!isValid}
                  //   className={`mt-6 w-full h-12 bg-cerulean text-white pt-[15px] pb-[17px] font-bold text-base leading-[18px] rounded-[9px] hover:bg-cerulean/90 hoverEffect
                  // ${!isValid ? " bg-darkSoul " : ""}`}
                  className={`mt-6 w-full h-12 bg-cerulean text-white pt-[15px] pb-[17px] font-bold text-base leading-[18px] rounded-[9px] hover:bg-cerulean/90 hoverEffect`}
                >
                  Отправить код повторно
                </Button>
              )}
            </>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default PhoneModal;
