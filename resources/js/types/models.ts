export interface FishingType {
    id: number,
    name: string,
    icon: string,
    description: string,
    count: number
}

export interface Season {
    id: number,
    name: string,
    icon: string
}

export interface ExperienceLevel {
    id: number,
    name: string,
    description: string
}

export interface Zone {
    id: number,
    name: string,
    region: string,
    image: string,
    type: string[],
    difficulty: string,
    best_season: string[],
    rating: number,
    description: string,
    species: string[],
    regulations: string
}

export interface Testimonial {
    id: number,
    name: string,
    rol: string,
    comment: string,
    rating: number,
    date: string
}
