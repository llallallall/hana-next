'use client'
import dynamic from 'next/dynamic'
const Chart = dynamic(() => import('react-apexcharts'), { ssr: false })

const page = () => {
        const seriesA = [
                {
                        name: 'series1',
                        data: [
                                31, 110, 60, 105, 70, 129, 100, 31, 110, 60,
                                105, 70, 129, 100, 100, 31, 110, 60, 105, 70,
                                31, 110, 60, 105, 70, 129, 129, 100, 31, 10, 60,
                                105, 70, 12, 100, 31, 11, 60, 105, 70, 29, 10,
                        ],
                },
        ]
        const seriesB = [
                {
                        name: 'series1',
                        data: [
                                31, 110, 60, 105, 70, 129, 100, 31, 110, 60,
                                105, 70, 129, 100, 31, 110, 60, 105, 70, 129,
                                100, 31, 110, 60, 105, 70, 129, 100, 31, 110,
                                60, 105, 70, 100, 31, 110, 60, 105, 70, 129,
                                129, 100,
                        ],
                },
        ]
        const chartOptionsA = {
                chart: {
                        height: 350,
                        type: 'bar',
                        fontFamily: 'apple',
                        fontWeight: 'bold',
                        foreColor: '#ffffff',
                        toolbar: {
                                show: false,
                        },
                },
                bar: {
                        horizontal: true,
                },

                yaxis: {
                        show: true,
                        labels: {
                                show: true,
                                style: {
                                        fontSize: '30px',
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
                        //categories: ["MON", "TUE", "WED", "THU", "FRI", "SAT", "SUN"],
                        labels: {
                                show: false,
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
                colors: ['#42b99f', '#fff'],
                fill: {
                        type: 'gradient',
                        gradient: {
                                shadeIntensity: 0.1,
                                opacityFrom: 0.9,
                                opacityTo: 0.7,
                                stops: [0, 50, 100],
                        },
                },
        }
        const chartOptionsB = {
                chart: {
                        height: 350,
                        type: 'bar',
                        fontFamily: 'apple',
                        fontWeight: 'bold',
                        foreColor: '#ffffff',
                        toolbar: {
                                show: false,
                        },
                },
                bar: {
                        horizontal: true,
                },

                yaxis: {
                        show: true,
                        labels: {
                                show: true,
                                style: {
                                        fontSize: '30px',
                                },
                                offsetX: -100,
                        },
                        reversed: true,
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
                        //categories: ["MON", "TUE", "WED", "THU", "FRI", "SAT", "SUN"],
                        labels: {
                                show: false,
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

        const series1 = [1264]
        const series2 = [14]

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
                                startAngle: -180,
                                endAngle: 180,
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
                                                offsetY: 30,
                                                show: true,
                                                color: '#FFF',
                                                fontSize: '1.6vh',
                                        },
                                        value: {
                                                formatter: function (val) {
                                                        return parseInt(val)
                                                },
                                                color: '#FFF',
                                                fontSize: '2.0vh',
                                                fontWeight: 'bold',
                                                show: true,
                                                offsetY: -20,
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
                        dashArray: 4,
                },
                labels: ['Mbps'],
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
                                startAngle: -180,
                                endAngle: 180,
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
                                                offsetY: 30,
                                                show: true,
                                                color: '#FFF',
                                                fontSize: '1.6vh',
                                        },
                                        value: {
                                                formatter: function (val) {
                                                        return parseInt(val)
                                                },
                                                color: '#FFF',
                                                fontSize: '2.0vh',
                                                fontWeight: 'bold',
                                                show: true,
                                                offsetY: -20,
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
                        dashArray: 4,
                },
                labels: ['Mbps'],
        }

        return (
                <div className="w-screen h-screen flex-col items-center justify-center z-10 text-white px-[2.618vw] py-[4.63vh]">
                        <div className="w-full h-[4.63vh] font-apple font-extrabold text-[4.8vh] mb-[5vh]">
                                <div className="-translate-y-[1.4vh]">
                                        DDos 모니터링
                                </div>
                        </div>

                        <div className="flex justify-center items-center h-[40.07vh]">
                                <div className="w-[50%] h-full flex-col justify-end items-end  ">
                                        <div className="w-full h-[5.556vh] text-[3.3vh] font-apple font-extrabold text-left flex items-end">
                                                하나은행 트래픽 모니터링
                                        </div>
                                        <div className="w-full h-[31.019vh] flex-col ">
                                                <div className="flex w-full h-[50%]">
                                                        <div className="w-[7.644vw] h-full">
                                                                <div className="h-[2vh] text-center text-[1.5vh] font-apple font-bold flex justify-center items-start">
                                                                        TOTAL
                                                                        TRAFFIC
                                                                </div>
                                                                <div className="h-[calc(100%-2vh)] flex items-center justify-center">
                                                                        <div className="w-[4.712vw] h-[8.333vh] mt-[2.574vh] flex items-center justify-center ">
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
                                                                </div>
                                                        </div>
                                                        <div className="w-[calc(100%-7.644vw)] h-full ">
                                                                <Chart
                                                                        options={
                                                                                chartOptionsA
                                                                        }
                                                                        series={
                                                                                seriesA
                                                                        }
                                                                        type="bar"
                                                                        width="100%"
                                                                        height="100%"
                                                                />
                                                        </div>
                                                </div>
                                                <div className="flex w-full h-[50%]">
                                                        <div className="w-[7.644vw] h-full flex-col ">
                                                                <div className="h-[calc(100%-2vh)] flex items-center justify-center">
                                                                        <div className="w-[4.712vw] h-[8.333vh] mt-[2.574vh] flex items-center justify-center">
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
                                                                </div>
                                                                <div className="h-[2vh] text-center text-[1.5vh] font-apple font-bold flex justify-center items-end">
                                                                        ATTACK
                                                                        TRAFFIC
                                                                </div>
                                                        </div>
                                                        <div className="w-[calc(100%-7.644vw)] h-full ">
                                                                <Chart
                                                                        options={
                                                                                chartOptionsB
                                                                        }
                                                                        series={
                                                                                seriesB
                                                                        }
                                                                        type="bar"
                                                                        width="100%"
                                                                        height="100%"
                                                                />
                                                        </div>
                                                </div>
                                        </div>
                                </div>
                                <div className="w-[50%] h-full">
                                        <div className="w-full h-[5.556vh] text-[3.3vh] font-apple font-extrabold text-left flex items-end">
                                                하나증권 트래픽 모니터링
                                        </div>
                                        <div className="w-full h-[31.019vh] flex-col ">
                                                <div className="flex w-full h-[50%]">
                                                        <div className="w-[7.644vw] h-full">
                                                                <div className="h-[2vh] text-center text-[1.5vh] font-apple font-bold flex justify-center items-start">
                                                                        TOTAL
                                                                        TRAFFIC
                                                                </div>
                                                                <div className="h-[calc(100%-2vh)] flex items-center justify-center">
                                                                        <div className="w-[4.712vw] h-[8.333vh] mt-[2.574vh] flex items-center justify-center ">
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
                                                                </div>
                                                        </div>
                                                        <div className="w-[calc(100%-7.644vw)] h-full ">
                                                                <Chart
                                                                        options={
                                                                                chartOptionsA
                                                                        }
                                                                        series={
                                                                                seriesA
                                                                        }
                                                                        type="bar"
                                                                        width="100%"
                                                                        height="100%"
                                                                />
                                                        </div>
                                                </div>
                                                <div className="flex w-full h-[50%]">
                                                        <div className="w-[7.644vw] h-full flex-col ">
                                                                <div className="h-[calc(100%-2vh)] flex items-center justify-center">
                                                                        <div className="w-[4.712vw] h-[8.333vh] mt-[2.574vh] flex items-center justify-center">
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
                                                                </div>
                                                                <div className="h-[2vh] text-center text-[1.5vh] font-apple font-bold flex justify-center items-end">
                                                                        ATTACK
                                                                        TRAFFIC
                                                                </div>
                                                        </div>
                                                        <div className="w-[calc(100%-7.644vw)] h-full ">
                                                                <Chart
                                                                        options={
                                                                                chartOptionsB
                                                                        }
                                                                        series={
                                                                                seriesB
                                                                        }
                                                                        type="bar"
                                                                        width="100%"
                                                                        height="100%"
                                                                />
                                                        </div>
                                                </div>
                                        </div>
                                </div>
                        </div>

                        <div className="flex justify-center items-center h-[40.07vh]">
                                <div className="w-[50%] h-full">
                                        <div className="w-full h-[5.556vh] text-[3.3vh] font-apple font-extrabold text-left flex items-end">
                                                하나금융티아이 트래픽 모니터링
                                        </div>
                                        <div className="w-full h-[31.019vh] flex-col ">
                                                <div className="flex w-full h-[50%]">
                                                        <div className="w-[7.644vw] h-full">
                                                                <div className="h-[2vh] text-center text-[1.5vh] font-apple font-bold flex justify-center items-start">
                                                                        TOTAL
                                                                        TRAFFIC
                                                                </div>
                                                                <div className="h-[calc(100%-2vh)] flex items-center justify-center">
                                                                        <div className="w-[4.712vw] h-[8.333vh] mt-[2.574vh] flex items-center justify-center ">
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
                                                                </div>
                                                        </div>
                                                        <div className="w-[calc(100%-7.644vw)] h-full ">
                                                                <Chart
                                                                        options={
                                                                                chartOptionsA
                                                                        }
                                                                        series={
                                                                                seriesA
                                                                        }
                                                                        type="bar"
                                                                        width="100%"
                                                                        height="100%"
                                                                />
                                                        </div>
                                                </div>
                                                <div className="flex w-full h-[50%]">
                                                        <div className="w-[7.644vw] h-full flex-col ">
                                                                <div className="h-[calc(100%-2vh)] flex items-center justify-center">
                                                                        <div className="w-[4.712vw] h-[8.333vh] mt-[2.574vh] flex items-center justify-center">
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
                                                                </div>
                                                                <div className="h-[2vh] text-center text-[1.5vh] font-apple font-bold flex justify-center items-end">
                                                                        ATTACK
                                                                        TRAFFIC
                                                                </div>
                                                        </div>
                                                        <div className="w-[calc(100%-7.644vw)] h-full ">
                                                                <Chart
                                                                        options={
                                                                                chartOptionsB
                                                                        }
                                                                        series={
                                                                                seriesB
                                                                        }
                                                                        type="bar"
                                                                        width="100%"
                                                                        height="100%"
                                                                />
                                                        </div>
                                                </div>
                                        </div>
                                </div>
                                <div className="w-[50%] h-full ">
                                        <div className="w-full h-[5.556vh] text-[3.3vh] font-apple font-extrabold text-left flex items-end">
                                                하나카드 트래픽 모니터링
                                        </div>
                                        <div className="w-full h-[31.019vh] flex-col ">
                                                <div className="flex w-full h-[50%]">
                                                        <div className="w-[7.644vw] h-full">
                                                                <div className="h-[2vh] text-center text-[1.5vh] font-apple font-bold flex justify-center items-start">
                                                                        TOTAL
                                                                        TRAFFIC
                                                                </div>
                                                                <div className="h-[calc(100%-2vh)] flex items-center justify-center">
                                                                        <div className="w-[4.712vw] h-[8.333vh] mt-[2.574vh] flex items-center justify-center ">
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
                                                                </div>
                                                        </div>
                                                        <div className="w-[calc(100%-7.644vw)] h-full ">
                                                                <Chart
                                                                        options={
                                                                                chartOptionsA
                                                                        }
                                                                        series={
                                                                                seriesA
                                                                        }
                                                                        type="bar"
                                                                        width="100%"
                                                                        height="100%"
                                                                />
                                                        </div>
                                                </div>
                                                <div className="flex w-full h-[50%]">
                                                        <div className="w-[7.644vw] h-full flex-col ">
                                                                <div className="h-[calc(100%-2vh)] flex items-center justify-center">
                                                                        <div className="w-[4.712vw] h-[8.333vh] mt-[2.574vh] flex items-center justify-center">
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
                                                                </div>
                                                                <div className="h-[2vh] text-center text-[1.5vh] font-apple font-bold flex justify-center items-end">
                                                                        ATTACK
                                                                        TRAFFIC
                                                                </div>
                                                        </div>
                                                        <div className="w-[calc(100%-7.644vw)] h-full ">
                                                                <Chart
                                                                        options={
                                                                                chartOptionsB
                                                                        }
                                                                        series={
                                                                                seriesB
                                                                        }
                                                                        type="bar"
                                                                        width="100%"
                                                                        height="100%"
                                                                />
                                                        </div>
                                                </div>
                                        </div>
                                </div>
                        </div>
                        <div className="w-full h-[5.63vh]"></div>
                </div>
        )
}

export default page
