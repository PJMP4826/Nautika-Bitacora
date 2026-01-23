export type * from './auth';

export * from './models';
export * from './props';

import type { Auth } from './auth';

export type SharedData = {
    name: string;
    auth: Auth;
    [key: string]: unknown;
};
