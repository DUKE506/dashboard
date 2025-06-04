import React from "react";
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
  children: React.ReactNode;
  className?: string;
}

const CustomDialog = ({ title, children, className }: CustomDialogProps) => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className={cn("rounded-xs ", className)}>
          <PlusIcon className="text-black stroke-1" />
          <span className="text-black text-xs">새 일정</span>
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{title ?? "다이얼로그"}</DialogTitle>
        </DialogHeader>
        {children}
      </DialogContent>
    </Dialog>
  );
};

export default CustomDialog;
