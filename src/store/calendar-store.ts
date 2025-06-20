import { CreateSchedule } from "@/types/schedule/create-schedule";
import { Schedule } from "@/types/schedule/schedule";
import dayjs from "dayjs";
import ky from "ky";
import { v4 } from "uuid";
import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";

interface CalendarState {
  schedules: Schedule[];
  holidays: Schedule[];

  getHolidays: (date: Date) => Promise<void>;
  addSchedule: (schedule: Schedule) => void;
  deleteSchedule: (id: string) => void;
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
                id: v4(),
                title: s.dateName,
                startedAt: new Date(formatted),
                endedAt: new Date(formatted),
              });
            }
          );

          set({ holidays: holidays });
        },
        addSchedule: (schedule) => {
          set((state) => ({
            schedules: [...state.schedules, schedule],
          }));
        },
        deleteSchedule: (id) => {
          set((state) => ({
            schedules: state.schedules.filter((s) => s.id !== id),
          }));
        },
      }),
      { name: "calendar-store" }
    )
  )
);
