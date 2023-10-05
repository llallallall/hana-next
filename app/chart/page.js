'use client'
import './chart.css'
import { useState, useEffect } from 'react'
import dynamic from 'next/dynamic'
const Chart = dynamic(() => import('react-apexcharts'), { ssr: false })
import { chartAffiliates } from '@/contexts/main'
import CountUp from 'react-countup'

const addComma = (price) => {
        let returnString = price
                ?.toString()
                .replace(/\B(?=(\d{3})+(?!\d))/g, ',')
        return returnString
}

const page = () => {
        const [notice, setNotice] = useState()
        const [info, setInfo] = useState()
        const [loaded, setLoaded] = useState(false)

        const [zoomRatio, setZoomRatio] = useState(1)

        useEffect(() => {
                let newZoom = 1
                if (window) {
                        newZoom = window.innerWidth / 3820
                }
                setZoomRatio(newZoom)
        })

        // 공지사항
        useEffect(() => {
                fetch('/data/notice.json')
                        .then((resp) => resp.json())
                        .then((data) => {
                                setNotice(data)
                        })
        }, [])

        // 요약정보
        // "detectionCount": 3829,
        // "blockCount": 1172,
        // "alert": "관심",
        // "stateTodayComplete": 890,
        // "stateTodayImcomplete": 0,
        // "stateYesterdayComplete": 840,
        // "stateYesterdayImcomplete": 0,
        // "casesHigh": 75,
        // "casesMedium": 761,
        // "casesLow": 58,
        // "weeklyTrend": [

        useEffect(() => {
                fetch('/data/chart_info.json')
                        .then((resp) => resp.json())
                        .then((data) => {
                                setInfo(data)
                        })
        }, [])

        //mock 데이터로 순차적으로 10개씩 읽는다.

        const [xaxisLabel, setXaxisLabel] = useState([])
        const chartOptionsA = {
                chart: {
                        id: 'realtime',
                        type: 'line',
                        zoom: {
                                enabled: false,
                        },
                        animations: {
                                enabled: true,
                                easing: 'linear',
                                dynamicAnimation: {
                                        speed: 1000,
                                },
                        },
                        foreColor: '#ffffff',
                        toolbar: {
                                show: false,
                        },
                },
                dataLabels: {
                        enabled: false,
                },
                colors: ['#5adcea', '#ffab52', '#70ec56', '#fb80ff', '#ffdc14'],
                stroke: {
                        curve: 'straight',
                },
                markers: {
                        size: 0,
                },
                legend: {
                        show: true,
                        position: 'right',
                        horizontalAlign: 'left',
                        fontSize: '40rem',
                        offsetX: -20,
                        offsetY: 50,
                        itemMargin: {
                                horizontal: 5,
                                vertical: 30,
                        },
                },
                xaxis: {
                        show: true,
                        labels: {
                                show: true,
                                style: {
                                        fontSize: '1.3vh',
                                },
                                offsetX: 0,
                                offsetY: 10,
                        },
                        categories: xaxisLabel,
                },
                yaxis: {
                        show: true,
                        labels: {
                                show: true,
                                style: {
                                        fontSize: '1.3vh',
                                },
                                offsetX: -10,
                                offsetY: 10,
                        },
                },
                noData: {
                        text: 'Loading...',
                },
        }

        const [seriesA, setSeriesA] = useState()
        const viewItems = 60 // 읽어올 데이터 수
        const [fetchCount, setFetchCount] = useState(0) // 읽어온 횟수
        const fetchData = async () => {
                const response = await fetch('/data/detection.json')
                //console.log(response)
                response.json().then((resp) => {
                        //읽어온 데이터를 viewItems 수만큼 잘라온다
                        let data = resp.sort()
                        let startIndex =
                                fetchCount * viewItems >= data.length
                                        ? data.length
                                        : fetchCount * viewItems
                        let endIndex =
                                (fetchCount + 1) * viewItems >= data.length
                                        ? data.length
                                        : (fetchCount + 1) * viewItems

                        let current = data.slice(startIndex, endIndex) //index 시작, 끝

                        // X축 카테고리
                        let categories = current?.map((data) => data.datetime)
                        const set = new Set(categories.sort())

                        const uniqueCategories = [...set]

                        let xLabel = uniqueCategories?.map(
                                (data) => data.split('_')[1]
                        )
                        setXaxisLabel(xLabel)

                        //console.log(xLabel)
                        // data -> Series 생성
                        // X축별로 필터링 후, 회사별로 필터링 chartAffiliates
                        let seriesArray = new Array()

                        // 회사별
                        for (let i = 0; i < chartAffiliates.length; i++) {
                                let arrayData = current?.filter(
                                        (el) =>
                                                el.affiliate ==
                                                chartAffiliates[i]
                                )
                                let name = chartAffiliates[i]
                                // 날짜별
                                let data = new Array()
                                for (
                                        let j = 0;
                                        j < uniqueCategories.length;
                                        j++
                                ) {
                                        let arrayAffiliates = arrayData?.filter(
                                                (el) =>
                                                        el.datetime ==
                                                        uniqueCategories[j]
                                        )
                                        //console.log(arrayAffiliates)

                                        for (
                                                let k = 0;
                                                k < arrayAffiliates.length;
                                                k++
                                        ) {
                                                data.push(
                                                        arrayAffiliates[k].cases
                                                )
                                        }
                                }
                                let series = new Object()
                                series.name = name
                                series.data = data

                                seriesArray.push(series)
                        }

                        setSeriesA(seriesArray)

                        setFetchCount(fetchCount + 1)
                        setLoaded(true)
                })
        }

        // 2초마다 10개씩 읽어온다.
        useEffect(() => {
                console.log('fetch data')
                const timer = setInterval(() => {
                        fetchData()
                }, 5000)
                return () => {
                        clearInterval(timer)
                }
        })

        useEffect(() => {
                if (!loaded) fetchData()
        })

        const chartOptionsB = {
                chart: {
                        height: 350,
                        type: 'area',
                        foreColor: '#ffffff',
                        toolbar: {
                                show: false,
                        },
                },
                grid: {
                        show: true,
                        borderColor: '#90A4AE',
                        strokeDashArray: 0,
                        position: 'back',
                        xaxis: {
                                lines: {
                                        show: true,
                                },
                        },
                        yaxis: {
                                lines: {
                                        show: false,
                                },
                        },
                        row: {
                                colors: undefined,
                                opacity: 0.5,
                        },
                        column: {
                                colors: undefined,
                                opacity: 0.5,
                        },
                        padding: {
                                top: 0,
                                right: 0,
                                bottom: 0,
                                left: 0,
                        },
                },
                yaxis: {
                        show: true,
                        labels: {
                                show: true,
                                style: {
                                        fontSize: 30 * zoomRatio,
                                },
                                offsetX: -100,
                        },
                },
                dataLabels: {
                        enabled: false,
                },
                stroke: {
                        show: true,
                        curve: 'straight',
                        lineCap: 'butt',
                        colors: undefined,
                        width: 0,
                        dashArray: 0,
                },
                xaxis: {
                        //type: 'datetime',
                        categories: [
                                'MON',
                                'TUE',
                                'WED',
                                'THU',
                                'FRI',
                                'SAT',
                                'SUN',
                        ],
                        labels: {
                                show: true,
                                style: {
                                        fontSize: '30px',
                                },
                                trim: false,
                                offsetX: 0,
                                offsetY: 10,
                        },
                },

                legend: {
                        show: false,
                },
                colors: ['#ffffff', '#eee'],
                fill: {
                        fill: {
                                type: 'gradient',
                                gradient: {
                                        shadeIntensity: 1,
                                        opacityFrom: 0.7,
                                        opacityTo: 0.2,
                                        stops: [0, 20, 100],
                                },
                        },
                },
        }
        const seriesB = [
                {
                        name: 'series1',
                        data: info?.weeklyTrend,
                },
        ]

        const series1 = [info?.casesHigh]
        const series2 = [info?.casesMedium]
        const series3 = [info?.casesLow]

        const chartOptions1 = {
                chart: {
                        height: '100%',
                        type: 'radialBar',
                        toolbar: {
                                show: false,
                        },
                },
                plotOptions: {
                        radialBar: {
                                startAngle: -135,
                                endAngle: 225,
                                hollow: {
                                        margin: 0,
                                        size: '70%',
                                        background: '#000',
                                        image: undefined,
                                        imageOffsetX: 0,
                                        imageOffsetY: 0,
                                        position: 'front',
                                        dropShadow: {
                                                enabled: true,
                                                top: 3,
                                                left: 0,
                                                blur: 4,
                                                opacity: 0.24,
                                        },
                                },
                                track: {
                                        background: '#000',
                                        strokeWidth: '67%',
                                        margin: 0, // margin is in pixels
                                        dropShadow: {
                                                enabled: true,
                                                top: -3,
                                                left: 0,
                                                blur: 4,
                                                opacity: 0.35,
                                        },
                                },

                                dataLabels: {
                                        show: true,
                                        name: {
                                                offsetY: 0,
                                                show: false,
                                                color: '#888',
                                                fontSize: '0px',
                                        },
                                        value: {
                                                formatter: function (val) {
                                                        return parseInt(val)
                                                },
                                                color: '#FFF',
                                                fontSize: '3.6vh',
                                                show: true,
                                        },
                                },
                        },
                },
                fill: {
                        type: 'gradient',
                        gradient: {
                                shade: 'dark',
                                type: 'horizontal',
                                shadeIntensity: 0.5,
                                gradientToColors: ['#ABE5A1'],
                                inverseColors: true,
                                opacityFrom: 1,
                                opacityTo: 1,
                                stops: [0, 100],
                        },
                },
                stroke: {
                        lineCap: 'round',
                },
                labels: [''],
        }

        const chartOptions2 = {
                chart: {
                        height: '100%',
                        type: 'radialBar',
                        toolbar: {
                                show: false,
                        },
                },
                plotOptions: {
                        radialBar: {
                                startAngle: -135,
                                endAngle: 225,
                                hollow: {
                                        margin: 0,
                                        size: '70%',
                                        background: '#000',
                                        image: undefined,
                                        imageOffsetX: 0,
                                        imageOffsetY: 0,
                                        position: 'front',
                                        dropShadow: {
                                                enabled: true,
                                                top: 3,
                                                left: 0,
                                                blur: 4,
                                                opacity: 0.24,
                                        },
                                },
                                track: {
                                        background: '#000',
                                        strokeWidth: '67%',
                                        margin: 0, // margin is in pixels
                                        dropShadow: {
                                                enabled: true,
                                                top: -3,
                                                left: 0,
                                                blur: 4,
                                                opacity: 0.35,
                                        },
                                },

                                dataLabels: {
                                        show: true,
                                        name: {
                                                offsetY: 0,
                                                show: false,
                                                color: '#888',
                                                fontSize: '0px',
                                        },
                                        value: {
                                                formatter: function (val) {
                                                        return parseInt(val)
                                                },
                                                color: '#FFF',
                                                fontSize: '3.6vh',
                                                show: true,
                                        },
                                },
                        },
                },
                fill: {
                        type: 'gradient',
                        gradient: {
                                shade: 'dark',
                                type: 'horizontal',
                                shadeIntensity: 0.5,
                                gradientToColors: ['#ABE5A1'],
                                inverseColors: true,
                                opacityFrom: 1,
                                opacityTo: 1,
                                stops: [0, 100],
                        },
                },
                stroke: {
                        lineCap: 'round',
                },
                labels: [''],
        }

        const chartOptions3 = {
                chart: {
                        height: '100%',
                        type: 'radialBar',
                        toolbar: {
                                show: false,
                        },
                },
                plotOptions: {
                        radialBar: {
                                startAngle: -135,
                                endAngle: 225,
                                hollow: {
                                        margin: 0,
                                        size: '70%',
                                        background: '#000',
                                        image: undefined,
                                        imageOffsetX: 0,
                                        imageOffsetY: 0,
                                        position: 'front',
                                        dropShadow: {
                                                enabled: true,
                                                top: 3,
                                                left: 0,
                                                blur: 4,
                                                opacity: 0.24,
                                        },
                                },
                                track: {
                                        background: '#000',
                                        strokeWidth: '67%',
                                        margin: 0, // margin is in pixels
                                        dropShadow: {
                                                enabled: true,
                                                top: -3,
                                                left: 0,
                                                blur: 4,
                                                opacity: 0.35,
                                        },
                                },

                                dataLabels: {
                                        show: true,
                                        name: {
                                                offsetY: 0,
                                                show: false,
                                                color: '#888',
                                                fontSize: '0px',
                                        },
                                        value: {
                                                formatter: function (val) {
                                                        return parseInt(val)
                                                },
                                                color: '#FFF',
                                                fontSize: '3.6vh',
                                                show: true,
                                        },
                                },
                        },
                },
                fill: {
                        type: 'gradient',
                        gradient: {
                                shade: 'dark',
                                type: 'horizontal',
                                shadeIntensity: 0.5,
                                gradientToColors: ['#ABE5A1'],
                                inverseColors: true,
                                opacityFrom: 1,
                                opacityTo: 1,
                                stops: [0, 100],
                        },
                },
                stroke: {
                        lineCap: 'round',
                },
                labels: [''],
        }

        return (
                <div>
                        <div className="w-screen h-screen flex-col items-center justify-center z-10 text-white px-[2.618vw] pt-[4.63vh]">
                                <div className="text-[4.167vh] font-apple font-extrabold text-left mb-[4.167vh]">
                                        실시간 위험탐지 현황
                                </div>
                                <div className="w-full h-[7.87vh] flex justify-between items-center">
                                        <div className="flex items-center justify-between">
                                                <div className="flex items-center justify-center text-[3.315vh] font-apple font-extrabold mr-[1.309vw]">
                                                        총합
                                                </div>
                                                <div className="flex items-center justify-center text-[7.667vh] font-apple font-extrabold text-[#01c9ae]">
                                                        <CountUp
                                                                delay={0}
                                                                duration={3}
                                                                separator=","
                                                                end={
                                                                        info?.detectionCount +
                                                                        info?.blockCount
                                                                }
                                                        />
                                                </div>
                                        </div>
                                        <div className="flex justify-center">
                                                <div className="w-[2px] h-[2.315vh] bg-white"></div>
                                        </div>

                                        <div className="flex items-center justify-between">
                                                <div className="flex items-center justify-center text-[3.315vh] font-apple font-extrabold mr-[1.309vw] whitespace-nowrap">
                                                        탐지 건수
                                                </div>
                                                <div className="flex items-center justify-center text-[7.667vh] font-apple font-extrabold text-[#01c9ae] ">
                                                        <CountUp
                                                                delay={0}
                                                                duration={3}
                                                                separator=","
                                                                end={
                                                                        info?.detectionCount
                                                                }
                                                        />
                                                </div>
                                        </div>
                                        <div className="  flex justify-center">
                                                <div className="w-[2px] h-[2.315vh] bg-white"></div>
                                        </div>
                                        <div className="flex items-center justify-between ">
                                                <div className="flex items-center justify-center text-[3.315vh] font-apple font-extrabold mr-[1.309vw]  whitespace-nowrap">
                                                        차단 건수
                                                </div>
                                                <div className="flex items-center justify-center text-[7.667vh] font-apple font-extrabold text-[#01c9ae] ">
                                                        <CountUp
                                                                delay={0}
                                                                duration={3}
                                                                separator=","
                                                                end={
                                                                        info?.blockCount
                                                                }
                                                        />
                                                </div>
                                        </div>
                                        <div className="flex justify-center">
                                                <div className="w-[2px] h-[2.315vh] bg-white"></div>
                                        </div>
                                        <div className="flex-col items-center justify-start -translate-y-[1.815vh]">
                                                <div className="flex items-center justify-center text-[2.815vh] font-apple font-extrabold   text-[#01c9ae]  whitespace-nowrap">
                                                        금융전산 위기경보
                                                </div>
                                                <div className="flex items-center justify-center text-[5.667vh] font-apple font-extrabold text-[#01c9ae] ">
                                                        {info && info.alert}
                                                </div>
                                        </div>
                                </div>
                                <div className="w-full h-[34.731vh] mt-[3vh]  mb-[6.25vh] text-left text-[1.8vh]">
                                        {seriesA && chartOptionsA && (
                                                <Chart
                                                        options={chartOptionsA}
                                                        series={seriesA}
                                                        type="line"
                                                        width="100%"
                                                        height="100%"
                                                />
                                        )}
                                </div>
                                <div className="w-full h-[18.889vh]  mb-[7.037vh] flex justify-between items-start">
                                        <div className="flex-col items-center w-[29.843vw] h-full">
                                                <div className="w-full h-[5.861vh] flex items-start justify-center text-[2.852vh] font-apple font-bold ">
                                                        케이스 처리현황
                                                </div>
                                                <div className="flex items-end justify-between gap-2 h-[13.889vh]">
                                                        <div className="border-[0.2vw] border-white/30 rounded-t-3xl w-[6.361vw] h-[13.889vh] flex-col items-center justify-center">
                                                                <div className="font-apple font-bold  text-[2.5vh] flex items-end w-full h-[50%] justify-center">
                                                                        통합
                                                                </div>
                                                                <div className="font-applyHeavy text-[3.2vh] flex items-start w-full h-[50%]  justify-center">
                                                                        <CountUp
                                                                                delay={
                                                                                        0
                                                                                }
                                                                                duration={
                                                                                        2
                                                                                }
                                                                                separator=","
                                                                                end={
                                                                                        info?.stateTodayComplete +
                                                                                        info?.stateTodayImcomplete
                                                                                }
                                                                        />
                                                                </div>
                                                        </div>
                                                        <div className="border-[0.2vw] border-white/30 rounded-t-3xl w-[6.361vw] h-[13.889vh] flex-col items-center justify-center text-[#0ab1b2]">
                                                                <div className="font-apple font-bold  text-[2.5vh] flex items-end w-full h-[50%] justify-center">
                                                                        완료
                                                                </div>
                                                                <div className="text-[3.2vh] font-applyHeavy flex items-start w-full h-[50%]  justify-center">
                                                                        <CountUp
                                                                                delay={
                                                                                        0
                                                                                }
                                                                                duration={
                                                                                        2
                                                                                }
                                                                                separator=","
                                                                                end={
                                                                                        info?.stateTodayComplete
                                                                                }
                                                                        />
                                                                </div>
                                                        </div>
                                                        <div className="border-[0.2vw] border-white/30 rounded-t-3xl w-[6.361vw] h-[13.889vh] flex-col items-center justify-center text-[#71cbd2]">
                                                                <div className="font-apple font-bold  text-[2.5vh] flex items-end w-full h-[50%] justify-center">
                                                                        진행중
                                                                </div>
                                                                <div className="font-applyHeavy text-[3.2vh] flex items-start w-full h-[50%]  justify-center">
                                                                        <CountUp
                                                                                delay={
                                                                                        0
                                                                                }
                                                                                duration={
                                                                                        2
                                                                                }
                                                                                separator=","
                                                                                end={
                                                                                        info?.stateTodayImcomplete
                                                                                }
                                                                        />
                                                                </div>
                                                        </div>
                                                        <div className="border-[0.2vw] border-white/30 rounded-t-3xl w-[6.361vw] h-[13.889vh] flex-col items-center justify-center text-[#d1fbff]">
                                                                <div className="font-apple font-bold  text-[2.5vh] flex items-end w-full h-[50%] justify-center">
                                                                        전일대비
                                                                </div>
                                                                <div className="font-applyHeavy text-[3.2vh] flex items-start w-full h-[50%]  justify-center">
                                                                        <CountUp
                                                                                delay={
                                                                                        0
                                                                                }
                                                                                duration={
                                                                                        2
                                                                                }
                                                                                separator=","
                                                                                end={
                                                                                        info?.stateTodayComplete +
                                                                                        info?.stateTodayImcomplete -
                                                                                        info?.stateYesterdayComplete -
                                                                                        info?.stateYesterdayImcomplete
                                                                                }
                                                                        />
                                                                </div>
                                                        </div>
                                                </div>
                                        </div>
                                        <div className="flex-col items-center w-[38.665vw] h-full">
                                                <div className="w-full h-[5.861vh] flex items-start justify-center text-[2.852vh] font-apple font-bold ">
                                                        일일 위험도별 케이스
                                                </div>
                                                <div className="flex items-center gap-[2.309vw] justify-center h-[13.889vh] w-full ">
                                                        <div className="w-[6.545vw] h-[11.574vh] mt-[2.574vh] flex items-center justify-center ">
                                                                <Chart
                                                                        options={
                                                                                chartOptions1
                                                                        }
                                                                        series={
                                                                                series1
                                                                        }
                                                                        type="radialBar"
                                                                        width="150%"
                                                                        height="150%"
                                                                />
                                                        </div>
                                                        <div className="w-[6.545vw] h-[11.574vh] mt-[2.574vh] flex items-center justify-center">
                                                                <Chart
                                                                        options={
                                                                                chartOptions2
                                                                        }
                                                                        series={
                                                                                series2
                                                                        }
                                                                        type="radialBar"
                                                                        width="150%"
                                                                        height="150%"
                                                                />
                                                        </div>
                                                        <div className="w-[6.545vw] h-[11.574vh] mt-[2.574vh] flex items-center justify-center ">
                                                                <Chart
                                                                        options={
                                                                                chartOptions3
                                                                        }
                                                                        series={
                                                                                series3
                                                                        }
                                                                        type="radialBar"
                                                                        width="150%"
                                                                        height="150%"
                                                                />
                                                        </div>
                                                </div>
                                        </div>
                                        <div className="flex-col items-center w-[26.702vw] h-full">
                                                <div className="w-full h-[5.861vh] flex items-start justify-center text-[2.852vh] font-apple font-bold ">
                                                        일별 케이스 추이
                                                </div>
                                                <div className="w-full h-[calc(100%-5.861vh)]">
                                                        <Chart
                                                                options={
                                                                        chartOptionsB
                                                                }
                                                                series={seriesB}
                                                                type="area"
                                                                width="100%"
                                                                height="100%"
                                                        />
                                                </div>
                                        </div>
                                </div>
                                <div className="absolute left-0 bottom-0 w-full h-[9.259vh] bg-[#040308] px-[2.618vw] flex justify-between gap-10 ">
                                        <div className="w-[12.827vw] h-full font-apple font-extrabold text-[3.6vh] flex items-center whitespace-nowrap bg-[#040308] ">
                                                보안공지 Top 5
                                        </div>
                                        <div className="relative overflow-hidden flex items-center justify-center">
                                                <div className=" notice-container flex justify-start items-center gap-10 z-1">
                                                        {notice &&
                                                                notice.length >
                                                                        0 &&
                                                                notice.map(
                                                                        (
                                                                                item,
                                                                                index
                                                                        ) => {
                                                                                return (
                                                                                        <div
                                                                                                className="h-full font-apple text-[3.0vh] flex items-center whitespace-nowrap"
                                                                                                key={
                                                                                                        index
                                                                                                }>
                                                                                                {index +
                                                                                                        '. ' +
                                                                                                        item.notice}
                                                                                        </div>
                                                                                )
                                                                        }
                                                                )}
                                                </div>
                                        </div>
                                </div>
                        </div>
                </div>
        )
}

export default page
