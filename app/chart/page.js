'use client'
import './chart.css'
import { useState, useEffect } from 'react'

import Summary from '@/components/chart/Summary'
import ProcessingStatus from '@/components/chart/ProcessingStatus'
import CasesByRisk from '@/components/chart/CasesByRisk'
import Notice from '@/components/chart/Notice'
import DailyTrend from '@/components/chart/DailyTrend'
import DynamicChart from '@/components/chart/DynamicChart'

const page = () => {
        const [info, setInfo] = useState()
        const [loaded, setLoaded] = useState(false)
        const [zoomRatio, setZoomRatio] = useState(1)

        let newZoom = 0
        useEffect(() => {
                if (newZoom == 0) {
                        newZoom == 1
                        if (window) {
                                newZoom = window.innerWidth / 3820
                        }
                        setZoomRatio(newZoom)
                }
        })

        // 요약정보
        let infoFetchCount = false
        useEffect(() => {
                if (!infoFetchCount) {
                        fetch('/data/chart_info.json')
                                .then((resp) => resp.json())
                                .then((data) => {
                                        setInfo(data)
                                })

                        infoFetchCount = true
                }
        }, [])

        return (
                <div>
                        <div className="w-screen h-screen flex-col items-center justify-center z-10 text-white px-[2.618vw] pt-[4.63vh]">
                                <div className="text-[4.167vh] font-apple font-extrabold text-left mb-[4.167vh]">
                                        실시간 위험탐지 현황
                                </div>
                                <Summary info={info} />
                                {/* <RealtimeChart
                                        seriesA={seriesA}
                                        xaxisLabel={xaxisLabel}
                                        zoomRatio={zoomRatio}
                                /> */}
                                <DynamicChart zoomRatio={zoomRatio} />
                                <div className="w-full h-[18.889vh]  mb-[7.037vh] flex justify-between items-start">
                                        <div className="flex-col items-center w-[29.843vw] h-full">
                                                <div className="w-full h-[5.861vh] flex items-start justify-center text-[2.852vh] font-apple font-bold ">
                                                        케이스 처리현황
                                                </div>
                                                <ProcessingStatus info={info} />
                                        </div>

                                        <div className="flex-col items-center w-[38.665vw] h-full">
                                                <div className="w-full h-[5.861vh] flex items-start justify-center text-[2.852vh] font-apple font-bold ">
                                                        일일 위험도별 케이스
                                                </div>
                                                <CasesByRisk info={info} />
                                        </div>
                                        <div className="flex-col items-center w-[26.702vw] h-full">
                                                <div className="w-full h-[5.861vh] flex items-start justify-center text-[2.852vh] font-apple font-bold ">
                                                        일별 케이스 추이
                                                </div>
                                                <DailyTrend
                                                        info={info}
                                                        zoomRatio={zoomRatio}
                                                />
                                        </div>
                                </div>
                                <Notice />
                        </div>
                </div>
        )
}

export default page
