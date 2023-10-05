'use client'

import { useState, useMemo } from 'react'
import { affiliates } from '@/contexts/main'
import { TypeAnimation } from 'react-type-animation'

const Affiliates = () => {
        const [types, setTypes] = useState([])
        useMemo(() => {
                let array = []
                let delayText = 2000
                let empty = ''
                let delayEmpty = 1000
                for (let i = 0; i < affiliates.length; i++) {
                        array.push(affiliates[i])
                        array.push(delayText)
                        array.push(empty)
                        array.push(delayEmpty)
                }
                setTypes(array)
        }, [])
        return (
                <div className="h-[6.7vh] z-10">
                        <TypeAnimation
                                sequence={types}
                                wrapper="span"
                                speed={10}
                                deletionSpeed={50}
                                preRenderFirstString={false}
                                omitDeletionAnimation={false}
                                cursor={false}
                                className="font-hana text-[7.111vh] font-bold"
                                repeat={Infinity}
                        />
                </div>
        )
}

export default Affiliates
