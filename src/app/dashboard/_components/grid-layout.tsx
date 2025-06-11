"use client";
import { useGridStore } from "@/store/grid-store";
import React from "react";
import { Responsive, WidthProvider } from "react-grid-layout";
import "/node_modules/react-grid-layout/css/styles.css";
import "/node_modules/react-resizable/css/styles.css";
import Contents from "@/components/common/content/contents";

const ResponsiveGridLayout = WidthProvider(Responsive);

const MainGridLayout = () => {
  const { layout, items, changeLayout } = useGridStore();

  return (
    <>
      <ResponsiveGridLayout
        className="layout"
        draggableHandle=".drag-handle"
        breakpoints={{ lg: 1200, md: 996, sm: 768, xs: 480, xxs: 0 }}
        cols={{ lg: 12, md: 10, sm: 6, xs: 4, xxs: 2 }}
        // onLayoutChange={(layout) => changeLayout(layout)}
        rowHeight={30}
      >
        {items.map((v, i) => {
          return <Contents key={i} data={v} data-grid={{ ...v.item }} />;
        })}
      </ResponsiveGridLayout>
    </>
  );
};

export default MainGridLayout;
