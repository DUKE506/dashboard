import dayjs from "dayjs";
import { useCalendar } from "./useCalendar";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { isSameDay } from "date-fns";

interface RenderHeadersProps {
  date: Date;
  onPrevMonth: () => void;
  onNextMonth: () => void;
}
const RenderHeader = ({
  date,
  onPrevMonth,
  onNextMonth,
}: RenderHeadersProps) => {
  return (
    <div className="flex justify-center items-center gap-2 px-2">
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
}
const RenderDays = ({ weeks }: RenderDaysProps) => {
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
      {weeks.map((w) => (
        <div className="flex flex-1 divide-x border-x">
          {w.map((d, i) => {
            return <DayBox key={i} day={d} />;
          })}
        </div>
      ))}
    </div>
  );
};

const DayBox = ({ day }: { day: Date }) => {
  console.log(day === new Date());
  return (
    <div className="flex-1 p-2">
      <span
        className={`text-xs p-2  ${
          isSameDay(day, new Date())
            ? "bg-blue-500 inline-block w-8 h-8 text-center rounded-full text-white "
            : null
        }`}
      >
        {dayjs(day).format("DD")}
      </span>
    </div>
  );
};

const Calendar = () => {
  const { weeks, curDate, onNextMonth, onPrevMonth } = useCalendar(new Date());

  return (
    <div className="h-full flex flex-col gap-4 pb-2">
      <div className="flex-shrink-0">
        {/* 헤더는 고정 크기 */}
        <RenderHeader
          date={curDate}
          onNextMonth={onNextMonth}
          onPrevMonth={onPrevMonth}
        />
      </div>
      <div className="flex-1 min-h-0 px-2">
        {/* 나머지 공간, 최소높이 0 */}
        <RenderDays weeks={weeks} />
      </div>
    </div>
  );
};

export default Calendar;
