'use client'
import React, { useRef, useMemo, useEffect, useState } from 'react'
import CanvasJSReact from '@canvasjs/react-charts'
import { chartAffiliates } from '@/contexts/main'

var CanvasJS = CanvasJSReact.CanvasJS
var CanvasJSChart = CanvasJSReact.CanvasJSChart

const DynamicChart = ({ zoomRatio }) => {
        //initial values
        const [series, setSeries] = useState()
        const updateInterval = 1000 // 1000 = 1초
        const maxLabelCount = 20
        const chartRef = useRef(null)
        const [indexCount, setIndexCount] = useState(0)
        const [initDataLoaded, setInitDataLoaded] = useState(false)
        const [dataPointsGroup, setDataPointsGroup] = useState()
        const initViewItemsNumber = 5
        const [usedItemsCount, setUsedItemsCount] = useState(0)

        // 데이터 가공 및 저장
        let dataSet = new Array()
        // 배열(회사)의 갯수
        let dataPointsSet = new Array() //dataPoints 를 회사 수 만큼 생성
        for (let i = 0; i < chartAffiliates?.length; i++) {
                let array = new Array()
                dataPointsSet.push(array)
        }
        const processData = (dataSet) => {
                //X축 카테고리
                let categories = dataSet?.map((el) => el.datetime)
                const set = new Set(categories.sort())

                const uniqueCategories = [...set]

                // data -> Series 생성
                // X축별로 필터링 후, 회사별로 필터링 chartAffiliates
                let seriesArray = new Array()

                // 회사별
                for (let i = 0; i < chartAffiliates.length; i++) {
                        let arrayData = dataSet?.filter(
                                (el) => el.affiliate == chartAffiliates[i]
                        )
                        //console.log(arrayData)
                        let name = chartAffiliates[i]
                        // 날짜별
                        let data = new Array()
                        for (let j = 0; j < uniqueCategories.length; j++) {
                                let arrayAffiliates = arrayData?.filter(
                                        (el) =>
                                                el.datetime ==
                                                uniqueCategories[j]
                                )

                                for (
                                        let k = 0;
                                        k < arrayAffiliates.length;
                                        k++
                                ) {
                                        let item = new Object()
                                        item.x = Date.parse(
                                                arrayAffiliates[k].datetime
                                        )
                                        item.y = arrayAffiliates[k].cases
                                        data.push(item)
                                }
                        }

                        let defaultOption = {
                                type: 'line',
                                lineThickness: 3,
                                xValueType: 'dateTime',
                                indexLabelPlacement: 'outside',
                                showInLegend: true,
                        }

                        defaultOption.name = name
                        defaultOption.dataPoints = data

                        seriesArray.push(defaultOption)
                }

                return seriesArray
        }

        //mock 데이터로 순차적으로  읽는다.

        const [fetchCount, setFetchCount] = useState(0) // 읽어온 횟수
        const fetchInitData = async () => {
                const response = await fetch('/data/detection.json')
                //console.log(response)
                response.json().then((resp) => {
                        //읽어온 데이터를 viewItems 수만큼 잘라온다
                        let dataSet = resp.sort()

                        let seriesArray = processData(dataSet)

                        seriesArray.forEach((obj) => {
                                let limit =
                                        obj.dataPoints.length <
                                        initViewItemsNumber
                                                ? obj.dataPoints.length
                                                : initViewItemsNumber
                                let initView = obj.dataPoints.slice(0, limit)
                                obj.dataPoints = initView
                        })
                        setSeries(seriesArray)
                        setAccumulatedPendingData(processData(dataSet))
                        setFetchCount(fetchCount + 1)
                        setInitDataLoaded(true)

                        setUsedItemsCount(seriesArray[0].dataPoints.length)

                        chartRef.current?.render()
                })
        }

        // 최초 실행
        let initFetch = false
        useMemo(() => {
                if (initFetch === false) {
                        console.log('최초 1회 실행')
                        fetchInitData()
                        initFetch = true
                }
        }, [initFetch])

        // 2회차 이후 Fetch ==> 데이터를 누적하여 보관
        const [accumulatedPendingData, setAccumulatedPendingData] = useState() // 데이터 누적 보관
        const viewItemsNumber = 1 // 업데이트시 추가할 데이터 수
        const fetchAccumulateData = async () => {
                const response = await fetch('/data/detection.json')
                response.json().then((resp) => {
                        let dataSet = resp.sort()
                        let previousSeriesArray = accumulatedPendingData
                        let newSeriesArray = processData(dataSet)
                        previousSeriesArray.forEach((series) => {
                                let newDataPoints = newSeriesArray.filter(
                                        (el) => el.name == series.name
                                )[0].dataPoints
                                series.dataPoints.push(...newDataPoints)
                        })

                        setAccumulatedPendingData(previousSeriesArray)
                        setFetchCount(fetchCount + 1)
                })
        }

        // 60초마다 데이터를 다시 읽어온다.
        useEffect(() => {
                if (initDataLoaded) {
                        console.log(
                                '#### fetch data for update count ' + fetchCount
                        )
                        const timer = setInterval(() => {
                                fetchAccumulateData()
                        }, 10000)
                        return () => {
                                clearInterval(timer)
                        }
                }
        }, [fetchCount])

        useEffect(() => {
                if (initDataLoaded) {
                        const dynamicInterval = setInterval(() => {
                                updateChart()
                        }, updateInterval)
                        return () => {
                                clearInterval(dynamicInterval)
                        }
                }
        })

        // 1초마다 차트에 데이터를 추가 한다.
        const updateChart = () => {
                console.log('update chart data')
                //console.log(accumulatedPendingData)
                let array = new Array()
                series.forEach((obj) => {
                        let source = accumulatedPendingData.filter(
                                (el) => el.name === obj.name
                        )[0]

                        obj.dataPoints.push(
                                ...source.dataPoints.slice(
                                        usedItemsCount - 1,
                                        usedItemsCount + viewItemsNumber - 1
                                )
                        )
                        if (obj.dataPoints.length > maxLabelCount) {
                                obj.dataPoints.shift()
                        }
                        array.push(obj)
                })
                setSeries(array)
                //console.log(array)
                setUsedItemsCount(usedItemsCount + viewItemsNumber)

                //차트 업데이트
                chartRef.current?.render()

                //누적데이터 삭제

                // accumulatedPendingData.forEach((obj) => {
                //         if (obj.dataPoints.length > 200) {
                //                 obj.dataPoints.shift()
                //                 setUsedItemsCount(usedItemsCount - 1)
                //         }
                // })
        }

        const options = {
                animationEnabled: true,
                zoomEnabled: false,
                theme: 'dark2',
                backgroundColor: 'transparent',
                title: {
                        //text: '',
                },
                axisX: {
                        //title: 'chart updates every 2 secs',
                        lineColor: 'rgba(204,204,204,.3)',
                        labelAngle: -60,
                        labelFontSize: 20 * zoomRatio,
                        interval: 15,
                        intervalType: 'minute',
                        //valueFormatString: 'hh:mm TT',
                        labelFormatter: function (e) {
                                return CanvasJS.formatDate(e.value, 'HH:mm')
                        },
                },
                axisY: {
                        includeZero: false,
                        labelFontSize: 20 * zoomRatio,
                        //valueFormatString: '#.0K,.',
                        lineThickness: 1,
                        lineColor: 'rgba(204,204,204,.3)',
                        gridColor: 'rgba(204,204,204,.3)',
                        //interval: 100,
                        //suffix: ' km/h',
                },
                toolTip: {
                        shared: true,
                },
                legend: {
                        cursor: 'pointer',
                        fontSize: 40 * zoomRatio,
                        horizontalAlign: 'right',
                        verticalAlign: 'center',
                        fontColor: 'white',
                        itemMaxWidth: 200,
                },
                data: series,
        }

        return (
                <div className="w-full h-[34.731vh] mt-[3vh]  mb-[6.25vh] text-left text-[1.8vh]">
                        <CanvasJSChart
                                options={options}
                                onRef={(ref) => (chartRef.current = ref)}
                        />
                </div>
        )
}

export default DynamicChart
