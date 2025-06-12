import { Routes } from '@angular/router';
import { authGuard } from './auth/auth.guard';

export const routes: Routes = [
  {
    path: 'auth',
    loadChildren: () => import('./auth/auth.routes').then((m) => m.authRoutes),
    title: 'Authentication - Chat App',
  },
  {
    path: 'chat',
    loadChildren: () => import('./chat/chat.routes').then((m) => m.chatRoutes),
    canActivate: [authGuard],
    title: 'Chat - Chat App',
  },
  {
    path: '',
    redirectTo: '/chat',
    pathMatch: 'full',
  },
  {
    path: '**',
    loadComponent: () =>
      import('./not-found/not-found.component').then(
        (m) => m.NotFoundComponent
      ),
    title: 'Page Not Found - Chat App',
  },
];
