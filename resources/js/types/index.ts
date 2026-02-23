export type * from './auth';

export * from './models';
export * from './props';

export * from './navigation';
export * from './ui';

import type { Config } from 'ziggy-js';
import type { Auth } from './auth';

declare global {
    function route(name: string, params?: Record<string, unknown>): string;
    const Ziggy: Config;
}

export type SharedData = {
    name: string;
    auth: Auth;
    [key: string]: unknown;
};
