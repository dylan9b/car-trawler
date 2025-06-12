import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'cars',
    loadComponent: () =>
      import('./car/car-list/car-list.component').then(
        (c) => c.CarListComponent
      ),
  },

  {
    path: '',
    redirectTo: 'cars',
    pathMatch: 'full',
  },
];
