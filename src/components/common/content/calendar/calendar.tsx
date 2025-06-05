import dayjs from "dayjs";
import { useCalendar } from "./useCalendar";
import {
  ChevronLeft,
  ChevronRight,
  Edit,
  PencilIcon,
  Trash2,
} from "lucide-react";
import {
  format,
  isEqual,
  isSameDay,
  isSameMonth,
  isWithinInterval,
} from "date-fns";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { useCalendarStore } from "@/store/calendar-store";
import { Schedule } from "@/types/schedule/schedule";
import CustomDialog from "../../custom-dialog";
import ScheduleForm from "../../form/schedule-form";
import { cn } from "@/lib/utils";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";

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

      <CustomDialog
        title="일정추가"
        className="p-0 h-fit bg-inherit hover:bg-gray-50 dark:hover:bg-gray-200"
      >
        {({ setIsOpen }) => (
          <ScheduleForm
            startDate={new Date(focusDate.setMinutes(0))}
            onClose={setIsOpen}
          />
        )}
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

//요일 헤더 + 날짜 박스
interface RenderDaysProps {
  weeks: Date[][];
  viewDate: Date;
  focusDate: Date;
  onFocusDate: Dispatch<SetStateAction<Date>>;
}
const RenderDays = ({
  weeks,
  viewDate,
  focusDate,
  onFocusDate,
}: RenderDaysProps) => {
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
                viewDate={viewDate}
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

//일 박스
const DayBox = ({
  day,
  viewDate,
  focusDate,
  ...props
}: {
  day: Date;
  viewDate: Date;
  focusDate?: Date;
} & React.HTMLProps<HTMLDivElement>) => {
  const { holidays, schedules } = useCalendarStore();

  return (
    <div
      className={`flex-1 p-2 overflow-hidden ${
        focusDate === day ? "bg-blue-100 dark:bg-[#535353]" : null
      }`}
      {...props}
    >
      <span
        className={`text-xs   ${
          isSameDay(day, new Date())
            ? "bg-blue-500 flex justify-center items-center w-6 h-6 text-center rounded-full text-white "
            : null
        }
        ${!isSameMonth(day, viewDate) ? "text-gray-400" : ""}
        `}
      >
        {dayjs(day).format("DD")}
      </span>
      <div className="flex flex-col gap-1 min-w-0 ">
        {holidays.map((h, i) =>
          isSameDay(day, h.startedAt) ? <ScheduleItem key={i} data={h} /> : null
        )}
        {schedules.map((s, i) =>
          isWithinInterval(day, { start: s.startedAt, end: s.endedAt }) ? (
            <SchedulePopover
              className="bg-orange-500 hover:bg-orange-600"
              key={i}
              data={s}
            />
          ) : null
        )}
      </div>
    </div>
  );
};

//스케줄 아이템
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

//스케줄 아이템2 popover
//
// 수정 - ...처리 및 수직 중앙정렬
const SchedulePopover = ({ className, data }: ScheduleItemProps) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const { deleteSchedule } = useCalendarStore();

  const handleDelete = (id: string) => {
    deleteSchedule(id);
    setIsOpen(false);
  };
  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <PopoverTrigger asChild>
        <Button
          className={cn(
            "bg-blue-500 text-[0.6rem] py-0 h-fit flex items-center justify-start text-white px-2 rounded-xs truncate min-w-0 hover:bg-blue-600 hover:cursor-pointer",
            className
          )}
        >
          {data.title}
        </Button>
      </PopoverTrigger>
      <PopoverContent>
        <div>
          {/* 헤더 */}
          <div className="flex gap-2 justify-end">
            <div className="p-[6px] aspect-square hover:cursor-pointer hover:bg-gray-200 rounded-[50px]">
              <PencilIcon className="w-4 h-4 text-gray-500" />
            </div>
            <div
              className="p-[6px] aspect-square hover:cursor-pointer hover:bg-gray-200 rounded-[50px]"
              onClick={() => handleDelete(data.id)}
            >
              <Trash2 className="w-4 h-4 text-gray-500" />
            </div>
          </div>
          {/* 내용 */}
          <div>
            <span className="text-xl">{data.title}</span>
          </div>
          <div className="flex items-center gap-1">
            <span className="text-sm">
              {format(data.startedAt, "yyyy/MM/dd")}
            </span>
            {isEqual(data.startedAt, data.endedAt) ? null : (
              <>
                <span> - </span>
                <span className="text-sm">
                  {format(data.endedAt, "yyyy/MM/dd")}
                </span>
              </>
            )}
          </div>
        </div>
      </PopoverContent>
    </Popover>
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
          viewDate={curDate}
          focusDate={focusDate}
          onFocusDate={onFocusDate}
        />
      </div>
    </div>
  );
};

export default Calendar;
