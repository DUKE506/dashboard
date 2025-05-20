"use client";
import { useBaseStore } from "@/store/base-store";
import React from "react";
import { Responsive, WidthProvider } from "react-grid-layout";
import "/node_modules/react-grid-layout/css/styles.css";
import "/node_modules/react-resizable/css/styles.css";

const ResponsiveGridLayout = WidthProvider(Responsive);

const MainGridLayout = () => {
  const { layout, items } = useBaseStore();

  return (
    <ResponsiveGridLayout
      className="layout"
      layouts={layout}
      breakpoints={{ lg: 1200, md: 996, sm: 768, xs: 480, xxs: 0 }}
      cols={{ lg: 12, md: 10, sm: 6, xs: 4, xxs: 2 }}
    >
      {items.map((v, i) => (
        <div key={v.i} className="dnd-movable-item border" {...v}>
          {v.i}
        </div>
      ))}
    </ResponsiveGridLayout>
  );
};

export default MainGridLayout;
