'use client'
import { useRef, useState, useEffect, useMemo } from 'react'
import DeckGL from '@deck.gl/react'
import { ScatterplotLayer } from '@deck.gl/layers'

import { MaskExtension } from '@deck.gl/extensions'
import AnimatedArcLayer from '@/app/map/animated-arc-group-layer'

const MapDeck = ({ dataLoaded, flights, viewState }) => {
        // initialize AnimationFrame
        useEffect(() => {
                requestRef.current = requestAnimationFrame(animate)
                return () => cancelAnimationFrame(requestRef.current)
        }, [])

        // Arc 애니메이션 구성
        const requestRef = useRef(0)
        const [currentTime, setCurrentTime] = useState(0)

        const min = 0
        const max = 86400 // 60*60*24 =  1day

        const animationSpeed = 1 // 60 = 1min, 600 = 10mins, 3600 = 1hour

        const animate = (timestamp) => {
                // 여기에 원하는 애니메이션 수행 코드 작성
                // console.log(timestamp)
                let nextValue = currentTime + animationSpeed
                if (nextValue > max) {
                        nextValue = min
                }
                setCurrentTime(nextValue)
        }
        requestRef.current = requestAnimationFrame(animate)

        // Arc라인, Hightlight 색상
        const getPathColor = (position, type) => {
                let array = []
                if (type == 'malware') {
                        array.push(228)
                        array.push(126)
                        array.push(179)
                } else if (type == 'phishing') {
                        array.push(244)
                        array.push(211)
                        array.push(144)
                } else if (type == 'intrusion') {
                        array.push(164)
                        array.push(233)
                        array.push(212)
                } else {
                        array.push(204)
                        array.push(204)
                        array.push(204)
                }

                if (position == 'fill') {
                        array.push(200)
                } else if (position == 'line') {
                        array.push(90)
                } else {
                        array.push(255)
                }
                return array
        }

        const highlightSourceLayers =
                dataLoaded &&
                new ScatterplotLayer({
                        id: 'scatterplot-source-layer',
                        data: flights,
                        filled: true,
                        getFillColor: (d) => getPathColor(d.type),
                        getLineColor: (d) => getPathColor(d.type),
                        getLineWidth: 3,
                        getPosition: (d) => [d.lon1, d.lat1],
                        getRadius: () => 3,
                        lineWidthMinPixels: 4,
                        radiusMaxPixels: 10,
                        radiusMinPixels: 5,
                        radiusScale: 1,
                        radiusUnits: 'pixels',
                        stroked: false,
                        highlightColor: [0, 0, 128, 128],
                        opacity: 1,
                        pickable: false,
                        visible: true,
                        wrapLongitude: true,
                })
        const highlightTargetLayers =
                dataLoaded &&
                new ScatterplotLayer({
                        id: 'scatterplot-target-layer',
                        data: flights,
                        filled: true,
                        getFillColor: (d) => getPathColor('fill', d.type),
                        getLineColor: (d) => getPathColor('line', d.type),
                        getLineWidth: 3,
                        getPosition: (d) => [d.lon2, d.lat2],
                        getRadius: () => 6,
                        lineWidthMinPixels: 8,
                        radiusMaxPixels: 100,
                        radiusMinPixels: 5,
                        radiusScale: 2,
                        radiusUnits: 'pixels',
                        stroked: true,
                        highlightColor: [0, 0, 128, 128],
                        opacity: 0.6,
                        pickable: false,
                        visible: true,
                        wrapLongitude: true,
                })

        const flightLayerProps = {
                data: flights,
                greatCircle: false,
                getSourcePosition: (d) => [d.lon1, d.lat1],
                getTargetPosition: (d) => [d.lon2, d.lat2],
                getSourceTimestamp: (d) => d.time1,
                getTargetTimestamp: (d) => d.time1 + 200,
                getSourceColor: (d) => getPathColor(null, d.type),
                getTargetColor: (d) => getPathColor(null, d.type),
                getHeight: () => 2,
                getTilt: () => 0,
        }

        const flightPathsLayer =
                dataLoaded &&
                new AnimatedArcLayer({
                        ...flightLayerProps,
                        id: 'flight-paths',
                        timeRange: [currentTime - 2000, currentTime], // 60 = 1min
                        getWidth: 6,
                        widthMinPixels: 6,
                        widthMaxPixels: 6,
                        widthUnits: 'common',
                        parameters: { depthTest: false },
                })

        // const highlightMaskLayer =
        //         dataLoaded &&
        //         new AnimatedArcLayer({
        //                 ...flightLayerProps,
        //                 id: 'flight-mask',
        //                 timeRange: [currentTime - timeWindow * 60, currentTime],
        //                 operation: 'mask',
        //                 getWidth: 5000,
        //                 widthUnits: 'meters',
        //         })

        return (
                <>
                        <DeckGL
                                viewState={viewState}
                                controller={false}
                                layers={[
                                        flightPathsLayer,
                                        highlightSourceLayers,
                                        highlightTargetLayers,
                                        // highlightMaskLayer,
                                ]}></DeckGL>
                </>
        )
}

export default MapDeck
