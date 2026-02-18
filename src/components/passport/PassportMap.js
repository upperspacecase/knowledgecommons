"use client";

import { MapContainer, TileLayer, Marker } from "react-leaflet";
import L from "leaflet";

// Fix Leaflet default icon
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
    iconRetinaUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon-2x.png",
    iconUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon.png",
    shadowUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png",
});

export default function PassportMap({ lat, lng }) {
    return (
        <MapContainer
            center={[lat, lng]}
            zoom={13}
            className="w-full h-full"
            style={{ background: "#1a1a2e" }}
            scrollWheelZoom={false}
        >
            <TileLayer
                attribution='&copy; <a href="https://carto.com/">CARTO</a>'
                url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
            />
            <Marker position={[lat, lng]} />
        </MapContainer>
    );
}
