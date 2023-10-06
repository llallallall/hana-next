import dynamic from 'next/dynamic'
const Chart = dynamic(() => import('react-apexcharts'), { ssr: false })

const RealtimeChart = ({ seriesA, xaxisLabel, zoomRatio }) => {
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
                        fontSize: 40 * zoomRatio,
                        offsetX: -20 * zoomRatio,
                        offsetY: 50 * zoomRatio,
                        itemMargin: {
                                horizontal: 5 * zoomRatio,
                                vertical: 30 * zoomRatio,
                        },
                },
                xaxis: {
                        show: true,
                        labels: {
                                show: true,
                                style: {
                                        fontSize: 30 * zoomRatio,
                                },
                                offsetX: 0,
                                offsetY: 10 * zoomRatio * zoomRatio,
                        },
                        categories: xaxisLabel,
                },
                yaxis: {
                        show: true,
                        labels: {
                                show: true,
                                style: {
                                        fontSize: 30 * zoomRatio,
                                },
                                offsetX: -10 * zoomRatio,
                                offsetY: 10 * zoomRatio,
                        },
                },
                noData: {
                        text: 'Loading...',
                },
        }
        return (
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
        )
}

export default RealtimeChart
