import './index.css'

import { securityAlert, triagedAlert, escalatedAlert } from '@/contexts/main'
import TotalCount from '@/components/main/TotalCount'
import Affiliates from '@/components/main/Affiliates'
import Protection from '@/components/main/Protection'
import Alert from '@/components/main/Alert'
import BgVideo from '@/components/main/BgVideo'

const page = () => {
        return (
                <div className="z-10 font-extrabold">
                        <div className="w-screen h-screen z-1 flex justify-center video-wrapper">
                                <BgVideo />
                                <div className="absolute top-0 left-0 z-10 flex justify-center w-screen h-screen">
                                        <TotalCount />
                                        <div className="bottom">
                                                <div className="left ">
                                                        <Affiliates />
                                                </div>
                                                <div className="right">
                                                        <div className="text-white flex-col w-full flex items-center font-apple">
                                                                <Protection />
                                                                <div className="flex justify-center gap-[7.556vh]">
                                                                        <div className="flex-col items-center justify-start">
                                                                                <Alert
                                                                                        title="SECURITY EVENT"
                                                                                        number={
                                                                                                securityAlert
                                                                                        }
                                                                                />
                                                                        </div>
                                                                        <div className="flex-col items-center justify-start">
                                                                                <Alert
                                                                                        title="TRIAGED ALERTS"
                                                                                        number={
                                                                                                triagedAlert
                                                                                        }
                                                                                />
                                                                        </div>

                                                                        <div className="flex-col items-center justify-start">
                                                                                <Alert
                                                                                        title="ESCALATED ALERTS"
                                                                                        number={
                                                                                                escalatedAlert
                                                                                        }
                                                                                />
                                                                        </div>
                                                                </div>
                                                        </div>
                                                </div>
                                        </div>
                                </div>
                        </div>
                </div>
        )
}

export default page
