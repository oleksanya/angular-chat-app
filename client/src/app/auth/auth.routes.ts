import { Routes } from '@angular/router';

export const authRoutes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./auth.layout/auth.layout.component').then(
        (m) => m.AuthLayoutComponent
      ),
  },
];
