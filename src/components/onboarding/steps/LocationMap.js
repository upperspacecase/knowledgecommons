"use client";

import { MapContainer, TileLayer, Marker, useMapEvents, useMap } from "react-leaflet";
import { useEffect } from "react";
import L from "leaflet";

// Fix Leaflet default icon issue
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
    iconRetinaUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon-2x.png",
    iconUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon.png",
    shadowUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png",
});

function MapClickHandler({ onMapClick }) {
    useMapEvents({
        click: (e) => {
            onMapClick(e.latlng);
        },
    });
    return null;
}

function MapCenter({ position }) {
    const map = useMap();
    useEffect(() => {
        if (position) {
            map.flyTo([position.lat, position.lng], 14, { duration: 1 });
        }
    }, [position, map]);
    return null;
}

export default function LocationMap({ position, onMapClick }) {
    const center = position
        ? [position.lat, position.lng]
        : [39.5, -8.0]; // Default: center of Portugal

    return (
        <MapContainer
            center={center}
            zoom={position ? 14 : 6}
            className="w-full h-full"
            style={{ background: "#1a1a2e" }}
        >
            <TileLayer
                attribution='&copy; <a href="https://carto.com/">CARTO</a>'
                url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
            />
            <MapClickHandler onMapClick={onMapClick} />
            <MapCenter position={position} />
            {position && <Marker position={[position.lat, position.lng]} />}
        </MapContainer>
    );
}
