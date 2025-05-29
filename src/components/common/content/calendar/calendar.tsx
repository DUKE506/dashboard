import dayjs from "dayjs";
import { useCalendar } from "./useCalendar";

interface RenderHeadersProps {
  date: Date;
}
const RenderHeader = ({ date }: RenderHeadersProps) => {
  return (
    <div className="flex justify-center px-2">
      <span className="font-bold">
        {dayjs(date).format("YYYY")}.{dayjs(date).format("MM")}
      </span>
    </div>
  );
};

interface RenderDaysProps {
  weeks: Date[][];
}
const RenderDays = ({ weeks }: RenderDaysProps) => {
  return (
    <div className="grid grid-cols-7 h-full">
      {weeks.map((w) =>
        w.map((d) => {
          return <DayBox day={d} />;
        })
      )}
    </div>
  );
};

const DayBox = ({ day }: { day: Date }) => {
  return (
    <div className="border">
      <span className="text-xs">{dayjs(day).format("DD")}</span>
    </div>
  );
};

const Calendar = () => {
  const { weeks, curDate } = useCalendar(new Date());

  return (
    <div className="h-full">
      <RenderHeader date={curDate} />
      <RenderDays weeks={weeks} />
    </div>
  );
};

export default Calendar;
