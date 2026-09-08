import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'folder/Inbox',
    pathMatch: 'full',
  },
  {
    path: 'folder/libros',
    loadComponent: () =>
      import('../app/pages/libros/libros-page.component').then((m) => m.LibrosPageComponent),
  },
];
