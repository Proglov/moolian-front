'use client'
import React, { useEffect, useState } from 'react'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { digitsEnToFa } from '@persian-tools/persian-tools'
import { numberToWords } from '@/lib/utils'

interface CountdownProps {
    targetTime: number;
    offPercentage: number;
}

const getTimeLeft = (targetTime: number) => {
    const now = Date.now()
    const diff = targetTime - now

    if (diff <= 0) {
        return { days: 0, hours: 0, minutes: 0, seconds: 0, finished: true }
    }

    const totalSeconds = Math.floor(diff / 1000)
    const days = Math.floor(totalSeconds / (3600 * 24))
    const hours = Math.floor((totalSeconds % (3600 * 24)) / 3600)
    const minutes = Math.floor((totalSeconds % 3600) / 60)
    const seconds = totalSeconds % 60

    return { days, hours, minutes, seconds, finished: false }
}

type TimeUnit = { value: number; label: string }

export default function Countdown({ targetTime, offPercentage }: CountdownProps) {
    const [timeLeft, setTimeLeft] = useState(() => getTimeLeft(targetTime))

    useEffect(() => {
        if (timeLeft.finished) return

        const interval = setInterval(() => {
            setTimeLeft(getTimeLeft(targetTime))
        }, 1000)

        return () => clearInterval(interval)
    }, [targetTime, timeLeft.finished])

    if (timeLeft.finished) {
        return (
            <Card className="w-full max-w-xs mx-auto mt-2">
                <CardContent className="py-4 flex flex-col items-center">
                    <Badge variant="destructive" className="text-sm px-4 py-1">
                        زمان تخفیف به پایان رسیده است
                    </Badge>
                </CardContent>
            </Card>
        )
    }

    const units: TimeUnit[] = [
        { value: timeLeft.days, label: 'روز' },
        { value: timeLeft.hours, label: 'ساعت' },
        { value: timeLeft.minutes, label: 'دقیقه' },
        { value: timeLeft.seconds, label: 'ثانیه' }
    ]

    return (
        <Card className={`w-full overflow-x-hidden max-w-[16rem] mx-auto mt-2 shadow-sm gap-0 ${units[0].value === 0 ? 'text-destructive' : 'text-success'}`} dir="ltr">
            <CardHeader dir='rtl' className='text-destructive text-sm'>
                تخفیف ویژه {numberToWords(offPercentage)} درصدی!
            </CardHeader>
            <CardContent className="py-4 flex justify-center gap-1">
                {units.map((unit, idx) => (
                    <React.Fragment key={unit.label}>
                        <TimeBox value={unit.value} label={unit.label} />
                        {idx < units.length - 1 && <Colon />}
                    </React.Fragment>
                ))}
            </CardContent>
        </Card>
    )
}

function TimeBox({ value, label }: { value: number; label: string }) {
    return (
        <div className="flex flex-col items-center min-w-[36px]">
            <span className="text-base">{digitsEnToFa(value.toString().padStart(2, '0'))}</span>
            <span className="text-[10px] text-muted-foreground mt-0.5">{label}</span>
        </div>
    )
}

function Colon() {
    return <span className="text-base font-bold text-muted-foreground">:</span>
}
