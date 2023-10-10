'use client'
import React, { Component, useEffect, useState } from 'react'
import CanvasJSReact from '@canvasjs/react-charts'
import { chartAffiliates } from '@/contexts/main'

class CanvasChart extends Component {
        render() {
                const [loaded, setLoaded] = useState(false)

                useEffect(() => {
                        setLoaded(true)
                })
                const options = {
                        animationEnabled: true,
                        title: {
                                text: 'Customer Satisfaction',
                        },
                        subtitles: [
                                {
                                        text: '71% Positive',
                                        verticalAlign: 'center',
                                        fontSize: 24,
                                        dockInsidePlotArea: true,
                                },
                        ],
                        data: [
                                {
                                        type: 'doughnut',
                                        showInLegend: true,
                                        indexLabel: '{name}: {y}',
                                        yValueFormatString: "#,###'%'",
                                        dataPoints: [
                                                {
                                                        name: 'Unsatisfied',
                                                        y: 5,
                                                },
                                                {
                                                        name: 'Very Unsatisfied',
                                                        y: 31,
                                                },
                                                {
                                                        name: 'Very Satisfied',
                                                        y: 40,
                                                },
                                                {
                                                        name: 'Satisfied',
                                                        y: 17,
                                                },
                                                {
                                                        name: 'Neutral',
                                                        y: 7,
                                                },
                                        ],
                                },
                        ],
                }
                var CanvasJSChart = CanvasJSReact.CanvasJSChart

                return (
                        <div className="w-full h-[34.731vh] mt-[3vh]  mb-[6.25vh] text-left text-[1.8vh]">
                                {loaded && (
                                        <CanvasJSChart
                                                options={options}
                                                /* onRef={ref => this.chart = ref} */
                                        />
                                )}
                                {/*You can get reference to the chart instance as shown above using onRef. This allows you to access all chart properties and methods*/}
                        </div>
                )
        }
}
export default CanvasChart
