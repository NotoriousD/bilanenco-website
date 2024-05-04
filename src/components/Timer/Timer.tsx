"use client"

import React, { useEffect, useMemo } from 'react'
import { useTimer } from 'react-timer-hook'

import css from './timer.module.scss'

interface TimerProps {
    expiryTimestamp: string | Date
}

export const Timer: React.FC<TimerProps> = ({
    expiryTimestamp
}) => {

    const {
        days,
        hours,
        minutes,
        seconds,
    } = useTimer({ expiryTimestamp: new Date(expiryTimestamp), autoStart: false });

    const daysText = useMemo(() => {
        if (days === 1) return 'день'
        if (days > 1 && days < 5) return 'дні'
        if (days >= 5) return 'днів'
    }, [days]);

    return (
        <div className={css.timer}>
            {Boolean(days) && `${days} ${daysText} :`} {Boolean(hours) && `${String(hours).padStart(2, "0")} год :`} {Boolean(minutes) && `${String(minutes).padStart(2, "0")} хв :`} {`${String(seconds).padStart(2, "0")} сек`}
        </div>
    )
}
