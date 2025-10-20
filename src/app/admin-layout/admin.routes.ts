import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: '', loadComponent: () => import('./admin-layout').then(c => c.AdminLayout) },
]
