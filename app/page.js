'use client'
import './index.css'
import { useRef, useState, useEffect, useMemo } from 'react'
import {
        affiliates,
        totalLogs,
        protections,
        securityAlert,
        triagedAlert,
        escalatedAlert,
} from '@/contexts/main'

const page = () => {
        const videoRef = useRef(null)

        useEffect(() => {
                if (videoRef && videoRef.current) {
                        videoRef.current.play()
                }
        }, [videoRef])

        const logCount = useMemo(() => {
                let M = 1000000
                let B = 1000000000
                let T = 1000000000000
                let unit = ''
                let count = 0
                if (parseInt(totalLogs / T) > 0) {
                        count = parseInt(totalLogs / T)
                        unit = 'T'
                } else if (parseInt(totalLogs / B) > 0) {
                        count = parseInt(totalLogs / B)
                        unit = 'B'
                } else {
                        count = parseInt(totalLogs / M)
                        unit = 'M'
                }

                return count + unit
        }, [totalLogs])

        const securityCount = useMemo(() => {
                if (securityAlert > 1000) {
                        return parseInt(securityAlert / 1000) + 'K'
                } else {
                        return securityAlert
                }
        }, [securityAlert])

        const triagedCount = useMemo(() => {
                if (triagedAlert > 1000) {
                        return parseInt(triagedAlert / 1000) + 'K'
                } else {
                        return triagedAlert
                }
        }, [triagedAlert])

        const escalatedCount = useMemo(() => {
                if (escalatedAlert > 1000) {
                        return parseInt(escalatedAlert / 1000) + 'K'
                } else {
                        return escalatedAlert
                }
        }, [escalatedAlert])

        const [isOnA, setIsOnA] = useState(true)
        const [countA, setCountA] = useState(0)

        useEffect(() => {
                const affiliatesInterval = setInterval(() => {
                        setIsOnA(false)
                        let next = countA + 1
                        if (countA > affiliates.length - 1) {
                                setCountA(0)
                        } else {
                                setCountA(next)
                        }
                        setIsOnA(true)
                }, 4000)
                return () => clearInterval(affiliatesInterval)
        }, [countA])

        const [isOnP, setIsOnP] = useState(true)
        const [countP, setCountP] = useState(0)

        useEffect(() => {
                const protectionsInterval = setInterval(() => {
                        setIsOnP(false)
                        let next = countP + 1
                        if (next > protections.length - 1) {
                                setCountP(0)
                        } else {
                                setCountP(next)
                        }
                        setIsOnP(true)
                }, 4000)
                return () => clearInterval(protectionsInterval)
        }, [countP])

        const Refresh = ({ children }) => {
                if (isOnA) {
                        return <section>{children}</section>
                }
        }
        const RefreshProtection = ({ children }) => {
                if (isOnP) {
                        return <section>{children}</section>
                }
        }

        return (
                <div className="z-10 font-extrabold">
                        <div className="w-screen h-screen z-1 flex justify-center video-wrapper">
                                <video
                                        ref={videoRef}
                                        muted
                                        loop
                                        poster="/videos/terasys_2.1.png">
                                        <source
                                                src="/videos/terasys_2.1.mp4"
                                                type="video/mp4"
                                        />
                                        Your browser does not support the video
                                        tag.
                                </video>
                                <div className="absolute top-0 left-0 z-10 flex justify-center w-screen h-screen">
                                        <div className="relative h-[9.8vh] mt-[13.8vh] flex justify-center">
                                                <div className=" text-white font-apple text-[13.333vh] -translate-y-[5.185vh]">
                                                        {logCount}
                                                </div>
                                        </div>
                                        <div className="bottom">
                                                <div className="left ">
                                                        <div className="h-[6.7vh]">
                                                                <Refresh>
                                                                        <div
                                                                                className="typing-effect font-hana"
                                                                                data-text={
                                                                                        affiliates[
                                                                                                countA
                                                                                        ]
                                                                                }>
                                                                                {
                                                                                        affiliates[
                                                                                                countA
                                                                                        ]
                                                                                }
                                                                        </div>
                                                                </Refresh>
                                                        </div>
                                                </div>
                                                <div className="right">
                                                        <div className="text-white flex-col w-full flex items-center font-apple">
                                                                <div className="h-[4vh] mb-[4vh] ">
                                                                        <RefreshProtection>
                                                                                <div className="fadeout-effect  text-[4.889vh] -translate-y-[1.481vh]  ">
                                                                                        {
                                                                                                protections[
                                                                                                        countP
                                                                                                ]
                                                                                        }
                                                                                </div>
                                                                        </RefreshProtection>
                                                                </div>

                                                                <div className="flex justify-center gap-[7.556vh]">
                                                                        <div className="flex-col items-center justify-start">
                                                                                <div className="h-[1.76vh] mb-[2vh] ">
                                                                                        <div className="flex justify-center items-center text-[1.926vh] -translate-y-[0.444vh] ">
                                                                                                SECURITY
                                                                                                EVENT
                                                                                        </div>
                                                                                </div>
                                                                                <div className="h-[4.9vh]">
                                                                                        <div className="flex justify-center items-center  text-[6.815vh] -translate-y-[2.667vh] ">
                                                                                                {
                                                                                                        securityCount
                                                                                                }
                                                                                        </div>
                                                                                </div>
                                                                        </div>
                                                                        <div className="flex-col items-center justify-start">
                                                                                <div className="h-[1.76vh] mb-[2vh] ">
                                                                                        <div className="flex justify-center items-center text-[1.926vh] -translate-y-[0.444vh] ">
                                                                                                TRIAGED
                                                                                                ALERTS
                                                                                        </div>
                                                                                </div>
                                                                                <div className="h-[4.9vh]">
                                                                                        <div className="flex justify-center items-center  text-[6.815vh] -translate-y-[2.667vh] ">
                                                                                                {
                                                                                                        triagedCount
                                                                                                }
                                                                                        </div>
                                                                                </div>
                                                                        </div>

                                                                        <div className="flex-col items-center justify-start">
                                                                                <div className="h-[1.76vh] mb-[2vh] ">
                                                                                        <div className="flex justify-center items-center text-[1.926vh] -translate-y-[0.444vh] ">
                                                                                                ESCALATED
                                                                                                ALERTS
                                                                                        </div>
                                                                                </div>
                                                                                <div className="h-[4.9vh]">
                                                                                        <div className="flex justify-center items-center  text-[6.815vh] -translate-y-[2.667vh] ">
                                                                                                {
                                                                                                        escalatedCount
                                                                                                }
                                                                                        </div>
                                                                                </div>
                                                                        </div>
                                                                </div>
                                                        </div>
                                                </div>
                                        </div>
                                </div>
                        </div>
                </div>
        )
}

export default page
