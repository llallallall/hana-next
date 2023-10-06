import dynamic from 'next/dynamic'
const Chart = dynamic(() => import('react-apexcharts'), { ssr: false })

const DailyTrend = ({ info, zoomRatio }) => {
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
                                        fontSize: 30 * zoomRatio,
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
        return (
                <div className="w-full h-[calc(100%-5.861vh)]">
                        <Chart
                                options={chartOptionsB}
                                series={seriesB}
                                type="area"
                                width="100%"
                                height="100%"
                        />
                </div>
        )
}

export default DailyTrend
