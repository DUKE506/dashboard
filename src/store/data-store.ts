import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";

interface DataState {
  naverData: NaverData | undefined;
  setNaverData: (data: NaverData) => void;
}

export const useDataState = create<DataState>()(
  devtools(
    persist<DataState>(
      (set) => ({
        naverData: undefined,
        setNaverData: (data) => {
          set({ naverData: data });
        },
      }),
      { name: "data-store" }
    )
  )
);
