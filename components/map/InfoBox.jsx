'use client'
import { useState, useEffect } from 'react'
import Circles from '@/components/Circles'

const InfoBox = ({ index, type, title, time, detail }) => {
        const [start, setStart] = useState(false)
        const [opacity, setOpacity] = useState(100)
        const [space, setSpace] = useState('flex')

        useEffect(() => {
                setTimeout(() => {
                        setStart(true)
                }, index * 500)
        }, [])

        useEffect(() => {
                if (start) softRemover() // 해당 컴포넌트가 나타나면 함수가 바로실행됨.
        }, [softRemover])

        // eslint-disable-next-line react-hooks/exhaustive-deps
        function softRemover() {
                if (opacity > 90) {
                        // 초기부터 바로 사라지는게 시작되면 메시지 전달할 시간이 부족할듯하여 초반에는 투명도를 1씩 천천히 변화 시켰다.
                        setTimeout(() => {
                                setOpacity(opacity - 1)
                        }, 200)
                } else if (opacity > 5)
                        // 초기 약 0.4초후에는 부드럽게 사라지도록 구현했다.
                        setTimeout(() => {
                                setOpacity(opacity - 4)
                        }, 100) // 시간이 짧으수록 부드럽지만 리소스 소모가커지기 때문에 설정할때 고민이 필요한 부분이다.

                // 감추기
                if (opacity < 50) setSpace('none')
        }
        return (
                <div
                        className="scroll-container relative flex justify-start items-center whitespace-nowrap gap-5 my-[1vh]"
                        style={{ opacity: opacity / 100, display: space }}>
                        <div className="flex-none w-[2.083vw] h-[3.704vh] mr-[0.43vw]">
                                <Circles type={type} />
                        </div>
                        <div className="flex-col items-start">
                                <div className="font-apple font-bold text-[1.183vh]  whitespace-nowrap overflow-hidden">
                                        {title}
                                </div>
                                <div className="font-apple text-[1.183vh]">
                                        {time}
                                </div>
                                <div className="font-apple text-[1.183vh] whitespace-nowrap overflow-hidden">
                                        {detail}
                                </div>
                        </div>
                </div>
        )
}

export default InfoBox
