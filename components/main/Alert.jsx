'use client'

import { useState, useMemo } from 'react'
import { numberUnit } from '@/utils/format'
import CountUp from 'react-countup'
const Alert = ({ title, number }) => {
        const [num, setNum] = useState(0)
        const [unit, setunit] = useState()
        useMemo(() => {
                let result = numberUnit(number)
                setNum(result[0])
                setunit(result[1])
        }, [])

        return (
                <div>
                        <div className="h-[1.76vh] mb-[2vh] ">
                                <div className="flex justify-center items-center text-[1.926vh] -translate-y-[0.444vh] uppercase">
                                        {title}
                                </div>
                        </div>
                        <div className="h-[4.9vh]">
                                <div className="flex justify-center items-center  text-[6.815vh] -translate-y-[2.667vh] ">
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
                </div>
        )
}

export default Alert
