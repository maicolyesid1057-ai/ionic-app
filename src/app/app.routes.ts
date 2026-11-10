import { Routes } from '@angular/router';

export const routes: Routes = [
    {
    path: '',
    loadComponent: () =>
      import('./pages/login/login.component')
        .then(m => m.LoginComponent)
  },
 
  
  {
    path: 'libros',
    loadComponent: () =>
      import('../app/pages/libros/libros-page.component').then((m) => m.LibrosPageComponent),
  },
  {
    path: 'listas',
    loadComponent: () =>
      import('../app/pages/listas/listas-page.component').then((m) => m.ListasPageComponent),
  },
];
