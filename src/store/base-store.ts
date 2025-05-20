import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";
import GridLayout from "react-grid-layout";

// 기본 아이템 목록
const defaultItems = [
  { i: "a", x: 0, y: 0, w: 1, h: 1, minW: 0, minH: 0 },
  { i: "b", x: 0, y: 1, w: 1, h: 1, minW: 0, minH: 0 },
  { i: "c", x: 0, y: 2, w: 1, h: 1, minW: 1, minH: 1 },
  { i: "d", x: 0, y: 3, w: 1, h: 1, minW: 1, minH: 1 },
  { i: "e", x: 0, y: 4, w: 1, h: 1 },
];

// 각 breakpoint별 레이아웃 생성
const generateLayouts = (items: GridLayout.Layout[]) => {
  return {
    lg: items.map((item) => ({ ...item, isResizable: true })),
    md: items.map((item) => ({ ...item, isResizable: true })),
    sm: items.map((item) => ({ ...item, isResizable: true })),
    xs: items.map((item) => ({ ...item, isResizable: true })),
    xxs: items.map((item) => ({ ...item, isResizable: true })),
  };
};
interface BaseState {
  layout: ReactGridLayout.Layouts;
  items: GridLayout.Layout[];
}

export const useBaseStore = create<BaseState>()(
  devtools(
    persist(
      (set) => ({
        layout: generateLayouts(defaultItems),
        items: defaultItems,
      }),
      { name: "base-store" }
    )
  )
);
