import { X } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
} from "../ui/dialog";
import { Controller, useForm } from "react-hook-form";
import { ContrAgentRequest } from "@/types";
import { Label } from "../ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
interface Props {
  isOpen: boolean;
  toggleOpen: () => void;
}
export const ContrAgentModal: React.FC<Props> = ({ isOpen, toggleOpen }) => {
  const {
    handleSubmit,
    register,
    control,
    formState: { errors },
  } = useForm<ContrAgentRequest>();
  const onSubmit = (data: ContrAgentRequest) => {
    console.log(data);
  };
  return (
    <Dialog open={isOpen} onOpenChange={toggleOpen}>
      <DialogContent className="p-0 sm:rounded-none border-none max-w-[900px]">
        <div className="flex justify-between p-6 border-b border-superSilver">
          <DialogTitle className="w-fit text-textColor text-lg leading-[27px] font-normal">
            Добавление контрагента
          </DialogTitle>
          <button className="text-textColor" onClick={toggleOpen}>
            <X />
          </button>
        </div>
        <DialogDescription className="hidden">asd</DialogDescription>
        {/* <ContrAgentForm /> */}
        <div className="p-6">
          <form noValidate onSubmit={handleSubmit(onSubmit)}>
            <div className="w-full">
              <Label
                htmlFor="lastname"
                className="text-textColor font-normal text-sm flex gap-1 pb-2"
              >
                Форма собственности
                <span className="text-cerulean text-sm font-normal">*</span>
              </Label>
              <Controller
                name="ownershipForm"
                control={control}
                defaultValue="Юридическое лицо"
                render={({ field }) => (
                  <Select
                    onValueChange={(value) => {
                      field.onChange(value);
                    }}
                    value={field.value}
                  >
                    <SelectTrigger>
                      <SelectValue defaultValue={"Юридическое лицо"} />
                    </SelectTrigger>

                    <SelectContent>
                      <SelectItem value="Юридическое лицо">
                        Юридическое лицо
                      </SelectItem>
                      <SelectItem value="Юридическое лицо, обособленное подразделение">
                        Юридическое лицо, обособленное подразделение
                      </SelectItem>
                      <SelectItem value="Индивидуальный предприниматель">
                        Индивидуальный предприниматель
                      </SelectItem>
                      <SelectItem value="Юридическое лицо-нерезидент">
                        Юридическое лицо-нерезидент (иностранная организация)
                      </SelectItem>
                    </SelectContent>
                  </Select>
                )}
              />
            </div>
          </form>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ContrAgentModal;
