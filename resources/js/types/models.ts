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

export interface Testimonial {
    id: number;
    name: string;
    role: string;
    comment: string;
    rating: number;
    date: string;
}
