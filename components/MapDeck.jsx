'use client'

import React, { useState, useEffect } from 'react'
import DeckGL from '@deck.gl/react'
import { ScatterplotLayer, GeoJsonLayer } from '@deck.gl/layers'

import { MaskExtension } from '@deck.gl/extensions'
import AnimatedArcLayer from '@/app/map/animated-arc-group-layer'

const MapDeck = ({ sendToParent, viewState, flights, dataLoaded }) => {
        //fetchData()

        // 지도 배경 - 라인

        const countries = new GeoJsonLayer({
                id: 'countries-layer',
                data: '/data/ne_110m_admin_0_countries.geojson', // eslint-disable-line

                opacity: 0.1,
                stroked: false,
                filled: true,
                extruded: true,
                wireframe: true,
                getLineColor: [255, 255, 255],
                pickable: false,
        })

        // 지도 배경 - 도시 점
        const cities = new GeoJsonLayer({
                id: 'cities',
                data: '/data/ne_10m_populated_places_simple.geojson',

                pointType: 'circle',
                pointRadiusUnits: 'pixels',
                getFillColor: [255, 255, 255],
        })

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

        // Arc 라인 변수
        const timeWindow = 30
        const animationSpeed = 10 // 60 = 1min, 600 = 10mins, 3600 = 1hour
        const [currentTime, setCurrentTime] = useState(0)
        const [highlight, setHighlight] = useState(null)

        const highlightLayers =
                dataLoaded &&
                new ScatterplotLayer({
                        id: 'scatterplot-layer',
                        data: highlight,
                        filled: true,
                        getFillColor: (d) => getPathColor('fill', d.type),
                        getLineColor: (d) => getPathColor('line', d.type),
                        getLineWidth: 3,
                        getPosition: (d) => [d.lon1, d.lat1],
                        getRadius: () => 6,
                        lineWidthMinPixels: 8,
                        radiusMaxPixels: 100,
                        radiusMinPixels: 5,
                        radiusScale: 2,
                        radiusUnits: 'pixels',
                        stroked: true,
                        highlightColor: [0, 0, 128, 128],
                        opacity: 0.2,
                        pickable: false,
                        visible: true,
                        wrapLongitude: true,
                        extensions: [new MaskExtension()],
                        maskId: 'flight-mask',
                })

        const flightLayerProps = {
                data: flights,
                greatCircle: false,
                getSourcePosition: (d) => [d.lon1, d.lat1],
                getTargetPosition: (d) => [d.lon2, d.lat2],
                getSourceTimestamp: (d) => d.time1,
                getTargetTimestamp: (d) => d.time1 + 20,
                getSourceColor: (d) => getPathColor(null, d.type),
                getTargetColor: (d) => getPathColor(null, d.type),
                getHeight: () => 2,
                getTilt: () => 0,
        }

        const flightPathsLayer = new AnimatedArcLayer({
                ...flightLayerProps,
                id: 'flight-paths',
                timeRange: [currentTime - 60, currentTime], // 60 = 1min
                getWidth: 0.2,
                widthMinPixels: 1,
                widthMaxPixels: 4,
                widthUnits: 'common',
                parameters: { depthTest: false },
        })

        const highlightMaskLayer = new AnimatedArcLayer({
                ...flightLayerProps,
                id: 'flight-mask',
                timeRange: [currentTime - timeWindow * 60, currentTime],
                operation: 'mask',
                getWidth: 5000,
                widthUnits: 'meters',
        })

        /* global requestAnimationFrame, cancelAnimationFrame */
        const min = 0
        const max = 86400

        let animation
        let current

        animation = requestAnimationFrame(() => {
                console.log('requestAnimationFrame')
                let nextValue = currentTime + animationSpeed
                if (nextValue > max) {
                        nextValue = min

                        //cancelAnimationFrame(animation)
                }
                setCurrentTime(nextValue)
                if (dataLoaded && flights) {
                        current = flights.filter(
                                (d) =>
                                        d.time1 <= currentTime &&
                                        currentTime <= d.time2
                        )
                        setHighlight(current)
                }
                if (highlight && highlight.length > 0) sendToParent(highlight)
        })

        useEffect(() => {
                if (!dataLoaded) {
                        setCurrentTime(0)
                        setHighlight(null)
                        cancelAnimationFrame(animation)
                }
        }, [dataLoaded])

        return (
                <>
                        <DeckGL
                                viewState={viewState}
                                // onViewStateChange={(e) =>
                                //         setViewState(e.viewState)
                                // }
                                controller={false}
                                layers={[
                                        countries,
                                        cities,

                                        flightPathsLayer,

                                        highlightLayers,
                                        highlightMaskLayer,
                                ]}></DeckGL>
                </>
        )
}

export default MapDeck
