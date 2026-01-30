import type { ExperienceLevel, FishingType, FishType, Season, Testimonial, Zone, ZoneDetail } from '@/types/models';
import ZoneDetailView from '@/pages/Zones/ZoneDetailView';

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

export interface ZoneViewProps {
    zones: Zone[];
    fishingTypes: FishingType[];
    experienceLevels: ExperienceLevel[];
    onDetail: (zone: Zone) => void;
    onBack: () => void;
}

export interface ZoneDetailViewProps {
    zone: ZoneDetail;
    onBack?: () => void;
}

export interface ZoneCardProps {
    zone: Zone,
    fishingTypes: FishingType[];
    experienceLevels: ExperienceLevel[];
}

export interface TestimonialsProps {
    testimonials: Testimonial[];
}

export interface FishCardProps {
    fish: FishType;
}

type SearchItem = {
    id: string;
    label: string;
    view: ViewType;
};
export interface SearchAutocompleteProps {
    items: SearchItem[];
    onSelect: (view: ViewType) => void;
    isScrolled: boolean;
}
