const API_KEY = process.env.OPENWEATHERMAP_API_KEY;

export async function fetchWeather(lat, lng) {
    if (!API_KEY) {
        console.warn("OpenWeatherMap API key not set");
        return null;
    }

    try {
        // Current weather
        const currentRes = await fetch(
            `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lng}&units=metric&appid=${API_KEY}`
        );
        const current = await currentRes.json();

        // 5-day forecast
        const forecastRes = await fetch(
            `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lng}&units=metric&appid=${API_KEY}`
        );
        const forecast = await forecastRes.json();

        return {
            current: {
                temp: current.main?.temp,
                feelsLike: current.main?.feels_like,
                humidity: current.main?.humidity,
                windSpeed: current.wind?.speed,
                description: current.weather?.[0]?.description,
                icon: current.weather?.[0]?.icon,
                pressure: current.main?.pressure,
            },
            forecast: forecast.list?.slice(0, 8).map((item) => ({
                date: item.dt_txt,
                temp: item.main?.temp,
                description: item.weather?.[0]?.description,
                icon: item.weather?.[0]?.icon,
                precipitation: item.pop,
            })),
            location: {
                name: current.name,
                country: current.sys?.country,
            },
        };
    } catch (error) {
        console.error("Weather API error:", error);
        return null;
    }
}
