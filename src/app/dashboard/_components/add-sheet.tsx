"use client";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { useGridStore } from "@/store/grid-store";
import { Contents, mockContents } from "@/types/contents-code";
import { Image, Plus } from "lucide-react";
import React from "react";

const AddSheet = () => {
  const { addItem } = useGridStore();

  const handleAddContents = (item: Contents) => {
    addItem(item);
  };
  return (
    <Sheet>
      <SheetTrigger asChild>
        <div className="group flex items-center gap-2 w-fit px-4 py-2 text-xs text-gray-500 hover:text-gray-600 hover:cursor-pointer hover:font-bold duration-150">
          <Plus className="w-4 h-4 group-hover:stroke-3" />
          Add Item
        </div>
      </SheetTrigger>
      <SheetContent className="overflow-auto pb-4">
        <SheetHeader>
          <SheetTitle>Items</SheetTitle>
          <SheetDescription>추가할 항목을 선택하세요.</SheetDescription>
        </SheetHeader>
        <div className="space-y-8">
          {mockContents.map((c) => (
            <ItemBox
              key={c.code}
              label={`${c.name}`}
              description={`${c.description ?? ""}`}
              // onClick={addItem}
              onClick={() => handleAddContents(c)}
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
  onClick: () => void;
}

const ItemBox = ({ label, description, onClick }: ItemBoxProps) => {
  return (
    <div className="flex flex-col gap-2 mx-4" onClick={onClick}>
      <div className="flex justify-center items-center border rounded-xs bg-gray-100 min-h-40">
        <Image className="w-6 h-6 text-gray-500" />
      </div>
      <div className="flex flex-col gap-1">
        <span className="text-sm ">{label}</span>
        <span className="text-xs text-gray-600">{description}</span>
      </div>
    </div>
  );
};

export default AddSheet;
