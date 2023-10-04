'use client'

import React, { useRef, useState, useEffect } from 'react'
import { Map } from 'react-map-gl'
//@ts-ignore
import DeckGL, { ArcLayer } from 'deck.gl'
import 'mapbox-gl/dist/mapbox-gl.css'
import arcsArray from '@/contexts/arcs.json'
//@ts-ignore
import {
        AmbientLight,
        PointLight,
        DirectionalLight,
        LightingEffect,
} from '@deck.gl/core'
import ArcBrushingLayer from '@/app/map/ArcBrushingLayer'

// create ambient light source
const ambientLight = new AmbientLight({
        color: [255, 255, 255],
        intensity: 1.0,
})
// create point light source
const pointLight = new PointLight({
        color: [255, 255, 255],
        intensity: 2.0,
        // use coordinate system as the same as view state
        position: [-125, 50.5, 5000],
})
// create directional light source
const directionalLight = new DirectionalLight({
        color: [255, 255, 255],
        intensity: 1.0,
        direction: [-3, -9, -1],
})
// create lighting effect with light sources
const lightingEffect = new LightingEffect({
        ambientLight,
        pointLight,
        directionalLight,
})

const MapGL = () => {
        const mapRef = useRef(null)
        const deckRef = useRef(null)
        const [viewState, setViewState] = useState({
                longitude: 0,
                latitude: 0,
                zoom: 1,
        })
        useEffect(() => {
                let newZoom = (2.6 / 3820) * window.innerWidth

                setTimeout(() => {
                        if (mapRef.current) mapRef.current?.setZoom(newZoom)
                        setViewState({
                                longitude: 0,
                                latitude: 0,
                                zoom: newZoom,
                        })
                }, 500)
        }, [])

        const [arcs, setArcs] = useState([])
        const [count, setCount] = useState(0)
        const [source, setSource] = useState([0, 0])
        const [target, setTarget] = useState([0, 0])
        const layer = new ArcLayer({
                id: 'flight-arcs',
                data: arcsArray,
                getSourcePosition: source,
                getTargetPosition: (d) => d.target,
                getSourceColor: (d) => getColor('source', d.type),
                getTargetColor: (d) => getColor('target', d.type),
                getWidth: 10,
                updateTriggers: {
                        getSourcePosition: [source],
                },
        })
        const dataChunks = []

        useEffect(() => {
                const arcsInterval = setInterval(() => {
                        let next = count + 1
                        let current = arcs
                        console.log(current)
                        if (count > arcsArray.length - 1) {
                                setCount(0)
                                current.push(arcsArray[count])
                                setArcs[current]
                        } else {
                                setCount(next)
                                current.push(arcsArray[count])
                                setSource(arcsArray[count].source)
                                setTarget(arcsArray[count].target)
                                setArcs[current]
                        }
                        //console.log(arcsArray[count])
                        console.log(arcs)
                }, 3000)
                return () => clearInterval(arcsInterval)
        }, [count])

        const getColor = (position, type) => {
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

                if (position == 'source') {
                        array.push(100)
                } else if (position == 'target') {
                        array.push(250)
                } else {
                        array.push(1)
                }

                return array
        }

        const [arcEnabled, setArcEnabled] = useState(true)
        const handleToggleArcs = () => setArcEnabled(!arcEnabled)

        return (
                <Map
                        ref={mapRef}
                        initialViewState={viewState}
                        style={{
                                width: '100vw',
                                height: '100vh',
                                zIndex: '1',
                        }}
                        mapboxAccessToken="pk.eyJ1Ijoia21iczkzIiwiYSI6ImNsbjE4anRvcDF0aTcyanF1NWdtcnp6dHAifQ.XD5Ll-yHLZ4CqA7w9iFyHQ"
                        mapStyle="mapbox://styles/kmbs93/cln39h85u005h01r7cyz7euay">
                        <DeckGL
                                ref={deckRef}
                                viewState={viewState}
                                onViewStateChange={(e) =>
                                        setViewState(e.viewState)
                                }
                                controller={true}
                                layers={layer}></DeckGL>
                </Map>
        )
}

export default MapGL
