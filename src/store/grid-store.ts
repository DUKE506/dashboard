import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";
import GridLayout from "react-grid-layout";
import { GridContentsLayout } from "@/types/grid-contents-layout";
import { Contents } from "@/types/contents-code";

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
interface GridState {
  layout: ReactGridLayout.Layouts;
  items: GridContentsLayout[];
  changeLayout: (layout: ReactGridLayout.Layout[]) => void;
  addItem: (item: Contents) => void;
  removeItem: (i: string) => void;
}

export const useGridStore = create<GridState>()(
  devtools(
    persist(
      (set, get) => ({
        layout: generateLayouts([]),
        items: [],
        changeLayout: (layout) => {
          // 수정해야함
          set({ layout: generateLayouts(layout) });
        },
        addItem: (contents) => {
          const { items } = get();
          const newItem: GridLayout.Layout = {
            i: items.length.toString(),
            x: 0,
            y: 0,
            w: 2,
            h: 1,
          };
          set((state) => ({
            items: state.items.concat({
              contents: contents,
              item: newItem,
            }),
          }));
        },
        removeItem: (i) => {
          set((state) => ({
            items: state.items.filter((item) => item.item.i !== i),
          }));
        },
      }),
      { name: "base-store" }
    )
  )
);
