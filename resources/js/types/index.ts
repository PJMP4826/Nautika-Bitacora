export type * from './auth';

export * from './models';
export * from './props';

export * from './navigation';
export * from './ui';

import type { PageProps as InertiaPageProps } from '@inertiajs/core';
import type { Auth } from './auth';

declare global {
    function route(name: string, params?: Record<string, unknown>): string;
}

export type SharedData = {
    name: string;
    auth: Auth;
    [key: string]: unknown;
};

export type PageProps<T = {}> = InertiaPageProps & T & {
    flash: {
        success?: string;
        error?: string;
    };
};
