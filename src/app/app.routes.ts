import { Routes } from '@angular/router';
import { authGuard } from './_guards/auth-guard';
import { roleGuard } from './_guards/roles-guard';

export const routes: Routes = [
  { path: '', redirectTo: 'admin', pathMatch: 'full' },
  { path: 'login', loadComponent: () => import('./login/login').then(c => c.Login) },
  {
    path: 'admin',
    loadChildren: () => import('./admin-layout/admin.routes').then(c => c.routes),
    canActivate: [authGuard, roleGuard(['ADMIN'])],
  },
  { path: '403', loadComponent: () => import('./forbidden/forbidden').then(c => c.Forbidden) },
];
