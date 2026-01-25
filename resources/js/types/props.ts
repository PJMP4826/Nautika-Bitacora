import type { ExperienceLevel, FishingType, FishType, Season, Testimonial, Zone } from '@/types/models';

export type ViewType = 'home' | 'zones' | 'types' | 'guides' | 'contact' | 'results' | 'zone-detail';

export interface NavigationBarProps {
    setCurrentView: (view: ViewType) => void;
    currentView: ViewType;
}

export interface SearchCriteria {
    type: string,
    experience: string,
    season: string
}

export interface SearchBarProps {
    onSearch: (criteria: SearchCriteria) => void;
    className?: string;
    fishingTypes: FishingType[];
    experienceLevels: ExperienceLevel[];
    seasons: Season[];
}

export interface HomePageProps {
    fishingTypes: FishingType[];
    experienceLevels: ExperienceLevel[];
    seasons: Season[];
    zones: Zone[];
    testimonials: Testimonial[];
    fish: FishType[];
    onSearch: (criteria: SearchCriteria) => void;
    onViewMore: (view: ViewType) => void;
    onDetail: (zone: Zone) => void;
}

export interface ZoneCardProps {
    zone: Zone,
    fishingTypes: FishingType[];
    experienceLevels: ExperienceLevel[];
    onClick: () => void;
}

export interface TestimonialsProps {
    testimonials: Testimonial[];
}

export interface FishCardProps {
    fish: FishType;
}
