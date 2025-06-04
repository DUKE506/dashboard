import dayjs from "dayjs";
import { useCalendar } from "./useCalendar";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { isSameDay } from "date-fns";
import { Dispatch, SetStateAction, useEffect } from "react";
import { useCalendarStore } from "@/store/calendar-store";
import { Schedule } from "@/types/schedule/schedule";
import CustomDialog from "../../custom-dialog";
import ScheduleForm from "../../form/schedule-form";
import { cn } from "@/lib/utils";

//달력 헤더
interface RenderHeaderCompProps {
  date: Date;
  onPrevMonth: () => void;
  onNextMonth: () => void;
}

interface RenderHeadersProps extends RenderHeaderCompProps {
  focusDate: Date;
}

const RenderHeader = ({
  date,
  focusDate,
  onPrevMonth,
  onNextMonth,
}: RenderHeadersProps) => {
  return (
    <div className="flex justify-center items-center gap-2 px-2 h-full relative">
      <div></div>
      <div className="flex-1 h-full ">
        <RemoteDate
          date={date}
          onNextMonth={onNextMonth}
          onPrevMonth={onPrevMonth}
        />
      </div>

      <CustomDialog className="p-0 h-fit bg-white hover:bg-gray-50">
        <ScheduleForm startDate={new Date(focusDate.setMinutes(0))} />
      </CustomDialog>
    </div>
  );
};

//달력 날짜 컨트롤러
interface RemoteDateProps extends RenderHeaderCompProps {}

const RemoteDate = ({ date, onPrevMonth, onNextMonth }: RemoteDateProps) => {
  return (
    <div className="flex absolute left-[50%] top-[50%] translate-[-50%] ">
      <div
        className="flex items-center justify-center hover:cursor-pointer"
        onClick={onPrevMonth}
      >
        <ChevronLeft className="w-6 h-6 text-gray-500" />
      </div>
      <span className="font-bold flex items-center">
        {dayjs(date).format("YYYY")}.{dayjs(date).format("MM")}
      </span>
      <div
        className="flex items-center justify-center hover:cursor-pointer"
        onClick={onNextMonth}
      >
        <ChevronRight className="w-6 h-6 text-gray-500" />
      </div>
    </div>
  );
};

interface RenderDaysProps {
  weeks: Date[][];
  focusDate: Date;
  onFocusDate: Dispatch<SetStateAction<Date>>;
}
const RenderDays = ({ weeks, focusDate, onFocusDate }: RenderDaysProps) => {
  const labels = [
    "일요일",
    "월요일",
    "화요일",
    "수요일",
    "목요일",
    "금요일",
    "토요일",
  ];
  return (
    <div className="flex flex-col h-full border-b divide-y ">
      <div className="flex border divide-x ">
        {labels.map((l, i) => {
          return (
            <div
              key={i}
              className="flex-1 text-center flex items-center justify-center py-1  first:text-red-500 last:text-red-500  "
            >
              <span className="text-xs ">{l}</span>
            </div>
          );
        })}
      </div>
      {weeks.map((w, i) => (
        <div key={i} className="flex flex-1 divide-x border-x">
          {w.map((d, i) => {
            return (
              <DayBox
                key={i}
                day={d}
                focusDate={focusDate}
                onClick={() => onFocusDate(d)}
              />
            );
          })}
        </div>
      ))}
    </div>
  );
};

const DayBox = ({
  day,
  focusDate,
  ...props
}: { day: Date; focusDate?: Date } & React.HTMLProps<HTMLDivElement>) => {
  const { holidays, schedules } = useCalendarStore();

  return (
    <div
      className={`flex-1 p-2 overflow-hidden ${
        focusDate === day ? "bg-blue-100" : null
      }`}
      {...props}
    >
      <span
        className={`text-xs   ${
          isSameDay(day, new Date())
            ? "bg-blue-500 flex justify-center items-center w-6 h-6 text-center rounded-full text-white "
            : null
        }`}
      >
        {dayjs(day).format("DD")}
      </span>
      <div className="flex flex-col gap-1 min-w-0 ">
        {holidays.map((h, i) =>
          isSameDay(day, h.startedAt) ? <ScheduleItem key={i} data={h} /> : null
        )}
        {schedules.map((s, i) =>
          isSameDay(day, s.startedAt) ? (
            <ScheduleItem className="bg-orange-500" key={i} data={s} />
          ) : null
        )}
      </div>
    </div>
  );
};

interface ScheduleItemProps {
  data: Schedule;
  className?: string;
}

const ScheduleItem = ({ className, data }: ScheduleItemProps) => {
  return (
    <div
      className={cn(
        "bg-blue-500 text-[0.6rem] text-white px-2 rounded-xs truncate",
        className
      )}
    >
      {data.title}
    </div>
  );
};

const Calendar = () => {
  const { weeks, curDate, focusDate, onNextMonth, onPrevMonth, onFocusDate } =
    useCalendar(new Date());
  const { getHolidays } = useCalendarStore();
  useEffect(() => {
    getHolidays(new Date());
  }, []);

  return (
    <div className="h-full flex flex-col gap-4 pb-2">
      <div className="flex-shrink-0">
        {/* 헤더는 고정 크기 */}
        <RenderHeader
          date={curDate}
          focusDate={focusDate}
          onNextMonth={onNextMonth}
          onPrevMonth={onPrevMonth}
        />
      </div>
      <div className="flex-1 min-h-0 px-2">
        {/* 나머지 공간, 최소높이 0 */}
        <RenderDays
          weeks={weeks}
          focusDate={focusDate}
          onFocusDate={onFocusDate}
        />
      </div>
    </div>
  );
};

export default Calendar;
