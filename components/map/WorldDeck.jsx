'use client'
import { useState, useMemo } from 'react'
import DeckGL from '@deck.gl/react'
import { GeoJsonLayer } from '@deck.gl/layers'

const WorldDeck = ({ viewState }) => {
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

        return (
                <DeckGL
                        viewState={viewState}
                        // onViewStateChange={(e) =>
                        //         setViewState(e.viewState)
                        // }
                        controller={false}
                        layers={[countries, cities]}></DeckGL>
        )
}

export default WorldDeck
