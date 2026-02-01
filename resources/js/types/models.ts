export interface FishingType {
    id: string;
    name: string;
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

export interface Zone {
    id: number;
    name: string;
    slug: string;
    region: string;
    image: string;
    types: string[];
    difficulty: string;
    best_season: string[];
    rating: number;
    description: string;
    species: string[];
    regulations: string;
}

/** Zone with types, difficulty and best_season resolved to full objects (from backend). */
export interface ZoneDetail {
    id: number;
    name: string;
    slug: string;
    region: string;
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
    name: string;
    slug: string;
    image: string;
    scientific_name: string;
    zone: Zone;
}
