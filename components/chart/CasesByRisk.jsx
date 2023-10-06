import dynamic from 'next/dynamic'
const Chart = dynamic(() => import('react-apexcharts'), { ssr: false })
import { chartOptions1, chartOptions2, chartOptions3 } from '@/contexts/chart'

const CasesByRisk = ({ info }) => {
        const series1 = [info?.casesHigh]
        const series2 = [info?.casesMedium]
        const series3 = [info?.casesLow]
        return (
                <div className="flex items-center gap-[2.309vw] justify-center h-[13.889vh] w-full ">
                        <div className="w-[6.545vw] h-[11.574vh] mt-[2.574vh] flex items-center justify-center ">
                                <Chart
                                        options={chartOptions1}
                                        series={series1}
                                        type="radialBar"
                                        width="150%"
                                        height="150%"
                                />
                        </div>
                        <div className="w-[6.545vw] h-[11.574vh] mt-[2.574vh] flex items-center justify-center">
                                <Chart
                                        options={chartOptions2}
                                        series={series2}
                                        type="radialBar"
                                        width="150%"
                                        height="150%"
                                />
                        </div>
                        <div className="w-[6.545vw] h-[11.574vh] mt-[2.574vh] flex items-center justify-center ">
                                <Chart
                                        options={chartOptions3}
                                        series={series3}
                                        type="radialBar"
                                        width="150%"
                                        height="150%"
                                />
                        </div>
                </div>
        )
}

export default CasesByRisk
