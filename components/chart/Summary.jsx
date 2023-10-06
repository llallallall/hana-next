import CountUp from 'react-countup'

const Summary = ({ info }) => {
        return (
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
                                                end={info?.detectionCount}
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
                                                end={info?.blockCount}
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
        )
}

export default Summary
