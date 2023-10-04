'use client'

import React, { useRef, useEffect, useState } from 'react'
import mapboxgl from '!mapbox-gl' // eslint-disable-line import/no-webpack-loader-syntax
mapboxgl.accessToken =
        'pk.eyJ1Ijoia21iczkzIiwiYSI6ImNsbjE4anRvcDF0aTcyanF1NWdtcnp6dHAifQ.XD5Ll-yHLZ4CqA7w9iFyHQ'
import * as turf from '@turf/turf'

const Map = () => {
        const mapContainer = useRef(null)
        // const map = useRef(null)
        const [lng, setLng] = useState(0)
        const [lat, setLat] = useState(0)
        const [zoom, setZoom] = useState(2.6)

        // San Francisco
        const [origin, setOrgin] = useState([-122.414, 37.776])

        // Washington DC
        const [destination, setDestination] = useState([-77.032, 38.913])

        // A simple line from origin to destination.
        const route = {
                type: 'FeatureCollection',
                features: [
                        {
                                type: 'Feature',
                                geometry: {
                                        type: 'LineString',
                                        coordinates: [origin, destination],
                                },
                        },
                ],
        }

        // A single point that animates along the route.
        // Coordinates are initially set to origin.
        const point = {
                type: 'FeatureCollection',
                features: [
                        {
                                type: 'Feature',
                                properties: {},
                                geometry: {
                                        type: 'Point',
                                        coordinates: origin,
                                },
                        },
                ],
        }

        // Calculate the distance in kilometers between route start/end point.
        const lineDistance = turf.length(route.features[0])

        const arc = []

        // Number of steps to use in the arc and animation, more steps means
        // a smoother arc and animation, but too many steps will result in a
        // low frame rate
        const steps = 100

        // Draw an arc between the `origin` & `destination` of the two points
        for (let i = 0; i < lineDistance; i += lineDistance / steps) {
                const segment = turf.along(route.features[0], i)
                arc.push(segment.geometry.coordinates)
        }

        // Update the route with calculated arc coordinates
        route.features[0].geometry.coordinates = arc

        // Used to increment the value of the point measurement against the route.
        let counter = 0

        useEffect(() => {
                //if (map.current) return // initialize map only once
                const map = new mapboxgl.Map({
                        container: mapContainer.current,
                        style: 'mapbox://styles/kmbs93/cln39h85u005h01r7cyz7euay',
                        center: [lng, lat],
                        zoom: zoom,
                        projection: 'naturalEarth',
                        attributionControl: false,
                })

                map.on('load', () => {
                        map.loadImage(
                                'https://docs.mapbox.com/mapbox-gl-js/assets/cat.png',
                                (error, image) => {
                                        if (error) throw error

                                        // Add the image to the map style.
                                        map.addImage('cat', image)

                                        // Add a source and layer displaying a point which will be animated in a circle.
                                        map.addSource('route', {
                                                type: 'geojson',
                                                data: route,
                                        })

                                        map.addSource('point', {
                                                type: 'geojson',
                                                data: point,
                                        })

                                        map.addLayer({
                                                id: 'route',
                                                source: 'route',
                                                type: 'line',
                                                paint: {
                                                        'line-width': 2,
                                                        'line-color': '#007cbf',
                                                },
                                        })

                                        map.addLayer({
                                                id: 'point',
                                                source: 'point',
                                                type: 'symbol',
                                                layout: {
                                                        // This icon is a part of the Mapbox Streets style.
                                                        // To view all images available in a Mapbox style, open
                                                        // the style in Mapbox Studio and click the "Images" tab.
                                                        // To add a new image to the style at runtime see
                                                        // https://docs.mapbox.com/mapbox-gl-js/example/add-image/
                                                        'icon-image': 'cat',
                                                        'icon-size': 0.1,
                                                        'icon-rotate': [
                                                                'get',
                                                                'bearing',
                                                        ],
                                                        'icon-rotation-alignment':
                                                                'map',
                                                        'icon-allow-overlap': true,
                                                        'icon-ignore-placement': true,
                                                },
                                        })
                                        let running = false
                                        function animate() {
                                                running = true

                                                const start =
                                                        route.features[0]
                                                                .geometry
                                                                .coordinates[
                                                                counter >= steps
                                                                        ? counter -
                                                                          1
                                                                        : counter
                                                        ]
                                                const end =
                                                        route.features[0]
                                                                .geometry
                                                                .coordinates[
                                                                counter >= steps
                                                                        ? counter
                                                                        : counter +
                                                                          1
                                                        ]
                                                if (!start || !end) {
                                                        running = false

                                                        return
                                                }
                                                // Update point geometry to a new position based on counter denoting
                                                // the index to access the arc
                                                point.features[0].geometry.coordinates =
                                                        route.features[0].geometry.coordinates[
                                                                counter
                                                        ]

                                                // Calculate the bearing to ensure the icon is rotated to match the route arc
                                                // The bearing is calculated between the current point and the next point, except
                                                // at the end of the arc, which uses the previous point and the current point
                                                point.features[0].properties.bearing =
                                                        turf.bearing(
                                                                turf.point(
                                                                        start
                                                                ),
                                                                turf.point(end)
                                                        )

                                                // Update the source with this new data
                                                map.getSource('point').setData(
                                                        point
                                                )

                                                // Request the next frame of animation as long as the end has not been reached
                                                if (counter < steps) {
                                                        requestAnimationFrame(
                                                                animate
                                                        )
                                                }

                                                counter = counter + 1
                                        }

                                        // Start the animation
                                        animate(counter)
                                }
                        ) // map on
                }) // add image
        })

        return <div ref={mapContainer} className="map-container"></div>
}

export default Map
