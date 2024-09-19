'use client';

import React, { useEffect, useRef } from 'react';
import L from 'leaflet';
import HeatmapOverlay from 'heatmap.js/plugins/leaflet-heatmap';
import 'leaflet/dist/leaflet.css'; // Import leaflet styles

const generateRandomData = (numPoints) => {
    const data = [];
    for (let i = 0; i < numPoints; i++) {
        const lat = getRandomLatitude();
        const lng = getRandomLongitude();
        data.push({
            lat,
            lng,
            value: Math.random() * 30, // Random value for visualization
        });
    }
    return {
        max: 30, // Adjust as needed
        data,
    };
};

const getRandomLatitude = () => {
    return Math.random() * 180 - 90;
};

const getRandomLongitude = () => {
    return Math.random() * 360 - 180;
};

const MapComponent = () => {
    const mapRef = useRef(null);

    useEffect(() => {
        if (mapRef.current) {
            const baseLayer = L.tileLayer(
                'http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
                {
                    attribution: 'Map data © OpenStreetMap contributors',
                    maxZoom: 18,
                }
            );

            const cfg = {
                radius: 20,
                maxOpacity: 0.8,
                scaleRadius: true,
                useLocalExtrema: true,
                latField: 'lat',
                lngField: 'lng',
                valueField: 'value',
            };

            const heatmapLayer = new HeatmapOverlay(cfg);

            const map = L.map(mapRef.current, {
                center: [0, 0],
                zoom: 2,
                layers: [baseLayer, heatmapLayer],
            });

            const globalData = generateRandomData(50);
            heatmapLayer.setData(globalData);

            return () => {
                map.remove();
            };
        }
    }, []);

    // Full responsive map container
    return (
        <div
            id="map-canvas"
            ref={mapRef}
            style={{
                height: '100%', // Take full height of the parent
                width: '100%', // Take full width of the parent
                position: 'absolute', // Make it absolute to fill parent
                top: 0,
                left: 0,
                zIndex: 0,
            }}
        />
    );
};

export default MapComponent;
