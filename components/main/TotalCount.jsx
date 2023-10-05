'use client'

import { useState, useMemo } from 'react'
import { totalLogs } from '@/contexts/main'
import CountUp from 'react-countup'
import { numberUnit } from '@/utils/format'
const TotalCount = () => {
        const [num, setNum] = useState(0)
        const [unit, setunit] = useState()
        useMemo(() => {
                let number = numberUnit(totalLogs)
                setNum(number[0])
                setunit(number[1])
        }, [])

        return (
                <div className="relative h-[9.8vh] mt-[13.8vh] flex justify-center">
                        <div className=" text-white font-apple text-[13.333vh] -translate-y-[5.185vh] flex items-center">
                                <CountUp
                                        delay={0.3}
                                        duration={3}
                                        decimals={0}
                                        decimal="."
                                        separator=","
                                        end={num}
                                        suffix={unit}
                                />
                        </div>
                </div>
        )
}

export default TotalCount
