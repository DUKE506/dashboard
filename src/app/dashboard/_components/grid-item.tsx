import { useGridStore } from "@/store/grid-store";
import { Ellipsis, XIcon } from "lucide-react";
import React from "react";
import GridLayout from "react-grid-layout";
interface GridItemProps {
  data: GridLayout.Layout;
  title: string;
  children?: React.ReactNode;
}

const GridItem = ({ data, title, children, ...props }: GridItemProps) => {
  const { removeItem } = useGridStore();

  return (
    <div {...props}>
      <div className="relative h-full w-full border overflow-hidden bg-white/70 flex flex-col">
        <div className="relative w-full flex items-start justify-between px-2 py-2 ">
          <span className="text-sm text-gray-500 leading-none font-bold">
            {title}
          </span>
          <div className="flex-1 h-full drag-handle ">
            <Ellipsis className="absolute left-[50%] top-[50%] translate-[-50%]  w-4 h-4 text-gray-500 flex-1" />
          </div>

          <XIcon
            className="w-4 h-4 text-gray-500 hover:cursor-pointer"
            onClick={(e) => {
              removeItem(data.i);
            }}
          />
        </div>

        {/* 컨텐츠 */}
        <div className="flex-1 min-h-0 w-full ">{children}</div>
      </div>
    </div>
  );
};

export default GridItem;
