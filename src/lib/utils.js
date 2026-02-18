import { v4 as uuidv4 } from 'uuid';

export function generateEditToken() {
    return uuidv4();
}

export function formatArea(area, unit = 'hectares') {
    if (!area) return null;
    return `${area.toLocaleString()} ${unit}`;
}

export function getSeasonForLocation(lat, month) {
    const isNorthernHemisphere = lat >= 0;
    const seasons = isNorthernHemisphere
        ? ['winter', 'winter', 'spring', 'spring', 'spring', 'summer', 'summer', 'summer', 'autumn', 'autumn', 'autumn', 'winter']
        : ['summer', 'summer', 'autumn', 'autumn', 'autumn', 'winter', 'winter', 'winter', 'spring', 'spring', 'spring', 'summer'];
    return seasons[month];
}

export function classifyTerrain(elevation, slope) {
    if (elevation < 50 && slope < 5) return 'coastal_flat';
    if (elevation < 200 && slope < 10) return 'flat';
    if (elevation < 500 && slope < 20) return 'hilly';
    if (elevation < 1000) return 'mountainous';
    return 'highland';
}

export function getPropertyUrl(id, locale = 'en') {
    const base = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';
    return `${base}/${locale}/passport/${id}`;
}

export function getEditUrl(id, token, locale = 'en') {
    const base = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';
    return `${base}/${locale}/passport/${id}/edit?token=${token}`;
}
