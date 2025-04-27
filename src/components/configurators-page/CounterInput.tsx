"use client";
import { useState } from "react";
import { ChevronUp, ChevronDown } from "lucide-react";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";

interface CounterInputProps {
  label: string;
  value: number;
  onIncrease: () => void;
  onDecrease: () => void;
}

export const CounterInput = ({
  label,
  value,
  onIncrease,
  onDecrease,
}: CounterInputProps) => {
  return (
    <div className="flex items-center md:gap-8 gap-4 ">
      <div className="relative border border-gray-300 rounded-lg px-4 py-1 flex items-center justify-between min-w-[125px] min-h-[45px]">
        <span className="text-lg font-semibold">{value}</span>
        <div className="flex flex-col items-center ">
          <button
            type="button"
            onClick={onIncrease}
            className="hover:bg-gray-100 p-1 rounded "
          >
            <ChevronUp size={18} />
          </button>
          <button
            type="button"
            onClick={onDecrease}
            className={cn(
              "hover:bg-gray-100 rounded",
              value === 1 && "opacity-50 pointer-events-none"
            )}
          >
            <ChevronDown size={18} />
          </button>
        </div>
      </div>
      <Label className="text-[14px]">{label}</Label>
    </div>
  );
};
