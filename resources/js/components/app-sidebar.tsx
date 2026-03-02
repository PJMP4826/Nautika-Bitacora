import { Link } from '@inertiajs/react';
import { BookOpen, Folder, LayoutGrid, MountainSnow, Fish, FishIcon, Calendar, Trophy, Waves } from 'lucide-react';
import { NavMain } from '@/components/nav-main';
import { NavUser } from '@/components/nav-user';
import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
} from '@/components/ui/sidebar';
import { dashboard } from '@/routes/admin';
import * as adminExperienceLevels from '@/routes/admin/experience-levels';
import * as adminFish from '@/routes/admin/fish';
import * as adminFishingTypes from '@/routes/admin/fishing-types';
import * as adminSeasons from '@/routes/admin/seasons';
import * as adminWaterTypes from '@/routes/admin/water-types';
import * as adminZones from '@/routes/admin/zones';
import type { NavItem } from '@/types';

const mainNavItems: NavItem[] = [
    // {
    //     title: 'Dashboard',
    //     href: dashboard().url,
    //     icon: LayoutGrid,
    // },
    {
        title: 'Zonas',
        href: adminZones.index().url,
        icon: MountainSnow
    },
    {
        title: 'Peces',
        href: adminFish.index().url,
        icon: FishIcon
    },
    {
        title: 'Estilos de Pesca',
        href: adminFishingTypes.index().url,
        icon: Fish
    },
    {
        title: 'Temporadas',
        href: adminSeasons.index().url,
        icon: Calendar
    },
    {
        title: 'Niveles',
        href: adminExperienceLevels.index().url,
        icon: Trophy
    },
    {
        title: 'Tipos de Agua',
        href: adminWaterTypes.index().url,
        icon: Waves
    }
];

// const footerNavItems: NavItem[] = [
//     {
//         title: 'Repository',
//         href: 'https://github.com/laravel/react-starter-kit',
//         icon: Folder,
//     },
//     {
//         title: 'Documentation',
//         href: 'https://laravel.com/docs/starter-kits#react',
//         icon: BookOpen,
//     },
// ];

export function AppSidebar() {
    return (
        <Sidebar collapsible="icon" variant="inset">
            <SidebarHeader>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton size="lg" asChild>
                            {/*<Link href={dashboard()} prefetch>*/}
                            {/*    */}
                            {/*</Link>*/}
                            <div className="flex items-center gap-3 cursor-pointer group bg-slate-400 px-3 py-1 rounded-xl">
                                <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-slate-600 border border-slate-700 group-hover:bg-slate-700 transition-colors">
                                    <img
                                        src="/anchor.png"
                                        alt="Nautika logo"
                                        className="w-6 h-6 object-contain opacity-90"
                                    />
                                </div>

                                <div className="leading-tight">
                                    <h1 className="text-lg font-bold tracking-wider text-slate-100">
                                        NAUTIKA
                                    </h1>
                                    <p className="text-[10px] tracking-[0.25em] font-medium text-slate-100">
                                        BITÁCORA
                                    </p>
                                </div>
                            </div>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarHeader>

            <SidebarContent>
                <NavMain items={mainNavItems} />
            </SidebarContent>

            <SidebarFooter>
                <NavUser />
            </SidebarFooter>
        </Sidebar>
    );
}
