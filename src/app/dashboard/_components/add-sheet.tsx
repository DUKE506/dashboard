import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Plus } from "lucide-react";
import React from "react";

const AddSheet = () => {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <div className="flex items-center gap-2 w-fit px-4 py-2 border rounded-sm text-xs">
          <Plus className="w-4 h-4" />
          Add Item
        </div>
      </SheetTrigger>
      <SheetContent className="overflow-auto pb-4">
        <SheetHeader>
          <SheetTitle>Items</SheetTitle>
          <SheetDescription>추가할 항목을 선택하세요.</SheetDescription>
        </SheetHeader>
        <div className="space-y-8">
          {[0, 1, 2, 3, , 4].map((item) => (
            <ItemBox
              key={item}
              label={`항목${item}`}
              description={`여기는 설명${item} 내용입니다.`}
            />
          ))}
        </div>
      </SheetContent>
    </Sheet>
  );
};

interface ItemBoxProps {
  label: string;
  description: string;
}

const ItemBox = ({ label, description }: ItemBoxProps) => {
  return (
    <div className="flex flex-col mx-4">
      <div className="border rounded-xs bg-gray-100 min-h-40"></div>
      <div className="flex flex-col gap-1">
        <span className="text-sm ">{label}</span>
        <span className="text-xs">{description}</span>
      </div>
    </div>
  );
};

export default AddSheet;
