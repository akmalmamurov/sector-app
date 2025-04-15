"use client";

import React from "react";
import { IMaskInput } from "react-imask";

interface PhoneInputProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "onChange" | "value"> {
  value: string;
  onChange: (val: string) => void;
  id?: string;
  className?: string;
}

export const PhoneInput = React.forwardRef<HTMLInputElement, PhoneInputProps>(
  ({ value, onChange, id, className, ...rest }, ref) => (
    <IMaskInput
      mask={"+998 00 000 0000"}
      definitions={{ "0": /\d/ }}
      unmask={false}
      placeholderChar="_"
      lazy={false}
      value={value}
      onAccept={(val: string) => onChange(val)}
      inputRef={ref}
      id={id}
      className={className}
      {...rest}
    />
  )
);

PhoneInput.displayName = "PhoneInput";
export default PhoneInput;
