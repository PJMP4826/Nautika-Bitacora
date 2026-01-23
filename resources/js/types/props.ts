import type { ExperienceLevel, FishingType, Season } from '@/types/models';

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
}
