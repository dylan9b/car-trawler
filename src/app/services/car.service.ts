import { inject, Injectable } from '@angular/core';
import { catchError, EMPTY, map, Observable } from 'rxjs';
import {
  CarModel,
  VehAvail,
  VehRentalCore,
  Vendor,
} from '../car/_model/car.model';
import { HttpClient } from '@angular/common/http';
import { CarFilterModel } from '../car/_model/car-filter.model';
import { sanitizeKeys } from './api.util';

@Injectable({
  providedIn: 'root',
})
export class CarService {
  private readonly _httpClient = inject(HttpClient);
  readonly apiEndpoint = 'https://ajaxgeo.cartrawler.com/ctabe/cars.json';

  getDates$(): Observable<VehRentalCore> {
    return this._httpClient.get<CarModel>(this.apiEndpoint).pipe(
      map((data) => {
        data = sanitizeKeys(data);

        return data[0].vehAvailRSCore.vehRentalCore;
      })
    );
  }

  getCars$(
    filter: CarFilterModel
  ): Observable<(VehAvail & { vendor: Vendor })[]> {
    return this._httpClient.get<CarModel>(this.apiEndpoint).pipe(
      map((data) => {
        data = sanitizeKeys(data);

        let result =
          data?.flatMap((car) =>
            car?.vehAvailRSCore?.vehVendorAvails.flatMap((x) =>
              x.vehAvails.map((v) => ({
                ...v,
                vendor: {
                  ...x.vendor,
                  name: x.vendor.name.toLocaleLowerCase(),
                },
              }))
            )
          ) ?? [];

        // Filter to retrieve specific car.
        // VendorName + carCode should give a unique car
        if (filter?.vendorName && filter?.carCode) {
          const found = result.find(
            (item) =>
              item.vendor.name === filter.vendorName &&
              item.vehicle.code === filter.carCode
          );
          result = found ? [found] : [];
        }

        return result;
      }),
      catchError(() => EMPTY)
    );
  }
}
