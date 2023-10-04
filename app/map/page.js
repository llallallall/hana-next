'use client'
import { useState, useEffect } from 'react'
import './map.css'
import Circles from '@/components/Circles'
// import mapboxgl from 'mapbox-gl'
// import 'mapbox-gl/dist/mapbox-gl.css'
//import MapGL from '@/components/MapGL'
//import { lists } from '@/contexts/map'
import dynamic from 'next/dynamic'
const MapDeck = dynamic(() => import('@/components/MapDeck'), { ssr: false })
//import MapDeck from '@/components/MapDeck'
const page = () => {
        const [viewState, setViewState] = useState({
                longitude: 0,
                latitude: 0,
                zoom: 2.6,
        })
        const [dataLoaded, setDataLoaded] = useState(false)
        useEffect(() => {
                if (!dataLoaded) {
                        fetchData()
                }
        }, [dataLoaded])
        useEffect(() => {
                let newZoom = (2.6 / 3820) * window.innerWidth

                setTimeout(() => {
                        // 비율리사이즈
                        setViewState({
                                longitude: 0,
                                latitude: 0,
                                zoom: newZoom,
                        })
                }, 500)

                //30초마다 읽어온다.
                const timer = setInterval(() => {
                        console.log('data fetch')
                        setDataLoaded(false)
                        fetchData()
                }, 60000) // 60000 = 1min
                return () => {
                        clearInterval(timer)
                }
        }, [])

        const [lists, setLists] = useState()

        const sendToParent = (arr) => {
                console.log('received lists')
                setLists(arr)
        }

        const [flights, setFlights] = useState()

        const viewItems = 100 // 읽어올 데이터 수
        const [fetchCount, setFetchCount] = useState(0) // 읽어온 횟수

        const fetchData = async () => {
                const response = await fetch('/data/attacks.json')
                //console.log(response)
                response.json().then((data) => {
                        // 읽어온 데이터를 viewItems 수만큼 잘라온다
                        let startIndex =
                                fetchCount * viewItems >= data.length
                                        ? data.length
                                        : fetchCount * viewItems
                        let endIndex =
                                (fetchCount + 1) * viewItems >= data.length
                                        ? data.length
                                        : (fetchCount + 1) * viewItems
                        let current = data.slice(startIndex, endIndex) //index 시작, 끝

                        setFlights(current)

                        // 무한 반복
                        setFetchCount(0)
                        // if (fetchCount * viewItems < data.length) {
                        //         setFetchCount(fetchCount + 1)
                        // } else {
                        //         setFetchCount(0)
                        // }
                        // console.log(fetchCount)
                        // console.log(flights)
                })

                setDataLoaded(true)
        }

        return (
                <div className="relative w-screen h-screen flex-col items-center justify-center z-10 text-white m-0 p-0">
                        {/* <div className="absolute w-screen h-screen z-20 select-none"></div> */}

                        <div className="absolute w-screen text-center mx-auto mt-[4.537vh] font-apple font-extrabold text-[4.537vh] z-10">
                                LIVE CYBER THREAT MAP
                        </div>

                        <div className="relative w-full h-[calc(100%-20vh)] translate-y-[20vh] flex-col text-white z-10">
                                <MapDeck
                                        sendToParent={sendToParent}
                                        viewState={viewState}
                                        flights={flights}
                                        dataLoaded={dataLoaded}
                                />

                                <div
                                        className="absolute bottom-0 w-[21.037vw] h-[35.648vh] ml-[3.049vw] pl-[1.22vw] pt-[1.852vh] mb-[8.981vh]
                        bg-gradient-to-b from-[#000] via-[#000]/80 to-[#000]/10 opacity-80
                        flex-col gap-5
                        z-10
                        ">
                                        <div className="relative font-apple font-extrabold  text-[1.667vh] h-[2vh]">
                                                ATTACKS
                                        </div>
                                        <div className="relative w-full h-[calc(100%-4vh)] overflow-hidden">
                                                <div className="absolute top-0 scroll-container pt-[3vh] pb-[1vh]">
                                                        {lists &&
                                                                lists.length >
                                                                        0 &&
                                                                lists.map(
                                                                        (
                                                                                item,
                                                                                index
                                                                        ) => {
                                                                                return (
                                                                                        <div
                                                                                                className="relative flex items-center "
                                                                                                key={
                                                                                                        index
                                                                                                }>
                                                                                                <div className="flex-none w-[2.083vw] h-[3.704vh] mr-[0.43vw]">
                                                                                                        <Circles
                                                                                                                type={
                                                                                                                        item.type
                                                                                                                }
                                                                                                        />
                                                                                                </div>
                                                                                                <div className="flex-col items-start ">
                                                                                                        <div className="font-apple font-bold text-[1.183vh]  whitespace-nowrap overflow-hidden">
                                                                                                                {
                                                                                                                        item.title
                                                                                                                }
                                                                                                        </div>
                                                                                                        <div className="font-apple text-[1.183vh]">
                                                                                                                {
                                                                                                                        item.starttime
                                                                                                                }
                                                                                                        </div>
                                                                                                        <div className="font-apple text-[1.183vh] whitespace-nowrap overflow-hidden">
                                                                                                                {
                                                                                                                        item.detail
                                                                                                                }
                                                                                                        </div>
                                                                                                </div>
                                                                                        </div>
                                                                                )
                                                                        }
                                                                )}
                                                </div>
                                        </div>
                                </div>
                                <div
                                        className="absolute bottom-0 w-[21.037vw] h-[35.648vh] ml-[3.049vw] pl-[1.22vw] pt-[1.852vh] mb-[8.981vh]
                        bg-gradient-to-b from-[#000]/0 via-[#000]/10 to-[#000]/100
                        text-left
                        overflow-hidden
                        z-20
                        "></div>
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
