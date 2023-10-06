import { useState, useEffect } from 'react'
const Notice = () => {
        const [notice, setNotice] = useState()

        // 공지사항
        useEffect(() => {
                fetch('/data/notice.json')
                        .then((resp) => resp.json())
                        .then((data) => {
                                setNotice(data)
                        })
        }, [])

        return (
                <div className="absolute left-0 bottom-0 w-full h-[9.259vh] bg-[#040308] px-[2.618vw] flex justify-between gap-10 ">
                        <div className="w-[12.827vw] h-full font-apple font-extrabold text-[3.6vh] flex items-center whitespace-nowrap bg-[#040308] ">
                                보안공지 Top 5
                        </div>
                        <div className="relative overflow-hidden flex items-center justify-center">
                                <div className=" notice-container flex justify-start items-center gap-10 z-1">
                                        {notice &&
                                                notice.length > 0 &&
                                                notice.map((item, index) => {
                                                        return (
                                                                <div
                                                                        className="h-full font-apple text-[3.0vh] flex items-center whitespace-nowrap"
                                                                        key={
                                                                                index
                                                                        }>
                                                                        {index +
                                                                                '. ' +
                                                                                item.notice}
                                                                </div>
                                                        )
                                                })}
                                </div>
                        </div>
                </div>
        )
}

export default Notice
