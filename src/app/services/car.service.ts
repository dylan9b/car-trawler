import { inject, Injectable, signal } from '@angular/core';
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
  private readonly _apiEndpoint =
    'https://ajaxgeo.cartrawler.com/ctabe/cars.json';

  readonly sortDirectionSignal = signal<'ASC' | 'DESC'>('ASC');

  getDates$(): Observable<VehRentalCore> {
    return this._httpClient.get<CarModel>(this._apiEndpoint).pipe(
      map((data) => {
        data = sanitizeKeys(data) as CarModel;

        return data[0].vehAvailRSCore.vehRentalCore;
      }),
    );
  }

  getCars$(
    filter?: Partial<CarFilterModel>,
  ): Observable<(VehAvail & { vendor: Vendor })[]> {
    return this._httpClient.get<CarModel>(this._apiEndpoint).pipe(
      map((data) => {
        data = sanitizeKeys(data) as CarModel;

        let result =
          data?.flatMap((car) =>
            car?.vehAvailRSCore?.vehVendorAvails.flatMap((x) =>
              x.vehAvails.map((v) => ({
                ...v,
                vendor: {
                  ...x.vendor,
                  name: x.vendor.name.toLocaleLowerCase(),
                },
              })),
            ),
          ) ?? [];

        // Filter to retrieve specific car.
        // VendorName + carCode should give a unique car
        if (filter?.vendorName && filter?.carCode) {
          const found = result.find(
            (item) =>
              item.vendor.name === filter.vendorName &&
              item.vehicle.code === filter.carCode,
          );
          result = found ? [found] : [];
        }

        return this.sort(result, filter?.sortPrice);
      }),
      catchError(() => EMPTY),
    );
  }

  private sort(
    data: (VehAvail & { vendor: Vendor })[],
    sortPrice?: 'ASC' | 'DESC',
  ): (VehAvail & { vendor: Vendor })[] {
    const direction = sortPrice ?? 'ASC';
    const multiplier = direction === 'ASC' ? 1 : -1;

    // Use slice() to avoid in-place sort mutation
    return data.slice().sort((a, b) => {
      const priceA = +a.totalCharge.estimatedTotalAmount;
      const priceB = +b.totalCharge.estimatedTotalAmount;
      return (priceA - priceB) * multiplier;
    });
  }
}
