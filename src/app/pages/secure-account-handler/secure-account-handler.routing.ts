import { Routes } from '@angular/router';
import { SecureAccountHandler } from './secure-account-handler.component';

export const SecureAccountHandlerRoutes: Routes = [
    {
        path: '',
        component: SecureAccountHandler,
        children: [
            {
                path: 'block-confirmed',
                loadChildren: () => import('./block-confirmed/block-confirmed.module').then(m => m.BlockConfirmedModule),
            },
            {
                path: '',
                redirectTo: 'block-confirmed',
                pathMatch: 'full',
            },
        ],
    }
];
