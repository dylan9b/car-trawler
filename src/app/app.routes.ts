import { Routes } from '@angular/router';
import { CarResolver } from './resolvers/car.resolver';

export const routes: Routes = [
  {
    path: 'cars',
    loadComponent: () =>
      import('./car/car-list/car-list.component').then(
        (c) => c.CarListComponent,
      ),
    resolve: {
      carResolver: CarResolver,
    },
    runGuardsAndResolvers: 'always',
  },
  {
    path: 'cars/:vendorName/:carCode',
    loadComponent: () =>
      import('./car/car-item/car-item.component').then(
        (c) => c.CarItemComponent,
      ),
    resolve: {
      carResolver: CarResolver,
    },
  },
  {
    path: '',
    redirectTo: 'cars',
    pathMatch: 'full',
  },
  {
    path: '**',
    redirectTo: 'cars',
    pathMatch: 'full',
  },
];
