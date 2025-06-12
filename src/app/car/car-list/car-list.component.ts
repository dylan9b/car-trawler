import { httpResource } from '@angular/common/http';
import {
  ChangeDetectionStrategy,
  Component,
  computed,
  signal,
} from '@angular/core';
import { sanitizeKeys } from '../../services/api.util';
import { CarModel, VehAvail, Vendor } from '../_model/car.model';
import { VendorCarComponent } from '../../vendor/vendor-car/vendor-car.component';
import { ButtonComponent } from '../../button/button.component';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-car-list',
  imports: [VendorCarComponent, ButtonComponent, RouterLink],
  templateUrl: './car-list.component.html',
  styleUrls: ['./car-list.component.scss'],
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CarListComponent {
  readonly apiEndpoint = 'https://ajaxgeo.cartrawler.com/ctabe/cars.json';
  readonly carsResource = httpResource<CarModel>(() => this.apiEndpoint, {
    parse: sanitizeKeys,
    defaultValue: [],
  });

  readonly sortDirectionSignal = signal<'ASC' | 'DESC'>('ASC');

  readonly sortDirectionImageSignal = computed(() =>
    this.sortDirectionSignal() === 'ASC' ? 'angle-up' : 'angle-down'
  );

  readonly carsSignal = computed(() => {
    const data =
      this.carsResource.value()?.flatMap((car) =>
        car?.vehAvailRSCore.vehVendorAvails.flatMap((x) =>
          x.vehAvails.map((v) => ({
            ...v,
            vendor: {
              ...x.vendor,
              name: x.vendor.name.toLocaleLowerCase(),
            },
          }))
        )
      ) ?? [];

    return this.sort(data);
  });

  private sort(
    data: (VehAvail & { vendor: Vendor })[]
  ): (VehAvail & { vendor: Vendor })[] {
    const direction = this.sortDirectionSignal();
    const multiplier = direction === 'ASC' ? 1 : -1;

    // Use slice() to avoid in-place sort mutation
    return data.slice().sort((a, b) => {
      const priceA = +a.totalCharge.estimatedTotalAmount;
      const priceB = +b.totalCharge.estimatedTotalAmount;
      return (priceA - priceB) * multiplier;
    });
  }

  sortByPrice(): void {
    this.sortDirectionSignal.update((dir) => (dir === 'ASC' ? 'DESC' : 'ASC'));
  }
}
