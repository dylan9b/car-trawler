import {
  ChangeDetectionStrategy,
  Component,
  computed,
  input,
} from '@angular/core';
import { Vehicle } from '../../car/_model/car.model';
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
  readonly vehicle = input.required<Vehicle>();

  readonly detailsSignal = computed(() => {
    return [
      {
        icon: 'fuel',
        value: this.vehicle().fuelType,
      },
    ];
  });
}
