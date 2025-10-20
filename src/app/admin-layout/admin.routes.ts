import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '', loadComponent: () => import('./admin-layout').then(c => c.AdminLayout),
    children: [
      { path: '', loadComponent: () => import('../admin-overview/admin-overview').then(c => c.AdminOverview), },
      { path: 'users', loadComponent: () => import('../users/users').then(c => c.Users), },
    ]
  },
]
