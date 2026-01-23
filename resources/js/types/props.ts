export type ViewType = 'home' | 'zones' | 'types' | 'guides' | 'contact' | 'results' | 'zone-detail';

export interface NavigationBarProps {
    setCurrentView: (view: ViewType) => void;
    currentView: ViewType;
}
