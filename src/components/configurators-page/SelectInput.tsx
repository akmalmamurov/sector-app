"use client";

import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface SelectInputProps {
  label: string;
  options: { label: string; value: string }[];
  value: string;
  onChange: (value: string) => void;
}

export const SelectInput = ({
  label,
  options,
  value,
  onChange,
}: SelectInputProps) => {
  return (
    <div className="flex flex-col gap-2">
      <Label className="text-[14px]">{label}</Label>
      <Select onValueChange={onChange} value={value}>
        <SelectTrigger className="border border-gray-300 rounded-lg px-4 py-2">
          <SelectValue placeholder="Выберите" />
        </SelectTrigger>
        <SelectContent>
          {options.map((option) => (
            <SelectItem key={option.value} value={option.value}>
              {option.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
};
