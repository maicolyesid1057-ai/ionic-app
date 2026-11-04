import { Routes } from '@angular/router';

export const routes: Routes = [
    {
    path: 'login',
    loadComponent: () =>
      import('./pages/login/login.component')
        .then(m => m.LoginComponent)
  },
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
