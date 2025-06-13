import { inject, Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { VehAvail, Vendor } from '../car/_model/car.model';
import { CarFilterModel } from '../car/_model/car-filter.model';
import { CarService } from '../services/car.service';

@Injectable({ providedIn: 'root' })
export class CarResolver implements Resolve<(VehAvail & { vendor: Vendor })[]> {
  private readonly _carService = inject(CarService);

  resolve(
    route: ActivatedRouteSnapshot,
  ): Observable<(VehAvail & { vendor: Vendor })[]> {
    let filter: CarFilterModel = {} as CarFilterModel;

    const vendorName = route.paramMap.get('vendorName');
    const carCode = route.paramMap.get('carCode');

    const queryParams = route.queryParams;

    filter = {
      ...filter,
      ...queryParams,
    };

    if (vendorName && carCode) {
      filter = {
        ...filter,
        vendorName,
        carCode,
      };
    }

    return this._carService.getCars$(filter);
  }
}
