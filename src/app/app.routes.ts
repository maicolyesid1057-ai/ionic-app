import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('../app/pages/libros/libros-page.component').then((m) => m.LibrosPageComponent),
  },
  {
    path: 'folder/libros',
    loadComponent: () =>
      import('../app/pages/libros/libros-page.component').then((m) => m.LibrosPageComponent),
  },
  {
    path: 'folder/listas',
    loadComponent: () =>
      import('../app/pages/listas/listas-page.component').then((m) => m.ListasPageComponent),
  },
];
