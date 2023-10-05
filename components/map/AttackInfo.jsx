import { useState, useEffect } from 'react'
import InfoBox from './InfoBox'

const AttackInfo = ({ data }) => {
        const [onReload, setOnReload] = useState(false)
        useEffect(() => {
                setOnReload(true)
        }, [data])

        const Refresh = ({ children }) => {
                // console.log('refresh')
                // if (onReload) {
                //         return <div>{children}</div>
                // }
                return <div>{children}</div>
        }
        return (
                <Refresh>
                        <div className="relatve my-[2vh] grid-cols-1 gap-5 ">
                                {data &&
                                        data.length > 0 &&
                                        data.map((item, index) => {
                                                return (
                                                        <InfoBox
                                                                key={index}
                                                                index={index}
                                                                type={item.type}
                                                                title={
                                                                        item.title
                                                                }
                                                                time={
                                                                        item.starttime
                                                                }
                                                                detail={
                                                                        item.detail
                                                                }
                                                        />
                                                )
                                        })}
                        </div>
                </Refresh>
        )
}

export default AttackInfo
