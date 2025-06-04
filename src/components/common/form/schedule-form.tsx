import { Form, FormField } from "@/components/ui/form";
import { Schedule } from "@/types/schedule/schedule";
import { zodResolver } from "@hookform/resolvers/zod";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { TextFormItem } from "./text/text-form";
import CustomDatetimePicker from "../content/calendar/custom-datetime-picker";
import DatetimePickerFormItem from "./date/datetime-picker-form";
import { Button } from "@/components/ui/button";
import { CreateSchedule } from "@/types/schedule/create-schedule";
import { format, isAfter, isBefore } from "date-fns";
import { useCalendar } from "../content/calendar/useCalendar";
import { useCalendarStore } from "@/store/calendar-store";

const scheduleFormSchema = z.object({
  title: z.string().min(2, { message: "두 글자 이상 입력해주세요." }),
  startedAt: z.date(),
  endedAt: z.date(),
});

type ScheduleFormType = z.infer<typeof scheduleFormSchema>;

interface ScheduleFormProps {
  startDate?: Date;
}

const ScheduleForm = ({ startDate }: ScheduleFormProps) => {
  const { schedules, addSchedule } = useCalendarStore();
  const [schedule, setSchedule] = useState<CreateSchedule>({
    startedAt: startDate,
    endedAt: startDate,
  });
  const form = useForm<ScheduleFormType>({
    resolver: zodResolver(scheduleFormSchema),
    defaultValues: {
      title: "",
      startedAt: schedule.startedAt,
      endedAt: schedule.endedAt,
    },
  });

  useEffect(() => {
    //언마운트 시 스케쥴 객체 초기화
    return () => {
      setSchedule({});
    };
  }, []);

  const handleSubmit = (values: ScheduleFormType) => {
    addSchedule(
      new Schedule({
        id: schedules.length + 1,
        ...values,
      })
    );
  };

  const handleDateChange = (
    type: "start" | "end",
    date: Date,
    onChange: (...event: any[]) => void
  ) => {
    //시작날짜가 종료날짜보다 이후인 경우
    if (type === "start") {
      if (isAfter(date, form.getValues().endedAt)) {
        onChange(date);
        form.setValue("endedAt", date);
      } else {
        onChange(date);
      }
    }

    //종료날짜가 시작날짜보다 이전인 경우
    if (type === "end") {
      if (isBefore(date, form.getValues().startedAt)) {
        onChange(date);
        form.setValue("startedAt", date);
      } else {
        onChange(date);
      }
    }

    // console.log("바뀐날짜 시작 : ", form.getValues().startedAt);
    // console.log("바뀐날짜 정료 : ", form.getValues().endedAt);
  };

  return (
    <Form {...form}>
      <form
        className="flex flex-col gap-8"
        onSubmit={form.handleSubmit(handleSubmit)}
      >
        <div className="flex flex-col gap-4">
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <TextFormItem label="일정" placeholder="일정" {...field} />
            )}
          />
          <FormField
            control={form.control}
            name="startedAt"
            render={({ field }) => (
              <DatetimePickerFormItem
                label="시작"
                value={field.value}
                onChange={(date) =>
                  handleDateChange("start", date, field.onChange)
                }
              />
            )}
          />
          <FormField
            control={form.control}
            name="endedAt"
            render={({ field }) => (
              <DatetimePickerFormItem
                label="종료"
                value={field.value}
                onChange={(date) =>
                  handleDateChange("end", date, field.onChange)
                }
              />
            )}
          />
        </div>
        <Button className="w-full hover:cursor-pointer">추가</Button>
      </form>
    </Form>
  );
};

export default ScheduleForm;
