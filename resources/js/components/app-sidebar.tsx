import { Link } from '@inertiajs/react';
import { BookOpen, Folder, LayoutGrid, MountainSnow, Fish, Calendar, Trophy, Waves } from 'lucide-react';
import { NavFooter } from '@/components/nav-footer';
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
import * as adminZones from '@/routes/admin/zones';
import type { NavItem } from '@/types';

const mainNavItems: NavItem[] = [
    {
        title: 'Dashboard',
        href: dashboard().url,
        icon: LayoutGrid,
    },
    {
        title: 'Zonas',
        href: adminZones.index().url,
        icon: MountainSnow
    },
    {
        title: 'Estilos de Pesca',
        href: route('admin.fishing-types.index'),
        icon: Fish
    },
    {
        title: 'Temporadas',
        href: route('admin.seasons.index'),
        icon: Calendar
    },
    {
        title: 'Niveles',
        href: route('admin.experience-levels.index'),
        icon: Trophy
    },
    {
        title: 'Tipos de Agua',
        href: route('admin.water-types.index'),
        icon: Waves
    }
];

const footerNavItems: NavItem[] = [
    {
        title: 'Repository',
        href: 'https://github.com/laravel/react-starter-kit',
        icon: Folder,
    },
    {
        title: 'Documentation',
        href: 'https://laravel.com/docs/starter-kits#react',
        icon: BookOpen,
    },
];

export function AppSidebar() {
    return (
        <Sidebar collapsible="icon" variant="inset">
            <SidebarHeader>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton size="lg" asChild>
                            <Link href={dashboard()} prefetch>

                            </Link>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarHeader>

            <SidebarContent>
                <NavMain items={mainNavItems} />
            </SidebarContent>

            <SidebarFooter>
                <NavFooter items={footerNavItems} className="mt-auto" />
                <NavUser />
            </SidebarFooter>
        </Sidebar>
    );
}
