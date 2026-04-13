import { Link, usePage } from '@inertiajs/react';
import { BookOpen, Folder, LayoutGrid, MountainSnow, Fish, FishIcon, Calendar, Trophy, Waves, Users } from 'lucide-react';
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
import * as adminUsers from '@/routes/admin/users';
import type { NavItem } from '@/types';

// Define los permisos requeridos para cada sección
const navItemsWithPermissions: (NavItem & { permission?: string, role?: string })[] = [
    // {
    //     title: 'Dashboard',
    //     href: dashboard().url,
    //     icon: LayoutGrid,
    // },
    {
        title: 'Zonas',
        href: adminZones.index().url,
        icon: MountainSnow,
        permission: 'zone.view',
    },
    {
        title: 'Peces',
        href: adminFish.index().url,
        icon: FishIcon,
        permission: 'fish.view',
    },
    {
        title: 'Estilos de Pesca',
        href: adminFishingTypes.index().url,
        icon: Fish,
        role: 'admin',
    },
    {
        title: 'Temporadas',
        href: adminSeasons.index().url,
        icon: Calendar,
        role: 'admin',
    },
    {
        title: 'Niveles',
        href: adminExperienceLevels.index().url,
        icon: Trophy,
        role: 'admin',
    },
    {
        title: 'Tipos de Agua',
        href: adminWaterTypes.index().url,
        icon: Waves,
        role: 'admin',
    },
    {
        title: 'Usuarios',
        href: adminUsers.index().url,
        icon: Users,
        role: 'admin',
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
    const { auth } = usePage().props as {
        auth?: {
            permissions?: string[],
            roles?: string[],
        }
    };

    // Filtra los items según permisos o roles
    const filteredNavItems = navItemsWithPermissions.filter(item => {
        if (item.permission && !(auth?.permissions?.includes(item.permission))) {
            return false;
        }
        if (item.role && !(auth?.roles?.includes(item.role))) {
            return false;
        }
        return true;
    });

    return (
        <Sidebar collapsible="icon" variant="inset">
            <SidebarHeader>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton size="lg" asChild>
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
                <NavMain items={filteredNavItems} />
            </SidebarContent>

            <SidebarFooter>
                <NavUser />
            </SidebarFooter>
        </Sidebar>
    );
}
