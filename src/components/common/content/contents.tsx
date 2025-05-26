"use client";
import GridItem from "@/app/dashboard/_components/grid-item";
import { GridContentsLayout } from "@/types/grid-contents-layout";
import React from "react";
import News from "./news";
import Weather from "./weather";
import Stock from "./stock";
import Todo from "./todo";

interface ContentsProps {
  data: GridContentsLayout;
  children?: React.ReactNode;
}

const Contents = ({ data, children, ...props }: ContentsProps) => {
  const renderContentsByCode = () => {
    switch (data.contents.name) {
      case "뉴스":
        data.item.minW = 3;
        data.item.minH = 2;
        return <News data={data.item} />;
      case "날씨":
        data.item.minW = 2;
        return <Weather />;
      case "증권":
        data.item.minW = 2;
        return <Stock />;
      case "할일":
        data.item.minW = 2;
        return <Todo />;
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
