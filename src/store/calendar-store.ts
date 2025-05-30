import { Schedule } from "@/types/schedule";
import dayjs from "dayjs";
import ky from "ky";
import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";

interface CalendarState {
  schedules: Schedule[];
  holidays: Schedule[];
  getHolidays: (date: Date) => Promise<void>;
}

export const useCalendarStore = create<CalendarState>()(
  devtools(
    persist<CalendarState>(
      (set) => ({
        schedules: [],
        holidays: [],
        getHolidays: async (date) => {
          const searchParams = new URLSearchParams();

          searchParams.set("solYear", dayjs(date).format("YYYY"));

          const res = await ky.get("api/holiday", {
            searchParams: searchParams,
          });

          const data: Record<string, any> = await res.json();

          

          const holidays: Schedule[] = data.response.body.items.item.map(
            (s: Record<string, any>, i: number) => {
              const formatted = `${s.locdate.toString().slice(0, 4)}-${s.locdate
                .toString()
                .slice(4, 6)}-${s.locdate.toString().slice(6, 8)}`;

              return new Schedule({
                id: i,
                title: s.dateName,
                startedAt: new Date(formatted),
                endedAt: new Date(formatted),
              });
            }
          );

          set({ holidays: holidays });
        },
      }),
      { name: "calendar-store" }
    )
  )
);
