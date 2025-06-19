import { Routes } from '@angular/router';

export const chatRoutes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./chat-layout/chat-layout.component').then(
        (m) => m.ChatLayoutComponent
      ),
  },
];
