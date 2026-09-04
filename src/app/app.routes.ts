import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'folder/Inbox',
    pathMatch: 'full',
  },
  // {
  //   path: 'folder/:folder',
  //   loadComponent: () =>
  //     import('./folder/folder.page').then((m) => m.FolderPage),
  // },
  {
    path: 'folder/info',
    loadComponent: () =>
      import('../app/components/card-info/card-info.component').then((m) => m.CardInfoComponent),
  },
];
