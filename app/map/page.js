'use client'
import './map.css'
import { useState, useEffect, useMemo } from 'react'
import Circles from '@/components/Circles'
import WorldDeck from '@/components/map/WorldDeck'
import FlightDeck from '@/components/map/FlightDeck'
import AttackInfo from '@/components/map/AttackInfo'

const page = () => {
        // 해상도에 따라 크기 변경
        const [viewState, setViewState] = useState({
                longitude: 0,
                latitude: 0,
                zoom: 2.6,
        })

        useMemo(() => {
                let newZoom = 1
                if (typeof window != 'undefined') {
                        newZoom = (2.6 / 3820) * window.innerWidth
                }

                setTimeout(() => {
                        // 비율리사이즈
                        setViewState({
                                longitude: 0,
                                latitude: 0,
                                zoom: newZoom,
                        })
                }, 300)
        }, [])

        // 데이터 로드
        const [dataLoaded, setDataLoaded] = useState(false)
        const [flights, setFlights] = useState()

        // iterate data load
        let maxFetch = 200 //mock data 최대 수(반복)
        let viewCount = Math.random() * (15 - 5) + 5 //한번에 보이는 개수
        const [fetchCount, setFetchCount] = useState(0)

        useEffect(() => {
                const fetchInterval = setInterval(() => {
                        let next =
                                fetchCount + viewCount >= maxFetch
                                        ? 0
                                        : fetchCount + viewCount
                        setFetchCount(next)
                        fetchData(next)
                }, 10000) //반복 시간 1초 = 1000
                return () => {
                        clearInterval(fetchInterval)
                }
        })

        const fetchData = async () => {
                const response = await fetch('/data/attacks.json')
                response.json().then((data) => {
                        setFlights(
                                data.slice(fetchCount, fetchCount + viewCount)
                        )
                        setDataLoaded(true)
                })
        }
        // initial data load
        useEffect(() => {
                fetchData(fetchCount)
        }, [])

        //rerender flight deck
        const [onReload, setOnReload] = useState(false)
        useEffect(() => {
                setOnReload(true)
        }, [flights])

        const Refresh = ({ children }) => {
                if (onReload) {
                        return <div>{children}</div>
                }
        }

        return (
                <div className="relative w-screen h-screen flex-col items-center justify-center z-10 text-white m-0 p-0">
                        {/* <div className="absolute w-screen h-screen z-20 select-none"></div> */}

                        <div className="absolute w-screen text-center mx-auto mt-[4.537vh] font-apple font-extrabold text-[4.537vh] z-10">
                                LIVE CYBER THREAT MAP
                        </div>

                        <div className="relative w-full h-[calc(100%-20vh)] translate-y-[20vh] flex-col text-white z-10">
                                <Refresh>
                                        <FlightDeck
                                                dataLoaded={dataLoaded}
                                                flights={flights}
                                                viewState={viewState}
                                        />
                                </Refresh>
                                <WorldDeck viewState={viewState} />
                                <div
                                        className="absolute bottom-0 w-[21.037vw] h-[35.648vh] ml-[3.049vw] pl-[1.22vw] pt-[1.852vh] mb-[8.981vh]
                        bg-gradient-to-b from-[#000] via-[#000]/80 to-[#000]/10 opacity-80
                        flex-col gap-5
                        z-10
                        ">
                                        <div className="relative font-apple font-extrabold  text-[1.667vh] h-[3vh]">
                                                ATTACKS
                                        </div>
                                        <div className="relative w-full h-[calc(100%-4vh)] overflow-hidden">
                                                <AttackInfo data={flights} />
                                        </div>
                                </div>
                                {/* <div
                                        className="absolute bottom-0 w-[21.037vw] h-[35.648vh] ml-[3.049vw] pl-[1.22vw] pt-[1.852vh] mb-[8.981vh]
                        bg-gradient-to-b from-[#000]/0 via-[#000]/10 to-[#000]/100
                        text-left
                        overflow-hidden
                        z-20
                        "></div> */}
                        </div>
                        <div className="fixed bottom-[2.581vh] w-full h-[8.981vh] flex items-center justify-end pr-[3.581vw] gap-[2.315vw] font-apple font-bold text-[1.667vh]">
                                <div className="flex items-center relative">
                                        <Circles type="malware" />
                                        <span>MALWAREA</span>
                                </div>
                                <div className="flex items-center relative">
                                        <Circles type="phishing" />
                                        <span>PHISHING</span>
                                </div>
                                <div className="flex items-center relative">
                                        <Circles type="intrusion" />
                                        <span>INTRUSION ATTEMPT</span>
                                </div>
                        </div>
                </div>
        )
}

export default page
