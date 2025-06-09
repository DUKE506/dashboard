"use client";
import GridItem from "@/app/dashboard/_components/grid-item";
import { GridContentsLayout } from "@/types/grid-contents-layout";
import React from "react";
import News from "./news";
import Weather from "./weather";
import Stock from "./stock";
import Todo from "./todo";
import Station from "./station";
import Schedular from "./scheduler/schedular";
import Calendar from "./calendar/calendar";
import { RotateCcwIcon } from "lucide-react";
import { format } from "date-fns/format";

interface ContentsProps {
  data: GridContentsLayout;
  children?: React.ReactNode;
}

const Contents = ({ data, children, ...props }: ContentsProps) => {
  const renderContentsByCode = () => {
    switch (data.contents.name) {
      case "뉴스":
        data.item.minW = 3;
        data.item.minH = 10;
        return <News data={data.item} />;
      case "날씨":
        data.item.minW = 2;
        data.item.maxH = 5;
        data.item.minH = 5;
        return <Weather />;
      case "증권":
        data.item.minW = 2;
        return <Stock />;
      case "할일":
        data.item.minW = 2;
        return <Todo />;
      case "지하철 도착정보":
        data.item.minW = 2;
        return <Station />;
      case "스케줄러":
        data.item.minW = 2;
        return <Calendar />;
      default:
        return (
          <div className="flex justify-center items-center text-xs h-full">
            {data.contents.name}
          </div>
        );
    }
  };
  return (
    <GridItem data={data.item} title={data.contents.name} {...props}>
      {children}
      {renderContentsByCode()}
    </GridItem>
  );
};

export default Contents;

/**
 * 새로고침
 */

interface RefreshButtonProps {
  date?: Date;
  onClick: () => void;
}

export const RefreshButton = ({ date, onClick }: RefreshButtonProps) => {
  return (
    <div className="flex justify-end items-center gap-2">
      <span className="text-xs text-gray-500">최근 조회</span>
      <span className="text-xs">{date ? format(date, "HH:mm:ss") : null}</span>
      <div
        className="p-[6px] aspect-square rounded-[50%] hover:bg-gray-200 hover:cursor-pointer"
        onClick={onClick}
      >
        <RotateCcwIcon className="w-4 h-4 text-gray-500 " />
      </div>
    </div>
  );
};
