import CountUp from 'react-countup'

const ProcessingStatus = ({ info }) => {
        return (
                <div className="flex items-end justify-between gap-2 h-[13.889vh]">
                        <div className="border-[0.2vw] border-white/30 rounded-t-3xl w-[6.361vw] h-[13.889vh] flex-col items-center justify-center">
                                <div className="font-apple font-bold  text-[2.5vh] flex items-end w-full h-[50%] justify-center">
                                        통합
                                </div>
                                <div className="font-applyHeavy text-[3.2vh] flex items-start w-full h-[50%]  justify-center">
                                        <CountUp
                                                delay={0}
                                                duration={2}
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
                                                delay={0}
                                                duration={2}
                                                separator=","
                                                end={info?.stateTodayComplete}
                                        />
                                </div>
                        </div>
                        <div className="border-[0.2vw] border-white/30 rounded-t-3xl w-[6.361vw] h-[13.889vh] flex-col items-center justify-center text-[#71cbd2]">
                                <div className="font-apple font-bold  text-[2.5vh] flex items-end w-full h-[50%] justify-center">
                                        진행중
                                </div>
                                <div className="font-applyHeavy text-[3.2vh] flex items-start w-full h-[50%]  justify-center">
                                        <CountUp
                                                delay={0}
                                                duration={2}
                                                separator=","
                                                end={info?.stateTodayImcomplete}
                                        />
                                </div>
                        </div>
                        <div className="border-[0.2vw] border-white/30 rounded-t-3xl w-[6.361vw] h-[13.889vh] flex-col items-center justify-center text-[#d1fbff]">
                                <div className="font-apple font-bold  text-[2.5vh] flex items-end w-full h-[50%] justify-center">
                                        전일대비
                                </div>
                                <div className="font-applyHeavy text-[3.2vh] flex items-start w-full h-[50%]  justify-center">
                                        <CountUp
                                                delay={0}
                                                duration={2}
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
        )
}

export default ProcessingStatus
