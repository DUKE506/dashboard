"use client";
import GridItem from "@/app/dashboard/_components/grid-item";
import { GridContentsLayout } from "@/types/grid-contents-layout";
import React from "react";
import News from "./news";

interface ContentsProps {
  data: GridContentsLayout;
  children?: React.ReactNode;
}

const Contents = ({ data, children, ...props }: ContentsProps) => {
  const renderContentsByCode = () => {
    switch (data.contents.code) {
      case 1:
        return <News data={data.item} />;
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
