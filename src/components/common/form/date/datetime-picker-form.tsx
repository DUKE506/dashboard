import { FormControl, FormItem, FormLabel } from "@/components/ui/form";
import React from "react";
import CustomDatetimePicker from "../../content/calendar/custom-datetime-picker";

interface DatetimePickerFormItemProps {
  label?: string;
  value: Date;
  onChange: (date: Date) => void;
}

const DatetimePickerFormItem = ({
  label,
  value,
  onChange,
  ...props
}: DatetimePickerFormItemProps) => {
  return (
    <FormItem>
      <FormLabel className="text-sm">{label}</FormLabel>
      <FormControl>
        <CustomDatetimePicker
          value={value}
          onChange={(date) => onChange(date)}
        />
      </FormControl>
    </FormItem>
  );
};

export default DatetimePickerFormItem;
