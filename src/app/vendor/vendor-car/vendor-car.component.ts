import {
  ChangeDetectionStrategy,
  Component,
  computed,
  input,
} from '@angular/core';
import { VehAvail, Vendor } from '../../car/_model/car.model';
import { VendorCarDetailsComponent } from '../vendor-car-details/vendor-car-details.component';

@Component({
  selector: 'app-vendor-car',
  imports: [VendorCarDetailsComponent],
  templateUrl: './vendor-car.component.html',
  styleUrl: './vendor-car.component.scss',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class VendorCarComponent {
  readonly carDetails = input.required<VehAvail & { vendor: Vendor }>();
  readonly detailsSignal = computed(() => {
    return [
      {
        icon: 'bag',
        value: this.carDetails().vehicle.baggageQuantity,
      },
      {
        icon: 'door',
        value: this.carDetails().vehicle.doorCount,
      },
      {
        icon: 'fuel',
        value: this.carDetails().vehicle.fuelType,
      },
      {
        icon: 'person',
        value: this.carDetails().vehicle.passengerQuantity,
      },
      {
        icon: 'snowflake',
        value: this.carDetails().vehicle.airConditionInd ? 'Yes' : 'No',
      },
      {
        icon: 'transmission',
        value: this.carDetails().vehicle.transmissionType,
      },
    ];
  });
}
