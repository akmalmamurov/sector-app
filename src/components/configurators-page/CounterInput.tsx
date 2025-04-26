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
    <div className="flex flex-col gap-2">
      <Label className="text-[14px]">{label}</Label>
      <div className="relative border border-gray-300 rounded-lg px-4 py-2 flex items-center justify-between">
        <span className="text-lg font-semibold">{value}</span>
        <div className="flex flex-col items-center gap-1">
          <button
            type="button"
            onClick={onIncrease}
            className="hover:bg-gray-100 p-1 rounded"
          >
            <ChevronUp size={18} />
          </button>
          <button
            type="button"
            onClick={onDecrease}
            className={cn(
              "hover:bg-gray-100 p-1 rounded",
              value === 1 && "opacity-50 pointer-events-none"
            )}
          >
            <ChevronDown size={18} />
          </button>
        </div>
      </div>
    </div>
  );
};
