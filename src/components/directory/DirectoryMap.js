"use client";

import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";

// Fix Leaflet default icon
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
    iconRetinaUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon-2x.png",
    iconUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon.png",
    shadowUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png",
});

export default function DirectoryMap({ properties }) {
    // Calculate center from all properties
    const coords = properties
        .filter((p) => p.coordinates?.coordinates)
        .map((p) => p.coordinates.coordinates);

    const center =
        coords.length > 0
            ? [
                coords.reduce((sum, c) => sum + c[1], 0) / coords.length,
                coords.reduce((sum, c) => sum + c[0], 0) / coords.length,
            ]
            : [39.5, -8.0]; // Default: Portugal

    return (
        <MapContainer
            center={center}
            zoom={coords.length > 0 ? 6 : 5}
            className="w-full h-full"
            style={{ background: "#1a1a2e" }}
        >
            <TileLayer
                attribution='&copy; <a href="https://carto.com/">CARTO</a>'
                url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
            />
            {properties
                .filter((p) => p.coordinates?.coordinates)
                .map((property) => {
                    const [lng, lat] = property.coordinates.coordinates;
                    return (
                        <Marker key={property._id} position={[lat, lng]}>
                            <Popup>
                                <div className="text-black">
                                    <strong>{property.propertyName}</strong>
                                    <br />
                                    <small>{property.address || "Location set"}</small>
                                    <br />
                                    <a
                                        href={`/passport/${property._id}`}
                                        className="text-blue-600 text-xs"
                                    >
                                        View Passport →
                                    </a>
                                </div>
                            </Popup>
                        </Marker>
                    );
                })}
        </MapContainer>
    );
}
