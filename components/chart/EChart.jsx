import { useMemo, useEffect, useState } from 'react'

import ReactECharts from 'echarts-for-react'
import { chartAffiliates } from '@/contexts/main'

const EChart = ({ zoomRatio }) => {
        const [initData, setInitData] = useState(null)
        const [initDataLoaded, setInitDataLoaded] = useState(false)
        async function fetchInitData() {
                const response = await fetch(
                        'http://localhost:3000/data/detection.json'
                )
                //console.log(response)
                response.json().then((json) => {
                        //읽어온 데이터를 viewItems 수만큼 잘라온다
                        let dataSet = json.sort()
                        //console.log(dataSet)
                        setInitData(dataSet)
                })
        }

        // useMemo(() => {
        //         if (!initDataLoaded) {
        //                 fetchInitData()
        //                 setInitDataLoaded(true)
        //         }
        // }, [initDataLoaded])

        if (initDataLoaded) {
                console.log(initData)
        }
        const option = {
                xAxis: {
                        type: 'category',
                        data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
                },
                yAxis: {
                        type: 'value',
                },
                series: [
                        {
                                data: [150, 230, 224, 218, 135, 147, 260],
                                type: 'line',
                        },
                ],
        }
        return (
                <div>
                        <ReactECharts option={option} />
                </div>
        )
}

export default EChart
