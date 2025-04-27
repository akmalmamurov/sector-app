"use client";

import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface SelectNumberInputProps {
  label: string;
  maxNumber: number; // maximum number (for example 10 or 30)
  value: string;
  onChange: (value: string) => void;
}

export const SelectNumberInput = ({
  label,
  maxNumber,
  value,
  onChange,
}: SelectNumberInputProps) => {
  return (
    <div className="flex gap-4 md:gap-8 items-center">
      <div className="">
        <Select onValueChange={onChange} value={value}>
          <SelectTrigger className="border text-lg font-semibold w-[125px] h-[45px] border-gray-300 rounded-lg px-4 py-2 outline-none">
            <SelectValue className="text-5" placeholder="Выберите" />
          </SelectTrigger>
          <SelectContent className="text-5">
            {Array.from({ length: maxNumber }, (_, i) => (
              <SelectItem
                className="text-5 "
                key={i + 1}
                value={(i + 1).toString()}
              >
                {i + 1}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      <Label className="text-[14px] text-wrap">{label}</Label>
    </div>
  );
};
