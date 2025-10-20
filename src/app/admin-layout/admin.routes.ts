import { Routes } from '@angular/router';
import { AdminLayout } from './admin-layout';

export const routes: Routes = [
  {
    path: '', loadComponent: () => import('./admin-layout').then(c => c.AdminLayout),
    children: [
      { path: '', loadComponent: () => import('../admin-overview/admin-overview').then(c => c.AdminOverview), },
    ]
  },
]
