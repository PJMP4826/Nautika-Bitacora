export interface FishingType {
    id: string;
    name: string;
    slug: string;
    icon: string;
    description: string;
    count: number;
}

export interface Season {
    id: string;
    name: string;
    icon: string;
}

export interface ExperienceLevel {
    id: string;
    name: string;
    description: string;
}

export interface WaterType {
    id: string;
    name: string;
    icon: string | null;
}

export interface Zone {
    id: number;
    name: string;
    slug: string;
    region: string;
    water_type_id: string;
    image: string;
    types: string[];
    difficulty: string;
    best_season: string[];
    rating: number;
    description: string;
    species: string[];
    regulations: string;
}

export interface WeatherCurrent {
    temperature: number | null;
    windSpeed: number | null;
    windDirection: number | null;
    precipitation: number | null;
    cloudCover: number | null;
    weatherCode: number | null;
    waveHeight: number | null;
    waveDirection: number | null;
    wavePeriod: number | null;
    seaSurfaceTemperature: number | null;
}

export interface WeatherDay {
    date: string;
    weatherCode: number | null;
    tempMax: number | null;
    tempMin: number | null;
    precipitationSum: number | null;
    windSpeedMax: number | null;
    waveHeightMax: number | null;
    wavePeriodMax: number | null;
}

export interface ZoneWeather {
    current: WeatherCurrent;
    daily: WeatherDay[];
    fetchedAt: string;
}
export interface ZoneDetail {
    id: number;
    name: string;
    slug: string;
    region: string;
    water_type_id: string;
    image: string;
    types: FishingType[];
    difficulty: ExperienceLevel;
    best_season: Season[];
    rating: number;
    description: string;
    species: string[];
    regulations: string;
}

export interface Testimonial {
    name: string;
    role: string;
    content: string;
    rating: number;
    avatar: string;
}

export interface FishType {
    id: number;
    name: string;
    slug: string;
    image: string;
    scientific_name: string;
    zone: Zone;
    zone_id: number;
}
