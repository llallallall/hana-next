'use client'
import { useRef, useEffect } from 'react'

const BgVideo = () => {
        const videoRef = useRef(null)

        useEffect(() => {
                if (videoRef && videoRef.current) {
                        videoRef.current.play()
                }
        }, [videoRef])

        return (
                <video
                        ref={videoRef}
                        muted
                        loop
                        poster="/videos/terasys_2.1.png">
                        <source
                                src="/videos/terasys_2.1.mp4"
                                type="video/mp4"
                        />
                        Your browser does not support the video tag.
                </video>
        )
}

export default BgVideo
