'use client';

import React, { useEffect, useRef } from 'react';
import L from 'leaflet';
import HeatmapOverlay from 'heatmap.js/plugins/leaflet-heatmap';
import 'leaflet/dist/leaflet.css'; // Import leaflet styles

const generateRandomData = (numPoints: number) => {
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

const getRandomLatitude = () => Math.random() * 180 - 90;
const getRandomLongitude = () => Math.random() * 360 - 180;

const HeatMap = () => {
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

            // Heatmap configuration
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

            // Initialize the map
            const map = L.map(mapRef.current, {
                center: [0, 0],
                zoom: 2,
                layers: [baseLayer, heatmapLayer],
                scrollWheelZoom: false, // Disable scroll zoom if necessary
            });

            // Generate random data
            const globalData = generateRandomData(50);

            // Set heatmap data
            heatmapLayer.setData(globalData);

            // Clean up on component unmount
            return () => {
                map.remove();
            };
        }
    }, []);

    return (
        <div
            ref={mapRef}
            style={{
                width: '100%',  // Make the map container full width
                height: '100vh', // Make the map container full height
            }}
        />
    );
};

export default HeatMap;
