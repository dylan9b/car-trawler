import { httpResource } from '@angular/common/http';
import {
  ChangeDetectionStrategy,
  Component,
  computed,
  effect,
} from '@angular/core';
import { sanitizeKeys } from '../../services/api.util';
import { CarModel } from '../_model/car.model';
import { VendorComponent } from '../../vendor/vendor.component';

@Component({
  selector: 'app-car-list',
  imports: [VendorComponent],
  templateUrl: './car-list.component.html',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CarListComponent {
  readonly apiEndpoint = 'https://ajaxgeo.cartrawler.com/ctabe/cars.json';
  readonly carsResource = httpResource<CarModel>(() => this.apiEndpoint, {
    parse: sanitizeKeys,
    defaultValue: [],
  });

  readonly carsSignal = computed(
    () =>
      this.carsResource
        .value()
        ?.map((car) => car?.vehAvailRSCore?.vehVendorAvails)[0]
  );

  readonly carDetailsSignal = computed(() => {
    const result = this.carsSignal()?.map((car) => {
      return car.vehAvails?.map((detail) => {
        return [
          {
            icon: 'fuel',
            value: detail.vehicle.fuelType,
          },
          // {
          //   icon: 'transmission',
          //   value: detail.vehicle.transmissionType,
          // },
          // {
          //   icon: 'person',
          //   value: detail.vehicle.passengerQuantity,
          // },
          // {
          //   icon: 'snow',
          //   value: detail.vehicle.airConditionInd,
          // },
        ];
      });
    });

    return result;
  });

  /**
   *
   */
  constructor() {
    effect(() => {
      console.log('this.carDetailsSignal()', this.carDetailsSignal());
    });
  }
}
