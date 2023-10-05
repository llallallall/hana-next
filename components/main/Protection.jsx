'use client'
import React, { useState } from 'react'
import { useTransition, animated } from '@react-spring/web'
import { protections } from '@/contexts/main'
const Protection = () => {
        const [index, set] = useState(0)
        const transitions = useTransition(index, {
                key: index,
                from: { opacity: 0 },
                enter: { opacity: 1 },
                leave: { opacity: 0 },
                config: { duration: 4000 },
                onRest: (_a, _b, item) => {
                        if (index === item) {
                                set((state) => (state + 1) % protections.length)
                        }
                },
                exitBeforeEnter: true,
        })

        return (
                <div className="h-[4vh] mb-[4vh] ">
                        {transitions((style, i) => (
                                <animated.div
                                        style={{
                                                ...style,
                                        }}
                                        className="text-[4.889vh] -translate-y-[1.481vh]">
                                        {protections[i]}
                                </animated.div>
                        ))}
                </div>
        )
}

export default Protection
