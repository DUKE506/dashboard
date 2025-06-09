import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { Button } from "../ui/button";
import { PlusIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface CustomDialogProps {
  title?: string;
  children: (props: {
    setIsOpen?: React.Dispatch<React.SetStateAction<boolean>>;
  }) => React.ReactNode;
  className?: string;
}

const CustomDialog = ({ title, children, className }: CustomDialogProps) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button
          className={cn(
            "rounded-xs hover:bg-gray-200 hover:cursor-pointer ",
            className
          )}
        >
          <PlusIcon className="text-black stroke-1 dark:text-white" />
          <span className="text-black text-xs dark:text-white">새 일정</span>
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{title ?? "다이얼로그"}</DialogTitle>
        </DialogHeader>
        {children({ setIsOpen })}
      </DialogContent>
    </Dialog>
  );
};

export default CustomDialog;
