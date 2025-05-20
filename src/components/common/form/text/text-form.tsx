import { FormControl, FormItem, FormLabel } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Eye, EyeClosed } from "lucide-react";
import { useState } from "react";

interface TextFormItemProps
  extends Omit<React.ComponentProps<"input">, "label"> {
  label?: string;
}

//text input formItem
export const TextFormItem = ({ label, ...props }: TextFormItemProps) => {
  return (
    <FormItem>
      <FormLabel>{label}</FormLabel>
      <FormControl>
        <Input {...props} />
      </FormControl>
    </FormItem>
  );
};

//password input formItem
export const TextPasswordFormItem = ({
  label,
  ...props
}: TextFormItemProps) => {
  const [isHide, setIsHide] = useState<boolean>(true);

  const handleHide = () => {
    setIsHide(!isHide);
  };

  return (
    <FormItem className="relative">
      <FormLabel>{label}</FormLabel>
      <div className="relative">
        <FormControl>
          <Input {...props} type={`${isHide ? "password" : "text"}`} />
        </FormControl>
        {isHide ? (
          <Eye
            className="text-gray-500 absolute right-3 top-1/2 w-5 h-5 -translate-y-1/2 hover:cursor-pointer"
            onClick={handleHide}
          />
        ) : (
          <EyeClosed
            className="text-gray-500 absolute right-3 top-1/2 w-5 h-5 -translate-y-1/2 hover:cursor-pointer"
            onClick={handleHide}
          />
        )}
      </div>
    </FormItem>
  );
};
