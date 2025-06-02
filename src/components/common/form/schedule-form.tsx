


import { Schedule } from '@/types/schedule'
import React from 'react'
import { z } from 'zod'

const scheduleFormSchema = z.object({
    title: z.string().min(2, { message: '두 글자 이상 입력해주세요.' }),
    //   startedAt: z.date(new Date()),
    //   endedAt: z.date(new Date),
})

type ScheduleFormType = z.infer<typeof scheduleFormSchema>

const ScheduleForm = () => {
    return (
        <div>ScheduleForm</div>
    )
}

export default ScheduleForm